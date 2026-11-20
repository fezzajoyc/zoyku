import { describe, expect, it } from "vitest";
import { matchesToolQuery, searchTools } from "@/lib/tool-search";

const tools = [
  {
    slug: "merge-pdf",
    name: "Merge PDF",
    tagline: "Combine several documents",
    category: "pdf",
  },
  {
    slug: "image-compressor",
    name: "Image Compressor",
    tagline: "Reduce image size",
    category: "image",
  },
  {
    slug: "word-counter",
    name: "Compteur de mots",
    tagline: "Comptez les caractères",
    category: "text",
  },
];

describe("shared tool search", () => {
  it("finds a tool regardless of the order of its query words", () => {
    expect(searchTools(tools, "pdf merge").map((tool) => tool.slug)).toEqual([
      "merge-pdf",
    ]);
    expect(searchTools(tools, "merge pdf").map((tool) => tool.slug)).toEqual([
      "merge-pdf",
    ]);
  });
  it("matches all tokens across localized names, taglines and stable slugs", () => {
    expect(matchesToolQuery(tools[0], "PDF documents")).toBe(true);
    expect(matchesToolQuery(tools[2], "word counter")).toBe(true);
    expect(matchesToolQuery(tools[2], "COMPTEUR   caractères")).toBe(true);
    expect(matchesToolQuery(tools[0], "pdf image")).toBe(false);
  });
  it("normalizes accents, punctuation and blank input without dropping Unicode", () => {
    expect(matchesToolQuery(tools[2], "caracteres")).toBe(true);
    expect(searchTools(tools, " \n ")).toEqual(tools);
    expect(
      matchesToolQuery(
        { slug: "word-counter", name: "字数统计", tagline: "统计中文字数" },
        "中文 字数",
      ),
    ).toBe(true);
    expect(matchesToolQuery(tools[0], "pdf-merge")).toBe(true);
  });
});
