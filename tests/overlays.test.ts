import { describe, expect, it } from "vitest";
import { ALL_TOOLS } from "@/tools/registry";
import { OVERLAYS } from "@/tools/_i18n";
import { LOCALES, type Locale } from "@/lib/site";

const SLUGS = new Set(ALL_TOOLS.map((t) => t.slug));

describe("translation overlays", () => {
  it("every overlay language covers the registry through native or overlay copy, without unknown slugs", () => {
    for (const [locale, overlay] of Object.entries(OVERLAYS)) {
      expect(LOCALES).toContain(locale);
      const keys = new Set(Object.keys(overlay));
      // toolCopy deliberately gives a tool's authored locale copy precedence.
      // A tool with all 15 authored locales does not need duplicate overlays.
      const missing = ALL_TOOLS.filter((tool) => !tool.copy[locale as Locale] && !keys.has(tool.slug)).map((tool) => tool.slug);
      const extra = [...keys].filter((s) => !SLUGS.has(s));
      expect(missing, `${locale} missing: ${missing.join(",")}`).toEqual([]);
      expect(extra, `${locale} extra: ${extra.join(",")}`).toEqual([]);
    }
  });

  it("overlay copy meets the quality contract per locale", () => {
    for (const [locale, overlay] of Object.entries(OVERLAYS)) {
      for (const [slug, c] of Object.entries(overlay)) {
        expect(c.name.trim().length, `${locale}:${slug} name`).toBeGreaterThan(1);
        // 与 registry.test 同阈值:非 CJK ≥80,否则 ≥32
        const min = locale === "zh" || locale === "ja" ? 32 : 80;
        expect(c.tagline.length, `${locale}:${slug} tagline ${c.tagline.length}`).toBeGreaterThanOrEqual(min);
        expect(c.intro.length).toBeGreaterThanOrEqual(1);
        expect(c.steps.length).toBeGreaterThanOrEqual(3);
        expect(c.faqs.length).toBeGreaterThanOrEqual(2);
      }
    }
  });

  it("every LOCALES entry is either core, registered overlay, or falls back to en", () => {
    // 15 语都必须能取到文案(经 toolCopy 回退链),不允许 undefined
    for (const tool of ALL_TOOLS) {
      for (const locale of LOCALES) {
        const c = tool.copy[locale] ?? OVERLAYS[locale]?.[tool.slug] ?? tool.copy.en;
        expect(c, `${locale}:${tool.slug}`).toBeTruthy();
      }
    }
  });
});
