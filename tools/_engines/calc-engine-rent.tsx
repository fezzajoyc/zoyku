"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import { Field, NumIn, Note, Sel, Stats, Tabs, fmt, fmtMoney, pick } from "./calc-ui";
import { rentAffordability } from "../_lib/finance";

/**
 * 租房负担能力引擎:收入(毛/净切换)× 比例预设 → 可负担房租上限,
 * 再减去其他月度债务与租客保险得到剩余预算,并给出顶格租房时的债务收入比(DTI)。
 * 纯数学在 tools/_lib/finance.ts 的 rentAffordability()。
 */

const S = {
  income: { en: "Monthly income", zh: "月收入", ja: "月収", es: "Ingreso mensual", pt: "Renda mensal" },
  basis: { en: "Income basis", zh: "收入口径", ja: "収入の種類", es: "Tipo de ingreso", pt: "Tipo de renda" },
  gross: { en: "Gross (before tax)", zh: "税前(毛收入)", ja: "額面(税引前)", es: "Bruto (antes de impuestos)", pt: "Bruto (antes de impostos)" },
  net: { en: "Net (take-home)", zh: "税后(到手)", ja: "手取り(税引後)", es: "Neto (después de impuestos)", pt: "Líquido (após impostos)" },
  ratio: { en: "Rent-to-income ratio", zh: "房租收入比", ja: "家賃の収入比", es: "Ratio renta / ingreso", pt: "Relação aluguel / renda" },
  r30: { en: "30% of gross — the classic rule", zh: "毛收入 30% —— 经典法则", ja: "額面の 30% — 定番の基準", es: "30% del bruto — la regla clásica", pt: "30% do bruto — a regra clássica" },
  r33: { en: "33% — a slightly looser cap", zh: "33% —— 稍宽松的上限", ja: "33% — 少し緩い上限", es: "33% — un límite algo más flexible", pt: "33% — um limite um pouco mais folgado" },
  r40: { en: "40% of net — high-cost cities", zh: "净收入 40% —— 高成本城市", ja: "手取りの 40% — 物価の高い都市", es: "40% del neto — ciudades caras", pt: "40% do líquido — cidades caras" },
  debts: { en: "Other debt payments / month", zh: "其他月度债务还款", ja: "その他の月間返済額", es: "Otras deudas / mes", pt: "Outras dívidas / mês" },
  insurance: { en: "Renter insurance / month", zh: "租客保险 / 月", ja: "賃貸保険 / 月", es: "Seguro de inquilino / mes", pt: "Seguro residencial / mês" },
  maxRent: { en: "Max affordable rent", zh: "可负担房租上限", ja: "支払える家賃の上限", es: "Alquiler máximo asumible", pt: "Aluguel máximo acessível" },
  annualRent: { en: "That rent per year", zh: "全年房租合计", ja: "年間の家賃", es: "Ese alquiler al año", pt: "Esse aluguel por ano" },
  remaining: { en: "Left after rent + debts", zh: "房租 + 债务后剩余", ja: "家賃・返済後の残り", es: "Resto tras alquiler y deudas", pt: "Sobra após aluguel e dívidas" },
  dti: { en: "Debt-to-income at max rent", zh: "顶格租房的债务收入比", ja: "上限家賃時の債務比率", es: "Deuda / ingreso con el alquiler máximo", pt: "Dívida / renda no aluguel máximo" },
  over: {
    en: "Negative budget: rent plus debts exceed the income you entered — look for a lower rent or pay down debt first.",
    zh: "预算为负:房租加债务超过了你输入的收入——考虑降低房租或先还清部分债务。",
    ja: "残りがマイナス:家賃と返済の合計が入力した収入を超えています。家賃を下げるか、先に借金を減らしましょう。",
    es: "Presupuesto negativo: el alquiler más las deudas superan el ingreso indicado; busque un alquiler más bajo o reduzca primero la deuda.",
    pt: "Orçamento negativo: aluguel mais dívidas passam da renda informada — procure um aluguel menor ou quite dívidas primeiro.",
  },
  ruleNote: {
    en: "The 30% rule traces back to the 1969 Brooke Amendment, which capped public-housing rent at 25% (later 30%) of income, and HUD still calls households paying more than 30% \"cost-burdened\". On a gross basis 30% is the classic cap; if you budget from take-home pay, 40% of net is a common ceiling in expensive cities. Lenders usually want total debts under about 36% of income.",
    zh: "「30% 法则」可追溯到 1969 年的 Brooke 修正案:公共住房租金最初封顶为收入的 25%(后调整为 30%),如今 HUD 仍把房租超过收入 30% 的家庭称为「成本负担过重」。按毛收入算,30% 是经典上限;若按到手收入规划,高成本城市常用净收入 40%。贷款机构一般希望总债务收入比控制在 36% 以内。",
    ja: "30% ルールの起源は 1969 年のブルック修正案で、公営住宅の家賃を収入の 25%(のちに 30%)に制限しました。現在でも HUD は家賃が収入の 30% を超える世帯を「費用負担過重」と呼びます。額面基準なら 30% が定番、手取り基準では物価の高い都市で 40% が上限の目安です。貸し手は総債務比率を概ね 36% 以下にすることを求めます。",
    es: "La regla del 30% se remonta a la Enmienda Brooke de 1969, que limitó el alquiler de la vivienda pública al 25% (luego 30%) del ingreso, y HUD sigue llamando \"cargados por costes\" a los hogares que pagan más del 30%. Sobre el bruto, 30% es el tope clásico; si parte del sueldo neto, 40% del neto es un techo habitual en ciudades caras. Los prestamistas suelen querer deudas totales por debajo del 36% del ingreso.",
    pt: "A regra dos 30% vem da Emenda Brooke de 1969, que limitou o aluguel de moradia pública a 25% (depois 30%) da renda, e o HUD ainda chama de \"sobrecarregados\" os lares que pagam mais de 30%. Sobre o bruto, 30% é o teto clássico; se você planeja pelo salário líquido, 40% do líquido é um teto comum em cidades caras. Credores geralmente querem dívidas totais abaixo de 36% da renda.",
  },
};

function num(s: string): number {
  const t = s.trim();
  if (t === "") return NaN;
  const n = Number(t.replace(",", "."));
  return Number.isFinite(n) ? n : NaN;
}

export function CalcEngineRent() {
  const { locale } = useI18n();
  const [income, setIncome] = useState("5000");
  const [basis, setBasis] = useState("gross");
  const [ratio, setRatio] = useState("30");
  const [debts, setDebts] = useState("");
  const [insurance, setInsurance] = useState("");

  const res = useMemo(
    () =>
      rentAffordability(
        num(income),
        num(ratio),
        debts.trim() === "" ? 0 : num(debts),
        insurance.trim() === "" ? 0 : num(insurance),
      ),
    [income, ratio, debts, insurance],
  );
  const money = (n: number) => fmtMoney(n, locale, "$");
  const negative = Number.isFinite(res.remainingBudget) && res.remainingBudget < 0;

  return (
    <ToolPanel>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={pick(locale, S.income)}>
          <NumIn value={income} onChange={setIncome} aria="monthly income" />
        </Field>
        <Field label={pick(locale, S.basis)}>
          <Tabs
            options={[
              { id: "gross", label: pick(locale, S.gross) },
              { id: "net", label: pick(locale, S.net) },
            ]}
            value={basis}
            onChange={(id) => {
              setBasis(id);
              // 切换口径时联动推荐比例:毛收入 → 30% 经典法则;到手收入 → 40% 常用上限
              setRatio(id === "net" ? "40" : "30");
            }}
          />
        </Field>
        <Field label={pick(locale, S.ratio)}>
          <Sel value={ratio} onChange={setRatio} aria="rent-to-income ratio">
            <option value="30">{pick(locale, S.r30)}</option>
            <option value="33">{pick(locale, S.r33)}</option>
            <option value="40">{pick(locale, S.r40)}</option>
          </Sel>
        </Field>
        <Field label={pick(locale, S.debts)}>
          <NumIn value={debts} onChange={setDebts} aria="other monthly debt payments" placeholder="0" />
        </Field>
        <Field label={pick(locale, S.insurance)}>
          <NumIn value={insurance} onChange={setInsurance} aria="renter insurance per month" placeholder="0" />
        </Field>
      </div>

      <div className="mt-5">
        <Stats
          items={[
            { label: pick(locale, S.maxRent), value: money(res.maxRent), tone: "accent" },
            { label: pick(locale, S.annualRent), value: money(res.annualRent) },
            {
              label: pick(locale, S.remaining),
              value: money(res.remainingBudget),
              tone: negative ? "bad" : "good",
            },
            { label: pick(locale, S.dti), value: Number.isFinite(res.dtiPct) ? `${fmt(res.dtiPct, locale, 1)}%` : "—" },
          ]}
        />
      </div>

      <div className="mt-3 space-y-2">
        {negative && <Note>{pick(locale, S.over)}</Note>}
        <Note>{pick(locale, S.ruleNote)}</Note>
      </div>
    </ToolPanel>
  );
}
