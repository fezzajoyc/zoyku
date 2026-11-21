/**
 * G04/G(CN-022):2–64 任意进制整数转换(BigInt,任意大小非负整数)。
 * 字母表:0-9 a-z A-Z + /(64 字符,IT-Tools 同序)。基数 ≤36 时惯例小写,
 * 但本实现按字母表严格大小写敏感(37+ 必须区分)。
 * 红线:0-9a-f 段与 node BigInt/parseInt 全长度交叉核对。
 */

export const BASE64_ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/";

export type BaseConvertResult =
  | { ok: true; value: bigint }
  | { ok: false; code: "empty" | "invalidDigits" | "badRadix" | "negative" };

export function isValidRadix(radix: number): boolean {
  return Number.isInteger(radix) && radix >= 2 && radix <= 64;
}

/** 字符串 → BigInt(给定进制;严格校验字符表;空白/下划线容忍)。 */
export function parseInBase(input: string, radix: number): BaseConvertResult {
  if (!isValidRadix(radix)) return { ok: false, code: "badRadix" };
  const t = input.trim().replace(/[\s_]/g, "");
  if (t === "") return { ok: false, code: "empty" };
  // "-" 在字母表中不存在,恒为符号;"+" 在 64 进制是数字位(第 62 位),仅低进制视为符号
  if (t.startsWith("-")) return { ok: false, code: "negative" };
  if (t.startsWith("+") && radix < 64) return { ok: false, code: "negative" };
  const alphabet = BASE64_ALPHABET.slice(0, radix);
  let v = 0n;
  const b = BigInt(radix);
  for (const ch of t) {
    const idx = alphabet.indexOf(ch);
    if (idx === -1) return { ok: false, code: "invalidDigits" };
    v = v * b + BigInt(idx);
  }
  return { ok: true, value: v };
}

/** BigInt → 字符串(给定进制;负数带符号)。 */
export function toBaseStr(value: bigint, radix: number): string {
  if (!isValidRadix(radix)) throw new Error("badRadix");
  if (value < 0n) throw new Error("negative"); // 本工具契约=非负整数(与既有四栏一致)
  if (value === 0n) return "0";
  let out = "";
  const b = BigInt(radix);
  while (value > 0n) {
    out = BASE64_ALPHABET[Number(value % b)] + out;
    value /= b;
  }
  return out;
}
