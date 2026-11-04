export function metaTitle(head: string, tail: string, max = 60): string {
  const full = `${head} — ${tail}`;
  if (full.length <= max) return full;
  const over = full.length - max;
  if (head.length >= tail.length) {
    const h = head.slice(0, Math.max(head.length - over - 1, 20)).trimEnd() + "…";
    return `${h} — ${tail}`;
  }
  const t = tail.slice(0, Math.max(tail.length - over - 1, 12)).trimEnd() + "…";
  return `${head} — ${t}`;
}

/** meta description 统一钳制:先折行收空白,再硬截 160(Google 展示上限)。 */
export function metaDesc(raw: string, max = 160): string {
  const clean = raw.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).trimEnd()}…`;
}
