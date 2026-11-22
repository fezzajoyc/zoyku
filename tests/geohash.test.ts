import { describe, expect, it } from "vitest";
import { geohashDecode, geohashEncode } from "@/tools/_lib/geohash";

/**
 * CN-030 Geohash。锚 = pygeohash(独立 Python 实现)生成 + Wikipedia 经典示例双确认:
 * ezs42 = (42.605, -5.603) 的 5 字符编码;u4pruydqqvj = (57.64911, 10.40744) 的 11 字符编码。
 */

describe("编码(pygeohash 锚)", () => {
  it("经典示例:(42.605, -5.603) @5 → ezs42", () => {
    const r = geohashEncode(42.605, -5.603, 5);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.geohash).toBe("ezs42");
  });

  it("11 字符示例:(57.64911, 10.40744) @11 → u4pruydqqvj", () => {
    const r = geohashEncode(57.64911, 10.40744, 11);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.geohash).toBe("u4pruydqqvj");
  });

  it("城市锚:上海 wtw3sj / 北京 wx4g0b / 东京 xn76cy @6", () => {
    expect(geohashEncode(31.2304, 121.4737, 6).ok ? (geohashEncode(31.2304, 121.4737, 6) as { geohash: string }).geohash : "").toBe("wtw3sj");
    expect(geohashEncode(39.9042, 116.4074, 6).ok ? (geohashEncode(39.9042, 116.4074, 6) as { geohash: string }).geohash : "").toBe("wx4g0b");
    expect(geohashEncode(35.6762, 139.6503, 6).ok ? (geohashEncode(35.6762, 139.6503, 6) as { geohash: string }).geohash : "").toBe("xn76cy");
  });

  it("解码中心点落在编码误差范围内(自洽)", () => {
    const r = geohashEncode(42.605, -5.603, 5);
    if (!r.ok) throw new Error("encode failed");
    expect(Math.abs(r.center.lat - 42.605)).toBeLessThanOrEqual(r.error.lat + 1e-9);
    expect(Math.abs(r.center.lng - -5.603)).toBeLessThanOrEqual(r.error.lng + 1e-9);
  });
});

describe("解码(pygeohash 锚)", () => {
  it("ezs42 → 中心 (42.60498046875, -5.60302734375)", () => {
    const r = geohashDecode("ezs42");
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.center.lat).toBe(42.60498046875);
    expect(r.center.lng).toBe(-5.60302734375);
  });

  it("大写输入归一化", () => {
    const lower = geohashDecode("ezs42");
    const upper = geohashDecode("EZS42");
    expect(upper.ok).toBe(true);
    if (!upper.ok || !lower.ok) return;
    expect(upper.center.lat).toBe(lower.center.lat);
    expect(upper.center.lng).toBe(lower.center.lng);
  });

  it("非法字符(a/i/l/o 不在字母表)拒绝", () => {
    expect(geohashDecode("ezai42").ok).toBe(false);
    expect(geohashDecode("ezs4o").ok).toBe(false);
  });

  it("空输入拒绝", () => {
    expect(geohashDecode("").ok).toBe(false);
  });
});

describe("拒绝路径与往返", () => {
  it("精度越界(0/13/非整数)拒绝", () => {
    expect(geohashEncode(31, 121, 0).ok).toBe(false);
    expect(geohashEncode(31, 121, 13).ok).toBe(false);
    expect(geohashEncode(31, 121, 5.5).ok).toBe(false);
  });

  it("经纬度越界拒绝(>90 / >180)", () => {
    expect(geohashEncode(91, 0, 5).ok).toBe(false);
    expect(geohashEncode(0, 181, 5).ok).toBe(false);
  });

  it("往返:解码→再编码 = 原串", () => {
    for (const h of ["ezs42", "wtw3sj", "wx4g0b", "u4pruydqqvj"]) {
      const d = geohashDecode(h);
      if (!d.ok) throw new Error("decode failed " + h);
      const e = geohashEncode(d.center.lat, d.center.lng, h.length);
      expect(e.ok).toBe(true);
      if (!e.ok) continue;
      // 往返可能落到相邻格(中心点重编码应落在原格或其邻居)——用中心点重编码必须同串
      expect(e.geohash).toBe(h);
    }
  });
});
