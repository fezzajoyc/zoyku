"use client";
import { parseLocaleNumber } from "../_lib/numparse";

import { useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import { Field, NumIn, Note, Stats, Tabs, fmt, fmtMoney, pick } from "./calc-ui";

/**
 * Shared engine for GST and VAT: add tax to a net amount or extract it from
 * a gross (tax-inclusive) amount. props.kind = "gst" | "vat".
 */

const GST_RATES = [5, 12, 18, 28];

const S = {
  amount: { en: "Amount", zh: "金额", ja: "金額", es: "Importe", pt: "Valor" },
  add: { en: "Add tax (net → gross)", zh: "价外加税(净价 → 含税价)", ja: "税を追加(税抜 → 税込)", es: "Añadir impuesto (neto → bruto)", pt: "Adicionar imposto (líquido → bruto)" },
  remove: { en: "Remove tax (gross → net)", zh: "价内拆税(含税价 → 净价)", ja: "税を除外(税込 → 税抜)", es: "Extraer impuesto (bruto → neto)", pt: "Remover imposto (bruto → líquido)" },
  rate: { en: "Tax rate (%)", zh: "税率 (%)", ja: "税率 (%)", es: "Tipo impositivo (%)", pt: "Alíquota (%)" },
  net: { en: "Net amount (excl. tax)", zh: "净额(不含税)", ja: "税抜額", es: "Importe neto (sin impuesto)", pt: "Valor líquido (sem imposto)" },
  tax: { en: "Tax amount", zh: "税额", ja: "税額", es: "Importe del impuesto", pt: "Valor do imposto" },
  gross: { en: "Gross amount (incl. tax)", zh: "含税总额", ja: "税込額", es: "Importe bruto (con impuesto)", pt: "Valor bruto (com imposto)" },
};

function num(s: string): number {
  const n = parseLocaleNumber(s);
  return Number.isFinite(n) ? n : NaN;
}

export function CalcEngineTax({ kind }: { kind: string }) {
  const { locale } = useI18n();
  const isGst = kind === "gst";
  const [mode, setMode] = useState("add");
  const [amount, setAmount] = useState("10000");
  const [rate, setRate] = useState(isGst ? "18" : "20");

  const a = num(amount);
  const r = num(rate);
  let net = NaN;
  let tax = NaN;
  let gross = NaN;
  if (Number.isFinite(a) && Number.isFinite(r)) {
    if (mode === "add") {
      net = a;
      tax = a * (r / 100);
      gross = a + tax;
    } else {
      gross = a;
      net = a / (1 + r / 100);
      tax = a - net;
    }
  }

  const symbol = isGst ? "₹" : "$";

  return (
    <ToolPanel>
      <Tabs
        options={[
          { id: "add", label: pick(locale, S.add) },
          { id: "remove", label: pick(locale, S.remove) },
        ]}
        value={mode}
        onChange={setMode}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={pick(locale, S.amount)}>
          <NumIn value={amount} onChange={setAmount} aria="amount" />
        </Field>
        <Field label={pick(locale, S.rate)}>
          {isGst ? (
            <div className="flex flex-wrap gap-2">
              {GST_RATES.map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setRate(String(v))}
                  className={`mono rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                    rate === String(v)
                      ? "border-transparent bg-[var(--color-ink)] text-white dark:bg-white dark:text-[#1d1d1f]"
                      : "hairline hover:bg-[var(--color-surface)]"
                  }`}
                >
                  {v}%
                </button>
              ))}
            </div>
          ) : (
            <NumIn value={rate} onChange={setRate} aria="tax rate" />
          )}
        </Field>
      </div>
      <div className="mt-5">
        <Stats
          items={[
            { label: pick(locale, S.net), value: fmtMoney(net, locale, symbol) },
            { label: pick(locale, S.tax), value: fmtMoney(tax, locale, symbol), tone: "accent" },
            { label: pick(locale, S.gross), value: fmtMoney(gross, locale, symbol), tone: "good" },
          ]}
          cols="sm:grid-cols-3"
        />
      </div>
      <div className="mt-3">
        <Note>
          {pick(locale, {
            en: isGst
              ? "India's GST slabs are 5%, 12%, 18% and 28%; essentials sit at 0–5% and luxury/sin goods attract cess on top of 28%."
              : "Enter the rate that applies to your country — VAT ranges from 0% to 27% worldwide (e.g. 20% UK, 21% Netherlands, 19% Germany).",
            zh: isGst
              ? "印度 GST 税率分档为 5%、12%、18%、28%;生活必需品为 0–5%,奢侈品/特定商品在 28% 之上再附加 cess。"
              : "请输入你所在国家适用的税率——全球 VAT 税率介于 0% 到 27% 之间(如英国 20%、荷兰 21%、德国 19%)。",
            ja: isGst
              ? "インドの GST は 5%・12%・18%・28% の区分です。生活必需品は 0–5%、贅沢品などは 28% に追加の cess がかかります。"
              : "自国の税率を入力してください。VAT は世界で 0%〜27% の範囲です(例:英国 20%、オランダ 21%、ドイツ 19%)。",
            es: isGst
              ? "Los tramos del GST de la India son 5%, 12%, 18% y 28%; los productos básicos van de 0% a 5% y los de lujo pagan un cess adicional sobre el 28%."
              : "Introduce el tipo de tu país: el IVA va del 0% al 27% en el mundo (p. ej., 20% Reino Unido, 21% Países Bajos, 19% Alemania).",
            pt: isGst
              ? "As faixas do GST da Índia são 5%, 12%, 18% e 28%; itens essenciais ficam em 0–5% e produtos de luxo pagam cess adicional sobre os 28%."
              : "Informe a alíquota do seu país — o IVA varia de 0% a 27% no mundo (ex.: 20% Reino Unido, 21% Holanda, 19% Alemanha).",
          })}
        </Note>
      </div>
    </ToolPanel>
  );
}
