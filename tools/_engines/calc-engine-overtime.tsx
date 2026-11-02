"use client";
import { parseLocaleNumber } from "../_lib/numparse";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import { Field, NumIn, Note, Sel, Stats, Tabs, fmtMoney, pick } from "./calc-ui";
import { overtimePay, salaryBreakdown } from "../_lib/finance";

/**
 * 加班费引擎:时薪直填,或年薪经 salaryBreakdown(每周常规工时 × 每年周数)折成时薪。
 * 纯数学在 tools/_lib/finance.ts 的 overtimePay():regular = rate × hours,
 * overtime = rate × multiplier × OT hours,annual 按 weeksPerYear 年化。
 */

const S = {
  hourly: { en: "Hourly rate", zh: "时薪", ja: "時給", es: "Tarifa por hora", pt: "Valor por hora" },
  salary: { en: "Annual salary", zh: "年薪", ja: "年収", es: "Salario anual", pt: "Salário anual" },
  regularHours: { en: "Regular hours / week", zh: "每周常规工时", ja: "通常の週労働時間", es: "Horas regulares / semana", pt: "Horas regulares / semana" },
  otHours: { en: "Overtime hours / week", zh: "每周加班工时", ja: "週間残業時間", es: "Horas extra / semana", pt: "Horas extras / semana" },
  multiplier: { en: "Overtime multiplier", zh: "加班倍率", ja: "残業の倍率", es: "Multiplicador de horas extra", pt: "Multiplicador de horas extras" },
  weeksYear: { en: "Weeks per year", zh: "每年工作周数", ja: "年間労働週数", es: "Semanas por año", pt: "Semanas por ano" },
  otRate: { en: "Overtime rate", zh: "加班时薪", ja: "残業時給", es: "Tarifa de horas extra", pt: "Valor da hora extra" },
  regularPay: { en: "Regular pay / week", zh: "常规周薪", ja: "通常の週給", es: "Pago regular / semana", pt: "Pagamento regular / semana" },
  otPay: { en: "Overtime pay / week", zh: "加班周薪", ja: "残業代 / 週", es: "Pago de horas extra / semana", pt: "Pago de horas extras / semana" },
  totalWeekly: { en: "Total weekly pay", zh: "每周总收入", ja: "週給の合計", es: "Pago semanal total", pt: "Pagamento semanal total" },
  annual: { en: "Annualized (all weeks)", zh: "年化总收入(按全年)", ja: "年換算収入(通年)", es: "Anualizado (todas las semanas)", pt: "Anualizado (ano todo)" },
  modeHourly: { en: "Hourly rate", zh: "按时薪", ja: "時給で入力", es: "Por hora", pt: "Por hora" },
  modeSalary: { en: "Annual salary", zh: "按年薪", ja: "年収で入力", es: "Salario anual", pt: "Salário anual" },
  m15: { en: "1.5× (time and a half)", zh: "1.5 倍(工作日加班)", ja: "1.5 倍(1.5 割増)", es: "1,5× (hora y media)", pt: "1,5× (hora e meia)" },
  m20: { en: "2× (double time)", zh: "2 倍(双倍)", ja: "2 倍(ダブル)", es: "2× (tiempo doble)", pt: "2× (dobro)" },
  salaryNote: {
    en: "Salary mode derives the hourly rate as annual salary ÷ (regular hours × weeks per year) — 52,000 over 40-hour weeks and 52 weeks is exactly 25.00/hour before any overtime.",
    zh: "年薪模式下,时薪 = 年薪 ÷(每周常规工时 × 每年周数)——52,000 按 40 小时、52 周折算,加班前时薪正好 25.00。",
    ja: "年収モードでは時給 = 年収 ÷(通常の週労働時間 × 年間週数)で求めます。52,000 を週 40 時間 × 52 週で割ると、残業前の時給はちょうど 25.00 です。",
    es: "En modo salario, la tarifa horaria es salario anual ÷ (horas regulares × semanas por año): 52.000 con semanas de 40 horas y 52 semanas son exactamente 25,00/hora antes de horas extra.",
    pt: "No modo salário, o valor por hora é salário anual ÷ (horas regulares × semanas por ano): 52.000 em semanas de 40 horas e 52 semanas dá exatamente 25,00/hora antes das horas extras.",
  },
  flsaNote: {
    en: "Under the US Fair Labor Standards Act (FLSA), non-exempt employees earn at least 1.5× their regular rate for hours worked beyond 40 in a work week; some employers pay double time for holidays. Totals are gross pay — no taxes or deductions.",
    zh: "按照美国《公平劳动标准法》(FLSA),非豁免员工每周工作超过 40 小时的部分,加班时薪不低于常规时薪的 1.5 倍;部分雇主在节假日按 2 倍支付。金额均为税前,不含税费和扣款。",
    ja: "米国の公正労働基準法(FLSA)では、非免除従業員は週 40 時間を超えた分について通常時給の 1.5 倍以上を受け取ります。祝日に 2 倍を払う雇主もあります。金額はいずれも税引前で、税金・控除は含みません。",
    es: "Según la Fair Labor Standards Act (FLSA) de EE. UU., los empleados no exentos cobran al menos 1,5× su tarifa regular por las horas que excedan las 40 de la semana laboral; algunos empleadores pagan doble en festivos. Todos los importes son brutos, sin impuestos ni deducciones.",
    pt: "Pela Fair Labor Standards Act (FLSA) dos EUA, empregados não isentos recebem pelo menos 1,5× o valor normal pelas horas que passam de 40 na semana; alguns empregadores pagam o dobro em feriados. Todos os valores são brutos, sem impostos ou descontos.",
  },
};

function num(s: string): number {
  const n = parseLocaleNumber(s);
  return Number.isFinite(n) ? n : NaN;
}

export function CalcEngineOvertime() {
  const { locale } = useI18n();
  const [mode, setMode] = useState("hourly");
  const [hourlyRate, setHourlyRate] = useState("25");
  const [salary, setSalary] = useState("52000");
  const [regularHours, setRegularHours] = useState("40");
  const [otHours, setOtHours] = useState("5");
  const [multiplier, setMultiplier] = useState("1.5");
  const [weeks, setWeeks] = useState("52");

  const bySalary = mode === "salary";
  const rh = num(regularHours);
  const w = num(weeks);
  const mult = num(multiplier);

  // 年薪模式:用现有 salaryBreakdown 把年薪折成基准时薪(工时表与加班共用同一组口径)
  const baseRate = useMemo(
    () => (bySalary ? salaryBreakdown(num(salary), rh, w).hourly : num(hourlyRate)),
    [bySalary, salary, rh, w, hourlyRate],
  );
  const res = useMemo(
    () => overtimePay(baseRate, otHours.trim() === "" ? 0 : num(otHours), mult, rh, w),
    [baseRate, otHours, mult, rh, w],
  );
  const money = (n: number) => fmtMoney(n, locale, "$");

  return (
    <ToolPanel>
      <Tabs
        options={[
          { id: "hourly", label: pick(locale, S.modeHourly) },
          { id: "salary", label: pick(locale, S.modeSalary) },
        ]}
        value={mode}
        onChange={(id) => setMode(id)}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {bySalary ? (
          <Field label={pick(locale, S.salary)}>
            <NumIn value={salary} onChange={setSalary} aria="annual salary" />
          </Field>
        ) : (
          <Field label={pick(locale, S.hourly)}>
            <NumIn value={hourlyRate} onChange={setHourlyRate} aria="hourly rate" />
          </Field>
        )}
        <Field label={pick(locale, S.regularHours)}>
          <NumIn value={regularHours} onChange={setRegularHours} aria="regular hours per week" />
        </Field>
        <Field label={pick(locale, S.otHours)}>
          <NumIn value={otHours} onChange={setOtHours} aria="overtime hours per week" placeholder="0" />
        </Field>
        <Field label={pick(locale, S.multiplier)}>
          <Sel value={multiplier} onChange={setMultiplier} aria="overtime multiplier">
            <option value="1.5">{pick(locale, S.m15)}</option>
            <option value="2">{pick(locale, S.m20)}</option>
          </Sel>
        </Field>
        <Field label={pick(locale, S.weeksYear)}>
          <NumIn value={weeks} onChange={setWeeks} aria="weeks per year" />
        </Field>
      </div>

      <div className="mt-5">
        <Stats
          items={[
            { label: pick(locale, S.otRate), value: money(res.otRate) },
            { label: pick(locale, S.regularPay), value: money(res.regularPay) },
            { label: pick(locale, S.otPay), value: money(res.overtimePay), tone: "good" },
            { label: pick(locale, S.totalWeekly), value: money(res.totalWeekly), tone: "accent" },
            { label: pick(locale, S.annual), value: money(res.annual) },
          ]}
        />
      </div>

      <div className="mt-3 space-y-2">
        {bySalary && <Note>{pick(locale, S.salaryNote)}</Note>}
        <Note>{pick(locale, S.flsaNote)}</Note>
      </div>
    </ToolPanel>
  );
}
