import { describe, expect, it } from "vitest";
import { LOCALES } from "@/lib/site";
import { toolCopy } from "@/lib/tool-copy";
import compressor from "@/tools/image/image-compressor";

const MEMORY_TERMS = {
  en: "memory", zh: "内存", ja: "メモリ", es: "memoria", pt: "memória",
  fr: "mémoire", de: "Arbeitsspeicher", ru: "памят", it: "memoria", tr: "bellek",
  ko: "메모리", ar: "ذاكرة", hi: "मेमोरी", id: "memori", vi: "bộ nhớ",
};
describe("image compressor capability contract", () => {
  it("does not promise RAW support, unlimited capacity or per-file settings", () => {
    const copy = toolCopy(compressor, "en");
    const text = JSON.stringify(copy);
    expect(text).not.toMatch(/RAW export|adjust it individually|no file-size cap|as many as you like/);
    expect(text).toContain("shared");
    expect(text).toContain("larger");
    expect(text).toContain("HEIC");
  });
  it.each(LOCALES)("makes formats and actual device limits visible in %s", locale => {
    const copy = toolCopy(compressor, locale);
    const text = JSON.stringify(copy);
    expect(text).toContain("JPG");
    expect(text).toContain("WebP");
    expect(text).toContain("PNG");
    expect(text.toLowerCase()).toContain(MEMORY_TERMS[locale].toLowerCase());
    expect(copy.steps.length).toBeGreaterThanOrEqual(3);
    expect(copy.faqs.length).toBeGreaterThanOrEqual(2);
  });
});
