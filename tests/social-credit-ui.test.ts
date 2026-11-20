import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { LOCALES } from "@/lib/site";
import { dict } from "@/lib/i18n";
import { I18nProvider } from "@/components/i18n-provider";
import { SocialCreditEngine } from "@/tools/_engines/social-credit-engine";
import { SOCIAL_CREDIT_MESSAGES } from "@/tools/_lib/social-credit-copy";
import { SOCIAL_CREDIT_STANDARD_URL, SOCIAL_CREDIT_STANDARD_INFO_URL } from "@/tools/_lib/social-credit";
import tool from "@/tools/security/social-credit-validator";

describe("social credit localized single route", () => {
  it.each(LOCALES)("authors metadata, labels and structured errors for %s", locale => {
    const messages = SOCIAL_CREDIT_MESSAGES[locale];
    expect(Object.keys(messages).sort()).toEqual(Object.keys(SOCIAL_CREDIT_MESSAGES.en).sort());
    expect(Object.keys(messages.errors).sort()).toEqual(Object.keys(SOCIAL_CREDIT_MESSAGES.en.errors).sort());
    for (const [key, value] of Object.entries(messages)) {
      if (key === "errors") for (const message of Object.values(value)) expect(String(message).trim().length).toBeGreaterThan(2);
      else expect(String(value).trim().length, `${locale}:${key}`).toBeGreaterThan(0);
    }
    const copy = tool.copy[locale]!;
    expect(copy).toBeDefined();
    expect(copy.tagline.length).toBeGreaterThanOrEqual(locale === "zh" || locale === "ja" ? 32 : 80);
    expect(copy.steps).toHaveLength(3);
    expect(copy.faqs).toHaveLength(2);
    expect(messages.limitNote).toContain("GB11714");
    expect(messages.valid).toContain("MOD 31");
    expect(messages.invalid).toContain("MOD 31");
    expect(messages.downloadFailed.length).toBeGreaterThan(4);
    if (locale !== "en") {
      expect(copy.name).not.toBe(tool.copy.en.name);
      expect(messages.limitNote).not.toBe(SOCIAL_CREDIT_MESSAGES.en.limitNote);
      expect(messages.errors.checksum).not.toBe(SOCIAL_CREDIT_MESSAGES.en.errors.checksum);
      expect(messages.downloadFailed).not.toBe(SOCIAL_CREDIT_MESSAGES.en.downloadFailed);
    }
  });
  it.each(LOCALES)("renders sources, normalization and limits before hydration for %s", locale => {
    const messages = SOCIAL_CREDIT_MESSAGES[locale];
    const html = renderToStaticMarkup(createElement(I18nProvider,
      { locale, dict: dict(locale) } as Parameters<typeof I18nProvider>[0], createElement(SocialCreditEngine),
    ));
    for (const source of [SOCIAL_CREDIT_STANDARD_URL, SOCIAL_CREDIT_STANDARD_INFO_URL]) expect(html).toContain(source.replace(/&/g, "&amp;"));
    for (const text of [messages.normalizationNote, messages.limitNote, messages.localNote]) {
      expect(html).toContain(renderToStaticMarkup(createElement("p", null, text)));
    }
    expect(html).toContain('role="status"');
    expect(html).not.toContain("91350100M000100Y43");
  });
  it("defines one serializable validator route and no generator mode", () => {
    expect(tool.slug).toBe("social-credit-validator");
    expect(tool.engine.props).toBeUndefined();
    expect(tool.related).toContain("chinese-id-validator");
  });
  it("keeps inputs out of persistence, navigation, logs and requests", () => {
    const source = readFileSync(new URL("../tools/_engines/social-credit-engine.tsx", import.meta.url), "utf8");
    expect(source).not.toMatch(/\b(fetch|XMLHttpRequest|localStorage|sessionStorage|URLSearchParams|sendBeacon)\b|console\.(log|info|warn|error)/);
    expect(source).toContain("useState(false)");
    expect(source).toContain('role="alert"');
    expect(source).not.toMatch(/<ul[^>]*role="alert"/);
    expect(source).toContain("min-h-11");
    expect(source).toContain("bg-[var(--color-accent-strong)]");
    expect(source).not.toMatch(/btn-primary|hover:opacity/);
    expect(source).toContain('type: "text/plain;charset=utf-8"');
  });
});
