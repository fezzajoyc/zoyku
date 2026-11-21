import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { I18nProvider } from "@/components/i18n-provider";
import { dict } from "@/lib/i18n";
import { LOCALES, type Locale } from "@/lib/site";
import { DevUuidInspectorEngine, UuidInspectorResult } from "@/tools/_engines/dev-engine-uuid-inspector";
import { inspectUuid } from "@/tools/_lib/uuid-inspector";
import { UUID_INSPECTOR_MESSAGES } from "@/tools/_lib/uuid-inspector-copy";
import tool from "@/tools/developer/uuid-validator-converter";
const escaped = (text: string) => renderToStaticMarkup(<span>{text}</span>).replace(/^<span>|<\/span>$/g, "");
const wrap = (node: React.ReactNode, locale: Locale) => renderToStaticMarkup(<I18nProvider locale={locale} dict={dict(locale)}>{node}</I18nProvider>);

describe("UUID inspector has native initial UI and page copy", () => {
  it.each(LOCALES)("labels the input and explains all formats and limits in %s", locale => {
    const L = UUID_INSPECTOR_MESSAGES[locale];
    const html = wrap(<DevUuidInspectorEngine />, locale);
    for (const text of [L.input, L.example, L.clear, L.empty, L.local, L.rules, L.semantics, L.limit]) expect(html).toContain(escaped(text));
    expect(html).toContain('dir="ltr"'); expect(html).toContain('<label'); expect(html).toContain('aria-describedby=');
    expect(html).not.toContain('data-copy-button'); expect(html).not.toContain('role="alert"');
    if (locale === "ar") expect(html).toContain('dir="rtl"');
    const copy = tool.copy[locale]!;
    expect(copy.name).toBeTruthy(); expect(copy.tagline.length).toBeGreaterThanOrEqual(["zh", "ja"].includes(locale) ? 32 : 80);
    expect(copy.steps).toHaveLength(3); expect(copy.faqs).toHaveLength(2); expect(copy.intro).toHaveLength(4);
    expect(Object.keys(L).sort()).toEqual(Object.keys(UUID_INSPECTOR_MESSAGES.en).sort());
    for (const field of ["local", "rules", "semantics", "recognized", "unrecognized", "formatError", "limit"] as const) {
      expect(L[field].length).toBeGreaterThan(5);
      if (locale !== "en") expect(L[field]).not.toBe(UUID_INSPECTOR_MESSAGES.en[field]);
    }
  });
});

describe("UUID results separate parseability, RFC layout, version and variant", () => {
  it.each(LOCALES)("shows all eight format/byte fields and no security claims in %s", locale => {
    const result = inspectUuid("919108f7-52d1-4320-9bac-f847db4148a8"); if (!result.ok) throw Error("fixture");
    const L = UUID_INSPECTOR_MESSAGES[locale]; const html = wrap(<UuidInspectorResult inspection={result} locale={locale} />, locale);
    for (const label of Object.values(L.formats)) expect(html).toContain(escaped(label));
    expect(html).toContain(escaped(L.recognized)); expect(html).toContain('data-uuid-rfc="true"');
    expect(html).toContain(result.base64); expect(html).toContain(result.binary); expect(html.match(/data-copy-button/g)).toHaveLength(8);
  });
  it("never labels unknown versions or legacy variants as RFC layouts", () => {
    for (const uuid of ["919108f7-52d1-9320-9bac-f847db4148a8", "919108f7-52d1-4320-cbac-f847db4148a8"]) {
      const result = inspectUuid(uuid); if (!result.ok) throw Error("fixture");
      const html = wrap(<UuidInspectorResult inspection={result} locale="en" />, "en");
      expect(html).toContain('data-uuid-rfc="false"'); expect(html).toContain(UUID_INSPECTOR_MESSAGES.en.unrecognized);
      expect(html).not.toContain(escaped(UUID_INSPECTOR_MESSAGES.en.recognized)); expect(html).toContain(result.canonical);
    }
  });
  it("displays NIL and MAX as special values with no interpreted version", () => {
    for (const [input, special] of [["0".repeat(32), "nil"], ["f".repeat(32), "max"]] as const) {
      const result = inspectUuid(input); if (!result.ok) throw Error("fixture");
      const html = wrap(<UuidInspectorResult inspection={result} locale="zh" />, "zh");
      expect(html).toContain(escaped(UUID_INSPECTOR_MESSAGES.zh.specials[special])); expect(html).toContain('data-uuid-rfc="true"');
    }
  });
});
