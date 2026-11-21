/**
 * WebCrypto 没有的两个摘要(G02):SHA-224(SHA-256 变体)与 RIPEMD-160,纯 JS。
 * 锚:node:crypto 原生支持 sha224/ripemd160,测试全长度独立交叉核对。
 * 输出统一为字节,摘要编码(hex/base64/binary)由引擎层选择。
 */

// ─────────────────────────── SHA-256/SHA-224 ───────────────────────────

const SHA256_K = [
  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
  0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
  0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
  0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
  0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
  0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
  0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
  0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
];

const SHA256_H256 = [0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19];
const SHA256_H224 = [0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939, 0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4];

function sha256Core(input: Uint8Array, iv: number[], outBytes: number): Uint8Array<ArrayBuffer> {
  const len = input.length;
  const bitLenHi = Math.floor(len / 0x20000000) | 0;
  const bitLenLo = (len << 3) >>> 0;
  const paddedLen = Math.floor((len + 8) / 64) * 64 + 64;
  const buf = new Uint8Array(paddedLen);
  buf.set(input);
  buf[len] = 0x80;
  const dv = new DataView(buf.buffer);
  // FIPS 180:64 位位长按大端追加,高 32 位在前(w[14]=高位,w[15]=低位)
  dv.setUint32(paddedLen - 8, bitLenHi, false);
  dv.setUint32(paddedLen - 4, bitLenLo, false);

  const h = iv.slice();
  const w = new Uint32Array(64);
  for (let chunk = 0; chunk < paddedLen; chunk += 64) {
    for (let i = 0; i < 16; i++) w[i] = dv.getUint32(chunk + i * 4, false);
    for (let i = 16; i < 64; i++) {
      const s0 = ((w[i - 15] >>> 7) | (w[i - 15] << 25)) ^ ((w[i - 15] >>> 18) | (w[i - 15] << 14)) ^ (w[i - 15] >>> 3);
      const s1 = ((w[i - 2] >>> 17) | (w[i - 2] << 15)) ^ ((w[i - 2] >>> 19) | (w[i - 2] << 13)) ^ (w[i - 2] >>> 10);
      w[i] = (w[i - 16] + s0 + w[i - 7] + s1) | 0;
    }
    let [a, b, c, d, e, f, g, hh] = h;
    for (let i = 0; i < 64; i++) {
      const S1 = ((e >>> 6) | (e << 26)) ^ ((e >>> 11) | (e << 21)) ^ ((e >>> 25) | (e << 7));
      const ch = (e & f) ^ (~e & g);
      const t1 = (hh + S1 + ch + SHA256_K[i] + w[i]) | 0;
      const S0 = ((a >>> 2) | (a << 30)) ^ ((a >>> 13) | (a << 19)) ^ ((a >>> 22) | (a << 10));
      const maj = (a & b) ^ (a & c) ^ (b & c);
      const t2 = (S0 + maj) | 0;
      hh = g;
      g = f;
      f = e;
      e = (d + t1) | 0;
      d = c;
      c = b;
      b = a;
      a = (t1 + t2) | 0;
    }
    h[0] = (h[0] + a) | 0;
    h[1] = (h[1] + b) | 0;
    h[2] = (h[2] + c) | 0;
    h[3] = (h[3] + d) | 0;
    h[4] = (h[4] + e) | 0;
    h[5] = (h[5] + f) | 0;
    h[6] = (h[6] + g) | 0;
    h[7] = (h[7] + hh) | 0;
  }
  const out = new Uint8Array(outBytes);
  const odv = new DataView(out.buffer);
  for (let i = 0; i < outBytes / 4; i++) odv.setUint32(i * 4, h[i], false);
  return out;
}

export function sha224Bytes(input: Uint8Array): Uint8Array<ArrayBuffer> {
  return sha256Core(input, SHA256_H224, 28);
}

export function sha256Bytes(input: Uint8Array): Uint8Array<ArrayBuffer> {
  return sha256Core(input, SHA256_H256, 32);
}

// ─────────────────────────── RIPEMD-160 ───────────────────────────
// 表与 f 函数按 Bosselaers 官方实现(ripemd160 npm 参考实现逐字核对)。

const RMD_ZL = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
  7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8,
  3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12,
  1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2,
  4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13,
];
const RMD_ZR = [
  5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12,
  6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2,
  15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13,
  8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14,
  12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11,
];
const RMD_SL = [
  11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8,
  7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12,
  11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5,
  11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12,
  9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6,
];
const RMD_SR = [
  8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6,
  9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11,
  9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5,
  15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8,
  8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11,
];
const RMD_HL = [0x00000000, 0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xa953fd4e];
const RMD_HR = [0x50a28be6, 0x5c4dd124, 0x6d703ef3, 0x7a6d76e9, 0x00000000];

function rmdRotl(x: number, n: number): number {
  return ((x << n) | (x >>> (32 - n))) | 0;
}
// 布尔函数以当前线的 (b,c,d) 为准;a/m/k/s 在包装器里合并
function rmdFn1(a: number, b: number, c: number, d: number, e: number, m: number, k: number, s: number): number {
  return (rmdRotl((a + (b ^ c ^ d) + m + k) | 0, s) + e) | 0;
}
function rmdFn2(a: number, b: number, c: number, d: number, e: number, m: number, k: number, s: number): number {
  return (rmdRotl((a + ((b & c) | (~b & d)) + m + k) | 0, s) + e) | 0;
}
function rmdFn3(a: number, b: number, c: number, d: number, e: number, m: number, k: number, s: number): number {
  return (rmdRotl((a + ((b | ~c) ^ d) + m + k) | 0, s) + e) | 0;
}
function rmdFn4(a: number, b: number, c: number, d: number, e: number, m: number, k: number, s: number): number {
  return (rmdRotl((a + ((b & d) | (c & ~d)) + m + k) | 0, s) + e) | 0;
}
function rmdFn5(a: number, b: number, c: number, d: number, e: number, m: number, k: number, s: number): number {
  return (rmdRotl((a + (b ^ (c | ~d)) + m + k) | 0, s) + e) | 0;
}

export function ripemd160Bytes(input: Uint8Array): Uint8Array<ArrayBuffer> {
  const len = input.length;
  const bitLenLo = (len << 3) >>> 0;
  const bitLenHi = Math.floor(len / 0x20000000) | 0;
  // RIPEMD-160 padding 与 MD4 族相同(小端位长)
  const paddedLen = Math.floor((len + 8) / 64) * 64 + 64;
  const buf = new Uint8Array(paddedLen);
  buf.set(input);
  buf[len] = 0x80;
  const dv = new DataView(buf.buffer);
  dv.setUint32(paddedLen - 8, bitLenLo, true);
  dv.setUint32(paddedLen - 4, bitLenHi, true);

  let a = 0x67452301 | 0;
  let b = 0xefcdab89 | 0;
  let c = 0x98badcfe | 0;
  let d = 0x10325476 | 0;
  let e = 0xc3d2e1f0 | 0;

  const x = new Int32Array(16);
  for (let chunk = 0; chunk < paddedLen; chunk += 64) {
    for (let i = 0; i < 16; i++) x[i] = dv.getInt32(chunk + i * 4, true);
    let al = a;
    let bl = b;
    let cl = c;
    let dl = d;
    let el = e;
    let ar = a;
    let br = b;
    let cr = c;
    let dr = d;
    let er = e;
    for (let j = 0; j < 80; j++) {
      if (j < 16) {
        al = rmdFn1(al, bl, cl, dl, el, x[RMD_ZL[j]], RMD_HL[0], RMD_SL[j]);
        ar = rmdFn5(ar, br, cr, dr, er, x[RMD_ZR[j]], RMD_HR[0], RMD_SR[j]);
      } else if (j < 32) {
        al = rmdFn2(al, bl, cl, dl, el, x[RMD_ZL[j]], RMD_HL[1], RMD_SL[j]);
        ar = rmdFn4(ar, br, cr, dr, er, x[RMD_ZR[j]], RMD_HR[1], RMD_SR[j]);
      } else if (j < 48) {
        al = rmdFn3(al, bl, cl, dl, el, x[RMD_ZL[j]], RMD_HL[2], RMD_SL[j]);
        ar = rmdFn3(ar, br, cr, dr, er, x[RMD_ZR[j]], RMD_HR[2], RMD_SR[j]);
      } else if (j < 64) {
        al = rmdFn4(al, bl, cl, dl, el, x[RMD_ZL[j]], RMD_HL[3], RMD_SL[j]);
        ar = rmdFn2(ar, br, cr, dr, er, x[RMD_ZR[j]], RMD_HR[3], RMD_SR[j]);
      } else {
        al = rmdFn5(al, bl, cl, dl, el, x[RMD_ZL[j]], RMD_HL[4], RMD_SL[j]);
        ar = rmdFn1(ar, br, cr, dr, er, x[RMD_ZR[j]], RMD_HR[4], RMD_SR[j]);
      }
      const tl = al;
      al = el;
      el = dl;
      dl = rmdRotl(cl, 10);
      cl = bl;
      bl = tl;
      const tr = ar;
      ar = er;
      er = dr;
      dr = rmdRotl(cr, 10);
      cr = br;
      br = tr;
    }
    // 组合两线
    const t = (b + cl + dr) | 0;
    b = (c + dl + er) | 0;
    c = (d + el + ar) | 0;
    d = (e + al + br) | 0;
    e = (a + bl + cr) | 0;
    a = t;
  }

  const out = new Uint8Array(20);
  const odv = new DataView(out.buffer);
  odv.setInt32(0, a, true);
  odv.setInt32(4, b, true);
  odv.setInt32(8, c, true);
  odv.setInt32(12, d, true);
  odv.setInt32(16, e, true);
  return out;
}

// ─────────────────────────── 摘要输出编码 ───────────────────────────

export type DigestEncoding = "hex" | "base64" | "base64url" | "binary";

export function encodeDigest(bytes: Uint8Array, encoding: DigestEncoding): string {
  switch (encoding) {
    case "hex":
      return [...bytes].map((b) => b.toString(16).padStart(2, "0")).join("");
    case "base64": {
      let bin = "";
      for (const b of bytes) bin += String.fromCharCode(b);
      return btoa(bin);
    }
    case "base64url":
      return encodeDigest(bytes, "base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    case "binary":
      return [...bytes].map((b) => b.toString(2).padStart(8, "0")).join("");
  }
}
