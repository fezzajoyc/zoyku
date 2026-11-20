import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { NextToolsBar } from "@/components/next-tools-bar";
import { I18nProvider } from "@/components/i18n-provider";
import { dict } from "@/lib/i18n";

describe("related tool navigation and favorites", () => {
  it("keeps each favorite separately focusable outside the tool link", () => {
    const html = renderToStaticMarkup(
      <I18nProvider locale="en" dict={dict("en")}>
        <NextToolsBar tools={[{slug:"merge-pdf",name:"Merge PDF",category:"pdf",icon:"file"}]} locale="en"
          labels={{nextTitle:"Next steps",copyLink:"Copy link",copied:"Copied",pinned:["Pin","Unpin"]}} />
      </I18nProvider>,
    );
    expect(html).not.toMatch(/<a\b[^>]*>(?:(?!<\/a>)[\s\S])*<button/);
    expect(html).toContain('href="/en/tools/merge-pdf"');
    expect(html).toContain('aria-label="Pin: Merge PDF"');
    expect(html).toContain('focus-visible:opacity-100');
  });
});
