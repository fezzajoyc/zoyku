import { describe, expect, it } from "vitest";
import { LOCALES } from "@/lib/site";
import { LINE_NUMBER_MESSAGES, lineNumbersError, lineNumbersToolCopy } from "@/tools/_lib/line-numbers-copy";
import type { LineNumbersError } from "@/tools/_lib/line-numbers";

const errors: LineNumbersError[] = ["input-type", "input-limit", "line-limit", "options", "position", "start", "step", "padding", "separator", "number-limit", "output-limit"];

describe("line-number pages and controls have authored native copy", () => {
  const copy = lineNumbersToolCopy();
  it("provides a distinct native page and runtime dictionary for every supported locale", () => {
    expect(Object.keys(copy).sort()).toEqual([...LOCALES].sort());
    expect(Object.keys(LINE_NUMBER_MESSAGES).sort()).toEqual([...LOCALES].sort());
    expect(new Set(LOCALES.map((locale) => copy[locale].tagline)).size).toBe(15);
    for (const locale of LOCALES) {
      expect(copy[locale].tagline.length).toBeGreaterThanOrEqual(["zh", "ja"].includes(locale) ? 32 : 80);
      expect(copy[locale].steps).toHaveLength(3);
      expect(copy[locale].faqs).toHaveLength(2);
      expect(copy[locale].intro.length).toBeGreaterThanOrEqual(2);
      for (const label of Object.values(LINE_NUMBER_MESSAGES[locale])) expect(label.trim().length).toBeGreaterThan(0);
      for (const error of errors) {
        const message = lineNumbersError(locale, error);
        expect(message.length).toBeGreaterThan(5);
        if (locale !== "en") expect(message).not.toBe(lineNumbersError("en", error));
      }
    }
  });
  it("explains terminal empty lines, literal separators, space padding and newline normalization", () => {
    const en = copy.en.intro.join(" ");
    expect(en).toContain("final empty line");
    expect(en).toContain("CRLF");
    expect(en).toContain("LF");
    expect(en).toContain("spaces");
    expect(en).toContain("literally");
    expect(lineNumbersError("en", "input-limit")).toContain("100,000");
    expect(lineNumbersError("en", "output-limit")).toContain("300,000");
    expect(lineNumbersError("en", "line-limit")).toContain("10,000");
  });
});
