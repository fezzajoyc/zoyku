"use client";

import { useEffect, useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import type { Locale } from "@/lib/site";
import { INTL_LOCALES, pick } from "./calc-ui";
import { normalizeCron, parseCron, type CronErrorCode, type CronUnit } from "../_lib/cron";

/**
 * cron 解释器引擎:字段拆解用 tools/_lib/cron.ts(纯,已测),
 * 下次执行时间用 croner 懒加载计算(校验已由纯层完成,croner 只算日期)。
 * 时区支持本地 / UTC 切换,日期格式随站点语言。
 */

type Parsed = ReturnType<typeof parseCron>;

const FIELD_LABEL: Record<CronUnit, Record<string, string>> = {
  second: { en: "Second", zh: "秒", ja: "秒", es: "Segundo", pt: "Segundo" },
  minute: { en: "Minute", zh: "分钟", ja: "分", es: "Minuto", pt: "Minuto" },
  hour: { en: "Hour", zh: "小时", ja: "時", es: "Hora", pt: "Hora" },
  dayOfMonth: { en: "Day of month", zh: "日", ja: "日", es: "Día del mes", pt: "Dia do mês" },
  month: { en: "Month", zh: "月份", ja: "月", es: "Mes", pt: "Mês" },
  dayOfWeek: { en: "Day of week", zh: "星期", ja: "曜日", es: "Día de la semana", pt: "Dia da semana" },
};

/** 字段为纯 * / ? 时的短语 */
const EVERY_PHRASE: Record<CronUnit, Record<string, string>> = {
  second: { en: "every second", zh: "每一秒", ja: "毎秒", es: "cada segundo", pt: "a cada segundo" },
  minute: { en: "every minute", zh: "每分钟", ja: "毎分", es: "cada minuto", pt: "a cada minuto" },
  hour: { en: "every hour", zh: "每小时", ja: "毎時", es: "cada hora", pt: "a cada hora" },
  dayOfMonth: {
    en: "every day of the month", zh: "月中每一天", ja: "月の毎日",
    es: "todos los días del mes", pt: "todos os dias do mês",
  },
  month: { en: "every month", zh: "每个月", ja: "毎月", es: "todos los meses", pt: "todos os meses" },
  dayOfWeek: {
    en: "every day of the week", zh: "一周中每一天", ja: "毎日(曜日ごと)",
    es: "todos los días de la semana", pt: "todos os dias da semana",
  },
};

/** 字段带具体值时的短语,{list} 为本地化值列表 */
const VALUES_PHRASE: Record<CronUnit, Record<string, string>> = {
  second: { en: "at second {list}", zh: "在第 {list} 秒", ja: "{list} 秒に", es: "en el segundo {list}", pt: "no segundo {list}" },
  minute: { en: "at minute {list}", zh: "在第 {list} 分钟", ja: "{list} 分に", es: "en el minuto {list}", pt: "no minuto {list}" },
  hour: { en: "at hour {list}", zh: "在 {list} 点", ja: "{list} 時に", es: "a la hora {list}", pt: "à hora {list}" },
  dayOfMonth: {
    en: "on day {list} of the month", zh: "每月 {list} 日", ja: "毎月 {list} 日",
    es: "el día {list} del mes", pt: "no dia {list} do mês",
  },
  month: { en: "in {list}", zh: "在 {list}", ja: "{list} に", es: "en {list}", pt: "em {list}" },
  dayOfWeek: { en: "on {list}", zh: "在 {list}", ja: "{list} に", es: "los {list}", pt: "nos {list}" },
};

const ERR_PHRASE: Record<CronErrorCode, Record<string, string>> = {
  empty: {
    en: "Type or pick a cron expression to see it explained.",
    zh: "输入或选择一个 cron 表达式即可查看解释。",
    ja: "cron 式を入力または選択すると説明が表示されます。",
    es: "Escribe o elige una expresión cron para verla explicada.",
    pt: "Digite ou escolha uma expressão cron para vê-la explicada.",
  },
  fieldCount: {
    en: "A cron expression needs 5 fields (or 6 with seconds) separated by spaces — this one has {n}.",
    zh: "cron 表达式需要 5 段(带秒为 6 段),用空格分隔——这里只有 {n} 段。",
    ja: "cron 式は空白区切りで 5 つ(秒付きは 6 つ)のフィールドが必要です。現在は {n} 個です。",
    es: "Una expresión cron necesita 5 campos (o 6 con segundos) separados por espacios — este tiene {n}.",
    pt: "Uma expressão cron precisa de 5 campos (ou 6 com segundos) separados por espaços — este tem {n}.",
  },
  shorthand: {
    en: "Shorthands like @daily aren’t supported — “@daily” means “0 0 * * *”, so write the fields out.",
    zh: "不支持 @daily 这样的简写——它等价于 0 0 * * *,请直接写出五段字段。",
    ja: "@daily のような省略記法には対応していません。「0 0 * * *」のようにフィールドを書いてください。",
    es: "No se admiten atajos como @daily — equivale a «0 0 * * *»; escribe los campos completos.",
    pt: "Atalhos como @daily não são suportados — equivale a «0 0 * * *»; escreva os campos completos.",
  },
  badChar: {
    en: "“{d}” isn’t valid syntax for the {field} field.",
    zh: "“{d}” 不是「{field}」字段的合法写法。",
    ja: "「{d}」は「{field}」フィールドの有効な書き方ではありません。",
    es: "«{d}» no es sintaxis válida para el campo {field}.",
    pt: "«{d}» não é sintaxe válida para o campo {field}.",
  },
  outOfRange: {
    en: "“{d}” is outside the allowed range for the {field} field.",
    zh: "“{d}” 超出了「{field}」字段的取值范围。",
    ja: "「{d}」は「{field}」フィールドの範囲外です。",
    es: "«{d}» está fuera del rango permitido del campo {field}.",
    pt: "«{d}» está fuera del intervalo permitido del campo {field}.",
  },
  badRange: {
    en: "The range “{d}” goes backwards — write it from smaller to larger, like 1-5.",
    zh: "范围“{d}”方向反了——请从小到大写,例如 1-5。",
    ja: "範囲「{d}」は向きが逆です。小さい方から大きい方へ(例:1-5)書いてください。",
    es: "El rango «{d}» va al revés — escríbelo de menor a mayor, como 1-5.",
    pt: "O intervalo «{d}» está invertido — escreva do menor para o maior, como 1-5.",
  },
  badStep: {
    en: "The step “{d}” must be a positive number.",
    zh: "步长“{d}”必须是正整数。",
    ja: "ステップ「{d}」は正の数にしてください。",
    es: "El paso «{d}» debe ser un número positivo.",
    pt: "O passo «{d}» deve ser um número positivo.",
  },
  emptyPart: {
    en: "There’s an empty spot in the {field} field — remove extra commas or spaces.",
    zh: "「{field}」字段里有空缺——去掉多余的逗号或空格。",
    ja: "「{field}」フィールドに空欄があります。余分なカンマや空白を取り除いてください。",
    es: "Hay un hueco en el campo {field} — quita las comas o espacios de más.",
    pt: "Há um vazio no campo {field} — remova as vírgulas ou espaços extras.",
  },
  unsupported: {
    en: "“{d}” uses an advanced extension (Quartz L / W / # or prefixed stepping) that this tool doesn’t cover.",
    zh: "“{d}” 用到了本工具不支持的扩展语法(Quartz 的 L / W / # 或数字前缀步进)。",
    ja: "「{d}」はこのツールが対応していない拡張構文(Quartz の L / W / # など)です。",
    es: "«{d}» usa una extensión avanzada (L / W / # de Quartz o paso con prefijo) que esta herramienta no cubre.",
    pt: "«{d}» usa uma extensão avançada (L / W / # do Quartz ou passo com prefixo) que esta ferramenta não cobre.",
  },
};

const PRESETS = [
  { key: "pMin", expr: "* * * * *" },
  { key: "pHour", expr: "0 * * * *" },
  { key: "pMidnight", expr: "0 0 * * *" },
  { key: "pWeekday9", expr: "0 9 * * MON-FRI" },
  { key: "pQuarterly", expr: "0 0 1 1,4,7,10 *" },
] as const;

const PRESET_LABEL: Record<(typeof PRESETS)[number]["key"], Record<string, string>> = {
  pMin: { en: "Every minute", zh: "每分钟", ja: "毎分", es: "Cada minuto", pt: "A cada minuto" },
  pHour: { en: "Hourly", zh: "每小时", ja: "毎時", es: "Cada hora", pt: "A cada hora" },
  pMidnight: { en: "Daily at midnight", zh: "每天零点", ja: "毎日 0 時", es: "Diario a medianoche", pt: "Diário à meia-noite" },
  pWeekday9: { en: "Weekdays at 9:00", zh: "工作日 9 点", ja: "平日 9 時", es: "Entre semana a las 9", pt: "Dias úteis às 9" },
  pQuarterly: { en: "Quarterly", zh: "每季度", ja: "四半期ごと", es: "Trimestral", pt: "Trimestral" },
};

const L = {
  next: { en: "Next 5 run times", zh: "接下来 5 次执行", ja: "次の 5 回の実行時刻", es: "Próximas 5 ejecuciones", pt: "Próximas 5 execuções" },
  tzLocal: { en: "Local time", zh: "本地时间", ja: "ローカル時刻", es: "Hora local", pt: "Hora local" },
  tzUtc: { en: "UTC", zh: "UTC 时间", ja: "UTC 時刻", es: "Hora UTC", pt: "Hora UTC" },
  secondsNote: {
    en: "Six-field pattern detected — the first field is seconds.",
    zh: "检测到 6 段格式——第一段是秒。",
    ja: "6 フィールド形式を検出 — 最初のフィールドは秒です。",
    es: "Patrón de 6 campos detectado — el primero son los segundos.",
    pt: "Padrão de 6 campos detectado — o primeiro campo são os segundos.",
  },
  noRuns: {
    en: "This schedule never fires in the calculable future.",
    zh: "该计划在可计算的未来不会触发。",
    ja: "このスケジュールは計算可能な範囲では実行されません。",
    es: "Esta programación no se ejecuta en un futuro calculable.",
    pt: "Esta programação não executa em um futuro calculável.",
  },
  runsFailed: {
    en: "Couldn’t compute run times for this expression.",
    zh: "无法计算该表达式的执行时间。",
    ja: "この式の実行時刻を計算できませんでした。",
    es: "No se pudieron calcular los tiempos de ejecución.",
    pt: "Não foi possível calcular os horários de execução.",
  },
  syntaxNote: {
    en: "Supported: numbers, ranges (1-5), lists (1,15), steps (*/10, 1-30/5), month names (JAN) and weekday names (MON). Quartz extensions L, W, # aren’t covered.",
    zh: "支持:数字、范围(1-5)、列表(1,15)、步进(*/10、1-30/5)、月份名(JAN)与星期名(MON)。不支持 Quartz 扩展 L、W、#。",
    ja: "対応:数値、範囲(1-5)、リスト(1,15)、ステップ(*/10、1-30/5)、月名(JAN)、曜日名(MON)。Quartz 拡張の L・W・# には未対応です。",
    es: "Admitido: números, rangos (1-5), listas (1,15), pasos (*/10, 1-30/5), nombres de mes (JAN) y de día (MON). Las extensiones Quartz L, W, # no están cubiertas.",
    pt: "Suportado: números, intervalos (1-5), listas (1,15), passos (*/10, 1-30/5), nomes de mês (JAN) e de dia (MON). As extensões Quartz L, W, # não são cobertas.",
  },
  copyRuns: { en: "Copy run times", zh: "复制执行时间", ja: "実行時刻をコピー", es: "Copiar horarios", pt: "Copiar horários" },
  more: { en: "+{n} more", zh: "等 {n} 个值", ja: "ほか {n} 個", es: "+{n} más", pt: "+{n}" },
};

const LIST_MAX = 10;

/** 月/星期名走 Intl,保证与站点语言一致 */
function monthName(locale: Locale, m1to12: number): string {
  return new Intl.DateTimeFormat(INTL_LOCALES[locale] ?? INTL_LOCALES.en, {
    month: "short",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(2026, m1to12 - 1, 1)));
}

function dowName(locale: Locale, dow0to6: number): string {
  // 2026-11-01 是周日
  return new Intl.DateTimeFormat(INTL_LOCALES[locale] ?? INTL_LOCALES.en, {
    weekday: "short",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(2026, 10, 1 + dow0to6)));
}

function joinList(locale: Locale, items: string[]): string {
  return items.join(locale === "zh" || locale === "ja" ? "、" : ", ");
}

function fill(tpl: string, vars: Record<string, string | number>): string {
  return tpl.replace(/\{(\w+)\}/g, (_, k: string) => (k in vars ? String(vars[k]) : `{${k}}`));
}

let cronerPromise: Promise<typeof import("croner")> | null = null;
function loadCroner() {
  cronerPromise ??= import("croner");
  return cronerPromise;
}

type RunsState =
  | { state: "ok"; iso: string[] }
  | { state: "none" }
  | { state: "failed" }
  | null;

export function DevCronExplainerEngine() {
  const { locale, t } = useI18n();
  const [expr, setExpr] = useState("");
  const [utc, setUtc] = useState(false);
  const [runs, setRuns] = useState<RunsState>(null);

  const parsed: Parsed = useMemo(() => parseCron(expr), [expr]);
  const hasInput = expr.trim() !== "";

  const errLine = useMemo(() => {
    if (parsed.ok || !hasInput) return null;
    const { code, unit, detail } = parsed;
    if (code === "fieldCount") return fill(pick(locale, ERR_PHRASE.fieldCount), { n: detail ?? "?" });
    if (code === "empty" || code === "shorthand") {
      return fill(pick(locale, ERR_PHRASE[code]), { d: detail ?? "" });
    }
    const field = pick(locale, FIELD_LABEL[unit ?? "minute"]);
    return fill(pick(locale, ERR_PHRASE[code]), { d: detail ?? "", field });
  }, [parsed, hasInput, locale]);

  useEffect(() => {
    if (!parsed.ok) {
      setRuns(null);
      return;
    }
    const normalized = normalizeCron(expr);
    if (!normalized) {
      setRuns(null);
      return;
    }
    let alive = true;
    (async () => {
      try {
        const { Cron } = await loadCroner();
        const cron = new Cron(normalized, utc ? { timezone: "UTC" } : undefined);
        const dates = cron.nextRuns(5);
        if (!alive) return;
        if (dates.length === 0) setRuns({ state: "none" });
        else setRuns({ state: "ok", iso: dates.map((d) => d.toISOString()) });
      } catch {
        if (alive) setRuns({ state: "failed" });
      }
    })();
    return () => {
      alive = false;
    };
  }, [parsed, expr, utc]);

  const intlLocale = INTL_LOCALES[locale] ?? INTL_LOCALES.en;
  const fmtRun = (iso: string) =>
    new Intl.DateTimeFormat(intlLocale, {
      dateStyle: "medium",
      timeStyle: "medium",
      timeZone: utc ? "UTC" : undefined,
    }).format(new Date(iso));

  const describeField = (unit: CronUnit, raw: string, isWildcard: boolean, values: number[]) => {
    if (isWildcard) return pick(locale, EVERY_PHRASE[unit]);
    const shown = values.slice(0, LIST_MAX);
    const names =
      unit === "month"
        ? shown.map((v) => monthName(locale, v))
        : unit === "dayOfWeek"
          ? shown.map((v) => dowName(locale, v))
          : shown.map((v) => String(v));
    let list = joinList(locale, names);
    if (values.length > LIST_MAX) {
      list += " " + fill(pick(locale, L.more), { n: values.length - LIST_MAX });
    }
    return fill(pick(locale, VALUES_PHRASE[unit]), { list });
  };

  const runsText =
    runs?.state === "ok" ? runs.iso.map((iso, i) => `${i + 1}. ${fmtRun(iso)}`).join("\n") : "";

  return (
    <ToolPanel>
      <div className="space-y-4">
        <input
          type="text"
          className="field mono"
          value={expr}
          onChange={(e) => setExpr(e.target.value)}
          placeholder="*/10 9-17 * * MON-FRI"
          spellCheck={false}
          aria-label={t.common.input}
        />

        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.key}
              type="button"
              onClick={() => setExpr(p.expr)}
              aria-label={pick(locale, PRESET_LABEL[p.key])}
              className="rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)]"
            >
              {pick(locale, PRESET_LABEL[p.key])}
            </button>
          ))}
        </div>

        {!hasInput && (
          <p className="text-[13.5px] leading-5 text-[var(--color-sub)]" role="status">
            {pick(locale, ERR_PHRASE.empty)}
          </p>
        )}

        {errLine && (
          <p
            className="rounded-xl error-bg px-3.5 py-2.5 text-[13.5px] leading-5 text-[var(--color-bad)]"
            role="alert"
          >
            {errLine}
          </p>
        )}

        {parsed.ok && (
          <div className="space-y-5">
            {parsed.breakdown.hasSeconds && (
              <p className="rounded-xl bg-[var(--color-surface)] px-3.5 py-2.5 text-[13.5px] text-[var(--color-sub)]">
                {pick(locale, L.secondsNote)}
              </p>
            )}

            <div className="divide-y divide-[var(--color-hairline)] rounded-xl border hairline">
              {parsed.breakdown.fields.map((f) => (
                <div key={f.unit} className="flex flex-col gap-1 px-3.5 py-2.5 sm:flex-row sm:items-center sm:gap-3">
                  <p className="w-36 flex-none text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">
                    {pick(locale, FIELD_LABEL[f.unit])}
                  </p>
                  <p className="mono w-24 flex-none text-[13.5px] font-medium">{f.raw}</p>
                  <p className="min-w-0 flex-1 text-[13.5px]">
                    {describeField(f.unit, f.raw, f.isWildcard, f.values)}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-2.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-[13px] font-semibold">{pick(locale, L.next)}</p>
                <div className="flex gap-1.5" role="group">
                  {([false, true] as const).map((v) => (
                    <button
                      key={String(v)}
                      type="button"
                      aria-pressed={utc === v}
                      onClick={() => setUtc(v)}
                      className={`rounded-full border px-3 py-1 text-[12.5px] font-medium transition-colors ${
                        utc === v
                          ? "border-transparent bg-[var(--color-ink)] text-white"
                          : "hairline hover:bg-[var(--color-surface)]"
                      }`}
                    >
                      {v ? pick(locale, L.tzUtc) : pick(locale, L.tzLocal)}
                    </button>
                  ))}
                </div>
              </div>

              {runs?.state === "ok" && (
                <ol className="divide-y divide-[var(--color-hairline)] rounded-xl border hairline">
                  {runs.iso.map((iso, i) => (
                    <li key={iso} className="mono flex gap-3 px-3.5 py-2 text-[13.5px]">
                      <span className="w-6 flex-none text-right text-[var(--color-sub)]">{i + 1}</span>
                      <time dateTime={iso}>{fmtRun(iso)}</time>
                    </li>
                  ))}
                </ol>
              )}
              {runs?.state === "none" && (
                <p className="px-1 text-[13.5px] text-[var(--color-sub)]">{pick(locale, L.noRuns)}</p>
              )}
              {runs?.state === "failed" && (
                <p className="px-1 text-[13.5px] text-[var(--color-bad)]" role="alert">
                  {pick(locale, L.runsFailed)}
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-2.5">
              {runs?.state === "ok" && <CopyButton value={runsText} label={pick(locale, L.copyRuns)} />}
              <button
                type="button"
                onClick={() => {
                  setExpr("");
                  setRuns(null);
                }}
                className="rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)]"
              >
                {t.common.clear}
              </button>
            </div>
          </div>
        )}

        <p className="text-[13px] leading-5 text-[var(--color-sub)]">{pick(locale, L.syntaxNote)}</p>
      </div>
    </ToolPanel>
  );
}
