"use client";
import { parseLocaleNumber } from "../_lib/numparse";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import { Field, NumIn, Note, Sel, Stats, TableBox, fmt, fmtMoney, pick } from "./calc-ui";

/**
 * Shared engine for EMI and loan repayment: standard reducing-balance EMI
 * formula, with a yearly amortization schedule for the loan variant.
 * props.kind = "emi" | "loan".
 */

const S = {
  principal: { en: "Loan amount", zh: "贷款金额", ja: "借入額", es: "Importe del préstamo", pt: "Valor do empréstimo" },
  rate: { en: "Annual interest rate (%)", zh: "年利率 (%)", ja: "年利 (%)", es: "Tasa de interés anual (%)", pt: "Taxa de juros anual (%)" },
  tenure: { en: "Tenure", zh: "期限", ja: "期間", es: "Plazo", pt: "Prazo" },
  years: { en: "years", zh: "年", ja: "年", es: "años", pt: "anos" },
  months: { en: "months", zh: "个月", ja: "か月", es: "meses", pt: "meses" },
  emi: { en: "Monthly payment (EMI)", zh: "月供 (EMI)", ja: "月々の返済額 (EMI)", es: "Cuota mensual (EMI)", pt: "Parcela mensal (EMI)" },
  interest: { en: "Total interest", zh: "总利息", ja: "総利息", es: "Interés total", pt: "Total de juros" },
  pay: { en: "Total payment", zh: "还款总额", ja: "返済総額", es: "Pago total", pt: "Total pago" },
  year: { en: "Year", zh: "年份", ja: "年", es: "Año", pt: "Ano" },
  prinPaid: { en: "Principal paid", zh: "已还本金", ja: "返済元本", es: "Capital pagado", pt: "Principal pago" },
  intPaid: { en: "Interest paid", zh: "已还利息", ja: "支払利息", es: "Interés pagado", pt: "Juros pagos" },
  balance: { en: "Balance", zh: "剩余本金", ja: "残高", es: "Saldo", pt: "Saldo devedor" },
  schedule: { en: "Yearly amortization schedule", zh: "年度还款计划表", ja: "年次返済スケジュール", es: "Tabla de amortización anual", pt: "Tabela de amortização anual" },
};

function num(s: string): number {
  const n = parseLocaleNumber(s);
  return Number.isFinite(n) ? n : NaN;
}

/** Standard EMI: P·r·(1+r)^n / ((1+r)^n − 1), r = monthly rate. */
function emiOf(p: number, annualRate: number, nMonths: number): number {
  const r = annualRate / 1200;
  if (nMonths < 1) return NaN;
  if (r === 0) return p / nMonths;
  const f = Math.pow(1 + r, nMonths);
  return (p * r * f) / (f - 1);
}

export function CalcEngineLoan({ kind }: { kind: string }) {
  const { locale } = useI18n();
  const isLoan = kind === "loan";
  const [principal, setPrincipal] = useState("500000");
  const [rate, setRate] = useState("8.5");
  const [tenure, setTenure] = useState("20");
  const [unit, setUnit] = useState("years");

  const p = num(principal);
  const annual = num(rate);
  const t = num(tenure);
  const nMonths = Number.isFinite(t) ? Math.round(unit === "years" ? t * 12 : t) : NaN;

  const schedule = useMemo(() => {
    if (!Number.isFinite(p) || p <= 0 || !Number.isFinite(annual) || annual < 0 || !Number.isFinite(nMonths) || nMonths < 1) {
      return [];
    }
    const emi = emiOf(p, annual, nMonths);
    const r = annual / 1200;
    let bal = p;
    const rows: { year: number; prin: number; int: number; bal: number }[] = [];
    let yPrin = 0;
    let yInt = 0;
    for (let m = 1; m <= nMonths; m++) {
      const interest = bal * r;
      let prin = emi - interest;
      if (prin > bal) prin = bal;
      bal -= prin;
      yPrin += prin;
      yInt += interest;
      if (m % 12 === 0 || m === nMonths) {
        rows.push({ year: Math.ceil(m / 12), prin: yPrin, int: yInt, bal: Math.max(bal, 0) });
        yPrin = 0;
        yInt = 0;
      }
    }
    return rows;
  }, [p, annual, nMonths]);

  const emi = Number.isFinite(p) && Number.isFinite(annual) && Number.isFinite(nMonths) ? emiOf(p, annual, nMonths) : NaN;
  const totalPay = Number.isFinite(emi) && Number.isFinite(nMonths) ? emi * nMonths : NaN;
  const totalInt = Number.isFinite(totalPay) ? totalPay - p : NaN;
  const symbol = "₹";

  return (
    <ToolPanel>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={pick(locale, S.principal)}>
          <NumIn value={principal} onChange={setPrincipal} aria="loan amount" />
        </Field>
        <Field label={pick(locale, S.rate)}>
          <NumIn value={rate} onChange={setRate} aria="annual rate" />
        </Field>
        <Field label={pick(locale, S.tenure)}>
          <NumIn value={tenure} onChange={setTenure} aria="tenure" />
        </Field>
        <Field label=" ">
          <Sel value={unit} onChange={setUnit} aria="tenure unit">
            <option value="years">{pick(locale, S.years)}</option>
            <option value="months">{pick(locale, S.months)}</option>
          </Sel>
        </Field>
      </div>
      <div className="mt-5">
        <Stats
          items={[
            { label: pick(locale, S.emi), value: fmtMoney(emi, locale, symbol), tone: "accent" },
            { label: pick(locale, S.interest), value: fmtMoney(totalInt, locale, symbol) },
            { label: pick(locale, S.pay), value: fmtMoney(totalPay, locale, symbol), tone: "good" },
          ]}
        />
      </div>
      <div className="mt-3">
        <Note>
          {pick(locale, {
            en: "EMI = P × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1) — the standard reducing-balance formula used by banks, where r is the monthly rate and n the number of months.",
            zh: "EMI = P × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1),即银行通用的等额本息(余额递减)公式,r 为月利率,n 为期数。",
            ja: "EMI = P × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1)。銀行で使われる標準的な残高スライド式の公式で、r は月利、n は返済回数です。",
            es: "EMI = P × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1), la fórmula estándar de saldo decreciente que usan los bancos, donde r es la tasa mensual y n el número de cuotas.",
            pt: "EMI = P × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1) — a fórmula padrão de saldo decrescente usada pelos bancos, onde r é a taxa mensal e n o número de parcelas.",
          })}
        </Note>
      </div>
      {isLoan && schedule.length > 0 && (
        <div className="mt-7">
          <h3 className="mb-3 text-[15px] font-semibold">{pick(locale, S.schedule)}</h3>
          <TableBox
            head={[pick(locale, S.year), pick(locale, S.prinPaid), pick(locale, S.intPaid), pick(locale, S.balance)]}
            rows={schedule.map((row) => [
              row.year,
              fmt(row.prin, locale, 0),
              fmt(row.int, locale, 0),
              fmt(row.bal, locale, 0),
            ])}
          />
        </div>
      )}
    </ToolPanel>
  );
}
