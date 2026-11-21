import { describe, expect, it } from "vitest";
import { LOCALES } from "@/lib/site";
import { TEXT_LINE_FILTER_COPY, TEXT_LINE_FILTER_MESSAGES, textLineFilterError, textLineFilterToolCopy } from "@/tools/_lib/text-line-filter-copy";
import type { TextLineFilterError } from "@/tools/_lib/text-line-filter";

const errors: TextLineFilterError[] = ["input-type", "options", "input-limit", "line-limit", "mode", "query", "range", "length", "delimiter", "column", "missing-column", "output-limit"];
describe("text filter native page and runtime scope", () => {
  it("provides all page, actual-control and error copy in each of the 15 languages", () => {
    const copy = textLineFilterToolCopy();
    expect(Object.keys(copy).sort()).toEqual([...LOCALES].sort());
    expect(new Set(LOCALES.map((locale) => copy[locale].tagline)).size).toBe(15);
    for (const locale of LOCALES) {
      expect(copy[locale].tagline.length).toBeGreaterThanOrEqual(["zh", "ja"].includes(locale) ? 32 : 80);
      expect(copy[locale].steps).toHaveLength(3);
      expect(copy[locale].faqs).toHaveLength(2);
      expect(copy[locale].intro.length).toBeGreaterThanOrEqual(2);
      expect(Object.keys(TEXT_LINE_FILTER_MESSAGES[locale])).toEqual(Object.keys(TEXT_LINE_FILTER_MESSAGES.en));
      for (const value of Object.values(TEXT_LINE_FILTER_MESSAGES[locale])) expect(value.length).toBeGreaterThan(0);
      for (const error of errors) {
        expect(textLineFilterError(locale, error).length).toBeGreaterThan(5);
        if (locale !== "en") expect(textLineFilterError(locale, error)).not.toBe(textLineFilterError("en", error));
      }
    }
  });
  it("discloses Unicode codepoints, literal columns, newline and regex boundaries", () => {
    const en = TEXT_LINE_FILTER_COPY.en;
    expect(en.rules).toContain("code points");
    expect(en.rules).toContain("combining marks");
    expect(en.rules).toContain("locale-independent");
    expect(en.rules).toContain("no CSV quote");
    expect(en.rules).toContain("final empty line");
    expect(en.limits).toContain("regular expressions are not interpreted");
    expect(en.labels.emptyResult).not.toBe(en.labels.noMatch);
  });
});
