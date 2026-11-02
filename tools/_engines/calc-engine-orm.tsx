"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import { Field, Note, NumIn, Sel, Stats, TableBox, fmt, pick } from "./calc-ui";
import { oneRepMax, ormTable } from "../_lib/pace";

/**
 * 单次最大重量(1RM)引擎:Epley 主估 + Brzycki 对照,
 * 附 1–12 次重复的训练表(重量 + 占 1RM 百分比)。数学在 tools/_lib/pace.ts。
 */

const S = {
  weight: { en: "Weight lifted", zh: "重量", ja: "重量", es: "Peso levantado", pt: "Peso levantado" },
  unit: { en: "Unit", zh: "单位", ja: "単位", es: "Unidad", pt: "Unidade" },
  reps: { en: "Repetitions", zh: "重复次数", ja: "レップ数", es: "Repeticiones", pt: "Repetições" },
  epley: { en: "1RM — Epley", zh: "1RM — Epley 公式", ja: "1RM — Epley", es: "1RM — Epley", pt: "1RM — Epley" },
  brzycki: { en: "1RM — Brzycki", zh: "1RM — Brzycki 公式", ja: "1RM — Brzycki", es: "1RM — Brzycki", pt: "1RM — Brzycki" },
  tableReps: { en: "Reps", zh: "次数", ja: "レップ", es: "Reps", pt: "Reps" },
  tableWeight: { en: "Max weight", zh: "最大重量", ja: "最大重量", es: "Peso máx.", pt: "Peso máx." },
  tablePct: { en: "% of 1RM", zh: "占 1RM", ja: "1RM に対する割合", es: "% de 1RM", pt: "% de 1RM" },
  invalid: {
    en: "Enter a weight greater than zero and a whole number of reps between 1 and 20.",
    zh: "请输入大于 0 的重量,以及 1–20 之间的整数次数。",
    ja: "0 より大きい重量と 1〜20 の整数レップを入力してください。",
    es: "Introduzca un peso mayor que cero y un número entero de repeticiones entre 1 y 20.",
    pt: "Informe um peso maior que zero e um número inteiro de repetições entre 1 e 20.",
  },
  note: {
    en: "Both formulas are estimates from submaximal sets. They agree best in the 4–10 rep range; above ~10 reps fatigue makes predictions drift, and nothing beats actually testing the lift.",
    zh: "两个公式都由次极限组推算而来,在 4–10 次范围内最一致;超过约 10 次后疲劳会让预测失真,真想知道极限还是要实际测一次。",
    ja: "どちらの式もサブマックスのセットからの推定です。4〜10 レップの範囲で最も一致し、10 レップを超えると疲労の影響でずれます。正確には実際にテストするのが一番です。",
    es: "Ambas fórmulas son estimaciones a partir de series submáximas. Coinciden mejor entre 4 y 10 repeticiones; por encima de ~10 la fatiga distorsiona la predicción, y nada sustituye a probarlo de verdad.",
    pt: "As duas fórmulas são estimativas a partir de séries submáximas. Concordam melhor na faixa de 4–10 repetições; acima de ~10 reps a fadiga distorce a previsão, e nada substitui testar de verdade.",
  },
};

export function CalcEngineOrm() {
  const { locale } = useI18n();
  const [weight, setWeight] = useState("100");
  const [unit, setUnit] = useState("kg");
  const [reps, setReps] = useState("5");

  const w = Number(weight);
  const r = Number(reps);
  const orm = useMemo(() => oneRepMax(w, r), [w, r]);
  const valid = Number.isFinite(orm.epley);
  const rows = useMemo(() => (valid ? ormTable(orm.epley) : []), [valid, orm.epley]);

  return (
    <ToolPanel>
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label={pick(locale, S.weight)}>
          <NumIn value={weight} onChange={setWeight} aria={pick(locale, S.weight)} placeholder="100" />
        </Field>
        <Field label={pick(locale, S.unit)}>
          <Sel value={unit} onChange={setUnit} aria={pick(locale, S.unit)}>
            <option value="kg">kg</option>
            <option value="lb">lb</option>
          </Sel>
        </Field>
        <Field label={pick(locale, S.reps)}>
          <NumIn value={reps} onChange={setReps} aria={pick(locale, S.reps)} placeholder="5" />
        </Field>
      </div>

      {!valid ? (
        <div className="mt-5">
          <Note>{pick(locale, S.invalid)}</Note>
        </div>
      ) : (
        <>
          <div className="mt-5">
            <Stats
              items={[
                { label: pick(locale, S.epley), value: `${fmt(orm.epley, locale, 1)} ${unit}`, tone: "accent" },
                { label: pick(locale, S.brzycki), value: `${fmt(orm.brzycki, locale, 1)} ${unit}` },
              ]}
            />
          </div>
          <div className="mt-5">
            <TableBox
              head={[pick(locale, S.tableReps), pick(locale, S.tableWeight), pick(locale, S.tablePct)]}
              rows={rows.map((row) => [row.reps, `${fmt(row.weight, locale, 1)} ${unit}`, `${fmt(row.pct, locale, 1)}%`])}
            />
          </div>
        </>
      )}

      <div className="mt-4">
        <Note>{pick(locale, S.note)}</Note>
      </div>
    </ToolPanel>
  );
}
