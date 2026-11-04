"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import type { Locale } from "@/lib/site";
import { EMOJI_ALL, EMOJI_GROUPS } from "./text-emoji-data";

/** char → 英文名,给「最近使用」的按钮补上可访问名称 */
const NAME_BY_CHAR = new Map(EMOJI_ALL.map((e) => [e.char, e.name]));

/**
 * emoji 选择器:纯文本网格(原生字形,零图片)、英文名搜索、
 * 点击即复制并给出可见反馈;最近使用 16 个持久化在 localStorage。
 */

const RECENT_KEY = "zoyku-emoji-recent";
const RECENT_MAX = 16;

const L: Record<string, Record<string, string>> = {
  all: { en: "All", zh: "全部", ja: "すべて", es: "Todos", pt: "Todos" },
  recent: {
    en: "Recently used",
    zh: "最近使用",
    ja: "最近使用した",
    es: "Usados recientemente",
    pt: "Usados recentemente",
  },
  search: {
    en: "Search by name… (star, party, fire)",
    zh: "按英文名搜索…(star、party、fire)",
    ja: "名前で検索…(star、party、fire)",
    es: "Buscar por nombre… (star, party, fire)",
    pt: "Buscar por nome… (star, party, fire)",
  },
  none: {
    en: "No emoji matches",
    zh: "没有匹配的 emoji",
    ja: "一致する絵文字がありません",
    es: "Ningún emoji coincide",
    pt: "Nenhum emoji corresponde",
  },
};

function copyText(text: string) {
  // 剪贴板优先,http 环境降级到 execCommand
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

export function EmojiPickerEngine() {
  const { locale, t } = useI18n();
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState<string>("all");
  const [recent, setRecent] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // localStorage 只在客户端读,避免 SSR 水合不一致
    try {
      const raw = localStorage.getItem(RECENT_KEY);
      if (raw) {
        const list = JSON.parse(raw);
        if (Array.isArray(list)) setRecent(list.filter((x) => typeof x === "string").slice(0, RECENT_MAX));
      }
    } catch {
      // 忽略损坏的历史数据
    }
  }, []);

  const flash = useCallback((char: string) => {
    setCopied(char);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(null), 1600);
  }, []);

  const pick = useCallback(
    (char: string) => {
      copyText(char);
      flash(char);
      setRecent((prev) => {
        const next = [char, ...prev.filter((c) => c !== char)].slice(0, RECENT_MAX);
        try {
          localStorage.setItem(RECENT_KEY, JSON.stringify(next));
        } catch {
          // 存储被禁用时仅保留会话内记录
        }
        return next;
      });
    },
    [flash],
  );

  const q = query.trim().toLowerCase();
  const searching = q !== "";

  const results = useMemo(() => {
    if (searching) return EMOJI_ALL.filter((e) => e.name.toLowerCase().includes(q));
    if (group === "all") return null; // null 表示按分组全量展示
    return EMOJI_GROUPS.find((g) => g.key === group)?.items ?? null;
  }, [searching, q, group]);

  const tabs = [
    { key: "all", label: L.all[locale] ?? L.all.en },
    ...EMOJI_GROUPS.map((g) => ({ key: g.key, label: g.label[locale] ?? g.label.en })),
  ];

  const gridClass = "grid grid-cols-8 gap-1 sm:grid-cols-10 md:grid-cols-12";

  const cell = (e: { name: string; char: string }) => (
    <button
      key={e.char}
      type="button"
      title={e.name}
      aria-label={`${e.name} — ${t.common.copy}`}
      onClick={() => pick(e.char)}
      className={`flex aspect-square items-center justify-center rounded-xl text-[22px] leading-none transition-all hover:bg-[var(--color-surface)] active:scale-90 ${
        copied === e.char ? "bg-[rgba(26,127,55,0.12)]" : ""
      }`}
    >
      {e.char}
    </button>
  );

  return (
    <ToolPanel>
      <div className="space-y-4">
        <input
          type="search"
          className="field"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={L.search[locale] ?? L.search.en}
          aria-label={L.search[locale] ?? L.search.en}
        />

        <div className="flex flex-wrap gap-2" role="tablist">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={!searching && group === tab.key}
              onClick={() => {
                setGroup(tab.key);
                setQuery("");
              }}
              className={`rounded-full border px-3 py-1.5 text-[13px] font-medium transition-colors ${
                !searching && group === tab.key
                  ? "border-transparent bg-[var(--color-ink)] text-white dark:bg-white dark:text-[#1d1d1f]"
                  : "hairline hover:bg-[var(--color-surface)]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {recent.length > 0 && !searching && (
          <div>
            <p className="mb-1.5 text-[12px] font-medium uppercase tracking-[0.08em] text-[var(--color-sub)]">
              {L.recent[locale] ?? L.recent.en}
            </p>
            <div className="no-scrollbar flex gap-1 overflow-x-auto pb-1">
              {recent.map((char) => (
                <button
                  key={char}
                  type="button"
                  title={NAME_BY_CHAR.get(char)}
                  aria-label={`${NAME_BY_CHAR.get(char) ?? char} — ${t.common.copy}`}
                  onClick={() => pick(char)}
                  className="flex h-10 w-10 flex-none items-center justify-center rounded-xl text-[20px] leading-none transition-transform hover:bg-[var(--color-surface)] active:scale-90"
                >
                  {char}
                </button>
              ))}
            </div>
          </div>
        )}

        <p aria-live="polite" className="h-5 text-[13px] text-[var(--color-good)]">
          {copied ? `${t.common.copied} ${copied}` : ""}
        </p>

        {searching && results!.length === 0 && (
          <p className="rounded-xl bg-[var(--color-surface)] px-3.5 py-3 text-[14px] text-[var(--color-sub)]">
            {(L.none[locale] ?? L.none.en)} · “{query.trim()}”
          </p>
        )}

        {results ? (
          <div className={gridClass}>{results.map(cell)}</div>
        ) : (
          <div className="space-y-5">
            {EMOJI_GROUPS.map((g) => (
              <section key={g.key}>
                <h3 className="mb-1.5 text-[13px] font-semibold text-[var(--color-sub)]">
                  {g.label[locale] ?? g.label.en}
                  <span className="ml-1.5 font-normal">{g.items.length}</span>
                </h3>
                <div className={gridClass}>{g.items.map(cell)}</div>
              </section>
            ))}
          </div>
        )}
      </div>
    </ToolPanel>
  );
}
