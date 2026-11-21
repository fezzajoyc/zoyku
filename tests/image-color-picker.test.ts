import { describe, expect, it } from "vitest";
import {
  IMAGE_COLOR_PICKER_LIMITS,
  formatPixelColor,
  mapPointerToPixel,
  sampleRgbaPixel,
} from "@/tools/_lib/image-color-picker";

describe("image pixel color sampler", () => {
  it("maps rendered coordinates to the nearest source pixel without leaving bounds", () => {
    expect(mapPointerToPixel({ clientX: 10, clientY: 20 }, { left: 10, top: 20, width: 200, height: 100 }, 400, 200)).toEqual({ x: 0, y: 0 });
    expect(mapPointerToPixel({ clientX: 110.25, clientY: 45.75 }, { left: 10, top: 20, width: 200, height: 100 }, 400, 200)).toEqual({ x: 200, y: 51 });
    expect(mapPointerToPixel({ clientX: 209.9, clientY: 119.9 }, { left: 10, top: 20, width: 200, height: 100 }, 400, 200)).toEqual({ x: 399, y: 199 });
    expect(mapPointerToPixel({ clientX: 500, clientY: -1 }, { left: 10, top: 20, width: 200, height: 100 }, 400, 200)).toBeNull();
    expect(mapPointerToPixel({ clientX: 210, clientY: 120 }, { left: 10, top: 20, width: 200, height: 100 }, 400, 200)).toBeNull();
    expect(mapPointerToPixel({ clientX: 10, clientY: 20 }, { left: 10, top: 20, width: 0, height: 100 }, 400, 200)).toBeNull();
    expect(mapPointerToPixel({ clientX: Number.NaN, clientY: 20 }, { left: 10, top: 20, width: 200, height: 100 }, 400, 200)).toBeNull();
  });

  it("samples opaque, translucent and transparent pixels with all output formats", () => {
    const rgba = new Uint8ClampedArray([255, 0, 16, 255, 20, 40, 60, 128, 0, 0, 0, 0, 1, 2, 3, 4]);
    expect(formatPixelColor(sampleRgbaPixel(rgba, 2, 2, 0, 0))).toEqual({
      x: 0, y: 0, r: 255, g: 0, b: 16, a: 255, hex: "#FF0010", hex8: "#FF0010FF", rgb: "rgb(255, 0, 16)", rgba: "rgba(255, 0, 16, 1)",
    });
    expect(formatPixelColor(sampleRgbaPixel(rgba, 2, 2, 1, 0)).hex8).toBe("#14283C80");
    expect(formatPixelColor(sampleRgbaPixel(rgba, 2, 2, 1, 0)).rgba).toBe("rgba(20, 40, 60, 0.50196)");
    expect(formatPixelColor(sampleRgbaPixel(rgba, 2, 2, 0, 1)).rgba).toBe("rgba(0, 0, 0, 0)");
    expect(formatPixelColor({ x: 0, y: 0, r: 1, g: 2, b: 3, a: 1 })).toMatchObject({ hex8: "#01020301", rgba: "rgba(1, 2, 3, 0.00392)" });
  });

  it("rejects invalid buffers, coordinates and dimensions", () => {
    const rgba = new Uint8ClampedArray(4);
    expect(() => sampleRgbaPixel(rgba, 0, 1, 0, 0)).toThrow("dimensions");
    expect(() => sampleRgbaPixel(rgba, 1, 1, 1, 0)).toThrow("outside");
    expect(() => sampleRgbaPixel(new Uint8ClampedArray(3), 1, 1, 0, 0)).toThrow("RGBA");
    expect(() => formatPixelColor({ x: 0, y: 0, r: 256, g: 0, b: 0, a: 255 })).toThrow("channel");
    expect(() => formatPixelColor({ x: -1, y: 0, r: 0, g: 0, b: 0, a: 255 })).toThrow("coordinates");
    expect(IMAGE_COLOR_PICKER_LIMITS.maxFileBytes).toBe(25 * 1024 * 1024);
    expect(IMAGE_COLOR_PICKER_LIMITS.maxPixels).toBe(40_000_000);
    expect(IMAGE_COLOR_PICKER_LIMITS.maxSide).toBe(16_384);
  });
});
