/**
 * Plain-TS helpers shared by the PDF engines: text extraction post-processing
 * (pdfjs text items → lines → paragraphs/rows) plus pdf-lib text safety.
 * No JSX, no React — safe to import from anywhere client-side.
 */

export type TextLine = {
  text: string;
  /** baseline y (pdfjs text-content space; larger = higher on page) */
  y: number;
  /** font height ≈ em size */
  size: number;
  x: number;
  bold: boolean;
};

type RawItem = {
  str: string;
  transform?: number[];
  width?: number;
  height?: number;
  fontName?: string;
};

/** Group pdfjs text items into visual lines by baseline proximity. */
export function itemsToLines(items: RawItem[]): TextLine[] {
  const buckets: { y: number; items: (RawItem & { x: number })[] }[] = [];
  for (const it of items) {
    if (!it.str) continue;
    const tr = it.transform ?? [1, 0, 0, 1, 0, 0];
    const x = tr[4] ?? 0;
    const y = tr[5] ?? 0;
    const size = Math.hypot(tr[2] ?? 0, tr[3] ?? 0) || it.height || 10;
    let bucket = buckets.find((b) => Math.abs(b.y - y) <= Math.max(2, size * 0.45));
    if (!bucket) {
      bucket = { y, items: [] };
      buckets.push(bucket);
    }
    bucket.y = (bucket.y * bucket.items.length + y) / (bucket.items.length + 1);
    bucket.items.push({ ...it, x });
  }
  const lines: TextLine[] = [];
  for (const b of buckets) {
    b.items.sort((a, z) => a.x - z.x);
    let text = "";
    let prevEnd = -Infinity;
    for (const it of b.items) {
      const gap = it.x - prevEnd;
      if (text && gap > 1.2 && !/\s$/.test(text) && !/^\s/.test(it.str)) text += " ";
      text += it.str;
      prevEnd = it.x + (it.width ?? 0);
    }
    const clean = text.replace(/\s+/g, " ").trim();
    if (!clean) continue;
    const maxSize = Math.max(...b.items.map((i) => Math.hypot(i.transform?.[2] ?? 0, i.transform?.[3] ?? 0) || i.height || 10));
    lines.push({
      text: clean,
      y: b.y,
      size: Math.round(maxSize * 10) / 10,
      x: Math.min(...b.items.map((i) => i.x)),
      bold: b.items.some((i) => (i.fontName ?? "").toLowerCase().includes("bold")),
    });
  }
  lines.sort((a, z) => z.y - a.y || a.x - z.x);
  return lines;
}

/**
 * Join consecutive lines into paragraphs: a bigger vertical gap (or an
 * indented first line) starts a new paragraph. Good-enough heuristic for
 * text-focused conversions; the copy is honest that layout may differ.
 */
export function linesToParagraphs(lines: TextLine[]): string[] {
  if (!lines.length) return [];
  const sizes = [...lines].map((l) => l.size).sort((a, b) => a - b);
  const median = sizes[Math.floor(sizes.length / 2)] || 10;
  const paras: string[] = [];
  let cur = "";
  let prev: TextLine | null = null;
  for (const l of lines) {
    const gap = prev ? prev.y - l.y : Infinity;
    const newPara =
      prev === null ||
      gap > median * 1.6 ||
      (prev && prev.size > median * 1.35) ||
      (prev ? l.x > prev.x + median * 1.2 : false);
    if (newPara) {
      if (cur) paras.push(cur);
      cur = l.text;
    } else {
      const needsSpace = !/[\u2e80-\u9fff\uff01-\uffe0]$/.test(cur) && !/^[\u2e80-\u9fff\uff01-\uffe0]/.test(l.text);
      cur += (needsSpace ? " " : "") + l.text;
    }
    prev = l;
  }
  if (cur) paras.push(cur);
  return paras;
}

/** Split a visual line into spreadsheet cells on 2+ space runs. */
export function lineToCells(line: string): string[] {
  return line.split(/\s{2,}/).map((s) => s.trim()).filter(Boolean);
}

/* ---------- pdf-lib WinAnsi safety ---------- */

// cp1252 code points above 255 that pdf-lib's WinAnsi encoder accepts.
const WIN_ANSI_EXTRA = new Set(
  [0x20ac, 0x201a, 0x0192, 0x201e, 0x2026, 0x2020, 0x2021, 0x02c6, 0x2030, 0x0160, 0x2039, 0x0152, 0x017d, 0x2018, 0x2019, 0x201c, 0x201d, 0x2022, 0x2013, 0x2014, 0x02dc, 0x2122, 0x0161, 0x203a, 0x0153, 0x017e, 0x0178],
);

/** Replace characters the PDF standard fonts cannot encode (CJK etc.) with "?". */
export function sanitizeWinAnsi(text: string): string {
  let out = "";
  let replaced = false;
  for (const ch of text) {
    const c = ch.codePointAt(0) ?? 63;
    if (c === 10 || c === 13) {
      out += " ";
    } else if (c < 256 || WIN_ANSI_EXTRA.has(c)) {
      out += ch;
    } else {
      out += "?";
      replaced = true;
    }
  }
  return replaced ? out.replace(/\?{2,}/g, "?") : out;
}

export function escapeXml(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    c === "&" ? "&amp;" : c === "<" ? "&lt;" : c === ">" ? "&gt;" : c === '"' ? "&quot;" : "&apos;",
  );
}
