"use client";
import { parseLocaleNumber } from "../_lib/numparse";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import { Field, NumIn, Note, Sel, Stats, TableBox, fmtMoney, pick } from "./calc-ui";
import { mortgage } from "../_lib/finance";

/**
 * Mortgage payment engine on top of finance.mortgage(): P&I via the standard
 * amortization formula, PITI extras (property tax / insurance per year, HOA per
 * month) and a yearly amortization schedule.
 * props: none.
 */

const CURRENCIES: Record<string, { symbol: string; frac: number }> = {
  USD: { symbol: "$", frac: 2 },
  EUR: { symbol: "€", frac: 2 },
  CNY: { symbol: "¥", frac: 2 },
  JPY: { symbol: "¥", frac: 0 },
  BRL: { symbol: "R$", frac: 2 },
};

const S = {
  price: { en: "Home price", zh: "房屋总价", ja: "住宅価格", es: "Precio de la vivienda", pt: "Preço do imóvel" },
  down: { en: "Down payment", zh: "首付", ja: "頭金", es: "Pago inicial", pt: "Entrada" },
  amount: { en: "amount", zh: "金额", ja: "金額", es: "importe", pt: "valor" },
  rate: { en: "Annual interest rate (%)", zh: "年利率 (%)", ja: "年利 (%)", es: "Tasa de interés anual (%)", pt: "Taxa de juros anual (%)" },
  term: { en: "Term (years)", zh: "贷款年限", ja: "期間(年)", es: "Plazo (años)", pt: "Prazo (anos)" },
  tax: { en: "Property tax / year (optional)", zh: "房产税/年(可选)", ja: "固定資産税/年(任意)", es: "Impuesto anual (opcional)", pt: "IPTU / ano (opcional)" },
  insurance: { en: "Insurance / year (optional)", zh: "保险/年(可选)", ja: "保険料/年(任意)", es: "Seguro anual (opcional)", pt: "Seguro / ano (opcional)" },
  hoa: { en: "HOA / month (optional)", zh: "物业费/月(可选)", ja: "管理費/月(任意)", es: "Cuota mensual (opcional)", pt: "Condomínio / mês (opcional)" },
  currency: { en: "Currency", zh: "币种", ja: "通貨", es: "Moneda", pt: "Moeda" },
  monthly: { en: "Monthly payment (P&I)", zh: "月供(本息)", ja: "毎月の返済額(元利)", es: "Cuota mensual (capital e interés)", pt: "Parcela mensal (principal + juros)" },
  piti: { en: "Total monthly (PITI)", zh: "每月总支出(PITI)", ja: "毎月の合計(PITI)", es: "Total mensual (PITI)", pt: "Total mensal (PITI)" },
  loan: { en: "Loan amount", zh: "贷款金额", ja: "借入額", es: "Importe del préstamo", pt: "Valor financiado" },
  interest: { en: "Total interest", zh: "总利息", ja: "総利息", es: "Interés total", pt: "Total de juros" },
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

export function CalcEngineMortgage() {
  const { locale } = useI18n();
  const [price, setPrice] = useState("300000");
  const [down, setDown] = useState("20");
  const [downMode, setDownMode] = useState("percent");
  const [rate, setRate] = useState("6");
  const [term, setTerm] = useState("30");
  const [tax, setTax] = useState("");
  const [insurance, setInsurance] = useState("");
  const [hoa, setHoa] = useState("");
  const [currency, setCurrency] = useState("USD");

  const p = num(price);
  const d = num(down);
  const annual = num(rate);
  const years = num(term);
  const taxY = num(tax);
  const insY = num(insurance);
  const hoaM = num(hoa);
  const cur = CURRENCIES[currency] ?? CURRENCIES.USD;
  const money = (n: number) => fmtMoney(n, locale, cur.symbol, cur.frac);

  const downAmount = downMode === "percent" ? p * d / 100 : d;
  const loan = p - downAmount;

  const res = useMemo(
    () => mortgage(loan, annual, years),
    [loan, annual, years],
  );

  const extrasOK = [taxY, insY, hoaM].every((v) => !Number.isFinite(v) || v >= 0);
  const extras = (Number.isFinite(taxY) ? taxY : 0) / 12 + (Number.isFinite(insY) ? insY : 0) / 12 + (Number.isFinite(hoaM) ? hoaM : 0);
  const piti = Number.isFinite(res.monthlyPI) && extrasOK ? res.monthlyPI + extras : NaN;

  return (
    <ToolPanel>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={pick(locale, S.price)}>
          <NumIn value={price} onChange={setPrice} aria="home price" />
        </Field>
        <Field label={pick(locale, S.down)}>
          <div className="flex gap-2">
            <NumIn value={down} onChange={setDown} aria="down payment" className="min-w-0 flex-1" />
            <Sel value={downMode} onChange={setDownMode} aria="down payment mode">
              <option value="percent">%</option>
              <option value="amount">{pick(locale, S.amount)}</option>
            </Sel>
          </div>
        </Field>
        <Field label={pick(locale, S.rate)}>
          <NumIn value={rate} onChange={setRate} aria="annual rate" />
        </Field>
        <Field label={pick(locale, S.term)}>
          <NumIn value={term} onChange={setTerm} aria="term in years" />
        </Field>
        <Field label={pick(locale, S.tax)}>
          <NumIn value={tax} onChange={setTax} aria="property tax per year" placeholder="0" />
        </Field>
        <Field label={pick(locale, S.insurance)}>
          <NumIn value={insurance} onChange={setInsurance} aria="insurance per year" placeholder="0" />
        </Field>
        <Field label={pick(locale, S.hoa)}>
          <NumIn value={hoa} onChange={setHoa} aria="HOA per month" placeholder="0" />
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
            { label: pick(locale, S.monthly), value: money(res.monthlyPI), tone: "accent" },
            { label: pick(locale, S.piti), value: money(piti), tone: "good" },
            { label: pick(locale, S.loan), value: money(loan) },
            { label: pick(locale, S.interest), value: money(res.totalInterest) },
          ]}
        />
      </div>

      <div className="mt-3">
        <Note>
          {pick(locale, {
            en: "P&I = L × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1), where L is the loan (price − down payment), r the monthly rate (annual ÷ 12 ÷ 100) and n the months. PITI adds monthly shares of yearly property tax and insurance plus HOA. Rates here are an example input, not an offer.",
            zh: "本息月供 = L × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1),其中 L 为贷款额(房价 − 首付),r 为月利率(年利率 ÷ 12 ÷ 100),n 为月数。PITI 在此基础上加上房产税、保险的月均额和物业费。利率仅为示例输入,不构成任何报价。",
            ja: "元利均等返済額 = L × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1)。L は借入額(価格 − 頭金)、r は月利(年利 ÷ 12 ÷ 100)、n は月数です。PITI は固定資産税・保険の月割額と管理費を加えた合計です。金利は入力例であり、提案ではありません。",
            es: "Cuota = L × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1), donde L es el préstamo (precio − entrada), r el tipo mensual (anual ÷ 12 ÷ 100) y n los meses. El PITI añade la parte mensual del impuesto y del seguro anuales más la cuota de comunidad. El tipo es un dato de ejemplo, no una oferta.",
            pt: "Parcela = L × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1), onde L é o valor financiado (preço − entrada), r a taxa mensal (anual ÷ 12 ÷ 100) e n os meses. O PITI soma as frações mensais de IPTU e seguro anuais mais o condomínio. A taxa é um exemplo de entrada, não uma oferta.",
          })}
        </Note>
      </div>

      {res.schedule.length > 0 && (
        <div className="mt-7">
          <h3 className="mb-3 text-[15px] font-semibold">{pick(locale, S.schedule)}</h3>
          <TableBox
            head={[pick(locale, S.year), pick(locale, S.prinPaid), pick(locale, S.intPaid), pick(locale, S.balance)]}
            rows={res.schedule.map((row) => [
              row.year,
              money(row.principal),
              money(row.interest),
              money(row.balance),
            ])}
          />
        </div>
      )}
    </ToolPanel>
  );
}
