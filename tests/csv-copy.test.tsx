import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { LOCALES } from "@/lib/site";
import { dict } from "@/lib/i18n";
import { I18nProvider } from "@/components/i18n-provider";
import { DevCsvEngine } from "@/tools/_engines/dev-engine-csv";
import { CSV_MESSAGES, csvCapabilityCopy, csvErrorText, csvLimitsText } from "@/tools/_lib/csv-copy";
import { toolCopy } from "@/lib/tool-copy";
import jsonTool from "@/tools/developer/json-to-csv";
import csvTool from "@/tools/developer/csv-to-json";

describe("CSV authored rules and accessible initial states", () => {
  it.each(LOCALES)("provides complete localized data-loss rules for %s", (locale) => {
    const messages = CSV_MESSAGES[locale];
    expect(Object.keys(messages).sort()).toEqual(Object.keys(CSV_MESSAGES.en).sort());
    for (const text of Object.values(messages)) expect(text.trim().length).toBeGreaterThan(0);
    expect(messages.inference).toContain("9007199254740991");
    expect(csvLimitsText(locale)).toContain("1000000");
    expect(csvLimitsText(locale)).toContain("4000000");
    expect(csvLimitsText(locale)).not.toMatch(/\{(?:input|output|depth|values)\}/);
    for (const error of ["input", "delimiter", "json", "array", "duplicate", "csv", "headers", "rows", "columns", "limit"] as const) expect(csvErrorText(locale, error).length).toBeGreaterThan(5);
    if (locale !== "en") {
      expect(messages.inference).not.toBe(CSV_MESSAGES.en.inference);
      expect(messages.jsonError).not.toBe(CSV_MESSAGES.en.jsonError);
    }
  });

  it.each(LOCALES)("renders both real engine directions and all three labeled delimiters for %s", (locale) => {
    for (const direction of ["json2csv", "csv2json"] as const) {
      const html = renderToStaticMarkup(createElement(I18nProvider, { locale, dict: dict(locale) } as Parameters<typeof I18nProvider>[0], createElement(DevCsvEngine, { direction })));
      expect(html).toContain(`data-csv-tool="${direction}"`);
      expect(html).toContain('data-csv-delimiter="tab"');
      expect(html).toContain('aria-pressed="true"');
      expect(html).toContain("aria-describedby");
      expect(html).toContain('aria-invalid="false"');
      expect(html).toContain("<legend");
      expect(html).toContain('readOnly=""');
      expect(html.match(/<textarea[^>]*dir="ltr"/g)).toHaveLength(2);
      expect(html).toContain("min-h-11");
    }
  });

  it.each(LOCALES)("replaces stale unlimited/overwrite promises in both metadata directions for %s", (locale) => {
    for (const [tool, direction] of [[jsonTool, "json2csv"], [csvTool, "csv2json"]] as const) {
      const base = toolCopy(tool, locale);
      expect(base.intro).toContain(csvLimitsText(locale));
      expect(base.intro).toContain(CSV_MESSAGES[locale].shape);
      const copy = csvCapabilityCopy(locale, base, direction);
      expect(copy.steps).toHaveLength(3);
      expect(copy.faqs).toHaveLength(2);
      expect(copy.deepDive).toBeUndefined();
      expect(copy.intro).toContain(csvLimitsText(locale));
      expect(copy.intro).toContain(CSV_MESSAGES[locale].shape);
      expect(copy.faqs[0].a).toContain(CSV_MESSAGES[locale].shape);
    }
  });
});
