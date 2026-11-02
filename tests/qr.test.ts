import { describe, expect, it } from "vitest";
import QRCode from "qrcode";
import jsQR from "jsqr";

const SCALE = 4; // px per module
const QUIET = 4; // quiet-zone modules per side (QR spec minimum)

/**
 * 渲染为 RGBA 位图:白底 + 黑色模块。
 *
 * 为什么必须留白边(quiet zone):ISO/IEC 18004 规定符号四周要有 ≥4 模块宽的浅色留白。
 * jsQR 的定位算法靠扫描 1:1:3:1:1 的 finder pattern 来确定符号位置与透视,
 * 需要 finder 周围有浅色模块做边界;紧贴图像边缘的深色模块会让定位失败,
 * 通常直接返回 null。scale 4 px/module + 4 模块留白是可靠的解码配置。
 */
function renderRgba(text: string): { data: Uint8ClampedArray; size: number; modules: number } {
  const qr = QRCode.create(text, { errorCorrectionLevel: "M" });
  const n = qr.modules.size;
  const dim = (n + QUIET * 2) * SCALE;
  const data = new Uint8ClampedArray(dim * dim * 4).fill(255); // opaque white = quiet zone
  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
      if (!qr.modules.get(row, col)) continue;
      for (let dy = 0; dy < SCALE; dy++) {
        for (let dx = 0; dx < SCALE; dx++) {
          const idx = (((row + QUIET) * SCALE + dy) * dim + (col + QUIET) * SCALE + dx) * 4;
          data[idx] = 0;
          data[idx + 1] = 0;
          data[idx + 2] = 0;
          data[idx + 3] = 255;
        }
      }
    }
  }
  return { data, size: dim, modules: n };
}

function decode(text: string): string {
  const { data, size } = renderRgba(text);
  const found = jsQR(data, size, size);
  expect(found, `jsQR failed to decode: ${JSON.stringify(text.slice(0, 40))}`).not.toBeNull();
  return found!.data;
}

describe("QR generate → decode roundtrip (qrcode → jsQR)", () => {
  it("roundtrips short ASCII text", () => {
    expect(decode("Hello, Zoyku!")).toBe("Hello, Zoyku!");
  });

  it("roundtrips the URL https://zoyku.com/scan-test-2026", () => {
    expect(decode("https://zoyku.com/scan-test-2026")).toBe(
      "https://zoyku.com/scan-test-2026",
    );
  });

  it("roundtrips Unicode content (UTF-8 byte mode): CJK, accents, emoji", () => {
    const text = "工具酿造 Zoyku ✓ — café 東京 🍺";
    expect(decode(text)).toBe(text);
  });

  it("roundtrips a single character (smallest possible symbol, numeric mode)", () => {
    expect(decode("1")).toBe("1");
  });

  it("roundtrips alphanumeric-mode content", () => {
    expect(decode("ZOYKU 2026 SCAN")).toBe("ZOYKU 2026 SCAN");
  });

  it("roundtrips a ~990-char payload spanning a high version number", () => {
    const text = "zoyku-qr-roundtrip-".repeat(45); // 990 bytes, byte mode
    expect(decode(text)).toBe(text);
  });

  it("renders the symbol with a 4-module quiet zone on every side", () => {
    const { size, modules } = renderRgba("quiet zone");
    expect(size).toBe((modules + 2 * QUIET) * SCALE);
    expect(modules).toBeGreaterThanOrEqual(21); // version 1 = 21×21 modules
  });

  it("returns null for a blank white image instead of a phantom decode", () => {
    const dim = 200;
    const blank = new Uint8ClampedArray(dim * dim * 4).fill(255);
    expect(jsQR(blank, dim, dim)).toBeNull();
  });
});
