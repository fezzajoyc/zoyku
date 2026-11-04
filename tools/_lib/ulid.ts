/**
 * ULID 实现(规范:https://github.com/ulid/spec)
 * - 48 bit 毫秒时间戳 + 80 bit 随机数,Crockford Base32,共 26 字符。
 * - 字母表:0123456789ABCDEFGHJKMNPQRSTVWXYZ(不含 I、L、O、U)。
 * - 时间戳部分左填充到 10 字符;随机部分 16 字符。
 * 使用 crypto.getRandomValues(浏览器与 Node 18+ 均可用)。
 */

const ENCODING = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
const TIME_LEN = 10;
const RANDOM_LEN = 16;
export const ULID_LENGTH = TIME_LEN + RANDOM_LEN;

function randomBytes(n: number): Uint8Array {
  const buf = new Uint8Array(n);
  crypto.getRandomValues(buf);
  return buf;
}

/** 毫秒时间戳 → 10 字符 Crockford Base32(左填充,含首字符为 0~7 的溢出位) */
export function encodeTime(now: number): string {
  let out = "";
  for (let i = 0; i < TIME_LEN; i++) {
    out = ENCODING[now % 32] + out;
    now = Math.floor(now / 32);
  }
  if (now > 0) throw new Error("timestamp too large for ULID");
  return out;
}

/** 80 bit 随机数 → 16 字符 Crockford Base32 */
export function encodeRandom(bytes?: Uint8Array): string {
  const b = bytes ?? randomBytes(10);
  if (b.length !== 10) throw new Error("ULID randomness needs exactly 10 bytes");
  let out = "";
  for (let i = 0; i < RANDOM_LEN; i++) {
    out += ENCODING[b[Math.floor(i / 8)] >>> (5 - (i % 8)) & 31];
  }
  return out;
}

/** 生成一个 26 字符 ULID。time 默认当前毫秒时间戳。 */
export function generateUlid(time: number = Date.now()): string {
  if (!Number.isInteger(time) || time < 0) throw new Error("invalid ULID timestamp");
  return encodeTime(time) + encodeRandom();
}

/** Crockford Base32 解码(I/L→1,O→0,U 越界报错) */
export function decodeBase32Crockford(s: string): number {
  let n = 0;
  for (const ch of s.toUpperCase()) {
    if (ch === "I" || ch === "L") { n = n * 32 + 1; continue; }
    if (ch === "O") { n = n * 32 + 0; continue; }
    const i = ENCODING.indexOf(ch);
    if (i < 0) throw new Error(`invalid ULID character: ${ch}`);
    n = n * 32 + i;
  }
  return n;
}

/** 解析 ULID:返回毫秒时间戳、ISO 日期与随机部分是否合法。 */
export function parseUlid(ulid: string): { ok: true; timestamp: number; iso: string } | { ok: false; error: string } {
  const s = ulid.trim().toUpperCase();
  if (s.length !== ULID_LENGTH) return { ok: false, error: `ULID must be ${ULID_LENGTH} characters` };
  try {
    const t = decodeBase32Crockford(s.slice(0, TIME_LEN));
    const date = new Date(t);
    return { ok: true, timestamp: t, iso: date.toISOString() };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}
