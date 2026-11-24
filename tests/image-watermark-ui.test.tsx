import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { I18nProvider } from "@/components/i18n-provider";
import { dict } from "@/lib/i18n";
import { LOCALES } from "@/lib/site";
import { ImageWatermarkEngine } from "@/tools/_engines/image-engine-watermark";
import { IMAGE_WATERMARK_MESSAGES, imageWatermarkCopy } from "@/tools/_lib/image-watermark-copy";
import tool from "@/tools/image/watermark-image";
const escape = (value: string) => renderToStaticMarkup(<span>{value}</span>).replace(/^<span>|<\/span>$/g, "");

describe("watermark native runtime and truthful page copy", () => {
  it.each(LOCALES)("offers text/logo modes, alpha rules and accessible positions in %s", locale => {
    const L = IMAGE_WATERMARK_MESSAGES[locale];
    const html = renderToStaticMarkup(<I18nProvider locale={locale} dict={dict(locale)}><ImageWatermarkEngine /></I18nProvider>);
    for (const text of [L.sourceDrop, L.local, L.scope, L.limits, L.mode, L.textMode, L.logoMode, L.text, L.opacity, L.relativeWidth, L.rotation, L.margin, L.format, L.png, L.jpeg, L.tile, L.preview, L.empty]) expect(html).toContain(escape(text));
    for (const label of Object.values(L.positions)) expect(html).toContain(escape(label));
    expect(Object.keys(L.positions)).toHaveLength(9);
    expect(html).toContain('min="0" max="100"');
    expect(html).toContain('value="image/png" selected=""');
    expect(html).not.toContain('data-watermark-download'); expect(html).not.toContain('role="alert"');
    const copy = imageWatermarkCopy(locale, tool.copy[locale] ?? tool.copy.en);
    expect(copy.steps).toHaveLength(3); expect(copy.faqs).toHaveLength(2); expect(copy.deepDive?.length, "deepDive 全站统一 2 节").toBeGreaterThanOrEqual(2);
    expect(copy.tagline.length).toBeGreaterThanOrEqual(locale === "zh" || locale === "ja" ? 32 : 80);
    for (const key of ["typeError", "fileError", "dimensionError", "decodeError", "tileError", "outputError", "renderError", "downloadError"] as const) {
      expect(L[key]).toBeTruthy(); if (locale !== "en") expect(L[key]).not.toBe(IMAGE_WATERMARK_MESSAGES.en[key]);
    }
  });
});
