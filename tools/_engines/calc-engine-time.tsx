"use client";

import { useEffect, useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton } from "@/components/client-ui";
import { Icon } from "@/components/icons";
import { ToolPanel } from "@/components/ui";
import { Field, Note, Sel, pick, INTL_LOCALES } from "./calc-ui";

/**
 * Shared engine for timezone-converter and timestamp-converter.
 * props.kind = "timezone" | "timestamp". Live values are computed after mount
 * to keep SSR markup stable (no hydration mismatch).
 */

type City = { tz: string; names: Record<"en" | "zh" | "ja" | "es" | "pt", string> };

const CITIES: City[] = [
  { tz: "America/Los_Angeles", names: { en: "Los Angeles", zh: "洛杉矶", ja: "ロサンゼルス", es: "Los Ángeles", pt: "Los Angeles" } },
  { tz: "America/Denver", names: { en: "Denver", zh: "丹佛", ja: "デンバー", es: "Denver", pt: "Denver" } },
  { tz: "America/Chicago", names: { en: "Chicago", zh: "芝加哥", ja: "シカゴ", es: "Chicago", pt: "Chicago" } },
  { tz: "America/New_York", names: { en: "New York", zh: "纽约", ja: "ニューヨーク", es: "Nueva York", pt: "Nova York" } },
  { tz: "America/Sao_Paulo", names: { en: "São Paulo", zh: "圣保罗", ja: "サンパウロ", es: "São Paulo", pt: "São Paulo" } },
  { tz: "Europe/London", names: { en: "London", zh: "伦敦", ja: "ロンドン", es: "Londres", pt: "Londres" } },
  { tz: "Europe/Paris", names: { en: "Paris", zh: "巴黎", ja: "パリ", es: "París", pt: "Paris" } },
  { tz: "Europe/Berlin", names: { en: "Berlin", zh: "柏林", ja: "ベルリン", es: "Berlín", pt: "Berlim" } },
  { tz: "Europe/Moscow", names: { en: "Moscow", zh: "莫斯科", ja: "モスクワ", es: "Moscú", pt: "Moscou" } },
  { tz: "Africa/Lagos", names: { en: "Lagos", zh: "拉各斯", ja: "ラゴス", es: "Lagos", pt: "Lagos" } },
  { tz: "Africa/Johannesburg", names: { en: "Johannesburg", zh: "约翰内斯堡", ja: "ヨハネスブルク", es: "Johannesburgo", pt: "Joanesburgo" } },
  { tz: "Asia/Dubai", names: { en: "Dubai", zh: "迪拜", ja: "ドバイ", es: "Dubái", pt: "Dubai" } },
  { tz: "Asia/Kolkata", names: { en: "Mumbai", zh: "孟买", ja: "ムンバイ", es: "Bombay", pt: "Mumbai" } },
  { tz: "Asia/Bangkok", names: { en: "Bangkok", zh: "曼谷", ja: "バンコク", es: "Bangkok", pt: "Bangkok" } },
  { tz: "Asia/Shanghai", names: { en: "Shanghai", zh: "上海", ja: "上海", es: "Shanghái", pt: "Xangai" } },
  { tz: "Asia/Singapore", names: { en: "Singapore", zh: "新加坡", ja: "シンガポール", es: "Singapur", pt: "Singapura" } },
  { tz: "Asia/Hong_Kong", names: { en: "Hong Kong", zh: "香港", ja: "香港", es: "Hong Kong", pt: "Hong Kong" } },
  { tz: "Asia/Seoul", names: { en: "Seoul", zh: "首尔", ja: "ソウル", es: "Seúl", pt: "Seul" } },
  { tz: "Asia/Tokyo", names: { en: "Tokyo", zh: "东京", ja: "東京", es: "Tokio", pt: "Tóquio" } },
  { tz: "Australia/Sydney", names: { en: "Sydney", zh: "悉尼", ja: "シドニー", es: "Sídney", pt: "Sydney" } },
  { tz: "Pacific/Auckland", names: { en: "Auckland", zh: "奥克兰", ja: "オークランド", es: "Auckland", pt: "Auckland" } },
];

/** Minutes that tz is offset from UTC at the given instant (DST-aware). */
function tzOffsetMinutes(tz: string, date: Date): number {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const parts = dtf.formatToParts(date);
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value ?? "0");
  const asUtc = Date.UTC(get("year"), get("month") - 1, get("day"), get("hour") % 24, get("minute"), get("second"));
  return Math.round((asUtc - date.getTime()) / 60000);
}

function fmtOffset(mins: number): string {
  const sign = mins < 0 ? "−" : "+";
  const a = Math.abs(mins);
  return `UTC${sign}${String(Math.floor(a / 60)).padStart(2, "0")}:${String(a % 60).padStart(2, "0")}`;
}

function timeIn(tz: string, date: Date, locale: string): string {
  return new Intl.DateTimeFormat(locale, { timeZone: tz, hour: "2-digit", minute: "2-digit", second: "2-digit" }).format(date);
}

function dateIn(tz: string, date: Date, locale: string): string {
  return new Intl.DateTimeFormat(locale, { timeZone: tz, year: "numeric", month: "short", day: "numeric" }).format(date);
}

/* ---------------- timezone converter ---------------- */

function Timezone() {
  const { locale } = useI18n();
  const [from, setFrom] = useState("Asia/Shanghai");
  const [to, setTo] = useState("America/New_York");
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const fromCity = CITIES.find((c) => c.tz === from) ?? CITIES[0];
  const toCity = CITIES.find((c) => c.tz === to) ?? CITIES[1];
  const fromName = fromCity.names[locale as keyof City["names"]];
  const toName = toCity.names[locale as keyof City["names"]];

  // Offset difference for "today" — computed against noon UTC to dodge DST edges.
  const offset = useMemo(() => {
    if (!now) return null;
    const ref = new Date(now);
    ref.setUTCHours(12, 0, 0, 0);
    return tzOffsetMinutes(to, ref) - tzOffsetMinutes(from, ref);
  }, [now, from, to]);

  // 24-hour meeting table: hour in from-city → time in to-city.
  const table = useMemo(() => {
    if (!now) return [];
    const ref = new Date(now);
    ref.setUTCHours(12, 0, 0, 0);
    const offFrom = tzOffsetMinutes(from, ref);
    const wall = new Intl.DateTimeFormat("en-CA", { timeZone: from, year: "numeric", month: "2-digit", day: "2-digit" }).format(ref);
    const [wy, wm, wd] = wall.split("-").map(Number);
    const rows: { h: number; label: string; date: string }[] = [];
    for (let h = 0; h < 24; h++) {
      const guess = Date.UTC(wy, wm - 1, wd, h, 0) - offFrom * 60000;
      const corrected = guess - (tzOffsetMinutes(from, new Date(guess)) - offFrom) * 60000;
      const d = new Date(corrected);
      rows.push({ h, label: timeIn(to, d, INTL_LOCALES[locale] ?? INTL_LOCALES.en), date: dateIn(to, d, INTL_LOCALES[locale] ?? INTL_LOCALES.en) });
    }
    return rows;
  }, [now, from, to, locale]);

  const sel = (v: string, set: (s: string) => void, aria: string) => (
    <Sel value={v} onChange={set} aria={aria}>
      {CITIES.map((c) => (
        <option key={c.tz} value={c.tz}>
          {c.names[locale as keyof City["names"]]}
        </option>
      ))}
    </Sel>
  );

  const diffSentence = (() => {
    if (offset === null) return "";
    if (offset === 0)
      return pick(locale, {
        en: `${toName} and ${fromName} show the same clock time today.`,
        zh: `${toName} 与 ${fromName} 今天钟面时间一致。`,
        ja: `${toName} と ${fromName} は今日、同じ時刻です。`,
        es: `${toName} y ${fromName} tienen la misma hora hoy.`,
        pt: `${toName} e ${fromName} têm o mesmo horário hoje.`,
      });
    const h = Math.floor(Math.abs(offset) / 60);
    const m = Math.abs(offset) % 60;
    const span = [h ? `${h} h` : "", m ? `${m} min` : ""].filter(Boolean).join(" ");
    if (locale === "zh")
      return `${toName} 比 ${fromName} ${offset > 0 ? "早" : "晚"} ${span}(今天)。`;
    if (locale === "ja")
      return `${toName} は今日、${fromName} より ${span} ${offset > 0 ? "進んで" : "遅れて"}います。`;
    if (locale === "es")
      return `${toName} va ${span} ${offset > 0 ? "por delante de" : "por detrás de"} ${fromName} hoy.`;
    if (locale === "pt")
      return `${toName} está ${span} ${offset > 0 ? "à frente de" : "atrás de"} ${fromName} hoje.`;
    return `${toName} is ${span} ${offset > 0 ? "ahead of" : "behind"} ${fromName} today.`;
  })();

  return (
    <ToolPanel>
      <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
        <div className="space-y-2">
          <span className="block text-[13px] font-medium text-[var(--color-sub)]">{pick(locale, { en: "From city", zh: "起点城市", ja: "起点の都市", es: "Ciudad de origen", pt: "Cidade de origem" })}</span>
          {sel(from, setFrom, "from city")}
          <div className="rounded-xl border hairline px-3.5 py-2.5">
            <span className="mono block text-xl font-semibold" aria-live="polite">{now ? timeIn(from, now, INTL_LOCALES[locale] ?? INTL_LOCALES.en) : "—"}</span>
            <span className="text-[12.5px] text-[var(--color-sub)]">
              {now ? dateIn(from, now, INTL_LOCALES[locale] ?? INTL_LOCALES.en) : ""} · {now ? fmtOffset(tzOffsetMinutes(from, now)) : ""}
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            setFrom(to);
            setTo(from);
          }}
          className="mx-auto mb-1.5 inline-flex rounded-full border hairline p-2.5 text-[var(--color-sub)] transition-colors hover:bg-[var(--color-surface)]"
          aria-label="swap cities"
        >
          <Icon name="swap" size={18} />
        </button>
        <div className="space-y-2">
          <span className="block text-[13px] font-medium text-[var(--color-sub)]">{pick(locale, { en: "To city", zh: "目标城市", ja: "先方の都市", es: "Ciudad de destino", pt: "Cidade de destino" })}</span>
          {sel(to, setTo, "to city")}
          <div className="rounded-xl border hairline px-3.5 py-2.5">
            <span className="mono block text-xl font-semibold" aria-live="polite">{now ? timeIn(to, now, INTL_LOCALES[locale] ?? INTL_LOCALES.en) : "—"}</span>
            <span className="text-[12.5px] text-[var(--color-sub)]">
              {now ? dateIn(to, now, INTL_LOCALES[locale] ?? INTL_LOCALES.en) : ""} · {now ? fmtOffset(tzOffsetMinutes(to, now)) : ""}
            </span>
          </div>
        </div>
      </div>

      {diffSentence && <p className="mt-4 text-[15px] text-[var(--color-sub)]">{diffSentence}</p>}

      {table.length > 0 && (
        <div className="mt-6">
          <h3 className="mb-3 text-[15px] font-semibold">
            {pick(locale, { en: "Hour-by-hour today", zh: "今天逐小时对照", ja: "今日の時間帯対応表", es: "Comparación hora a hora de hoy", pt: "Comparação hora a hora de hoje" })}
          </h3>
          <div className="overflow-hidden rounded-xl border hairline">
            <div className="max-h-[26rem] overflow-y-auto">
              <table className="w-full text-[14px]">
                <thead className="sticky top-0 bg-[var(--color-card)]">
                  <tr className="border-b hairline text-[12.5px] uppercase tracking-wide text-[var(--color-sub)]">
                    <th scope="col" className="px-3.5 py-2 text-left font-semibold">{fromName}</th>
                    <th scope="col" className="px-3.5 py-2 text-right font-semibold">{toName}</th>
                  </tr>
                </thead>
                <tbody>
                  {table.map((r) => (
                    <tr key={r.h} className={r.h % 2 ? "bg-[var(--color-surface)]" : ""}>
                      <td className="mono px-3.5 py-1.5">{String(r.h).padStart(2, "0")}:00</td>
                      <td className="mono px-3.5 py-1.5 text-right text-[var(--color-sub)]">
                        {r.label}
                        <span className="ml-2 text-[12px]">{r.date}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      <div className="mt-4">
        <Note>
          {pick(locale, {
            en: "Timezone math uses the browser's own IANA database, so daylight-saving shifts are exact — no network involved.",
            zh: "时区换算使用浏览器内置的 IANA 数据库,夏令时切换精确无误,全程不联网。",
            ja: "タイムゾーンの計算はブラウザ内蔵の IANA データベースを使用するため、サマータイムも正確です。通信は発生しません。",
            es: "Las zonas horarias usan la base IANA del navegador, así que el horario de verano es exacto, sin conexión de red.",
            pt: "Os fusos usam o banco IANA do navegador, então o horário de verão é calculado com exatidão — sem rede.",
          })}
        </Note>
      </div>
    </ToolPanel>
  );
}

/* ---------------- timestamp converter ---------------- */

function Timestamp() {
  const { locale, t } = useI18n();
  const [now, setNow] = useState<number | null>(null);
  const [unix, setUnix] = useState("");
  const [dtLocal, setDtLocal] = useState("");

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const intl = INTL_LOCALES[locale] ?? INTL_LOCALES.en;

  const parsed = useMemo(() => {
    const s = unix.trim();
    if (!s || !/^-?\d+$/.test(s)) return null;
    const n = Number(s);
    const ms = Math.abs(n) >= 1e12 ? n : n * 1000;
    const d = new Date(ms);
    return Number.isNaN(d.getTime()) ? null : d;
  }, [unix]);

  const fromDt = useMemo(() => {
    if (!dtLocal) return null;
    const d = new Date(dtLocal);
    return Number.isNaN(d.getTime()) ? null : d;
  }, [dtLocal]);

  const fmtHuman = (d: Date) =>
    `${new Intl.DateTimeFormat(intl, { timeZone: "UTC", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }).format(d)} UTC`;

  return (
    <ToolPanel>
      <div className="rounded-xl border hairline px-4 py-3.5">
        <span className="text-[13px] font-medium text-[var(--color-sub)]">{pick(locale, { en: "Current Unix timestamp", zh: "当前 Unix 时间戳", ja: "現在の Unix タイムスタンプ", es: "Marca de tiempo Unix actual", pt: "Timestamp Unix atual" })}</span>
        <div className="mt-1.5 flex flex-wrap items-center gap-3">
          <code className="mono text-[22px] font-semibold" aria-live="polite">{now === null ? "—" : Math.floor(now / 1000)}</code>
          <code className="mono text-[14px] text-[var(--color-sub)]">{now === null ? "" : now} ms</code>
          {now !== null && <CopyButton value={String(Math.floor(now / 1000))} label={t.common.copy} />}
          {now !== null && <CopyButton value={String(now)} label="ms" />}
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="space-y-3">
          <Field label={pick(locale, { en: "Unix timestamp → date", zh: "Unix 时间戳 → 日期", ja: "Unix タイムスタンプ → 日付", es: "Timestamp Unix → fecha", pt: "Timestamp Unix → data" })}>
            <input
              type="text"
              className="field mono"
              value={unix}
              onChange={(e) => setUnix(e.target.value)}
              placeholder={now === null ? "1760000000" : String(Math.floor(now / 1000))}
              aria-label="unix timestamp input"
              spellCheck={false}
            />
          </Field>
          {unix.trim() !== "" && (
            parsed ? (
              <div className="rounded-xl border hairline px-4 py-3 text-[14.5px]">
                <p><strong className="font-semibold">{pick(locale, { en: "Your local time", zh: "本地时间", ja: "ローカル時刻", es: "Hora local", pt: "Hora local" })}:</strong>{" "}
                  <span className="mono">{new Intl.DateTimeFormat(intl, { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }).format(parsed)}</span>
                </p>
                <p className="mt-1"><strong className="font-semibold">{pick(locale, { en: "UTC", zh: "UTC 时间", ja: "UTC 時刻", es: "Hora UTC", pt: "Hora UTC" })}:</strong> <span className="mono">{fmtHuman(parsed)}</span></p>
                <p className="mt-1 text-[13px] text-[var(--color-sub)]">
                  {Math.abs(Number(unix)) >= 1e12
                    ? pick(locale, { en: "Interpreted as milliseconds.", zh: "已按毫秒解析。", ja: "ミリ秒として解釈しました。", es: "Interpretado en milisegundos.", pt: "Interpretado em milissegundos." })
                    : pick(locale, { en: "Interpreted as seconds.", zh: "已按秒解析。", ja: "秒として解釈しました。", es: "Interpretado en segundos.", pt: "Interpretado em segundos." })}
                </p>
              </div>
            ) : (
              <p className="text-[13.5px] text-[var(--color-bad)]" role="alert">
                {pick(locale, { en: "Enter digits only — seconds or milliseconds both work.", zh: "请只输入数字——秒或毫秒都可以。", ja: "数字のみ入力してください(秒・ミリ秒どちらも可)。", es: "Introduzca solo dígitos: valen segundos o milisegundos.", pt: "Digite apenas números — segundos ou milissegundos servem." })}
              </p>
            )
          )}
        </div>

        <div className="space-y-3">
          <Field label={pick(locale, { en: "Date → Unix timestamp", zh: "日期 → Unix 时间戳", ja: "日付 → Unix タイムスタンプ", es: "Fecha → timestamp Unix", pt: "Data → timestamp Unix" })}>
            <input type="datetime-local" className="field mono" value={dtLocal} onChange={(e) => setDtLocal(e.target.value)} aria-label="date to timestamp" />
          </Field>
          {fromDt && (
            <div className="rounded-xl border hairline px-4 py-3 text-[14.5px]">
              <p><strong className="font-semibold">s:</strong> <span className="mono">{Math.floor(fromDt.getTime() / 1000)}</span></p>
              <p className="mt-1"><strong className="font-semibold">ms:</strong> <span className="mono">{fromDt.getTime()}</span></p>
            </div>
          )}
        </div>
      </div>
      <div className="mt-4">
        <Note>
          {pick(locale, {
            en: "Timestamps are timezone-independent by definition (seconds since 1970-01-01 UTC); the human-readable side renders in your device timezone and UTC.",
            zh: "时间戳本身与时区无关(自 1970-01-01 UTC 起的秒数);人类可读结果会同时给出设备时区与 UTC 两种显示。",
            ja: "タイムスタンプ自体はタイムゾーンに依存しません(1970-01-01 UTC からの秒数)。表示は端末のタイムゾーンと UTC の両方で示します。",
            es: "Los timestamps no dependen de la zona horaria (segundos desde 1970-01-01 UTC); la fecha legible se muestra en su zona horaria y en UTC.",
            pt: "Timestamps independem do fuso (segundos desde 1970-01-01 UTC); a data legível aparece no fuso do seu dispositivo e em UTC.",
          })}
        </Note>
      </div>
    </ToolPanel>
  );
}

export function CalcEngineTime({ kind }: { kind: string }) {
  return kind === "timezone" ? <Timezone /> : <Timestamp />;
}
