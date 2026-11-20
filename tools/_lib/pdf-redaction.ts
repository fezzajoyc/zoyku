import type { PDFDocument, PDFObject } from "pdf-lib";

type PdfObjects = Pick<typeof import("pdf-lib"), "PDFName" | "PDFNumber" | "PDFRef" | "PDFDict" | "PDFArray" | "PDFRawStream" | "decodePDFRawStream">;

export class UnsupportedRedactionError extends Error {
  constructor() {
    super("unsupported-redaction-resources");
    this.name = "UnsupportedRedactionError";
  }
}

const STANDARD_FONTS = new Set([
  "Courier", "Courier-Bold", "Courier-Oblique", "Courier-BoldOblique",
  "Helvetica", "Helvetica-Bold", "Helvetica-Oblique", "Helvetica-BoldOblique",
  "Times-Roman", "Times-Bold", "Times-Italic", "Times-BoldItalic", "Symbol", "ZapfDingbats",
]);
const STANDARD_ENCODINGS = new Set(["StandardEncoding", "WinAnsiEncoding", "MacRomanEncoding", "MacExpertEncoding"]);

/**
 * Preserve a deliberately small, auditable subset of unmarked pages. Neither a
 * page-entry denylist nor a graph check for Page references is sufficient: an
 * unused Form/image/font stream can retain marked content without any Page ref.
 *
 * Therefore no original resource graph is copied. Resources are rebuilt from
 * primitive standard-font dictionaries; complex resources fail closed. Content
 * bytes are decoded into fresh streams so arbitrary original stream-dictionary
 * references cannot be carried into the output either.
 */
export function preparePagesForRedaction(source: PDFDocument, preservedIndices: number[], pdf: PdfObjects): void {
  const { PDFName, PDFNumber, PDFRef, PDFDict, PDFArray, PDFRawStream, decodePDFRawStream } = pdf;
  const pages = source.getPages();
  const pageRefs = new Set(pages.map((page) => page.ref.toString()));
  const context = source.context;
  const fail = (): never => { throw new UnsupportedRedactionError(); };

  const resolve = (input: PDFObject | undefined): PDFObject | undefined => {
    let value = input;
    const seen = new Set<PDFObject>();
    while (value instanceof PDFRef) {
      if (seen.has(value) || pageRefs.has(value.toString())) return fail();
      seen.add(value);
      value = context.lookup(value);
      if (!value) return fail();
    }
    return value;
  };
  const name = (value: PDFObject | undefined): string => {
    const resolved = resolve(value);
    if (!(resolved instanceof PDFName)) return fail();
    return resolved.decodeText();
  };

  for (const index of preservedIndices) {
    const page = pages[index];
    if (!page) return fail();
    const node = page.node;
    const safe = context.obj({ Type: "Page" });

    for (const key of ["MediaBox", "CropBox", "BleedBox", "TrimBox", "ArtBox"]) {
      const entry = PDFName.of(key);
      const original = key === "MediaBox" || key === "CropBox" ? node.getInheritableAttribute(entry) : node.get(entry);
      if (!original) {
        if (key === "MediaBox") return fail();
        continue;
      }
      const box = resolve(original);
      if (!(box instanceof PDFArray) || box.size() !== 4) return fail();
      const values: number[] = [];
      for (let i = 0; i < 4; i++) {
        const number = resolve(box.get(i));
        if (!(number instanceof PDFNumber) || !Number.isFinite(number.asNumber())) return fail();
        values.push(number.asNumber());
      }
      if (values[2] <= values[0] || values[3] <= values[1]) return fail();
      safe.set(entry, context.obj(values));
    }
    for (const key of ["Rotate", "UserUnit"]) {
      const entry = PDFName.of(key);
      const original = key === "Rotate" ? node.getInheritableAttribute(entry) : node.get(entry);
      if (!original) continue;
      const value = resolve(original);
      if (!(value instanceof PDFNumber) || !Number.isFinite(value.asNumber())) return fail();
      if (key === "Rotate" ? value.asNumber() % 90 !== 0 : value.asNumber() <= 0) return fail();
      safe.set(entry, context.obj(value.asNumber()));
    }
    // Transparency groups can have their own resource/color-space graphs.
    if (node.get(PDFName.of("Group"))) return fail();

    const resources = resolve(node.getInheritableAttribute(PDFName.of("Resources")));
    const safeResources = context.obj({});
    if (resources) {
      if (!(resources instanceof PDFDict)) return fail();
      for (const [resourceKey, original] of resources.entries()) {
        const kind = resourceKey.decodeText();
        const value = resolve(original);
        if (kind === "Font") {
          if (!(value instanceof PDFDict)) return fail();
          const safeFonts = context.obj({});
          for (const [fontKey, originalFont] of value.entries()) {
            const font = resolve(originalFont);
            if (!(font instanceof PDFDict)) return fail();
            // No custom encodings, descriptors, ToUnicode CMaps, Type3
            // programs or embedded fonts: all can retain opaque content.
            const allowed = new Set(["Type", "Subtype", "BaseFont", "Encoding", "Name"]);
            if (font.keys().some((key) => !allowed.has(key.decodeText()))) return fail();
            if (name(font.get(PDFName.of("Type"))) !== "Font" || name(font.get(PDFName.of("Subtype"))) !== "Type1") return fail();
            const base = name(font.get(PDFName.of("BaseFont")));
            if (!STANDARD_FONTS.has(base)) return fail();
            const safeFont = context.obj({ Type: "Font", Subtype: "Type1", BaseFont: base });
            const encoding = font.get(PDFName.of("Encoding"));
            if (encoding) {
              const encodingName = name(encoding);
              if (!STANDARD_ENCODINGS.has(encodingName)) return fail();
              safeFont.set(PDFName.of("Encoding"), PDFName.of(encodingName));
            }
            // /Name is deprecated metadata, not the page's font lookup key.
            // Validate that it is primitive but do not copy its arbitrary value.
            if (font.get(PDFName.of("Name"))) name(font.get(PDFName.of("Name")));
            safeFonts.set(fontKey, safeFont);
          }
          safeResources.set(resourceKey, safeFonts);
        } else if (kind === "ProcSet") {
          if (!(value instanceof PDFArray)) return fail();
          const names: string[] = [];
          for (let i = 0; i < value.size(); i++) {
            const item = name(value.get(i));
            if (!["PDF", "Text", "ImageB", "ImageC", "ImageI"].includes(item)) return fail();
            names.push(item);
          }
          safeResources.set(resourceKey, context.obj(names));
        } else if (!(value instanceof PDFDict) || value.keys().length !== 0) {
          // Empty maps inserted by PDF writers are harmless. Every nonempty
          // Form/image, graphics state, color space, pattern, shading,
          // property or extension resource is outside the supported subset.
          return fail();
        }
      }
    }
    safe.set(PDFName.of("Resources"), safeResources);

    const contents = resolve(node.get(PDFName.of("Contents")));
    if (contents) {
      const streams = contents instanceof PDFArray
        ? Array.from({ length: contents.size() }, (_, i) => resolve(contents.get(i)))
        : [contents];
      const safeStreams = [];
      for (const stream of streams) {
        if (!(stream instanceof PDFRawStream)) return fail();
        let decoded: Uint8Array;
        try {
          decoded = decodePDFRawStream(stream).decode();
        } catch {
          return fail();
        }
        safeStreams.push(context.register(context.flateStream(decoded)));
      }
      safe.set(PDFName.of("Contents"), context.obj(safeStreams));
    }

    // Replace entries only after the whole page has passed validation.
    for (const key of node.keys()) node.delete(key);
    for (const [key, value] of safe.entries()) node.set(key, value);
  }
}
