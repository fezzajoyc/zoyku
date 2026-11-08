import { describe, expect, it } from "vitest";
import { balanceAtYear, monthlyAmortization, type AmortResult } from "@/tools/_lib/amortize";
import { dueDateFromLmp, gestationalAgeAt, type GestAge, type DueDateResult } from "@/tools/_lib/duedate";
import {
  BRACKETS_2026,
  STANDARD_DEDUCTION_2026,
  federalTax,
  type FederalTaxResult,
  type TaxStatus,
} from "@/tools/_lib/incometax";

// ─────────────────────────── monthlyAmortization ───────────────────────────

/**
 * 独立核对:标准固定利率摊销封闭公式
 *   M = L·r·(1+r)ⁿ / ((1+r)ⁿ − 1),r = 年利率/1200,n = 月数;
 * 第 k 期后余额 B_k = L(1+r)ᵏ − M·((1+r)ᵏ − 1)/r。
 * 在测试内独立实现,与产品代码的逐月循环互为印证。
 */
function closedPI(loan: number, annualRatePct: number, years: number): number {
  const r = annualRatePct / 1200;
  const n = Math.round(years * 12);
  const f = Math.pow(1 + r, n);
  return (loan * r * f) / (f - 1);
}

function closedBalanceAtMonth(loan: number, annualRatePct: number, years: number, k: number): number {
  const r = annualRatePct / 1200;
  const m = closedPI(loan, annualRatePct, years);
  const f = Math.pow(1 + r, k);
  return loan * f - m * ((f - 1) / r);
}

function expectNaNResult(res: AmortResult): void {
  expect(res.monthlyPI).toBeNaN();
  expect(res.totalInterest).toBeNaN();
  expect(res.totalPaid).toBeNaN();
  expect(res.rows).toEqual([]);
}

describe("monthlyAmortization: reference case (12000, 6%, 1 year)", () => {
  // r = 0.005,n = 12,1.005¹² ≈ 1.0616778119
  // M = 12000×0.005×1.0616778119/0.0616778119 ≈ 1032.7972
  const res = monthlyAmortization(12000, 6, 1);

  it("charges a monthly P&I of 1032.80 within ±0.01", () => {
    expect(Math.abs(res.monthlyPI - 1032.80)).toBeLessThanOrEqual(0.01);
  });

  it("splits month 1 into interest 60.00 (12000 × 0.005) and principal 972.80", () => {
    expect(res.rows[0].month).toBe(1);
    expect(res.rows[0].interest).toBeCloseTo(60, 6);
    expect(res.rows[0].principal).toBeCloseTo(972.7972, 3);
    expect(res.rows[0].balance).toBeCloseTo(11027.2028, 3);
  });

  it("ends with the balance paid off and totals loan + totalInterest", () => {
    const last = res.rows[res.rows.length - 1];
    expect(last.month).toBe(12);
    expect(last.balance).toBeCloseTo(0, 6);
    expect(res.totalInterest).toBeCloseTo(12 * res.monthlyPI - 12000, 6);
    expect(Math.abs(res.totalInterest - 393.57)).toBeLessThanOrEqual(0.01);
    expect(res.totalPaid).toBe(12000 + res.totalInterest);
  });

  it("matches the closed amortization formula computed independently in this test, month by month", () => {
    expect(res.monthlyPI).toBeCloseTo(closedPI(12000, 6, 1), 8);
    for (const row of res.rows) {
      expect(row.balance).toBeCloseTo(closedBalanceAtMonth(12000, 6, 1, row.month), 6);
    }
  });

  it("reconciles: every month interest = balance × r, principal = M − interest, and Σ principal = loan", () => {
    const r = 6 / 1200;
    let bal = 12000;
    let sumPrin = 0;
    for (const row of res.rows) {
      expect(row.interest).toBeCloseTo(bal * r, 9);
      expect(row.principal).toBeCloseTo(res.monthlyPI - bal * r, 9);
      bal = bal + bal * r - res.monthlyPI;
      expect(row.balance).toBeCloseTo(Math.max(bal, 0), 9);
      sumPrin += row.principal;
    }
    expect(sumPrin).toBeCloseTo(12000, 6);
  });
});

describe("monthlyAmortization: 0% rate is a straight split", () => {
  it("divides the loan evenly: M = loan / months exactly", () => {
    const res = monthlyAmortization(120000, 0, 10);
    expect(res.monthlyPI).toBe(1000);
    expect(res.totalInterest).toBe(0);
  });

  it("produces monthly rows with zero interest and linearly declining balances", () => {
    const res = monthlyAmortization(120000, 0, 10);
    expect(res.rows).toHaveLength(120);
    for (const row of res.rows) expect(row.interest).toBe(0);
    expect(res.rows[0].balance).toBe(119000);
    expect(res.rows[35].balance).toBe(84000); // 第 36 期后:120000 − 36×1000
    expect(res.rows[119].balance).toBe(0);
  });
});

describe("monthlyAmortization: mortgage-scale cross-check and boundaries", () => {
  it("240k @6%/30y → monthlyPI 1438.92 within ±0.01 (external hand-calc anchor)", () => {
    // 240000×0.005×1.005³⁶⁰/(1.005³⁶⁰−1) ≈ 1438.9215
    const res = monthlyAmortization(240000, 6, 30);
    expect(Math.abs(res.monthlyPI - 1438.92)).toBeLessThanOrEqual(0.01);
    expect(res.rows).toHaveLength(360);
    expect(res.monthlyPI).toBeCloseTo(closedPI(240000, 6, 30), 8);
    // 第 1 年末(第 12 期后)余额与独立封闭公式一致
    expect(res.rows[11].balance).toBeCloseTo(closedBalanceAtMonth(240000, 6, 30, 12), 6);
    const sumPrin = res.rows.reduce((s, r) => s + r.principal, 0);
    expect(sumPrin).toBeCloseTo(240000, 6);
  });

  it("handles a single-month term (years = 1/12): one row, principal = loan, balance 0", () => {
    const res = monthlyAmortization(1000, 12, 1 / 12);
    expect(res.rows).toHaveLength(1);
    expect(res.rows[0].interest).toBeCloseTo(10, 6);
    expect(res.rows[0].principal).toBeCloseTo(1000, 6);
    expect(res.rows[0].balance).toBeCloseTo(0, 6);
    expect(res.totalInterest).toBeCloseTo(10, 6);
  });

  it("accepts the 100-year cap with 1200 monthly rows, all finite", () => {
    const res = monthlyAmortization(50000, 4, 100);
    expect(res.rows).toHaveLength(1200);
    expect(res.rows.every((r) => Number.isFinite(r.balance))).toBe(true);
    expect(res.rows[1199].balance).toBeCloseTo(0, 6);
  });

  it("rounds fractional years to whole months (10.5 years → 126 rows)", () => {
    const res = monthlyAmortization(50000, 5, 10.5);
    expect(res.rows).toHaveLength(126);
    expect(res.monthlyPI).toBeCloseTo(closedPI(50000, 5, 10.5), 8);
  });
});

describe("monthlyAmortization: invalid inputs yield NaN and empty rows", () => {
  const invalid: Array<[number, number, number]> = [
    [0, 6, 30], // zero loan
    [-12000, 6, 1], // negative loan
    [12000, -6, 1], // negative rate
    [12000, 6, 0], // zero years
    [12000, 6, -1], // negative years
    [12000, 6, 100.4], // just above the 100-year cap
    [12000, 6, 100.5], // above the 100-year cap
    [12000, 6, 0.001], // rounds to 0 months
    [NaN, 6, 1],
    [12000, Infinity, 1],
    [12000, 6, NaN],
  ];

  it.each(invalid)("rejects monthlyAmortization(%p, %p, %p)", (loan, rate, years) => {
    expectNaNResult(monthlyAmortization(loan, rate, years));
  });
});

describe("balanceAtYear: balance after N full years", () => {
  it("120k @6%/30y, year 5 → 111,665.26 within ±0.5 (hand-calc anchor B₆₀)", () => {
    // B₆₀ = 120000×1.005⁶⁰ − 719.46×(1.005⁶⁰−1)/0.005 ≈ 111,665.26
    const b = balanceAtYear(120000, 6, 30, 5);
    expect(Math.abs(b - 111665.26)).toBeLessThanOrEqual(0.5);
    expect(b).toBeCloseTo(closedBalanceAtMonth(120000, 6, 30, 60), 6);
  });

  it("agrees with the monthly table: balanceAtYear(y) = row[y×12−1].balance", () => {
    const res = monthlyAmortization(120000, 6, 30);
    for (const y of [1, 2, 15, 29]) {
      expect(balanceAtYear(120000, 6, 30, y)).toBeCloseTo(res.rows[y * 12 - 1].balance, 9);
    }
    expect(balanceAtYear(120000, 6, 30, 30)).toBeCloseTo(0, 6); // 期满归零
  });

  it("0% rate: balance declines linearly (120000/0%/10y, year 3 → 84000 exactly)", () => {
    expect(balanceAtYear(120000, 0, 10, 3)).toBe(84000);
  });

  it("year 0 returns the original loan (nothing paid yet)", () => {
    expect(balanceAtYear(120000, 6, 30, 0)).toBe(120000);
  });

  it("rejects years beyond the term and invalid base parameters", () => {
    expect(balanceAtYear(120000, 6, 30, 31)).toBeNaN();
    expect(balanceAtYear(120000, 6, 30, 30.5)).toBeNaN(); // 小数年
    expect(balanceAtYear(120000, 6, 30, -1)).toBeNaN();
    expect(balanceAtYear(0, 6, 30, 1)).toBeNaN();
    expect(balanceAtYear(120000, -6, 30, 1)).toBeNaN();
    expect(balanceAtYear(120000, 6, 0, 1)).toBeNaN();
    expect(balanceAtYear(120000, 6, 30, NaN)).toBeNaN();
    expect(balanceAtYear(120000, 6, 30, Infinity)).toBeNaN();
  });
});

// ─────────────────────────── dueDateFromLmp / gestationalAgeAt ───────────────────────────

/**
 * 独立核对:用 Date 构造器的溢出滚动(LMP 月/日 + N 天)重新实现 Naegele,
 * 与产品代码的 UTC 毫秒加法互为印证。两种途径代数上恒等(UTC 无时区干扰)。
 */
function independentDue(lmpISO: string, cycleDays: number): { y: number; m: number; d: number } | null {
  const mt = /^(\d{4})-(\d{2})-(\d{2})$/.exec(lmpISO);
  if (!mt) return null;
  const y = Number(mt[1]);
  const m = Number(mt[2]);
  const d = Number(mt[3]);
  const lmp = new Date(Date.UTC(y, m - 1, d));
  // 原始分量必须构成真实日历日(UTC 构造会把 2025-02-30 静默滚到 3 月)
  if (lmp.getUTCFullYear() !== y || lmp.getUTCMonth() !== m - 1 || lmp.getUTCDate() !== d) return null;
  const dt = new Date(lmp.getTime() + (280 + cycleDays - 28) * 86400000);
  return { y: dt.getUTCFullYear(), m: dt.getUTCMonth() + 1, d: dt.getUTCDate() };
}

function isoOf(dt: Date): string {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${dt.getUTCFullYear()}-${p(dt.getUTCMonth() + 1)}-${p(dt.getUTCDate())}`;
}

describe("dueDateFromLmp: Naegele rule (LMP + 280 days)", () => {
  // 经典锚点:2025-01-01 + 280 天 = 2025-10-08(1 月 1 日是第 1 天 → 第 281 天 = 10 月 8 日)
  const res = dueDateFromLmp("2025-01-01", 28)!;

  it("2025-01-01 with a 28-day cycle → 2025-10-08", () => {
    expect(res).not.toBeNull();
    expect(isoOf(res.due)).toBe("2025-10-08");
    expect(res.shift).toBe(0);
  });

  it("full-term window is 37w0d–42w0d: 2025-09-17 through 2025-10-22", () => {
    expect(isoOf(res.termStart)).toBe("2025-09-17"); // 预产期 − 21 天
    expect(isoOf(res.termEnd)).toBe("2025-10-22"); // 预产期 + 14 天
  });

  it("matches an independent Date-constructor implementation across LMPs and cycles", () => {
    const cases: Array<[string, number]> = [
      ["2025-01-01", 28],
      ["2025-01-01", 30],
      ["2025-01-01", 24],
      ["2024-05-10", 28], // 跨闰日(2024-02-29 在窗口内)
      ["2025-01-31", 28], // 月末滚动
      ["2025-08-15", 45],
      ["2025-03-03", 20],
    ];
    for (const [lmp, cycle] of cases) {
      const r = dueDateFromLmp(lmp, cycle)!;
      const expected = independentDue(lmp, cycle)!;
      expect(isoOf(r.due)).toBe(`${expected.y}-${String(expected.m).padStart(2, "0")}-${String(expected.d).padStart(2, "0")}`);
    }
  });
});

describe("dueDateFromLmp: cycle-length shift", () => {
  it("cycle 30 shifts +2 days: 2025-01-01 → 2025-10-10", () => {
    const r = dueDateFromLmp("2025-01-01", 30)!;
    expect(r.shift).toBe(2);
    expect(isoOf(r.due)).toBe("2025-10-10");
  });

  it("cycle 24 shifts −4 days: 2025-01-01 → 2025-10-04", () => {
    const r = dueDateFromLmp("2025-01-01", 24)!;
    expect(r.shift).toBe(-4);
    expect(isoOf(r.due)).toBe("2025-10-04");
  });

  it("handles leap years: 2024-05-10 + 280 days lands on 2025-02-14 (Feb 29 included)", () => {
    const r = dueDateFromLmp("2024-05-10", 28)!;
    expect(isoOf(r.due)).toBe("2025-02-14");
  });

  it("rolls month-end correctly: 2025-01-31 → 2025-11-07", () => {
    // Naegele 快算:1 月 31 日 − 3 月 + 7 天 = 11 月 7 日
    const r = dueDateFromLmp("2025-01-31", 28)!;
    expect(isoOf(r.due)).toBe("2025-11-07");
  });

  it("accepts the 20/45-day cycle boundaries", () => {
    expect(dueDateFromLmp("2025-01-01", 20)).not.toBeNull();
    expect(dueDateFromLmp("2025-01-01", 45)).not.toBeNull();
    expect(isoOf(dueDateFromLmp("2025-01-01", 45)!.due)).toBe("2025-10-25"); // +17 天
    expect(isoOf(dueDateFromLmp("2025-01-01", 20)!.due)).toBe("2025-09-30"); // −8 天,恰好回退到 9 月末
  });

  it("rejects malformed dates, impossible calendar days and out-of-range cycles", () => {
    expect(dueDateFromLmp("", 28)).toBeNull();
    expect(dueDateFromLmp("not-a-date", 28)).toBeNull();
    expect(dueDateFromLmp("2025-13-01", 28)).toBeNull(); // 第 13 月
    expect(dueDateFromLmp("2025-00-10", 28)).toBeNull();
    expect(dueDateFromLmp("2025-02-30", 28)).toBeNull(); // 2 月没有 30 日
    expect(dueDateFromLmp("2025-04-31", 28)).toBeNull(); // 4 月没有 31 日
    expect(dueDateFromLmp("2025-1-1", 28)).toBeNull(); // 非 YYYY-MM-DD
    for (const cycle of [0, 19, 19.5, 46, 28.5, NaN, Infinity, -28]) {
      expect(dueDateFromLmp("2025-01-01", cycle)).toBeNull();
    }
  });
});

describe("gestationalAgeAt: weeks and days from LMP", () => {
  // 锚点:LMP 2025-01-01 → 2025-03-15 相差 73 天 = 孕 10 周 3 天,距预产期 207 天
  const g = gestationalAgeAt("2025-01-01", "2025-03-15")!;

  it("2025-01-01 → 2025-03-15 is 10w3d with 207 days to the due date", () => {
    expect(g.days).toBe(73);
    expect(g.weeks).toBe(10);
    expect(g.remainderDays).toBe(3);
    expect(g.daysUntilDue).toBe(207);
    expect(g.trimester).toBe(1);
  });

  it("same day as LMP is 0w0d with 280 days to go", () => {
    const g0 = gestationalAgeAt("2025-01-01", "2025-01-01")!;
    expect(g0.days).toBe(0);
    expect(g0.weeks).toBe(0);
    expect(g0.remainderDays).toBe(0);
    expect(g0.daysUntilDue).toBe(280);
    expect(g0.trimester).toBe(1);
  });

  it("cross-checks days arithmetic against an independent UTC-day implementation", () => {
    const independentDays = (a: string, b: string) =>
      Math.round((Date.UTC(Number(b.slice(0, 4)), Number(b.slice(5, 7)) - 1, Number(b.slice(8, 10))) -
        Date.UTC(Number(a.slice(0, 4)), Number(a.slice(5, 7)) - 1, Number(a.slice(8, 10)))) / 86400000);
    for (const [lmp, today] of [
      ["2025-01-01", "2025-03-15"],
      ["2025-06-10", "2025-12-25"],
      ["2024-02-20", "2024-08-08"], // 闰年窗口
    ] as Array<[string, string]>) {
      const g = gestationalAgeAt(lmp, today)!;
      expect(g.days).toBe(independentDays(lmp, today));
      expect(g.weeks * 7 + g.remainderDays).toBe(g.days);
    }
  });

  it("trimester boundaries flip at 14w0d (day 98) and 28w0d (day 196)", () => {
    expect(gestationalAgeAt("2025-01-01", "2025-04-08")!.trimester).toBe(1); // day 97
    expect(gestationalAgeAt("2025-01-01", "2025-04-09")!.trimester).toBe(2); // day 98 = 14w0d
    expect(gestationalAgeAt("2025-01-01", "2025-07-15")!.trimester).toBe(2); // day 195
    expect(gestationalAgeAt("2025-01-01", "2025-07-16")!.trimester).toBe(3); // day 196 = 28w0d
  });

  it("past the due date reports negative daysUntilDue but still a valid age", () => {
    const g = gestationalAgeAt("2025-01-01", "2025-10-15")!;
    expect(g.days).toBe(287);
    expect(g.daysUntilDue).toBe(-7);
    expect(g.weeks).toBe(41);
    expect(g.remainderDays).toBe(0);
  });

  it("rejects reversed order, malformed dates and impossible calendar days", () => {
    expect(gestationalAgeAt("2025-03-15", "2025-01-01")).toBeNull(); // today 早于 LMP
    expect(gestationalAgeAt("2025-02-30", "2025-03-15")).toBeNull();
    expect(gestationalAgeAt("2025-01-01", "2025-13-01")).toBeNull();
    expect(gestationalAgeAt("garbage", "2025-03-15")).toBeNull();
    expect(gestationalAgeAt("2025-01-01", "garbage")).toBeNull();
  });
});

// ─────────────────────────── federalTax ───────────────────────────

/**
 * 独立核对:测试内手写 2026 累进分段(阈值硬编码,与产品代码同一来源 IRS
 * Rev. Proc. 2025-32,但实现完全独立),对一系列收入互证。
 */
function piecewiseTax(income: number, status: TaxStatus, deduction: number): number {
  const taxable = Math.max(0, income - deduction);
  const tops = status === "single"
    ? [12400, 50400, 105700, 201775, 256225, 640600]
    : [24800, 100800, 211400, 403550, 512450, 768700];
  const rates = [0.10, 0.12, 0.22, 0.24, 0.32, 0.35, 0.37];
  let lower = 0;
  let tax = 0;
  for (let i = 0; i < rates.length; i++) {
    const upper = i < 6 ? tops[i] : Infinity;
    const span = upper === Infinity ? Infinity : upper - lower;
    tax += Math.max(0, Math.min(taxable - lower, span)) * rates[i];
    lower = upper;
  }
  return tax;
}

function expectNaNTax(res: FederalTaxResult): void {
  expect(res.taxable).toBeNaN();
  expect(res.total).toBeNaN();
  expect(res.marginalRate).toBeNaN();
  expect(res.effectiveRate).toBeNaN();
  expect(res.brackets).toEqual([]);
}

describe("federalTax: reference case (single, 100000 income, 16100 deduction, 2026 brackets)", () => {
  // 应税所得 83900:10%×12400 + 12%×38000 + 22%×33500 = 1240 + 4560 + 7370 = 13170
  const res = federalTax(100000, "single", 16100);

  it("taxes exactly 13170 at a 22% marginal and 13.17% effective rate", () => {
    expect(res.taxable).toBe(83900);
    expect(res.total).toBeCloseTo(13170, 6);
    expect(res.marginalRate).toBe(22);
    expect(res.effectiveRate).toBeCloseTo(13.17, 6);
  });

  it("lists three touched brackets with the taxed amounts 12400 / 38000 / 33500", () => {
    expect(res.brackets.map((b) => b.rate)).toEqual([10, 12, 22]);
    expect(res.brackets.map((b) => b.taxed)).toEqual([12400, 38000, 33500]);
    expect(res.brackets.map((b) => b.tax)).toEqual([1240, 4560, 7370]);
    expect(res.brackets[0].from).toBe(0);
    expect(res.brackets[0].to).toBe(12400);
  });

  it("matches the independent piecewise implementation", () => {
    expect(res.total).toBeCloseTo(piecewiseTax(100000, "single", 16100), 8);
  });
});

describe("federalTax: married status and external anchors", () => {
  // 应税所得 167800:2480 + 9120 + 14740 = 26340
  it("married 200000 with 32200 deduction → 26340 total, 22% marginal, 13.17% effective", () => {
    const res = federalTax(200000, "married", 32200);
    expect(res.taxable).toBe(167800);
    expect(res.total).toBeCloseTo(2480 + 9120 + 14740, 6);
    expect(res.marginalRate).toBe(22);
    expect(res.effectiveRate).toBeCloseTo(13.17, 6);
    expect(res.total).toBeCloseTo(piecewiseTax(200000, "married", 32200), 8);
  });

  it("single, no deduction, taxable exactly at the 37% threshold (640600) → 192979.25, marginal 35 (last dollar is in the 35% bracket)", () => {
    // 1240+4560+12166+23058+17424+134531.25 = 192979.25(与 Bipartisan 公布的 17,966
    // 22% 段累计口径一致);恰好压线时最后一美元仍属 35% 档,多 1 美元才进入 37% 档
    const res = federalTax(640600, "single", 0);
    expect(res.total).toBeCloseTo(192979.25, 4);
    expect(res.marginalRate).toBe(35);
    expect(res.total).toBeCloseTo(piecewiseTax(640600, "single", 0), 8);
    expect(federalTax(640601, "single", 0).marginalRate).toBe(37);
  });

  it("married, no deduction, taxable exactly at the 37% threshold (768700) → 206583.50, marginal 35; one dollar over flips to 37", () => {
    const res = federalTax(768700, "married", 0);
    expect(res.total).toBeCloseTo(206583.5, 4);
    expect(res.marginalRate).toBe(35);
    expect(res.total).toBeCloseTo(piecewiseTax(768700, "married", 0), 8);
    expect(federalTax(768701, "married", 0).marginalRate).toBe(37);
  });

  it("sweeps many incomes against the independent piecewise implementation (both statuses)", () => {
    const incomes = [0, 5000, 16100, 40000, 66500, 100000, 121700, 200000, 217850, 350000, 528550, 656700, 1000000, 2000000];
    for (const status of ["single", "married"] as TaxStatus[]) {
      const ded = STANDARD_DEDUCTION_2026[status];
      for (const income of incomes) {
        const res = federalTax(income, status, ded);
        expect(res.total).toBeCloseTo(piecewiseTax(income, status, ded), 8);
        expect(res.taxable).toBe(Math.max(0, income - ded));
      }
    }
  });

  it("bracket table itself matches the IRS Rev. Proc. 2025-32 thresholds used in this test", () => {
    expect(BRACKETS_2026.single.map((b) => b.rate)).toEqual([10, 12, 22, 24, 32, 35, 37]);
    expect(BRACKETS_2026.single.map((b) => (b.upTo === Infinity ? Infinity : b.upTo)))
      .toEqual([12400, 50400, 105700, 201775, 256225, 640600, Infinity]);
    expect(BRACKETS_2026.married.map((b) => (b.upTo === Infinity ? Infinity : b.upTo)))
      .toEqual([24800, 100800, 211400, 403550, 512450, 768700, Infinity]);
    expect(STANDARD_DEDUCTION_2026.single).toBe(16100);
    expect(STANDARD_DEDUCTION_2026.married).toBe(32200);
  });
});

describe("federalTax: boundaries", () => {
  it("zero income pays zero tax with a zero marginal and effective rate", () => {
    const res = federalTax(0, "single", 16100);
    expect(res.taxable).toBe(0);
    expect(res.total).toBe(0);
    expect(res.marginalRate).toBe(0);
    expect(res.effectiveRate).toBe(0);
    expect(res.brackets).toEqual([]);
  });

  it("income below the deduction leaves zero taxable income (no negative tax)", () => {
    const res = federalTax(10000, "married", 32200);
    expect(res.taxable).toBe(0);
    expect(res.total).toBe(0);
    expect(res.marginalRate).toBe(0);
    expect(res.effectiveRate).toBe(0);
  });

  it("taxable exactly at the 12%-bracket top stays 12% marginal; one dollar over flips to 22%", () => {
    // 收入 66500 − 扣除 16100 = 应税所得恰 50400 → 最后一美元仍在 12% 档
    expect(federalTax(66500, "single", 16100).marginalRate).toBe(12);
    expect(federalTax(66500, "single", 16100).total).toBeCloseTo(1240 + 4560, 6);
    expect(federalTax(66501, "single", 16100).marginalRate).toBe(22);
  });

  it("a huge income at the top bracket stays finite (2,000,000 single)", () => {
    const res = federalTax(2000000, "single", 16100);
    expect(Number.isFinite(res.total)).toBe(true);
    expect(res.marginalRate).toBe(37);
    expect(res.total).toBeCloseTo(piecewiseTax(2000000, "single", 16100), 8);
    expect(res.brackets).toHaveLength(7); // 顶格时 7 档全部触及
  });

  it("deduction of zero taxes the full income", () => {
    const res = federalTax(50000, "single", 0);
    expect(res.taxable).toBe(50000);
    expect(res.total).toBeCloseTo(piecewiseTax(50000, "single", 0), 8);
  });
});

describe("federalTax: invalid inputs yield NaN and empty brackets", () => {
  const invalid: Array<[number, TaxStatus, number]> = [
    [-100000, "single", 16100], // negative income
    [100000, "single", -16100], // negative deduction
    [NaN, "single", 16100],
    [100000, "married", NaN],
    [Infinity, "married", 32200],
    [100000, "single", Infinity],
  ];

  it.each(invalid)("rejects federalTax(%p, %p, %p)", (income, status, deduction) => {
    expectNaNTax(federalTax(income, status, deduction));
  });

  it("rejects an unknown status (cast to bypass the type system, as a hostile caller would)", () => {
    expectNaNTax(federalTax(100000, "head-of-household" as TaxStatus, 16100));
    expectNaNTax(federalTax(100000, undefined as unknown as TaxStatus, 16100));
  });
});

// 类型冒烟:导出的结果形状(防止引擎侧字段改名时静默漂移)
describe("exported result shapes", () => {
  it("carries the documented fields", () => {
    const a: AmortResult = monthlyAmortization(12000, 6, 1);
    expect(Object.keys(a).sort()).toEqual(["monthlyPI", "rows", "totalInterest", "totalPaid"]);
    expect(Object.keys(a.rows[0]).sort()).toEqual(["balance", "interest", "month", "principal"]);

    const d: DueDateResult | null = dueDateFromLmp("2025-01-01", 28);
    expect(Object.keys(d!).sort()).toEqual(["due", "lmp", "shift", "termEnd", "termStart"]);

    const g: GestAge | null = gestationalAgeAt("2025-01-01", "2025-03-15");
    expect(Object.keys(g!).sort()).toEqual(["days", "daysUntilDue", "remainderDays", "trimester", "weeks"]);

    const t: FederalTaxResult = federalTax(100000, "single", 16100);
    expect(Object.keys(t).sort()).toEqual(["brackets", "effectiveRate", "marginalRate", "taxable", "total"]);
    expect(Object.keys(t.brackets[0]).sort()).toEqual(["from", "rate", "tax", "taxed", "to"]);
  });
});
