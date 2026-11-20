import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ToolsDirectory } from "@/components/tools-directory";

const tools = [
  {
    slug: "merge-pdf",
    name: "Merge PDF",
    tagline: "Combine several documents",
    category: "pdf",
    icon: "pdf",
  },
  {
    slug: "image-compressor",
    name: "Image Compressor",
    tagline: "Reduce image size",
    category: "image",
    icon: "image",
  },
];
const labels = {
  filterPlaceholder: "Search",
  empty: "No results",
  pin: "Favorite",
  unpin: "Unfavorite",
  categoryNames: { pdf: "PDF", image: "Images" },
  hrefLang: "en",
};
afterEach(() => vi.unstubAllGlobals());

describe("search directory native markup", () => {
  it("hydrates the same initial markup before restoring a URL query", () => {
    const server = renderToStaticMarkup(
      <ToolsDirectory tools={tools} labels={labels} />,
    );
    vi.stubGlobal("window", { location: { search: "?q=pdf%20merge" } });
    expect(
      renderToStaticMarkup(<ToolsDirectory tools={tools} labels={labels} />),
    ).toBe(server);
  });
  it("keeps favorite buttons outside navigable tool links", () => {
    const html = renderToStaticMarkup(
      <ToolsDirectory tools={tools} labels={labels} />,
    );
    expect(html).not.toMatch(/<a\b[^>]*>(?:(?!<\/a>)[\s\S])*<button/);
    expect((html.match(/<button/g) ?? []).length).toBe(tools.length);
    expect(html).not.toContain("line-clamp-2 block");
  });
});
