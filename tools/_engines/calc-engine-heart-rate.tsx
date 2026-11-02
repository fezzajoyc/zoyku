"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import { Field, Note, NumIn, Stats, Tabs, TableBox, fmt, pick } from "./calc-ui";
import { hrZones, maxHeartRate } from "../_lib/heart-rate";

/**
 * 心率训练区引擎:年龄估最大心率(Tanaka 一族回归式)或手输,
 * Karvonen 储备心率法切五区。数学在 tools/_lib/heart-rate.ts,这里只做 UI 编排。
 */

const S = {
  byAge: { en: "Estimate from age", zh: "按年龄估算", ja: "年齢から推定", es: "Estimar por edad", pt: "Estimar por idade" },
  manual: { en: "Manual max HR", zh: "手动输入最大心率", ja: "最大心拍数を手入力", es: "FC máx. manual", pt: "FC máx. manual" },
  age: { en: "Age", zh: "年龄", ja: "年齢", es: "Edad", pt: "Idade" },
  resting: { en: "Resting heart rate (bpm)", zh: "静息心率(次/分)", ja: "安静時心拍数(bpm)", es: "Frecuencia en reposo (lpm)", pt: "Frequência em repouso (bpm)" },
  maxHr: { en: "Max heart rate (bpm)", zh: "最大心率(次/分)", ja: "最大心拍数(bpm)", es: "Frecuencia máx. (lpm)", pt: "Frequência máx. (bpm)" },
  maxOut: { en: "Max heart rate", zh: "最大心率", ja: "最大心拍数", es: "FC máxima", pt: "FC máxima" },
  reserve: { en: "Heart-rate reserve", zh: "心率储备(HRR)", ja: "心拍数予備能(HRR)", es: "Reserva de FC (HRR)", pt: "Reserva de FC (HRR)" },
  zone: { en: "Zone", zh: "区间", ja: "ゾーン", es: "Zona", pt: "Zona" },
  intensity: { en: "% of reserve", zh: "占储备 %", ja: "予備能に対する%", es: "% de reserva", pt: "% da reserva" },
  bpmRange: { en: "Heart rate (bpm)", zh: "心率(次/分)", ja: "心拍数(bpm)", es: "Frecuencia (lpm)", pt: "Frequência (bpm)" },
  z1: { en: "Z1 — Warm-up", zh: "Z1 — 热身", ja: "Z1 — ウォームアップ", es: "Z1 — Calentamiento", pt: "Z1 — Aquecimento" },
  z2: { en: "Z2 — Fat burn", zh: "Z2 — 燃脂", ja: "Z2 — 脂肪燃焼", es: "Z2 — Quemagrasas", pt: "Z2 — Queima de gordura" },
  z3: { en: "Z3 — Aerobic", zh: "Z3 — 有氧", ja: "Z3 — 有酸素", es: "Z3 — Aeróbica", pt: "Z3 — Aeróbica" },
  z4: { en: "Z4 — Anaerobic", zh: "Z4 — 无氧", ja: "Z4 — 無酸素", es: "Z4 — Anaeróbica", pt: "Z4 — Anaeróbica" },
  z5: { en: "Z5 — VO₂ max", zh: "Z5 — 最大摄氧", ja: "Z5 — 最大酸素摂取量", es: "Z5 — VO₂ máx.", pt: "Z5 — VO₂ máx." },
  invalid: {
    en: "Enter an age between 10 and 100 and a resting heart rate below your max heart rate.",
    zh: "请输入 10–100 之间的年龄,以及低于最大心率的静息心率。",
    ja: "10〜100 の年齢と、最大心拍数より低い安静時心拍数を入力してください。",
    es: "Introduzca una edad entre 10 y 100 y una frecuencia en reposo inferior a su FC máxima.",
    pt: "Informe uma idade entre 10 e 100 e uma frequência em repouso abaixo da sua FC máxima.",
  },
  manualInvalid: {
    en: "Enter a max heart rate above 0 and a resting heart rate below it.",
    zh: "请输入大于 0 的最大心率,以及低于它的静息心率。",
    ja: "0 より大きい最大心拍数と、それより低い安静時心拍数を入力してください。",
    es: "Introduzca una FC máxima mayor que cero y una frecuencia en reposo inferior.",
    pt: "Informe uma FC máxima maior que zero e uma frequência em repouso abaixo dela.",
  },
  karvonen: {
    en: "Zone bounds use the Karvonen method: bpm = resting + pct × (max − resting). The reserve (max − resting) is scaled, not the max itself, so zones stay honest for people with low or high resting heart rates.",
    zh: "区间用 Karvonen 储备心率法计算:心率 = 静息 + 百分比 × (最大 − 静息)。缩放的是储备(最大 − 静息)而不是最大心率本身,静息偏高或偏低的人得到的区间才不失真。",
    ja: "ゾーンは Karvonen の予備心拍数法で計算します:心拍数 = 安静時 + 割合 × (最大 − 安静時)。最大値そのものではなく予備能(最大 − 安静時)を振り分けるため、安静時が高め・低めの人でも Zone が歪みません。",
    es: "Los límites usan el método Karvonen: lpm = reposo + % × (máx − reposo). Se escala la reserva (máx − reposo), no la FC máxima, así las zonas son honestas con reposos altos o bajos.",
    pt: "Os limites usam o método de Karvonen: bpm = repouso + % × (máx − repouso). O que se escala é a reserva (máx − repouso), não a FC máxima, então as zonas ficam honestas para repousos altos ou baixos.",
  },
};

const ZONE_LABELS = [S.z1, S.z2, S.z3, S.z4, S.z5];

export function CalcEngineHeartRate() {
  const { locale } = useI18n();
  const [mode, setMode] = useState("age");
  const [age, setAge] = useState("30");
  const [resting, setResting] = useState("60");
  const [manualMax, setManualMax] = useState("185");

  const rest = Number(resting);
  const max = useMemo(
    () => (mode === "age" ? maxHeartRate(Number(age)) : Number(manualMax)),
    [mode, age, manualMax],
  );
  const zones = useMemo(() => hrZones(max, rest), [max, rest]);
  const valid = zones.length > 0;

  return (
    <ToolPanel>
      <Tabs
        options={[
          { id: "age", label: pick(locale, S.byAge) },
          { id: "manual", label: pick(locale, S.manual) },
        ]}
        value={mode}
        onChange={setMode}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {mode === "age" ? (
          <Field label={pick(locale, S.age)}>
            <NumIn value={age} onChange={setAge} aria={pick(locale, S.age)} placeholder="30" />
          </Field>
        ) : (
          <Field label={pick(locale, S.maxHr)}>
            <NumIn value={manualMax} onChange={setManualMax} aria={pick(locale, S.maxHr)} placeholder="185" />
          </Field>
        )}
        <Field label={pick(locale, S.resting)}>
          <NumIn value={resting} onChange={setResting} aria={pick(locale, S.resting)} placeholder="60" />
        </Field>
      </div>

      {!valid ? (
        <div className="mt-5">
          <Note>{pick(locale, mode === "age" ? S.invalid : S.manualInvalid)}</Note>
        </div>
      ) : (
        <>
          <div className="mt-5">
            <Stats
              items={[
                { label: pick(locale, S.maxOut), value: fmt(max, locale, 1), tone: "accent" },
                { label: pick(locale, S.reserve), value: fmt(max - rest, locale, 1) },
              ]}
            />
          </div>
          <div className="mt-4">
            <TableBox
              head={[pick(locale, S.zone), pick(locale, S.intensity), pick(locale, S.bpmRange)]}
              rows={zones.map((z, i) => [
                pick(locale, ZONE_LABELS[i]),
                `${z.pctLow}–${z.pctHigh}%`,
                `${fmt(z.low, locale, 0)}–${fmt(z.high, locale, 0)}`,
              ])}
            />
          </div>
          <div className="mt-4">
            <Note>{pick(locale, S.karvonen)}</Note>
          </div>
        </>
      )}
    </ToolPanel>
  );
}
