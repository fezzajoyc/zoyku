/**
 * 美国联邦个人所得税简化计算(逐档累进)。
 * 口径:应税所得 = 收入 − 扣除额(下限 0);各档税额 = 落在该档内的应税所得 × 档率;
 * 总税额 = 各档之和;边际税率 = 最后一美元落在的档率;有效税率 = 总税额 ÷ 税前收入。
 *
 * 税级表:2026 税年(IRS Rev. Proc. 2025-32 公布的通胀调整值),仅覆盖
 * single 与 married filing jointly 两种申报状态。示例口径,仅供规划参考:
 * 实际报税以 IRS 最新公布为准,且真实税负还受抵免、州税、资本利得等影响。
 */

export type TaxStatus = "single" | "married";

/** 2026 税年逐档上限(应税所得,美元),最后一档为无穷大。示例口径,以 IRS 最新公布为准。 */
export const BRACKETS_2026: Record<TaxStatus, { rate: number; upTo: number }[]> = {
  single: [
    { rate: 10, upTo: 12400 },
    { rate: 12, upTo: 50400 },
    { rate: 22, upTo: 105700 },
    { rate: 24, upTo: 201775 },
    { rate: 32, upTo: 256225 },
    { rate: 35, upTo: 640600 },
    { rate: 37, upTo: Infinity },
  ],
  married: [
    { rate: 10, upTo: 24800 },
    { rate: 12, upTo: 100800 },
    { rate: 22, upTo: 211400 },
    { rate: 24, upTo: 403550 },
    { rate: 32, upTo: 512450 },
    { rate: 35, upTo: 768700 },
    { rate: 37, upTo: Infinity },
  ],
};

/** 2026 税年标准扣除额(供引擎预填 UI 用;示例口径)。 */
export const STANDARD_DEDUCTION_2026: Record<TaxStatus, number> = {
  single: 16100,
  married: 32200,
};

export type TaxBracketRow = {
  /** 档率(%) */
  rate: number;
  /** 本档应税所得下限(美元) */
  from: number;
  /** 本档应税所得上限(美元,最后一档为 null 表示无穷) */
  to: number | null;
  /** 落在本档内的应税所得(美元) */
  taxed: number;
  /** 本档税额(美元) */
  tax: number;
};

export type FederalTaxResult = {
  /** 应税所得 = max(0, 收入 − 扣除额) */
  taxable: number;
  /** 总税额 */
  total: number;
  /** 边际税率(%):应税所得为 0 时为 0 */
  marginalRate: number;
  /** 有效税率(%):总税额 ÷ 税前收入;收入为 0 时为 0 */
  effectiveRate: number;
  /** 逐档明细(只含有税额 > 0 或 touched 的档,按税率升序) */
  brackets: TaxBracketRow[];
};

const TAX_NAN: FederalTaxResult = {
  taxable: NaN, total: NaN, marginalRate: NaN, effectiveRate: NaN, brackets: [],
};

/**
 * 联邦个税简化计算。
 *
 * 手算锚点(2026 税级,single):收入 100,000,扣除 16,100 →
 * 应税所得 83,900;税 = 10%×12,400 + 12%×38,000 + 22%×33,500
 * = 1,240 + 4,560 + 7,370 = 13,170;边际 22%,有效 13.17%。
 *
 * income ≥ 0;deduction ≥ 0;status ∈ {single, married};
 * 任一参数非法(负数/NaN/Inf/未知状态)时所有字段为 NaN、brackets 为空。
 */
export function federalTax(income: number, status: TaxStatus, deduction: number): FederalTaxResult {
  const bracketsTable = BRACKETS_2026[status];
  const valid =
    Number.isFinite(income) && income >= 0 &&
    Number.isFinite(deduction) && deduction >= 0 &&
    Array.isArray(bracketsTable);
  if (!valid) return TAX_NAN;

  const taxable = Math.max(0, income - deduction);
  const rows: TaxBracketRow[] = [];
  let lower = 0;
  let total = 0;
  let marginalRate = 0;
  for (const b of bracketsTable) {
    const span = b.upTo === Infinity ? Infinity : b.upTo - lower;
    const taxed = Math.max(0, Math.min(taxable - lower, span));
    const tax = taxed * (b.rate / 100);
    if (taxed > 0) {
      rows.push({
        rate: b.rate,
        from: lower,
        to: b.upTo === Infinity ? null : b.upTo,
        taxed,
        tax,
      });
      marginalRate = b.rate;
    }
    total += tax;
    lower = b.upTo;
  }
  const effectiveRate = income > 0 ? (total / income) * 100 : 0;
  return { taxable, total, marginalRate, effectiveRate, brackets: rows };
}
