"use client";
import { parseLocaleNumber } from "../_lib/numparse";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import { Field, NumIn, Note, Sel, Stats, TableBox, fmtMoney, pick } from "./calc-ui";
import { compound, type Freq } from "../_lib/finance";

/**
 * Compound interest with regular monthly contributions.
 * Periodic rate r = annual / periods_per_year; per period the contributions
 * made during that period are deposited first, then interest accrues:
 *   FV ← (FV + contribution_per_period) × (1 + r)
 * Deposits land at the start of each period (annuity-due), which is what the
 * recursion above says — stated honestly in the FAQ.
 */

const CURRENCIES: Record<string, { symbol: string; frac: number }> = {
  USD: { symbol: "$", frac: 2 },
  EUR: { symbol: "€", frac: 2 },
  CNY: { symbol: "¥", frac: 2 },
  JPY: { symbol: "¥", frac: 0 },
  BRL: { symbol: "R$", frac: 2 },
};

const S = {
  principal: { en: "Initial deposit", zh: "初始存入", ja: "初期預入額", es: "Depósito inicial", pt: "Depósito inicial" },
  monthly: { en: "Monthly contribution", zh: "每月定投", ja: "毎月の積立額", es: "Aporte mensual", pt: "Aporte mensal" },
  rate: { en: "Annual interest rate (%)", zh: "年利率 (%)", ja: "年利 (%)", es: "Tasa anual (%)", pt: "Taxa anual (%)" },
  years: { en: "Years", zh: "年数", ja: "年数", es: "Años", pt: "Anos" },
  freq: { en: "Compounding", zh: "复利频率", ja: "複利の頻度", es: "Capitalización", pt: "Capitalização" },
  currency: { en: "Currency", zh: "币种", ja: "通貨", es: "Moneda", pt: "Moeda" },
  balance: { en: "Final balance", zh: "期末总额", ja: "最終残高", es: "Saldo final", pt: "Saldo final" },
  contrib: { en: "Total contributed", zh: "累计投入", ja: "累計投入額", es: "Total aportado", pt: "Total aportado" },
  interest: { en: "Interest earned", zh: "累计利息", ja: "受取利息", es: "Intereses ganados", pt: "Juros ganados" },
  year: { en: "Year", zh: "年份", ja: "年", es: "Año", pt: "Ano" },
  thContrib: { en: "Contributed", zh: "已投入", ja: "投入累計", es: "Aportado", pt: "Aportado" },
  thInterest: { en: "Interest", zh: "利息", ja: "利息", es: "Intereses", pt: "Juros" },
  thBalance: { en: "Balance", zh: "余额", ja: "残高", es: "Saldo", pt: "Saldo" },
  table: { en: "Year-by-year growth", zh: "逐年增长明细", ja: "年ごとの推移", es: "Crecimiento año por año", pt: "Crescimento ano a ano" },
};

function num(s: string): number {
  const n = parseLocaleNumber(s);
  return Number.isFinite(n) ? n : NaN;
}

export function CalcEngineCompound() {
  const { locale } = useI18n();
  const [principal, setPrincipal] = useState("10000");
  const [monthly, setMonthly] = useState("100");
  const [rate, setRate] = useState("5");
  const [years, setYears] = useState("10");
  const [freq, setFreq] = useState<Freq>("monthly");
  const [currency, setCurrency] = useState("USD");

  const p = num(principal);
  const c = num(monthly);
  const annual = num(rate);
  const y = num(years);
  const cur = CURRENCIES[currency] ?? CURRENCIES.USD;
  const money = (n: number) => fmtMoney(n, locale, cur.symbol, cur.frac);

  const { total, contributed, schedule } = useMemo(
    () => compound(p, c, annual, y, freq),
    [p, c, annual, y, freq],
  );

  const interest = Number.isFinite(total) ? total - contributed : NaN;

  return (
    <ToolPanel>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={pick(locale, S.principal)}>
          <NumIn value={principal} onChange={setPrincipal} aria="initial deposit" />
        </Field>
        <Field label={pick(locale, S.monthly)}>
          <NumIn value={monthly} onChange={setMonthly} aria="monthly contribution" />
        </Field>
        <Field label={pick(locale, S.rate)}>
          <NumIn value={rate} onChange={setRate} aria="annual interest rate" />
        </Field>
        <Field label={pick(locale, S.years)}>
          <NumIn value={years} onChange={setYears} aria="years" />
        </Field>
        <Field label={pick(locale, S.freq)}>
          <Sel value={freq} onChange={(v) => setFreq(v as Freq)} aria="compound frequency">
            <option value="monthly">{pick(locale, { en: "Monthly", zh: "每月", ja: "毎月", es: "Mensual", pt: "Mensal" })}</option>
            <option value="quarterly">{pick(locale, { en: "Quarterly", zh: "每季度", ja: "四半期ごと", es: "Trimestral", pt: "Trimestral" })}</option>
            <option value="annually">{pick(locale, { en: "Annually", zh: "每年", ja: "毎年", es: "Anual", pt: "Anual" })}</option>
          </Sel>
        </Field>
        <Field label={pick(locale, S.currency)}>
          <Sel value={currency} onChange={setCurrency} aria="currency">
            <option value="USD">USD — $</option>
            <option value="EUR">EUR — €</option>
            <option value="CNY">CNY — ¥</option>
            <option value="JPY">JPY — ¥</option>
            <option value="BRL">BRL — R$</option>
          </Sel>
        </Field>
      </div>

      <div className="mt-5">
        <Stats
          items={[
            { label: pick(locale, S.balance), value: money(total), tone: "accent" },
            { label: pick(locale, S.contrib), value: money(contributed) },
            { label: pick(locale, S.interest), value: money(interest), tone: "good" },
          ]}
          cols="sm:grid-cols-3"
        />
      </div>

      <div className="mt-3">
        <Note>
          {pick(locale, {
            en: "Each period the balance grows as FV ← (FV + contribution) × (1 + r), with r = annual rate ÷ periods per year (12 / 4 / 1). Contributions are deposited at the start of each period, so each one earns interest from that period on.",
            zh: "每期余额按 FV ← (FV + 投入) × (1 + r) 递推,其中 r = 年利率 ÷ 每年期数(12 / 4 / 1)。投入在每期期初存入,因此从当期起就开始产生利息。",
            ja: "各期の残高は FV ← (FV + 積立額) × (1 + r) で計算します。r は年利 ÷ 年間の期数(12 / 4 / 1)です。積立は各期の初めに預け入れられるため、当期から利息がつきます。",
            es: "En cada periodo el saldo crece como FV ← (FV + aporte) × (1 + r), con r = tasa anual ÷ periodos por año (12 / 4 / 1). Los aportes se depositan al inicio de cada periodo, así que generan intereses desde ese periodo.",
            pt: "A cada período o saldo cresce como FV ← (FV + aporte) × (1 + r), com r = taxa anual ÷ períodos por ano (12 / 4 / 1). Os aportes entram no início de cada período, então rendem desde esse período.",
          })}
        </Note>
      </div>

      {schedule.length > 0 && (
        <div className="mt-7">
          <h3 className="mb-3 text-[15px] font-semibold">{pick(locale, S.table)}</h3>
          <TableBox
            head={[pick(locale, S.year), pick(locale, S.thContrib), pick(locale, S.thInterest), pick(locale, S.thBalance)]}
            rows={schedule.map((row) => [
              row.year,
              money(row.contrib),
              money(row.interest),
              money(row.balance),
            ])}
          />
        </div>
      )}
    </ToolPanel>
  );
}
