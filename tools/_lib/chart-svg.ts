/**
 * CN-036:图表生成纯逻辑 —— 零依赖 SVG。
 *
 * 能力:柱状(bar)/折线(line)/面积(area)/饼(pie)/环(donut)/雷达(radar)/漏斗(funnel)。
 * 输入统一为「标签 + 一或多组数值」,解析自 CSV/TSV/分号分隔文本。
 *
 * 为什么零依赖(而不是引入 ECharts):
 * - 上述 7 种基本图表用 <path>/<rect>/<text> 就能正确画出,ECharts 会带来约 1 MB 主包;
 * - 本工具的真正价值是「导出可用的 SVG」,而矢量输出本来就该是手写的,不经过图表库;
 * - 无 canvas、无 requestAnimationFrame,SSR 与导出都稳定。
 *
 * 诚实边界(与工具文案同源):
 * - 不做交互(悬停提示/缩放/图例点击)、不做动画、不做堆叠;多系列在柱图里是并排分组;
 * - 饼/环/漏斗只取第一组数值(多列时明确报出被忽略的列);
 * - 百分号按字面数值处理(50% 记作 50),不做归一换算;
 * - 数值一律走 6 位有效数字格式化(与站内单位换算同一标准),不显示原始浮点噪声。
 */

export type ChartType = "bar" | "line" | "area" | "pie" | "donut" | "radar" | "funnel";

export const CHART_TYPES: ChartType[] = ["bar", "line", "area", "pie", "donut", "radar", "funnel"];

export type ChartSeries = { name: string; values: number[] };

export type ChartData = {
  labels: string[];
  series: ChartSeries[];
};

export type ChartErrorCode =
  | "empty" // 空输入
  | "noRows" // 只有表头/注释,没有数据行
  | "ragged" // 列数不一致
  | "badNumber" // 单元格不是数字
  | "notEnough" // 有效数据点不足(饼/漏斗至少要 2 项)或维度不足(雷达至少 3 个)
  | "allZero"; // 全部为 0,比例型图表无法绘制

export type ChartParseResult =
  | { ok: true; data: ChartData }
  | { ok: false; code: ChartErrorCode; message?: string };

/* -------------------------------------------------------------------------- */
/* 解析                                                                        */
/* -------------------------------------------------------------------------- */

const CURRENCY_PREFIX = /^[$€£¥]/;
const PERCENT_SUFFIX = /%$/;

/**
 * 单个数值单元格解析:
 * - 允许前后空白、货币前缀($ € £ ¥)、尾部 %(按字面值,见头部注释)、下划线与空格千分位;
 * - 拒绝 NaN/Infinity/空串/含字母。
 * 返回 null 表示「不是数字」。
 */
export function parseNumberCell(raw: string): number | null {
  let s = raw.trim();
  if (s === "") return null;
  s = s.replace(CURRENCY_PREFIX, "").trim();
  s = s.replace(PERCENT_SUFFIX, "").trim();
  // 千分位:下划线(1_000)与单空格(1 000)允许,逗号因与分隔符冲突不支持
  s = s.replace(/_/g, "").replace(/\s+/g, "");
  if (s === "" || s === "-" || s === "+") return null;
  if (!/^[-+]?(\d+\.?\d*|\.\d+)([eE][-+]?\d+)?$/.test(s)) return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

/** 探测分隔符:优先制表符,其次分号,最后逗号(取首行出现次数最多的那个)。 */
export function detectDelimiter(firstLine: string): string {
  const candidates = ["\t", ";", ","];
  let best = ",";
  let bestCount = 0; // 必须真的出现才算命中;全无分隔符时回落逗号
  for (const d of candidates) {
    const count = firstLine.split(d).length - 1;
    if (count > bestCount) {
      bestCount = count;
      best = d;
    }
  }
  return best;
}

/** 解析图表数据文本。表头识别:首行除标签外全部非数字 → 视为系列名。 */
export type HeaderMode = "auto" | "always" | "never";

/**
 * 表头判定。auto = 首行的值单元格「全部非数字」才当表头。
 * 纯数字系列名(如 2025、2026)无法靠类型区分,需要用户显式选 always ——
 * 自动猜测会静默吞掉第一行数据,所以这里把决定权交出去,不做聪明猜测。
 */
export function parseChartData(input: string, headerMode: HeaderMode = "auto"): ChartParseResult {
  const text = input.replace(/\r\n?/g, "\n").replace(/^\uFEFF/, "");
  if (text.trim() === "") return { ok: false, code: "empty" };

  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l !== "" && !l.startsWith("#"));
  if (lines.length === 0) return { ok: false, code: "noRows" };

  const delimiter = detectDelimiter(lines[0]);
  const rows = lines.map((l) => l.split(delimiter));

  // 表头判定
  let seriesNames: string[] = [];
  let dataStart = 0;
  const probe = rows[0];
  if (probe.length > 1 && headerMode !== "never") {
    const valueCells = probe.slice(1);
    const allNonNumeric = valueCells.every((c) => parseNumberCell(c) === null);
    if (headerMode === "always" || allNonNumeric) {
      seriesNames = valueCells.map((c, i) => c.trim() || `Series ${i + 1}`);
      dataStart = 1;
    }
  }
  const dataRows = rows.slice(dataStart);
  if (dataRows.length === 0) return { ok: false, code: "noRows" };

  // 列数一致性(以首个数据行为准)
  const colCount = dataRows[0].length;
  for (const [i, row] of dataRows.entries()) {
    if (row.length !== colCount) {
      return {
        ok: false,
        code: "ragged",
        message: `row ${i + 1 + dataStart}: expected ${colCount} columns, got ${row.length}`,
      };
    }
  }
  if (colCount < 2) return { ok: false, code: "ragged", message: "need at least a label column and one value column" };

  const seriesCount = colCount - 1;
  if (seriesNames.length === 0) {
    seriesNames = Array.from({ length: seriesCount }, (_, i) => (seriesCount === 1 ? "Value" : `Series ${i + 1}`));
  }

  const labels: string[] = [];
  const series: ChartSeries[] = seriesNames.slice(0, seriesCount).map((name) => ({ name, values: [] }));

  for (const [i, row] of dataRows.entries()) {
    const label = row[0].trim();
    if (label === "") return { ok: false, code: "badNumber", message: `row ${i + 1 + dataStart}: empty label` };
    labels.push(label);
    for (let s = 0; s < seriesCount; s++) {
      const n = parseNumberCell(row[s + 1] ?? "");
      if (n === null) {
        return {
          ok: false,
          code: "badNumber",
          message: `row ${i + 1 + dataStart}, column ${s + 2}: ${JSON.stringify((row[s + 1] ?? "").trim())} is not a number`,
        };
      }
      series[s].values.push(n);
    }
  }

  return { ok: true, data: { labels, series } };
}

/* -------------------------------------------------------------------------- */
/* 数值格式化(6 位有效数字,与站内单位换算同一标准)                            */
/* -------------------------------------------------------------------------- */

const SIG_DIGITS = 6;

/** 6 位有效数字;极大/极小值走指数。 */
export function fmtChartNumber(n: number): string {
  if (!Number.isFinite(n)) return "—";
  if (n === 0) return "0";
  const abs = Math.abs(n);
  if (abs >= 1e9 || abs < 1e-4) return n.toExponential(3).replace(/\.?0+e/, "e");
  const magnitude = Math.floor(Math.log10(abs));
  const decimals = Math.max(0, SIG_DIGITS - 1 - magnitude);
  const fixed = n.toFixed(Math.min(decimals, 10));
  // 去掉多余的尾随 0(toFixed 会留下),但保留至少整数部分
  const trimmed = fixed.includes(".") ? fixed.replace(/\.?0+$/, "") : fixed;
  return trimmed === "" || trimmed === "-" ? "0" : trimmed;
}

/** XML 文本转义 —— 所有用户可控字符串进 SVG 前必须过这里。 */
export function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/* -------------------------------------------------------------------------- */
/* 几何与配色                                                                  */
/* -------------------------------------------------------------------------- */

export const CHART_W = 640;
export const CHART_H = 360;
const PAD = { l: 60, r: 24, t: 28, b: 52 };

/** 8 色调色板(白底可读;SVG 自带白底,导出到任何地方都一致)。 */
export const PALETTE = [
  "#2563eb",
  "#dc2626",
  "#059669",
  "#d97706",
  "#7c3aed",
  "#0891b2",
  "#db2777",
  "#4b5563",
];

const INK = "#1d1d1f";
const GRID = "#d2d2d7";
const MUTED = "#6e6e73";
const SURFACE = "#ffffff";

type Scale = { min: number; max: number; span: number };

/** y 轴范围:非负数据一律从 0 起(柱/面积图不从 0 起会误导),含负值时从 0 与最小值中取低者。 */
export function yScaleOf(values: number[]): Scale {
  const finite = values.filter((v) => Number.isFinite(v));
  const dataMin = finite.length > 0 ? Math.min(...finite) : 0;
  const dataMax = finite.length > 0 ? Math.max(...finite) : 0;
  const min = dataMin >= 0 ? 0 : dataMin;
  const max = dataMax > min ? dataMax : min + 1;
  return { min, max, span: max - min };
}

/** nice 刻度:1/2/5 × 10^k,约 4-6 格。 */
export function niceTicks(min: number, max: number, target = 5): number[] {
  const span = max - min;
  if (!(span > 0)) return [min];
  const rawStep = span / target;
  const mag = Math.pow(10, Math.floor(Math.log10(rawStep)));
  const norm = rawStep / mag;
  const step = (norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 5 ? 5 : 10) * mag;
  const start = Math.ceil(min / step) * step;
  const ticks: number[] = [];
  for (let v = start; v <= max + step / 2; v += step) {
    // 消除浮点累加噪声(0.1+0.2 类)
    ticks.push(Number(v.toPrecision(12)));
  }
  return ticks;
}

const plotW = CHART_W - PAD.l - PAD.r;
const plotH = CHART_H - PAD.t - PAD.b;

const px = (frac: number) => PAD.l + frac * plotW;
const pyFromFrac = (frac: number) => PAD.t + (1 - frac) * plotH;

const openSvg = (aria: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${CHART_W} ${CHART_H}" width="${CHART_W}" height="${CHART_H}" role="img" aria-label="${escapeXml(aria)}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif">` +
  `<rect x="0" y="0" width="${CHART_W}" height="${CHART_H}" fill="${SURFACE}"/>`;

/** 轴与网格(带 nice 刻度的 y 轴线 + 基线)。 */
function axes(scale: Scale, yLabel: string): string {
  const ticks = niceTicks(scale.min, scale.max);
  const parts: string[] = [];
  parts.push(
    `<line x1="${PAD.l}" y1="${PAD.t}" x2="${PAD.l}" y2="${CHART_H - PAD.b}" stroke="${GRID}" stroke-width="1"/>`,
  );
  parts.push(
    `<line x1="${PAD.l}" y1="${CHART_H - PAD.b}" x2="${CHART_W - PAD.r}" y2="${CHART_H - PAD.b}" stroke="${GRID}" stroke-width="1"/>`,
  );
  for (const t of ticks) {
    const frac = (t - scale.min) / scale.span;
    if (frac < 0 || frac > 1) continue;
    const y = pyFromFrac(frac);
    parts.push(
      `<line x1="${PAD.l}" y1="${y.toFixed(1)}" x2="${CHART_W - PAD.r}" y2="${y.toFixed(1)}" stroke="${GRID}" stroke-width="1" stroke-dasharray="0.5 4" opacity="0.7"/>`,
    );
    parts.push(
      `<text x="${PAD.l - 8}" y="${(y + 4).toFixed(1)}" text-anchor="end" font-size="11" fill="${MUTED}">${escapeXml(fmtChartNumber(t))}</text>`,
    );
  }
  if (yLabel) {
    parts.push(
      `<text x="14" y="${(PAD.t + plotH / 2).toFixed(1)}" text-anchor="middle" font-size="11" fill="${MUTED}" transform="rotate(-90 14 ${(PAD.t + plotH / 2).toFixed(1)})">${escapeXml(yLabel)}</text>`,
    );
  }
  return parts.join("");
}

/** x 轴标签:数量多时隔位抽稀,避免叠字。 */
function xLabels(labels: string[], positions: number[]): string {
  const n = labels.length;
  const stride = n <= 8 ? 1 : Math.ceil(n / 8);
  const parts: string[] = [];
  labels.forEach((raw, i) => {
    if (i % stride !== 0 && i !== n - 1) return;
    const x = positions[i];
    parts.push(
      `<text x="${x.toFixed(1)}" y="${CHART_H - PAD.b + 18}" text-anchor="middle" font-size="11" fill="${MUTED}">${escapeXml(raw.length > 14 ? raw.slice(0, 13) + "…" : raw)}</text>`,
    );
  });
  return parts.join("");
}

/* -------------------------------------------------------------------------- */
/* 各图表渲染                                                                  */
/* -------------------------------------------------------------------------- */

function renderBar(data: ChartData, yLabel: string): string {
  const { labels, series } = data;
  const all = series.flatMap((s) => s.values);
  const scale = yScaleOf(all);
  const band = plotW / labels.length;
  const groupInner = band * 0.72;
  const barW = Math.max(2, groupInner / series.length - (series.length > 1 ? 3 : 0));

  const parts: string[] = [axes(scale, yLabel)];
  for (let i = 0; i < labels.length; i++) {
    const bandStart = PAD.l + i * band + (band - groupInner) / 2;
    series.forEach((s, si) => {
      const v = s.values[i];
      const frac = Math.max(0, (v - scale.min) / scale.span);
      const h = Math.max(0, frac * plotH);
      const x = bandStart + si * (barW + 3);
      const y = CHART_H - PAD.b - h;
      parts.push(
        `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${barW.toFixed(1)}" height="${h.toFixed(1)}" fill="${PALETTE[si % PALETTE.length]}" rx="2"/>`,
      );
      if (series.length === 1 && labels.length <= 12) {
        parts.push(
          `<text x="${(x + barW / 2).toFixed(1)}" y="${(y - 5).toFixed(1)}" text-anchor="middle" font-size="10" fill="${INK}">${escapeXml(fmtChartNumber(v))}</text>`,
        );
      }
    });
  }
  const positions = labels.map((_, i) => PAD.l + i * band + band / 2);
  parts.push(xLabels(labels, positions));
  parts.push(legend(series));
  return parts.join("");
}

function linePath(values: number[], scale: Scale, positions: number[]): string {
  return values
    .map((v, i) => {
      const frac = (v - scale.min) / scale.span;
      return `${i === 0 ? "M" : "L"}${positions[i].toFixed(1)},${pyFromFrac(Math.min(1, Math.max(0, frac))).toFixed(1)}`;
    })
    .join(" ");
}

function renderLineOrArea(data: ChartData, yLabel: string, filled: boolean): string {
  const { labels, series } = data;
  const scale = yScaleOf(series.flatMap((s) => s.values));
  const positions = labels.map((_, i) =>
    labels.length === 1 ? PAD.l + plotW / 2 : PAD.l + (i / (labels.length - 1)) * plotW,
  );
  const parts: string[] = [axes(scale, yLabel)];
  series.forEach((s, si) => {
    const color = PALETTE[si % PALETTE.length];
    const path = linePath(s.values, scale, positions);
    if (filled) {
      const baseY = pyFromFrac((Math.max(0, scale.min) - scale.min) / scale.span);
      parts.push(
        `<path d="${path} L${positions[positions.length - 1].toFixed(1)},${baseY.toFixed(1)} L${positions[0].toFixed(1)},${baseY.toFixed(1)} Z" fill="${color}" fill-opacity="0.16"/>`,
      );
    }
    parts.push(`<path d="${path}" fill="none" stroke="${color}" stroke-width="2" stroke-linejoin="round"/>`);
    s.values.forEach((v, i) => {
      const frac = (v - scale.min) / scale.span;
      parts.push(
        `<circle cx="${positions[i].toFixed(1)}" cy="${pyFromFrac(Math.min(1, Math.max(0, frac))).toFixed(1)}" r="3" fill="${color}"/>`,
      );
    });
  });
  parts.push(xLabels(labels, positions));
  parts.push(legend(series));
  return parts.join("");
}

function piePositions(items: { label: string; value: number }[], hollow: boolean): string {
  const total = items.reduce((s, x) => s + Math.max(0, x.value), 0);
  if (!(total > 0)) return "";
  const cx = CHART_W * 0.34;
  const cy = CHART_H / 2 + 4;
  const R = Math.min(plotH, CHART_W * 0.5) / 2 - 6;
  const inner = hollow ? R * 0.55 : 0;

  const parts: string[] = [];
  let acc = 0;
  items.forEach((item, i) => {
    const frac = Math.max(0, item.value) / total;
    if (frac <= 0) return;
    const a0 = acc * 2 * Math.PI - Math.PI / 2;
    const a1 = (acc + frac) * 2 * Math.PI - Math.PI / 2;
    acc += frac;
    const p = (r: number, a: number) => `${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`;
    const color = PALETTE[i % PALETTE.length];
    if (hollow) {
      const d = `M${p(R, a0)} A${R},${R} 0 0,1 ${p(R, a1)} L${p(inner, a1)} A${inner},${inner} 0 0,0 ${p(inner, a0)} Z`;
      parts.push(`<path d="${d}" fill="${color}"/>`);
    } else {
      const d = `M${(cx).toFixed(2)},${(cy).toFixed(2)} L${p(R, a0)} A${R},${R} 0 0,1 ${p(R, a1)} Z`;
      parts.push(`<path d="${d}" fill="${color}"/>`);
    }
    // 5% 以上的切片才放百分比标签(防叠字)
    if (frac >= 0.05) {
      const mid = (a0 + a1) / 2;
      const lr = hollow ? (R + inner) / 2 : R * 0.66;
      const lx = cx + lr * Math.cos(mid);
      const ly = cy + lr * Math.sin(mid);
      parts.push(
        `<text x="${lx.toFixed(1)}" y="${(ly + 4).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="600" fill="${hollow ? INK : "#ffffff"}">${Math.round(frac * 100)}%</text>`,
      );
    }
  });
  // 右侧图例(名称 + 数值 + 占比)
  const legendX = CHART_W * 0.66;
  items.forEach((item, i) => {
    const y = PAD.t + 16 + i * 22;
    if (y > CHART_H - PAD.b) return;
    const pct = total > 0 ? (Math.max(0, item.value) / total) * 100 : 0;
    parts.push(`<circle cx="${legendX}" cy="${y - 4}" r="5" fill="${PALETTE[i % PALETTE.length]}"/>`);
    parts.push(
      `<text x="${legendX + 14}" y="${y}" font-size="12" fill="${INK}">${escapeXml(item.label.length > 16 ? item.label.slice(0, 15) + "…" : item.label)}</text>`,
    );
    parts.push(
      `<text x="${CHART_W - PAD.r}" y="${y}" text-anchor="end" font-size="12" fill="${MUTED}">${escapeXml(fmtChartNumber(item.value))} · ${pct.toFixed(1)}%</text>`,
    );
  });
  return parts.join("");
}

function renderRadar(data: ChartData): string {
  const { labels, series } = data;
  const dims = labels.length;
  const cx = CHART_W / 2;
  const cy = CHART_H / 2 + 6;
  const R = Math.min(plotH, CHART_W) / 2 - 34;
  const all = series.flatMap((s) => s.values);
  const max = Math.max(...all.map(Math.abs), 1);

  const point = (i: number, r: number) => {
    const a = -Math.PI / 2 + (i / dims) * 2 * Math.PI;
    return `${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`;
  };

  const parts: string[] = [];
  // 3 圈参考网格
  for (const ratio of [1, 2 / 3, 1 / 3]) {
    const d = labels.map((_, i) => point(i, R * ratio)).join(" L");
    parts.push(`<path d="M${d} Z" fill="none" stroke="${GRID}" stroke-width="1"/>`);
  }
  // 轴与维度名
  labels.forEach((label, i) => {
    const p = point(i, R);
    parts.push(`<line x1="${cx}" y1="${cy}" x2="${p.split(",")[0]}" y2="${p.split(",")[1]}" stroke="${GRID}" stroke-width="1"/>`);
    const lp = point(i, R + 16);
    const [lx, ly] = lp.split(",").map(Number);
    const dx = lx - cx;
    const anchor = Math.abs(dx) < 6 ? "middle" : dx > 0 ? "start" : "end";
    parts.push(
      `<text x="${lx.toFixed(1)}" y="${(ly + 4).toFixed(1)}" text-anchor="${anchor}" font-size="11" fill="${MUTED}">${escapeXml(label.length > 10 ? label.slice(0, 9) + "…" : label)}</text>`,
    );
  });
  series.forEach((s, si) => {
    const color = PALETTE[si % PALETTE.length];
    const d = labels
      .map((_, i) => point(i, (Math.abs(s.values[i]) / max) * R))
      .join(" L");
    parts.push(`<path d="M${d} Z" fill="${color}" fill-opacity="0.14" stroke="${color}" stroke-width="2"/>`);
    labels.forEach((_, i) => {
      const [pxv, pyv] = point(i, (Math.abs(s.values[i]) / max) * R).split(",").map(Number);
      parts.push(`<circle cx="${pxv}" cy="${pyv}" r="3" fill="${color}"/>`);
    });
  });
  parts.push(legend(series, true));
  return parts.join("");
}

function renderFunnel(data: ChartData): string {
  const values = data.series[0].values;
  const max = Math.max(...values.map(Math.abs), 1);
  const gap = 8;
  const rowH = Math.min(48, (plotH - gap * Math.max(0, values.length - 1)) / values.length);
  const cx = CHART_W / 2 + 10;
  const parts: string[] = [];
  let y = PAD.t;
  values.forEach((v, i) => {
    const next = i + 1 < values.length ? Math.abs(values[i + 1]) : Math.abs(v) * 0.6;
    const wTop = (Math.abs(v) / max) * plotW * 0.82;
    const wBottom = Math.max(12, Math.min(1, next / max) * plotW * 0.82);
    const color = PALETTE[i % PALETTE.length];
    const d = `M${(cx - wTop / 2).toFixed(1)},${y.toFixed(1)} L${(cx + wTop / 2).toFixed(1)},${y.toFixed(1)} L${(cx + wBottom / 2).toFixed(1)},${(y + rowH).toFixed(1)} L${(cx - wBottom / 2).toFixed(1)},${(y + rowH).toFixed(1)} Z`;
    parts.push(`<path d="${d}" fill="${color}" fill-opacity="0.9"/>`);
    parts.push(
      `<text x="${cx.toFixed(1)}" y="${(y + rowH / 2 + 4).toFixed(1)}" text-anchor="middle" font-size="12" font-weight="600" fill="#ffffff">${escapeXml(fmtChartNumber(v))}</text>`,
    );
    parts.push(
      `<text x="${PAD.l}" y="${(y + rowH / 2 + 4).toFixed(1)}" font-size="11" fill="${MUTED}">${escapeXml(data.labels[i].slice(0, 14))}</text>`,
    );
    // 相邻转化率
    if (i > 0 && Math.abs(values[i - 1]) !== 0) {
      const rate = (Math.abs(v) / Math.abs(values[i - 1])) * 100;
      parts.push(
        `<text x="${CHART_W - PAD.r}" y="${(y + rowH / 2 + 4).toFixed(1)}" text-anchor="end" font-size="11" fill="${MUTED}">${rate.toFixed(1)}%</text>`,
      );
    }
    y += rowH + gap;
  });
  return parts.join("");
}

/** 图例(仅多系列时出现)。 */
function legend(series: ChartSeries[], compact = false): string {
  if (series.length < 2) return "";
  const x0 = PAD.l;
  const y = compact ? CHART_H - 20 : 14;
  return series
    .slice(0, 8)
    .map((s, i) => {
      const x = x0 + i * 96;
      return (
        `<rect x="${x}" y="${y - 7}" width="10" height="10" rx="5" fill="${PALETTE[i % PALETTE.length]}"/>` +
        `<text x="${x + 15}" y="${y + 2}" font-size="11" fill="${MUTED}">${escapeXml(s.name.length > 9 ? s.name.slice(0, 8) + "…" : s.name)}</text>`
      );
    })
    .join("");
}

/* -------------------------------------------------------------------------- */
/* 入口                                                                        */
/* -------------------------------------------------------------------------- */

export type RenderResult =
  | { ok: true; svg: string; warnings: string[] }
  | { ok: false; code: ChartErrorCode; message?: string };

/**
 * 渲染 SVG。type 决定图表种类;yLabel 为纵轴单位说明(可空)。
 * 饼/环/漏斗只用第一组数值;忽略的列会进 warnings(不静默丢数据)。
 */
export function renderChartSvg(data: ChartData, type: ChartType, yLabel = ""): RenderResult {
  const warnings: string[] = [];
  const first = data.series[0];
  const isRatio = type === "pie" || type === "donut" || type === "funnel";

  if (isRatio) {
    if (data.series.length > 1) {
      warnings.push(
        `${type} uses only the first value column; ignored: ${data.series.slice(1).map((s) => s.name).join(", ")}`,
      );
    }
    if (data.labels.length < 2) return { ok: false, code: "notEnough", message: "ratio charts need at least 2 rows" };
    const total = first.values.reduce((s, v) => s + Math.max(0, v), 0);
    if (!(total > 0)) return { ok: false, code: "allZero", message: "all values are zero — nothing to draw" };
    if (first.values.some((v) => v < 0)) {
      warnings.push("negative values are treated as 0 in ratio charts");
    }
  }

  if (type === "radar" && data.labels.length < 3) {
    return { ok: false, code: "notEnough", message: "radar charts need at least 3 dimensions (rows)" };
  }

  const aria = `${type} chart: ${data.labels.length} categories, ${data.series.length} series`;

  let body: string;
  switch (type) {
    case "bar":
      body = renderBar(data, yLabel);
      break;
    case "line":
      body = renderLineOrArea(data, yLabel, false);
      break;
    case "area":
      body = renderLineOrArea(data, yLabel, true);
      break;
    case "pie":
    case "donut":
      body = piePositions(
        data.labels.map((label, i) => ({ label, value: first.values[i] })),
        type === "donut",
      );
      break;
    case "radar":
      body = renderRadar(data);
      break;
    case "funnel":
      body = renderFunnel(data);
      break;
  }

  return { ok: true, svg: `${openSvg(aria)}${body}</svg>`, warnings };
}

/** 一步到位:文本 → SVG(供引擎与测试共用)。 */
export function chartFromText(
  input: string,
  type: ChartType,
  yLabel = "",
  headerMode: HeaderMode = "auto",
): { ok: true; svg: string; warnings: string[]; data: ChartData } | { ok: false; code: ChartErrorCode; message?: string } {
  const parsed = parseChartData(input, headerMode);
  if (!parsed.ok) return parsed;
  const rendered = renderChartSvg(parsed.data, type, yLabel);
  if (!rendered.ok) return rendered;
  return { ...rendered, data: parsed.data };
}
