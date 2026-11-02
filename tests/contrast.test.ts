import { describe, expect, it } from "vitest";
import { contrastRatio, parseColor, relativeLuminance, wcagBadges } from "@/tools/_lib/contrast";

const round2 = (r: number) => Math.round(r * 100) / 100;

describe("contrastRatio: known vectors", () => {
  it("black on white is exactly 21:1", () => {
    expect(contrastRatio("#000000", "#ffffff")).toBeCloseTo(21, 9);
    expect(round2(contrastRatio("#000", "#FFF"))).toBe(21);
  });

  it("#767676 on white is ≈ 4.54:1 (the borderline AA gray)", () => {
    expect(round2(contrastRatio("#767676", "#ffffff"))).toBe(4.54);
  });

  it("pure blue on white is ≈ 8.59:1 (hand-computed from L_blue = 0.0722)", () => {
    expect(round2(contrastRatio("#0000ff", "#ffffff"))).toBe(8.59);
  });

  it("#333333 on white is ≈ 12.63:1 (engine default pair)", () => {
    expect(round2(contrastRatio("#333333", "#ffffff"))).toBe(12.63);
  });

  it("a color against itself is 1:1", () => {
    expect(contrastRatio("#1F2937", "#1F2937")).toBeCloseTo(1, 12);
  });

  it("is symmetric: ratio(a,b) === ratio(b,a)", () => {
    expect(contrastRatio("#0a3d91", "#f5e9c8")).toBeCloseTo(contrastRatio("#f5e9c8", "#0a3d91"), 12);
  });
});

describe("parseColor", () => {
  it("accepts 6-digit hex case-insensitively", () => {
    expect(parseColor("#FFFFFF")).toEqual({ r: 255, g: 255, b: 255 });
    expect(parseColor("#ff8000")).toEqual({ r: 255, g: 128, b: 0 });
  });

  it("expands 3-digit shorthand", () => {
    expect(parseColor("#F00")).toEqual({ r: 255, g: 0, b: 0 });
    expect(parseColor("#0aF")).toEqual({ r: 0, g: 170, b: 255 });
    expect(contrastRatio("#FFF", "#000")).toBeCloseTo(contrastRatio("#ffffff", "#000000"), 12);
  });

  it("parses rgb() and trims whitespace", () => {
    expect(parseColor("  rgb(0, 0, 0) ")).toEqual({ r: 0, g: 0, b: 0 });
    expect(parseColor("rgb(51, 51, 51)")).toEqual({ r: 51, g: 51, b: 51 });
  });

  it("flattens rgba() alpha onto white", () => {
    const flat = parseColor("rgba(0, 0, 0, 0.5)");
    expect(flat).not.toBeNull();
    expect(relativeLuminance(flat!)).toBeCloseTo(relativeLuminance({ r: 127.5, g: 127.5, b: 127.5 }), 12);
    // alpha 0 → pure white
    expect(parseColor("rgba(0,0,0,0)")).toEqual({ r: 255, g: 255, b: 255 });
    // alpha 1 → opaque
    expect(parseColor("rgba(10, 20, 30, 1)")).toEqual({ r: 10, g: 20, b: 30 });
  });

  it("rejects invalid input with null instead of throwing", () => {
    expect(parseColor("")).toBeNull();
    expect(parseColor("   ")).toBeNull();
    expect(parseColor("#12")).toBeNull();
    expect(parseColor("#12345")).toBeNull();
    expect(parseColor("#1234567")).toBeNull();
    expect(parseColor("nope")).toBeNull();
    expect(parseColor("rgb(0,0)")).toBeNull();
    expect(parseColor("rgba(0,0,0,2)")).toBeNull();
    expect(parseColor("rgba(0,0,0,-1)")).toBeNull();
  });

  it("clamps out-of-range rgb() channels like CSS does", () => {
    expect(parseColor("rgb(300, -10, 0)")).toEqual({ r: 255, g: 0, b: 0 });
  });
});

describe("contrastRatio: invalid inputs", () => {
  it("returns NaN (never throws) for malformed colors", () => {
    expect(contrastRatio("nope", "#fff")).toBeNaN();
    expect(contrastRatio("#fff", "")).toBeNaN();
    expect(contrastRatio("#12", "rgb(1,2)")).toBeNaN();
  });
});

describe("wcagBadges", () => {
  it("21:1 passes everything", () => {
    expect(wcagBadges(21)).toEqual({ aaNormal: true, aaaNormal: true, aaLarge: true, aaaLarge: true });
  });

  it("4.54:1 passes AA normal, AA large and AAA large but not AAA normal", () => {
    expect(wcagBadges(4.54)).toEqual({ aaNormal: true, aaaNormal: false, aaLarge: true, aaaLarge: true });
  });

  it("3.1:1 only passes AA large", () => {
    expect(wcagBadges(3.1)).toEqual({ aaNormal: false, aaaNormal: false, aaLarge: true, aaaLarge: false });
  });

  it("2.85:1 fails everything", () => {
    expect(wcagBadges(2.85)).toEqual({ aaNormal: false, aaaNormal: false, aaLarge: false, aaaLarge: false });
  });

  it("thresholds are inclusive (exactly 4.5 / 7 / 3 pass)", () => {
    expect(wcagBadges(4.5).aaNormal).toBe(true);
    expect(wcagBadges(7).aaaNormal).toBe(true);
    expect(wcagBadges(3).aaLarge).toBe(true);
  });
});
