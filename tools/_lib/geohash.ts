/**
 * CN-030:Geohash 编解码(纯 TS,零依赖)。
 * 算法:经纬度交替二分(先经后纬)+ Base32("0123456789bcdefghjkmnpqrstuvwxyz",无 a/i/l/o)。
 * 解码返回区间中心与误差范围(精度即误差界的直接函数)。
 * 锚 = pygeohash(独立 Python 实现)生成的向量 + Wikipedia 经典示例 ezs42/u4pruydqqvj。
 */

const BASE32 = "0123456789bcdefghjkmnpqrstuvwxyz";
export const GEOHASH_MIN = 1;
export const GEOHASH_MAX = 12;

export type GeohashResult =
  | { ok: true; geohash: string; center: { lat: number; lng: number }; error: { lat: number; lng: number } }
  | { ok: false; code: "empty" | "badPrecision" | "badRange" | "badGeohash" | "tooLong"; message?: string };

/** 编码:lat/lng → geohash(precision 1–12)。 */
export function geohashEncode(lat: number, lng: number, precision: number): GeohashResult {
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return { ok: false, code: "badRange" };
  if (!Number.isInteger(precision) || precision < GEOHASH_MIN || precision > GEOHASH_MAX) {
    return { ok: false, code: "badPrecision" };
  }
  if (lat < -90 || lat > 90 || lng < -180 || lng > 180) return { ok: false, code: "badRange" };

  let latMin = -90;
  let latMax = 90;
  let lngMin = -180;
  let lngMax = 180;
  let hash = "";
  let bits = 0;
  let bitCount = 0;
  let even = true; // 先经度

  while (hash.length < precision) {
    if (even) {
      const mid = (lngMin + lngMax) / 2;
      if (lng >= mid) {
        bits = (bits << 1) | 1;
        lngMin = mid;
      } else {
        bits = bits << 1;
        lngMax = mid;
      }
    } else {
      const mid = (latMin + latMax) / 2;
      if (lat >= mid) {
        bits = (bits << 1) | 1;
        latMin = mid;
      } else {
        bits = bits << 1;
        latMax = mid;
      }
    }
    even = !even;
    bitCount++;
    if (bitCount === 5) {
      hash += BASE32[bits];
      bits = 0;
      bitCount = 0;
    }
  }
  const decoded = geohashDecode(hash);
  if (!decoded.ok) return { ok: false, code: "badGeohash" };
  return { ok: true, geohash: hash, center: decoded.center, error: decoded.error };
}

/** 解码:geohash → 中心点与误差范围。 */
export function geohashDecode(hash: string): GeohashResult {
  const h = hash.trim().toLowerCase();
  if (h === "") return { ok: false, code: "empty" };
  if (h.length > GEOHASH_MAX) return { ok: false, code: "tooLong" };
  for (const ch of h) {
    if (!BASE32.includes(ch)) return { ok: false, code: "badGeohash", message: ch };
  }

  let latMin = -90;
  let latMax = 90;
  let lngMin = -180;
  let lngMax = 180;
  let even = true;

  for (const ch of h) {
    const idx = BASE32.indexOf(ch);
    for (let bit = 4; bit >= 0; bit--) {
      const bitVal = (idx >> bit) & 1;
      if (even) {
        const mid = (lngMin + lngMax) / 2;
        if (bitVal === 1) lngMin = mid;
        else lngMax = mid;
      } else {
        const mid = (latMin + latMax) / 2;
        if (bitVal === 1) latMin = mid;
        else latMax = mid;
      }
      even = !even;
    }
  }
  const center = { lat: (latMin + latMax) / 2, lng: (lngMin + lngMax) / 2 };
  const error = { lat: (latMax - latMin) / 2, lng: (lngMax - lngMin) / 2 };
  return { ok: true, geohash: h, center, error };
}
