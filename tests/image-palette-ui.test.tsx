import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { I18nProvider } from "@/components/i18n-provider";
import { dict } from "@/lib/i18n";
import { LOCALES } from "@/lib/site";
import { ImagePaletteEngine } from "@/tools/_engines/image-engine-palette";
import { IMAGE_PALETTE_MESSAGES } from "@/tools/_lib/image-palette-copy";

const escaped = (value: string) => value.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#x27;");

describe("image palette initial interaction", () => {
  it.each(LOCALES)("offers an honest localized starting state in %s", locale => {
    const html = renderToStaticMarkup(<I18nProvider locale={locale} dict={dict(locale)}><ImagePaletteEngine /></I18nProvider>);
    const L = IMAGE_PALETTE_MESSAGES[locale];
    expect(html).toContain(escaped(L.drop));
    expect(html).toContain(escaped(L.localNote));
    expect(html).toContain(escaped(L.method));
    expect(html).toContain(escaped(L.sample));
    expect(html).toContain('aria-describedby="image-palette-method"');
    expect(html).toMatch(/<label[^>]*>[\s\S]*?<select/);
    expect(html).toContain('<option value="8" selected="">8</option>');
    expect(html.match(/<option /g)).toHaveLength(12);
    expect(html).not.toContain('role="alert"');
    expect(html).not.toContain("data-copy-button");
    expect(html).not.toContain("#FF0000");
    if (locale === "ar") expect(html).toContain('dir="rtl"');
  });
});
