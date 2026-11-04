"use client";
import { parseLocaleNumber } from "../_lib/numparse";

import type { Locale } from "@/lib/site";

import { useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import { Field, NumIn, Note, Stats, Tabs, fmt, fmtMoney, pick } from "./calc-ui";

/**
 * One engine for the simple-form calculators: bmi, percentage, discount,
 * profit, tip, fuel. props.kind selects the tool.
 */

const S: Record<string, Record<string, string>> =  {
  metric: { en: "Metric", zh: "公制", ja: "メートル法", es: "Métrico", pt: "Métrico" },
  imperial: { en: "Imperial", zh: "英制", ja: "ヤード・ポンド法", es: "Imperial", pt: "Imperial" },
  of: { en: "X% of Y", zh: "X% 的 Y", ja: "X% の Y", es: "X% de Y", pt: "X% de Y" },
  what: { en: "X is what % of Y", zh: "X 是 Y 的百分之几", ja: "X は Y の何%", es: "X es qué % de Y", pt: "X é quanto % de Y" },
  change: { en: "% change", zh: "百分比变化", ja: "変化率", es: "Cambio %", pt: "Variação %" },
  percent: { en: "Percentage (%)", zh: "百分比 (%)", ja: "パーセント (%)", es: "Porcentaje (%)", pt: "Porcentagem (%)" },
  ofValue: { en: "of value", zh: "的数值", ja: "元の値", es: "del valor", pt: "do valor" },
  result: { en: "Result", zh: "结果", ja: "結果", es: "Resultado", pt: "Resultado" },
  from: { en: "From (initial)", zh: "初始值", ja: "開始値", es: "De (inicial)", pt: "De (inicial)" },
  to: { en: "To (final)", zh: "最终值", ja: "終了値", es: "A (final)", pt: "Para (final)" },
  increase: { en: "increase", zh: "增长", ja: "増加", es: "aumento", pt: "aumento" },
  decrease: { en: "decrease", zh: "下降", ja: "減少", es: "disminución", pt: "queda" },
  price: { en: "Original price", zh: "原价", ja: "元の価格", es: "Precio original", pt: "Preço original" },
  discount: { en: "Discount (%)", zh: "折扣 (%)", ja: "割引率 (%)", es: "Descuento (%)", pt: "Desconto (%)" },
  extra: { en: "Extra discount (%)", zh: "叠加折扣 (%)", ja: "追加割引 (%)", es: "Descuento extra (%)", pt: "Desconto extra (%)" },
  none: { en: "none", zh: "无", ja: "なし", es: "ninguno", pt: "nenhum" },
  finalPrice: { en: "Final price", zh: "到手价", ja: "支払額", es: "Precio final", pt: "Preço final" },
  saved: { en: "You save", zh: "省下", ja: "節約額", es: "Ahorras", pt: "Você economiza" },
  effective: { en: "Effective discount", zh: "实际折扣", ja: "実質割引率", es: "Descuento efectivo", pt: "Desconto efetivo" },
  cost: { en: "Cost price", zh: "成本价", ja: "仕入価格", es: "Precio de costo", pt: "Preço de custo" },
  sell: { en: "Selling price", zh: "售价", ja: "販売価格", es: "Precio de venta", pt: "Preço de venda" },
  profit: { en: "Profit", zh: "利润", ja: "利益", es: "Ganancia", pt: "Lucro" },
  loss: { en: "Loss", zh: "亏损", ja: "損失", es: "Pérdida", pt: "Prejuízo" },
  margin: { en: "Profit margin", zh: "利润率", ja: "利益率", es: "Margen", pt: "Margem de lucro" },
  markup: { en: "Markup", zh: "加成率", ja: "マークアップ率", es: "Recargo", pt: "Markup" },
  bill: { en: "Bill amount", zh: "账单金额", ja: "請求額", es: "Importe de la cuenta", pt: "Valor da conta" },
  tipPct: { en: "Tip (%)", zh: "小费 (%)", ja: "チップ (%)", es: "Propina (%)", pt: "Gorjeta (%)" },
  people: { en: "Split between", zh: "分摊人数", ja: "割り勘の人数", es: "Dividir entre", pt: "Dividir entre" },
  peopleUnit: { en: "people", zh: "人", ja: "人", es: "personas", pt: "pessoas" },
  tipAmount: { en: "Tip", zh: "小费", ja: "チップ", es: "Propina", pt: "Gorjeta" },
  total: { en: "Total", zh: "合计", ja: "合計", es: "Total", pt: "Total" },
  perPerson: { en: "Per person", zh: "每人", ja: "一人あたり", es: "Por persona", pt: "Por pessoa" },
  distance: { en: "Distance", zh: "距离", ja: "走行距離", es: "Distancia", pt: "Distância" },
  efficiency: { en: "Fuel efficiency", zh: "油耗", ja: "燃費", es: "Consumo", pt: "Consumo" },
  fuelPrice: { en: "Fuel price", zh: "油价", ja: "燃料価格", es: "Precio del combustible", pt: "Preço do combustible" },
  roundTrip: { en: "Round trip", zh: "往返", ja: "往復", es: "Ida y vuelta", pt: "Ida e volta" },
  fuelNeeded: { en: "Fuel needed", zh: "所需燃油", ja: "必要な燃料", es: "Combustible necesario", pt: "Combustível necessário" },
  fuelCost: { en: "Total fuel cost", zh: "总油费", ja: "燃料費合計", es: "Costo total", pt: "Custo total" },
  costPerKm: { en: "Cost per km", zh: "每公里费用", ja: "1 km あたり", es: "Costo por km", pt: "Custo por km" },
  costPerMile: { en: "Cost per mile", zh: "每英里费用", ja: "1 マイルあたり", es: "Costo por milla", pt: "Custo por milha" },
  kmL: { en: "km per liter", zh: "公里/升", ja: "km/L", es: "km por litro", pt: "km por litro" },
  l100: { en: "liters per 100 km", zh: "升/100公里", ja: "L/100 km", es: "litros por 100 km", pt: "litros por 100 km" },
  mpg: { en: "miles per gallon (US)", zh: "英里/加仑(美)", ja: "マイル/ガロン(米)", es: "millas por galón (EE. UU.)", pt: "milhas por galão (EUA)" },
};

function num(s: string): number {
  const n = parseLocaleNumber(s);
  return Number.isFinite(n) ? n : NaN;
}

/* ---------------- BMI ---------------- */

function bmiCategory(b: number): number {
  if (b < 18.5) return 0;
  if (b < 25) return 1;
  if (b < 30) return 2;
  return 3;
}

type Locale_ = Locale;

const BMI_NAMES: Record<string, string[]> = {
  en: ["Underweight", "Normal weight", "Overweight", "Obesity"],
  zh: ["偏瘦", "正常", "超重", "肥胖"],
  ja: ["低体重", "普通体重", "過体重", "肥満"],
  es: ["Bajo peso", "Peso normal", "Sobrepeso", "Obesidad"],
  pt: ["Abaixo do peso", "Peso normal", "Sobrepeso", "Obesidade"],
};

function Bmi() {
  const { locale } = useI18n();
  const [units, setUnits] = useState("metric");
  const [cm, setCm] = useState("170");
  const [kg, setKg] = useState("65");
  const [ft, setFt] = useState("5");
  const [inch, setInch] = useState("7");
  const [lb, setLb] = useState("143");

  const hM = units === "metric" ? num(cm) / 100 : (num(ft) * 12 + num(inch)) * 0.0254;
  const wKg = units === "metric" ? num(kg) : num(lb) * 0.45359237;
  const bmi = hM > 0 && wKg > 0 ? wKg / (hM * hM) : NaN;
  const cat = Number.isFinite(bmi) ? bmiCategory(bmi) : null;

  return (
    <ToolPanel>
      <Tabs
        options={[
          { id: "metric", label: pick(locale, S.metric) },
          { id: "imperial", label: pick(locale, S.imperial) },
        ]}
        value={units}
        onChange={setUnits}
      />
      {units === "metric" ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label={locale === "zh" ? "身高 (cm)" : locale === "ja" ? "身長 (cm)" : locale === "es" ? "Altura (cm)" : locale === "pt" ? "Altura (cm)" : "Height (cm)"}>
            <NumIn value={cm} onChange={setCm} aria="height cm" />
          </Field>
          <Field label={locale === "zh" ? "体重 (kg)" : locale === "ja" ? "体重 (kg)" : locale === "es" ? "Peso (kg)" : locale === "pt" ? "Peso (kg)" : "Weight (kg)"}>
            <NumIn value={kg} onChange={setKg} aria="weight kg" />
          </Field>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label={locale === "zh" ? "身高 (英尺)" : locale === "ja" ? "身長 (フィート)" : locale === "es" ? "Altura (pies)" : locale === "pt" ? "Altura (pés)" : "Height (ft)"}>
            <NumIn value={ft} onChange={setFt} aria="height feet" />
          </Field>
          <Field label={locale === "zh" ? "身高 (英寸)" : locale === "ja" ? "身長 (インチ)" : locale === "es" ? "Altura (pulgadas)" : locale === "pt" ? "Altura (polegadas)" : "Height (in)"}>
            <NumIn value={inch} onChange={setInch} aria="height inches" />
          </Field>
          <Field label={locale === "zh" ? "体重 (磅)" : locale === "ja" ? "体重 (ポンド)" : locale === "es" ? "Peso (lb)" : locale === "pt" ? "Peso (lb)" : "Weight (lb)"}>
            <NumIn value={lb} onChange={setLb} aria="weight pounds" />
          </Field>
        </div>
      )}

      <div className="mt-5">
        <Stats
          items={[
            {
              label: "BMI",
              value: fmt(bmi, locale, 1),
              tone: cat === 1 ? "good" : cat === null ? undefined : "bad",
            },
            {
              label: pick(locale, { en: "Category", zh: "类别", ja: "判定", es: "Categoría", pt: "Categoria" }),
              value: cat !== null ? (BMI_NAMES[locale] ?? BMI_NAMES.en)[cat] : "—",
            },
          ]}
        />
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border hairline">
        <table className="w-full text-[14px]">
          <thead>
            <tr className="border-b hairline text-[12.5px] uppercase tracking-wide text-[var(--color-sub)]">
              <th scope="col" className="px-3.5 py-2 text-left font-semibold">BMI</th>
              <th scope="col" className="px-3.5 py-2 text-left font-semibold">
                {pick(locale, { en: "WHO category", zh: "WHO 分类", ja: "WHO 判定", es: "Categoría OMS", pt: "Categoria OMS" })}
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Below 18.5", 0],
              ["18.5 – 24.9", 1],
              ["25.0 – 29.9", 2],
              ["30.0 and above", 3],
            ].map(([r, id], i) => (
              <tr key={i} className={cat === id ? "bg-[rgba(0,113,227,0.08)] font-semibold" : i % 2 ? "bg-[var(--color-surface)]" : ""}>
                <td className="mono px-3.5 py-2">{r}</td>
                <td className="px-3.5 py-2">{(BMI_NAMES[locale] ?? BMI_NAMES.en)[id as number]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-3">
        <Note>
          {pick(locale, {
            en: "BMI is a screening measure, not a diagnosis — it does not account for muscle mass, age or body composition.",
            zh: "BMI 只是筛查指标,不是诊断——它不考虑肌肉量、年龄和体脂分布。",
            ja: "BMI はスクリーニング指標であり診断ではありません。筋肉量・年齢・体組成は考慮されません。",
            es: "El IMC es una medida de cribado, no un diagnóstico: no tiene en cuenta la masa muscular, la edad ni la composición corporal.",
            pt: "O IMC é uma medida de triagem, não um diagnóstico — ele não considera massa muscular, idade nem composição corporal.",
          })}
        </Note>
      </div>
    </ToolPanel>
  );
}

/* ---------------- Percentage ---------------- */

function Percentage() {
  const { locale } = useI18n();
  const [mode, setMode] = useState("of");
  const [a, setA] = useState("15");
  const [b, setB] = useState("200");

  const x = num(a);
  const y = num(b);
  let out = NaN;
  let extra = "";
  if (Number.isFinite(x) && Number.isFinite(y)) {
    if (mode === "of") out = (x / 100) * y;
    else if (mode === "what") out = y === 0 ? NaN : (x / y) * 100;
    else {
      out = x === 0 ? NaN : ((y - x) / Math.abs(x)) * 100;
      if (Number.isFinite(out)) extra = out >= 0 ? pick(locale, S.increase) : pick(locale, S.decrease);
    }
  }

  const suffix = mode === "what" ? " %" : "";
  return (
    <ToolPanel>
      <Tabs
        options={[
          { id: "of", label: pick(locale, S.of) },
          { id: "what", label: pick(locale, S.what) },
          { id: "change", label: pick(locale, S.change) },
        ]}
        value={mode}
        onChange={setMode}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label={
            mode === "of"
              ? pick(locale, S.percent)
              : mode === "what"
                ? pick(locale, { en: "Value X", zh: "数值 X", ja: "値 X", es: "Valor X", pt: "Valor X" })
                : pick(locale, S.from)
          }
        >
          <NumIn value={a} onChange={setA} aria="first value" />
        </Field>
        <Field
          label={
            mode === "of"
              ? pick(locale, S.ofValue)
              : mode === "what"
                ? pick(locale, { en: "Value Y", zh: "数值 Y", ja: "値 Y", es: "Valor Y", pt: "Valor Y" })
                : pick(locale, S.to)
          }
        >
          <NumIn value={b} onChange={setB} aria="second value" />
        </Field>
      </div>
      <div className="mt-5">
        <Stats
          items={[
            {
              label: pick(locale, S.result),
              value: `${fmt(out, locale, 2)}${suffix}`,
              tone: mode === "change" ? (out >= 0 ? "good" : "bad") : "accent",
            },
            ...(extra
              ? [{ label: pick(locale, { en: "Direction", zh: "方向", ja: "方向", es: "Dirección", pt: "Direção" }), value: extra, tone: out >= 0 ? ("good" as const) : ("bad" as const) }]
              : []),
          ]}
        />
      </div>
    </ToolPanel>
  );
}

/* ---------------- Discount ---------------- */

function Discount() {
  const { locale } = useI18n();
  const [price, setPrice] = useState("249");
  const [d1, setD1] = useState("20");
  const [d2, setD2] = useState("");

  const p = num(price);
  const a = num(d1);
  const b = num(d2);
  const hasB = d2.trim() !== "" && Number.isFinite(b);
  const finalPrice = Number.isFinite(p) && Number.isFinite(a) ? p * (1 - a / 100) * (hasB ? 1 - b / 100 : 1) : NaN;
  const saved = Number.isFinite(p) ? p - finalPrice : NaN;
  const eff = Number.isFinite(p) && p > 0 ? (saved / p) * 100 : NaN;

  return (
    <ToolPanel>
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label={pick(locale, S.price)}>
          <NumIn value={price} onChange={setPrice} aria="original price" />
        </Field>
        <Field label={pick(locale, S.discount)}>
          <NumIn value={d1} onChange={setD1} aria="discount percent" />
        </Field>
        <Field label={`${pick(locale, S.extra)} · ${pick(locale, S.none)}`}>
          <NumIn value={d2} onChange={setD2} aria="extra discount percent" placeholder="0" />
        </Field>
      </div>
      <div className="mt-5">
        <Stats
          items={[
            { label: pick(locale, S.finalPrice), value: fmtMoney(finalPrice, locale, "$"), tone: "accent" },
            { label: pick(locale, S.saved), value: fmtMoney(saved, locale, "$"), tone: "good" },
            { label: pick(locale, S.effective), value: `${fmt(eff, locale, 1)} %` },
          ]}
        />
      </div>
      {hasB && (
        <div className="mt-3">
          <Note>
            {pick(locale, {
              en: "Stacked discounts apply one after another (20% + 10% = 72% of the original price), not 30% off.",
              zh: "叠加折扣是先后应用的(20% + 10% = 原价的 72%),而不是直接打 7 折。",
              ja: "重複割引は順に適用されます(20% + 10% = 元の 72%)。30% オフにはなりません。",
              es: "Los descuentos apilados se aplican uno tras otro (20% + 10% = 72% del precio original), no un 30%.",
              pt: "Descontos acumulados são aplicados em sequência (20% + 10% = 72% do preço original), e não 30%.",
            })}
          </Note>
        </div>
      )}
    </ToolPanel>
  );
}

/* ---------------- Profit ---------------- */

function Profit() {
  const { locale } = useI18n();
  const [cost, setCost] = useState("80");
  const [sell, setSell] = useState("100");

  const c = num(cost);
  const s = num(sell);
  const profit = s - c;
  const margin = s !== 0 ? (profit / s) * 100 : NaN;
  const markup = c !== 0 ? (profit / c) * 100 : NaN;
  const ok = Number.isFinite(profit);

  return (
    <ToolPanel>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={pick(locale, S.cost)}>
          <NumIn value={cost} onChange={setCost} aria="cost price" />
        </Field>
        <Field label={pick(locale, S.sell)}>
          <NumIn value={sell} onChange={setSell} aria="selling price" />
        </Field>
      </div>
      <div className="mt-5">
        <Stats
          items={[
            {
              label: profit >= 0 ? pick(locale, S.profit) : pick(locale, S.loss),
              value: fmtMoney(Math.abs(profit), locale, "$"),
              tone: ok ? (profit >= 0 ? "good" : "bad") : undefined,
            },
            { label: pick(locale, S.margin), value: `${fmt(margin, locale, 1)} %` },
            { label: pick(locale, S.markup), value: `${fmt(markup, locale, 1)} %` },
          ]}
        />
      </div>
      <div className="mt-3">
        <Note>
          {pick(locale, {
            en: "Margin is profit ÷ selling price; markup is profit ÷ cost. A 25% margin equals a 33.3% markup.",
            zh: "利润率 = 利润 ÷ 售价;加成率 = 利润 ÷ 成本。25% 的利润率对应 33.3% 的加成率。",
            ja: "利益率 = 利益 ÷ 販売価格、マークアップ率 = 利益 ÷ 仕入価格。利益率 25% はマークアップ率 33.3% に相当します。",
            es: "El margen es ganancia ÷ precio de venta; el recargo es ganancia ÷ costo. Un margen del 25% equivale a un recargo del 33,3%.",
            pt: "A margem é lucro ÷ preço de venda; o markup é lucro ÷ custo. Uma margem de 25% equivale a um markup de 33,3%.",
          })}
        </Note>
      </div>
    </ToolPanel>
  );
}

/* ---------------- Tip ---------------- */

function Tip() {
  const { locale } = useI18n();
  const [bill, setBill] = useState("64");
  const [pct, setPct] = useState("15");
  const [people, setPeople] = useState("2");

  const b = num(bill);
  const p = num(pct);
  const n = Math.max(1, Math.floor(num(people) || 1));
  const tip = b * (p / 100);
  const total = b + tip;

  return (
    <ToolPanel>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={pick(locale, S.bill)}>
          <NumIn value={bill} onChange={setBill} aria="bill amount" />
        </Field>
        <Field label={pick(locale, S.people)}>
          <NumIn value={String(people)} onChange={setPeople} aria="number of people" />
        </Field>
      </div>
      <div className="mt-4">
        <span className="mb-2 block text-[13px] font-medium text-[var(--color-sub)]">{pick(locale, S.tipPct)}</span>
        <div className="flex flex-wrap gap-2">
          {[10, 15, 18, 20, 25].map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setPct(String(v))}
              className={`mono rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                pct === String(v)
                  ? "border-transparent bg-[var(--color-ink)] text-white dark:bg-white dark:text-[#1d1d1f]"
                  : "hairline hover:bg-[var(--color-surface)]"
              }`}
            >
              {v}%
            </button>
          ))}
          <input
            type="number"
            inputMode="decimal"
            className="field bare mono w-24"
            value={pct}
            onChange={(e) => setPct(e.target.value)}
            aria-label="custom tip percent"
          />
        </div>
      </div>
      <div className="mt-5">
        <Stats
          items={[
            { label: pick(locale, S.tipAmount), value: fmtMoney(tip, locale, "$") },
            { label: pick(locale, S.total), value: fmtMoney(total, locale, "$"), tone: "accent" },
            { label: pick(locale, S.perPerson), value: fmtMoney(total / n, locale, "$"), tone: "good" },
          ]}
        />
      </div>
    </ToolPanel>
  );
}

/* ---------------- Fuel cost ---------------- */

function Fuel() {
  const { locale } = useI18n();
  const [units, setUnits] = useState("metric");
  const [dist, setDist] = useState("450");
  const [eff, setEff] = useState("7.5");
  const [price, setPrice] = useState("1.75");
  const [round, setRound] = useState(false);

  const d = num(dist) * (round ? 2 : 1);
  const e = num(eff);
  const pr = num(price);
  let fuel = NaN;
  if (Number.isFinite(d) && Number.isFinite(e) && e > 0) {
    fuel = units === "metric" ? (d * e) / 100 : d / e;
  }
  const cost = Number.isFinite(fuel) ? fuel * pr : NaN;
  const unitDist = units === "metric" ? "km" : "mi";
  const unitVol = units === "metric" ? "L" : "gal";
  const effLabel = units === "metric" ? pick(locale, S.l100) : pick(locale, S.mpg);

  return (
    <ToolPanel>
      <Tabs
        options={[
          { id: "metric", label: pick(locale, S.metric) },
          { id: "imperial", label: pick(locale, S.imperial) },
        ]}
        value={units}
        onChange={setUnits}
      />
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label={`${pick(locale, S.distance)} (${unitDist})`}>
          <NumIn value={dist} onChange={setDist} aria="distance" />
        </Field>
        <Field label={`${pick(locale, S.efficiency)} · ${effLabel}`}>
          <NumIn value={eff} onChange={setEff} aria="fuel efficiency" />
        </Field>
        <Field label={`${pick(locale, S.fuelPrice)} ($/${unitVol})`}>
          <NumIn value={price} onChange={setPrice} aria="fuel price" />
        </Field>
      </div>
      <label className="mt-4 inline-flex cursor-pointer items-center gap-2 text-[14px]">
        <input type="checkbox" className="accent-[var(--color-accent)]" checked={round} onChange={(e) => setRound(e.target.checked)} />
        {pick(locale, S.roundTrip)}
      </label>
      <div className="mt-5">
        <Stats
          items={[
            { label: pick(locale, S.fuelNeeded), value: `${fmt(fuel, locale, 2)} ${unitVol}` },
            { label: pick(locale, S.fuelCost), value: fmtMoney(cost, locale, "$"), tone: "accent" },
            {
              label: units === "metric" ? pick(locale, S.costPerKm) : pick(locale, S.costPerMile),
              value: fmtMoney(Number.isFinite(cost) && d > 0 ? cost / d : NaN, locale, "$", 3),
            },
          ]}
        />
      </div>
    </ToolPanel>
  );
}

export function CalcEngineBasic({ kind }: { kind: string }) {
  switch (kind) {
    case "bmi":
      return <Bmi />;
    case "percentage":
      return <Percentage />;
    case "discount":
      return <Discount />;
    case "profit":
      return <Profit />;
    case "tip":
      return <Tip />;
    case "fuel":
      return <Fuel />;
    default:
      return null;
  }
}
