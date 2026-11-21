import { describe, expect, it } from "vitest";
import { IMAGE_WATERMARK_LIMITS, planImageWatermark, watermarkDimensionsAllowed, type ImageWatermarkOptions } from "@/tools/_lib/image-watermark";

const base: ImageWatermarkOptions = { width: 200, height: 100, markWidth: 40, markHeight: 20, relativeWidth: 25, rotation: 0, margin: 5, position: "br", tile: false };
describe("image watermark geometry", () => {
  it("scales relative to source width, preserving mark ratio and short-edge margin", () => {
    const result = planImageWatermark(base); expect(result.error).toBeNull();
    expect(result.plan).toMatchObject({ markWidth: 50, markHeight: 25, boundsWidth: 50, boundsHeight: 25, margin: 5, placements: [{ x: 170, y: 82.5 }] });
  });
  it("uses the rotated bounding box for edge placement and fitting", () => {
    const result = planImageWatermark({ ...base, rotation: 90, relativeWidth: 90 }); expect(result.error).toBeNull();
    const p = result.plan!;
    expect(p.markWidth).toBeCloseTo(90); expect(p.markHeight).toBeCloseTo(45);
    expect(p.boundsWidth).toBeCloseTo(45); expect(p.boundsHeight).toBeCloseTo(90);
    expect(p.placements[0].x + p.boundsWidth / 2).toBeCloseTo(195);
    expect(p.placements[0].y + p.boundsHeight / 2).toBeCloseTo(95);
  });
  it.each([0, 17, 45, 90, 135, 180, -25, -180])("keeps all nine positions within the image at rotation %s", rotation => {
    for (const position of ["tl","tc","tr","ml","mc","mr","bl","bc","br"] as const) {
      const { plan } = planImageWatermark({ ...base, rotation, position, relativeWidth: 90 });
      expect(plan).not.toBeNull(); const p = plan!;
      const { x, y } = p.placements[0];
      expect(x - p.boundsWidth / 2).toBeGreaterThanOrEqual(p.margin - 1e-8);
      expect(y - p.boundsHeight / 2).toBeGreaterThanOrEqual(p.margin - 1e-8);
      expect(x + p.boundsWidth / 2).toBeLessThanOrEqual(base.width - p.margin + 1e-8);
      expect(y + p.boundsHeight / 2).toBeLessThanOrEqual(base.height - p.margin + 1e-8);
    }
  });
  it("handles tiny sources and tall logos with finite positive proportional sizes", () => {
    for (const dimension of [1, 2, 3]) {
      const { plan } = planImageWatermark({ ...base, width: dimension, height: dimension, markWidth: 1, markHeight: 100, rotation: 45, margin: 10 });
      expect(plan).not.toBeNull(); expect(plan!.markWidth).toBeGreaterThan(0);
      expect(plan!.markHeight / plan!.markWidth).toBeCloseTo(100);
      expect(plan!.boundsWidth).toBeLessThanOrEqual(dimension + 1e-9);
    }
  });
  it("tiles using complete rotated bounds and rejects excess rather than skipping placements", () => {
    const tiled = planImageWatermark({ ...base, tile: true, relativeWidth: 20, rotation: 25 });
    expect(tiled.error).toBeNull(); expect(tiled.plan!.placements.length).toBeGreaterThan(1);
    expect(tiled.plan!.placements.length).toBeLessThanOrEqual(144);
    expect(planImageWatermark({ ...base, tile: true, margin: 0, relativeWidth: 1 })).toEqual({ plan: null, error: "tile-limit" });
  });
  it.each([
    { width: 0 }, { height: NaN }, { markWidth: 0 }, { markHeight: Infinity },
    { relativeWidth: 0 }, { relativeWidth: 91 }, { margin: -1 }, { margin: 11 }, { rotation: 181 },
    { position: "x" }, { tile: "yes" }, { width: 8193 }, { width: 4000, height: 4000 },
  ])("rejects malformed, oversized or unsupported options %j", patch => {
    expect(planImageWatermark({ ...base, ...patch } as ImageWatermarkOptions).plan).toBeNull();
  });
  it("publishes exact processing and tile resource limits", () => {
    expect(IMAGE_WATERMARK_LIMITS).toMatchObject({ sourcePixels: 10_000_000, sourceSide: 8192, logoPixels: 2_000_000, logoSide: 4096, files: 6, tiles: 144 });
  });
  it("uses different inclusive source/logo bounds and rejects invalid decoded dimensions", () => {
    expect(watermarkDimensionsAllowed(4000, 2500)).toBe(true);
    expect(watermarkDimensionsAllowed(4000, 2501)).toBe(false);
    expect(watermarkDimensionsAllowed(8192, 1)).toBe(true);
    expect(watermarkDimensionsAllowed(8193, 1)).toBe(false);
    expect(watermarkDimensionsAllowed(2000, 1000, true)).toBe(true);
    expect(watermarkDimensionsAllowed(2001, 1000, true)).toBe(false);
    expect(watermarkDimensionsAllowed(4096, 1, true)).toBe(true);
    expect(watermarkDimensionsAllowed(4097, 1, true)).toBe(false);
    for (const size of [0, -1, NaN, Infinity, 1.5]) expect(watermarkDimensionsAllowed(size, 1)).toBe(false);
  });
  it("keeps every tile inside the rotated margin at both rotation signs", () => {
    for (const rotation of [-135, -90, -33, 0, 33, 90, 135]) {
      const { plan } = planImageWatermark({ ...base, tile: true, rotation, relativeWidth: 20 });
      expect(plan).not.toBeNull();
      for (const { x, y } of plan!.placements) {
        expect(x - plan!.boundsWidth / 2).toBeGreaterThanOrEqual(plan!.margin - 1e-8);
        expect(y - plan!.boundsHeight / 2).toBeGreaterThanOrEqual(plan!.margin - 1e-8);
        expect(x + plan!.boundsWidth / 2).toBeLessThanOrEqual(base.width - plan!.margin + 1e-8);
        expect(y + plan!.boundsHeight / 2).toBeLessThanOrEqual(base.height - plan!.margin + 1e-8);
      }
    }
  });
});
