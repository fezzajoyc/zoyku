/**
 * UUID 版本家族纯逻辑(G16):RFC 9562 的 NIL / v1 / v3 / v4 / v5 / v7。
 *
 * - v4 沿用 crypto.randomUUID(引擎内已有)。
 * - v1:60 位 Gregorian 时间戳(1582-10-15 起,100ns)+ 随机时钟序列 + 随机多播节点
 *   (RFC 9562 §4.5 隐私建议:无真实 MAC 时节点字节置多播位)。带同毫秒单调递增计数。
 * - v3:MD5(命名空间字节 ‖ 名字字节);v5:SHA-1 同构(v5 用 WebCrypto)。
 * - v7:48 位 Unix 毫秒 + 随机位,时间有序。
 * - 命名空间输入必须是规范连字符 UUID,否则结构化报错,绝不静默修复。
 *
 * 测试锚:RFC 4122/9562 公开向量 + node:crypto 独立交叉核对 MD5/SHA-1 路径。
 */

export type UuidNamespaceError = { ok: false; code: "badNamespace" | "emptyName" };
export type UuidNamespaceOk = { ok: true; uuid: string };
export type UuidNamespaceResult = UuidNamespaceOk | UuidNamespaceError;

/** RFC 9562 §5.5 预定义命名空间(规范文本形式)。 */
export const UUID_NAMESPACES: Record<string, string> = {
  DNS: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
  URL: "6ba7b811-9dad-11d1-80b4-00c04fd430c8",
  OID: "6ba7b812-9dad-11d1-80b4-00c04fd430c8",
  X500: "6ba7b814-9dad-11d1-80b4-00c04fd430c8",
};

const CANONICAL_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

export const UUID_NIL = "00000000-0000-0000-0000-000000000000";

/** 规范 UUID 文本 → 16 字节;不合法返回 null(不做宽松修复,诚实拒绝)。 */
export function uuidToBytes(canonical: string): Uint8Array | null {
  const s = canonical.toLowerCase().trim();
  if (!CANONICAL_RE.test(s)) return null;
  const hex = s.replaceAll("-", "");
  const out = new Uint8Array(16);
  for (let i = 0; i < 16; i++) out[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  return out;
}

function bytesToUuid(b: Uint8Array): string {
  const h = [...b].map((x) => x.toString(16).padStart(2, "0")).join("");
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
}

/** 置版本号位(第 7 字节高半)与 RFC 变体位(第 9 字节高两位 = 10)。 */
function setVersionAndVariant(b: Uint8Array, version: number): Uint8Array {
  b[6] = (b[6] & 0x0f) | (version << 4);
  b[8] = (b[8] & 0x3f) | 0x80;
  return b;
}

// ---------------------------------------------------------------------------
// MD5(纯 JS;tests 用 node:crypto 全输入交叉核对)
// ---------------------------------------------------------------------------

const MD5_S = [
  7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22,
  5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20,
  4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23,
  6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21,
];
const MD5_K = Array.from({ length: 64 }, (_, i) => Math.floor(Math.abs(Math.sin(i + 1)) * 2 ** 32));

export function md5Bytes(input: Uint8Array): Uint8Array {
  const len = input.length;
  const bitLenHi = Math.floor(len / 0x20000000) | 0;
  const bitLenLo = (len << 3) >>> 0;
  // padding:补 0x80 与零,使总长 ≡ 56 (mod 64),尾部 8 字节小端位长
  const paddedLen = Math.floor((len + 8) / 64) * 64 + 64;
  const buf = new Uint8Array(paddedLen);
  buf.set(input);
  buf[len] = 0x80;
  const dv = new DataView(buf.buffer);
  dv.setUint32(paddedLen - 8, bitLenLo, true);
  dv.setUint32(paddedLen - 4, bitLenHi, true);

  let a0 = 0x67452301 | 0;
  let b0 = 0xefcdab89 | 0;
  let c0 = 0x98badcfe | 0;
  let d0 = 0x10325476 | 0;

  const m = new Int32Array(16);
  for (let chunk = 0; chunk < paddedLen; chunk += 64) {
    for (let i = 0; i < 16; i++) m[i] = dv.getInt32(chunk + i * 4, true);
    let a = a0;
    let b = b0;
    let c = c0;
    let d = d0;
    for (let i = 0; i < 64; i++) {
      let f: number;
      let g: number;
      if (i < 16) {
        f = (b & c) | (~b & d);
        g = i;
      } else if (i < 32) {
        f = (d & b) | (~d & c);
        g = (5 * i + 1) % 16;
      } else if (i < 48) {
        f = b ^ c ^ d;
        g = (3 * i + 5) % 16;
      } else {
        f = c ^ (b | ~d);
        g = (7 * i) % 16;
      }
      const tmp = d;
      d = c;
      c = b;
      const sum = (a + f + MD5_K[i] + m[g]) | 0;
      const s = MD5_S[i];
      const rotated = (sum << s) | (sum >>> (32 - s));
      b = (b + rotated) | 0;
      a = tmp;
    }
    a0 = (a0 + a) | 0;
    b0 = (b0 + b) | 0;
    c0 = (c0 + c) | 0;
    d0 = (d0 + d) | 0;
  }

  const out = new Uint8Array(16);
  const odv = new DataView(out.buffer);
  odv.setInt32(0, a0, true);
  odv.setInt32(4, b0, true);
  odv.setInt32(8, c0, true);
  odv.setInt32(12, d0, true);
  return out;
}

// ---------------------------------------------------------------------------
// v1:Gregorian 时间戳 + 随机节点/时钟序列(带同毫秒单调守卫)
// ---------------------------------------------------------------------------

/** 1582-10-15 与 1970-01-01 之间相差的 100ns tick 数(RFC 9562 §4.1)。 */
const G1582_OFFSET_TICKS = 122192928000000000n;

let v1LastTicks = 0n;
let v1LastMs = 0;

function gregorianTicks(nowMs: number): bigint {
  // 同毫秒内单调递增;时钟回拨也保证不重复不倒退
  if (nowMs === v1LastMs) {
    v1LastTicks += 1n;
    return v1LastTicks;
  }
  const ticks = BigInt(nowMs) * 10000n + G1582_OFFSET_TICKS;
  if (ticks <= v1LastTicks) {
    v1LastTicks += 1n;
    v1LastMs = nowMs;
    return v1LastTicks;
  }
  v1LastTicks = ticks;
  v1LastMs = nowMs;
  return ticks;
}

export function uuidV1(nowMs = Date.now()): string {
  const ticks = gregorianTicks(nowMs) & ((1n << 60n) - 1n);
  const rnd = crypto.getRandomValues(new Uint8Array(8)); // [0..1]=clock_seq,[2..7]=node
  const b = new Uint8Array(16);
  const dv = new DataView(b.buffer);
  dv.setUint32(0, Number(ticks & 0xffffffffn), false); // time_low,BE
  dv.setUint16(4, Number((ticks >> 32n) & 0xffffn), false); // time_mid,BE
  const hi = Number((ticks >> 48n) & 0xfffn); // time_hi,12 bits
  b[6] = 0x10 | (hi >> 8); // version 1 + time_hi 高 4 位
  b[7] = hi & 0xff; // time_hi 低 8 位
  const seq = ((rnd[0] << 8) | rnd[1]) & 0x3fff; // 14 位时钟序列
  b[8] = 0x80 | (seq >> 8); // 变体 10 + 序列高 6 位
  b[9] = seq & 0xff;
  b.set(rnd.slice(2, 8), 10);
  b[10] = (b[10] & 0x3f) | 0x80 | 0x01; // 随机节点:多播位(RFC 隐私),非真实 MAC
  return bytesToUuid(b);
}

// ---------------------------------------------------------------------------
// v7:48 位 Unix 毫秒 + 随机位(RFC 9562 §5.7)
// ---------------------------------------------------------------------------

export function uuidV7(nowMs = Date.now()): string {
  const b = crypto.getRandomValues(new Uint8Array(16));
  let ms = BigInt(Math.max(0, nowMs));
  for (let i = 5; i >= 0; i--) {
    b[i] = Number(ms & 0xffn);
    ms >>= 8n;
  }
  setVersionAndVariant(b, 7);
  return bytesToUuid(b);
}

// ---------------------------------------------------------------------------
// v3 / v5:命名空间 + 名字
// ---------------------------------------------------------------------------

async function sha1First16(input: Uint8Array): Promise<Uint8Array> {
  // 拷贝到独立 ArrayBuffer(满足 DOM BufferSource 类型,且隔离调用方缓冲)
  const copy = new Uint8Array(input.byteLength);
  copy.set(input);
  const digest = await crypto.subtle.digest("SHA-1", copy);
  return new Uint8Array(digest.slice(0, 16));
}

/** 合并命名空间字节与名字字节(UTF-8),校验在调用方。 */
function mergedBytes(namespace: string, name: string): Uint8Array | null {
  const ns = uuidToBytes(namespace);
  if (!ns) return null;
  if (name === "") return null;
  const nameBytes = new TextEncoder().encode(name);
  const merged = new Uint8Array(16 + nameBytes.length);
  merged.set(ns);
  merged.set(nameBytes, 16);
  return merged;
}

export function uuidV3(namespace: string, name: string): UuidNamespaceResult {
  const merged = mergedBytes(namespace, name);
  if (!merged) {
    return uuidToBytes(namespace)
      ? { ok: false, code: "emptyName" }
      : { ok: false, code: "badNamespace" };
  }
  const digest = md5Bytes(merged);
  setVersionAndVariant(digest, 3);
  return { ok: true, uuid: bytesToUuid(digest) };
}

export async function uuidV5(namespace: string, name: string): Promise<UuidNamespaceResult> {
  const merged = mergedBytes(namespace, name);
  if (!merged) {
    return uuidToBytes(namespace)
      ? { ok: false, code: "emptyName" }
      : { ok: false, code: "badNamespace" };
  }
  const digest = await sha1First16(merged);
  setVersionAndVariant(digest, 5);
  return { ok: true, uuid: bytesToUuid(digest) };
}
