"use client";

import { useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import { CopyButton } from "@/components/client-ui";
import { Field, Note, NumIn, Sel, Stats, fmt, pick } from "./calc-ui";
import { estimateEta, humanizeDuration, type RateUnit } from "../_lib/eta";

function dt(ms: number, locale: string): string {
  return new Intl.DateTimeFormat(
    { en: "en-US", zh: "zh-CN", ja: "ja-JP", es: "es-ES", pt: "pt-BR", fr: "fr-FR", de: "de-DE", ru: "ru-RU", it: "it-IT", tr: "tr-TR", ko: "ko-KR", ar: "ar-SA", hi: "hi-IN", id: "id-ID", vi: "vi-VN" }[locale] ?? "en-US",
    { dateStyle: "medium", timeStyle: "short" },
  ).format(new Date(ms));
}

export function UtilEngineEta() {
  const { locale } = useI18n();
  const [total, setTotal] = useState("120");
  const [rate, setRate] = useState("8");
  const [unit, setUnit] = useState<RateUnit>("day");
  const [hpd, setHpd] = useState("8");
  const [useStart, setUseStart] = useState(false);
  const [startStr, setStartStr] = useState("");

  const startMs = useStart && startStr ? new Date(startStr).getTime() : Date.now();
  const res = estimateEta({
    startMs: Number.isFinite(startMs) ? startMs : Date.now(),
    total: Number(total),
    rate: Number(rate),
    rateUnit: unit,
    hoursPerDay: Number(hpd) || undefined,
  });

  return (
    <ToolPanel>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={pick(locale, { en: "Total workload (units)", zh: "总任务量(单位)", ja: "総作業量(単位)", es: "Carga total (unidades)", pt: "Carga total (unidades)" })}>
          <NumIn value={total} onChange={setTotal} aria="total workload" placeholder="120" />
        </Field>
        <Field label={pick(locale, { en: "Completion rate", zh: "完成速率", ja: "処理ペース", es: "Ritmo de avance", pt: "Ritmo de conclusão" })}>
          <div className="flex gap-2">
            <NumIn value={rate} onChange={setRate} aria="rate" className="!w-24" placeholder="8" />
            <Sel value={unit} onChange={(v) => setUnit(v as RateUnit)} aria="rate unit">
              <option value="hour">{pick(locale, { en: "per hour", zh: "每小时", ja: "1時間あたり", es: "por hora", pt: "por hora" })}</option>
              <option value="day">{pick(locale, { en: "per day", zh: "每天", ja: "1日あたり", es: "por día", pt: "por dia" })}</option>
              <option value="week">{pick(locale, { en: "per week", zh: "每周", ja: "1週間あたり", es: "por semana", pt: "por semana" })}</option>
            </Sel>
          </div>
        </Field>
        <Field label={pick(locale, { en: "Working hours per day", zh: "每日工作时段(小时)", ja: "1日の作業時間(時)", es: "Horas de trabajo por día", pt: "Horas de trabalho por dia" })}>
          <NumIn value={hpd} onChange={setHpd} aria="hours per day" placeholder="8" />
        </Field>
        <Field label={pick(locale, { en: "Start time", zh: "开始时间", ja: "開始時刻", es: "Hora de inicio", pt: "Hora de início" })}>
          <div className="flex flex-wrap items-center gap-2">
            <label className="flex items-center gap-1.5 text-[13px]">
              <input type="checkbox" checked={useStart} onChange={(e) => setUseStart(e.target.checked)} />
              {pick(locale, { en: "Custom", zh: "自定义", ja: "指定", es: "Personalizada", pt: "Personalizada" })}
            </label>
            {useStart && (
              <input
                type="datetime-local"
                className="field mono"
                value={startStr}
                onChange={(e) => setStartStr(e.target.value)}
                aria-label="start time"
              />
            )}
          </div>
        </Field>
      </div>

      <div className="mt-5">
        {res ? (
          <Stats
            items={[
              {
                label: pick(locale, { en: "Estimated finish", zh: "预计完成时间", ja: "完了予定時刻", es: "Finalización estimada", pt: "Conclusão estimada" }),
                value: dt(res.finishMs, locale),
                tone: "accent",
              },
              {
                label: pick(locale, { en: "Time remaining", zh: "剩余时长", ja: "残り時間", es: "Tiempo restante", pt: "Tempo restante" }),
                value: humanizeDuration(res.durationMs, locale),
              },
              {
                label: pick(locale, { en: "Calendar days remaining", zh: "剩余天数", ja: "残り日数", es: "Días restantes", pt: "Dias restantes" }),
                value: `${fmt(res.daysRemaining, locale, 1)} ${pick(locale, { en: "days", zh: "天", ja: "日", es: "días", pt: "dias" })}`,
              },
              {
                label: pick(locale, { en: "Total working hours", zh: "总工作小时", ja: "総作業時間", es: "Horas de trabajo", pt: "Horas de trabalho" }),
                value: fmt(res.hours, locale, 1),
              },
            ]}
          />
        ) : (
          <p className="text-[13.5px] leading-5 text-[var(--color-bad)]" role="alert">
            {pick(locale, {
              en: "Enter a positive workload, rate and daily hours (1–24).",
              zh: "请输入正数的任务量、速率和每日小时数(1–24)。",
              ja: "正の作業量・ペース・1日の時間(1〜24)を入力してください。",
              es: "Introduzca carga, ritmo y horas diarias positivos (1–24).",
              pt: "Informe carga, ritmo e horas diárias positivos (1–24).",
            })}
          </p>
        )}
        {res && (
          <div className="mt-3 flex items-center gap-3">
            <CopyButton value={dt(res.finishMs, locale)} />
            <Note>
              {pick(locale, {
                en: "The countdown counts calendar time; a \"per day\" rate assumes the daily working hours above, a \"per week\" rate assumes a 5-day week.",
                zh: "倒计时按自然日历计算;\"每天\"速率按上方每日工时,\"每周\"速率按每周 5 个工作日。",
                ja: "カウントダウンは暦時間です。「1日あたり」は上の作業時間、「1週間あたり」は週5日を前提にします。",
                es: "La cuenta atrás usa tiempo natural; «por día» asume las horas diarias y «por semana», 5 días laborales.",
                pt: "A contagem usa tempo natural; \"por dia\" assume as horas diárias e \"por semana\", 5 dias úteis.",
              })}
            </Note>
          </div>
        )}
      </div>
    </ToolPanel>
  );
}
