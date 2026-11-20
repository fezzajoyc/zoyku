import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { LOCALES } from "@/lib/site";
import { dict } from "@/lib/i18n";
import { I18nProvider } from "@/components/i18n-provider";
import { ChineseIdEngine } from "@/tools/_engines/chinese-id-engine";
import { CHINESE_ID_STANDARD_URL } from "@/tools/_lib/chinese-id";
import { CHINESE_ID_MESSAGES } from "@/tools/_lib/chinese-id-copy";
import validator from "@/tools/security/chinese-id-validator";
import generator from "@/tools/security/chinese-id-generator";

describe("Chinese ID localized routes", () => {
  it.each(LOCALES)("authors metadata and every UI/error label natively for %s", (locale) => {
    const messages = CHINESE_ID_MESSAGES[locale];
    expect(messages).toBeDefined();
    for (const [key, value] of Object.entries(messages)) {
      if (key === "errors") {
        for (const message of Object.values(value)) expect(String(message).trim().length).toBeGreaterThan(2);
      } else expect(String(value).trim().length, `${locale}:${key}`).toBeGreaterThan(0);
    }
    expect(Object.keys(messages).sort()).toEqual(Object.keys(CHINESE_ID_MESSAGES.en).sort());
    expect(Object.keys(messages.errors).sort()).toEqual(Object.keys(CHINESE_ID_MESSAGES.en.errors).sort());
    for (const tool of [validator, generator]) {
      const copy = tool.copy[locale]!;
      expect(copy, `${locale} must have authored copy, without fallback`).toBeDefined();
      expect(copy.tagline.length).toBeGreaterThanOrEqual(locale === "zh" || locale === "ja" ? 32 : 80);
      expect(copy.steps).toHaveLength(3);
      expect(copy.faqs.length).toBeGreaterThanOrEqual(2);
      if (locale !== "en") {
        expect(copy.name).not.toBe(tool.copy.en.name);
        expect(messages.localNote).not.toBe(CHINESE_ID_MESSAGES.en.localNote);
        expect(messages.limitNote).not.toBe(CHINESE_ID_MESSAGES.en.limitNote);
        expect(messages.errors.checksum).not.toBe(CHINESE_ID_MESSAGES.en.errors.checksum);
      }
    }
  });
  it("registers independently useful routes with serializable mode props", () => {
    expect(validator.slug).toBe("chinese-id-validator");
    expect(generator.slug).toBe("chinese-id-generator");
    expect(validator.engine.props).toEqual({ mode: "validator" });
    expect(generator.engine.props).toEqual({ mode: "generator" });
    expect(validator.related).toContain(generator.slug);
    expect(generator.related).toContain(validator.slug);
  });
  it.each(LOCALES)("renders source and truthful limitations in initial HTML for %s", (locale) => {
    for (const mode of ["validator", "generator"] as const) {
      const messages = CHINESE_ID_MESSAGES[locale];
      const html = renderToStaticMarkup(createElement(I18nProvider,
        { locale, dict: dict(locale) } as Parameters<typeof I18nProvider>[0],
        createElement(ChineseIdEngine, { mode }),
      ));
      expect(html).toContain(CHINESE_ID_STANDARD_URL);
      for (const text of [messages.localNote, messages.limitNote, ...(mode === "generator" ? [messages.sampleNote] : [])]) {
        expect(html).toContain(renderToStaticMarkup(createElement("p", null, text)));
      }
      expect(html).toContain('role="status"');
      expect(html).not.toContain("11010519491231002X");
    }
  });
  it("keeps inputs out of persistence, navigation and network APIs", () => {
    const source = readFileSync(new URL("../tools/_engines/chinese-id-engine.tsx", import.meta.url), "utf8");
    expect(source).not.toMatch(/\b(fetch|XMLHttpRequest|localStorage|sessionStorage|URLSearchParams|sendBeacon)\b|console\.(log|info|warn|error)/);
    expect(source).toContain("CHINESE_ID_STANDARD_URL");
    expect(source).toContain('role="status"');
    expect(source).toContain('role="alert"');
    expect(source).toContain("min-h-11");
    expect(source).toContain('useState(false)');
  });
  it("preserves native error-list semantics inside the alert announcement", () => {
    const source = readFileSync(new URL("../tools/_engines/chinese-id-engine.tsx", import.meta.url), "utf8");
    expect(source).not.toMatch(/<ul[^>]*role="alert"/);
  });
  it("shows the province prefix without an untranslated Chinese place-name fallback", () => {
    const source = readFileSync(new URL("../tools/_engines/chinese-id-engine.tsx", import.meta.url), "utf8");
    expect(source).toContain("row.parsed.provinceCode");
    expect(source).not.toContain("row.parsed.provinceName");
  });
  it("clears the explicit reference-date input along with identity data", () => {
    const source = readFileSync(new URL("../tools/_engines/chinese-id-engine.tsx", import.meta.url), "utf8");
    expect(source).toMatch(/const clear = \(\) => \{[^}]*setReferenceDate\(""\)/);
  });
  it("uses the existing visible button styles with a primary action", () => {
    const source = readFileSync(new URL("../tools/_engines/chinese-id-engine.tsx", import.meta.url), "utf8");
    expect(source).toContain("bg-[var(--color-accent-strong)]");
    expect(source).toContain("border hairline");
    expect(source).not.toMatch(/btn-primary|btn-secondary/);
    expect(source).not.toContain("hover:opacity-90");
  });
});
