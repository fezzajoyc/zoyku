/**
 * CN-033:Punycode 编解码(RFC 3492)+ IDNA 域名转换。
 * 底层 = punycode npm 包(Mathias Bynens,Node.js 内建模块的上游,战斗验证)。
 * 遵循"不手写编码算法"原则——手写版多轮编码有深层 bug 已废弃。
 * 锚 = Python codecs.encode/decode("punycode") + Python str.encode("idna")
 *      + Node 内建 punycode 三实现一致。
 */

import {
  encode as pcEncode,
  decode as pcDecode,
  toASCII as pcToASCII,
  toUnicode as pcToUnicode,
} from "punycode";

export type PunycodeResult =
  | { ok: true; data: string }
  | { ok: false; code: "empty" | "badInput"; message?: string };

/** Punycode 编码:Unicode 字符串 → Punycode ASCII 字符串(不含 xn-- 前缀)。 */
export function punycodeEncode(input: string): PunycodeResult {
  if (input === "") return { ok: false, code: "empty" };
  try {
    return { ok: true, data: pcEncode(input) };
  } catch (e) {
    return { ok: false, code: "badInput", message: e instanceof Error ? e.message : String(e) };
  }
}

/** Punycode 解码:Punycode ASCII → Unicode 字符串。 */
export function punycodeDecode(input: string): PunycodeResult {
  if (input === "") return { ok: false, code: "empty" };
  try {
    return { ok: true, data: pcDecode(input) };
  } catch (e) {
    return { ok: false, code: "badInput", message: e instanceof Error ? e.message : String(e) };
  }
}

/** IDNA 域名编码:Unicode 域名 → xn-- ASCII 域名(逐标签)。 */
export function idnaEncode(domain: string): PunycodeResult {
  if (domain.trim() === "") return { ok: false, code: "empty" };
  try {
    return { ok: true, data: pcToASCII(domain) };
  } catch (e) {
    return { ok: false, code: "badInput", message: e instanceof Error ? e.message : String(e) };
  }
}

/** IDNA 域名解码:xn-- ASCII 域名 → Unicode 域名。 */
export function idnaDecode(domain: string): PunycodeResult {
  if (domain.trim() === "") return { ok: false, code: "empty" };
  try {
    return { ok: true, data: pcToUnicode(domain) };
  } catch (e) {
    return { ok: false, code: "badInput", message: e instanceof Error ? e.message : String(e) };
  }
}
