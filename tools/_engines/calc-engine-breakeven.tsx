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
  fixed: { en: "Fixed costs", zh: "固定成本", ja: "固定費", es: "Costos fijos", pt: "Custos fixos", fr: "Coûts fixes", de: "Fixkosten", ru: "Постоянные затраты", it: "Costi fissi", tr: "Sabit maliyetler", ko: "고정 비용", ar: "التكاليف الثابتة", hi: "स्थिर लागत", id: "Biaya tetap", vi: "Chi phí cố định" },
  price: { en: "Price per unit", zh: "单价", ja: "販売単価", es: "Precio por unidad", pt: "Preço por unidade", fr: "Prix unitaire", de: "Preis pro Einheit", ru: "Цена за единицу", it: "Prezzo unitario", tr: "Birim fiyat", ko: "단위당 가격", ar: "السعر لكل وحدة", hi: "प्रति इकाई मूल्य", id: "Harga per unit", vi: "Giá mỗi đơn vị" },
  variable: { en: "Variable cost per unit", zh: "单位变动成本", ja: "変動費/個", es: "Costo variable por unidad", pt: "Custo variável por unidade", fr: "Coût variable unitaire", de: "Variable Kosten pro Einheit", ru: "Переменные затраты на единицу", it: "Costo variabile unitario", tr: "Birim başına değişken maliyet", ko: "단위당 변동 비용", ar: "التكلفة المتغيرة لكل وحدة", hi: "प्रति इकाई परिवर्ती लागत", id: "Biaya variabel per unit", vi: "Chi phí biến đổi mỗi đơn vị" },
  units: { en: "Break-even units", zh: "盈亏平衡销量", ja: "損益分岐点(個)", es: "Unidades de equilibrio", pt: "Unidades de equilíbrio", fr: "Seuil de rentabilité (unités)", de: "Break-even-Menge", ru: "Точка безубыточности (ед.)", it: "Punto di pareggio (unità)", tr: "Başabaş miktarı", ko: "손익분기 수량", ar: "وحدات التعادل", hi: "ब्रेक-ईवन इकाइयाँ", id: "Unit impas", vi: "Số đơn vị hòa vốn" },
  revenue: { en: "Break-even revenue", zh: "盈亏平衡收入", ja: "損益分岐点売上", es: "Ingresos de equilibrio", pt: "Receita de equilíbrio", fr: "Chiffre d'affaires au seuil", de: "Break-even-Umsatz", ru: "Выручка безубыточности", it: "Ricavi di pareggio", tr: "Başabaş gelir", ko: "손익분기 매출", ar: "إيراد التعادل", hi: "ब्रेक-ईवन राजस्व", id: "Pendapatan impas", vi: "Doanh thu hòa vốn" },
  margin: { en: "Contribution margin / unit", zh: "单位边际贡献", ja: "限界利益/個", es: "Margen de contribución / unidad", pt: "Margem de contribuição / unidade", fr: "Marge sur coût variable / unité", de: "Deckungsbeitrag / Einheit", ru: "Маржинальная прибыль / ед.", it: "Margine di contribuzione / unità", tr: "Katkı marjı / birim", ko: "한계 이익 / 단위", ar: "هامش المساهمة / وحدة", hi: "योगदान मार्जिन / इकाई", id: "Margin kontribusi / unit", vi: "Biên góp / đơn vị" },
  marginPct: { en: "Margin", zh: "利润率", ja: "マージン", es: "Margen", pt: "Margem", fr: "Marge", de: "Marge", ru: "Маржа", it: "Margine", tr: "Marj", ko: "마진", ar: "الهامش", hi: "मार्जिन", id: "Margin", vi: "Biên lợi nhuận" },
  level: { en: "Output level", zh: "产出水平", ja: "生産水準", es: "Nivel de producción", pt: "Nível de produção", fr: "Niveau de production", de: "Ausbringungsmenge", ru: "Объём выпуска", it: "Livello di produzione", tr: "Üretim seviyesi", ko: "생산 수준", ar: "مستوى الإنتاج", hi: "उत्पादन स्तर", id: "Tingkat output", vi: "Mức sản lượng" },
  thUnits: { en: "Units", zh: "销量", ja: "個数", es: "Unidades", pt: "Unidades", fr: "Unités", de: "Einheiten", ru: "Единицы", it: "Unità", tr: "Birim", ko: "단위", ar: "الوحدات", hi: "इकाइयाँ", id: "Unit", vi: "Đơn vị" },
  thRevenue: { en: "Revenue", zh: "收入", ja: "売上", es: "Ingresos", pt: "Receita", fr: "Chiffre d'affaires", de: "Umsatz", ru: "Выручка", it: "Ricavi", tr: "Gelir", ko: "매출", ar: "الإيراد", hi: "राजस्व", id: "Pendapatan", vi: "Doanh thu" },
  thProfit: { en: "Profit", zh: "利润", ja: "利益", es: "Beneficio", pt: "Lucro", fr: "Bénéfice", de: "Gewinn", ru: "Прибыль", it: "Profitto", tr: "Kâr", ko: "이익", ar: "الربح", hi: "लाभ", id: "Laba", vi: "Lợi nhuận" },
  table: { en: "Profit at different volumes", zh: "不同销量下的利润", ja: "生産量別の利益", es: "Beneficio según el volumen", pt: "Lucro em diferentes volumes", fr: "Bénéfice selon les volumes", de: "Gewinn bei verschiedenen Mengen", ru: "Прибыль при разных объёмах", it: "Profitto a diversi volumi", tr: "Farklı hacimlerde kâr", ko: "판매량별 이익", ar: "الربح عند أحجام مختلفة", hi: "विभिन्न मात्रा पर लाभ", id: "Laba pada berbagai volume", vi: "Lợi nhuận theo các mức sản lượng" },
  never: {
    en: "With these inputs the price does not cover the variable cost, so no volume can break even. Lower the variable cost or raise the price.",
    zh: "按当前输入,单价连单位变动成本都覆盖不了,任何销量都无法回本。请降低变动成本或提高单价。",
    ja: "現在の入力では販売単価が変動費を下回っており、どの数量でも損益分岐点に届きません。変動費を下げるか、単価を上げてください。",
    es: "Con estos datos el precio no cubre el costo variable, así que ningún volumen alcanza el equilibrio. Reduzca el costo variable o suba el precio.",
    pt: "Com esses valores o preço não cobre o custo variável, então nenhum volume atinge o equilíbrio. Reduza o custo variável ou aumente o preço.",
    fr: "Avec ces valeurs, le prix ne couvre pas le coût variable : aucun volume ne permet d'atteindre l'équilibre.",
    de: "Mit diesen Werten deckt der Preis die variablen Kosten nicht — keine Menge führt zum Break-even.",
    ru: "При таких значениях цена не покрывает переменные затраты — безубыточность недостижима ни при каком объёме.",
    it: "Con questi valori il prezzo non copre il costo variabile: nessun volume raggiunge il pareggio.",
    tr: "Bu değerlerle fiyat değişken maliyeti karşılamıyor — hiçbir hacim başabaşa ulaşamaz.",
    ko: "이 입력으로는 가격이 변동 비용을 충당하지 못합니다 — 어떤 판매량으로도 손익분기에 도달할 수 없습니다.",
    ar: "بهذه القيم لا يغطي السعر التكلفة المتغيرة — لا يمكن بلوغ التعادل عند أي حجم.",
    hi: "इन मानों के साथ कीमत परिवर्ती लागत को कवर नहीं करती — कोई भी मात्रा ब्रेक-ईवन तक नहीं पहुँच सकती।",
    id: "Dengan nilai ini harga tidak menutup biaya variabel — tidak ada volume yang mencapai impas.",
    vi: "Với các giá trị này, giá không bù đắp chi phí biến đổi — không mức sản lượng nào hòa vốn được.",
  },
  formula: {
    en: "Break-even units = fixed costs ÷ (price − variable cost). Each sale contributes that difference toward fixed costs; after they are covered, the same margin is profit.",
    zh: "盈亏平衡销量 = 固定成本 ÷(单价 − 单位变动成本)。每卖出一件,这个差额就用于弥补固定成本;补足之后,同样的差额就是利润。",
    ja: "損益分岐点(個)= 固定費 ÷(販売単価 − 変動費)。1 個売れるごとにその差額が固定費を埋め、埋まり切った後は同じ差額が利益になります。",
    es: "Unidades de equilibrio = costos fijos ÷ (precio − costo variable). Cada venta aporta esa diferencia a cubrir los costos fijos; una vez cubiertos, el mismo margen es beneficio.",
    pt: "Unidades de equilíbrio = custos fixos ÷ (preço − custo variável). Cada venda contribui com essa diferença para cobrir os custos fixos; depois disso, a mesma margem vira lucro.",
    fr: "Unités au seuil = coûts fixes ÷ (prix − coût variable). Chaque vente contribue à cette différence pour couvrir les coûts fixes.",
    de: "Break-even-Menge = Fixkosten ÷ (Preis − variable Kosten). Jeder Verkauf trägt diese Differenz zur Deckung der Fixkosten bei.",
    ru: "Точка безубыточности = постоянные затраты ÷ (цена − переменные затраты). Каждая продажа вносит эту разницу в покрытие постоянных затрат.",
    it: "Unità di pareggio = costi fissi ÷ (prezzo − costo variabile). Ogni vendita contribuisce con questa differenza a coprire i costi fissi.",
    tr: "Başabaş miktarı = sabit maliyetler ÷ (fiyat − değişken maliyet). Her satış, sabit maliyetleri karşılamak için bu farka katkıda bulunur.",
    ko: "손익분기 수량 = 고정 비용 ÷ (가격 − 변동 비용). 각 판매는 이 차이만큼 고정 비용을 메웁니다.",
    ar: "وحدات التعادل = التكاليف الثابتة ÷ (السعر − التكلفة المتغيرة). كل بيع يساهم بهذا الفرق لتغطية التكاليف الثابتة.",
    hi: "ब्रेक-ईवन इकाइयाँ = स्थिर लागत ÷ (कीमत − परिवर्ती लागत). हर बिक्री इस अंतर से स्थिर लागत को कवर करती है।",
    id: "Unit impas = biaya tetap ÷ (harga − biaya variabel). Setiap penjualan menyumbang selisih itu untuk menutup biaya tetap.",
    vi: "Số đơn vị hòa vốn = chi phí cố định ÷ (giá − chi phí biến đổi). Mỗi lần bán góp phần chênh lệch đó để bù chi phí cố định.",
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
