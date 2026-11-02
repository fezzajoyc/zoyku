"use client";

import { useEffect, useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import { Field, Note, Stats, Tabs, pick } from "./calc-ui";

/**
 * Shared engine for age-calculator and date-calculator.
 * props.kind = "age" | "date".
 */

const S = {
  birth: { en: "Date of birth", zh: "出生日期", ja: "生年月日", es: "Fecha de nacimiento", pt: "Data de nascimento" },
  asOf: { en: "Age at date", zh: "计算到哪一天", ja: "起算日", es: "Calcular a fecha", pt: "Calcular na data" },
  exact: { en: "Exact age", zh: "精确年龄", ja: "正確な年齢", es: "Edad exacta", pt: "Idade exata" },
  totalDays: { en: "Total days lived", zh: "累计天数", ja: "生まれてからの日数", es: "Días vividos", pt: "Dias vividos" },
  totalMonths: { en: "Total months", zh: "累计月数", ja: "累計月数", es: "Meses totales", pt: "Meses totais" },
  nextBirthday: { en: "Next birthday", zh: "下一个生日", ja: "次の誕生日", es: "Próximo cumpleaños", pt: "Próximo aniversário" },
  daysToGo: { en: "days to go", zh: "天后", ja: "日後", es: "días", pt: "dias" },
  today: { en: "Today!", zh: "就是今天!", ja: "今日です!", es: "¡Hoy!", pt: "É hoje!" },
  diff: { en: "Difference between dates", zh: "日期差", ja: "日付の差", es: "Diferencia entre fechas", pt: "Diferença entre datas" },
  addsub: { en: "Add / subtract days", zh: "加减天数", ja: "日数の加減", es: "Sumar / restar días", pt: "Somar / subtrair dias" },
  start: { en: "Start date", zh: "开始日期", ja: "開始日", es: "Fecha inicial", pt: "Data inicial" },
  end: { en: "End date", zh: "结束日期", ja: "終了日", es: "Fecha final", pt: "Data final" },
  base: { en: "Base date", zh: "基准日期", ja: "基準日", es: "Fecha base", pt: "Data base" },
  op: { en: "Operation", zh: "运算", ja: "演算", es: "Operación", pt: "Operação" },
  addOp: { en: "Add", zh: "加", ja: "加える", es: "Sumar", pt: "Somar" },
  subOp: { en: "Subtract", zh: "减", ja: "引く", es: "Restar", pt: "Subtrair" },
  days: { en: "Days", zh: "天数", ja: "日数", es: "Días", pt: "Dias" },
  weeks: { en: "weeks", zh: "周", ja: "週間", es: "semanas", pt: "semanas" },
  and: { en: "and", zh: "零", ja: "と", es: "y", pt: "e" },
  resultDate: { en: "Resulting date", zh: "结果日期", ja: "結果の日付", es: "Fecha resultante", pt: "Data resultante" },
  y: { en: "years", zh: "岁", ja: "歳", es: "años", pt: "anos" },
  m: { en: "months", zh: "个月", ja: "か月", es: "meses", pt: "meses" },
  d: { en: "days", zh: "天", ja: "日", es: "días", pt: "dias" },
};

function daysInMonth(y: number, m: number): number {
  // m is 1-based
  return new Date(y, m, 0).getDate();
}

/** Calendar-accurate y/m/d difference (end must be >= start). */
function ymdDiff(a: Date, b: Date): { y: number; m: number; d: number } {
  let y = b.getFullYear() - a.getFullYear();
  let m = b.getMonth() - a.getMonth();
  let d = b.getDate() - a.getDate();
  if (d < 0) {
    m -= 1;
    d += daysInMonth(b.getFullYear(), b.getMonth()); // days in the month before b
  }
  if (m < 0) {
    y -= 1;
    m += 12;
  }
  return { y, m, d };
}

function parseDate(s: string): Date | null {
  const mt = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (!mt) return null;
  const d = new Date(Number(mt[1]), Number(mt[2]) - 1, Number(mt[3]));
  return Number.isNaN(d.getTime()) ? null : d;
}

function utcDays(a: Date, b: Date): number {
  const ua = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const ub = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.round((ub - ua) / 86400000);
}

function longDate(d: Date, locale: string): string {
  return new Intl.DateTimeFormat(locale, { year: "numeric", month: "long", day: "numeric", weekday: "long" }).format(d);
}

/* ---------------- Age ---------------- */

function AgeCalc() {
  const { locale } = useI18n();
  const [birth, setBirth] = useState("1990-06-15");
  const [asOf, setAsOf] = useState("");
  const [today, setToday] = useState("");

  useEffect(() => {
    const iso = new Date();
    const s = `${iso.getFullYear()}-${String(iso.getMonth() + 1).padStart(2, "0")}-${String(iso.getDate()).padStart(2, "0")}`;
    setAsOf(s);
    setToday(s);
  }, []);

  const b = parseDate(birth);
  const a = parseDate(asOf);
  const valid = b && a && b <= a;

  const { y, m, d } = valid ? ymdDiff(b, a) : { y: NaN, m: NaN, d: NaN };
  const totalDays = valid ? utcDays(b, a) : NaN;

  // Next birthday (occurrence of birth month/day strictly after the as-of date)
  let nextInfo: { date: Date; days: number } | null = null;
  if (valid) {
    let nb = new Date(a.getFullYear(), b.getMonth(), b.getDate());
    if (utcDays(a, nb) <= 0) nb = new Date(a.getFullYear() + 1, b.getMonth(), b.getDate());
    nextInfo = { date: nb, days: utcDays(a, nb) };
  }

  return (
    <ToolPanel>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={pick(locale, S.birth)}>
          <input type="date" className="field mono" value={birth} onChange={(e) => setBirth(e.target.value)} aria-label={pick(locale, S.birth)} />
        </Field>
        <Field label={pick(locale, S.asOf)}>
          <input type="date" className="field mono" value={asOf} min={birth || undefined} onChange={(e) => setAsOf(e.target.value)} aria-label={pick(locale, S.asOf)} />
        </Field>
      </div>

      {valid ? (
        <>
          <div className="mt-5">
            <Stats
              items={[
                {
                  label: pick(locale, S.exact),
                  value: `${y} ${pick(locale, S.y)} ${m} ${pick(locale, S.m)} ${d} ${pick(locale, S.d)}`,
                  tone: "accent",
                },
                { label: pick(locale, S.totalDays), value: `${totalDays.toLocaleString(locale === "zh" ? "zh-CN" : locale === "ja" ? "ja-JP" : locale === "es" ? "es-ES" : locale === "pt" ? "pt-BR" : "en-US")}` },
                { label: pick(locale, S.totalMonths), value: `${y * 12 + m}` },
              ]}
            />
          </div>
          {nextInfo && (
            <div className="mt-5 rounded-xl border hairline px-4 py-3.5">
              <span className="text-[13px] font-medium text-[var(--color-sub)]">{pick(locale, S.nextBirthday)}</span>
              <p className="mt-1 text-[15px]">
                {longDate(nextInfo.date, locale === "zh" ? "zh-CN" : locale === "ja" ? "ja-JP" : locale === "es" ? "es-ES" : locale === "pt" ? "pt-BR" : "en-US")}{" "}
                —{" "}
                {nextInfo.days === 0 ? (
                  <strong className="font-semibold text-[var(--color-good)]">{pick(locale, S.today)}</strong>
                ) : (
                  <strong className="font-semibold text-[var(--color-ink)]">
                    {nextInfo.days} {pick(locale, S.daysToGo)}
                  </strong>
                )}
              </p>
            </div>
          )}
        </>
      ) : (
        <div className="mt-5">
          <Note>
            {asOf && birth
              ? pick(locale, {
                  en: "The age-at date must be on or after the date of birth.",
                  zh: "计算日期不能早于出生日期。",
                  ja: "起算日は生年月日以降の日付にしてください。",
                  es: "La fecha de cálculo debe ser posterior o igual a la fecha de nacimiento.",
                  pt: "A data de cálculo deve ser igual ou posterior à data de nascimento.",
                })
              : pick(locale, { en: "Pick both dates to see the result.", zh: "选择两个日期即可看到结果。", ja: "両方の日付を選ぶと結果が表示されます。", es: "Elija ambas fechas para ver el resultado.", pt: "Escolha as duas datas para ver o resultado." })}
          </Note>
        </div>
      )}
      <div className="mt-3">
        <Note>
          {pick(locale, {
            en: "Leap years and varying month lengths are handled exactly — 29 February birthdays fall back to 1 March in non-leap years.",
            zh: "闰年与大小月都已精确处理——2 月 29 日的生日在平年按 3 月 1 日计算。",
            ja: "うるう年や月の日数も正確に処理します。2 月 29 日の誕生日は平年では 3 月 1 日扱いになります。",
            es: "Los años bisiestos y la duración de los meses se manejan con exactitud: los cumpleaños del 29 de febrero pasan al 1 de marzo en años no bisiestos.",
            pt: "Anos bissextos e a duração dos meses são tratados com exatidão — aniversários em 29 de fevereiro caem em 1º de março em anos não bissextos.",
          })}
        </Note>
      </div>
      {today && asOf !== today && (
        <div className="mt-2">
          <Note>
            {pick(locale, {
              en: "Tip: reset the age-at date back to today to get your current age.",
              zh: "提示:把计算日期重置为今天即可得到当前年龄。",
              ja: "ヒント:起算日を今日に戻すと現在の年齢が得られます。",
              es: "Consejo: restablezca la fecha de cálculo a hoy para obtener la edad actual.",
              pt: "Dica: redefina a data de cálculo para hoje para obter a idade atual.",
            })}
          </Note>
        </div>
      )}
    </ToolPanel>
  );
}

/* ---------------- Date difference / add-subtract ---------------- */

function DateCalc() {
  const { locale } = useI18n();
  const [mode, setMode] = useState("diff");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [base, setBase] = useState("");
  const [days, setDays] = useState("90");
  const [op, setOp] = useState("add");

  useEffect(() => {
    const iso = new Date();
    const s = `${iso.getFullYear()}-${String(iso.getMonth() + 1).padStart(2, "0")}-${String(iso.getDate()).padStart(2, "0")}`;
    setStart(s);
    setBase(s);
  }, []);

  const intl = locale === "zh" ? "zh-CN" : locale === "ja" ? "ja-JP" : locale === "es" ? "es-ES" : locale === "pt" ? "pt-BR" : "en-US";

  const diff = useMemo(() => {
    const a = parseDate(start);
    const b = parseDate(end);
    if (!a || !b) return null;
    const total = utcDays(a, b);
    const [lo, hi] = total >= 0 ? [a, b] : [b, a];
    const { y, m, d } = ymdDiff(lo, hi);
    return { total, y, m, d };
  }, [start, end]);

  const shifted = useMemo(() => {
    const b = parseDate(base);
    const n = Math.floor(Number(days));
    if (!b || !Number.isFinite(n)) return null;
    const r = new Date(b.getFullYear(), b.getMonth(), b.getDate() + (op === "add" ? n : -n));
    return r;
  }, [base, days, op]);

  return (
    <ToolPanel>
      <Tabs
        options={[
          { id: "diff", label: pick(locale, S.diff) },
          { id: "addsub", label: pick(locale, S.addsub) },
        ]}
        value={mode}
        onChange={setMode}
      />
      {mode === "diff" ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={pick(locale, S.start)}>
              <input type="date" className="field mono" value={start} onChange={(e) => setStart(e.target.value)} aria-label={pick(locale, S.start)} />
            </Field>
            <Field label={pick(locale, S.end)}>
              <input type="date" className="field mono" value={end} onChange={(e) => setEnd(e.target.value)} aria-label={pick(locale, S.end)} />
            </Field>
          </div>
          {diff ? (
            <div className="mt-5">
              <Stats
                items={[
                  {
                    label: pick(locale, S.exact),
                    value: `${diff.y} ${pick(locale, S.y)} ${diff.m} ${pick(locale, S.m)} ${diff.d} ${pick(locale, S.d)}`,
                    tone: "accent",
                  },
                  { label: pick(locale, S.days), value: `${Math.abs(diff.total).toLocaleString(intl)}` },
                  {
                    label: pick(locale, S.weeks),
                    value: `${Math.floor(Math.abs(diff.total) / 7)} ${pick(locale, S.weeks)} ${pick(locale, S.and)} ${Math.abs(diff.total) % 7} ${pick(locale, S.d)}`,
                  },
                ]}
              />
            </div>
          ) : (
            <div className="mt-5">
              <Note>
                {pick(locale, { en: "Pick both dates to see the difference.", zh: "选择两个日期即可看到相差多久。", ja: "両方の日付を選ぶと差が表示されます。", es: "Elija ambas fechas para ver la diferencia.", pt: "Escolha as duas datas para ver a diferença." })}
              </Note>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label={pick(locale, S.base)}>
              <input type="date" className="field mono" value={base} onChange={(e) => setBase(e.target.value)} aria-label={pick(locale, S.base)} />
            </Field>
            <Field label={pick(locale, S.op)}>
              <select className="field" value={op} onChange={(e) => setOp(e.target.value)} aria-label={pick(locale, S.op)}>
                <option value="add">+ {pick(locale, S.addOp)}</option>
                <option value="sub">− {pick(locale, S.subOp)}</option>
              </select>
            </Field>
            <Field label={pick(locale, S.days)}>
              <input type="number" className="field bare mono" value={days} onChange={(e) => setDays(e.target.value)} aria-label={pick(locale, S.days)} />
            </Field>
          </div>
          {shifted ? (
            <div className="mt-5 rounded-xl border hairline px-4 py-3.5">
              <span className="text-[13px] font-medium text-[var(--color-sub)]">{pick(locale, S.resultDate)}</span>
              <p className="mono mt-1 text-[17px] font-semibold">
                {longDate(shifted, intl)}
              </p>
            </div>
          ) : (
            <div className="mt-5">
              <Note>
                {pick(locale, { en: "Pick a base date and a number of days.", zh: "选择基准日期并输入天数。", ja: "基準日と日数を指定してください。", es: "Elija una fecha base y un número de días.", pt: "Escolha uma data base e um número de dias." })}
              </Note>
            </div>
          )}
        </>
      )}
    </ToolPanel>
  );
}

export function CalcEngineDate({ kind }: { kind: string }) {
  return kind === "age" ? <AgeCalc /> : <DateCalc />;
}
