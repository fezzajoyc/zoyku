/**
 * 逐月摊销表纯逻辑(月级,区别于 finance.mortgage 的年级汇总)。
 * 标准固定利率摊销:每月利息 = 上月余额 × r,r = 年利率/1200;
 * 月供 M 由公式 M = L·r·(1+r)ⁿ / ((1+r)ⁿ − 1) 给出,最后一期封顶还清。
 * 非法输入(负数/NaN/Inf/年限越界)返回 NaN、rows 为空,与 finance.ts 的约定一致。
 */

export type AmortRow = { month: number; principal: number; interest: number; balance: number };

export type AmortResult = {
  rows: AmortRow[];
  monthlyPI: number;
  totalInterest: number;
  totalPaid: number;
};

const AMORT_NAN: AmortResult = { rows: [], monthlyPI: NaN, totalInterest: NaN, totalPaid: NaN };

/**
 * 逐月摊销表:每月一行(月号、当月本金、当月利息、月末余额)。
 *
 * 手算锚点:loan 12,000,年利率 6%,期限 1 年 → r = 0.005,n = 12,
 * 1.005¹² ≈ 1.0616778119 → M = 12000×0.005×1.0616778119/(1.0616778119−1) ≈ 1032.80;
 * 第 1 个月利息 = 12000×0.005 = 60,本金 = 972.80,月末余额 = 11027.20;
 * 12 个月合计利息 ≈ 393.57,期末余额归零。
 *
 * loan > 0;annualRatePct ≥ 0;years > 0 且 ≤ 100(与 finance.mortgage 一致),
 * 分数年按 Math.round(years × 12) 取整为月数;任一参数非法时所有字段为 NaN、rows 为空。
 */
export function monthlyAmortization(loan: number, annualRatePct: number, years: number): AmortResult {
  const valid =
    Number.isFinite(loan) && loan > 0 &&
    Number.isFinite(annualRatePct) && annualRatePct >= 0 &&
    Number.isFinite(years) && years > 0 && years <= 100;
  if (!valid) return AMORT_NAN;
  const n = Math.round(years * 12);
  if (n < 1) return AMORT_NAN;
  const r = annualRatePct / 1200;
  const f = Math.pow(1 + r, n);
  const monthlyPI = r === 0 ? loan / n : (loan * r * f) / (f - 1);

  let bal = loan;
  let sumInt = 0;
  const rows: AmortRow[] = [];
  for (let m = 1; m <= n; m++) {
    const interest = bal * r;
    let principal = monthlyPI - interest;
    if (principal > bal) principal = bal; // 最后一期封顶,余额精确归零
    bal -= principal;
    sumInt += interest;
    rows.push({ month: m, principal, interest, balance: Math.max(bal, 0) });
  }
  return { rows, monthlyPI, totalInterest: sumInt, totalPaid: loan + sumInt };
}

/**
 * 第 year 个整年结束时的贷款余额(即第 year×12 期还款后的余额;
 * 期满当年返回 ≈ 0 的余额)。参数合法性同 monthlyAmortization。
 *
 * 手算锚点:loan 120,000,年利率 6%,期限 30 年,第 5 年末 →
 * 月供 719.46;B₆₀ = 120000×1.005⁶⁰ − 719.46×(1.005⁶⁰−1)/0.005 ≈ 111,665.26
 * (1.005⁶⁰ ≈ 1.34884997)。
 *
 * year 必须是 0…years 范围内的整数(小数年/越界/基础参数非法一律 NaN);
 * year = 0 表示尚未开始还款,返回原始本金。
 */
export function balanceAtYear(loan: number, annualRatePct: number, years: number, year: number): number {
  const res = monthlyAmortization(loan, annualRatePct, years);
  if (!Number.isFinite(res.monthlyPI)) return NaN;
  if (!Number.isInteger(year) || year < 0 || year > years) return NaN;
  const idx = Math.min(year * 12, res.rows.length) - 1;
  if (idx < 0) return loan; // 0 年 = 还没开始还,余额就是本金
  return res.rows[idx].balance;
}
