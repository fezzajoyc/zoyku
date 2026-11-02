"use client";

import { useEffect, useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import { Field, Note, Tabs, TableBox, pick } from "./calc-ui";
import { bedtimesFor, formatHm, parseHm, wakeTimesFor } from "../_lib/sleep";

/**
 * 睡眠周期引擎:两种用法共用一套周期数学(90 分钟周期 + 15 分钟入睡)。
 * - "按起床时间倒推就寝点"
 * - "现在就睡,顺推醒来时刻"
 * 数学在 tools/_lib/sleep.ts。
 */

const S = {
  bed: { en: "Wake-up time → bedtime", zh: "按起床时间倒推", ja: "起床時刻から就寝時刻へ", es: "Hora de despertar → acostarse", pt: "Hora de acordar → deitar" },
  now: { en: "Sleep now → wake times", zh: "现在就睡 → 醒来时间", ja: "今寝る → 起きる時刻", es: "Dormir ahora → despertares", pt: "Dormir agora → despertares" },
  wakeAt: { en: "I need to wake up at", zh: "我需要在几点起床", ja: "起床時刻", es: "Necesito despertarme a las", pt: "Preciso acordar às" },
  sleepAt: { en: "I'm going to bed now", zh: "我现在上床睡觉", ja: "今から寝ます", es: "Me acuesto ahora", pt: "Vou dormir agora" },
  cycles: { en: "Cycles", zh: "周期", ja: "サイクル", es: "Ciclos", pt: "Ciclos" },
  sleep: { en: "Sleep", zh: "睡眠时长", ja: "睡眠時間", es: "Sueño", pt: "Sono" },
  clock: { en: "Clock time", zh: "时刻", ja: "時刻", es: "Hora", pt: "Hora" },
  prevDay: { en: "previous day", zh: "前一天", ja: "前日", es: "día anterior", pt: "dia anterior" },
  nextDay: { en: "next day", zh: "次日", ja: "翌日", es: "día siguiente", pt: "dia seguinte" },
  cyclesUnit: { en: "cycles", zh: "个周期", ja: "サイクル", es: "ciclos", pt: "ciclos" },
  invalid: {
    en: "Pick a valid time of day to see the cycle table.",
    zh: "请选择一个有效的时刻。",
    ja: "有効な時刻を選択してください。",
    es: "Elija una hora válida para ver la tabla de ciclos.",
    pt: "Escolha um horário válido para ver a tabela de ciclos.",
  },
  caveat: {
    en: "The math uses the 90-minute average cycle plus about 15 minutes to fall asleep. Individual cycles vary from roughly 80 to 120 minutes, so treat these times as targets, not guarantees.",
    zh: "计算采用 90 分钟的平均周期加约 15 分钟入睡时间。个体周期在 80–120 分钟之间波动,这些时刻只能当作目标,而非保证。",
    ja: "計算は 90 分の平均サイクルと約 15 分の入眠時間に基づきます。個人のサイクルは 80〜120 分程度で異なるため、目安としてお使いください。",
    es: "El cálculo usa el ciclo medio de 90 minutos más unos 15 minutos para conciliar el sueño. Los ciclos individuales varían entre 80 y 120 minutos: tome estas horas como objetivos, no como garantías.",
    pt: "O cálculo usa o ciclo médio de 90 minutos mais cerca de 15 minutos para pegar no sono. Os ciclos individuais variam de 80 a 120 minutos: trate estes horários como metas, não garantias.",
  },
};

function useNowHm(): string {
  const [v, setV] = useState("23:00");
  useEffect(() => {
    const d = new Date();
    setV(`${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`);
  }, []);
  return v;
}

function durMin(locale: string, minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (locale === "zh") return m === 0 ? `${h} 小时` : `${h} 小时 ${m} 分钟`;
  if (locale === "ja") return m === 0 ? `${h} 時間` : `${h} 時間 ${m} 分`;
  if (locale === "es") return m === 0 ? `${h} h` : `${h} h ${m} min`;
  if (locale === "pt") return m === 0 ? `${h} h` : `${h} h ${m} min`;
  return m === 0 ? `${h} h` : `${h} h ${m} min`;
}

export function CalcEngineSleep() {
  const { locale } = useI18n();
  const [mode, setMode] = useState("bed");
  const [wake, setWake] = useState("07:00");
  const nowHm = useNowHm();
  const [bed, setBed] = useState("23:00");

  useEffect(() => {
    if (mode === "now") setBed(nowHm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  const minutes = useMemo(() => {
    const src = mode === "bed" ? wake : bed;
    return parseHm(src);
  }, [mode, wake, bed]);

  const rows = useMemo(() => {
    if (minutes === null) return [];
    return mode === "bed" ? bedtimesFor(minutes) : wakeTimesFor(minutes);
  }, [mode, minutes]);

  const dayTag = (m: number): string => {
    const off = Math.floor(m / 1440);
    if (off < 0) return ` (${pick(locale, S.prevDay)})`;
    if (off > 0) return ` (${pick(locale, S.nextDay)})`;
    return "";
  };

  return (
    <ToolPanel>
      <Tabs
        options={[
          { id: "bed", label: pick(locale, S.bed) },
          { id: "now", label: pick(locale, S.now) },
        ]}
        value={mode}
        onChange={setMode}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={mode === "bed" ? pick(locale, S.wakeAt) : pick(locale, S.sleepAt)}>
          <input
            type="time"
            className="field mono"
            value={mode === "bed" ? wake : bed}
            onChange={(e) => (mode === "bed" ? setWake(e.target.value) : setBed(e.target.value))}
            aria-label={mode === "bed" ? pick(locale, S.wakeAt) : pick(locale, S.sleepAt)}
          />
        </Field>
      </div>

      {rows.length === 0 ? (
        <div className="mt-5">
          <Note>{pick(locale, S.invalid)}</Note>
        </div>
      ) : (
        <div className="mt-5">
          <TableBox
            head={[
              pick(locale, S.cycles),
              pick(locale, S.sleep),
              pick(locale, S.clock),
            ]}
            rows={rows.map((r) => [
              `${r.cycles} ${pick(locale, S.cyclesUnit)}`,
              durMin(locale, r.sleepMinutes),
              `${formatHm(r.minutes)}${dayTag(r.minutes)}`,
            ])}
          />
        </div>
      )}

      <div className="mt-4">
        <Note>{pick(locale, S.caveat)}</Note>
      </div>
    </ToolPanel>
  );
}
