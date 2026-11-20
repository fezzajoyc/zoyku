import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { I18nProvider } from "@/components/i18n-provider";
import { dict } from "@/lib/i18n";
import { ImageCanvasEngine, type ImageCanvasProps } from "@/tools/_engines/image-engine-canvas";

function render(props: ImageCanvasProps) {
  return renderToStaticMarkup(createElement(I18nProvider,
    { locale: "en", dict: dict("en") } as Parameters<typeof I18nProvider>[0],
    createElement(ImageCanvasEngine, props),
  ));
}

function buttonTag(html: string, label: string) {
  return [...html.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/g)].find(match => match[2].trim() === label)?.[1];
}

describe("image setting selection is exposed to assistive technology", () => {
  it.each([
    ["image/jpeg", "JPG"], ["image/png", "PNG"], ["image/webp", "WebP"],
  ] as const)("announces the current %s format and the unselected alternatives", (defaultFormat, selected) => {
    const html = render({ op: "compress", defaultFormat });
    for (const label of ["JPG", "PNG", "WebP"]) {
      expect(buttonTag(html, label)).toContain(`aria-pressed="${label === selected}"`);
    }
  });

  it("announces the current resize unit and its alternative", () => {
    const html = render({ op: "resize" });
    expect(buttonTag(html, "Pixels")).toContain('aria-pressed="true"');
    expect(buttonTag(html, "Percent")).toContain('aria-pressed="false"');
  });
});
