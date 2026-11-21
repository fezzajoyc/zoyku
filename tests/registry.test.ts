import { describe, expect, it } from "vitest";
import { LOCALES } from "@/lib/site";
import { ALL_TOOLS, TOOL_BY_SLUG, toolsByCategory } from "@/tools/registry";
import { toolCopy } from "@/lib/tool-copy";

const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;

describe("registry integrity", () => {
  it("has a healthy volume of tools", () => {
    expect(ALL_TOOLS.length).toBeGreaterThanOrEqual(100);
    // 精确锚定:新工具上/下架时必须有意识地更新本行 + README/benchmark 的统计数字(防止文档漂移)
    expect(ALL_TOOLS.length).toBe(225);
  });

  it("slugs are unique and kebab-case", () => {
    const seen = new Set<string>();
    for (const tool of ALL_TOOLS) {
      expect(tool.slug).toMatch(SLUG_RE);
      expect(seen.has(tool.slug)).toBe(false);
      seen.add(tool.slug);
    }
    expect(TOOL_BY_SLUG.size).toBe(ALL_TOOLS.length);
  });

  it("every tool has complete copy in every locale (native or overlay, else en fallback)", () => {
    for (const tool of ALL_TOOLS) {
      for (const locale of LOCALES) {
        const c = toolCopy(tool, locale);
        expect(c, `${tool.slug}:${locale} missing`).toBeTruthy();
        expect(c.name.trim().length).toBeGreaterThan(1);
        // CJK 信息密度约为拉丁文两倍,阈值分语言
        const min = locale === "zh" || locale === "ja" ? 32 : 80;
        expect(c.tagline.length, `${tool.slug}:${locale} tagline ${c.tagline.length}`).toBeGreaterThanOrEqual(min);
        expect(c.intro.length).toBeGreaterThanOrEqual(1);
        expect(c.steps.length).toBeGreaterThanOrEqual(3);
        expect(c.faqs.length).toBeGreaterThanOrEqual(2);
        for (const f of c.faqs) {
          expect(f.q.trim()).toBeTruthy();
          expect(f.a.trim()).toBeTruthy();
        }
      }
    }
  });

  it("related slugs all resolve", () => {
    for (const tool of ALL_TOOLS) {
      expect(tool.related.length, tool.slug).toBeGreaterThanOrEqual(2);
      for (const slug of tool.related) {
        expect(TOOL_BY_SLUG.has(slug), `${tool.slug} → ${slug} dangling`).toBe(true);
      }
    }
  });

  it.each([
    ["social-credit-generator", "social-credit-validator", "security"],
    ["rmb-uppercase-to-number", "rmb-uppercase", "utility"],
  ] as const)("registers %s with native copy and a reciprocal link to %s", (slug, companion, category) => {
    const tool = TOOL_BY_SLUG.get(slug);
    expect(tool?.category).toBe(category);
    expect(tool?.related).toContain(companion);
    expect(TOOL_BY_SLUG.get(companion)?.related).toContain(slug);
    for (const locale of LOCALES) {
      expect(tool?.copy[locale]?.name.trim(), `${slug}:${locale} lacks native copy`).toBeTruthy();
    }
  });

  it("registers image pixel sampling separately from the screen color picker", () => {
    const tool = TOOL_BY_SLUG.get("image-color-picker");
    expect(tool?.category).toBe("image");
    expect(tool?.related).toContain("color-picker");
    expect(tool?.copy.en.tagline).toContain("local image");
    expect(TOOL_BY_SLUG.get("color-picker")?.category).toBe("utility");
  });

  it("registers IPv4 range expansion as a dedicated searchable page", () => {
    const tool = TOOL_BY_SLUG.get("ipv4-range-expander");
    expect(tool?.category).toBe("utility");
    expect(tool?.related).toContain("ipv4-subnet-calculator");
    expect(tool?.copy.en.tagline).toContain("range");
    for (const locale of LOCALES) {
      const copy = toolCopy(tool!, locale);
      expect(copy.name.trim(), locale).toBeTruthy();
      expect(copy.steps.length, locale).toBeGreaterThanOrEqual(3);
      expect(copy.faqs.length, locale).toBeGreaterThanOrEqual(2);
    }
  });

  it("every category has tools", () => {
    const cats = new Set(ALL_TOOLS.map((t) => t.category));
    expect(cats.size).toBe(7);
    for (const cat of cats) {
      expect(toolsByCategory(cat).length).toBeGreaterThan(0);
    }
  });

  it.each([
    ["csv-table-editor", "developer"],
    ["text-sequence-generator", "text"],
    ["character-frequency-counter", "text"],
    ["byte-encoding-converter", "developer"],
    ["image-palette-generator", "image"],
    ["line-number-generator", "text"],
    ["file-type-detector", "developer"],
    ["text-line-filter", "text"],
    ["uuid-validator-converter", "developer"],
    ["file-splitter-merger", "utility"],
  ])("registers %s with original copy in all supported languages", (slug, category) => {
    const tool = TOOL_BY_SLUG.get(slug);
    expect(tool?.category).toBe(category);
    for (const locale of LOCALES) {
      expect(tool?.copy[locale]?.name.trim(), `${slug}:${locale}`).toBeTruthy();
    }
  });
});
