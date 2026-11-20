import { describe, expect, it } from "vitest";
import { LOCALES } from "@/lib/site";
import { toolCopy } from "@/lib/tool-copy";
import formatter from "@/tools/developer/json-formatter";
import minifier from "@/tools/developer/json-minifier";
import { JSON_FORMAT_LIMITS } from "@/tools/_lib/json-format";
import { JSON_CAPABILITY_MESSAGES, jsonFormatLimitMessage, jsonFormatResourceNote } from "@/tools/_lib/json-capability-copy";

describe("JSON formatter and minifier capability contract", () => {
  it.each(LOCALES)("documents literal preservation and bounded resources in %s", (locale) => {
    for (const tool of [formatter, minifier]) {
      const copy = toolCopy(tool, locale);
      const text = JSON.stringify(copy);
      expect(text, `${tool.slug}:${locale}`).toContain("UTF-16");
      for (const limit of Object.values(JSON_FORMAT_LIMITS)) expect(text).toContain(limit.toLocaleString("en-US"));
      expect(text).toContain("Unicode");
      expect(copy.steps.length).toBeGreaterThanOrEqual(3);
      expect(copy.faqs.length).toBeGreaterThanOrEqual(3);
      expect(copy.deepDive).toBeUndefined();
    }
  });

  it("replaces stale JavaScript-number and unlimited-size claims", () => {
    const format = JSON.stringify(toolCopy(formatter, "en"));
    const minify = JSON.stringify(toolCopy(minifier, "en"));
    for (const text of [format, minify]) {
      expect(text).toContain("number literals");
      expect(text).toContain("duplicate");
      expect(text).toContain("downstream");
      expect(text).toContain("reject");
      expect(text).not.toMatch(/parsed as IEEE|no size ceilings|numbers are parsed|byte-for-byte equivalent JSON/i);
    }
    expect(format).toContain("stable");
    expect(format).toContain("decoded");
    expect(format).toContain("array order");
    expect(minify).toContain("outside strings");
  });

  it.each(LOCALES)("authors all resource rejection messages without fallback for %s", (locale) => {
    const limits = { input: JSON_FORMAT_LIMITS.inputCharacters, output: JSON_FORMAT_LIMITS.outputCharacters,
      depth: JSON_FORMAT_LIMITS.maxDepth, values: JSON_FORMAT_LIMITS.maxValues };
    const note = jsonFormatResourceNote(locale);
    expect(note).not.toMatch(/\{\w+\}/);
    for (const kind of ["input", "output", "depth", "values"] as const) {
      const raw = JSON_CAPABILITY_MESSAGES[locale].errors[kind];
      expect(typeof raw).toBe("string");
      expect(raw.length).toBeGreaterThan(20);
      const message = jsonFormatLimitMessage(locale, kind);
      expect(message).toContain(limits[kind].toLocaleString("en-US"));
      expect(message).not.toMatch(/\{\w+\}/);
      if (locale !== "en") expect(message).not.toBe(jsonFormatLimitMessage("en", kind));
    }
  });
});
