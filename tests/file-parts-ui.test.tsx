import { File } from "node:buffer";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { I18nProvider } from "@/components/i18n-provider";
import { dict } from "@/lib/i18n";
import { LOCALES } from "@/lib/site";
import { FilePartsEngine, prepareFileParts } from "@/tools/_engines/util-engine-file-parts";
import { FILE_PARTS_MESSAGES } from "@/tools/_lib/file-parts-copy";
import tool from "@/tools/utility/file-splitter-merger";
const escaped = (text: string) => renderToStaticMarkup(<span>{text}</span>).replace(/^<span>|<\/span>$/g, "");
const file = (bytes: number[], name: string) => new File([Uint8Array.from(bytes)], name) as unknown as globalThis.File;
describe("file split and merge outputs", () => {
  it("builds downloadable Blob slices and merges in user-selected order without decoding", async () => {
    const source = file([0, 255, 1, 128, 13, 10, 0], "sample.bin");
    const split = prepareFileParts([source], "split", { mode: "size", partBytes: 3 }, "ignored");
    expect(split.error).toBeNull(); expect(split.outputs.map(output => output.name)).toEqual(["sample.bin.part001", "sample.bin.part002", "sample.bin.part003"]);
    const parts = await Promise.all(split.outputs.map(async output => [...new Uint8Array(await output.blob.arrayBuffer())]));
    expect(parts).toEqual([[0,255,1], [128,13,10], [0]]);
    const reversed = prepareFileParts([file(parts[2], "c"), file(parts[1], "b"), file(parts[0], "a")], "merge", { mode: "size", partBytes: 3 }, "../joined.bin");
    expect(reversed.outputs[0].name).toBe(".._joined.bin");
    expect([...new Uint8Array(await reversed.outputs[0].blob.arrayBuffer())]).toEqual([0,128,13,10,0,255,1]);
  });
  it("supports count mode, empty source and visible minimum merge selection", () => {
    expect(prepareFileParts([file([1,2,3,4,5], "x")], "split", { mode: "count", partCount: 2 }, "").outputs.map(part => part.blob.size)).toEqual([3, 2]);
    expect(prepareFileParts([file([], "empty")], "split", { mode: "size", partBytes: 3 }, "").outputs[0].blob.size).toBe(0);
    expect(prepareFileParts([], "split", { mode: "size", partBytes: 3 }, "").error).toBe("input");
    expect(prepareFileParts([file([1], "x")], "merge", { mode: "size", partBytes: 3 }, "").error).toBe("merge-count");
  });
});
describe("native file-part interface and page copy", () => {
  it.each(LOCALES)("renders honest local controls and limits in %s", locale => {
    const L = FILE_PARTS_MESSAGES[locale];
    const html = renderToStaticMarkup(<I18nProvider locale={locale} dict={dict(locale)}><FilePartsEngine /></I18nProvider>);
    for (const text of [L.local, L.scope, L.limits, L.mode, L.split, L.merge, L.bySize, L.byCount, L.partBytes, L.dropOne, L.empty]) expect(html).toContain(escaped(text));
    expect(html).toContain('type="file"'); expect(html).not.toContain('accept=');
    expect(html).not.toContain('data-file-part-download'); expect(html).not.toContain('role="alert"');
    expect(html).toContain('dir="ltr"'); if (locale === "ar") expect(html).toContain('dir="rtl"');
    const copy = tool.copy[locale]!; expect(copy.name).toBeTruthy();
    expect(copy.tagline.length).toBeGreaterThanOrEqual(locale === "zh" || locale === "ja" ? 32 : 80);
    expect(copy.steps).toHaveLength(3); expect(copy.intro).toHaveLength(3); expect(copy.faqs).toHaveLength(2);
    for (const key of ["inputError", "sizeError", "partSizeError", "countError", "fileCountError", "mergeCountError", "processingError", "downloadError"] as const) {
      expect(L[key]).toBeTruthy(); if (locale !== "en") expect(L[key]).not.toBe(FILE_PARTS_MESSAGES.en[key]);
    }
  });
});
