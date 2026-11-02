"use client";

import { useEffect, useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import { Field, Note, NumIn, Sel, Stats, Tabs, pick } from "./calc-ui";
import {
  addWorkdays,
  dayToIso,
  isoToDay,
  parseHolidays,
  workdaysBreakdown,
} from "../_lib/workdays";

/**
 * 工作日引擎:区间统计 + 加减 N 个工作日,支持周末定义与自贴假日清单。
 * 日期数学全部走 UTC 整数天数(tools/_lib/workdays.ts),不受时区/DST 影响。
 */

const S = {
  between: { en: "Business days between", zh: "区间工作日", ja: "営業日数を数える", es: "Días hábiles entre fechas", pt: "Dias úteis entre datas" },
  addsub: { en: "Add / subtract workdays", zh: "加减工作日", ja: "営業日の加減", es: "Sumar / restar días hábiles", pt: "Somar / subtrair dias úteis" },
  start: { en: "Start date", zh: "开始日期", ja: "開始日", es: "Fecha inicial", pt: "Data inicial" },
  end: { en: "End date", zh: "结束日期", ja: "終了日", es: "Fecha final", pt: "Data final" },
  base: { en: "Base date", zh: "基准日期", ja: "基準日", es: "Fecha base", pt: "Data base" },
  op: { en: "Direction", zh: "方向", ja: "方向", es: "Dirección", pt: "Direção" },
  add: { en: "Add", zh: "加", ja: "加える", es: "Sumar", pt: "Somar" },
  sub: { en: "Subtract", zh: "减", ja: "引く", es: "Restar", pt: "Subtrair" },
  days: { en: "Workdays", zh: "工作日数", ja: "営業日数", es: "Días hábiles", pt: "Dias úteis" },
  weekend: { en: "Weekend days", zh: "周末定义", ja: "休曜日", es: "Días de fin de semana", pt: "Fim de semana" },
  satSun: { en: "Saturday & Sunday", zh: "周六和周日", ja: "土曜・日曜", es: "Sábado y domingo", pt: "Sábado e domingo" },
  friSat: { en: "Friday & Saturday", zh: "周五和周六", ja: "金曜・土曜", es: "Viernes y sábado", pt: "Sexta e sábado" },
  holidays: {
    en: "Holidays (one YYYY-MM-DD per line)",
    zh: "节假日(每行一个,格式 YYYY-MM-DD)",
    ja: "祝日(1 行に 1 つ、YYYY-MM-DD)",
    es: "Festivos (un YYYY-MM-DD por línea)",
    pt: "Feriados (um YYYY-MM-DD por linha)",
  },
  workdays: { en: "Business days", zh: "工作日", ja: "営業日", es: "Días hábiles", pt: "Dias úteis" },
  calDays: { en: "Calendar days", zh: "日历天数", ja: "暦日数", es: "Días de calendario", pt: "Dias corridos" },
  weekendDays: { en: "Weekend days", zh: "周末天数", ja: "休曜日数", es: "Días de fin de semana", pt: "Dias de fim de semana" },
  holidayDays: { en: "Holidays excluded", zh: "扣除节假日", ja: "除外された祝日", es: "Festivos excluidos", pt: "Feriados excluídos" },
  resultDate: { en: "Resulting date", zh: "结果日期", ja: "結果の日付", es: "Fecha resultante", pt: "Data resultante" },
  inclusive: {
    en: "Both endpoint dates count: Monday to Friday is 5 business days. Holidays you list are excluded even when they fall between weekdays.",
    zh: "两端日期都计入:周一到周五算 5 个工作日。你列出的节假日会被扣除,即使它落在工作日之间。",
    ja: "両端の日付も数えます。月曜から金曜なら 5 営業日です。入力した祝日は平日の間にあっても除外されます。",
    es: "Las dos fechas extremas cuentan: de lunes a viernes son 5 días hábiles. Los festivos que indique se excluyen aunque caigan entre semana.",
    pt: "As duas datas extremas contam: de segunda a sexta são 5 dias úteis. Os feriados que você listar são excluídos mesmo caindo no meio da semana.",
  },
  invalid: {
    en: "Check the dates: this tool needs YYYY-MM-DD dates and a whole number of days.",
    zh: "请检查输入:日期需为 YYYY-MM-DD 格式,天数需为整数。",
    ja: "入力を確認してください。日付は YYYY-MM-DD、日数は整数が必要です。",
    es: "Revise los datos: las fechas deben ser YYYY-MM-DD y los días un número entero.",
    pt: "Confira os dados: as datas devem ser AAAA-MM-DD e os dias um número inteiro.",
  },
};

function todayIso(): string {
  return dayToIso(isoToDay(new Date().toISOString().slice(0, 10)) ?? 0);
}

function plusDaysIso(iso: string, days: number): string {
  const d = isoToDay(iso);
  return d === null ? iso : dayToIso(d + days);
}

function longDate(iso: string, locale: string): string {
  const d = isoToDay(iso);
  if (d === null) return iso;
  const intl =
    locale === "zh" ? "zh-CN" : locale === "ja" ? "ja-JP" : locale === "es" ? "es-ES" : locale === "pt" ? "pt-BR" : "en-US";
  return new Intl.DateTimeFormat(intl, { year: "numeric", month: "long", day: "numeric", weekday: "long" }).format(
    new Date(d * 86400000),
  );
}

export function CalcEngineWorkdays() {
  const { locale } = useI18n();
  const [mode, setMode] = useState("between");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [base, setBase] = useState("");
  const [op, setOp] = useState("add");
  const [days, setDays] = useState("10");
  const [weekend, setWeekend] = useState("sat-sun");
  const [holidayText, setHolidayText] = useState("");

  useEffect(() => {
    const t = todayIso();
    setStart(t);
    setEnd(plusDaysIso(t, 30));
    setBase(t);
  }, []);

  const holidays = useMemo(() => parseHolidays(holidayText.split("\n")), [holidayText]);

  const breakdown = useMemo(() => {
    if (mode !== "between") return null;
    return workdaysBreakdown(start, end, { weekend: weekend as "sat-sun" | "fri-sat", holidays });
  }, [mode, start, end, weekend, holidays]);

  const n = Math.floor(Number(days));
  const shifted = useMemo(() => {
    if (mode !== "addsub") return null;
    if (!Number.isFinite(n) || n <= 0) return null;
    const r = addWorkdays(base, op === "add" ? n : -n, { weekend: weekend as "sat-sun" | "fri-sat", holidays });
    return r;
  }, [mode, base, op, n, weekend, holidays]);

  return (
    <ToolPanel>
      <Tabs
        options={[
          { id: "between", label: pick(locale, S.between) },
          { id: "addsub", label: pick(locale, S.addsub) },
        ]}
        value={mode}
        onChange={setMode}
      />

      {mode === "between" ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label={pick(locale, S.start)}>
            <input type="date" className="field mono" value={start} onChange={(e) => setStart(e.target.value)} aria-label={pick(locale, S.start)} />
          </Field>
          <Field label={pick(locale, S.end)}>
            <input type="date" className="field mono" value={end} onChange={(e) => setEnd(e.target.value)} aria-label={pick(locale, S.end)} />
          </Field>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label={pick(locale, S.base)}>
            <input type="date" className="field mono" value={base} onChange={(e) => setBase(e.target.value)} aria-label={pick(locale, S.base)} />
          </Field>
          <Field label={pick(locale, S.op)}>
            <Sel value={op} onChange={setOp} aria={pick(locale, S.op)}>
              <option value="add">+ {pick(locale, S.add)}</option>
              <option value="sub">− {pick(locale, S.sub)}</option>
            </Sel>
          </Field>
          <Field label={pick(locale, S.days)}>
            <NumIn value={days} onChange={setDays} aria={pick(locale, S.days)} placeholder="10" />
          </Field>
        </div>
      )}

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Field label={pick(locale, S.weekend)}>
          <Sel value={weekend} onChange={setWeekend} aria={pick(locale, S.weekend)}>
            <option value="sat-sun">{pick(locale, S.satSun)}</option>
            <option value="fri-sat">{pick(locale, S.friSat)}</option>
          </Sel>
        </Field>
        <Field label={pick(locale, S.holidays)}>
          <textarea
            className="field mono"
            rows={3}
            value={holidayText}
            onChange={(e) => setHolidayText(e.target.value)}
            placeholder={"2026-11-26\n2026-12-25"}
            aria-label={pick(locale, S.holidays)}
            spellCheck={false}
          />
        </Field>
      </div>

      {mode === "between" ? (
        breakdown ? (
          <div className="mt-5">
            <Stats
              items={[
                { label: pick(locale, S.workdays), value: breakdown.workdays.toLocaleString(locale === "zh" ? "zh-CN" : locale === "ja" ? "ja-JP" : locale === "es" ? "es-ES" : locale === "pt" ? "pt-BR" : "en-US"), tone: "accent" },
                { label: pick(locale, S.calDays), value: String(breakdown.total) },
                { label: pick(locale, S.weekendDays), value: String(breakdown.weekendDays) },
                { label: pick(locale, S.holidayDays), value: String(breakdown.holidayDays) },
              ]}
            />
            <div className="mt-4">
              <Note>{pick(locale, S.inclusive)}</Note>
            </div>
          </div>
        ) : (
          <div className="mt-5">
            <Note>{pick(locale, S.invalid)}</Note>
          </div>
        )
      ) : shifted ? (
        <div className="mt-5 rounded-xl border hairline px-4 py-3.5">
          <span className="text-[13px] font-medium text-[var(--color-sub)]">{pick(locale, S.resultDate)}</span>
          <p className="mono mt-1 text-[17px] font-semibold">{longDate(shifted, locale)}</p>
        </div>
      ) : (
        <div className="mt-5">
          <Note>{pick(locale, S.invalid)}</Note>
        </div>
      )}
    </ToolPanel>
  );
}
