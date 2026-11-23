/**
 * CN-037:LaTeX 公式 → SVG/PNG 的纯逻辑部分。
 *
 * 渲染本身由 MathJax(SVG 输出)在浏览器里完成;本文件只做「可单元测试的纯变换」:
 * - 剥掉 MathJax 的 <mjx-container> 外壳,产出独立可保存的 <svg>
 * - 给 SVG 加背景色与内边距(通过 viewBox 扩展,不改字形坐标)
 * - 校验 LaTeX 括号平衡(MathJax 容错渲染,不会报错,所以由我们提前拦住明显错误)
 * - 计算 PNG 导出所需的像素尺寸(按缩放倍数 + 内边距)
 *
 * 常量与约束:
 * - SVG 的 viewBox 采用 MathJax 的 em 坐标系(1 ex/em 已换算),我们只平移起点
 * - 像素尺寸 = viewBox 宽高 × scale × (96/72 无关 —— 直接按 viewBox 单位 ≈ px 处理,
 *   这是 MathJax SVG 的既有换算,不做二次缩放以免字母变形)
 */

export type LatexErrorCode = "empty" | "unbalanced" | "noSvg" | "tooLong";

export type LatexResult<T> = { ok: true; data: T } | { ok: false; code: LatexErrorCode; message?: string };

/** 输入长度上限(字符)。超长公式既无实用价值,也会拖慢渲染。 */
export const MAX_TEX_LEN = 4000;

/** 常见分隔符包裹:$...$ / $$...$$ / \(...\) / \[...\] —— 用户粘贴时经常带。 */
export function stripMathDelimiters(input: string): string {
  let s = input.trim();
  const pairs: Array<[string, string]> = [
    ["$$", "$$"],
    ["$", "$"],
    ["\\(", "\\)"],
    ["\\[", "\\]"],
  ];
  for (const [open, close] of pairs) {
    // >= 而非 >:让 "$$$$" 也剥成空串(纯粹的空公式),由上层判 empty;
    // 而单个 "$$"(长度 2)不满足 2 >= 4,不会被误剥
    if (s.startsWith(open) && s.endsWith(close) && s.length >= open.length + close.length) {
      s = s.slice(open.length, s.length - close.length).trim();
      break;
    }
  }
  return s;
}

/**
 * LaTeX 花括号平衡检查。
 * 只检查 `{}` 与 `[]`(不含转义 \{ \} 与 \{ 里的字面量),因为这两类是命令参数的分界,
 * 不平衡必然渲染失败或吞掉后续内容;圆括号在数学排版里可以是字面字符,不检查。
 */
export function checkBalanced(tex: string): { ok: boolean; message?: string } {
  const stack: string[] = [];
  for (let i = 0; i < tex.length; i++) {
    const ch = tex[i];
    if (ch === "\\") {
      // 跳过转义序列: \{ \} \[ \] 都当作字面字符
      i += 1;
      continue;
    }
    if (ch === "{") stack.push("}");
    else if (ch === "]") {
      // `]` 只有出现在 `[` 之后才闭合;`[` 我们记录
      if (stack[stack.length - 1] === "]") stack.pop();
      else if (stack.length > 0) return { ok: false, message: `unexpected "]" at position ${i + 1}` };
    } else if (ch === "[") stack.push("]");
    else if (ch === "}") {
      if (stack[stack.length - 1] !== "}") return { ok: false, message: `unexpected "}" at position ${i + 1}` };
      stack.pop();
    }
  }
  if (stack.length > 0) return { ok: false, message: `${stack.length} unclosed delimiter(s)` };
  return { ok: true };
}

/** 输入校验入口(空 / 超长 / 括号不平衡)。 */
export function validateTex(input: string): LatexResult<string> {
  const tex = stripMathDelimiters(input);
  if (tex === "") return { ok: false, code: "empty" };
  if (tex.length > MAX_TEX_LEN) return { ok: false, code: "tooLong", message: `${tex.length} characters` };
  const bal = checkBalanced(tex);
  if (!bal.ok) return { ok: false, code: "unbalanced", message: bal.message };
  return { ok: true, data: tex };
}

/* -------------------------------------------------------------------------- */
/* SVG 后处理                                                                  */
/* -------------------------------------------------------------------------- */

export type SvgOptions = {
  /** 内边距(单位:viewBox 单位,与 MathJax 的 1/100 em 同阶)。默认 8。 */
  padding: number;
  /** 背景色;空串 = 透明。 */
  background: string;
};

const SVG_OPEN = /<svg\b/;
const SVG_CLOSE = "</svg>";

/** 从 MathJax 的 <mjx-container> 外壳里取出独立 <svg>(保留 defs/use/path 全部内容)。 */
export function extractSvg(containerHtml: string): LatexResult<string> {
  const start = containerHtml.search(SVG_OPEN);
  if (start < 0) return { ok: false, code: "noSvg" };
  const end = containerHtml.lastIndexOf(SVG_CLOSE);
  if (end < start) return { ok: false, code: "noSvg" };
  let svg = containerHtml.slice(start, end + SVG_CLOSE.length);
  // 确保两个命名空间都在(独立文件里 xlink:href 不带命名空间会变成非法属性)
  if (!/xmlns="http:\/\/www\.w3\.org\/2000\/svg"/.test(svg)) {
    svg = svg.replace(/<svg\b/, '<svg xmlns="http://www.w3.org/2000/svg"');
  }
  if (svg.includes("xlink:href") && !svg.includes("xmlns:xlink=")) {
    svg = svg.replace(/<svg\b/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
  }
  // 去掉 MathJax 的 vertical-align(CSS 依赖宿主环境,独立文件里没有意义)
  svg = svg.replace(/\sstyle="vertical-align[^"]*"/i, "");
  return { ok: true, data: svg };
}

type Box = { minX: number; minY: number; w: number; h: number };

/**
 * MathJax 的 SVG 坐标系:viewBox 单位 = 1/1000 em,而 width/height 属性用 ex 表达。
 * 实测样本(tex2svg("x^2+\frac{1}{2}")):viewBox 宽 3171 ↔ width="7.174ex",
 * 故 1ex = 3171 / 7.174 ≈ 442 units。这个比值依赖数学字体,所以不硬编码 —— 从原属性反推。
 */
const DEFAULT_UNITS_PER_EX = 442;

/** 读原始 width/height(ex 单位)并反推每 ex 多少 viewBox 单位。 */
export function exMetrics(svg: string, box: Box): { unitsPerEx: number; widthEx: number; heightEx: number } {
  const wm = svg.match(/width="([\d.]+)ex"/);
  const hm = svg.match(/height="([\d.]+)ex"/);
  if (wm && parseFloat(wm[1]) > 0) {
    const unitsPerEx = box.w / parseFloat(wm[1]);
    const widthEx = parseFloat(wm[1]);
    const heightEx = hm ? parseFloat(hm[1]) : box.h / unitsPerEx;
    return { unitsPerEx: unitsPerEx > 1 ? unitsPerEx : DEFAULT_UNITS_PER_EX, widthEx, heightEx };
  }
  return { unitsPerEx: DEFAULT_UNITS_PER_EX, widthEx: box.w / DEFAULT_UNITS_PER_EX, heightEx: box.h / DEFAULT_UNITS_PER_EX };
}

/** 解析 viewBox → 数值盒;缺失时按 width/height 兜底;都没有则失败。 */
export function parseSvgBox(svg: string): Box | null {
  const vb = svg.match(/viewBox="([-\d.]+)\s+([-\d.]+)\s+([-\d.]+)\s+([-\d.]+)"/);
  if (vb) {
    const [minX, minY, w, h] = vb.slice(1).map(Number);
    if (w > 0 && h > 0) return { minX, minY, w, h };
  }
  const wAttr = svg.match(/width="([\d.]+)(?:ex|px)?"/);
  const hAttr = svg.match(/height="([\d.]+)(?:ex|px)?"/);
  if (wAttr && hAttr) return { minX: 0, minY: 0, w: Number(wAttr[1]), h: Number(hAttr[1]) };
  return null;
}

/**
 * 加内边距与背景。
 * 做法:把 viewBox 向外扩张 padding,再在扩张后的坐标里画背景矩形 ——
 * 完全不碰任何字形坐标,所以导出的字母形状与 MathJax 原样一致。
 */
export function padAndBackground(svg: string, opts: SvgOptions): LatexResult<string> {
  const box = parseSvgBox(svg);
  if (!box) return { ok: false, code: "noSvg", message: "viewBox missing" };
  const pad = Math.max(0, opts.padding);
  const minX = box.minX - pad;
  const minY = box.minY - pad;
  const w = box.w + pad * 2;
  const h = box.h + pad * 2;
  const newViewBox = `${round(minX)} ${round(minY)} ${round(w)} ${round(h)}`;

  // 优先改写已有 viewBox;没有就补一个
  let out = svg;
  if (/viewBox="/.test(out)) {
    out = out.replace(/viewBox="[^"]*"/, `viewBox="${newViewBox}"`);
  } else {
    out = out.replace(/<svg\b/, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${newViewBox}"`);
  }
  // 宽高必须用 ex 表达:MathJax 的 viewBox 单位是 1/1000 em,
  // 直接把 viewBox 数值塞进 width/height 会让公式放大 400+ 倍(实测踩过)。
  const metrics = exMetrics(svg, box);
  const widthEx = round(w / metrics.unitsPerEx);
  const heightEx = round(h / metrics.unitsPerEx);
  out = out.replace(/\swidth="[^"]*"/, "").replace(/\sheight="[^"]*"/, "");
  const bg =
    opts.background && opts.background.trim() !== ""
      ? `<rect x="${round(minX)}" y="${round(minY)}" width="${round(w)}" height="${round(h)}" fill="${escapeAttr(opts.background.trim())}"/>`
      : "";
  out = out.replace(
    /<svg[^>]*>/,
    (tag) => `${tag.replace(/<svg\b/, `<svg width="${widthEx}ex" height="${heightEx}ex"`)}${bg}`,
  );
  return { ok: true, data: out };
}

function round(n: number): number {
  return Math.round(n * 100) / 100;
}

function escapeAttr(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

/* -------------------------------------------------------------------------- */
/* PNG 尺寸                                                                    */
/* -------------------------------------------------------------------------- */

/** 像素尺寸 = viewBox 单位 × scale。限制上限,避免导出巨大位图把浏览器拖死。 */
export const MAX_PNG_SIDE = 4000;

export type PixelSize = { width: number; height: number; clamped: boolean };

/** 1ex 在默认 16px 字号下约 8px(数学字体 ex/em ≈ 0.442 → 16×0.442 ≈ 7.07,
 *  取 8 让公式在文档里与正文字号观感一致)。 */
export const EX_TO_PX = 8;

/**
 * PNG 像素尺寸。
 * 入参是 SVG 的 ex 尺寸(不是 viewBox 单位!)—— viewBox 单位比 ex 小 442 倍,
 * 直接乘会得到 4000px 级别的荒谬尺寸并触发上限截断(实测踩过)。
 */
export function pngPixelSize(exSize: { widthEx: number; heightEx: number }, scale: number): PixelSize {
  const rawW = Math.round(exSize.widthEx * EX_TO_PX * scale);
  const rawH = Math.round(exSize.heightEx * EX_TO_PX * scale);
  const longest = Math.max(rawW, rawH);
  if (longest <= MAX_PNG_SIDE) {
    return { width: Math.max(1, rawW), height: Math.max(1, rawH), clamped: false };
  }
  const factor = MAX_PNG_SIDE / longest;
  return {
    width: Math.max(1, Math.round(rawW * factor)),
    height: Math.max(1, Math.round(rawH * factor)),
    clamped: true,
  };
}

/** 一步到位:MathJax 输出 → 可保存 SVG(含可选背景/内边距)。 */
export function finalizeSvg(containerHtml: string, opts: SvgOptions): LatexResult<string> {
  const extracted = extractSvg(containerHtml);
  if (!extracted.ok) return extracted;
  return padAndBackground(extracted.data, opts);
}
