import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import HomePage from "@/app/[lang]/page";
import { HomeWorkspace } from "@/components/home-workspace";
import { ALL_TOOLS } from "@/tools/registry";
import { CATEGORIES, LOCALES } from "@/lib/site";
import { HOME_COPY, HOME_EDITORIAL } from "@/lib/home-copy";
import { Nav } from "@/components/nav";
import { I18nProvider } from "@/components/i18n-provider";
import { dict } from "@/lib/i18n";
import {
  AppRouterContext,
  type AppRouterInstance,
} from "next/dist/shared/lib/app-router-context.shared-runtime";

const labels = {
  placeholder: "Find a tool",
  all: "All tools",
  empty: "No results for {query}",
  clear: "Clear",
  popular: "Popular tools",
  pinned: "Favorites",
  pin: "Favorite",
  unpin: "Unfavorite",
  categoryNames: Object.fromEntries(
    CATEGORIES.map((category) => [category, category]),
  ),
};

describe("compact homepage", () => {
  it("provides an explicit mobile menu with an expanded state", () => {
    const router = {
      bfcacheId: "test",
      push() {},
      replace() {},
      refresh() {},
      back() {},
      forward() {},
      prefetch() {},
    } as AppRouterInstance;
    const html = renderToStaticMarkup(
      <AppRouterContext.Provider value={router}>
        <I18nProvider locale="en" dict={dict("en")}>
          <Nav />
        </I18nProvider>
      </AppRouterContext.Provider>,
    );
    expect(html).toContain('aria-controls="mobile-navigation"');
    expect(html).toContain('aria-expanded="false"');
  });
  it("keeps the initial search workspace compact until the user searches", () => {
    const tools = ALL_TOOLS.map((tool) => ({
      slug: tool.slug,
      category: tool.category,
      icon: tool.icon,
      name: tool.slug,
      tagline: "Tool description",
    }));
    const html = renderToStaticMarkup(
      <HomeWorkspace locale="en" tools={tools} labels={labels} />,
    );
    expect(
      (html.match(/href="\/en\/tools\//g) ?? []).length,
    ).toBeLessThanOrEqual(3);
    expect(html).not.toContain('role="tablist"');
    expect(html).toContain('action="/en/tools"');
    expect(html).toContain('name="q"');
  });

  it.each(LOCALES)(
    "preserves the compact native links and honest localized scope in %s",
    async (locale) => {
      const html = renderToStaticMarkup(
        await HomePage({ params: Promise.resolve({ lang: locale }) }),
      );
      expect(html).toContain(HOME_COPY[locale].title[0]);
      expect(html).toContain(HOME_COPY[locale].privacyTitle);
      expect(html).toContain(HOME_EDITORIAL[locale].title);
      for (const summary of HOME_EDITORIAL[locale].summaries)
        expect(html).toContain(summary.replace("&", "&amp;"));
      expect(html).toContain(
        HOME_COPY[locale].count.replace("{n}", String(ALL_TOOLS.length)),
      );
      expect(html).toContain(`href="/${locale}/privacy"`);
      expect(html).toContain(`href="/${locale}/tools/merge-pdf"`);
      expect((html.match(/data-home-category=/g) ?? []).length).toBe(
        CATEGORIES.length,
      );
      expect((html.match(/<h1[ >]/g) ?? []).length).toBe(1);
      expect(html).not.toContain('href="#"');
    },
  );

  it("renders exactly four editorial cards and seven category links, with a stable H1", async () => {
    const html = renderToStaticMarkup(
      await HomePage({ params: Promise.resolve({ lang: "en" }) }),
    );
    expect((html.match(/data-editorial-tool=/g) ?? []).length).toBe(4);
    expect(html).toContain('data-home-material=""');
    expect(html).toContain('style="--home-progress:0"');
    expect((html.match(/class="home-material-ambient"/g) ?? []).length).toBe(1);
    expect((html.match(/class="ribbon-bg"/g) ?? []).length).toBe(1);
    expect(html).toContain('id="home-popular-heading">Featured tools</h2>');
    expect(html).toContain("Combine multiple PDFs");
    for (const slug of [
      "merge-pdf",
      "image-compressor",
      "word-counter",
      "json-formatter",
    ]) {
      expect(html).toContain(`data-editorial-tool="${slug}"`);
    }
    expect((html.match(/data-home-category=/g) ?? []).length).toBe(7);
    expect(html).not.toContain("rotating-text");
    expect(html).not.toContain("ribbon-scene");
    expect(html).toContain('href="/en/tools"');
    expect((html.match(/<h1[ >]/g) ?? []).length).toBe(1);
  });
});
