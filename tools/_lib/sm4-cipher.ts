/**
 * CN-027:SM4 加解密(sm-crypto 0.3.13,GB/T 32907-2016)。
 * 国密分组密码,128 位密钥/分组。ECB 与 CBC(带 IV)两种模式,pkcs 填充。
 * 键入约定:32 位十六进制字符串 = 128 位密钥;输入为 UTF-8 文本(内部转字节)。
 * 无认证披露:ECB/CBC 均不带认证标签,篡改不可检测——合规场景应配合 HMAC-SM3。
 * 锚 = GB/T 32907-2016 附录 A 标准向量(681edf34…,实现+联网双确认)。
 */

import { sm4 as sm4Lib } from "sm-crypto";

export type Sm4Mode = "ecb" | "cbc";
export type Sm4Result =
  | { ok: true; data: string }
  | { ok: false; code: "empty" | "badKey" | "badIv" | "badInput" | "decryptFailed"; message?: string };

const KEY_RE = /^[0-9a-fA-F]{32}$/;
const MAX_INPUT = 1_000_000;

function validKey(key: string): boolean {
  return KEY_RE.test(key);
}

function utf8ToBytes(text: string): number[] {
  return Array.from(new TextEncoder().encode(text));
}

function bytesToUtf8(bytes: number[]): string {
  return new TextDecoder().decode(new Uint8Array(bytes));
}

export async function sm4Encrypt(text: string, key: string, mode: Sm4Mode = "ecb", iv?: string): Promise<Sm4Result> {
  if (text === "" || key === "") return { ok: false, code: "empty" };
  if (!validKey(key)) return { ok: false, code: "badKey" };
  if (text.length > MAX_INPUT) return { ok: false, code: "tooLong" as never };
  if (mode === "cbc") {
    if (!iv || !KEY_RE.test(iv)) return { ok: false, code: "badIv" };
  }
  const opts = mode === "cbc" ? { padding: "pkcs#5" as const, mode: "cbc" as const, iv } : { padding: "pkcs#5" as const };
  try {
    const hex = sm4Lib.encrypt(utf8ToBytes(text), key.toLowerCase(), opts);
    return { ok: true, data: hex };
  } catch (e) {
    return { ok: false, code: "decryptFailed", message: e instanceof Error ? e.message : String(e) };
  }
}

export async function sm4Decrypt(hex: string, key: string, mode: Sm4Mode = "ecb", iv?: string): Promise<Sm4Result> {
  const trimmed = hex.trim();
  if (trimmed === "" || key === "") return { ok: false, code: "empty" };
  if (!validKey(key)) return { ok: false, code: "badKey" };
  if (!/^[0-9a-fA-F]+$/.test(trimmed) || trimmed.length % 32 !== 0) {
    return { ok: false, code: "badInput" };
  }
  if (mode === "cbc") {
    if (!iv || !KEY_RE.test(iv)) return { ok: false, code: "badIv" };
  }
  const opts = mode === "cbc" ? { padding: "pkcs#5" as const, mode: "cbc" as const, iv } : { padding: "pkcs#5" as const };
  try {
    const out = sm4Lib.decrypt(trimmed.toLowerCase(), key.toLowerCase(), opts) as string | number[];
    const text = typeof out === "string" ? out : bytesToUtf8(out);
    return { ok: true, data: text };
  } catch (e) {
    return { ok: false, code: "decryptFailed", message: e instanceof Error ? e.message : String(e) };
  }
}

/** 锚路径:原始字节块加密(无填充,16 字节)——供标准向量测试用。 */
export function sm4EncryptBlockRaw(bytes16: number[], keyHex: string): string {
  return sm4Lib.encrypt(bytes16, keyHex, { padding: "none" });
}

/** GB/T 32907-2016 附录 A 标准向量(实现+联网双确认)。 */
export const SM4_SPEC_VECTOR = {
  key: "0123456789abcdeffedcba9876543210",
  plaintext: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab, 0xcd, 0xef, 0xfe, 0xdc, 0xba, 0x98, 0x76, 0x54, 0x32, 0x10],
  ciphertext: "681edf34d206965e86b3e94f536e4246",
} as const;
