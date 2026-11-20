import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import { LOCALES } from "@/lib/site";
import { dict } from "@/lib/i18n";
import { I18nProvider } from "@/components/i18n-provider";
import { DevUrlParserEngine, URL_PARSER_POLICY_NOTES } from "@/tools/_engines/dev-url-parser";

describe("URL parser scoped policy explanation", () => {
  it.each(LOCALES)("renders the conservative policy natively before hydration for %s", locale => {
    const note = URL_PARSER_POLICY_NOTES[locale];
    expect(note).toContain("localhost");
    expect(note).toContain("https://");
    expect(note).toContain("scheme://");
    if (locale !== "en") expect(note).not.toBe(URL_PARSER_POLICY_NOTES.en);
    const html = renderToStaticMarkup(createElement(I18nProvider,
      { locale, dict: dict(locale) } as Parameters<typeof I18nProvider>[0], createElement(DevUrlParserEngine),
    ));
    expect(html).toContain(renderToStaticMarkup(createElement("p", { id: "note", className: "copy" }, note)).replace('<p id="note" class="copy">', "").replace("</p>", ""));
    expect(html).toContain("aria-describedby");
  });
  it("uses the pure parser, preserves the CopyButton interface and labels empty segments", () => {
    const source = readFileSync(new URL("../tools/_engines/dev-url-parser.tsx", import.meta.url), "utf8");
    expect(source).toContain('import { parseUrl } from "../_lib/url-parser"');
    expect(source).toContain('seg === "" ? pick(L.empty, locale) : seg');
    expect(source).toContain('<CopyButton value={json} label={pick(L.copyJson, locale)} />');
    expect(source).not.toMatch(/\b(fetch|XMLHttpRequest|localStorage|sessionStorage|URLSearchParams|sendBeacon)\b|console\.(log|warn|error)/);
    expect(source).not.toContain(".filter(Boolean)");
  });
});
