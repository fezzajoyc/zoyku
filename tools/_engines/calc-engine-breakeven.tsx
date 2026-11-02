"use client";
import { parseLocaleNumber } from "../_lib/numparse";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import type { Locale } from "@/lib/site";
import { ToolPanel } from "@/components/ui";
import { Field, NumIn, Note, Stats, TableBox, fmt, fmtMoney, pick } from "./calc-ui";
import { breakEven } from "../_lib/finance";

/**
 * Break-even engine on top of finance.breakEven(): units and revenue needed to
 * cover fixed costs, contribution margin, and profit at 0.5×/1×/1.5×/2× the
 * break-even volume.
 * props: none.
 */

const S = {
  fixed: { en: "Fixed costs", zh: "固定成本", ja: "固定費", es: "Costos fijos", pt: "Custos fixos" },
  price: { en: "Price per unit", zh: "单价", ja: "販売単価", es: "Precio por unidad", pt: "Preço por unidade" },
  variable: { en: "Variable cost per unit", zh: "单位变动成本", ja: "変動費/個", es: "Costo variable por unidad", pt: "Custo variável por unidade" },
  units: { en: "Break-even units", zh: "盈亏平衡销量", ja: "損益分岐点(個)", es: "Unidades de equilibrio", pt: "Unidades de equilíbrio" },
  revenue: { en: "Break-even revenue", zh: "盈亏平衡收入", ja: "損益分岐点売上", es: "Ingresos de equilibrio", pt: "Receita de equilíbrio" },
  margin: { en: "Contribution margin / unit", zh: "单位边际贡献", ja: "限界利益/個", es: "Margen de contribución / unidad", pt: "Margem de contribuição / unidade" },
  marginPct: { en: "Margin", zh: "利润率", ja: "マージン", es: "Margen", pt: "Margem" },
  level: { en: "Output level", zh: "产出水平", ja: "生産水準", es: "Nivel de producción", pt: "Nível de produção" },
  thUnits: { en: "Units", zh: "销量", ja: "個数", es: "Unidades", pt: "Unidades" },
  thRevenue: { en: "Revenue", zh: "收入", ja: "売上", es: "Ingresos", pt: "Receita" },
  thProfit: { en: "Profit", zh: "利润", ja: "利益", es: "Beneficio", pt: "Lucro" },
  table: { en: "Profit at different volumes", zh: "不同销量下的利润", ja: "生産量別の利益", es: "Beneficio según el volumen", pt: "Lucro em diferentes volumes" },
  never: {
    en: "With these inputs the price does not cover the variable cost, so no volume can break even. Lower the variable cost or raise the price.",
    zh: "按当前输入,单价连单位变动成本都覆盖不了,任何销量都无法回本。请降低变动成本或提高单价。",
    ja: "現在の入力では販売単価が変動費を下回っており、どの数量でも損益分岐点に届きません。変動費を下げるか、単価を上げてください。",
    es: "Con estos datos el precio no cubre el costo variable, así que ningún volumen alcanza el equilibrio. Reduzca el costo variable o suba el precio.",
    pt: "Com esses valores o preço não cobre o custo variável, então nenhum volume atinge o equilíbrio. Reduza o custo variável ou aumente o preço.",
  },
  formula: {
    en: "Break-even units = fixed costs ÷ (price − variable cost). Each sale contributes that difference toward fixed costs; after they are covered, the same margin is profit.",
    zh: "盈亏平衡销量 = 固定成本 ÷(单价 − 单位变动成本)。每卖出一件,这个差额就用于弥补固定成本;补足之后,同样的差额就是利润。",
    ja: "損益分岐点(個)= 固定費 ÷(販売単価 − 変動費)。1 個売れるごとにその差額が固定費を埋め、埋まり切った後は同じ差額が利益になります。",
    es: "Unidades de equilibrio = costos fijos ÷ (precio − costo variable). Cada venta aporta esa diferencia a cubrir los costos fijos; una vez cubiertos, el mismo margen es beneficio.",
    pt: "Unidades de equilíbrio = custos fixos ÷ (preço − custo variável). Cada venda contribui com essa diferença para cobrir os custos fixos; depois disso, a mesma margem vira lucro.",
  },
};

function num(s: string): number {
  const n = parseLocaleNumber(s);
  return Number.isFinite(n) ? n : NaN;
}

export function CalcEngineBreakEven() {
  const { locale } = useI18n();
  const [fixed, setFixed] = useState("10000");
  const [price, setPrice] = useState("50");
  const [variable, setVariable] = useState("30");
  const symbol = "$";

  const res = useMemo(() => breakEven(num(fixed), num(price), num(variable)), [fixed, price, variable]);
  const impossible = !Number.isFinite(res.units) && Number.isFinite(num(fixed)) && num(fixed) >= 0 && num(price) > 0 && num(variable) >= 0;

  const scaleLabel = (scale: number, l: Locale) =>
    pick(l, {
      en: `${scale}× break-even`,
      zh: `${scale}× 平衡点`,
      ja: `${scale}× 分岐点`,
      es: `${scale}× equilibrio`,
      pt: `${scale}× equilíbrio`,
    });

  return (
    <ToolPanel>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={pick(locale, S.fixed)}>
          <NumIn value={fixed} onChange={setFixed} aria="fixed costs" />
        </Field>
        <Field label={pick(locale, S.price)}>
          <NumIn value={price} onChange={setPrice} aria="price per unit" />
        </Field>
        <Field label={pick(locale, S.variable)}>
          <NumIn value={variable} onChange={setVariable} aria="variable cost per unit" />
        </Field>
      </div>

      <div className="mt-5">
        <Stats
          items={[
            { label: pick(locale, S.units), value: fmt(res.units, locale, 1), tone: "accent" },
            { label: pick(locale, S.revenue), value: fmtMoney(res.revenue, locale, symbol), tone: "good" },
            { label: pick(locale, S.margin), value: fmtMoney(res.contributionMargin, locale, symbol) },
            { label: pick(locale, S.marginPct), value: Number.isFinite(res.marginPct) ? `${fmt(res.marginPct, locale, 1)}%` : "—" },
          ]}
        />
      </div>

      <div className="mt-3">
        <Note>{pick(locale, S.formula)}</Note>
        {impossible && (
          <p className="mt-2 text-[13px] leading-5 text-[var(--color-bad)]">{pick(locale, S.never)}</p>
        )}
      </div>

      {res.points.length > 0 && (
        <div className="mt-7">
          <h3 className="mb-3 text-[15px] font-semibold">{pick(locale, S.table)}</h3>
          <TableBox
            head={[pick(locale, S.level), pick(locale, S.thUnits), pick(locale, S.thRevenue), pick(locale, S.thProfit)]}
            rows={res.points.map((pt) => [
              scaleLabel(pt.scale, locale),
              fmt(pt.units, locale, 1),
              fmtMoney(pt.revenue, locale, symbol),
              fmtMoney(pt.profit, locale, symbol),
            ])}
          />
        </div>
      )}
    </ToolPanel>
  );
}
