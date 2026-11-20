import { describe, expect, it } from "vitest";
import { LOCALES } from "@/lib/site";
import unlock from "@/tools/pdf/unlock-pdf";
import word from "@/tools/pdf/word-to-pdf";
import redact from "@/tools/pdf/redact-pdf";
import { OFFICE_UI, OCR_LANGUAGES, OCR_UI, PROTECT_UI, REDACT_UI } from "@/tools/_engines/pdf-locales";
import { redactPdfCopy, UNLOCK_COPY, wordPdfCopy } from "@/tools/_lib/pdf-capability-copy";

describe("PDF capability disclosures", () => {
  it.each(LOCALES)("states the actual protection-check capability in %s", (locale) => {
    const copy = unlock.copy[locale];
    expect(copy?.intro).toContain(PROTECT_UI.unlockNote[locale]);
    expect(copy?.steps).toHaveLength(3);
    expect(copy?.faqs.length).toBeGreaterThanOrEqual(2);
    expect(copy?.deepDive).toBeUndefined();
  });

  it("has an explicit localized value for every touched engine action, guard, and error", () => {
    for (const group of [OFFICE_UI, OCR_UI, PROTECT_UI, REDACT_UI]) {
      for (const [key, text] of Object.entries(group)) {
        expect(Object.keys(text).sort(), key).toEqual([...LOCALES].sort());
        for (const locale of LOCALES) expect(text[locale]?.trim().length, `${key}:${locale}`).toBeGreaterThan(0);
      }
    }
    for (const language of OCR_LANGUAGES) expect(Object.keys(language.label).sort()).toEqual([...LOCALES].sort());
  });

  it.each(["en", "zh", "ja", "es", "pt"] as const)("keeps %s document copy aligned with the actual font and redaction limits", (locale) => {
    expect(word.copy[locale]?.intro).toContain(OFFICE_UI.wordLimit[locale]);
    expect(redact.copy[locale]?.intro).toContain(REDACT_UI.redactNote[locale]);
    expect(word.copy[locale]?.deepDive).toBeUndefined();
    expect(redact.copy[locale]?.deepDive).toBeUndefined();
  });

  it.each(LOCALES)("keeps capability summaries concise for %s search results", (locale) => {
    for (const copy of [UNLOCK_COPY[locale], wordPdfCopy(locale), redactPdfCopy(locale)]) {
      expect(copy.tagline.length).toBeGreaterThanOrEqual(locale === "zh" || locale === "ja" ? 32 : 80);
      expect(copy.tagline.length).toBeLessThanOrEqual(165);
    }
  });

  it.each(LOCALES)("qualifies rejected image resources as XObjects in the %s notice and error", (locale) => {
    expect(REDACT_UI.redactNote[locale]).toContain("XObject");
    expect(REDACT_UI.unsupported[locale]).toContain("XObject");
    expect(redactPdfCopy(locale).intro.join(" ")).toContain("XObject");
  });

  it("states that unmarked content is intentionally retained and duplicated secrets must be marked", () => {
    const copy = redactPdfCopy("en");
    expect(copy.faqs[1].a).toContain("intentionally retained");
    expect(copy.faqs[1].a).toContain("duplicated");
    expect(copy.faqs[1].a).toContain("not a general-purpose PDF sanitization tool");
    expect(copy.steps[2]).toContain("duplicated");
    expect(copy.tagline).toMatch(/external/i);
  });
});
