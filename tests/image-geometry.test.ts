import { describe, expect, it } from "vitest";
import {
  MAX_BORDER,
  MAX_CANVAS_SIDE,
  MAX_GRID,
  MAX_SHRINK_PCT,
  MIN_SHRINK_PCT,
  clampGrid,
  computeBorderPlan,
  computeCirclePlan,
  computeTileGrid,
  imageBaseName,
  minPctForDiameter,
  tileName,
} from "@/tools/_lib/image-geometry";

/* ------------------------------------------------------------------ */
/* imageBaseName                                                       */
/* ------------------------------------------------------------------ */

describe("imageBaseName", () => {
  it("strips the last extension only", () => {
    expect(imageBaseName("photo.jpg")).toBe("photo");
    expect(imageBaseName("a.b.c.png")).toBe("a.b.c");
    expect(imageBaseName("photo.tar.gz")).toBe("photo.tar");
    expect(imageBaseName("photo.JPG")).toBe("photo");
  });

  it("passes through names without an extension", () => {
    expect(imageBaseName("noext")).toBe("noext");
    expect(imageBaseName("")).toBe("");
  });

  it("keeps dot-leading names intact (outputName fallback semantics)", () => {
    expect(imageBaseName(".png")).toBe(".png");
  });

  it("handles unicode and emoji filenames", () => {
    expect(imageBaseName("图片 照片.png")).toBe("图片 照片");
    expect(imageBaseName("📷 selfie.webp")).toBe("📷 selfie");
    expect(imageBaseName("写真 最終版.jpeg")).toBe("写真 最終版");
  });
});

/* ------------------------------------------------------------------ */
/* computeBorderPlan                                                   */
/* ------------------------------------------------------------------ */

describe("computeBorderPlan", () => {
  it("grows the canvas by 2×border on each axis and places the image at (border, border)", () => {
    // 300×200 + border 10 → 320×220 canvas, image at (10, 10)
    expect(computeBorderPlan({ width: 300, height: 200, border: 10, mode: "color" })).toEqual({
      canvasWidth: 320,
      canvasHeight: 220,
      offsetX: 10,
      offsetY: 10,
      border: 10,
      format: "image/png",
      ext: "png",
    });
  });

  it("border 0 is a valid boundary that returns an unchanged-size canvas", () => {
    const plan = computeBorderPlan({ width: 300, height: 200, border: 0, mode: "transparent" });
    expect(plan).not.toBeNull();
    expect(plan!.canvasWidth).toBe(300);
    expect(plan!.canvasHeight).toBe(200);
    expect(plan!.offsetX).toBe(0);
    expect(plan!.offsetY).toBe(0);
  });

  it("transparent mode forces PNG even when JPG is requested", () => {
    const plan = computeBorderPlan({
      width: 300,
      height: 200,
      border: 10,
      mode: "transparent",
      format: "image/jpeg",
    });
    expect(plan!.format).toBe("image/png");
    expect(plan!.ext).toBe("png");
  });

  it("color mode honors the requested format", () => {
    const plan = computeBorderPlan({
      width: 300,
      height: 200,
      border: 10,
      mode: "color",
      format: "image/jpeg",
    });
    expect(plan!.format).toBe("image/jpeg");
    expect(plan!.ext).toBe("jpg");
  });

  it("color mode falls back to PNG for a missing or non-JPG format", () => {
    expect(
      computeBorderPlan({ width: 300, height: 200, border: 10, mode: "color" })!.format,
    ).toBe("image/png");
    expect(
      computeBorderPlan({
        width: 300,
        height: 200,
        border: 10,
        mode: "color",
        format: "image/webp" as "image/jpeg",
      })!.format,
    ).toBe("image/png");
  });

  it("clamps oversized borders to MAX_BORDER and floors fractional values", () => {
    // 9999 → 250 → canvas 800×700
    expect(computeBorderPlan({ width: 300, height: 200, border: 9999, mode: "color" })).toMatchObject({
      border: MAX_BORDER,
      canvasWidth: 800,
      canvasHeight: 700,
    });
    // 10.9 → floor → 10 → 320×220
    expect(computeBorderPlan({ width: 300, height: 200, border: 10.9, mode: "color" })).toMatchObject({
      border: 10,
      canvasWidth: 320,
      canvasHeight: 220,
    });
    // 负数 → 0
    expect(computeBorderPlan({ width: 300, height: 200, border: -5, mode: "color" })).toMatchObject({
      border: 0,
      canvasWidth: 300,
      canvasHeight: 200,
    });
  });

  it("rejects non-finite or non-integer dimensions and NaN borders", () => {
    for (const width of [0, -3, NaN, Infinity, 300.5]) {
      expect(computeBorderPlan({ width, height: 200, border: 10, mode: "color" })).toBeNull();
    }
    for (const height of [0, -1, NaN, Infinity, 0.5]) {
      expect(computeBorderPlan({ width: 300, height, border: 10, mode: "color" })).toBeNull();
    }
    for (const border of [NaN, Infinity, -Infinity]) {
      expect(computeBorderPlan({ width: 300, height: 200, border, mode: "color" })).toBeNull();
    }
  });

  it("rejects canvases exceeding MAX_CANVAS_SIDE but accepts the exact boundary", () => {
    // 16000 + 2×250 = 16500 > 16384 → 不可渲染
    expect(
      computeBorderPlan({ width: 16000, height: 100, border: 250, mode: "color" }),
    ).toBeNull();
    // 16000 + 2×192 = 16384 → 恰好压线
    const plan = computeBorderPlan({ width: 16000, height: 100, border: 192, mode: "color" });
    expect(plan!.canvasWidth).toBe(MAX_CANVAS_SIDE);
    expect(plan!.canvasHeight).toBe(484);
  });

  it("keeps image placement inside the canvas for assorted sizes (roundtrip property)", () => {
    const cases = [
      [1, 1],
      [3, 9999],
      [1920, 1080],
      [300, 200],
      [7, 7],
    ] as const;
    for (const [width, height] of cases) {
      for (const border of [0, 1, 24, MAX_BORDER]) {
        const plan = computeBorderPlan({ width, height, border, mode: "transparent" });
        if (!plan) continue; // 只会因画布超限被拒
        expect(plan.offsetX).toBe(plan.border);
        expect(plan.offsetY).toBe(plan.border);
        expect(plan.canvasWidth).toBe(width + 2 * plan.border);
        expect(plan.canvasHeight).toBe(height + 2 * plan.border);
        expect(plan.offsetX + width).toBeLessThanOrEqual(plan.canvasWidth);
        expect(plan.offsetY + height).toBeLessThanOrEqual(plan.canvasHeight);
      }
    }
  });
});

/* ------------------------------------------------------------------ */
/* computeTileGrid / tileName / clampGrid                              */
/* ------------------------------------------------------------------ */

describe("computeTileGrid: divisible sizes", () => {
  it("cuts 300×200 into 2×3 tiles of 100×100 named photo-r1c1…photo-r2c3", () => {
    const tiles = computeTileGrid(300, 200, 2, 3, "photo")!;
    expect(tiles).toHaveLength(6);
    expect(tiles).toEqual([
      { row: 0, col: 0, x: 0, y: 0, w: 100, h: 100, name: "photo-r1c1.png" },
      { row: 0, col: 1, x: 100, y: 0, w: 100, h: 100, name: "photo-r1c2.png" },
      { row: 0, col: 2, x: 200, y: 0, w: 100, h: 100, name: "photo-r1c3.png" },
      { row: 1, col: 0, x: 0, y: 100, w: 100, h: 100, name: "photo-r2c1.png" },
      { row: 1, col: 1, x: 100, y: 100, w: 100, h: 100, name: "photo-r2c2.png" },
      { row: 1, col: 2, x: 200, y: 100, w: 100, h: 100, name: "photo-r2c3.png" },
    ]);
  });

  it("cuts 300×200 into 2×2 tiles of 150×100", () => {
    const tiles = computeTileGrid(300, 200, 2, 2, "photo")!;
    expect(tiles).toEqual([
      { row: 0, col: 0, x: 0, y: 0, w: 150, h: 100, name: "photo-r1c1.png" },
      { row: 0, col: 1, x: 150, y: 0, w: 150, h: 100, name: "photo-r1c2.png" },
      { row: 1, col: 0, x: 0, y: 100, w: 150, h: 100, name: "photo-r2c1.png" },
      { row: 1, col: 1, x: 150, y: 100, w: 150, h: 100, name: "photo-r2c2.png" },
    ]);
  });

  it("names tiles row by row left→right with 1-based rNcM suffixes", () => {
    const tiles = computeTileGrid(400, 300, 3, 4, "img")!;
    expect(tiles.map((t) => t.name)).toEqual([
      "img-r1c1.png", "img-r1c2.png", "img-r1c3.png", "img-r1c4.png",
      "img-r2c1.png", "img-r2c2.png", "img-r2c3.png", "img-r2c4.png",
      "img-r3c1.png", "img-r3c2.png", "img-r3c3.png", "img-r3c4.png",
    ]);
  });

  it("keeps unicode base names in tile file names", () => {
    expect(computeTileGrid(300, 200, 2, 2, "图片")![0].name).toBe("图片-r1c1.png");
    expect(tileName("📷", 2, 3)).toBe("📷-r2c3.png");
  });
});

describe("computeTileGrid: remainder absorption", () => {
  it("gives 305×205 at 3 cols × 2 rows tiles of 101×102 with last col 103 and last row 103", () => {
    // tileW = floor(305/3) = 101,tileH = floor(205/2) = 102
    // 最后一列宽 = 305 − 2×101 = 103,最后一行高 = 205 − 102 = 103
    const tiles = computeTileGrid(305, 205, 2, 3, "photo")!;
    expect(tiles).toHaveLength(6);
    // 第一行
    expect(tiles[0]).toMatchObject({ x: 0, y: 0, w: 101, h: 102 });
    expect(tiles[1]).toMatchObject({ x: 101, y: 0, w: 101, h: 102 });
    expect(tiles[2]).toMatchObject({ x: 202, y: 0, w: 103, h: 102 });
    // 第二行
    expect(tiles[3]).toMatchObject({ x: 0, y: 102, w: 101, h: 103 });
    expect(tiles[4]).toMatchObject({ x: 101, y: 102, w: 101, h: 103 });
    expect(tiles[5]).toMatchObject({ x: 202, y: 102, w: 103, h: 103 });
  });

  it("reassembles exactly: each row's widths sum to the width, columns' heights to the height", () => {
    const cases: Array<[number, number, number, number]> = [
      [305, 205, 2, 3],
      [333, 777, 3, 4],
      [100, 100, 3, 3],
      [101, 101, 2, 6],
      [7, 5, 2, 6], // 7 只够每列 1px,最后一列 2px
    ];
    for (const [width, height, rows, cols] of cases) {
      const tiles = computeTileGrid(width, height, rows, cols, "x")!;
      expect(tiles, `${width}×${height} ${rows}×${cols}`).toHaveLength(rows * cols);
      for (let row = 0; row < rows; row++) {
        const rowTiles = tiles.filter((t) => t.row === row);
        expect(rowTiles.reduce((s, t) => s + t.w, 0), `row ${row} width`).toBe(width);
        // x 连续无缝
        let x = 0;
        for (const t of rowTiles) {
          expect(t.x).toBe(x);
          expect(t.h).toBeGreaterThan(0);
          x += t.w;
        }
      }
      for (let col = 0; col < cols; col++) {
        const colTiles = tiles.filter((t) => t.col === col);
        expect(colTiles.reduce((s, t) => s + t.h, 0), `col ${col} height`).toBe(height);
        let y = 0;
        for (const t of colTiles) {
          expect(t.y).toBe(y);
          expect(t.w).toBeGreaterThan(0);
          y += t.h;
        }
      }
    }
  });
});

describe("computeTileGrid: clamping and invalid input", () => {
  it("clamps rows/cols into [2, 6] (1 → 2, 100 → 6, fractional floors)", () => {
    expect(computeTileGrid(300, 200, 1, 3, "p")!).toHaveLength(2 * 3);
    expect(computeTileGrid(300, 200, 100, 100, "p")!).toHaveLength(MAX_GRID * MAX_GRID);
    // 3.9 → 3
    expect(computeTileGrid(300, 300, 3.9, 3.9, "p")!).toHaveLength(9);
    expect(clampGrid(1)).toBe(2);
    expect(clampGrid(6)).toBe(6);
    expect(clampGrid(99)).toBe(6);
    expect(clampGrid(2.9)).toBe(2);
    expect(clampGrid(NaN)).toBeNull();
    expect(clampGrid(Infinity)).toBeNull();
  });

  it("rejects non-finite or non-positive dimensions and NaN grid values", () => {
    for (const width of [0, -10, NaN, Infinity, 30.5]) {
      expect(computeTileGrid(width, 200, 2, 3, "p")).toBeNull();
    }
    for (const height of [0, -1, NaN, Infinity]) {
      expect(computeTileGrid(300, height, 2, 3, "p")).toBeNull();
    }
    expect(computeTileGrid(300, 200, NaN, 3, "p")).toBeNull();
    expect(computeTileGrid(300, 200, 2, NaN, "p")).toBeNull();
  });

  it("rejects grids too fine for the image (any regular tile would be sub-pixel)", () => {
    // 5px 宽切 6 列 → 常规块 0px
    expect(computeTileGrid(5, 50, 2, 6, "p")).toBeNull();
    // 5px 高切 6 行 → 常规块 0px
    expect(computeTileGrid(50, 5, 6, 2, "p")).toBeNull();
  });

  it("rejects a 1×1 image at the 2×2 minimum (regular tiles would be 0px)", () => {
    expect(computeTileGrid(1, 1, 2, 2, "px")).toBeNull();
  });
});

/* ------------------------------------------------------------------ */
/* computeCirclePlan / minPctForDiameter                               */
/* ------------------------------------------------------------------ */

describe("computeCirclePlan", () => {
  it("defaults the diameter to the shorter side and centers the circle", () => {
    // 300×200 → d = 200,cx = floor(100/2) = 50,cy = 0
    expect(computeCirclePlan(300, 200, 100)).toEqual({ d: 200, cx: 50, cy: 0 });
    // 正方形 → 满幅
    expect(computeCirclePlan(200, 200, 100)).toEqual({ d: 200, cx: 0, cy: 0 });
    // 奇数边:301×201 → d = 201,cx = 50,cy = 0
    expect(computeCirclePlan(301, 201, 100)).toEqual({ d: 201, cx: 50, cy: 0 });
  });

  it("shrinks the diameter by the percentage and recenters", () => {
    // 300×200 @ 50% → d = 100,cx = 100,cy = 50
    expect(computeCirclePlan(300, 200, 50)).toEqual({ d: 100, cx: 100, cy: 50 });
  });

  it("clamps pct into [10, 100] and floors fractional values", () => {
    // 5% → 10% → d = floor(200×0.1) = 20,cx = 140,cy = 90
    expect(computeCirclePlan(300, 200, 5)).toEqual({ d: 20, cx: 140, cy: 90 });
    // 150% → 100% → d = 200
    expect(computeCirclePlan(300, 200, 150)).toEqual({ d: 200, cx: 50, cy: 0 });
    // 42.9% → 42% → d = floor(200×0.42) = 84,cx = 108,cy = 58
    expect(computeCirclePlan(300, 200, 42.9)).toEqual({ d: 84, cx: 108, cy: 58 });
    expect(MIN_SHRINK_PCT).toBe(10);
    expect(MAX_SHRINK_PCT).toBe(100);
  });

  it("rejects invalid dimensions and NaN pct", () => {
    for (const width of [0, -1, NaN, Infinity, 2.5]) {
      expect(computeCirclePlan(width, 200, 100)).toBeNull();
    }
    for (const height of [0, -1, NaN, Infinity]) {
      expect(computeCirclePlan(300, height, 100)).toBeNull();
    }
    for (const pct of [NaN, Infinity, -Infinity]) {
      expect(computeCirclePlan(300, 200, pct)).toBeNull();
    }
  });

  it("rejects a sub-pixel diameter (9×9 at the 10% minimum) but keeps 1×1 at 100%", () => {
    expect(computeCirclePlan(9, 9, 10)).toBeNull(); // floor(0.9) = 0
    expect(computeCirclePlan(1, 1, 100)).toEqual({ d: 1, cx: 0, cy: 0 });
  });

  it("keeps the circle inside the source image for assorted sizes × pcts (roundtrip property)", () => {
    const dims = [
      [1, 1], [2, 9], [9, 2], [300, 200], [200, 300], [333, 777], [1080, 1920],
    ] as const;
    const pcts = [10, 33, 50, 66, 100];
    for (const [width, height] of dims) {
      const floor = minPctForDiameter(width, height);
      for (const pct of pcts) {
        const eff = Math.max(pct, floor);
        const plan = computeCirclePlan(width, height, eff)!;
        expect(plan, `${width}×${height} @ ${eff}%`).toBeTruthy();
        expect(plan.d).toBeGreaterThanOrEqual(1);
        expect(plan.cx).toBeGreaterThanOrEqual(0);
        expect(plan.cy).toBeGreaterThanOrEqual(0);
        expect(plan.cx + plan.d).toBeLessThanOrEqual(width);
        expect(plan.cy + plan.d).toBeLessThanOrEqual(height);
      }
    }
  });
});

describe("minPctForDiameter", () => {
  it("returns the smallest slider-legal pct that still yields a 1px diameter", () => {
    expect(minPctForDiameter(1, 1)).toBe(100); // 1px 短边必须 100%
    expect(minPctForDiameter(8, 8)).toBe(13); // ceil(100/8) = 13
    expect(minPctForDiameter(4, 9)).toBe(25);
    expect(minPctForDiameter(10, 1000)).toBe(10); // 短边 ≥ 10 时最小即 10
    expect(minPctForDiameter(100, 100)).toBe(10);
  });

  it("falls back to MAX for invalid dimensions", () => {
    expect(minPctForDiameter(0, 10)).toBe(100);
    expect(minPctForDiameter(NaN, 10)).toBe(100);
  });

  it("partnered with computeCirclePlan, always produces a drawable diameter", () => {
    for (const side of [1, 2, 3, 5, 8, 9, 10, 33]) {
      const pct = minPctForDiameter(side, side);
      const plan = computeCirclePlan(side, side, pct)!;
      expect(plan.d).toBeGreaterThanOrEqual(1);
    }
  });
});
