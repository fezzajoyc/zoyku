/**
 * CN-024:IBAN 校验/解析(ISO 13616,MOD-97-10 per ISO/IEC 7064:2003)。
 * 三层校验:① 字符集 ② 国家长度(100 国注册表)③ mod-97 余 1。
 * 不校验 bank/account 的国内语义(如实披露)。BigInt 处理最长 34 字符。
 */

import { IBAN_REGISTRY, IBAN_COUNTRIES } from "./iban-registry";

export type IbanParts = {
  country: string;
  checkDigits: string;
  bban: string;
  formatted: string;
  sepa: boolean;
  length: number;
};

export type IbanResult =
  | { ok: true; valid: boolean; input: string; normalized: string; parts: IbanParts | null; error?: string }
  | { ok: false; code: "empty" | "tooLong" };

const MAX_INPUT = 400; // 单行;批量由引擎逐行调用
const MAX_BATCH_LINES = 200;

const IBAN_RE = /^[A-Z]{2}[0-9]{2}[A-Z0-9]+$/;

function normalize(raw: string): string {
  return raw.replace(/[\s-]/g, "").toUpperCase();
}

/** 核心算法:重排(前 4位移尾)+ 字母转数字(ISO 7064)→ mod 97。 */
export function ibanMod97(normalized: string): bigint {
  const rearranged = normalized.slice(4) + normalized.slice(0, 4);
  let digits = "";
  for (const ch of rearranged) {
    const code = ch.charCodeAt(0);
    digits += code >= 65 && code <= 90 ? String(code - 55) : ch;
  }
  return BigInt(digits) % 97n;
}

/** 由国家码 + BBAN 计算两位校验数字(生成用;输入 BBAN 须为该国正确长度)。 */
export function ibanCheckDigits(country: string, bban: string): string | null {
  const info = IBAN_REGISTRY[country];
  if (!info) return null;
  if (bban.length !== info.length - 4) return null;
  const candidate = `${country}00${bban.toUpperCase()}`;
  const remainder = ibanMod97(candidate);
  const check = Number(98n - remainder);
  return String(check).padStart(2, "0");
}

/** 单条校验:返回 valid + 解析片段;无效时带具体原因。 */
export function validateIban(raw: string): { valid: boolean; normalized: string; parts: IbanParts | null; error?: string } {
  const normalized = normalize(raw);
  if (normalized === "") return { valid: false, normalized: "", parts: null, error: "empty" };
  if (normalized.length < 15 || normalized.length > 34) {
    return { valid: false, normalized, parts: null, error: "length-range" };
  }
  if (!IBAN_RE.test(normalized)) {
    return { valid: false, normalized, parts: null, error: "charset" };
  }
  const country = normalized.slice(0, 2);
  const info = IBAN_REGISTRY[country];
  if (!info) {
    return { valid: false, normalized, parts: null, error: "country" };
  }
  if (normalized.length !== info.length) {
    return { valid: false, normalized, parts: null, error: `country-length:${info.length}` };
  }
  const remainder = ibanMod97(normalized);
  if (remainder !== 1n) {
    return { valid: false, normalized, parts: null, error: "mod97" };
  }
  const formatted = normalized.replace(/(.{4})/g, "$1 ").trim();
  return {
    valid: true,
    normalized,
    parts: {
      country,
      checkDigits: normalized.slice(2, 4),
      bban: normalized.slice(4),
      formatted,
      sepa: info.sepa,
      length: info.length,
    },
  };
}

/** 批量:逐行(空行跳过),上限 MAX_BATCH_LINES。 */
export function validateIbanBatch(text: string): Array<{ line: number; raw: string; result: ReturnType<typeof validateIban> }> {
  const lines = text.split("\n").map((l) => l.trim()).filter((l) => l !== "").slice(0, MAX_BATCH_LINES);
  return lines.map((raw, idx) => ({ line: idx + 1, raw, result: validateIban(raw) }));
}

export const IBAN_LIMITS = Object.freeze({ maxLine: MAX_INPUT, maxLines: MAX_BATCH_LINES, countries: IBAN_COUNTRIES.length });
