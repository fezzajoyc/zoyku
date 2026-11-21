/**
 * G17:TOTP 注册密钥生成 + otpauth URI 导出 + 相邻时间窗。
 * - 密钥:CSPRNG(crypto.getRandomValues),默认 160 位(20 字节)。
 * - base32Encode:RFC 4648(与 lib/totp.ts 的 base32Decode 互逆)。
 * - URI 按 Google Authenticator 约定:label = Issuer:account(各自
 *   encodeURIComponent,冒号为字面分隔),issuer 参数同步;period=30 省略。
 * - 敏感参数不写入 URL 日志由调用方负责;本模块只构建字符串。
 */

import { base32Decode, type TotpAlgo } from "./totp";

const B32 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

/** RFC 4648 base32 编码;pad=false 时不输出 "="(otpauth URI 惯例)。 */
export function base32Encode(bytes: Uint8Array, pad = false): string {
  let bits = 0;
  let value = 0;
  let out = "";
  for (const byte of bytes) {
    value = (value << 8) | byte;
    bits += 8;
    while (bits >= 5) {
      out += B32[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }
  if (bits > 0) out += B32[(value << (5 - bits)) & 31];
  if (pad) {
    while (out.length % 8 !== 0) out += "=";
  }
  return out;
}

export type SecretGenError = "badLength";

/** CSPRNG 生成 TOTP 密钥。字节数默认 160 位(RFC 6238 推荐强度),范围 16–64。 */
export function generateTotpSecret(byteCount = 20): Uint8Array<ArrayBuffer> | { error: SecretGenError } {
  if (!Number.isInteger(byteCount) || byteCount < 16 || byteCount > 64) return { error: "badLength" };
  return crypto.getRandomValues(new Uint8Array(byteCount)) as Uint8Array<ArrayBuffer>;
}

export type OtpauthUriInput = {
  account: string;
  issuer?: string;
  secretBase32: string;
  algo: TotpAlgo;
  digits: number;
  period: number;
};

export type OtpauthUriResult =
  | { ok: true; uri: string }
  | { ok: false; code: "emptyAccount" | "badSecret" | "badDigits" | "badPeriod" };

function escapeLabel(part: string): string {
  // 标签内的 ":" 是 Issuer:account 的字面分隔符,其余字符按组件转义
  return encodeURIComponent(part).replace(/%3A/gi, ":");
}

/** 构建 otpauth://totp URI(issuer/account/secret 转义;period=30 省略)。 */
export function buildOtpauthUri(input: OtpauthUriInput): OtpauthUriResult {
  const account = input.account.trim();
  if (account === "") return { ok: false, code: "emptyAccount" };
  const secretClean = input.secretBase32.replace(/\s+/g, "").replace(/=+$/, "");
  if (base32Decode(secretClean) === null) return { ok: false, code: "badSecret" };
  if (!Number.isInteger(input.digits) || input.digits < 6 || input.digits > 10) {
    return { ok: false, code: "badDigits" };
  }
  if (![30, 60].includes(input.period)) return { ok: false, code: "badPeriod" };

  const issuer = input.issuer?.trim() ?? "";
  const label =
    issuer !== ""
      ? `${escapeLabel(issuer)}:${escapeLabel(account)}`
      : escapeLabel(account);
  const params = new URLSearchParams();
  params.set("secret", secretClean);
  if (issuer !== "") params.set("issuer", issuer);
  if (input.algo !== "SHA-1") params.set("algorithm", input.algo.replace("-", ""));
  if (input.digits !== 6) params.set("digits", String(input.digits));
  if (input.period !== 30) params.set("period", String(input.period));
  return { ok: true, uri: `otpauth://totp/${label}?${params.toString()}` };
}

export type AdjacentCodes = {
  previous: string;
  current: string;
  next: string;
};

/** 相邻时间窗:时钟略偏时前后一格的码(当前计数器 ±1)。 */
export async function adjacentCodes(
  keyBytes: Uint8Array,
  unixTimeMs: number,
  algo: TotpAlgo,
  digits: number,
  period: number,
  totpFn: (key: Uint8Array, unixTime: number, algo: TotpAlgo, digits: number, period: number) => Promise<string>,
): Promise<AdjacentCodes> {
  const nowSec = Math.floor(unixTimeMs / 1000);
  const [previous, current, next] = await Promise.all([
    totpFn(keyBytes, nowSec - period, algo, digits, period),
    totpFn(keyBytes, nowSec, algo, digits, period),
    totpFn(keyBytes, nowSec + period, algo, digits, period),
  ]);
  return { previous, current, next };
}
