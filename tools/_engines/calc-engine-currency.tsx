"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { Icon } from "@/components/icons";
import { ToolPanel } from "@/components/ui";
import { Field, NumIn, Note, Sel, fmt, pick, INTL_LOCALES } from "./calc-ui";

/**
 * Currency converter — the ONLY calculator in this batch that touches the
 * network. Rates come from the free, keyless open.er-api.com endpoint and are
 * cached in localStorage for one hour; the conversion arithmetic itself runs
 * locally in the browser. Disclosed in the note below and in the page copy.
 */

const API = "https://open.er-api.com/v6/latest/USD";
const CACHE_KEY = "zoyku-fx-rates-v1";
const TTL_MS = 60 * 60 * 1000; // 1 hour

const COMMON = [
  "USD", "EUR", "GBP", "JPY", "CNY", "INR", "AUD", "CAD", "CHF", "HKD",
  "SGD", "KRW", "BRL", "MXN", "RUB", "TRY", "AED", "SAR", "THB", "NZD",
  "SEK", "NOK", "DKK", "PLN", "CZK", "HUF", "ZAR", "TWD", "VND", "PHP",
  "IDR", "MYR", "ILS", "EGP", "NGN", "ARS", "CLP", "COP", "PKR", "BDT",
];

type CacheEntry = { t: number; r: Record<string, number> };

function readCache(): CacheEntry | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CacheEntry;
    if (parsed && typeof parsed.t === "number" && parsed.r && typeof parsed.r.USD === "number") return parsed;
    return null;
  } catch {
    return null;
  }
}

function writeCache(entry: CacheEntry): void {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(entry));
  } catch {
    // storage unavailable — session-only caching then
  }
}

export function CalcEngineCurrency() {
  const { locale, t } = useI18n();
  const [amount, setAmount] = useState("100");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [rates, setRates] = useState<Record<string, number> | null>(null);
  const [updated, setUpdated] = useState<number | null>(null);
  const [stale, setStale] = useState(false);
  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading");
  const [copied, setCopied] = useState(false);
  const askedRef = useRef(false);

  const load = useCallback(async (force: boolean) => {
    setStatus((s) => (rates ? s : "loading"));
    const cache = readCache();
    if (!force && cache && Date.now() - cache.t < TTL_MS) {
      setRates(cache.r);
      setUpdated(cache.t);
      setStale(false);
      setStatus("ok");
      return;
    }
    try {
      const res = await fetch(API);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as { result?: string; time_last_update_unix?: number; rates?: Record<string, number> };
      if (data.result !== "success" || !data.rates || !data.rates.USD) throw new Error("bad payload");
      const entry: CacheEntry = { t: (data.time_last_update_unix ?? Date.now() / 1000) * 1000, r: data.rates };
      writeCache(entry);
      setRates(entry.r);
      setUpdated(entry.t);
      setStale(false);
      setStatus("ok");
    } catch {
      if (cache) {
        // offline fallback: keep serving cached rates, clearly labeled
        setRates(cache.r);
        setUpdated(cache.t);
        setStale(true);
        setStatus("ok");
      } else {
        setStatus("error");
      }
    }
  }, [rates]);

  useEffect(() => {
    if (askedRef.current) return;
    askedRef.current = true;
    void load(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const a = Number(amount.replace(",", "."));
  const rateFrom = rates?.[from];
  const rateTo = rates?.[to];
  const converted = Number.isFinite(a) && rateFrom && rateTo ? (a / rateFrom) * rateTo : NaN;

  const codes = useMemo(() => {
    if (!rates) return { common: [] as string[], rest: [] as string[] };
    const all = Object.keys(rates).sort();
    return {
      common: COMMON.filter((c) => c in rates),
      rest: all.filter((c) => !COMMON.includes(c)),
    };
  }, [rates]);

  const nameOf = useCallback(
    (code: string): string => {
      try {
        return new Intl.DisplayNames([INTL_LOCALES[locale] ?? INTL_LOCALES.en], { type: "currency" }).of(code) ?? code;
      } catch {
        return code;
      }
    },
    [locale],
  );

  const copyRate = async () => {
    if (!rateFrom || !rateTo) return;
    const text = `1 ${from} = ${((1 / rateFrom) * rateTo).toFixed(4)} ${to}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard unavailable
    }
  };

  const opts = (list: string[]) =>
    list.map((c) => (
      <option key={c} value={c}>
        {c} · {nameOf(c)}
      </option>
    ));

  return (
    <ToolPanel>
      <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
        <div className="space-y-2">
          <Field label={pick(locale, { en: "Amount", zh: "金额", ja: "金額", es: "Cantidad", pt: "Valor" })}>
            <NumIn value={amount} onChange={setAmount} aria="amount" className="text-lg" />
          </Field>
          {sel(from, setFrom, "from currency")}
        </div>
        <button
          type="button"
          onClick={() => {
            setFrom(to);
            setTo(from);
          }}
          className="mx-auto mb-1.5 inline-flex rounded-full border hairline p-2.5 text-[var(--color-sub)] transition-colors hover:bg-[var(--color-surface)]"
          aria-label={t.common.swap}
        >
          <Icon name="swap" size={18} />
        </button>
        <div className="space-y-2">
          <Field label={pick(locale, { en: "Converted to", zh: "转换为", ja: "変換先", es: "Convertir a", pt: "Converter para" })}>
            <output className="field mono block truncate bg-[var(--color-surface)] text-lg font-medium" aria-live="polite">
              {Number.isFinite(converted) ? fmt(converted, locale, 2) : "—"}
            </output>
          </Field>
          {sel(to, setTo, "to currency")}
        </div>
      </div>

      {rateFrom && rateTo && (
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[14px] text-[var(--color-sub)]">
          <span>
            1 {from} = <strong className="font-semibold text-[var(--color-ink)]">{((1 / rateFrom) * rateTo).toFixed(4)}</strong> {to}
          </span>
          <button type="button" onClick={copyRate} className="inline-flex items-center gap-1 rounded-full border hairline px-2.5 py-1 text-[12.5px] font-medium transition-colors hover:bg-[var(--color-surface)]">
            {copied ? pick(locale, { en: "Copied", zh: "已复制", ja: "コピーしました", es: "Copiado", pt: "Copiado" }) : pick(locale, { en: "Copy rate", zh: "复制汇率", ja: "レートをコピー", es: "Copiar tasa", pt: "Copiar taxa" })}
          </button>
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-[13px] text-[var(--color-sub)]">
          {status === "loading" &&
            pick(locale, { en: "Loading exchange rates…", zh: "正在加载汇率……", ja: "為替レートを読み込み中…", es: "Cargando tipos de cambio…", pt: "Carregando cotações…" })}
          {status === "ok" && updated !== null &&
            (stale
              ? pick(locale, {
                  en: `Showing rates cached on your device from ${new Intl.DateTimeFormat(INTL_LOCALES[locale] ?? INTL_LOCALES.en, { dateStyle: "medium", timeStyle: "short" }).format(updated)} — could not reach the rate service just now.`,
                  zh: `当前显示设备上的缓存汇率(更新于 ${new Intl.DateTimeFormat("zh-CN", { dateStyle: "medium", timeStyle: "short" }).format(updated)})——暂时无法连接汇率服务。`,
                  ja: `現在デバイスにキャッシュされたレートを表示しています(${new Intl.DateTimeFormat("ja-JP", { dateStyle: "medium", timeStyle: "short" }).format(updated)} 更新)——ただ今レートサービスに接続できません。`,
                  es: `Mostrando tipos en caché de tu dispositivo del ${new Intl.DateTimeFormat("es-ES", { dateStyle: "medium", timeStyle: "short" }).format(updated)} — no se pudo contactar el servicio ahora.`,
                  pt: `Exibindo cotações em cache do seu dispositivo de ${new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium", timeStyle: "short" }).format(updated)} — não foi possível contactar o serviço agora.`,
                })
              : pick(locale, {
                  en: `Mid-market rates updated ${new Intl.DateTimeFormat(INTL_LOCALES[locale] ?? INTL_LOCALES.en, { dateStyle: "medium", timeStyle: "short" }).format(updated)}.`,
                  zh: `中间价汇率更新于 ${new Intl.DateTimeFormat("zh-CN", { dateStyle: "medium", timeStyle: "short" }).format(updated)}。`,
                  ja: `ミッドマーケットレートの更新: ${new Intl.DateTimeFormat("ja-JP", { dateStyle: "medium", timeStyle: "short" }).format(updated)}。`,
                  es: `Tipos de referencia actualizados el ${new Intl.DateTimeFormat("es-ES", { dateStyle: "medium", timeStyle: "short" }).format(updated)}.`,
                  pt: `Cotações de referência atualizadas em ${new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium", timeStyle: "short" }).format(updated)}.`,
                }))}
        </p>
        <button
          type="button"
          onClick={() => void load(true)}
          className="inline-flex items-center gap-1.5 rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)]"
        >
          <Icon name="rotate" size={14} />
          {pick(locale, { en: "Refresh rates", zh: "刷新汇率", ja: "レートを更新", es: "Actualizar tasas", pt: "Atualizar cotações" })}
        </button>
      </div>

      {status === "error" && (
        <div className="mt-4 rounded-xl border hairline bg-[var(--color-surface)] px-4 py-3.5" role="alert">
          <p className="text-[14px] font-medium text-[var(--color-bad)]">
            {pick(locale, {
              en: "Could not load exchange rates. Check your internet connection and try again — every other tool on this site works fully offline.",
              zh: "无法加载汇率。请检查网络连接后重试——本站其他工具均可完全离线使用。",
              ja: "為替レートを読み込めませんでした。ネットワーク接続を確認して再試行してください。当サイトの他のツールは完全オフラインで動作します。",
              es: "No se pudieron cargar los tipos de cambio. Revise su conexión e inténtelo de nuevo; el resto de herramientas del sitio funcionan sin conexión.",
              pt: "Não foi possível carregar as cotações. Verifique sua conexão e tente novamente — as outras ferramentas do site funcionam offline.",
            })}
          </p>
          <button
            type="button"
            onClick={() => void load(true)}
            className="mt-2.5 inline-flex rounded-full bg-[var(--color-ink)] px-4 py-1.5 text-[13.5px] font-medium text-white"
          >
            {pick(locale, { en: "Retry", zh: "重试", ja: "再試行", es: "Reintentar", pt: "Tentar novamente" })}
          </button>
        </div>
      )}

      <div className="mt-4">
        <Note>
          {pick(locale, {
            en: "How it works: the exchange-rate table is fetched once from the free open.er-api.com service (no key, no account) and cached on your device for an hour; the multiplication that converts your amount happens locally in your browser. No amount you type is ever sent anywhere.",
            zh: "工作方式:汇率表从免费的 open.er-api.com 服务获取一次(无需密钥、无需注册),并在设备上缓存一小时;金额换算的乘法运算完全在浏览器本地完成。你输入的任何金额都不会被发送到任何地方。",
            ja: "仕組み:レート表は無料の open.er-api.com サービスから 1 回だけ取得し(キーも登録も不要)、1 時間デバイスにキャッシュします。金額の掛け算はブラウザ内で行われ、入力した金額が送信されることはありません。",
            es: "Cómo funciona: la tabla de tipos se obtiene una vez del servicio gratuito open.er-api.com (sin clave ni cuenta) y se guarda en tu dispositivo durante una hora; la multiplicación de tu cantidad ocurre en tu navegador. Ningún importe que escribas se envía a ningún sitio.",
            pt: "Como funciona: a tabela de cotações é obtida uma vez do serviço gratuito open.er-api.com (sem chave, sem cadastro) e fica em cache no seu dispositivo por uma hora; a multiplicação do valor acontece localmente no navegador. Nada do que você digita é enviado.",
          })}
        </Note>
      </div>
    </ToolPanel>
  );

  function sel(v: string, set: (s: string) => void, aria: string) {
    if (codes.common.length === 0) {
      // rates not loaded yet — keep the select usable with the current code
      return (
        <Sel value={v} onChange={set} aria={aria}>
          <option value={v}>{v}</option>
        </Sel>
      );
    }
    return (
      <Sel value={v} onChange={set} aria={aria}>
        {codes.common.length > 0 && <optgroup label={pick(locale, { en: "Common", zh: "常用", ja: "よく使う通貨", es: "Frecuentes", pt: "Comuns" })}>{opts(codes.common)}</optgroup>}
        {codes.rest.length > 0 && <optgroup label={pick(locale, { en: "All currencies", zh: "全部货币", ja: "すべての通貨", es: "Todas las monedas", pt: "Todas as moedas" })}>{opts(codes.rest)}</optgroup>}
      </Sel>
    );
  }
}
