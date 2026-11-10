import {
  Document, Packer, Paragraph, TextRun, ImageRun, HeadingLevel,
  AlignmentType, BorderStyle,
} from "docx";

/**
 * Markdown 风格文本 → DOCX 纯逻辑层:解析标题/列表/引用/代码块/分隔线/粗斜体,
 * 图片占位符 {{image:n}} 由调用方注入真实字节。全部走 docx 库,浏览器/Node 通用。
 * 纯逻辑下沉 _lib,引擎只做 UI 编排(工程标准 §1.3)。
 */

export type InlineImage = { data: Uint8Array | Buffer; type: "png" | "jpg" | "gif" | "bmp"; width: number; height: number };

// ---------- 行级解析 ----------

export type Block =
  | { kind: "heading"; level: 1 | 2 | 3; text: string }
  | { kind: "para"; text: string }
  | { kind: "bullet"; text: string }
  | { kind: "numbered"; text: string; n: number }
  | { kind: "quote"; text: string }
  | { kind: "code"; text: string }
  | { kind: "hr" };

/** 把 Markdown 风格文本切成块;空行分段,``` 围栏内内容并入代码块 */
export function parseBlocks(src: string): Block[] {
  const merged: Block[] = [];
  const lines = src.replace(/\r\n?/g, "\n").split("\n");
  let numbered = 0;
  let inCode = false;
  let codeText = "";
  const flushCode = () => {
    if (inCode) {
      if (codeText) merged.push({ kind: "code", text: codeText.replace(/\n$/, "") });
      inCode = false; codeText = "";
    }
  };
  for (const line0 of lines) {
    const fenceOpen = /^```/.test(line0.trimEnd());
    if (fenceOpen) { flushCode(); inCode = true; continue; }
    if (inCode) {
      codeText += (codeText ? "\n" : "") + line0.trimEnd();
      continue;
    }
    const line = line0.trimEnd();
    if (!line.trim()) { numbered = 0; continue; }
    const h = /^(#{1,3})\s+(.*)$/.exec(line);
    if (h) { merged.push({ kind: "heading", level: h[1].length as 1 | 2 | 3, text: h[2] }); continue; }
    const num = /^(\d+)[.)]\s+(.*)$/.exec(line);
    if (num) { numbered++; merged.push({ kind: "numbered", text: num[2], n: numbered }); continue; }
    numbered = 0;
    if (/^[-*+]\s+/.test(line)) { merged.push({ kind: "bullet", text: line.replace(/^[-*+]\s+/, "") }); continue; }
    if (/^>\s?/.test(line)) { merged.push({ kind: "quote", text: line.replace(/^>\s?/, "") }); continue; }
    if (/^(---+|\*\*\*+)$/.test(line)) { merged.push({ kind: "hr" }); continue; }
    merged.push({ kind: "para", text: line });
  }
  flushCode();
  return merged;
}

// ---------- 行内解析 ----------

export type Inline =
  | { t: "text"; text: string }
  | { t: "bold"; text: string }
  | { t: "italic"; text: string }
  | { t: "image"; index: number };

/** 解析 **bold**、*italic*、{{image:n}} 占位符;未闭合标记按字面文本 */
export function parseInline(text: string, maxImages: number): Inline[] {
  const out: Inline[] = [];
  const re = /(\*\*([^*]+)\*\*)|(\*([^*]+)\*)|(\{\{image:(\d+)\}\})/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push({ t: "text", text: text.slice(last, m.index) });
    if (m[2] !== undefined) out.push({ t: "bold", text: m[2] });
    else if (m[4] !== undefined) out.push({ t: "italic", text: m[4] });
    else {
      const idx = Number(m[6]) - 1;
      if (idx >= 0 && idx < maxImages) out.push({ t: "image", index: idx });
      else out.push({ t: "text", text: m[0] });
    }
    last = re.lastIndex;
  }
  if (last < text.length) out.push({ t: "text", text: text.slice(last) });
  return out;
}

// ---------- 渲染 ----------

/** 解析结果 → docx children;图片由 imageResolver 提供字节(缺失时输出 [image] 占位) */
export function blocksToDocxChildren(
  blocks: Block[],
  imageResolver: (index: number) => InlineImage | null,
): (Paragraph)[] {
  const children: Paragraph[] = [];
  for (const b of blocks) {
    switch (b.kind) {
      case "heading":
        children.push(new Paragraph({
          children: inlineRuns(b.text, 0, null),
          heading: b.level === 1 ? HeadingLevel.HEADING_1 : b.level === 2 ? HeadingLevel.HEADING_2 : HeadingLevel.HEADING_3,
        }));
        break;
      case "bullet":
        children.push(new Paragraph({ children: inlineRuns(b.text, 0, null), bullet: { level: 0 } }));
        break;
      case "numbered":
        children.push(new Paragraph({ children: inlineRuns(b.text, 0, null), numbering: { reference: "zoyku-num", level: 0 } }));
        break;
      case "quote":
        children.push(new Paragraph({
          children: inlineRuns(b.text, 0, null),
          indent: { left: 360 },
          border: { left: { style: BorderStyle.SINGLE, size: 12, color: "999999", space: 8 } },
        }));
        break;
      case "code":
        children.push(new Paragraph({
          children: [new TextRun({ text: b.text || " ", font: "Courier New" })],
          shading: { fill: "F2F2F2" },
        }));
        break;
      case "hr":
        children.push(new Paragraph({ border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "CCCCCC", space: 4 } } }));
        break;
      case "para":
        children.push(new Paragraph({ children: inlineRuns(b.text, 99, imageResolver) }));
        break;
    }
  }
  return children;
}

function inlineRuns(
  text: string,
  maxImages: number,
  imageResolver: ((index: number) => InlineImage | null) | null,
): (TextRun | ImageRun)[] {
  const runs: (TextRun | ImageRun)[] = [];
  for (const seg of parseInline(text, maxImages)) {
    if (seg.t === "image" && imageResolver) {
      const img = imageResolver(seg.index);
      if (img) {
        runs.push(new ImageRun({
          data: img.data,
          type: img.type,
          transformation: { width: img.width, height: img.height },
        }));
      } else {
        runs.push(new TextRun({ text: "[image]", italics: true }));
      }
    } else if (seg.t === "bold") {
      runs.push(new TextRun({ text: seg.text, bold: true }));
    } else if (seg.t === "italic") {
      runs.push(new TextRun({ text: seg.text, italics: true }));
    } else if (seg.t === "text") {
      runs.push(new TextRun({ text: seg.text }));
    }
  }
  return runs.length ? runs : [new TextRun("")];
}

/** 组装完整 .docx 字节;title 进文档属性 */
export async function buildDocx(src: string, images: InlineImage[], title: string): Promise<Buffer> {
  const blocks = parseBlocks(src);
  const children = blocksToDocxChildren(blocks, (i) => images[i] ?? null);
  const doc = new Document({
    title,
    numbering: {
      config: [{
        reference: "zoyku-num",
        levels: [{ level: 0, format: "decimal", text: "%1.", alignment: AlignmentType.START }],
      }],
    },
    sections: [{ properties: {}, children }],
  });
  return Packer.toBuffer(doc);
}

/** 从图片 File 推断 docx 类型标记(PNG/JPEG/GIF/BMP 魔数) */
export function imageTypeFromBytes(d: Uint8Array | Buffer): InlineImage["type"] | null {
  if (d.length >= 8 && d[0] === 0x89 && d[1] === 0x50 && d[2] === 0x4e && d[3] === 0x47) return "png";
  if (d.length >= 3 && d[0] === 0xff && d[1] === 0xd8 && d[2] === 0xff) return "jpg";
  if (d.length >= 6 && d[0] === 0x47 && d[1] === 0x49 && d[2] === 0x46) return "gif";
  if (d.length >= 2 && d[0] === 0x42 && d[1] === 0x4d) return "bmp";
  return null;
}
