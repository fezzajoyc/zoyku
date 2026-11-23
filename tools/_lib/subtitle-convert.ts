/**
 * CN-034:字幕格式转换纯函数。
 * - SRT ↔ WebVTT 双向(核心:时间戳 `,mmm` ↔ `.mmm`、WEBVTT 头、cue 序号、
 *   NOTE/STYLE/REGION 块跳过、CRLF 归一、多行 cue 文本保留)
 * - ASS/SSA → SRT 单向(解析 [Events] 段 Dialogue 行,剥离 {\...} 覆盖标签,
 *   \N/\n 换行,SRT 无样式模型——样式信息按设计丢弃,诚实呈现)
 *
 * 解析锚(测试向量的来源,全部为公开规范样例,非凭记忆编造):
 * - SRT:英文维基百科 SubRip 条目的 Star Wars: Episode II 样例(5 条 cue)
 * - WebVTT:W3C WebVTT 1 规范 §1.1–§1.7 的示例 cue(时间戳/NOTE/STYLE/cue id)
 * - ASS:构造最小 Dialogue 行(标准 V4+ 十字段布局)
 *
 * 宽容解析的既定决策(与测试注释一致):
 * 1. SRT 序号行允许缺失;输出 SRT 保留原序号(数值序号原样带回,缺失/非数字按出现顺序补),
 *    不强制连续——保留原始序号使 SRT→VTT→SRT 逐字节等价成立。
 * 2. WebVTT 头不强制(WEBVTT 行存在则跳过);时间戳输出恒为 HH:MM:SS.mmm 带小时形式。
 * 3. cue 时间要求 end > start(WebVTT 规范 §4.1 要求 end 严格大于 start),end ≤ start
 *    一律拒绝(code=inverted),零时长 cue 同样拒绝——转换器不做静默修正。
 * 4. VTT→SRT 时剥离 VTT 行内标签(<v>/<c>/<i>/<b>/<u>/卡拉OK时间戳等):
 *    SRT 无对应语义,<i> 等虽被部分播放器容错但按最干净输出处理。
 * 5. VTT cue settings(align/position/size/line)与 SRT 扩展坐标 X1..Y2 无 SRT 对应物,
 *    转换时丢弃;STYLE/REGION/NOTE 块整体跳过。
 * 6. ASS 的 Format 行若存在则按其字段序解析(兼容 SSA 的 Marked 布局);
 *    缺失时按标准 V4+ 十字段顺序(Layer,Start,End,Style,Name,MarginL,MarginR,MarginV,Effect,Text)。
 * 7. ASS 时间 H:MM:SS.cc:小数 1–2 位按厘秒(×10ms),3 位按毫秒;
 *    \h(不换行空格)转普通空格;Text 字段含半角逗号安全(第 N 逗号之后全部为文本)。
 * 8. 全角字符(，、：等)不在任何分隔逻辑内,原样保留。
 */

export type SubtitleErrorCode =
  | "empty" // 空输入
  | "encoding" // 疑似编码异常(UTF-16 粘贴成乱码会含 U+0000)
  | "noCues" // 无有效 cue
  | "badTimestamp" // 时间戳格式错
  | "inverted"; // 起止倒置(end ≤ start)

export type SubtitleResult =
  | { ok: true; data: string }
  | { ok: false; code: SubtitleErrorCode; message?: string };

export type SubtitleFormat = "srt" | "vtt" | "ass";

type Cue = {
  /** cue 序号/标识(原始字符串,可为非数字);null = 原文没有 */
  id: string | null;
  startMs: number;
  endMs: number;
  /** 多行文本,已剥离行内标记 */
  lines: string[];
};

const fail = (code: SubtitleErrorCode, message?: string): SubtitleResult => ({
  ok: false,
  code,
  message,
});

/** CRLF/CR → LF 归一 + 去 BOM(WebVTT 规范 §4.1 允许可选 BOM)。 */
function normalize(input: string): string {
  return input.replace(/^\uFEFF/, "").replace(/\r\n?/g, "\n");
}

function hasNulBytes(s: string): boolean {
  return s.includes("\u0000");
}

/** 解析单个时间戳 token(HH:MM:SS[,/.]mmm 或 MM:SS[,/.]mmm),失败返回 null。 */
function parseTimestamp(token: string): number | null {
  const m = /^(?:(\d{1,2}):)?(\d{1,2}):(\d{2})[,.](\d{1,3})$/.exec(token.trim());
  if (!m) return null;
  const h = m[1] ? parseInt(m[1], 10) : 0;
  const min = parseInt(m[2], 10);
  const sec = parseInt(m[3], 10);
  // 小数位右补零:`,5` = 500ms,`,50` = 50ms,`,500` = 500ms
  const frac = parseInt(m[4].padEnd(3, "0"), 10);
  if (min > 59 || sec > 59) return null;
  return h * 3600000 + min * 60000 + sec * 1000 + frac;
}

/** ms → "HH:MM:SS,mmm"(SRT 形式) */
function toSrtTimestamp(ms: number): string {
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  const frac = ms % 1000;
  return (
    `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")},${String(frac).padStart(3, "0")}`
  );
}

/** ms → "HH:MM:SS.mmm"(VTT 输出恒带小时,决策 #2) */
function toVttTimestamp(ms: number): string {
  return toSrtTimestamp(ms).replace(",", ".");
}

/** 解析 timing 行,返回 [startMs, endMs];失败返回 null。设置项(--> 之后的余部)丢弃。 */
function parseTimingLine(line: string): { start: number; end: number } | null {
  const parts = line.split("-->");
  if (parts.length < 2) return null;
  const start = parseTimestamp(parts[0]);
  if (start === null) return null;
  // 右侧第一个空白分隔 token 是结束时间戳,其余是 cue settings / 扩展坐标 → 丢弃
  const right = parts.slice(1).join("-->").trim();
  const endToken = right.split(/\s+/)[0] ?? "";
  const end = parseTimestamp(endToken);
  if (end === null) return null;
  return { start, end };
}

function checkCueTimes(start: number, end: number): SubtitleResult | null {
  if (end <= start) return fail("inverted", `${toSrtTimestamp(start)} → ${toSrtTimestamp(end)}`);
  return null;
}

/**
 * 通用 cue 块解析:把块(空行分隔)转成 cue。
 * timing 行之后的行 → 文本。
 * timing 行之前:
 * - VTT(WebVTT §4.1):可选 cue identifier,任意字符(不含 -->/换行),取最后一行;
 * - SRT:序号行,仅纯数字算序号,其余(罕见畸形)并入文本。
 */
function blockToCue(block: string[], isVtt: boolean): { cue: Cue | null; error: SubtitleResult | null } {
  const timingIdx = block.findIndex((l) => l.includes("-->"));
  if (timingIdx === -1) return { cue: null, error: null }; // 非 cue 块(杂散文本)静默跳过
  const timing = parseTimingLine(block[timingIdx]);
  if (!timing) {
    return { cue: null, error: fail("badTimestamp", block[timingIdx].trim()) };
  }
  const inv = checkCueTimes(timing.start, timing.end);
  if (inv) return { cue: null, error: inv };

  const before = block.slice(0, timingIdx);
  const after = block.slice(timingIdx + 1);
  let id: string | null = null;
  const prefixLines: string[] = [];
  if (before.length > 0) {
    const last = before[before.length - 1].trim();
    if (isVtt || /^\d+$/.test(last)) {
      id = last;
      prefixLines.push(...before.slice(0, -1));
    } else {
      prefixLines.push(...before);
    }
  }
  return {
    cue: { id, startMs: timing.start, endMs: timing.end, lines: [...prefixLines, ...after] },
    error: null,
  };
}

/**
 * 按空行(≥2 个连续换行)切块,去掉块首尾的空行,丢弃全空块。
 * 空行终止块是 SRT 与 WebVTT 共同的块边界语义(Wikipedia SubRip 条目第 4 点 /
 * WebVTT 规范 §4.1 cue block),cue 文本内部因此不含空行。
 */
function splitBlocks(text: string): string[][] {
  return text
    .split(/\n{2,}/)
    .map((b) => b.replace(/^\n+/, "").replace(/\n+$/, ""))
    .filter((b) => b.trim() !== "")
    .map((b) => b.split("\n"));
}

/** 跳过 VTT 的 NOTE / STYLE / REGION 块(W3C WebVTT §4.1)。 */
function isVttSpecialBlock(lines: string[]): boolean {
  if (lines.length === 0) return false;
  const first = lines[0];
  return /^(NOTE|STYLE|REGION)(\s|$)/.test(first);
}

/** VTT 文本 → cue 列表。头行可选跳过。 */
function parseVtt(input: string): { cues: Cue[]; error: SubtitleResult | null } {
  let text = normalize(input);
  // WEBVTT 签名行(其后可有同行的 header 文本,一并丢弃)
  if (/^WEBVTT([ \t].*)?$/.test(text.split("\n")[0] ?? "")) {
    text = text.split("\n").slice(1).join("\n");
  }
  const cues: Cue[] = [];
  for (const block of splitBlocks(text)) {
    if (isVttSpecialBlock(block)) continue;
    const { cue, error } = blockToCue(block, true);
    if (error) return { cues: [], error };
    if (cue) cues.push(cue);
  }
  return { cues, error: null };
}

/** SRT 文本 → cue 列表(与 VTT 共用块解析;SRT 无特殊块)。 */
function parseSrt(input: string): { cues: Cue[]; error: SubtitleResult | null } {
  const cues: Cue[] = [];
  for (const block of splitBlocks(normalize(input))) {
    const { cue, error } = blockToCue(block, false);
    if (error) return { cues: [], error };
    if (cue) cues.push(cue);
  }
  return { cues, error: null };
}

/**
 * ASS/SSA → cue 列表。逐行扫 Dialogue:;Format 行提供字段序(决策 #6)。
 * Text 字段 = 第 textFieldIdx 个逗号之后的所有内容(含半角逗号安全)。
 */
function parseAss(input: string): { cues: Cue[]; error: SubtitleResult | null } {
  const text = normalize(input);
  const lines = text.split("\n");
  let startIdx = 1; // 默认 V4+:Start
  let endIdx = 2; // End
  let textIdx = 9; // Text
  let formatSeen = false;
  const cues: Cue[] = [];

  const parseAssTime = (token: string): number | null => {
    const m = /^(\d+):(\d{1,2}):(\d{1,2})\.(\d{1,3})$/.exec(token.trim());
    if (!m) return null;
    const h = parseInt(m[1], 10);
    const min = parseInt(m[2], 10);
    const sec = parseInt(m[3], 10);
    const fracDigits = m[4];
    let fracMs: number;
    if (fracDigits.length <= 2) fracMs = parseInt(fracDigits.padEnd(2, "0"), 10) * 10;
    else fracMs = parseInt(fracDigits, 10); // 3 位按毫秒
    if (min > 59 || sec > 59) return null;
    return h * 3600000 + min * 60000 + sec * 1000 + fracMs;
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (/^Format:\s*/i.test(line) && !formatSeen) {
      // 只认 [Events] 语境里的 Format —— 简化:首个 Format 行视为 Events 字段表。
      // ASS 文件的 Styles 段 Format 同样以 Format: 开头,但其字段名不含 Start/End/Text 组合,
      // 用「能同时找到 Start/End/Text」来识别 Events 格式行。
      const fields = line.replace(/^Format:\s*/i, "").split(",").map((f) => f.trim().toLowerCase());
      const s = fields.indexOf("start");
      const e = fields.indexOf("end");
      const t = fields.indexOf("text");
      if (s !== -1 && e !== -1 && t !== -1) {
        startIdx = s;
        endIdx = e;
        textIdx = t;
        formatSeen = true;
      }
      continue;
    }
    if (!/^Dialogue:/i.test(line)) continue;
    // 定位第 textIdx 个逗号
    let pos = -1;
    for (let k = 0; k < textIdx; k++) {
      pos = line.indexOf(",", pos + 1);
      if (pos === -1) break;
    }
    if (pos === -1) continue; // 字段不足,畸形行跳过
    const head = line.slice("Dialogue:".length, pos).split(",");
    const textPart = line.slice(pos + 1);

    const start = parseAssTime(head[startIdx] ?? "");
    const end = parseAssTime(head[endIdx] ?? "");
    if (start === null || end === null) {
      return { cues: [], error: fail("badTimestamp", line.slice(0, 60)) };
    }
    const inv = checkCueTimes(start, end);
    if (inv) return { cues: [], error: inv };

    const stripped = textPart
      .replace(/\{[^}]*\}/g, "") // 剥离 {\...} 覆盖标签
      .replace(/\\N/g, "\n")
      .replace(/\\n/g, "\n")
      .replace(/\\h/g, " ")
      .trim();
    cues.push({ id: null, startMs: start, endMs: end, lines: stripped.split("\n") });
  }
  return { cues, error: null };
}

/** 输出 SRT:序号保留原数值(缺失或非数字按顺序补),块间空行,结尾单换行。 */
function emitSrt(cues: Cue[]): string {
  const out: string[] = [];
  let seq = 0;
  for (const c of cues) {
    seq += 1;
    const index = c.id !== null && /^\d+$/.test(c.id) ? c.id : String(seq);
    out.push(
      [index, `${toSrtTimestamp(c.startMs)} --> ${toSrtTimestamp(c.endMs)}`, ...c.lines].join("\n"),
    );
  }
  return out.join("\n\n") + "\n";
}

/** 输出 VTT:WEBVTT 头 + cue(id 有则带),结尾单换行。 */
function emitVtt(cues: Cue[]): string {
  const out: string[] = [];
  for (const c of cues) {
    const head = c.id !== null ? [c.id] : [];
    out.push(
      [...head, `${toVttTimestamp(c.startMs)} --> ${toVttTimestamp(c.endMs)}`, ...c.lines].join("\n"),
    );
  }
  return "WEBVTT\n\n" + out.join("\n\n") + "\n";
}

/** VTT 行内标签剥离(VTT→SRT 时用;决策 #4)。只剥真实标签形态(字母标签 / 卡拉OK时间戳),
 *  普通文本里的不等式(「1 < 2 and 3 > 0」)不是标签,必须原样保留。 */
function stripVttTags(lines: string[]): string[] {
  return lines.map((l) => l.replace(/<\/?[a-zA-Z][^>]*>|<\d[\d:.]*>/g, ""));
}

function guard(input: string): SubtitleResult | null {
  if (input.trim() === "") return fail("empty");
  if (hasNulBytes(input)) return fail("encoding");
  return null;
}

function requireCues(cues: Cue[]): SubtitleResult | null {
  if (cues.length === 0) return fail("noCues");
  return null;
}

/** SRT → WebVTT。 */
export function srtToVtt(input: string): SubtitleResult {
  const g = guard(input);
  if (g) return g;
  const { cues, error } = parseSrt(input);
  if (error) return error;
  const nc = requireCues(cues);
  if (nc) return nc;
  return { ok: true, data: emitVtt(cues) };
}

/** SRT → SRT(归一:CRLF→LF、时间戳规范形、序号补全)。 */
export function srtToSrt(input: string): SubtitleResult {
  const g = guard(input);
  if (g) return g;
  const { cues, error } = parseSrt(input);
  if (error) return error;
  const nc = requireCues(cues);
  if (nc) return nc;
  return { ok: true, data: emitSrt(cues) };
}

/** WebVTT → SRT(行内标签剥离)。 */
export function vttToSrt(input: string): SubtitleResult {
  const g = guard(input);
  if (g) return g;
  const { cues, error } = parseVtt(input);
  if (error) return error;
  const nc = requireCues(cues);
  if (nc) return nc;
  return { ok: true, data: emitSrt(cues.map((c) => ({ ...c, lines: stripVttTags(c.lines) }))) };
}

/** WebVTT → WebVTT(归一:去 NOTE/STYLE、时间戳带小时规范形、CRLF→LF)。 */
export function vttToVtt(input: string): SubtitleResult {
  const g = guard(input);
  if (g) return g;
  const { cues, error } = parseVtt(input);
  if (error) return error;
  const nc = requireCues(cues);
  if (nc) return nc;
  return { ok: true, data: emitVtt(cues) };
}

/** ASS/SSA → SRT(单向;样式按设计丢弃)。 */
export function assToSrt(input: string): SubtitleResult {
  const g = guard(input);
  if (g) return g;
  const { cues, error } = parseAss(input);
  if (error) return error;
  const nc = requireCues(cues);
  if (nc) return nc;
  return { ok: true, data: emitSrt(cues) };
}

/** 引擎统一入口:按源/目标格式分发。ASS 只到 SRT(工具文案明示的单向能力)。 */
export function convertSubtitle(input: string, source: SubtitleFormat, target: SubtitleFormat): SubtitleResult {
  if (source === "ass") return assToSrt(input);
  if (source === "srt") return target === "vtt" ? srtToVtt(input) : srtToSrt(input);
  return target === "srt" ? vttToSrt(input) : vttToVtt(input);
}
