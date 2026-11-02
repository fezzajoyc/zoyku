import { describe, expect, it } from "vitest";
import {
  computeMergeLayout,
  type Dim,
  type MergeLayout,
  type Placement,
} from "@/tools/_lib/merge-layout";

/** 按顺序取全部 placement(place 有内部游标,必须按 0…n-1 各调一次) */
function placeAll(layout: MergeLayout, dims: Dim[], gap: number): {
  width: number;
  height: number;
  placements: Placement[];
} {
  const plan = computeMergeLayout(layout, dims, gap);
  const placements = dims.map((d, i) => plan.place(d, i));
  return { width: plan.width, height: plan.height, placements };
}

describe("computeMergeLayout: horizontal", () => {
  it("joins two 400×300 images with gap 8 into an 808×300 canvas", () => {
    const { width, height, placements } = placeAll(
      "horizontal",
      [{ width: 400, height: 300 }, { width: 400, height: 300 }],
      8,
    );
    expect(width).toBe(808);
    expect(height).toBe(300);
    expect(placements).toEqual([
      { x: 0, y: 0, w: 400, h: 300 },
      { x: 408, y: 0, w: 400, h: 300 },
    ]);
  });

  it("scales every image to the smallest height and tiles left→right (400×300 + 200×100)", () => {
    const { width, height, placements } = placeAll(
      "horizontal",
      [{ width: 400, height: 300 }, { width: 200, height: 100 }],
      8,
    );
    // 高度统一为 100:400/300×100 → round(133.33) = 133
    expect(height).toBe(100);
    expect(width).toBe(133 + 8 + 200);
    expect(placements).toEqual([
      { x: 0, y: 0, w: 133, h: 100 },
      { x: 141, y: 0, w: 200, h: 100 },
    ]);
  });

  it("advances x by exactly previous w + gap for each placement", () => {
    const dims = [{ width: 640, height: 480 }, { width: 320, height: 240 }, { width: 100, height: 200 }];
    const { placements } = placeAll("horizontal", dims, 12);
    for (let i = 1; i < placements.length; i++) {
      expect(placements[i].x).toBe(placements[i - 1].x + placements[i - 1].w + 12);
    }
  });
});

describe("computeMergeLayout: vertical", () => {
  it("stacks two 400×300 images with gap 8 into a 400×608 canvas", () => {
    const { width, height, placements } = placeAll(
      "vertical",
      [{ width: 400, height: 300 }, { width: 400, height: 300 }],
      8,
    );
    expect(width).toBe(400);
    expect(height).toBe(608);
    expect(placements).toEqual([
      { x: 0, y: 0, w: 400, h: 300 },
      { x: 0, y: 308, w: 400, h: 300 },
    ]);
  });

  it("scales every image to the smallest width and tiles top→bottom (400×300 + 200×100)", () => {
    const { width, height, placements } = placeAll(
      "vertical",
      [{ width: 400, height: 300 }, { width: 200, height: 100 }],
      8,
    );
    // 宽度统一为 200:300/400×200 = 150
    expect(width).toBe(200);
    expect(height).toBe(150 + 8 + 100);
    expect(placements).toEqual([
      { x: 0, y: 0, w: 200, h: 150 },
      { x: 0, y: 158, w: 200, h: 100 },
    ]);
  });
});

describe("computeMergeLayout: grid", () => {
  it("places 3 images in a 2×2 grid of 300 px cells (canvas 600×600 with gap 0)", () => {
    const dims = [
      { width: 400, height: 300 },
      { width: 400, height: 300 },
      { width: 400, height: 300 },
    ];
    const { width, height, placements } = placeAll("grid", dims, 0);
    expect(width).toBe(600);
    expect(height).toBe(600);
    // contain-fit: s = min(300/400, 300/300) = 0.75 → 300×225,垂直居中偏移 (300−225)/2 = 37.5
    expect(placements).toEqual([
      { x: 0, y: 37.5, w: 300, h: 225 },
      { x: 300, y: 37.5, w: 300, h: 225 },
      { x: 0, y: 337.5, w: 300, h: 225 },
    ]);
  });

  it("adds gap between both columns and rows", () => {
    const dims = [
      { width: 400, height: 300 },
      { width: 400, height: 300 },
      { width: 400, height: 300 },
    ];
    const { width, height, placements } = placeAll("grid", dims, 10);
    expect(width).toBe(610);
    expect(height).toBe(610);
    expect(placements[1].x).toBe(310);
    expect(placements[2].y).toBe(347.5); // row 1 offset 310 + centering 37.5
  });

  it("sizes the cell from the smallest side across ALL images: 1000×100 + 100×1000 → cell 100, canvas 200×100", () => {
    // cell = min(min(1000,100), min(100,1000)) = 100,列数 = ceil(√2) = 2,行数 = 1
    const { width, height, placements } = placeAll(
      "grid",
      [{ width: 1000, height: 100 }, { width: 100, height: 1000 }],
      0,
    );
    expect(width).toBe(200);
    expect(height).toBe(100);
    // 1000×100:s = min(0.1, 1) = 0.1 → 100×10,垂直居中 (100−10)/2 = 45
    // 100×1000:s = min(1, 0.1) = 0.1 → 10×100,水平居中 100 + (100−10)/2 = 145
    expect(placements[0]).toEqual({ x: 0, y: 45, w: 100, h: 10 });
    expect(placements[1]).toEqual({ x: 145, y: 0, w: 10, h: 100 });
  });
});

describe("computeMergeLayout: single image and gap 0", () => {
  const single: Dim[] = [{ width: 400, height: 300 }];

  it("passes a single image through unchanged horizontally and vertically", () => {
    expect(placeAll("horizontal", single, 0)).toMatchObject({
      width: 400,
      height: 300,
      placements: [{ x: 0, y: 0, w: 400, h: 300 }],
    });
    expect(placeAll("vertical", single, 0)).toMatchObject({
      width: 400,
      height: 300,
      placements: [{ x: 0, y: 0, w: 400, h: 300 }],
    });
  });

  it("contain-fits a single image into one 300×300 grid cell", () => {
    const { width, height, placements } = placeAll("grid", single, 0);
    expect(width).toBe(300);
    expect(height).toBe(300);
    expect(placements).toEqual([{ x: 0, y: 37.5, w: 300, h: 225 }]);
  });
});

describe("computeMergeLayout: every placement stays inside the canvas", () => {
  const EPS = 1e-9;
  const sets: Array<[Dim[], number]> = [
    [[{ width: 1920, height: 1080 }, { width: 800, height: 600 }, { width: 500, height: 500 }], 16],
    [[{ width: 400, height: 300 }, { width: 200, height: 100 }], 8],
    [[{ width: 1024, height: 768 }, { width: 640, height: 960 }, { width: 333, height: 777 }, { width: 50, height: 50 }], 0],
    [[{ width: 100, height: 1000 }, { width: 1000, height: 100 }], 5],
    [[{ width: 640, height: 480 }], 12],
    [[{ width: 7, height: 9999 }, { width: 9999, height: 7 }, { width: 50, height: 50 }, { width: 50, height: 50 }, { width: 1234, height: 3 }], 3],
  ];
  const layouts: MergeLayout[] = ["horizontal", "vertical", "grid"];

  it("for assorted size sets × 3 layouts: 0 ≤ x, 0 ≤ y, x+w ≤ width, y+h ≤ height, count preserved", () => {
    for (const [dims, gap] of sets) {
      for (const layout of layouts) {
        const { width, height, placements } = placeAll(layout, dims, gap);
        expect(placements, `${layout} ${JSON.stringify(dims)}`).toHaveLength(dims.length);
        expect(width, `${layout} canvas width`).toBeGreaterThan(0);
        expect(height, `${layout} canvas height`).toBeGreaterThan(0);
        for (const p of placements) {
          expect(p.x).toBeGreaterThanOrEqual(-EPS);
          expect(p.y).toBeGreaterThanOrEqual(-EPS);
          expect(p.x + p.w).toBeLessThanOrEqual(width + EPS);
          expect(p.y + p.h).toBeLessThanOrEqual(height + EPS);
          // 极端长宽比(如 7×9999 缩到高 3)会 round 出 0 宽/高的切片:
          // 退化但不越界、不抛错,画布数学保持一致,这是约定行为而非 bug。
          expect(p.w).toBeGreaterThanOrEqual(0);
          expect(p.h).toBeGreaterThanOrEqual(0);
        }
      }
    }
  });
});

describe("computeMergeLayout: degenerate input", () => {
  it("does not throw on an empty image list (plan is degenerate but safe; UI never calls it empty)", () => {
    for (const layout of ["horizontal", "vertical", "grid"] as MergeLayout[]) {
      expect(() => computeMergeLayout(layout, [], 8)).not.toThrow();
    }
  });
});
