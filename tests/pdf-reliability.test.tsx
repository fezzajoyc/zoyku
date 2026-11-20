import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
import { PDFArray, PDFDict, PDFDocument, PDFName, PDFStream, StandardFonts, degrees } from "pdf-lib";
import type { ReactElement, ReactNode } from "react";
import { LOCALES } from "@/lib/site";
import { OFFICE_UI, PROTECT_UI, REDACT_UI } from "@/tools/_engines/pdf-locales";

// Supply selected UI state while exercising the engines' real event handlers.
const hooks = vi.hoisted(() => ({ values: [] as unknown[], writes: [] as unknown[], index: 0, refs: [] as unknown[], refIndex: 0, locale: "en" }));
const render = vi.hoisted(() => ({ canvas: vi.fn() }));
vi.mock("react", async (original) => ({
  ...await original<typeof import("react")>(),
  useState: (initial: unknown) => {
    const i = hooks.index++;
    return [i < hooks.values.length ? hooks.values[i] : initial, (v: unknown) => { hooks.writes[i] = v; }];
  },
  useRef: (initial: unknown) => ({ current: hooks.refIndex < hooks.refs.length ? hooks.refs[hooks.refIndex++] : initial }),
  useCallback: (fn: unknown) => fn,
}));
vi.mock("@/components/i18n-provider", () => ({ useI18n: () => ({ locale: hooks.locale, t: { common: { error: "Error", output: "Output", reset: "Reset", clear: "Clear", download: "Download", dropFile: "Choose file" } } }) }));
vi.mock("@/tools/_engines/pdf-ui", async (original) => ({ ...await original<typeof import("@/tools/_engines/pdf-ui")>(), renderPageToCanvas: render.canvas }));

import { PdfProtectEngine } from "@/tools/_engines/pdf-engine-protect";
import { PdfRedactEngine } from "@/tools/_engines/pdf-engine-redact";
import { PdfOfficeEngine } from "@/tools/_engines/pdf-engine-office";
import { ImageOcrEngine } from "@/tools/_engines/image-engine-ocr";
import { loadPdf } from "@/tools/_engines/pdf-ui";

function action(node: ReactNode, label: string): () => Promise<void> {
  if (Array.isArray(node)) {
    for (const child of node) { try { return action(child, label); } catch { /* next child */ } }
  } else if (node && typeof node === "object" && "props" in node) {
    const el = node as ReactElement<{ children?: ReactNode; onClick?: () => Promise<void> }>;
    if (el.props.children === label && el.props.onClick) return el.props.onClick;
    if (el.props.children) return action(el.props.children, label);
  }
  throw new Error(`Action ${label} not found`);
}

function file(bytes: Uint8Array, name = "test.pdf"): File {
  return new File([bytes as BlobPart], name, { type: "application/pdf" });
}

function visibleText(node: ReactNode): string[] {
  if (typeof node === "string") return [node];
  if (Array.isArray(node)) return node.flatMap(visibleText);
  if (node && typeof node === "object" && "props" in node) return visibleText((node as ReactElement<{ children?: ReactNode }>).props.children);
  return [];
}

async function sourcePdf() {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  for (const [i, width] of [240, 360, 480].entries()) {
    doc.addPage([width, 600]).drawText(i === 1 ? "PRIVATE MARKED CONTENT" : `KEEP PAGE ${i + 1}`, { font, x: 20, y: 550, size: 14 });
  }
  return doc.save();
}

beforeEach(() => {
  hooks.values = []; hooks.writes = []; hooks.index = 0; hooks.refs = []; hooks.refIndex = 0;
  hooks.locale = "en";
  render.canvas.mockReset();
});
afterEach(() => vi.unstubAllGlobals());

describe("limitations before file selection", () => {
  it.each(LOCALES)("shows localized Word, protection and redaction limitations before accepting a file in %s", (locale) => {
    hooks.locale = locale;
    expect(visibleText(PdfOfficeEngine({ target: "fromdocx" }))).toContain(OFFICE_UI.wordLimit[locale]);
    hooks.index = 0;
    expect(visibleText(PdfProtectEngine({ op: "unlock" }))).toContain(PROTECT_UI.unlockNote[locale]);
    hooks.index = 0;
    expect(visibleText(PdfRedactEngine())).toContain(REDACT_UI.redactNote[locale]);
  });
});

describe("PDF protection reliability", () => {
  it("rejects an owner-restricted encrypted PDF before publishing any unlocked output", async () => {
    const encrypted = new Uint8Array(readFileSync(new URL("./fixtures/pdf/owner-restricted.pdf", import.meta.url)));
    // Fixture opens without a user password, yet still has actual encrypted content.
    const reader = await loadPdf(encrypted);
    expect((await (await reader.getPage(1)).getTextContent()).items.map((x) => "str" in x ? x.str : "").join("")).toContain("OWNER RESTRICTED TEST");
    await reader.destroy();
    hooks.values = [file(encrypted), false, 0, "", null];
    await action(PdfProtectEngine({ op: "unlock" }), "Check protection")();
    expect(hooks.writes[4]).toBeNull();
    expect(hooks.writes[3]).toMatch(/cannot.*decrypt|decryption.*not supported|encrypted.*not supported/i);
  });

  it("keeps unencrypted PDFs readable rather than claiming it removed protection", async () => {
    hooks.values = [file(await sourcePdf()), false, 0, "", null];
    await action(PdfProtectEngine({ op: "unlock" }), "Check protection")();
    expect(hooks.writes[4]).toBeNull();
    expect(hooks.writes[3]).toMatch(/not encrypted|no.*protection/i);
  });

  it("still flattens an actual editable form into visible static content", async () => {
    const source = await PDFDocument.create();
    const page = source.addPage([300, 400]);
    const field = source.getForm().createTextField("synthetic-name");
    field.setText("SYNTHETIC FORM VALUE");
    field.addToPage(page, { x: 20, y: 300, width: 250, height: 30 });
    hooks.values = [file(await source.save()), false, 0, "", null];
    await action(PdfProtectEngine({ op: "flatten" }), "Flatten form")();
    const output = hooks.writes[4] as { blob: Blob; name: string };
    expect(output.name).toBe("test-flattened.pdf");
    const bytes = new Uint8Array(await output.blob.arrayBuffer());
    const structure = await PDFDocument.load(bytes);
    expect(structure.getForm().getFields()).toHaveLength(0);
    const pdf = await loadPdf(bytes);
    expect((await (await pdf.getPage(1)).getTextContent()).items.map((x) => "str" in x ? x.str : "").join("")).toContain("SYNTHETIC FORM VALUE");
    await pdf.destroy();
  });
});

describe("PDF redaction output", () => {
  async function sourceWithPrivateForm() {
    const source = await PDFDocument.load(await sourcePdf());
    const donor = await PDFDocument.create();
    const font = await donor.embedFont(StandardFonts.Helvetica);
    donor.addPage([360, 600]).drawText("PRIVATE FORM CONTENT", { font, x: 20, y: 550, size: 14 });
    await donor.flush();
    const form = await source.embedPage(donor.getPage(0));
    source.getPage(1).drawPage(form);
    await source.flush();
    return { source, form };
  }

  async function redact(bytes: Uint8Array, context: object | null = { fillRect: vi.fn(), fillStyle: "" }) {
    const pdf = await loadPdf(bytes);
    const jpeg = readFileSync(new URL("./fixtures/pdf/redacted-page.jpg", import.meta.url)).toString("base64");
    render.canvas.mockResolvedValue({ width: 750, height: 1250, getContext: () => context, toDataURL: () => `data:image/jpeg;base64,${jpeg}` });
    const input = file(bytes);
    hooks.values = [input, 3, 1, "", 1, { 2: [{ x: 0, y: 0, w: 1, h: 1 }] }, false, 0, "", null];
    hooks.refs = [null, null, { doc: pdf, file: input }];
    await action(PdfRedactEngine(), "Redact PDF")();
    await pdf.destroy();
    return hooks.writes[9] as { blob: Blob } | null;
  }

  it("preserves unmarked text pages and rasterizes only a marked page", async () => {
    const bytes = await sourcePdf();
    const pdf = await loadPdf(bytes);
    const jpeg = readFileSync(new URL("./fixtures/pdf/redacted-page.jpg", import.meta.url)).toString("base64");
    const fillRect = vi.fn();
    render.canvas.mockResolvedValue({ width: 750, height: 1250, getContext: () => ({ fillRect, fillStyle: "" }), toDataURL: () => `data:image/jpeg;base64,${jpeg}` });
    const input = file(bytes);
    hooks.values = [input, 3, 1, "", 1, { 2: [{ x: 0, y: 0, w: 1, h: 1 }] }, false, 0, "", null];
    hooks.refs = [null, null, { doc: pdf, file: input }];
    await action(PdfRedactEngine(), "Redact PDF")();
    expect(hooks.writes[8]).toBe("");
    const output = hooks.writes[9] as { blob: Blob };
    expect(output?.blob).toBeInstanceOf(Blob);
    const result = await loadPdf(new Uint8Array(await output.blob.arrayBuffer()));
    expect(result.numPages).toBe(3);
    for (const n of [1, 3]) {
      const page = await result.getPage(n);
      expect((await page.getTextContent()).items.map((x) => "str" in x ? x.str : "").join("")).toContain(`KEEP PAGE ${n}`);
      expect(page.getViewport({ scale: 1 }).width).toBe([240, 360, 480][n - 1]);
    }
    expect((await (await result.getPage(2)).getTextContent()).items).toHaveLength(0);
    expect(render.canvas).toHaveBeenCalledTimes(1);
    expect(fillRect).toHaveBeenCalledWith(0, 0, 750, 1250);
    expect(hooks.writes[7]).toBe(1);
    await result.destroy(); await pdf.destroy();
  });

  it("does not copy confidential source pages through an unmarked page's internal links", async () => {
    const source = await PDFDocument.load(await sourcePdf());
    source.setTitle("PRIVATE SOURCE TITLE");
    source.setAuthor("PRIVATE SOURCE AUTHOR");
    source.getPage(0).node.set(PDFName.of("Annots"), source.context.obj([
      { Type: "Annot", Subtype: "Link", Rect: [0, 0, 100, 100], Dest: [source.getPage(1).ref, "Fit"] },
    ]));
    const output = await redact(await source.save());
    expect(output?.blob).toBeInstanceOf(Blob);
    const result = await PDFDocument.load(await output!.blob.arrayBuffer());
    const storedPages = result.context.enumerateIndirectObjects().filter(([, object]) => object instanceof PDFDict && object.get(PDFName.of("Type")) === PDFName.of("Page"));
    // A copied internal link must not smuggle the original marked page into
    // the file outside its visible page tree.
    expect(storedPages).toHaveLength(3);
    expect(result.getPage(0).node.Annots()).toBeUndefined();
    expect(result.getTitle()).toBeUndefined();
    expect(result.getAuthor()).toBeUndefined();
  });

  it("does not retain the marked source page through SeparationInfo or arbitrary page-level references", async () => {
    const source = await PDFDocument.load(await sourcePdf());
    const first = source.getPage(0);
    first.node.set(PDFName.of("SeparationInfo"), source.context.obj({
      Pages: [first.ref, source.getPage(1).ref], DeviceColorant: "Cyan",
    }));
    first.node.set(PDFName.of("CustomHiddenPage"), source.getPage(1).ref);
    const output = await redact(await source.save());
    expect(output?.blob).toBeInstanceOf(Blob);
    const result = await PDFDocument.load(await output!.blob.arrayBuffer());
    const storedPages = result.context.enumerateIndirectObjects().filter(([, object]) => object instanceof PDFDict && object.get(PDFName.of("Type")) === PDFName.of("Page"));
    // Both entries are unrelated to visible page rendering. Copying them
    // retains the original confidential page, recoverable by reattaching it.
    expect(storedPages).toHaveLength(3);
    expect(result.getPage(0).node.get(PDFName.of("SeparationInfo"))).toBeUndefined();
    expect(result.getPage(0).node.get(PDFName.of("CustomHiddenPage"))).toBeUndefined();
    const reader = await loadPdf(new Uint8Array(await result.save()));
    expect((await (await reader.getPage(1)).getTextContent()).items.map((x) => "str" in x ? x.str : "").join("")).toContain("KEEP PAGE 1");
    await reader.destroy();
  });

  it("fails closed when retained rendering resources reference an original source page", async () => {
    const source = await PDFDocument.load(await sourcePdf());
    const resources = source.getPage(0).node.Resources()!;
    resources.set(PDFName.of("Properties"), source.context.obj({ HiddenPage: source.getPage(1).ref }));
    const output = await redact(await source.save());
    expect(output).toBeNull();
    expect(hooks.writes[8]).toMatch(/cannot.*safely|not supported|unsupported/i);
  });

  it("does not retain confidential Form XObjects unused by the unmarked page", async () => {
    const { source } = await sourceWithPrivateForm();
    const sharedForms = source.getPage(1).node.Resources()!.lookup(PDFName.of("XObject"), PDFDict);
    source.getPage(0).node.Resources()!.set(PDFName.of("XObject"), sharedForms);
    const output = await redact(await source.save());
    // The resource map is shared with the marked page, although the unmarked
    // page never draws its Form. Retaining it makes the private text recoverable.
    expect(output).toBeNull();
    expect(hooks.writes[8]).toMatch(/unsupported|cannot.*safely|standard.font/i);
  });

  it("rebuilds content streams without copying arbitrary stream-dictionary references", async () => {
    const { source, form } = await sourceWithPrivateForm();
    const content = source.getPage(0).node.Contents()!;
    const firstStream = content instanceof PDFArray ? source.context.lookup(content.get(0), PDFStream) : content;
    firstStream.dict.set(PDFName.of("HiddenOriginalForm"), form.ref);
    const output = await redact(await source.save());
    expect(output?.blob).toBeInstanceOf(Blob);
    const result = await PDFDocument.load(await output!.blob.arrayBuffer());
    const retainedForms = result.context.enumerateIndirectObjects().filter(([, value]) => value instanceof PDFStream && value.dict.get(PDFName.of("Subtype")) === PDFName.of("Form"));
    expect(retainedForms).toHaveLength(0);
    const reader = await loadPdf(new Uint8Array(await result.save()));
    expect((await (await reader.getPage(1)).getTextContent()).items.map((x) => "str" in x ? x.str : "").join("")).toContain("KEEP PAGE 1");
    await reader.destroy();
  });

  it.each(["ToUnicode", "FontDescriptor", "Encoding"])("rejects a standard-font resource with a non-primitive %s graph", async (key) => {
    const { source, form } = await sourceWithPrivateForm();
    const fonts = source.getPage(0).node.Resources()!.lookup(PDFName.of("Font"), PDFDict);
    const font = fonts.lookup(fonts.keys()[0], PDFDict);
    font.set(PDFName.of(key), source.context.obj({ HiddenForm: form.ref }));
    expect(await redact(await source.save())).toBeNull();
    expect(hooks.writes[8]).toMatch(/unsupported|cannot.*safely|standard.font/i);
  });

  it.each(["ExtGState", "ColorSpace", "Pattern", "Shading", "Properties"])("rejects nonempty %s resources instead of retaining hidden content graphs", async (key) => {
    const { source, form } = await sourceWithPrivateForm();
    source.getPage(0).node.Resources()!.set(PDFName.of(key), source.context.obj({ HiddenForm: form.ref }));
    expect(await redact(await source.save())).toBeNull();
  });

  it("can rasterize a marked page with Form resources when unmarked pages are simple", async () => {
    const { source } = await sourceWithPrivateForm();
    const output = await redact(await source.save());
    expect(output?.blob).toBeInstanceOf(Blob);
    const result = await PDFDocument.load(await output!.blob.arrayBuffer());
    expect(result.getPageCount()).toBe(3);
    expect(result.context.enumerateIndirectObjects().filter(([, value]) => value instanceof PDFStream && value.dict.get(PDFName.of("Subtype")) === PDFName.of("Form"))).toHaveLength(0);
  });

  it("preserves inherited resources, rotation, crop box and media box on an unmarked page", async () => {
    const source = await PDFDocument.load(await sourcePdf());
    const first = source.getPage(0);
    first.setRotation(degrees(90));
    first.setCropBox(10, 20, 200, 580);
    const parent = first.node.Parent()!;
    for (const key of ["Resources", "Rotate", "MediaBox", "CropBox"]) {
      const name = PDFName.of(key);
      parent.set(name, first.node.get(name)!);
      first.node.delete(name);
    }
    const output = await redact(await source.save());
    expect(output?.blob).toBeInstanceOf(Blob);
    const result = await PDFDocument.load(await output!.blob.arrayBuffer());
    expect(result.getPage(0).getSize()).toEqual({ width: 240, height: 600 });
    expect(result.getPage(0).getCropBox()).toEqual({ x: 10, y: 20, width: 200, height: 580 });
    expect(result.getPage(0).getRotation().angle).toBe(90);
    const reader = await loadPdf(new Uint8Array(await result.save()));
    expect((await (await reader.getPage(1)).getTextContent()).items.map((x) => "str" in x ? x.str : "").join("")).toContain("KEEP PAGE 1");
    await reader.destroy();
  });

  it("fails without any downloadable output if the redaction canvas has no context", async () => {
    expect(await redact(await sourcePdf(), null)).toBeNull();
    expect(hooks.writes[8]).not.toBe("");
  });
});

describe("Word to PDF text safety", () => {
  // The browser supplies DOMParser. This minimal environment adapter only exposes
  // the DOM accessors used for one paragraph; typesetting remains the real code.
  function browserParagraph(text: string) {
    const empty = { getElementsByTagName: () => [], getAttribute: () => null };
    const run = { getElementsByTagName: (tag: string) => tag === "w:t" ? [{ textContent: text }] : [] };
    const paragraph = { getElementsByTagName: (tag: string) => tag === "w:r" ? [run] : [] };
    vi.stubGlobal("DOMParser", class { parseFromString() { return { ...empty, getElementsByTagName: (tag: string) => tag === "w:p" ? [paragraph] : [] }; } });
  }
  async function convert(text: string) {
    const JSZip = (await import("jszip")).default;
    const zip = new JSZip(); zip.file("word/document.xml", `<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:p><w:r><w:t>${text}</w:t></w:r></w:p></w:document>`);
    const bytes = await zip.generateAsync({ type: "uint8array" });
    browserParagraph(text);
    hooks.values = [file(bytes, "source.docx"), false, 0, "", "", null];
    await action(PdfOfficeEngine({ target: "fromdocx" }), "Convert to PDF")();
  }

  it.each(["中文正文", "العربية", "हिन्दी", "Привет", "emoji 😀"])("rejects unsupported text %s before producing a lossy PDF", async (text) => {
    await convert(text);
    expect(hooks.writes[5]).toBeNull();
    expect(hooks.writes[3]).toMatch(/unsupported.*character|cannot.*represent|Latin/i);
  });

  it("retains supported Latin punctuation and accented text in an independently readable PDF", async () => {
    await convert("Résumé — café € 25");
    const output = hooks.writes[5] as { blob: Blob };
    const pdf = await loadPdf(new Uint8Array(await output.blob.arrayBuffer()));
    expect((await (await pdf.getPage(1)).getTextContent()).items.map((x) => "str" in x ? x.str : "").join("")).toBe("Résumé — café € 25");
    await pdf.destroy();
  });
});

describe("image OCR CDN recovery", () => {
  it("injects a fresh script after a network failure, using the real image OCR loader", async () => {
    const scripts: Array<{ onerror?: () => void; remove: () => void }> = [];
    vi.stubGlobal("window", {});
    vi.stubGlobal("document", { createElement: () => ({ remove: vi.fn() }), head: { appendChild: (script: typeof scripts[number]) => { scripts.push(script); queueMicrotask(() => script.onerror?.()); } } });
    hooks.values = [new File(["image"], "scan.png", { type: "image/png" }), "eng", false, 0, "", "", "", ""];
    const run = action(ImageOcrEngine(), "Extract text");
    await run();
    expect(scripts).toHaveLength(1);
    await vi.waitFor(() => expect(hooks.writes[5]).toMatch(/CDN/));
    await run();
    await vi.waitFor(() => expect(scripts).toHaveLength(2));
    expect(scripts).toHaveLength(2);
    expect(scripts[0].remove).toHaveBeenCalled();
    expect(hooks.writes[5]).toMatch(/CDN/);
  });
});
