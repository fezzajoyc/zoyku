import { File } from "node:buffer";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { I18nProvider } from "@/components/i18n-provider";
import { dict } from "@/lib/i18n";
import { LOCALES, type Locale } from "@/lib/site";
import { DevFileTypeEngine, FileSignatureResult, readFileSignature, type LocalFileSignatureReport } from "@/tools/_engines/dev-engine-file-type";
import { FILE_SIGNATURE_MESSAGES } from "@/tools/_lib/file-signature-copy";
import tool from "@/tools/developer/file-type-detector";

const escaped = (value: string) => renderToStaticMarkup(<span>{value}</span>).replace(/^<span>|<\/span>$/g, "");
const resultMarkup = (report: LocalFileSignatureReport, locale: Locale) => renderToStaticMarkup(
  <I18nProvider locale={locale} dict={dict(locale)}><FileSignatureResult report={report} locale={locale} /></I18nProvider>,
);

describe("file signature initial UI", () => {
  it.each(LOCALES)("offers native rules and honest empty state in %s", locale => {
    const html = renderToStaticMarkup(<I18nProvider locale={locale} dict={dict(locale)}><DevFileTypeEngine /></I18nProvider>);
    const L = FILE_SIGNATURE_MESSAGES[locale];
    for (const text of [L.drop, L.local, L.rule, L.empty]) expect(html).toContain(escaped(text));
    expect(html).toContain('type="file"');
    expect(html).not.toContain('accept=');
    expect(html).not.toContain('multiple=');
    expect(html).not.toContain('data-copy-button');
    expect(html).not.toContain('role="alert"');
    expect(html).toContain('aria-describedby="file-signature-rules"');
    if (locale === "ar") expect(html).toContain('dir="rtl"');
  });
});

describe("bounded local file reading and report semantics", () => {
  it("reads just a bounded header while retaining untrusted metadata separately", async () => {
    const file = new File([new Uint8Array([137,80,78,71,13,10,26,10]), new Uint8Array(100_000)], "renamed.exe", { type: "text/plain" });
    const report = await readFileSignature(file as unknown as globalThis.File);
    expect(report.bytesRead).toBe(65_536);
    expect(report.metadata).toEqual({ name: "renamed.exe", size: 100_008, browserMime: "text/plain", extension: "exe" });
    expect(report.signature?.id).toBe("png");
    expect(report.hexPreview.split(" ")).toHaveLength(64);
    expect(report.hexPreview).toMatch(/^89 50 4E 47 0D 0A 1A 0A/);
    const html = resultMarkup(report, "en");
    expect(html).toContain(FILE_SIGNATURE_MESSAGES.en.metadata);
    expect(html).toContain("image/png");
    expect(html).toContain("text/plain");
    expect(html).toContain('dir="ltr"');
    expect(html).toContain('data-copy-button');
  });
  it("reports empty or unsupported headers as unknown rather than corrupt", async () => {
    const report = await readFileSignature(new File([], "empty.txt") as unknown as globalThis.File);
    expect(report.signature).toBeNull();
    expect(report.bytesRead).toBe(0);
    const html = resultMarkup(report, "en");
    expect(html).toContain(FILE_SIGNATURE_MESSAGES.en.unknown);
    expect(html).not.toContain('role="alert"');
    expect(html).not.toContain("invalid file");
  });
  it("keeps ZIP generic even when the filename claims an Office subtype", async () => {
    const report = await readFileSignature(new File([new Uint8Array([80,75,3,4])], "document.docx") as unknown as globalThis.File);
    expect(report.signature?.id).toBe("zip");
    const html = resultMarkup(report, "ar");
    expect(html).toContain(escaped(FILE_SIGNATURE_MESSAGES.ar.container));
    expect(html).toContain("application/zip");
    expect(html).not.toContain("application/vnd.openxmlformats");
    expect(html).toContain('dir="ltr"');
  });
});

describe("file signature native copy", () => {
  it.each(LOCALES)("has original page, controls and all errors in %s", locale => {
    const copy = tool.copy[locale]!;
    expect(copy.name).toBeTruthy();
    expect(copy.tagline.length).toBeGreaterThanOrEqual(locale === "zh" || locale === "ja" ? 32 : 80);
    expect(copy.intro).toHaveLength(3);
    expect(copy.steps).toHaveLength(3);
    expect(copy.faqs).toHaveLength(2);
    expect(Object.keys(FILE_SIGNATURE_MESSAGES[locale])).toEqual(Object.keys(FILE_SIGNATURE_MESSAGES.en));
    for (const key of ["readError", "invalid", "unknown", "loading", "rule", "metadata", "container"] as const) {
      expect(FILE_SIGNATURE_MESSAGES[locale][key]).toBeTruthy();
      if (locale !== "en") expect(FILE_SIGNATURE_MESSAGES[locale][key]).not.toBe(FILE_SIGNATURE_MESSAGES.en[key]);
    }
    if (locale !== "en") expect(copy.name).not.toBe(tool.copy.en.name);
  });
});
