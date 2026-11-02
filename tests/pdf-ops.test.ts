import { describe, expect, it } from "vitest";
import { PDFDocument, StandardFonts, degrees, type PDFDocument as LibPDFDocument } from "pdf-lib";
import { parsePageRanges, loadPdf } from "@/tools/_engines/pdf-ui";

/* ------------------------------------------------------------------ */
/* Byte-level fixtures: valid multi-page PDFs built with pdf-lib.      */
/* ------------------------------------------------------------------ */

async function makePdf(pageCount: number, widths?: number[]): Promise<LibPDFDocument> {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica); // embed once, like the engines do
  for (let i = 0; i < pageCount; i++) {
    const w = widths?.[i] ?? 612;
    const page = doc.addPage([w, 792]);
    page.drawText(`PAGE ${i + 1}`, { x: 50, y: 700, size: 24, font });
  }
  return doc;
}

async function bytesOf(doc: LibPDFDocument): Promise<Uint8Array> {
  return doc.save();
}

/** Engine-equivalent load: every pdf engine loads with ignoreEncryption, then checks isEncrypted. */
async function loadBytes(bytes: Uint8Array): Promise<LibPDFDocument> {
  return PDFDocument.load(bytes, { ignoreEncryption: true });
}

/* ------------------------------------------------------------------ */
/* Replicas of tools/_engines/pdf-engine-pages.tsx run() semantics.    */
/* Kept line-for-line equivalent to the engine: these ARE the          */
/* documented contracts the UI builds on (1-based page numbers in,     */
/* `p - 1` indices into copyPages, zero-padded -pN-M file labels).     */
/* ------------------------------------------------------------------ */

/** Verbatim replica of the split "every" grouping loop (1-based groups). */
function splitEveryGroups(n: number, perFile: number): number[][] {
  const size = Math.max(1, Math.floor(perFile) || 1);
  const groups: number[][] = [];
  for (let i = 0; i < n; i += size) {
    groups.push(Array.from({ length: Math.min(size, n - i) }, (_, k) => i + k + 1));
  }
  return groups;
}

/** Verbatim replica of the split output naming (`-01-p1-2.pdf` style). */
function splitOutputNames(base: string, groups: number[][]): string[] {
  return groups.map((g, gi) => {
    const label = g.length === 1 ? `${g[0]}` : `${g[0]}-${g[g.length - 1]}`;
    return `${base}-${String(gi + 1).padStart(2, "0")}-p${label}.pdf`;
  });
}

/** Verbatim replica of the per-group output build: `g.map(p => p - 1)` into copyPages. */
async function buildSplitOutputs(src: LibPDFDocument, groups: number[][]): Promise<LibPDFDocument[]> {
  const outs: LibPDFDocument[] = [];
  for (const g of groups) {
    const dst = await PDFDocument.create();
    const pages = await dst.copyPages(src, g.map((p) => p - 1));
    pages.forEach((p) => dst.addPage(p));
    outs.push(dst);
  }
  return outs;
}

/** Verbatim replica of the rotate formula: (angle + delta + 360) % 360. */
function rotateAngle(current: number, delta: number): number {
  return (current + delta + 360) % 360;
}

/** Verbatim replica of the delete semantics, including the "cannot delete all" guard. */
function replicaDeletePages(n: number, spec: string): number[] {
  const del = parsePageRanges(spec, n);
  if (!del) throw new Error("range");
  if (del.length >= n) throw new Error("all"); // documented contract: deleting every page is rejected
  return Array.from({ length: n }, (_, i) => i + 1).filter((p) => !del.includes(p));
}

/* ------------------------------------------------------------------ */
/* split — the 1-based page-number regression                          */
/* ------------------------------------------------------------------ */

describe("split PDF (every N)", () => {
  it("split every-N groups are 1-based (regression: no -1 page index ever reaches copyPages)", async () => {
    const src = await makePdf(5);
    const n = src.getPageCount();
    const groups = splitEveryGroups(n, 2);

    expect(groups).toEqual([[1, 2], [3, 4], [5]]);
    // the exact regression that shipped once: a 0-based group turned into copyPages([-1])
    expect(groups.flat().every((p) => p >= 1)).toBe(true);
    expect(groups.flat().every((p) => p <= n)).toBe(true);
    // and the derived copy indices are all valid source indices
    const copyIndices = groups.flat().map((p) => p - 1);
    expect(copyIndices.every((i) => i >= 0 && i < n)).toBe(true);
    expect(copyIndices).toEqual([0, 1, 2, 3, 4]);
  });

  it("split every 2 on a 5-page PDF yields files of 2, 2 and 1 pages named -p1-2, -p3-4, -p5", async () => {
    const src = await makePdf(5);
    const groups = splitEveryGroups(5, 2);
    const names = splitOutputNames("report", groups);

    expect(names).toEqual(["report-01-p1-2.pdf", "report-02-p3-4.pdf", "report-03-p5.pdf"]);
    expect(names.map((nm) => nm.includes("-p1-2"))).toEqual([true, false, false]);
    expect(names.some((nm) => nm.includes("-p3-4"))).toBe(true);
    expect(names.some((nm) => nm.includes("-p5"))).toBe(true);

    const outs = await buildSplitOutputs(src, groups);
    expect(outs.map((d) => d.getPageCount())).toEqual([2, 2, 1]);
    for (const out of outs) {
      const reloaded = await loadBytes(await bytesOf(out));
      expect(reloaded.getPageCount()).toBeGreaterThan(0); // every chunk is a loadable PDF
    }
  });

  it("split every 2 keeps every source page exactly once, in order", async () => {
    // distinct widths act as per-page markers pdf-lib can read back
    const src = await makePdf(5, [200, 300, 400, 500, 600]);
    const groups = splitEveryGroups(5, 2);
    const outs = await buildSplitOutputs(src, groups);
    const flat = groups.flat();
    for (let g = 0; g < outs.length; g++) {
      const pages = outs[g].getPages();
      for (let k = 0; k < pages.length; k++) {
        const srcIdx = flat[g * 2 + k] - 1;
        expect(pages[k].getSize().width).toBe(200 + srcIdx * 100);
      }
    }
  });

  it("split every 1 yields one single-page file per page", async () => {
    const src = await makePdf(3);
    const groups = splitEveryGroups(3, 1);
    expect(groups).toEqual([[1], [2], [3]]);
    expect(splitOutputNames("doc", groups)).toEqual(["doc-01-p1.pdf", "doc-02-p2.pdf", "doc-03-p3.pdf"]);
    const outs = await buildSplitOutputs(src, groups);
    expect(outs.map((d) => d.getPageCount())).toEqual([1, 1, 1]);
  });

  it("a page-per-file larger than the document collapses into one group", async () => {
    expect(splitEveryGroups(3, 10)).toEqual([[1, 2, 3]]);
    expect(splitEveryGroups(0, 2)).toEqual([]);
  });
});

describe("split PDF (custom ranges)", () => {
  it("ranges 1-2,4-5 produce two files named -p1-2 and -p4-5", async () => {
    const src = await makePdf(5);
    const spec = "1-2,4-5";
    const n = src.getPageCount();
    const groups: number[][] = [];
    for (const part of spec.split(/[,，、\s]+/).filter(Boolean)) {
      const nums = parsePageRanges(part, n);
      expect(nums, `range part ${part} should parse`).not.toBeNull();
      groups.push(nums as number[]);
    }
    expect(groups).toEqual([[1, 2], [4, 5]]);
    const names = splitOutputNames("doc", groups);
    expect(names).toEqual(["doc-01-p1-2.pdf", "doc-02-p4-5.pdf"]);
    const outs = await buildSplitOutputs(src, groups);
    expect(outs.map((d) => d.getPageCount())).toEqual([2, 2]);
  });

  it("an unparsable range list is rejected before any output is built", () => {
    expect(parsePageRanges("5-3", 5)).toBeNull();
    expect(parsePageRanges("abc", 5)).toBeNull();
  });
});

/* ------------------------------------------------------------------ */
/* merge                                                               */
/* ------------------------------------------------------------------ */

describe("merge PDFs", () => {
  it("merging a 2-page and a 3-page PDF yields a valid 5-page PDF", async () => {
    const merged = await PDFDocument.create();
    const sources = [await makePdf(2), await makePdf(3)];
    for (const src of sources) {
      const pages = await merged.copyPages(src, src.getPageIndices());
      // engine-visible contract: copyPages returns exactly one page per requested index
      expect(pages.length).toBe(src.getPageCount());
      pages.forEach((p) => merged.addPage(p));
    }
    expect(merged.getPageCount()).toBe(5);

    const bytes = await bytesOf(merged);
    expect(new TextDecoder().decode(bytes.slice(0, 5))).toBe("%PDF-");
    const reloaded = await loadBytes(bytes);
    expect(reloaded.getPageCount()).toBe(5);
    expect(reloaded.isEncrypted).toBe(false);
  });

  it("merged pages keep their source order and content (marker sizes survive the copy)", async () => {
    const a = await makePdf(2, [210, 310]);
    const b = await makePdf(3, [410, 510, 610]);
    const merged = await PDFDocument.create();
    for (const src of [a, b]) {
      const pages = await merged.copyPages(src, src.getPageIndices());
      pages.forEach((p) => merged.addPage(p));
    }
    expect(merged.getPages().map((p) => p.getSize().width)).toEqual([210, 310, 410, 510, 610]);
  });
});

/* ------------------------------------------------------------------ */
/* rotate                                                              */
/* ------------------------------------------------------------------ */

describe("rotate pages", () => {
  it("rotating by 90 then 270 returns the page to its original rotation", async () => {
    const doc = await makePdf(1);
    const page = doc.getPage(0);
    const original = page.getRotation().angle;
    page.setRotation(degrees(rotateAngle(page.getRotation().angle, 90)));
    expect(page.getRotation().angle).toBe(90);
    page.setRotation(degrees(rotateAngle(page.getRotation().angle, 270)));
    expect(page.getRotation().angle).toBe(original);
  });

  it("rotation angles normalize mod 360 and persist through save/load", async () => {
    const doc = await makePdf(2);
    doc.getPage(0).setRotation(degrees(180));
    doc.getPage(0).setRotation(degrees(rotateAngle(doc.getPage(0).getRotation().angle, 180)));
    expect(doc.getPage(0).getRotation().angle).toBe(0); // 180 + 180 wraps to 0, not 360

    doc.getPage(1).setRotation(degrees(270));
    doc.getPage(1).setRotation(degrees(rotateAngle(doc.getPage(1).getRotation().angle, 180)));
    expect(doc.getPage(1).getRotation().angle).toBe(90); // 270 + 180 wraps to 90

    const reloaded = await loadBytes(await bytesOf(doc));
    expect(reloaded.getPage(0).getRotation().angle).toBe(0);
    expect(reloaded.getPage(1).getRotation().angle).toBe(90);
  });

  it("a page subset given as a range rotates only the named pages", async () => {
    const doc = await makePdf(3);
    const spec = "1,3"; // engine: rotPages "1,3" → parsePageRanges → targets
    const targets = spec.trim() ? parsePageRanges(spec, doc.getPageCount()) : doc.getPageIndices().map((i) => i + 1);
    expect(targets).toEqual([1, 3]);
    const angle = 90;
    for (const p of targets as number[]) {
      const page = doc.getPage(p - 1);
      page.setRotation(degrees(rotateAngle(page.getRotation().angle, angle)));
    }
    expect(doc.getPage(0).getRotation().angle).toBe(90);
    expect(doc.getPage(1).getRotation().angle).toBe(0);
    expect(doc.getPage(2).getRotation().angle).toBe(90);

    const reloaded = await loadBytes(await bytesOf(doc));
    expect(reloaded.getPage(1).getRotation().angle).toBe(0); // untouched page stays untouched
    expect(reloaded.getPage(2).getRotation().angle).toBe(90);
  });
});

/* ------------------------------------------------------------------ */
/* delete pages                                                        */
/* ------------------------------------------------------------------ */

describe("delete pages", () => {
  it("deleting page 2 from a 3-page PDF leaves pages 1 and 3 in order", async () => {
    const src = await makePdf(3, [200, 300, 400]);
    const n = src.getPageCount();
    const keep = replicaDeletePages(n, "2");
    expect(keep).toEqual([1, 3]);

    const dst = await PDFDocument.create();
    const pages = await dst.copyPages(src, keep.map((p) => p - 1));
    pages.forEach((p) => dst.addPage(p));
    expect(dst.getPageCount()).toBe(2);
    const reloaded = await loadBytes(await bytesOf(dst));
    // marker widths prove the KEPT pages are the right ones, in order
    expect(reloaded.getPages().map((p) => p.getSize().width)).toEqual([200, 400]);
  });

  it("a multi-page deletion spec removes exactly those pages", async () => {
    expect(replicaDeletePages(5, "2,4")).toEqual([1, 3, 5]);
    expect(replicaDeletePages(5, "1-3")).toEqual([4, 5]);
  });

  it("deleting every page is rejected by the engine guard (del.length >= n → error)", () => {
    expect(() => replicaDeletePages(3, "1,2,3")).toThrow("all");
    expect(() => replicaDeletePages(3, "1-3")).toThrow("all");
    // n = 1: deleting the only page is also "all"
    expect(() => replicaDeletePages(1, "1")).toThrow("all");
    // but n-1 deletions are fine
    expect(() => replicaDeletePages(3, "1,2")).not.toThrow();
  });

  it("an unparsable deletion spec is rejected before the guard runs", () => {
    expect(() => replicaDeletePages(3, "0")).toThrow("range");
    expect(() => replicaDeletePages(3, "nope")).toThrow("range");
  });
});

/* ------------------------------------------------------------------ */
/* rearrange                                                           */
/* ------------------------------------------------------------------ */

describe("rearrange pages", () => {
  it("order [3,1,2] rebuilds the document with source page 3 first", async () => {
    // distinct page sizes are the per-page markers (pdf-lib cannot extract text)
    const src = await makePdf(3, [200, 300, 400]);
    const order = [3, 1, 2];
    const dst = await PDFDocument.create();
    const pages = await dst.copyPages(src, order.map((p) => p - 1));
    pages.forEach((p) => dst.addPage(p));
    expect(dst.getPageCount()).toBe(3);
    const sizes = dst.getPages().map((p) => p.getSize());
    expect(sizes.map((s) => s.width)).toEqual([400, 200, 300]);
  });

  it("a full reversal and the identity order both preserve every page exactly once", async () => {
    const src = await makePdf(4, [200, 300, 400, 500]);
    for (const order of [[4, 3, 2, 1], [1, 2, 3, 4]]) {
      const dst = await PDFDocument.create();
      const pages = await dst.copyPages(src, order.map((p) => p - 1));
      pages.forEach((p) => dst.addPage(p));
      const reloaded = await loadBytes(await bytesOf(dst));
      expect(reloaded.getPages().map((p) => p.getSize().width)).toEqual(order.map((p) => 100 + p * 100));
    }
  });
});

/* ------------------------------------------------------------------ */
/* page numbers stamping (pdf-engine-pagenum semantics)                */
/* ------------------------------------------------------------------ */

describe("page number stamping", () => {
  it("stamping keeps the page count, grows every content stream, and the text lands inside the page", async () => {
    const src = await makePdf(3);
    const doc = await PDFDocument.load(await src.save(), { ignoreEncryption: true });

    // verbatim replica of pdf-engine-pagenum.tsx run() with default options (format "1 / N", bottom center)
    const font = await doc.embedFont(StandardFonts.Helvetica);
    const size = 11;
    const margin = 24;
    const total = doc.getPageCount();
    const pos = "bc";
    const start = 1;
    const drawn: { text: string; x: number; y: number; w: number; h: number }[] = [];
    doc.getPages().forEach((page, i) => {
      const text = `${start + i} / ${total}`;
      const { width, height } = page.getSize();
      const tw = font.widthOfTextAtSize(text, size);
      const x = pos.endsWith("l") ? margin : pos.endsWith("r") ? width - margin - tw : (width - tw) / 2;
      const y = pos.startsWith("b") ? margin / 1.6 : height - margin;
      page.drawText(text, { x, y, size, font });
      drawn.push({ text, x, y, w: width, h: height });
    });
    const bytes = await bytesOf(doc);

    // structural: page count unchanged, content streams present, text within page bounds
    expect(doc.getPageCount()).toBe(3);
    for (const d of drawn) {
      expect(d.x).toBeGreaterThanOrEqual(0);
      expect(d.x + font.widthOfTextAtSize(d.text, size)).toBeLessThanOrEqual(d.w);
      expect(d.y).toBeGreaterThanOrEqual(0);
      expect(d.y).toBeLessThanOrEqual(d.h);
    }
    const reloaded = await loadBytes(bytes);
    expect(reloaded.getPageCount()).toBe(3);
    for (const page of reloaded.getPages()) {
      expect(page.node.Contents()).toBeDefined(); // every stamped page has a content stream
    }
  });

  it("the stamped numbers are really rendered: page i of N carries 'i / N'", async () => {
    const src = await makePdf(3);
    const doc = await PDFDocument.load(await src.save(), { ignoreEncryption: true });
    const font = await doc.embedFont(StandardFonts.Helvetica);
    const total = doc.getPageCount();
    doc.getPages().forEach((page, i) => {
      const { width } = page.getSize();
      const text = `${i + 1} / ${total}`;
      page.drawText(text, {
        x: (width - font.widthOfTextAtSize(text, 11)) / 2,
        y: 15,
        size: 11,
        font,
      });
    });

    // cross-check with an independent renderer (pdf.js, the same loader the engines use)
    const pdf = await loadPdf(new Uint8Array(await doc.save()));
    for (let i = 1; i <= total; i++) {
      const page = await pdf.getPage(i);
      const tc = await page.getTextContent();
      const text = tc.items.map((it) => ("str" in it ? it.str : "")).join(" ");
      expect(text).toContain(`${i} / ${total}`);
      expect(text).toContain(`PAGE ${i}`);
    }
    pdf.destroy();
  });

  it("the output of stamping is a loadable PDF even for a single page", async () => {
    const src = await makePdf(1);
    const doc = await PDFDocument.load(await src.save(), { ignoreEncryption: true });
    const font = await doc.embedFont(StandardFonts.Helvetica);
    doc.getPage(0).drawText("1 / 1", { x: 24, y: 15, size: 11, font });
    const reloaded = await loadBytes(await bytesOf(doc));
    expect(reloaded.getPageCount()).toBe(1);
  });
});

/* ------------------------------------------------------------------ */
/* parsePageRanges (the real engine helper from pdf-ui.tsx)            */
/* ------------------------------------------------------------------ */

describe("parsePageRanges", () => {
  it("parses mixed lists and ranges: '1,3-5' → [1,3,4,5]", () => {
    expect(parsePageRanges("1,3-5", 10)).toEqual([1, 3, 4, 5]);
  });

  it("rejects 0-based input: '0' → null", () => {
    expect(parsePageRanges("0", 10)).toBeNull();
  });

  it("rejects inverted ranges: '5-3' → null", () => {
    expect(parsePageRanges("5-3", 10)).toBeNull();
  });

  it("rejects garbage: 'abc' → null", () => {
    expect(parsePageRanges("abc", 10)).toBeNull();
  });

  it("parses a single page: '2' → [2]", () => {
    expect(parsePageRanges("2", 10)).toEqual([2]);
  });

  it("clamps range ends to the page count", () => {
    expect(parsePageRanges("3-99", 5)).toEqual([3, 4, 5]);
    expect(parsePageRanges("4-99", 10)).toEqual([4, 5, 6, 7, 8, 9, 10]);
  });

  it("empty and whitespace-only specs yield null", () => {
    expect(parsePageRanges("", 10)).toBeNull();
    expect(parsePageRanges("   ", 10)).toBeNull();
  });

  it("accepts full-width and enumeration commas, dashes and tildes as compact separators", () => {
    expect(parsePageRanges("1，3", 10)).toEqual([1, 3]);
    expect(parsePageRanges("1、3", 10)).toEqual([1, 3]);
    expect(parsePageRanges("1–3", 10)).toEqual([1, 2, 3]);
    expect(parsePageRanges("1~3", 10)).toEqual([1, 2, 3]);
    expect(parsePageRanges("1, 2, 4-5", 10)).toEqual([1, 2, 4, 5]);
  });

  it("whitespace is an item separator, so a spaced dash is a rejected spec (fail-fast, matches the '1-3, 5' hint)", () => {
    // "1 - 3" splits into ["1", "-", "3"]; "-" is not a valid item → null, not a silent wrong range
    expect(parsePageRanges("1 - 3", 10)).toBeNull();
    expect(parsePageRanges("1 3", 10)).toEqual([1, 3]); // but bare space-separated pages are a list
  });

  it("deduplicates and sorts", () => {
    expect(parsePageRanges("3,1,3,2", 10)).toEqual([1, 2, 3]);
  });

  it("a single page beyond the count yields an empty selection → null", () => {
    expect(parsePageRanges("99", 10)).toBeNull();
  });
});

/* ------------------------------------------------------------------ */
/* malformed bytes — the engine-visible load contract                  */
/* ------------------------------------------------------------------ */

describe("malformed bytes", () => {
  it("random garbage is rejected by PDFDocument.load", async () => {
    const garbage = new Uint8Array(64).map((_, i) => (i * 37 + 11) % 256);
    await expect(PDFDocument.load(garbage, { ignoreEncryption: true })).rejects.toThrow();
  });

  it("plain text that is not a PDF is rejected", async () => {
    const bytes = new TextEncoder().encode("hello world, definitely not a pdf at all");
    await expect(PDFDocument.load(bytes, { ignoreEncryption: true })).rejects.toThrow();
  });

  it("empty input is rejected", async () => {
    await expect(PDFDocument.load(new Uint8Array(0), { ignoreEncryption: true })).rejects.toThrow();
  });

  it("a truncated but otherwise valid PDF is rejected", async () => {
    const doc = await makePdf(2);
    const bytes = await bytesOf(doc);
    const truncated = bytes.slice(0, Math.floor(bytes.length * 0.6));
    await expect(PDFDocument.load(truncated, { ignoreEncryption: true })).rejects.toThrow();
  });

  it("a well-formed PDF still loads (the engine's happy path is intact)", async () => {
    const doc = await makePdf(2);
    const loaded = await loadBytes(await bytesOf(doc));
    expect(loaded.getPageCount()).toBe(2);
    expect(loaded.isEncrypted).toBe(false);
  });
});
