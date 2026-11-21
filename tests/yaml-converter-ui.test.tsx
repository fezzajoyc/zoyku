import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { I18nProvider } from "@/components/i18n-provider";
import { dict } from "@/lib/i18n";
import { LOCALES } from "@/lib/site";
import { DevEngineYaml } from "@/tools/_engines/dev-engine-yaml";
import { YAML_CONVERTER_MESSAGES, yamlConverterCopy } from "@/tools/_lib/yaml-converter-copy";
import tool from "@/tools/developer/json-yaml-converter";
const escape = (text: string) => renderToStaticMarkup(<span>{text}</span>).replace(/^<span>|<\/span>$/g, "");
describe("YAML converter native UI and final copy", () => {
  it.each(LOCALES)("exposes both directions with native labels and honest rules in %s", locale => {
    const L = YAML_CONVERTER_MESSAGES[locale];
    const html = renderToStaticMarkup(<I18nProvider locale={locale} dict={dict(locale)}><DevEngineYaml mode="json2yaml" /></I18nProvider>);
    for (const text of [L.direction, L.input, L.output, L.convert, L.swap, L.clear, L.rules, L.numbers, L.limits]) expect(html).toContain(escape(text));
    expect(html).toContain('value="json2yaml" selected=""');
    expect(html).toContain('value="yaml2json"');
    expect(html).not.toContain("data-copy-button");
    expect(html).toContain('dir="ltr"');
    const copy = yamlConverterCopy(locale, tool.copy[locale] ?? tool.copy.en);
    expect(copy.intro).toHaveLength(3); expect(copy.steps).toHaveLength(3); expect(copy.faqs).toHaveLength(2);
    expect(copy.deepDive).toBeUndefined();
    expect(copy.tagline.length).toBeGreaterThanOrEqual(locale === "zh" || locale === "ja" ? 32 : 80);
    for (const key of ["empty", "syntax", "duplicate", "features", "number", "limit", "inputError", "loading"] as const) {
      expect(L[key]).toBeTruthy(); if (locale !== "en") expect(L[key]).not.toBe(YAML_CONVERTER_MESSAGES.en[key]);
    }
  });
});
