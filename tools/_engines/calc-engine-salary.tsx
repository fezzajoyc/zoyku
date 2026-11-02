"use client";
import { parseLocaleNumber } from "../_lib/numparse";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import { Field, NumIn, Note, Stats, fmt, fmtMoney, pick } from "./calc-ui";
import { hourlyToSalary, salaryBreakdown } from "../_lib/finance";

/**
 * Shared engine for the salary↔hourly pair.
 * props.mode = "salary2hourly" | "hourly2salary".
 * Unpaid days off (salary mode only) shrink the working year by 1/5 week per
 * day; the adjusted hourly is the same annual salary spread over the hours
 * actually worked.
 */

const S = {
  annual: { en: "Annual salary", zh: "年薪", ja: "年収", es: "Salario anual", pt: "Salário anual" },
  hourlyRate: { en: "Hourly rate", zh: "时薪", ja: "時給", es: "Tarifa por hora", pt: "Valor por hora" },
  hoursWeek: { en: "Hours per week", zh: "每周工时", ja: "週間労働時間", es: "Horas por semana", pt: "Horas por semana" },
  weeksYear: { en: "Weeks per year", zh: "每年工作周数", ja: "年間労働週数", es: "Semanas por año", pt: "Semanas por ano" },
  unpaid: { en: "Unpaid days off / year", zh: "每年无薪休假天数", ja: "無給休暇日数/年", es: "Días sin sueldo / año", pt: "Dias não remunerados / ano" },
  hourly: { en: "Hourly", zh: "时薪", ja: "時給", es: "Por hora", pt: "Por hora" },
  daily: { en: "Daily", zh: "日薪", ja: "日給", es: "Por día", pt: "Por dia" },
  weekly: { en: "Weekly", zh: "周薪", ja: "週給", es: "Por semana", pt: "Por semana" },
  biweekly: { en: "Biweekly", zh: "双周薪", ja: "半月給", es: "Quincenal", pt: "Quinzenal" },
  monthly: { en: "Monthly", zh: "月薪", ja: "月給", es: "Mensual", pt: "Mensal" },
  annualStat: { en: "Annual", zh: "年薪", ja: "年収", es: "Anual", pt: "Anual" },
  adjusted: { en: "Hourly after unpaid days", zh: "扣除无薪假后的时薪", ja: "無給休暇後の時給", es: "Hora tras días sin sueldo", pt: "Hora após dias não remunerados" },
  effective: {
    en: "Unpaid days shrink the working year (5-day weeks): 10 days ≈ 2 weeks. The adjusted hourly divides the same annual salary by the hours actually worked, so it rises with more time off. Totals are gross pay — no taxes or deductions.",
    zh: "无薪休假会缩短工作年(每周 5 个工作日):10 天 ≈ 2 周。调整后时薪把同一年薪摊到实际工作的小时上,休假越多数值越高。各项金额均为税前,不含税费和扣款。",
    ja: "無給休暇は労働年を縮めます(週 5 日勤務):10 日 ≈ 2 週間。「無給休暇後の時給」は同じ年収を実際に働いた時間で割った値で、休暇が多いほど高くなります。金額はいずれも税引前で、税金・控除は含みません。",
    es: "Los días sin sueldo acortan el año laboral (semanas de 5 días): 10 días ≈ 2 semanas. La hora ajustada divide el mismo salario anual entre las horas realmente trabajadas, así que sube cuantos más días. Todos los importes son brutos, sin impuestos ni deducciones.",
    pt: "Os dias não remunerados encurtam o ano de trabalho (semanas de 5 dias): 10 dias ≈ 2 semanas. O valor por hora ajustado divide o mesmo salário anual pelas horas realmente trabalhadas, então sobe com mais folga. Todos os valores são brutos, sem impostos ou descontos.",
  },
  noteSalary: {
    en: "Hourly = annual ÷ (hours per week × weeks per year); daily uses a 5-day week. Example: 52,000 at 40 h/week over 52 weeks is exactly 25.00/hour.",
    zh: "时薪 = 年薪 ÷(每周工时 × 每年周数);日薪按每周 5 个工作日折算。例如年薪 52,000、每周 40 小时、52 周,时薪正好 25.00。",
    ja: "時給 = 年収 ÷(週労働時間 × 年間週数)。日給は週 5 日換算です。例:年収 52,000・週 40 時間・52 週なら時給はちょうど 25.00 です。",
    es: "Hora = anual ÷ (horas por semana × semanas por año); el día usa una semana de 5 días. Ejemplo: 52.000 a 40 h/semana durante 52 semanas son exactamente 25,00/hora.",
    pt: "Hora = anual ÷ (horas por semana × semanas por ano); o dia usa uma semana de 5 dias. Exemplo: 52.000 a 40 h/semana durante 52 semanas dá exatamente 25,00/hora.",
  },
  noteHourly: {
    en: "Annual = hourly × hours per week × weeks per year; daily uses a 5-day week. Example: 25/hour at 40 h/week over 52 weeks is exactly 52,000/year.",
    zh: "年薪 = 时薪 × 每周工时 × 每年周数;日薪按每周 5 个工作日折算。例如时薪 25、每周 40 小时、52 周,年薪正好 52,000。",
    ja: "年収 = 時給 × 週労働時間 × 年間週数。日給は週 5 日換算です。例:時給 25・週 40 時間・52 週なら年収はちょうど 52,000 です。",
    es: "Anual = tarifa × horas por semana × semanas por año; el día usa una semana de 5 días. Ejemplo: 25/hora a 40 h/semana durante 52 semanas son exactamente 52.000/año.",
    pt: "Anual = valor por hora × horas por semana × semanas por ano; o dia usa uma semana de 5 dias. Exemplo: 25/hora a 40 h/semana durante 52 semanas dá exatamente 52.000/ano.",
  },
};

function num(s: string): number {
  const n = parseLocaleNumber(s);
  return Number.isFinite(n) ? n : NaN;
}

export function CalcEngineSalary({ mode }: { mode: string }) {
  const { locale } = useI18n();
  const toHourly = mode === "salary2hourly";
  const [salary, setSalary] = useState("52000");
  const [hourlyRate, setHourlyRate] = useState("25");
  const [hours, setHours] = useState("40");
  const [weeks, setWeeks] = useState("52");
  const [unpaid, setUnpaid] = useState("");

  const h = num(hours);
  const w = num(weeks);
  const symbol = "$";

  const sb = useMemo(
    () => salaryBreakdown(num(salary), h, w, unpaid.trim() === "" ? 0 : num(unpaid)),
    [salary, h, w, unpaid],
  );
  const hs = useMemo(() => hourlyToSalary(num(hourlyRate), h, w), [hourlyRate, h, w]);

  return (
    <ToolPanel>
      <div className="grid gap-4 sm:grid-cols-2">
        {toHourly ? (
          <>
            <Field label={pick(locale, S.annual)}>
              <NumIn value={salary} onChange={setSalary} aria="annual salary" />
            </Field>
            <Field label={pick(locale, S.unpaid)}>
              <NumIn value={unpaid} onChange={setUnpaid} aria="unpaid days off per year" placeholder="0" />
            </Field>
          </>
        ) : (
          <Field label={pick(locale, S.hourlyRate)}>
            <NumIn value={hourlyRate} onChange={setHourlyRate} aria="hourly rate" />
          </Field>
        )}
        <Field label={pick(locale, S.hoursWeek)}>
          <NumIn value={hours} onChange={setHours} aria="hours per week" />
        </Field>
        <Field label={pick(locale, S.weeksYear)}>
          <NumIn value={weeks} onChange={setWeeks} aria="weeks per year" />
        </Field>
      </div>

      <div className="mt-5">
        {toHourly ? (
          <Stats
            items={[
              { label: pick(locale, S.hourly), value: fmtMoney(sb.hourly, locale, symbol), tone: "accent" },
              { label: pick(locale, S.adjusted), value: fmtMoney(sb.adjustedHourly, locale, symbol), tone: "good" },
              { label: pick(locale, S.daily), value: fmtMoney(sb.daily, locale, symbol) },
              { label: pick(locale, S.weekly), value: fmtMoney(sb.weekly, locale, symbol) },
              { label: pick(locale, S.biweekly), value: fmtMoney(sb.biweekly, locale, symbol) },
              { label: pick(locale, S.monthly), value: fmtMoney(sb.monthly, locale, symbol) },
            ]}
          />
        ) : (
          <Stats
            items={[
              { label: pick(locale, S.annualStat), value: fmtMoney(hs.annual, locale, symbol), tone: "accent" },
              { label: pick(locale, S.monthly), value: fmtMoney(hs.monthly, locale, symbol) },
              { label: pick(locale, S.biweekly), value: fmtMoney(hs.biweekly, locale, symbol) },
              { label: pick(locale, S.weekly), value: fmtMoney(hs.weekly, locale, symbol) },
              { label: pick(locale, S.daily), value: fmtMoney(hs.daily, locale, symbol) },
            ]}
          />
        )}
      </div>

      <div className="mt-3 space-y-2">
        <Note>{toHourly ? pick(locale, S.noteSalary) : pick(locale, S.noteHourly)}</Note>
        {toHourly && Number.isFinite(sb.effectiveWeeks) && sb.effectiveWeeks < w && (
          <Note>
            {pick(locale, {
              en: "With the unpaid days off you entered, the working year is about ",
              zh: "按你输入的无薪休假天数,实际工作年约为 ",
              ja: "入力した無給休暇日数では、実労働年は約 ",
              es: "Con los días sin sueldo indicados, el año laboral ronda las ",
              pt: "Com os dias não remunerados informados, o ano de trabalho é de cerca de ",
            }) + fmt(sb.effectiveWeeks, locale, 1)}
            {pick(locale, {
              en: " weeks.",
              zh: " 周。",
              ja: " 週です。",
              es: " semanas.",
              pt: " semanas.",
            })}
          </Note>
        )}
        <Note>{pick(locale, S.effective)}</Note>
      </div>
    </ToolPanel>
  );
}
