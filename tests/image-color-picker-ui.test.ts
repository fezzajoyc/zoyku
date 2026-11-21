import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { LOCALES } from "@/lib/site";
import { IMAGE_COLOR_PICKER_MESSAGES } from "@/tools/_lib/image-color-picker-copy";

const source = readFileSync(new URL("../tools/_engines/image-engine-color-picker.tsx", import.meta.url), "utf8");

function stringLeaves(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(stringLeaves);
  if (value && typeof value === "object") return Object.values(value).flatMap(stringLeaves);
  return [];
}

describe("image color picker UI contract", () => {
  it("authors every visible label and error in all supported locales", () => {
    expect(Object.keys(IMAGE_COLOR_PICKER_MESSAGES).sort()).toEqual([...LOCALES].sort());
    const englishShape = Object.keys(IMAGE_COLOR_PICKER_MESSAGES.en).sort();

    for (const locale of LOCALES) {
      const messages = IMAGE_COLOR_PICKER_MESSAGES[locale];
      expect(Object.keys(messages).sort(), locale).toEqual(englishShape);
      expect(messages.errors, `${locale} errors`).toBeDefined();
      expect(Object.keys(messages.errors).sort(), `${locale} error keys`).toEqual(Object.keys(IMAGE_COLOR_PICKER_MESSAGES.en.errors).sort());
      for (const value of stringLeaves(messages)) expect(value.trim().length, `${locale}: ${value}`).toBeGreaterThan(3);
    }
  });

  it("provides accessible pointer, keyboard and coordinate sampling controls", () => {
    expect(source).toContain('role="img"');
    expect(source).toContain("tabIndex={0}");
    for (const key of ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"]) expect(source).toContain(key);
    expect(source).toContain("mapPointerToPixel");
    expect(source).toContain("onClick");
    expect(source).toContain("L.xLabel");
    expect(source).toContain("L.yLabel");
    expect(source).toContain('aria-describedby=');
    expect(source).toContain('inputMode="numeric"');
  });

  it("announces state and errors, supports copy and clear, and releases local resources", () => {
    expect(source).toContain('role="status"');
    expect(source).toContain('role="alert"');
    expect(source).toContain("<CopyButton");
    expect(source).toContain("L.clear");
    expect(source).toContain("URL.revokeObjectURL");
    expect(source).toContain("IMAGE_COLOR_PICKER_LIMITS.maxFileBytes");
    expect(source).toContain("IMAGE_COLOR_PICKER_LIMITS.maxPixels");
    expect(source).toContain("IMAGE_COLOR_PICKER_LIMITS.maxSide");
    expect(source).toContain('accept="image/*"');
    expect(source).toContain("multiple={false}");
  });
});
