"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import { Icon } from "@/components/icons";
import type { Locale } from "@/lib/site";
import { STATUS_GROUPS, STATUS_TOTAL } from "./dev-http-status-data";

/**
 * HTTP 状态码速查引擎:纯数据表,零依赖。
 * 搜索按号码或英文名实时过滤;点击任意行复制状态码数字并给出可见反馈。
 */

const L: Record<string, Record<string, string>> = {
  search: {
    en: "Search code or name… (404, teapot, redirect)",
    zh: "搜索状态码或名称…(404、teapot)",
    ja: "番号や名前で検索…(404、teapot)",
    es: "Buscar por código o nombre… (404, teapot)",
    pt: "Buscar por código ou nome… (404, teapot)",
  },
  none: {
    en: "No status code matches “{q}”.",
    zh: "没有匹配“{q}”的状态码。",
    ja: "「{q}」に一致するステータスコードはありません。",
    es: "Ningún código coincide con «{q}».",
    pt: "Nenhum código corresponde a “{q}”.",
  },
};

const pick = (l: Record<string, string>, locale: Locale) => l[locale] ?? l.en;

function fill(q: string, tpl: string): string {
  return tpl.replace(/\{q\}/g, q);
}

function copyText(text: string) {
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text: string) {
  const ta = document.createElement("textarea");
  ta.value = text;
  document.body.appendChild(ta);
  ta.select();
  document.execCommand("copy");
  ta.remove();
}

export function DevHttpStatusEngine() {
  const { locale, t } = useI18n();
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState<number | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const q = query.trim().toLowerCase();

  const groups = useMemo(() => {
    if (!q) return STATUS_GROUPS;
    return STATUS_GROUPS.map((g) => ({
      ...g,
      codes: g.codes.filter(
        (c) => c.name.toLowerCase().includes(q) || String(c.code).includes(q),
      ),
    })).filter((g) => g.codes.length > 0);
  }, [q]);

  const shown = useMemo(() => groups.reduce((n, g) => n + g.codes.length, 0), [groups]);

  const copyCode = useCallback((code: number) => {
    copyText(String(code));
    setCopied(code);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(null), 1600);
  }, []);

  return (
    <ToolPanel>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <input
            type="search"
            className="field"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={pick(L.search, locale)}
            aria-label={pick(L.search, locale)}
          />
          <span className="mono flex-none text-[13px] text-[var(--color-sub)]" aria-live="polite">
            {shown}/{STATUS_TOTAL}
          </span>
        </div>

        {shown === 0 && (
          <p className="rounded-xl bg-[var(--color-surface)] px-3.5 py-3 text-[14px] text-[var(--color-sub)]">
            {fill(query.trim(), pick(L.none, locale))}
          </p>
        )}

        <div className="space-y-5">
          {groups.map((g) => (
            <section key={g.cls}>
              <h3 className="mb-1 text-[13px] font-semibold text-[var(--color-sub)]">
                <span className="mono">{g.cls}</span>
                <span className="ml-1.5">{g.label[locale] ?? g.label.en}</span>
                <span className="ml-1.5 font-normal">{g.codes.length}</span>
              </h3>
              <div className="divide-y divide-[var(--color-hairline)] rounded-xl border hairline">
                {g.codes.map((c) => (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => copyCode(c.code)}
                    aria-label={`${c.code} ${c.name} — ${t.common.copy}`}
                    className={`grid w-full grid-cols-[3.25rem_1fr_auto] items-baseline gap-x-3 rounded-xl px-3 py-2 text-left transition-colors hover:bg-[var(--color-surface)] sm:grid-cols-[3.5rem_11rem_1fr_auto] ${
                      copied === c.code ? "bg-[rgba(26,127,55,0.08)]" : ""
                    }`}
                  >
                    <span className="mono self-center text-[14px] font-semibold">{c.code}</span>
                    <span className="text-[14px] font-medium">{c.name}</span>
                    <span className="col-span-2 text-[13.5px] leading-5 text-[var(--color-sub)] sm:col-span-1">
                      {c.desc[locale] ?? c.desc.en}
                    </span>
                    <span className="col-start-3 row-start-1 flex h-4 w-4 items-center justify-center self-center sm:col-start-4">
                      {copied === c.code && (
                        <Icon name="check" size={15} className="text-[var(--color-good)]" />
                      )}
                    </span>
                  </button>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </ToolPanel>
  );
}
