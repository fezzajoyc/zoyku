import { describe, expect, it } from "vitest";
import {
  PERIODS_PER_YEAR,
  breakEven,
  compound,
  hourlyToSalary,
  mortgage,
  mortgageAccelerated,
  mortgagePayment,
  salaryBreakdown,
  type BreakEvenResult,
  type Freq,
  type HourlyBreakdown,
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

function perPeriodOf(monthly: number, freq: Freq): number {
  return monthly * (12 / PERIODS_PER_YEAR[freq]);
}

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
  // 独立核对:r = 8 %/4 = 2 %/季,每期投入 = 100 × 3 = 300,n = 12 期
  const res = compound(1000, 100, 8, 3, "quarterly");

  it("charges once per quarter: n = years × 4 periods, contributing 300 per quarter", () => {
    expect(PERIODS_PER_YEAR.quarterly).toBe(4);
    expect(res.contributed).toBe(1000 + 100 * 36);
    expect(res.total).toBeCloseTo(closedFV(1000, 300, 8, 4, 3), 6);
  });

  it("emits 3 year-end rows with quarter-scaled contributions 2200, 3400, 4600", () => {
    expect(res.schedule.map((r) => r.year)).toEqual([1, 2, 3]);
    expect(res.schedule.map((r) => r.contrib)).toEqual([2200, 3400, 4600]);
    expect(res.schedule[2].balance).toBe(res.total);
  });
});

describe("compound: annually frequency", () => {
  // 独立手算:每年一次性投入 12 个月份 14400;r = 6 %,n = 5 期。
  // 1.06⁵ = 1.3382255776(十进制精确)→ FV = 5000×1.3382255776 + 14400×1.06×(0.3382255776/0.06) = 92735.71482944
  const res = compound(5000, 1200, 6, 5, "annually");

  it("deposits a full year (12 × monthly) once per year and totals 92735.71", () => {
    expect(Math.abs(res.total - 92735.71482944)).toBeLessThanOrEqual(0.01);
    expect(res.total).toBeCloseTo(closedFV(5000, perPeriodOf(1200, "annually"), 6, 1, 5), 8);
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
