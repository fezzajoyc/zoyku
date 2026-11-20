import { describe, expect, it } from "vitest";
import {
  PERIODS_PER_YEAR,
  breakEven,
  compound,
  hourlyToSalary,
  inflationAdjusted,
  mortgage,
  mortgageAccelerated,
  mortgagePayment,
  retirementProjection,
  salaryBreakdown,
  type BreakEvenResult,
  type Freq,
  type HourlyBreakdown,
  type InflationResult,
  type RetirementResult,
  type SalaryBreakdown,
} from "@/tools/_lib/finance";

/**
 * 独立核对:期初计入(annuity-due)的封闭公式
 *   FV = P·(1+r)ⁿ + C·(1+r)·((1+r)ⁿ − 1)/r
 * 其中 r = 年利率/每年期数,C = 每期投入。这里在测试内独立实现,
 * 与产品代码的逐期循环互为印证(代数上恒等,浮点误差 < 1e-6)。
 */
function closedFV(
  principal: number,
  perPeriod: number,
  annualRatePct: number,
  ppy: number,
  years: number,
): number {
  const r = annualRatePct / 100 / ppy;
  const n = Math.round(years * ppy);
  const g = Math.pow(1 + r, n);
  return principal * g + perPeriod * (1 + r) * ((g - 1) / r);
}

// Same actual monthly cash flow for every nominal compounding frequency.
// A deposit made at the beginning of month k grows only for the months left.
function monthlyCashFlowFV(p: number, c: number, annual: number, years: number, freq: Freq): number {
  const n = PERIODS_PER_YEAR[freq];
  const factor = Math.pow(1 + annual / 100 / n, n / 12);
  const months = Math.round(years * 12);
  return p * Math.pow(factor, months) + Array.from({ length: months }, (_, k) => c * Math.pow(factor, months - k)).reduce((a, b) => a + b, 0);
}

describe("compound: monthly deposits stay monthly for every compounding frequency", () => {
  it.each(["monthly", "quarterly", "annually"] as Freq[])("%s never prepays a later month's contribution", (freq) => {
    expect(compound(0, 100, 12, 1, freq).total).toBeCloseTo(monthlyCashFlowFV(0, 100, 12, 1, freq), 8);
    expect(compound(2000, 100, 12, 1.5, freq).total).toBeCloseTo(monthlyCashFlowFV(2000, 100, 12, 1.5, freq), 8);
    expect(compound(0, 100, 12, 1.5, freq).contributed).toBe(1800);
  });

  it("more frequent compounding increases growth for the same monthly cash flow", () => {
    const annual = compound(0, 100, 12, 1, "annually");
    const quarterly = compound(0, 100, 12, 1, "quarterly");
    const monthly = compound(0, 100, 12, 1, "monthly");
    expect(annual.total).toBeLessThan(quarterly.total);
    expect(quarterly.total).toBeLessThan(monthly.total);
    expect(monthly.total).toBeCloseTo(1280.932804332895, 8);
    expect([annual, quarterly, monthly].map((r) => r.contributed)).toEqual([1200, 1200, 1200]);
  });
});

describe("compound: reference case (10000 + 100/mo, 5 %, 10 years, monthly)", () => {
  const res = compound(10000, 100, 5, 10, "monthly");

  it("totals 32063.02 within ±0.01", () => {
    expect(Math.abs(res.total - 32063.02)).toBeLessThanOrEqual(0.01);
  });

  it("matches the closed annuity-due formula computed independently in this test", () => {
    const closed = closedFV(10000, 100, 5, PERIODS_PER_YEAR.monthly, 10);
    expect(res.total).toBeCloseTo(closed, 6);
  });

  it("contributes exactly 22000 (principal 10000 + 100 × 120 months)", () => {
    expect(res.contributed).toBe(22000);
  });

  it("earns 10063.02 of interest within ±0.01 (total − contributed)", () => {
    expect(Math.abs(res.total - res.contributed - 10063.02)).toBeLessThanOrEqual(0.01);
  });
});

describe("compound: schedule shape", () => {
  const res = compound(10000, 100, 5, 10, "monthly");

  it("emits one year-end row per year, numbered 1…10", () => {
    expect(res.schedule).toHaveLength(10);
    res.schedule.forEach((row, i) => expect(row.year).toBe(i + 1));
  });

  it("grows contributions linearly: 11200, 12400, …, 22000", () => {
    res.schedule.forEach((row, i) => expect(row.contrib).toBe(10000 + 1200 * (i + 1)));
    expect(res.schedule[0].contrib).toBe(11200);
    expect(res.schedule[9].contrib).toBe(22000);
  });

  it("ends with the last row equal to the totals (balance = total, contrib = contributed)", () => {
    const last = res.schedule[res.schedule.length - 1];
    expect(last.balance).toBe(res.total);
    expect(last.contrib).toBe(res.contributed);
    expect(last.interest).toBeCloseTo(res.total - res.contributed, 9);
  });

  it("has interest ≈ balance − contrib on every row", () => {
    for (const row of res.schedule) {
      expect(row.interest).toBeCloseTo(row.balance - row.contrib, 6);
    }
  });
});

describe("compound: 0 % rate", () => {
  it("returns total = contributed exactly (no interest on money or principal)", () => {
    const res = compound(1000, 50, 0, 2, "monthly");
    expect(res.contributed).toBe(1000 + 50 * 24);
    expect(res.total).toBe(res.contributed);
  });

  it("still produces one year-end row per year with balance = contrib", () => {
    const res = compound(1000, 50, 0, 2, "monthly");
    expect(res.schedule).toHaveLength(2);
    for (const row of res.schedule) expect(row.balance).toBe(row.contrib);
  });

  it("returns the bare principal when there is no contribution either", () => {
    const res = compound(5000, 0, 0, 7, "annually");
    expect(res.total).toBe(5000);
    expect(res.contributed).toBe(5000);
    expect(res.schedule).toHaveLength(7);
  });
});

describe("compound: quarterly frequency", () => {
  // Quarterly nominal growth, with monthly deposits and fractional periods.
  const res = compound(1000, 100, 8, 3, "quarterly");

  it("uses quarterly nominal growth while depositing 100 each month", () => {
    expect(PERIODS_PER_YEAR.quarterly).toBe(4);
    expect(res.contributed).toBe(1000 + 100 * 36);
    expect(res.total).toBeCloseTo(monthlyCashFlowFV(1000, 100, 8, 3, "quarterly"), 6);
  });

  it("emits 3 year-end rows with quarter-scaled contributions 2200, 3400, 4600", () => {
    expect(res.schedule.map((r) => r.year)).toEqual([1, 2, 3]);
    expect(res.schedule.map((r) => r.contrib)).toEqual([2200, 3400, 4600]);
    expect(res.schedule[2].balance).toBe(res.total);
  });
});

describe("compound: annually frequency", () => {
  // Monthly deposits grow for their actual remaining months at 1.06^(1/12).
  const res = compound(5000, 1200, 6, 5, "annually");

  it("deposits 1200 each month and totals 90479.94 without prepaying future months", () => {
    expect(Math.abs(res.total - 90479.94194688583)).toBeLessThanOrEqual(0.01);
    expect(res.total).toBeCloseTo(monthlyCashFlowFV(5000, 1200, 6, 5, "annually"), 8);
  });

  it("emits one row per year with annual contributions 19400…77000", () => {
    expect(res.contributed).toBe(77000);
    expect(res.schedule.map((r) => r.year)).toEqual([1, 2, 3, 4, 5]);
    expect(res.schedule.map((r) => r.contrib)).toEqual([19400, 33800, 48200, 62600, 77000]);
    expect(res.schedule[4].balance).toBe(res.total);
  });
});

describe("compound: boundaries", () => {
  it("accepts 0 principal and grows the annuity alone (total > contributed)", () => {
    const res = compound(0, 100, 5, 1, "monthly");
    expect(res.contributed).toBe(1200);
    expect(res.total).toBeCloseTo(closedFV(0, 100, 5, 12, 1), 8);
    expect(res.total).toBeGreaterThan(res.contributed);
    expect(res.schedule).toHaveLength(1);
  });

  it("accepts 0 contribution and grows the principal alone", () => {
    const res = compound(10000, 0, 5, 10, "monthly");
    expect(res.contributed).toBe(10000);
    expect(res.total).toBeCloseTo(10000 * Math.pow(1 + 0.05 / 12, 120), 6);
    expect(res.schedule).toHaveLength(10);
    for (const row of res.schedule) expect(row.contrib).toBe(10000);
  });

  it("accepts exactly 100 years (1.07¹⁰⁰ ≈ 867.7× growth) with 100 schedule rows", () => {
    const res = compound(1, 0, 7, 100, "annually");
    expect(Number.isFinite(res.total)).toBe(true);
    expect(res.total).toBeCloseTo(Math.pow(1.07, 100), 6);
    expect(res.schedule).toHaveLength(100);
  });
});

describe("compound: invalid inputs yield NaN totals and an empty schedule", () => {
  const invalid: Array<[number, number, number, number, Freq]> = [
    [-1, 100, 5, 10, "monthly"], // negative principal
    [10000, -0.01, 5, 10, "monthly"], // negative contribution
    [10000, 100, -5, 10, "monthly"], // negative rate
    [10000, 100, 5, 0, "monthly"], // zero years
    [10000, 100, 5, -3, "monthly"], // negative years
    [10000, 100, 5, 100.5, "monthly"], // above the 100-year cap
    [NaN, 100, 5, 10, "monthly"],
    [10000, Infinity, 5, 10, "monthly"],
    [10000, 100, NaN, 10, "monthly"],
    [10000, 100, 5, Infinity, "monthly"],
  ];

  it.each(invalid)("rejects compound(%p, %p, %p, %p, %p)", (p, c, r, y, f) => {
    const res = compound(p, c, r, y, f);
    expect(res.total).toBeNaN();
    expect(res.contributed).toBeNaN();
    expect(res.schedule).toEqual([]);
  });
});

// ─────────────────────────── mortgage ───────────────────────────

/**
 * 独立核对:标准固定利率摊销封闭公式
 *   M = L·r·(1+r)ⁿ / ((1+r)ⁿ − 1),r = 年利率/1200,n = 月数。
 * 在测试内独立实现,与产品代码互为印证。
 */
function closedMortgagePI(loan: number, annualRatePct: number, years: number): number {
  const r = annualRatePct / 1200;
  const n = Math.round(years * 12);
  const f = Math.pow(1 + r, n);
  return (loan * r * f) / (f - 1);
}

describe("mortgage: reference case (300k price, 20% down → 240k loan, 6%, 30 years)", () => {
  // 300,000 × 80% = 240,000;r = 0.005,n = 360;
  // 1.005³⁶⁰ ≈ 6.022575212 → M = 240000×0.005×6.022575212/5.022575212 ≈ 1438.9215
  const res = mortgage(240000, 6, 30);

  it("charges a monthly P&I of 1438.92 within ±0.01", () => {
    expect(Math.abs(res.monthlyPI - 1438.92)).toBeLessThanOrEqual(0.01);
  });

  it("matches the closed amortization formula computed independently in this test", () => {
    expect(res.monthlyPI).toBeCloseTo(closedMortgagePI(240000, 6, 30), 6);
  });

  it("uses the pure mortgagePayment() result verbatim", () => {
    expect(res.monthlyPI).toBe(mortgagePayment(240000, 6, 30));
  });

  it("totals 360 payments of P&I: totalPaid = loan + totalInterest ≈ monthlyPI × 360", () => {
    expect(res.totalInterest).toBeCloseTo(res.monthlyPI * 360 - 240000, 4);
    expect(res.totalPaid).toBe(240000 + res.totalInterest);
  });

  it("emits 30 yearly rows whose principal sums to exactly the loan", () => {
    expect(res.schedule).toHaveLength(30);
    const sumPrin = res.schedule.reduce((s, r) => s + r.principal, 0);
    expect(sumPrin).toBeCloseTo(240000, 6);
    const sumInt = res.schedule.reduce((s, r) => s + r.interest, 0);
    expect(sumInt).toBeCloseTo(res.totalInterest, 6);
  });

  it("ends with the balance paid off (final row ≈ 0)", () => {
    const last = res.schedule[res.schedule.length - 1];
    expect(last.balance).toBeCloseTo(0, 6);
  });

  it("starts interest-heavy and ends principal-heavy (amortization crossover)", () => {
    const first = res.schedule[0];
    expect(first.interest).toBeGreaterThan(first.principal);
    const last = res.schedule[res.schedule.length - 1];
    expect(last.principal).toBeGreaterThan(last.interest);
  });
});

describe("mortgage: 0 % rate is a straight split", () => {
  it("divides the loan evenly: monthly = loan / months exactly", () => {
    expect(mortgagePayment(120000, 0, 10)).toBe(1000);
  });

  it("produces a schedule with zero interest and declining balances", () => {
    const res = mortgage(120000, 0, 10);
    for (const row of res.schedule) expect(row.interest).toBe(0);
    expect(res.schedule[0].principal).toBe(12000);
    expect(res.schedule[4].balance).toBe(60000);
    expect(res.totalInterest).toBe(0);
  });
});

describe("mortgage: boundaries", () => {
  it("handles a single-month term (years = 1/12): one payment of loan × (1 + r)", () => {
    const res = mortgage(1000, 12, 1 / 12);
    expect(res.monthlyPI).toBeCloseTo(1010, 6);
    expect(res.schedule).toHaveLength(1);
    expect(res.schedule[0].balance).toBeCloseTo(0, 6);
    expect(res.totalInterest).toBeCloseTo(10, 6);
  });

  it("accepts the 100-year cap and stays finite at a huge 1e9 loan", () => {
    const res = mortgage(1e9, 9, 100);
    expect(Number.isFinite(res.monthlyPI)).toBe(true);
    expect(res.monthlyPI).toBeCloseTo(closedMortgagePI(1e9, 9, 100), 4);
    expect(res.schedule).toHaveLength(100);
  });

  it("rounds fractional years to whole months (10.5 years → 126 payments)", () => {
    const res = mortgage(50000, 5, 10.5);
    expect(res.monthlyPI).toBeCloseTo(closedMortgagePI(50000, 5, 10.5), 6);
    expect(res.schedule).toHaveLength(11); // 126 months = 10 full years + a 6-month stub year
    const last = res.schedule[res.schedule.length - 1];
    expect(last.balance).toBeCloseTo(0, 6);
  });
});

describe("mortgage: invalid inputs yield NaN and an empty schedule", () => {
  const invalid: Array<[number, number, number]> = [
    [0, 6, 30], // zero loan
    [-240000, 6, 30], // negative loan
    [240000, -6, 30], // negative rate
    [240000, 6, 0], // zero years
    [240000, 6, -30], // negative years
    [240000, 6, 100.5], // above the 100-year cap
    [240000, 6, 0.001], // rounds to fewer than 1 month
    [NaN, 6, 30],
    [240000, Infinity, 30],
    [240000, 6, NaN],
  ];

  it.each(invalid)("rejects mortgage(%p, %p, %p)", (loan, rate, years) => {
    const res = mortgage(loan, rate, years);
    expect(res.monthlyPI).toBeNaN();
    expect(res.totalInterest).toBeNaN();
    expect(res.totalPaid).toBeNaN();
    expect(res.schedule).toEqual([]);
    expect(mortgagePayment(loan, rate, years)).toBeNaN();
  });
});

// ─────────────────────────── salary ↔ hourly ───────────────────────────

function expectAllNaN(obj: SalaryBreakdown | HourlyBreakdown): void {
  for (const v of Object.values(obj)) expect(v).toBeNaN();
}

describe("salaryBreakdown: reference case (52000, 40 h/week, 52 weeks)", () => {
  // 52000 / (40 × 52) = 25.00/h;日薪 25×8 = 200;周薪 1000;双周 2000;月薪 4333.33…
  const sb = salaryBreakdown(52000, 40, 52);

  it("gives exactly 25.00 per hour", () => {
    expect(sb.hourly).toBe(25);
  });

  it("derives daily 200, weekly 1000, biweekly 2000 and monthly 4333.33", () => {
    expect(sb.daily).toBe(200);
    expect(sb.weekly).toBe(1000);
    expect(sb.biweekly).toBe(2000);
    expect(sb.monthly).toBeCloseTo(52000 / 12, 9);
  });

  it("leaves the adjusted hourly equal to the base rate when there is no unpaid time off", () => {
    expect(sb.effectiveWeeks).toBe(52);
    expect(sb.adjustedHourly).toBe(sb.hourly);
  });
});

describe("salaryBreakdown: unpaid days off", () => {
  // 10 个无薪工作日 = 2 周 → 有效周数 50;52000 / (40×50) = 26.00
  it("shortens the working year by 1/5 week per day and raises the adjusted hourly", () => {
    const sb = salaryBreakdown(52000, 40, 52, 10);
    expect(sb.effectiveWeeks).toBe(50);
    expect(sb.adjustedHourly).toBe(26);
  });

  it("handles partial weeks (5 days → 51 effective weeks)", () => {
    const sb = salaryBreakdown(52000, 40, 52, 5);
    expect(sb.effectiveWeeks).toBe(51);
    expect(sb.adjustedHourly).toBeCloseTo(52000 / (40 * 51), 9);
  });

  it("defaults the unpaid-days argument to 0 (three-arg call)", () => {
    const sb = salaryBreakdown(52000, 40, 52);
    expect(sb.effectiveWeeks).toBe(52);
    expect(sb.adjustedHourly).toBe(25);
  });

  it("keeps weekly and monthly totals on the quoted salary", () => {
    const sb = salaryBreakdown(52000, 40, 52, 10);
    expect(sb.weekly).toBe(1000);
    expect(sb.monthly).toBeCloseTo(52000 / 12, 9);
  });
});

describe("salaryBreakdown: non-default schedule (60000, 20 h/week, 48 weeks)", () => {
  // 60000/(20×48) = 62.5/h;日薪 62.5×4 = 250;周薪 1250;月薪 5000
  const sb = salaryBreakdown(60000, 20, 48);

  it("gives 62.50 per hour, 250 per day and 5000 per month", () => {
    expect(sb.hourly).toBe(62.5);
    expect(sb.daily).toBe(250);
    expect(sb.monthly).toBe(5000);
  });
});

describe("salaryBreakdown: boundaries and invalid inputs", () => {
  it("accepts the caps: 168 h/week and 52 weeks/year", () => {
    // 168 × 52 = 8736 工时/年,年薪 8736 → 恰好 1.00/小时
    const sb = salaryBreakdown(8736, 168, 52);
    expect(sb.hourly).toBe(1);
    expect(sb.adjustedHourly).toBe(1);
  });

  it("rejects unpaid days of a full year or more (effective weeks ≤ 0)", () => {
    expectAllNaN(salaryBreakdown(52000, 40, 52, 260)); // exactly 52 weeks off
    expectAllNaN(salaryBreakdown(52000, 40, 52, 300)); // more than the year
  });

  const invalid: Array<[number, number, number, number]> = [
    [0, 40, 52, 0], // zero salary
    [-52000, 40, 52, 0], // negative salary
    [52000, 0, 52, 0], // zero hours
    [52000, -40, 52, 0], // negative hours
    [52000, 168.5, 52, 0], // over 168 h/week
    [52000, 40, 0, 0], // zero weeks
    [52000, 40, 52.5, 0], // over 52 weeks
    [52000, 40, 52, -1], // negative unpaid days
    [NaN, 40, 52, 0],
    [52000, Infinity, 52, 0],
    [52000, 40, NaN, 0],
    [52000, 40, 52, NaN],
  ];

  it.each(invalid)("rejects salaryBreakdown(%p, %p, %p, %p)", (a, h, w, d) => {
    expectAllNaN(salaryBreakdown(a, h, w, d));
  });
});

describe("hourlyToSalary: reference case (25/h, 40 h/week, 52 weeks)", () => {
  const hs = hourlyToSalary(25, 40, 52);

  it("gives exactly 52000 per year", () => {
    expect(hs.annual).toBe(52000);
  });

  it("derives daily 200, weekly 1000, biweekly 2000 and monthly 4333.33", () => {
    expect(hs.daily).toBe(200);
    expect(hs.weekly).toBe(1000);
    expect(hs.biweekly).toBe(2000);
    expect(hs.monthly).toBeCloseTo(52000 / 12, 9);
  });

  it("round-trips with salaryBreakdown in both directions", () => {
    const sb = salaryBreakdown(52000, 40, 52);
    expect(hourlyToSalary(sb.hourly, 40, 52).annual).toBe(52000);
    const back = salaryBreakdown(hourlyToSalary(31.25, 32, 50).annual, 32, 50);
    expect(back.hourly).toBeCloseTo(31.25, 9);
  });
});

describe("hourlyToSalary: boundaries and invalid inputs", () => {
  it("accepts a zero rate and yields all zeros", () => {
    const hs = hourlyToSalary(0, 40, 52);
    expect(hs.annual).toBe(0);
    expect(hs.daily).toBe(0);
    expect(hs.weekly).toBe(0);
    expect(hs.biweekly).toBe(0);
    expect(hs.monthly).toBe(0);
  });

  it("stays finite at extreme-but-legal values (1e6/h × 168 h × 52 w)", () => {
    const hs = hourlyToSalary(1e6, 168, 52);
    expect(hs.annual).toBe(1e6 * 168 * 52);
  });

  const invalid: Array<[number, number, number]> = [
    [-25, 40, 52], // negative rate
    [25, 0, 52], // zero hours
    [25, -40, 52], // negative hours
    [25, 168.5, 52], // over 168 h/week
    [25, 40, 0], // zero weeks
    [25, 40, 52.5], // over 52 weeks
    [NaN, 40, 52],
    [25, Infinity, 52],
    [25, 40, NaN],
  ];

  it.each(invalid)("rejects hourlyToSalary(%p, %p, %p)", (r, h, w) => {
    expectAllNaN(hourlyToSalary(r, h, w));
  });
});

// ─────────────────────────── break-even ───────────────────────────

describe("breakEven: reference case (fixed 10000, price 50, variable 30)", () => {
  // 边际贡献 20;BE = 10000/20 = 500 件;收入 25000;利润率 20/50 = 40%
  const res = breakEven(10000, 50, 30);

  it("finds 500 units and 25000 of break-even revenue", () => {
    expect(res.units).toBe(500);
    expect(res.revenue).toBe(25000);
  });

  it("reports a 20 contribution margin at 40 % of price", () => {
    expect(res.contributionMargin).toBe(20);
    expect(res.marginPct).toBeCloseTo(40, 9);
  });

  it("profits −5000 / 0 / +5000 / +10000 at 0.5×, 1×, 1.5×, 2× the break-even volume", () => {
    expect(res.points.map((p) => p.scale)).toEqual([0.5, 1, 1.5, 2]);
    expect(res.points.map((p) => p.units)).toEqual([250, 500, 750, 1000]);
    expect(res.points.map((p) => p.revenue)).toEqual([12500, 25000, 37500, 50000]);
    expect(res.points.map((p) => p.profit)).toEqual([-5000, 0, 5000, 10000]);
  });
});

describe("breakEven: boundaries", () => {
  it("breaks even immediately when fixed costs are zero (all scaled points stay at zero units, zero loss)", () => {
    const res = breakEven(0, 50, 30);
    expect(res.units).toBe(0);
    expect(res.revenue).toBe(0);
    expect(res.points.every((p) => p.units === 0 && p.profit === 0)).toBe(true);
  });

  it("treats a zero variable cost as a 100 % margin", () => {
    const res = breakEven(1000, 40, 0);
    expect(res.contributionMargin).toBe(40);
    expect(res.marginPct).toBeCloseTo(100, 9);
    expect(res.units).toBe(25);
  });

  it("stays finite with a huge fixed cost and a small margin (fixed 1e12, margin 0.5 → 2e12 units)", () => {
    // 10.5 − 10 = 0.5 在二进制里精确,期望值没有浮点歧义
    const res = breakEven(1e12, 10.5, 10);
    expect(res.units).toBe(2e12);
    expect(res.revenue).toBe(2e12 * 10.5);
    expect(res.points.every((p) => Number.isFinite(p.profit))).toBe(true);
  });

  it("handles fractional economics (fixed 1000, price 9.99, variable 3.33)", () => {
    const res = breakEven(1000, 9.99, 3.33);
    expect(res.units).toBeCloseTo(1000 / 6.66, 9);
    expect(res.points[2].profit).toBeCloseTo(0.5 * 1000, 6); // 1.5× → half the fixed costs as profit
  });
});

describe("breakEven: impossible economics and invalid inputs yield NaN with no points", () => {
  function expectBreakEvenNaN(res: BreakEvenResult): void {
    expect(res.units).toBeNaN();
    expect(res.revenue).toBeNaN();
    expect(res.contributionMargin).toBeNaN();
    expect(res.marginPct).toBeNaN();
    expect(res.points).toEqual([]);
  }

  it("says no volume can break even when price equals the variable cost", () => {
    expectBreakEvenNaN(breakEven(10000, 30, 30));
  });

  it("says no volume can break even when price is below the variable cost", () => {
    expectBreakEvenNaN(breakEven(10000, 20, 30));
  });

  const invalid: Array<[number, number, number]> = [
    [-10000, 50, 30], // negative fixed costs
    [10000, 0, 30], // zero price
    [10000, 50, -30], // negative variable cost
    [10000, -50, 30], // negative price
    [NaN, 50, 30],
    [10000, Infinity, 30],
    [10000, 50, NaN],
  ];

  it.each(invalid)("rejects breakEven(%p, %p, %p)", (fixed, price, variable) => {
    expectBreakEvenNaN(breakEven(fixed, price, variable));
  });
});

// ─────────────────────────── mortgageAccelerated ───────────────────────────

describe("mortgageAccelerated: 240k @6%/30y with +200/mo extra", () => {
  const base = mortgage(240000, 6, 30);
  const acc = mortgageAccelerated(240000, 6, 30, 200);

  it("pays off earlier than the 360-month standard plan", () => {
    expect(acc.months).toBeLessThan(360);
    expect(acc.monthsSaved).toBe(360 - acc.months);
    expect(acc.monthsSaved).toBeGreaterThan(0);
  });

  it("saves interest, and the saved amount equals base interest minus accelerated interest", () => {
    expect(acc.totalInterest).toBeLessThan(base.totalInterest);
    expect(acc.interestSaved).toBeCloseTo(base.totalInterest - acc.totalInterest, 6);
    expect(acc.interestSaved).toBeGreaterThan(0);
  });

  it("reconciles month-by-month: every month interest = balance × r and payment = min(monthlyPI + extra, balance + interest)", () => {
    const r = 6 / 1200;
    let bal = 240000;
    let sumInt = 0;
    for (let m = 1; m <= acc.months; m++) {
      const interest = bal * r;
      const pay = Math.min(base.monthlyPI + 200, bal + interest);
      bal = bal + interest - pay;
      sumInt += interest;
    }
    expect(bal).toBeCloseTo(0, 6);
    expect(sumInt).toBeCloseTo(acc.totalInterest, 6);
  });

  it("emits yearly rows whose principal sums to exactly the loan", () => {
    const sumPrin = acc.schedule.reduce((s, r) => s + r.principal, 0);
    expect(sumPrin).toBeCloseTo(240000, 6);
  });

  it("degenerate inputs: zero/negative extra returns all-NaN", () => {
    for (const extra of [0, -50, NaN]) {
      const a = mortgageAccelerated(240000, 6, 30, extra);
      expect(Number.isNaN(a.months)).toBe(true);
      expect(Number.isNaN(a.interestSaved)).toBe(true);
      expect(a.schedule).toHaveLength(0);
    }
  });

  it("a huge extra payment pays off in 1 month with interest = first month's balance × r", () => {
    const a = mortgageAccelerated(240000, 6, 30, 1000000);
    expect(a.months).toBe(1);
    expect(a.totalInterest).toBeCloseTo(240000 * (6 / 1200), 6);
  });
});

// ─────────────────────────── retirementProjection ───────────────────────────

function expectRetirementNaN(res: RetirementResult): void {
  expect(res.years).toBeNaN();
  expect(res.nominalTotal).toBeNaN();
  expect(res.contributed).toBeNaN();
  expect(res.realTotal).toBeNaN();
  expect(res.monthlyWithdrawal).toBeNaN();
  expect(res.schedule).toEqual([]);
}

describe("retirementProjection: reference case (35→60, 50k savings, 500/mo, 6%, 2.5% inflation, 20y payout)", () => {
  // 手算锚点:(1.005)³⁰⁰ ≈ 4.464969812 → 总额 = 50000×4.464969812 + 500×1.005×(3.464969812/0.005) ≈ 571,477.9567
  // 购买力 = 571477.9567 ÷ 1.025²⁵ ≈ 571477.9567 ÷ 1.853944098 ≈ 308,249.8319
  // 月取款 = 571477.9567×0.005×3.310204476 ÷ 2.310204476 ≈ 4,094.2456
  const res = retirementProjection(35, 60, 50000, 500, 6, 2.5, 20);

  it("accumulates 571477.96 at retirement (closed annuity-due anchor)", () => {
    expect(Math.abs(res.nominalTotal - 571477.96)).toBeLessThanOrEqual(0.01);
  });

  it("matches the closed annuity-due formula computed independently in this test", () => {
    expect(res.nominalTotal).toBeCloseTo(closedFV(50000, 500, 6, PERIODS_PER_YEAR.monthly, 25), 6);
  });

  it("contributes exactly 200000 (50000 savings + 500 × 300 months)", () => {
    expect(res.contributed).toBe(200000);
  });

  it("deflates to 308249.83 of today's purchasing power via (1 + i)^years", () => {
    expect(Math.abs(res.realTotal - 308249.83)).toBeLessThanOrEqual(0.01);
    expect(res.realTotal).toBeCloseTo(res.nominalTotal / Math.pow(1.025, 25), 9);
  });

  it("yields a 4094.25 monthly withdrawal identical to mortgagePayment on the fund", () => {
    expect(Math.abs(res.monthlyWithdrawal - 4094.25)).toBeLessThanOrEqual(0.01);
    expect(res.monthlyWithdrawal).toBe(mortgagePayment(res.nominalTotal, 6, 20));
  });

  it("emits 25 yearly rows ending at the total", () => {
    expect(res.schedule).toHaveLength(25);
    expect(res.schedule[0].year).toBe(1);
    expect(res.schedule[24].year).toBe(25);
    expect(res.schedule[24].balance).toBe(res.nominalTotal);
    expect(res.schedule[24].contrib).toBe(res.contributed);
  });
});

describe("retirementProjection: second reference (30→65, 20k savings, 400/mo, 5%, 3% inflation, 25y payout)", () => {
  // 手算锚点:(1 + 0.05/12)⁴²⁰ ≈ 5.6341… → 总额 = 20000×(1+r)⁴²⁰ + 400×(1+r)×((1+r)⁴²⁰−1)/r ≈ 571,004.8263
  // 购买力 = 571004.8263 ÷ 1.03³⁵ ≈ 202,925.6353;月取款 = 571004.8263×r×(1+r)³⁰⁰/((1+r)³⁰⁰−1) ≈ 3,338.0374
  const res = retirementProjection(30, 65, 20000, 400, 5, 3, 25);

  it("accumulates 571004.83 and matches the closed formula", () => {
    expect(Math.abs(res.nominalTotal - 571004.83)).toBeLessThanOrEqual(0.01);
    expect(res.nominalTotal).toBeCloseTo(closedFV(20000, 400, 5, PERIODS_PER_YEAR.monthly, 35), 6);
  });

  it("deflates to 202925.64 in today's money at 3% for 35 years", () => {
    expect(Math.abs(res.realTotal - 202925.64)).toBeLessThanOrEqual(0.01);
  });

  it("yields a 3338.04 monthly withdrawal over 25 payout years", () => {
    expect(Math.abs(res.monthlyWithdrawal - 3338.04)).toBeLessThanOrEqual(0.01);
  });
});

describe("retirementProjection: 0% return is a straight ledger", () => {
  // 手算锚点:40→60 岁、存 120,000、回报 0%、取款 20 年 → 总额 120,000,月取恰好 500。
  const res = retirementProjection(40, 60, 120000, 0, 0, 0, 20);

  it("keeps the total equal to contributions and equal to purchasing power", () => {
    expect(res.nominalTotal).toBe(120000);
    expect(res.contributed).toBe(120000);
    expect(res.realTotal).toBe(120000);
  });

  it("withdraws exactly loan/months = 500 per month", () => {
    expect(res.monthlyWithdrawal).toBe(500);
  });
});

describe("retirementProjection: boundaries", () => {
  it("accepts a zero fund and reports a zero withdrawal instead of NaN", () => {
    const res = retirementProjection(30, 60, 0, 0, 5, 2, 20);
    expect(res.nominalTotal).toBe(0);
    expect(res.contributed).toBe(0);
    expect(res.realTotal).toBe(0);
    expect(res.monthlyWithdrawal).toBe(0);
  });

  it("accepts the caps: ages 0→100 and 20→120 both give 100 years", () => {
    const from0 = retirementProjection(0, 100, 1000, 0, 3, 0, 10);
    expect(from0.years).toBe(100);
    expect(from0.schedule).toHaveLength(100);
    const to120 = retirementProjection(20, 120, 1000, 0, 3, 0, 10);
    expect(to120.years).toBe(100);
  });

  it("with 0% inflation the purchasing power equals the nominal total exactly", () => {
    const res = retirementProjection(35, 60, 10000, 100, 4, 0, 20);
    expect(res.realTotal).toBe(res.nominalTotal);
  });

  it("defaults the inflation and payout arguments (5-arg call)", () => {
    const res = retirementProjection(35, 60, 10000, 100, 4);
    expect(res.realTotal).toBe(res.nominalTotal);
    expect(res.monthlyWithdrawal).toBe(mortgagePayment(res.nominalTotal, 4, 20));
  });
});

describe("retirementProjection: invalid inputs yield all-NaN and an empty schedule", () => {
  const invalid: Array<[number, number, number, number, number, number, number]> = [
    [35, 35, 50000, 500, 6, 2.5, 20], // retire age equals current age
    [35, 30, 50000, 500, 6, 2.5, 20], // retire age below current age
    [-1, 60, 50000, 500, 6, 2.5, 20], // negative current age
    [101, 120, 50000, 500, 6, 2.5, 20], // current age over 100
    [30, 121, 50000, 500, 6, 2.5, 20], // retire age over 120
    [10, 120, 50000, 500, 6, 2.5, 20], // accumulation longer than 100 years
    [35, 60, -50000, 500, 6, 2.5, 20], // negative savings
    [35, 60, 50000, -500, 6, 2.5, 20], // negative contribution
    [35, 60, 50000, 500, -6, 2.5, 20], // negative return
    [35, 60, 50000, 500, 6, -2.5, 20], // negative inflation
    [35, 60, 50000, 500, 6, 2.5, 0], // zero payout years
    [35, 60, 50000, 500, 6, 2.5, 101], // payout years over the 100 cap
    [NaN, 60, 50000, 500, 6, 2.5, 20],
    [35, Infinity, 50000, 500, 6, 2.5, 20],
    [35, 60, 50000, NaN, 6, 2.5, 20],
    [35, 60, 50000, 500, 6, NaN, 20],
    [35, 60, 50000, 500, 6, 2.5, NaN],
  ];

  it.each(invalid)("rejects retirementProjection(%p, %p, %p, %p, %p, %p, %p)", (a, b, s, m, r, i, w) => {
    expectRetirementNaN(retirementProjection(a, b, s, m, r, i, w));
  });
});

// ─────────────────────────── inflationAdjusted ───────────────────────────

function expectInflationNaN(res: InflationResult): void {
  expect(res.futureCost).toBeNaN();
  expect(res.realValue).toBeNaN();
  expect(res.cumulativeInflationPct).toBeNaN();
  expect(res.schedule).toEqual([]);
}

describe("inflationAdjusted: reference case (100 at 3% for 10 years)", () => {
  // 手算锚点:(1.03)¹⁰ = 1.343916379344 → 未来成本 134.391638,累计通胀 34.391638%,购买力 74.409391
  const res = inflationAdjusted(100, 3, 10);

  it("prices the same basket at 134.39 after 10 years", () => {
    expect(Math.abs(res.futureCost - 134.391638)).toBeLessThanOrEqual(0.0001);
    expect(res.futureCost).toBe(100 * Math.pow(1.03, 10));
  });

  it("reports 34.39% cumulative inflation (compounding, not 10 × 3%)", () => {
    expect(Math.abs(res.cumulativeInflationPct - 34.391638)).toBeLessThanOrEqual(0.0001);
    expect(res.cumulativeInflationPct).toBeGreaterThan(30); // > the naive 10 × 3% sum
  });

  it("deflates to 74.41 of purchasing power, and cost × value returns the squared principal", () => {
    expect(Math.abs(res.realValue - 74.409391)).toBeLessThanOrEqual(0.0001);
    expect(res.futureCost * res.realValue).toBeCloseTo(100 * 100, 9);
  });

  it("emits 10 yearly rows whose factors compound consistently", () => {
    expect(res.schedule).toHaveLength(10);
    expect(res.schedule[0].cost).toBe(103);
    expect(res.schedule[9].cost).toBe(res.futureCost);
    for (const row of res.schedule) {
      expect(row.cost).toBeCloseTo(100 * Math.pow(1.03, row.year), 9);
      expect(row.value).toBeCloseTo(100 / Math.pow(1.03, row.year), 9);
    }
  });
});

describe("inflationAdjusted: deflation (100 at −2% for 5 years)", () => {
  // 手算锚点:(0.98)⁵ = 0.9039207968 → 未来成本 90.392080,累计通胀 −9.607920%,购买力 110.629162
  const res = inflationAdjusted(100, -2, 5);

  it("makes the basket cheaper and money stronger", () => {
    expect(Math.abs(res.futureCost - 90.39208)).toBeLessThanOrEqual(0.0001);
    expect(Math.abs(res.cumulativeInflationPct - (-9.60792))).toBeLessThanOrEqual(0.0001);
    expect(Math.abs(res.realValue - 110.629162)).toBeLessThanOrEqual(0.0001);
  });

  it("keeps the cost × value invariant under deflation too", () => {
    expect(res.futureCost * res.realValue).toBeCloseTo(100 * 100, 9);
    for (const row of res.schedule) expect(row.cost * row.value).toBeCloseTo(100 * 100, 9);
  });
});

describe("inflationAdjusted: boundaries", () => {
  it("at 0% inflation nothing moves and every row repeats the amount", () => {
    const res = inflationAdjusted(250, 0, 15);
    expect(res.futureCost).toBe(250);
    expect(res.realValue).toBe(250);
    expect(res.cumulativeInflationPct).toBe(0);
    expect(res.schedule).toHaveLength(15);
    for (const row of res.schedule) {
      expect(row.cost).toBe(250);
      expect(row.value).toBe(250);
    }
  });

  it("accepts zero amount (everything stays zero) and deep deflation down to −99.9%", () => {
    const zero = inflationAdjusted(0, 3, 10);
    expect(zero.futureCost).toBe(0);
    expect(zero.realValue).toBe(0);
    expect(zero.schedule).toHaveLength(10);
    const deep = inflationAdjusted(100, -99.9, 2);
    expect(Number.isFinite(deep.futureCost)).toBe(true);
    expect(deep.futureCost).toBeCloseTo(100 * Math.pow(0.001, 2), 9);
  });

  it("accepts the 100-year cap with 100 rows", () => {
    const res = inflationAdjusted(1000, 2, 100);
    expect(res.schedule).toHaveLength(100);
    expect(res.schedule[99].cost).toBe(res.futureCost);
    expect(Number.isFinite(res.realValue)).toBe(true);
  });

  it("rounds fractional years to whole years (10.5 → 11 rows and 11-year factor)", () => {
    const res = inflationAdjusted(100, 3, 10.5);
    expect(res.schedule).toHaveLength(11);
    expect(res.futureCost).toBeCloseTo(100 * Math.pow(1.03, 11), 9);
  });
});

describe("inflationAdjusted: invalid inputs yield all-NaN and an empty schedule", () => {
  const invalid: Array<[number, number, number]> = [
    [-100, 3, 10], // negative amount
    [100, -100, 10], // rate −100 makes the multiplier zero
    [100, -101, 10], // below −100 makes it negative
    [100, 3, 0], // zero years
    [100, 3, -5], // negative years
    [100, 3, 101], // above the 100-year cap
    [NaN, 3, 10],
    [100, Infinity, 10],
    [100, 3, NaN],
  ];

  it.each(invalid)("rejects inflationAdjusted(%p, %p, %p)", (amount, rate, years) => {
    expectInflationNaN(inflationAdjusted(amount, rate, years));
  });
});

// ─────────────────────────── auto loan (reuses mortgage functions) ───────────────────────────

describe("auto loan anchor: $30k car, 20% down → $24k financed, 6%, 60 months", () => {
  // 车贷直接复用 mortgagePayment/mortgage:期限以月计,months/12 传入后 Math.round 还原精确月数。
  // 手算锚点:(1.005)⁶⁰ = 1.348850153 → 月供 = 24000×0.005×1.348850153/0.348850153 ≈ 463.987237
  const loan = 30000 - (30000 * 20) / 100;
  const res = mortgage(loan, 6, 60 / 12);

  it("charges a 463.99 monthly payment via the standard amortization formula", () => {
    expect(Math.abs(res.monthlyPI - 463.99)).toBeLessThanOrEqual(0.01);
    expect(res.monthlyPI).toBeCloseTo(closedMortgagePI(24000, 6, 5), 6);
    expect(res.monthlyPI).toBe(mortgagePayment(24000, 6, 5));
  });

  it("costs 3839.23 of interest, with monthlyPI × 360/60 reconciling exactly", () => {
    expect(Math.abs(res.totalInterest - 3839.23)).toBeLessThanOrEqual(0.01);
    expect(res.totalInterest).toBeCloseTo(res.monthlyPI * 60 - 24000, 6);
    expect(res.totalPaid).toBe(24000 + res.totalInterest);
  });

  it("emits 5 yearly rows whose principal sums to the loan and ends at zero", () => {
    expect(res.schedule).toHaveLength(5);
    const sumPrin = res.schedule.reduce((s, r) => s + r.principal, 0);
    expect(sumPrin).toBeCloseTo(24000, 6);
    expect(res.schedule[4].balance).toBeCloseTo(0, 6);
    // On a short loan each month is already principal-heavy, but the amortization
    // shape still holds: yearly interest strictly declines, yearly principal rises.
    for (let y = 1; y < 5; y++) {
      expect(res.schedule[y].interest).toBeLessThan(res.schedule[y - 1].interest);
      expect(res.schedule[y].principal).toBeGreaterThan(res.schedule[y - 1].principal);
    }
  });
});

describe("auto loan: odd month counts and 0% dealer financing", () => {
  it("handles a 42-month term (3.5 years → exactly 42 payments of 645.94 at 7%)", () => {
    // 手算锚点:r = 7/1200,(1+r)⁴² = 1.27721… → 月供 = 24000×r×(1+r)⁴²/((1+r)⁴²−1) ≈ 645.940821
    const res = mortgage(24000, 7, 42 / 12);
    expect(Math.abs(res.monthlyPI - 645.940821)).toBeLessThanOrEqual(0.01);
    expect(res.monthlyPI).toBeCloseTo(closedMortgagePI(24000, 7, 3.5), 6);
    expect(res.schedule).toHaveLength(4); // year-end rows at months 12/24/36 + the 42-month stub
    expect(res.schedule[3].balance).toBeCloseTo(0, 6);
  });

  it("0% dealer financing splits the balance evenly: 24000 over 60 months = 400", () => {
    expect(mortgagePayment(24000, 0, 60 / 12)).toBe(400);
    const res = mortgage(24000, 0, 60 / 12);
    expect(res.totalInterest).toBe(0);
    expect(res.schedule.every((row) => row.interest === 0)).toBe(true);
  });

  it("a down payment covering the full price leaves no financeable loan (NaN, honest empty table)", () => {
    const res = mortgage(30000 - 30000, 6, 60 / 12);
    expect(res.monthlyPI).toBeNaN();
    expect(res.schedule).toEqual([]);
  });
});
