import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { LOCALES } from "@/lib/site";
import { dict } from "@/lib/i18n";
import { I18nProvider } from "@/components/i18n-provider";
import { RmbUppercaseEngine } from "@/tools/_engines/rmb-uppercase-engine";
import { RMB_UPPERCASE_MESSAGES } from "@/tools/_lib/rmb-uppercase-copy";
import { RMB_UPPERCASE_SOURCE } from "@/tools/_lib/rmb-uppercase";
import tool from "@/tools/utility/rmb-uppercase";

describe("RMB uppercase authored localization and initial state", () => {
  it.each(LOCALES)("authors every label/error and page copy for %s", (locale) => {
    const labels = RMB_UPPERCASE_MESSAGES[locale];
    expect(labels).toBeDefined();
    expect(Object.keys(labels).sort()).toEqual(Object.keys(RMB_UPPERCASE_MESSAGES.en).sort());
    expect(Object.keys(labels.errors).sort()).toEqual(["empty", "format", "precision", "range", "too_long"]);
    for (const value of Object.values(labels)) {
      if (typeof value === "object") for (const error of Object.values(value)) expect(error.trim().length).toBeGreaterThan(5);
      else expect(value.trim().length).toBeGreaterThan(0);
    }
    const copy = tool.copy[locale]!;
    expect(copy).toBeDefined();
    expect(copy.tagline.length).toBeGreaterThanOrEqual(locale === "zh" || locale === "ja" ? 32 : 80);
    expect(copy.steps).toHaveLength(3);
    expect(copy.faqs.length).toBeGreaterThanOrEqual(3);
    if (locale !== "en") {
      expect(copy.name).not.toBe(tool.copy.en.name);
      expect(labels.localNote).not.toBe(RMB_UPPERCASE_MESSAGES.en.localNote);
      expect(labels.limitNote).not.toBe(RMB_UPPERCASE_MESSAGES.en.limitNote);
      expect(labels.errors.precision).not.toBe(RMB_UPPERCASE_MESSAGES.en.errors.precision);
    }
  });

  it.each(LOCALES)("renders the actual source, explicit limits and empty state for %s", (locale) => {
    const labels = RMB_UPPERCASE_MESSAGES[locale];
    const html = renderToStaticMarkup(createElement(I18nProvider,
      { locale, dict: dict(locale) } as Parameters<typeof I18nProvider>[0],
      createElement(RmbUppercaseEngine),
    ));
    expect(html).toContain(RMB_UPPERCASE_SOURCE.url);
    for (const text of [labels.localNote, labels.limitNote, labels.styleNote, labels.sourceDetail, labels.empty]) {
      expect(html).toContain(renderToStaticMarkup(createElement("p", null, text)).replace(/^<p>|<\/p>$/g, ""));
    }
    expect(html).toContain('inputMode="decimal"');
    expect(html).toContain('autoComplete="off"');
    expect(html).toContain('type="text"');
    expect(html).toContain('role="status"');
    expect(html).not.toContain('data-testid="rmb-uppercase-output"');
    expect(html).not.toContain('value="1409.50"');
    expect(html).not.toMatch(/maxLength=/i);
  });

  it("defines one serializable, independently useful forward converter", () => {
    expect(tool.slug).toBe("rmb-uppercase");
    expect(tool.category).toBe("utility");
    expect(tool.engine.component).toBe(RmbUppercaseEngine);
    expect(tool.engine.props ?? {}).toEqual({});
    expect(tool.related.length).toBeGreaterThanOrEqual(2);
  });

  it("keeps entered amounts out of persistence, navigation, logging and requests", () => {
    const source = readFileSync(new URL("../tools/_engines/rmb-uppercase-engine.tsx", import.meta.url), "utf8");
    expect(source).not.toMatch(/\b(fetch|XMLHttpRequest|localStorage|sessionStorage|URLSearchParams|sendBeacon)\b|console\.(log|info|warn|error)/);
    expect(source).toContain("RMB_UPPERCASE_SOURCE.url");
    expect(source).toContain('role="alert"');
    expect(source).toContain("aria-invalid");
    expect(source).toContain("aria-describedby");
    expect(source).toContain("min-h-11");
    expect(source).toContain("bg-[var(--color-action-bg)]");
    expect(source).toContain("hover:bg-[var(--color-action-hover)]");
    expect(source).toContain("readOnly");
  });

  it("does not convert decimal amounts through floating-point parsing or rounding", () => {
    const source = readFileSync(new URL("../tools/_lib/rmb-uppercase.ts", import.meta.url), "utf8");
    expect(source).not.toMatch(/\b(?:parseFloat|parseInt|Number)\s*\(|Math\.(?:round|floor|ceil|trunc)\(/);
    expect(source).toContain("BigInt(integer) * 100n");
  });
});
