/**
 * CN-017:SM3 国密哈希(sm-crypto 0.3.13,MIT)。
 * GB/T 32905-2016 密码杂凑算法,中国商用密码体系(与 SHA-256 同输出长度 256-bit)。
 * 输入:text(UTF-8)/hex/base64;输出:hex + base64。懒加载。
 */

import { sm3 as sm3Fn } from "sm-crypto";

export type Sm3InputFormat = "text" | "hex" | "base64";

export type Sm3Result =
  | { ok: true; hex: string; base64: string }
  | { ok: false; code: "empty" | "badHex" | "badBase64" | "tooLong" };

const MAX_INPUT = 1_000_000; // 文本字符数上限;hex 解码后更少

const HEX_RE = /^[0-9a-fA-F]+$/;

function bytesFromBase64(s: string): Uint8Array | null {
  // 严格 base64:长度 %4、仅标准字母表、padding 只能出现在末尾
  if (s.length === 0 || s.length % 4 !== 0) return null;
  if (!/^[A-Za-z0-9+/]+={0,2}$/.test(s)) return null;
  let binary: string;
  try {
    binary = atob(s);
  } catch {
    return null;
  }
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

export function hexToBase64(hex: string): string {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) bytes[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary);
}

export async function computeSm3(input: string, format: Sm3InputFormat): Promise<Sm3Result> {
  const trimmed = input.trim();
  if (trimmed === "") return { ok: false, code: "empty" };
  if (input.length > MAX_INPUT) return { ok: false, code: "tooLong" };

  let bytes: Uint8Array;
  if (format === "text") {
    bytes = new TextEncoder().encode(input);
  } else if (format === "hex") {
    const h = trimmed;
    if (h.length % 2 !== 0 || !HEX_RE.test(h)) return { ok: false, code: "badHex" };
    bytes = new Uint8Array(h.length / 2);
    for (let i = 0; i < bytes.length; i++) bytes[i] = parseInt(h.slice(i * 2, i * 2 + 2), 16);
  } else {
    const b = bytesFromBase64(trimmed);
    if (!b) return { ok: false, code: "badBase64" };
    bytes = b;
  }

  const hex = sm3Fn(Array.from(bytes));
  return { ok: true, hex, base64: hexToBase64(hex) };
}
