/**
 * RFC 6238 TOTP 纯函数(从 sec-engine-totp 抽出,可用 RFC 官方向量测试)。
 * WebCrypto HMAC;Node 18+ 的 globalThis.crypto.subtle 同样可用。
 */

export type TotpAlgo = "SHA-1" | "SHA-256" | "SHA-512";
export const ALGOS: TotpAlgo[] = ["SHA-1", "SHA-256", "SHA-512"];

const B32 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

/** RFC 4648 base32 解码(忽略空白与填充;非法字符返回 null) */
export function base32Decode(input: string): Uint8Array | null {
  const clean = input.toUpperCase().replace(/[\s=-]/g, "");
  if (clean.length === 0) return null;
  let bits = 0;
  let value = 0;
  const out: number[] = [];
  for (const ch of clean) {
    const idx = B32.indexOf(ch);
    if (idx === -1) return null;
    value = (value << 5) | idx;
    bits += 5;
    if (bits >= 8) {
      out.push((value >>> (bits - 8)) & 0xff);
      bits -= 8;
    }
  }
  return new Uint8Array(out);
}

/** RFC 4226 HOTP:8 字节大端计数器 → HMAC → 动态截断 → digits 位十进制 */
export async function hotp(
  key: Uint8Array,
  counter: number,
  algo: TotpAlgo,
  digits: number,
): Promise<string> {
  const buf = new ArrayBuffer(8);
  const view = new DataView(buf);
  view.setUint32(0, Math.floor(counter / 0x100000000));
  view.setUint32(4, counter >>> 0);
  const cryptoKey = await crypto.subtle.importKey("raw", key as unknown as ArrayBuffer, { name: "HMAC", hash: algo }, false, ["sign"]);
  const mac = new Uint8Array(await crypto.subtle.sign("HMAC", cryptoKey, buf));
  const off = mac[mac.length - 1] & 0x0f;
  const bin =
    ((mac[off] & 0x7f) << 24) | (mac[off + 1] << 16) | (mac[off + 2] << 8) | mac[off + 3];
  return String(bin % 10 ** digits).padStart(digits, "0");
}

/** RFC 6238 TOTP:计数器 = floor(unixTime / period) */
export async function totp(
  key: Uint8Array,
  unixTime: number,
  algo: TotpAlgo,
  digits: number,
  period = 30,
): Promise<string> {
  return hotp(key, Math.floor(unixTime / period), algo, digits);
}

export function parseOtpauth(
  raw: string,
): { secret: string; digits?: number; period?: number; algo?: TotpAlgo; account?: string } | null {
  const m = raw.trim().match(/^otpauth:\/\/totp\/?([^?]*)\?(.*)$/i);
  if (!m) return null;
  const params = new URLSearchParams(m[2]);
  const secret = (params.get("secret") ?? "").replace(/\s/g, "");
  if (!secret) return null;
  const label = decodeURIComponent(m[1] ?? "");
  const account = label.includes(":") ? label.split(":").pop()?.trim() : label.trim();
  const algoRaw = (params.get("algorithm") ?? "").toUpperCase().replace("-", "");
  const algo = ALGOS.find((a) => a.replace("-", "") === algoRaw);
  const digitsRaw = Number(params.get("digits"));
  const periodRaw = Number(params.get("period"));
  return {
    secret,
    digits: digitsRaw === 6 || digitsRaw === 8 ? digitsRaw : undefined,
    period: periodRaw === 30 || periodRaw === 60 ? periodRaw : undefined,
    algo,
    account: account || undefined,
  };
}
