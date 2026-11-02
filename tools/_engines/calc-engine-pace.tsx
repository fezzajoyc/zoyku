"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { Field, NumIn, Note, Sel, Stats, Tabs, TableBox, fmt, pick } from "./calc-ui";
import { KM_PER_MI, RACE_DISTANCES, formatDuration, paceFor, riegelPredict } from "../_lib/pace";

/**
 * 跑步配速引擎:配速/速度计算 + Riegel 公式竞赛预测。
 * 数学全部在 tools/_lib/pace.ts,这里只做 UI 编排。
 */

const S = {
  pace: { en: "Pace", zh: "配速", ja: "ペース", es: "Ritmo", pt: "Ritmo" },
  predict: { en: "Race predictor", zh: "比赛成绩预测", ja: "レース予測", es: "Predicción de carrera", pt: "Previsão de prova" },
  distance: { en: "Distance", zh: "距离", ja: "距離", es: "Distancia", pt: "Distância" },
  d5k: { en: "5K", zh: "5 公里", ja: "5 km", es: "5 km", pt: "5 km" },
  d10k: { en: "10K", zh: "10 公里", ja: "10 km", es: "10 km", pt: "10 km" },
  dhm: { en: "Half marathon", zh: "半程马拉松", ja: "ハーフマラソン", es: "Media maratón", pt: "Meia maratona" },
  dmarathon: { en: "Marathon", zh: "全程马拉松", ja: "フルマラソン", es: "Maratón", pt: "Maratona" },
  dcustom: { en: "Custom", zh: "自定义", ja: "カスタム", es: "Personalizada", pt: "Personalizada" },
  km: { en: "km", zh: "公里", ja: "km", es: "km", pt: "km" },
  mi: { en: "miles", zh: "英里", ja: "マイル", es: "millas", pt: "milhas" },
  hours: { en: "Hours", zh: "时", ja: "時", es: "Horas", pt: "Horas" },
  minutes: { en: "Minutes", zh: "分", ja: "分", es: "Minutos", pt: "Minutos" },
  seconds: { en: "Seconds", zh: "秒", ja: "秒", es: "Segundos", pt: "Segundos" },
  perKm: { en: "Pace per kilometer", zh: "每公里配速", ja: "1 km のペース", es: "Ritmo por kilómetro", pt: "Ritmo por quilômetro" },
  perMi: { en: "Pace per mile", zh: "每英里配速", ja: "1 マイルのペース", es: "Ritmo por milla", pt: "Ritmo por milha" },
  speedKmh: { en: "Speed (km/h)", zh: "速度(公里/小时)", ja: "速度(km/時)", es: "Velocidad (km/h)", pt: "Velocidade (km/h)" },
  speedMph: { en: "Speed (mph)", zh: "速度(英里/小时)", ja: "速度(マイル/時)", es: "Velocidad (mph)", pt: "Velocidade (mph)" },
  target: { en: "Target race", zh: "目标比赛", ja: "目標レース", es: "Carrera objetivo", pt: "Prova alvo" },
  predicted: { en: "Predicted time", zh: "预测完赛时间", ja: "予測タイム", es: "Tiempo previsto", pt: "Tempo previsto" },
  tableDist: { en: "Race", zh: "比赛", ja: "レース", es: "Carrera", pt: "Prova" },
  tableTime: { en: "Predicted time", zh: "预测时间", ja: "予測タイム", es: "Tiempo previsto", pt: "Tempo previsto" },
  tablePace: { en: "Pace /km", zh: "配速/公里", ja: "ペース/km", es: "Ritmo/km", pt: "Ritmo/km" },
  needBoth: {
    en: "Enter a distance greater than zero and a time above 0:00 to see results.",
    zh: "请输入大于 0 的距离和一个不为 0 的用时。",
    ja: "0 より大きい距離と 0 以外のタイムを入力してください。",
    es: "Introduzca una distancia mayor que cero y un tiempo distinto de 0:00.",
    pt: "Informe uma distância maior que zero e um tempo diferente de 0:00.",
  },
  riegelNote: {
    en: "Prediction uses Peter Riegel's formula T₂ = T₁ × (D₂/D₁)^1.06, published in Runner's World (1977). It assumes similar training for both distances.",
    zh: "预测采用 Peter Riegel 公式 T₂ = T₁ × (D₂/D₁)^1.06(1977 年发表于 Runner's World)。前提是两种距离的训练量相当。",
    ja: "予測は Peter Riegel の式 T₂ = T₁ × (D₂/D₁)^1.06(Runner's World、1977 年)を使用します。両方の距離で同程度のトレーニングができているのが前提です。",
    es: "La predicción usa la fórmula de Peter Riegel T₂ = T₁ × (D₂/D₁)^1.06, publicada en Runner's World (1977). Supone un entrenamiento similar para ambas distancias.",
    pt: "A previsão usa a fórmula de Peter Riegel T₂ = T₁ × (D₂/D₁)^1.06, publicada na Runner's World (1977). pressupõe treino equivalente para as duas distâncias.",
  },
};

const RACE_OPTIONS = ["5k", "10k", "hm", "marathon"] as const;
type RaceKey = (typeof RACE_OPTIONS)[number] | "custom";

export function CalcEnginePace() {
  const { locale } = useI18n();
  const [mode, setMode] = useState("pace");
  const [preset, setPreset] = useState<RaceKey>("10k");
  const [custom, setCustom] = useState("10");
  const [unit, setUnit] = useState("km");
  const [h, setH] = useState("0");
  const [m, setM] = useState("50");
  const [s, setS] = useState("0");

  const distLabel = (key: RaceKey): string =>
    key === "custom"
      ? pick(locale, S.dcustom)
      : key === "5k"
        ? pick(locale, S.d5k)
        : key === "10k"
          ? pick(locale, S.d10k)
          : key === "hm"
            ? pick(locale, S.dhm)
            : pick(locale, S.dmarathon);

  const distanceKm = useMemo(() => {
    if (preset !== "custom") return RACE_DISTANCES[preset];
    const raw = Number(custom);
    if (!Number.isFinite(raw) || raw <= 0) return NaN;
    return unit === "mi" ? raw * KM_PER_MI : raw;
  }, [preset, custom, unit]);

  const totalSec = useMemo(() => {
    const hh = Number(h), mm = Number(m), ss = Number(s);
    if (![hh, mm, ss].every(Number.isFinite)) return NaN;
    return hh * 3600 + mm * 60 + ss;
  }, [h, m, s]);

  const valid = Number.isFinite(distanceKm) && distanceKm > 0 && Number.isFinite(totalSec) && totalSec > 0;
  const pace = paceFor(distanceKm, totalSec);
  const summary = valid
    ? `${distLabel(preset)} ${formatDuration(totalSec)} — ${formatDuration(pace.secPerKm)}/km`
    : "";

  return (
    <ToolPanel>
      <Tabs
        options={[
          { id: "pace", label: pick(locale, S.pace) },
          { id: "predict", label: pick(locale, S.predict) },
        ]}
        value={mode}
        onChange={setMode}
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <Field label={pick(locale, S.distance)}>
          <Sel value={preset} onChange={(v) => setPreset(v as RaceKey)} aria={pick(locale, S.distance)}>
            {RACE_OPTIONS.map((k) => (
              <option key={k} value={k}>
                {distLabel(k)}
              </option>
            ))}
            <option value="custom">{pick(locale, S.dcustom)}</option>
          </Sel>
        </Field>
        {preset === "custom" && (
          <>
            <Field label={`${pick(locale, S.distance)} (${unit === "mi" ? pick(locale, S.mi) : pick(locale, S.km)})`}>
              <NumIn value={custom} onChange={setCustom} aria={pick(locale, S.distance)} placeholder="10" />
            </Field>
            <Field label={pick(locale, { en: "Unit", zh: "单位", ja: "単位", es: "Unidad", pt: "Unidade" })}>
              <Sel value={unit} onChange={setUnit} aria="unit">
                <option value="km">{pick(locale, S.km)}</option>
                <option value="mi">{pick(locale, S.mi)}</option>
              </Sel>
            </Field>
          </>
        )}
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <Field label={pick(locale, S.hours)}>
          <NumIn value={h} onChange={setH} aria={pick(locale, S.hours)} placeholder="0" />
        </Field>
        <Field label={pick(locale, S.minutes)}>
          <NumIn value={m} onChange={setM} aria={pick(locale, S.minutes)} placeholder="50" />
        </Field>
        <Field label={pick(locale, S.seconds)}>
          <NumIn value={s} onChange={setS} aria={pick(locale, S.seconds)} placeholder="0" />
        </Field>
      </div>

      {!valid ? (
        <div className="mt-5">
          <Note>{pick(locale, S.needBoth)}</Note>
        </div>
      ) : mode === "pace" ? (
        <>
          <div className="mt-5">
            <Stats
              items={[
                { label: pick(locale, S.perKm), value: formatDuration(pace.secPerKm), tone: "accent" },
                { label: pick(locale, S.perMi), value: formatDuration(pace.secPerMi) },
                { label: pick(locale, S.speedKmh), value: fmt(pace.kmh, locale, 2) },
                { label: pick(locale, S.speedMph), value: fmt(pace.mph, locale, 2) },
              ]}
            />
          </div>
          <div className="mt-4">
            <CopyButton value={summary} label={pick(locale, { en: "Copy result", zh: "复制结果", ja: "結果をコピー", es: "Copiar resultado", pt: "Copiar resultado" })} />
          </div>
        </>
      ) : (
        <>
          <div className="mt-5">
            <TableBox
              head={[pick(locale, S.tableDist), pick(locale, S.tableTime), pick(locale, S.tablePace)]}
              rows={RACE_OPTIONS.map((k) => {
                const t = riegelPredict(totalSec, distanceKm, RACE_DISTANCES[k]);
                return [distLabel(k), formatDuration(t), formatDuration(t / RACE_DISTANCES[k])];
              })}
            />
          </div>
          <div className="mt-4">
            <Note>{pick(locale, S.riegelNote)}</Note>
          </div>
        </>
      )}
    </ToolPanel>
  );
}
