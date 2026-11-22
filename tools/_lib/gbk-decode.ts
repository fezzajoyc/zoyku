/**
 * CN-018:GBK/GB18030 解码器(零依赖,浏览器原生 TextDecoder)。
 * WHATWG Encoding 标准内建 gbk/gb18030 解码;编码方向(文本→GBK)浏览器无原生支持,本工具只做解码。
 * 场景:乱码文件救援(GBK 编码的 CSV/TXT 在 UTF-8 环境打开变乱码)。
 */

import { decodeByteEncoding } from "./byte-encoding";

export type GbkEncoding = "gbk" | "gb18030";

export type GbkDecodeResult =
  | { ok: true; text: string; replacementCount: number; byteLength: number }
  | { ok: false; code: "empty" | "tooLarge" | "badHex" | "badBase64" };

/** 文件/粘贴统一上限 2MB(解码是同步操作,避免长任务卡死主线程)。 */
const MAX_BYTES = 2_000_000;

export function decodeGbkBytes(bytes: Uint8Array, enc: GbkEncoding): GbkDecodeResult {
  if (bytes.length === 0) return { ok: false, code: "empty" };
  if (bytes.length > MAX_BYTES) return { ok: false, code: "tooLarge" };
  // TextDecoder 非流式模式:每次调用独立,fatal:false → 无效字节替换为 U+FFFD 而非抛错
  const decoder = new TextDecoder(enc, { fatal: false });
  const text = decoder.decode(bytes);
  const replacementCount = countReplacements(text);
  return { ok: true, text, replacementCount, byteLength: bytes.length };
}

/** 统计 U+FFFD 数量(损坏字节的直观指标;源数据本身含 U+FFFD 的概率可忽略,作为启发式已足够)。 */
export function countReplacements(text: string): number {
  let n = 0;
  for (const ch of text) if (ch === "\u{FFFD}") n++;
  return n;
}

/** 粘贴输入(hex/base64)→ 解码。文件路径直接走 decodeGbkBytes。hex 吞空白(十六进制转储粘贴场景)。 */
export function decodeGbkInput(raw: string, inputFormat: "hex" | "base64", enc: GbkEncoding): GbkDecodeResult {
  const cleaned = inputFormat === "hex" ? raw.replace(/\s+/g, "") : raw.trim();
  if (cleaned === "") return { ok: false, code: "empty" };
  const parsed = decodeByteEncoding(cleaned, inputFormat);
  if (!parsed.ok) return { ok: false, code: inputFormat === "hex" ? "badHex" : "badBase64" };
  return decodeGbkBytes(parsed.bytes, enc);
}
