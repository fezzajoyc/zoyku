import { describe, expect, it } from "vitest";
import { compound, PERIODS_PER_YEAR, type Freq } from "@/tools/_lib/finance";

/**
 * G46:投入时点(期初/期末)与存入年增长率。
 * 锚:①默认参数与旧行为逐位一致;②期末/期初的差额 = 首月投入的一个月增长;
 * ③与「逐笔独立复利」的第二实现对照(闭式/逐笔两种独立路径)。
 */

/** 独立第二实现:逐笔存款各自复利到期末,与主实现的逐月状态机不同路径。 */
function perDepositFutureValue(
  principal: number,
  monthly: number,
  annualRatePct: number,
  years: number,
  freq: Freq,
  timing: "beginning" | "end",
  depositGrowthPct: number,
): number {
  const ppy = PERIODS_PER_YEAR[freq];
  const G = Math.pow(1 + annualRatePct / 100 / ppy, ppy / 12);
  const n = Math.round(years * 12);
  let fv = principal * Math.pow(G, n);
  for (let k = 1; k <= n; k++) {
    const d = monthly * Math.pow(1 + depositGrowthPct / 100, Math.floor((k - 1) / 12));
    const monthsToGrow = timing === "beginning" ? n - k + 1 : n - k;
    fv += d * Math.pow(G, monthsToGrow);
  }
  return fv;
}

describe("G46 投入时点与存入增长率", () => {
  const cases: Array<[number, number, number, number, Freq]> = [
    [2000, 100, 12, 1.5, "monthly"],
    [0, 250, 5, 10, "monthly"],
    [5000, 0, 8, 20, "quarterly"],
    [1000, 300, 0, 3, "annually"],
  ];

  it.each(cases)("默认参数与旧行为逐位一致(P=%i, d=%i, r=%i, y=%i, %s)", (...[p, d, r, y, f]) => {
    const fresh = compound(p, d, r, y, f, {});
    const explicit = compound(p, d, r, y, f, { timing: "beginning", depositAnnualGrowthPct: 0 });
    // 与旧约定同公式重算(月初投入)
    const ppy = PERIODS_PER_YEAR[f];
    const g = Math.pow(1 + r / 100 / ppy, ppy / 12);
    const n = Math.round(y * 12);
    let fv = p;
    for (let k = 1; k <= n; k++) fv = (fv + d) * g;
    expect(fresh.total).toBeCloseTo(fv, 10);
    expect(fresh.contributed).toBe(p + d * n);
    expect(explicit.total).toBe(fresh.total);
  });

  it.each(cases)("期末/期初与逐笔独立实现一致(P=%i, d=%i, r=%i, y=%i, %s)", (...[p, d, r, y, f]) => {
    for (const timing of ["beginning", "end"] as const) {
      for (const growth of [0, 3, 7.5]) {
        const run = compound(p, d, r, y, f, { timing, depositAnnualGrowthPct: growth });
        const expected = perDepositFutureValue(p, d, r, y, f, timing, growth);
        expect(run.total).toBeCloseTo(expected, 8);
        // contributed = 本金 + 逐年上浮的存款之和(独立求和)
        const n = Math.round(y * 12);
        let contrib = p;
        for (let k = 1; k <= n; k++) contrib += d * Math.pow(1 + growth / 100, Math.floor((k - 1) / 12));
        expect(run.contributed).toBeCloseTo(contrib, 8);
      }
    }
  });

  it("零增长下:begin = P·Gⁿ + G·(end − P·Gⁿ)(期初 = 期末的存款终值×G)", () => {
    const p = 1000, d = 100, r = 12, y = 1;
    const begin = compound(p, d, r, y, "monthly", { timing: "beginning" }).total;
    const end = compound(p, d, r, y, "monthly", { timing: "end" }).total;
    const G = Math.pow(1 + 0.12 / 12, 1);
    const n = 12;
    const principalFV = p * Math.pow(G, n);
    expect(begin).toBeCloseTo(principalFV + G * (end - principalFV), 8);
    expect(begin).toBeGreaterThan(end);
  });

  it("存款增长率生效:第 13 月起存款 = 基准×(1+g),10 年 5% 增长 contributed 提升", () => {
    const flat = compound(0, 100, 5, 10, "monthly", { timing: "end" });
    const grown = compound(0, 100, 5, 10, "monthly", { timing: "end", depositAnnualGrowthPct: 5 });
    expect(flat.contributed).toBeCloseTo(100 * 120, 8);
    // 每年 12 笔,第 j+1 年单笔 = 100×1.05^j:总投入 = 1200 × Σ_{j=0..9} 1.05^j
    const grownSum = 1200 * [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].reduce((acc, j) => acc + Math.pow(1.05, j), 0);
    expect(grown.contributed).toBeCloseTo(grownSum, 6);
    expect(grown.total).toBeGreaterThan(flat.total);
  });

  it("schedule 的 contrib 反映上浮后存款,interest = balance − contributed", () => {
    const run = compound(500, 100, 6, 3, "monthly", { timing: "end", depositAnnualGrowthPct: 10 });
    expect(run.schedule.length).toBe(3);
    for (const row of run.schedule) {
      expect(row.contrib).toBeCloseTo(row.balance - row.interest, 8);
    }
    const year2 = run.schedule[1];
    expect(year2.contrib).toBeCloseTo(500 + 100 * 12 + 110 * 12, 8);
  });

  it("非法 options 走 NaN 约定(负增长率/未知时点),绝不抛异常", () => {
    expect(compound(1000, 100, 5, 5, "monthly", { depositAnnualGrowthPct: -1 }).total).toBeNaN();
    expect(compound(1000, 100, 5, 5, "monthly", { timing: "middle" as never }).total).toBeNaN();
  });
});
