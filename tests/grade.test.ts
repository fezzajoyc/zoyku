import { describe, expect, it } from "vitest";
import {
  PASS_FAIL_SCALE,
  PLUS_MINUS_SCALE,
  US_SCALE,
  gradePercent,
  isValidItem,
  letterFor,
  requiredFinalPoints,
  requiredFinalWeighted,
  type GradeItem,
} from "@/tools/_lib/grade";

const items = (...xs: [number, number, number][]): GradeItem[] =>
  xs.map(([score, max, weight]) => ({ score, max, weight }));

describe("gradePercent: weighted mode", () => {
  it("two tests 95/100 (w20) + 80/100 (w30) → 86", () => {
    expect(gradePercent(items([95, 100, 20], [80, 100, 30]), "weighted")).toBeCloseTo(86, 9);
  });

  it("mixed maxima: 92/100 w20 + 78/100 w30 + 85/100 w15 → 83.92", () => {
    const p = gradePercent(items([92, 100, 20], [78, 100, 30], [85, 100, 15]), "weighted");
    expect(p).toBeCloseTo(83.923076923, 6);
  });

  it("normalizes when weights do not sum to 100", () => {
    // 90/100 w50 alone → 90, regardless of the missing 50
    expect(gradePercent(items([90, 100, 50]), "weighted")).toBeCloseTo(90, 9);
  });

  it("score above max counts as extra credit (> 100)", () => {
    expect(gradePercent(items([105, 100, 100]), "weighted")).toBeCloseTo(105, 9);
  });

  it("zero total weight → NaN", () => {
    expect(gradePercent(items([90, 100, 0]), "weighted")).toBeNaN();
  });

  it("drops invalid rows: negative weight and negative score are excluded", () => {
    expect(gradePercent(items([90, 100, -10]), "weighted")).toBeNaN();
    expect(gradePercent(items([-5, 100, 10], [90, 100, 90]), "weighted")).toBeCloseTo(90, 9);
  });
});

describe("gradePercent: points mode", () => {
  it("45/50 + 80/100 → 125/150 = 83.33", () => {
    expect(gradePercent(items([45, 50, 0], [80, 100, 0]), "points")).toBeCloseTo(250 / 3, 9);
  });

  it("extra credit can exceed 100", () => {
    expect(gradePercent(items([85, 100, 0], [78, 50, 0]), "points")).toBeCloseTo(108.6666666, 6);
  });

  it("weights are irrelevant in points mode", () => {
    expect(gradePercent(items([45, 50, 999], [80, 100, 1]), "points")).toBeCloseTo(250 / 3, 9);
  });

  it("zero total points → NaN", () => {
    expect(gradePercent([], "points")).toBeNaN();
  });
});

describe("gradePercent: empty / invalid inputs", () => {
  it("empty list → NaN in both modes", () => {
    expect(gradePercent([], "weighted")).toBeNaN();
    expect(gradePercent([], "points")).toBeNaN();
  });

  it("all-invalid rows (max 0, NaN score) → NaN, never throws", () => {
    expect(gradePercent([{ score: 90, max: 0, weight: 10 }], "weighted")).toBeNaN();
    expect(gradePercent([{ score: NaN, max: 100, weight: 10 }], "points")).toBeNaN();
    expect(gradePercent([{ score: Infinity, max: 100, weight: 10 }], "points")).toBeNaN();
  });
});

describe("isValidItem", () => {
  it("accepts clean and extra-credit rows, rejects max ≤ 0 and non-finite scores", () => {
    expect(isValidItem({ score: 0, max: 100 })).toBe(true);
    expect(isValidItem({ score: 105, max: 100 })).toBe(true);
    expect(isValidItem({ score: 90, max: 0 })).toBe(false);
    expect(isValidItem({ score: NaN, max: 100 })).toBe(false);
    expect(isValidItem({ score: -1, max: 100 })).toBe(false);
    expect(isValidItem({ score: 90, max: Infinity })).toBe(false);
  });
});

describe("letterFor", () => {
  it("US 10-point scale boundaries are inclusive", () => {
    expect(letterFor(90, US_SCALE)).toBe("A");
    expect(letterFor(89.99, US_SCALE)).toBe("B");
    expect(letterFor(60, US_SCALE)).toBe("D");
    expect(letterFor(59.9, US_SCALE)).toBe("F");
    expect(letterFor(0, US_SCALE)).toBe("F");
  });

  it("plus/minus scale at its many cut points", () => {
    expect(letterFor(93, PLUS_MINUS_SCALE)).toBe("A");
    expect(letterFor(92.9, PLUS_MINUS_SCALE)).toBe("A-");
    expect(letterFor(87, PLUS_MINUS_SCALE)).toBe("B+");
    expect(letterFor(83, PLUS_MINUS_SCALE)).toBe("B");
    expect(letterFor(70, PLUS_MINUS_SCALE)).toBe("C-");
    expect(letterFor(60, PLUS_MINUS_SCALE)).toBe("D-");
    expect(letterFor(59.9, PLUS_MINUS_SCALE)).toBe("F");
  });

  it("pass/fail scale", () => {
    expect(letterFor(70, PASS_FAIL_SCALE)).toBe("Pass");
    expect(letterFor(69.9, PASS_FAIL_SCALE)).toBe("Fail");
  });

  it("supports custom scales and picks the highest matching threshold", () => {
    const scale = [
      { min: 50, letter: "P" },
      { min: 0, letter: "X" },
    ];
    expect(letterFor(50, scale)).toBe("P");
    expect(letterFor(49, scale)).toBe("X");
  });

  it("returns empty string for NaN or below every threshold", () => {
    expect(letterFor(NaN, US_SCALE)).toBe("");
    expect(letterFor(-1, US_SCALE)).toBe("");
  });
});

describe("requiredFinalWeighted", () => {
  const base = { items: items([95, 100, 20], [80, 100, 30]), finalWeight: 50 };

  it("hand-computed: current 0.43, target 85 → need 84% on the final", () => {
    expect(requiredFinalWeighted({ ...base, targetPercent: 85 })).toBeCloseTo(84, 9);
  });

  it("with no graded work, the final must carry the whole target", () => {
    expect(requiredFinalWeighted({ items: [], finalWeight: 50, targetPercent: 80 })).toBeCloseTo(80, 9);
  });

  it("target already secured → negative requirement", () => {
    expect(requiredFinalWeighted({ ...base, targetPercent: 40 })).toBeCloseTo(-6, 9);
  });

  it("impossible target → requirement above 100", () => {
    expect(requiredFinalWeighted({ ...base, targetPercent: 99 })).toBeCloseTo(112, 9);
  });

  it("scoring exactly the requirement lands exactly on the target", () => {
    const req = requiredFinalWeighted({ ...base, targetPercent: 85 });
    const total = 0.43 + (req / 100) * 0.5;
    expect(total).toBeCloseTo(0.85, 9);
  });

  it("zero remaining weight → NaN (nothing left to solve for)", () => {
    expect(requiredFinalWeighted({ ...base, finalWeight: 0, targetPercent: 85 })).toBeNaN();
    expect(requiredFinalWeighted({ ...base, finalWeight: -10, targetPercent: 85 })).toBeNaN();
  });

  it("invalid targets → NaN", () => {
    expect(requiredFinalWeighted({ ...base, targetPercent: NaN })).toBeNaN();
    expect(requiredFinalWeighted({ ...base, targetPercent: -1 })).toBeNaN();
  });
});

describe("requiredFinalPoints", () => {
  const base = { earned: 340, possible: 400, finalPoints: 200 };

  it("hand-computed: target 80 of 600 → need 140/200 = 70%", () => {
    expect(requiredFinalPoints({ ...base, targetPercent: 80 })).toBeCloseTo(70, 9);
  });

  it("target already met → negative percentage", () => {
    expect(requiredFinalPoints({ ...base, targetPercent: 50 })).toBeCloseTo(-20, 9);
  });

  it("unreachable target → above 100%", () => {
    expect(requiredFinalPoints({ ...base, targetPercent: 99 })).toBeCloseTo(127, 9);
  });

  it("zero possible or zero final points → NaN", () => {
    expect(requiredFinalPoints({ ...base, possible: 0, targetPercent: 80 })).toBeNaN();
    expect(requiredFinalPoints({ ...base, finalPoints: 0, targetPercent: 80 })).toBeNaN();
  });

  it("negative earned or target → NaN", () => {
    expect(requiredFinalPoints({ ...base, earned: -1, targetPercent: 80 })).toBeNaN();
    expect(requiredFinalPoints({ ...base, targetPercent: -1 })).toBeNaN();
  });
});
