export type SearchableTool = { slug: string; name: string; tagline: string };

/** The same word-order-independent index powers home, directory and global search. */
function normalizeSearch(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .toLocaleLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

export function matchesToolQuery(tool: SearchableTool, query: string): boolean {
  const words = normalizeSearch(query).split(/\s+/).filter(Boolean);
  if (!words.length) return true;
  const text = normalizeSearch(`${tool.name} ${tool.tagline} ${tool.slug}`);
  return words.every((word) => text.includes(word));
}

export function searchTools<T extends SearchableTool>(
  tools: T[],
  query: string,
): T[] {
  return tools.filter((tool) => matchesToolQuery(tool, query));
}
