"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";

/**
 * 正则测试器:pattern + flags + 测试文本,实时高亮全部匹配并列出捕获组。
 * 带零宽匹配与循环保护(guard 上限)。
 */

type Match = { text: string; index: number; groups: (string | undefined)[]; named: [string, string][] };

const FLAGS = ["g", "i", "m", "s", "u"] as const;

const L = {
  flags: { en: "Flags", zh: "标志", ja: "フラグ", es: "Opciones", pt: "Opções" },
  pattern: { en: "Pattern", zh: "正则表达式", ja: "パターン", es: "Patrón", pt: "Padrão" },
  matches: {
    en: "{n} match(es)",
    zh: "{n} 处匹配",
    ja: "{n} 件の一致",
    es: "{n} coincidencia(s)",
    pt: "{n} correspondência(s)",
  },
  truncated: { en: "showing the first {n}", zh: "仅显示前 {n} 处", ja: "最初の {n} 件のみ表示", es: "mostrando las primeras {n}", pt: "mostrando as primeiras {n}" },
  testText: { en: "Test string", zh: "测试文本", ja: "テスト文字列", es: "Texto de prueba", pt: "Texto de teste" },
  noMatch: { en: "No matches yet.", zh: "暂无匹配。", ja: "一致はまだありません。", es: "Aún no hay coincidencias.", pt: "Ainda sem correspondências." },
  match: { en: "Match", zh: "匹配", ja: "一致", es: "Coincidencia", pt: "Correspondência" },
  at: { en: "index", zh: "位置", ja: "位置", es: "índice", pt: "índice" },
};

const pick = (label: Record<string, string>, locale: string) => label[locale] ?? label.en;
const fillLocal = (tpl: string, n: number) => tpl.replace("{n}", String(n));

const MAX_RENDER = 500;

export function DevRegexEngine({
  defaultPattern = "",
  sample = "",
}: {
  defaultPattern?: string;
  sample?: string;
}) {
  const { locale, t } = useI18n();
  const [pattern, setPattern] = useState(defaultPattern);
  const [flags, setFlags] = useState<Record<string, boolean>>({ g: true, i: false, m: false, s: false, u: false });
  const [text, setText] = useState("");

  const parsed = useMemo(() => {
    if (!pattern) return { error: null as string | null, matches: [] as Match[] };
    try {
      const f = FLAGS.filter((x) => flags[x]).join("");
      const re = new RegExp(pattern, f);
      const matches: Match[] = [];
      let guard = 0;
      while (guard++ < 10000) {
        const m = re.exec(text);
        if (!m) break;
        matches.push({
          text: m[0],
          index: m.index,
          groups: m.slice(1),
          named: m.groups ? Object.entries(m.groups).filter(([, v]) => v !== undefined) : [],
        });
        if (m[0] === "") {
          re.lastIndex++;
          if (re.lastIndex > text.length) break;
        }
        if (matches.length >= MAX_RENDER) break;
      }
      return { error: null as string | null, matches };
    } catch (e) {
      return { error: e instanceof Error ? e.message : String(e), matches: [] as Match[] };
    }
  }, [pattern, flags, text]);

  const segments = useMemo(() => {
    const out: { s: string; hit: boolean }[] = [];
    let cursor = 0;
    for (const m of parsed.matches.slice(0, MAX_RENDER)) {
      if (m.index > cursor) out.push({ s: text.slice(cursor, m.index), hit: false });
      if (m.text) out.push({ s: m.text, hit: true });
      cursor = m.text === "" ? m.index + 1 : m.index + m.text.length;
    }
    if (cursor < text.length) out.push({ s: text.slice(cursor), hit: false });
    return out;
  }, [parsed.matches, text]);

  return (
    <ToolPanel>
      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-[13px] font-semibold">{pick(L.pattern, locale)}</label>
          <input
            type="text"
            className="field mono"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder="([\\w.+-]+)@([\\w-]+\\.)+[\\w-]{2,}"
            spellCheck={false}
            aria-label={pick(L.pattern, locale)}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[13px] font-semibold">{pick(L.flags, locale)}</span>
          {FLAGS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFlags((s) => ({ ...s, [f]: !s[f] }))}
              aria-pressed={flags[f]}
              className={`mono h-8 w-9 rounded-lg border text-[14px] font-semibold transition-colors ${
                flags[f]
                  ? "border-transparent bg-[var(--color-ink)] text-white dark:bg-white dark:text-[#1d1d1f]"
                  : "hairline hover:bg-[var(--color-surface)]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div>
          <label className="mb-1 block text-[13px] font-semibold">{pick(L.testText, locale)}</label>
          <textarea
            className="field mono"
            rows={5}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t.common.input}
            spellCheck={false}
            aria-label={pick(L.testText, locale)}
          />
          {sample && text === "" && (
            <button
              type="button"
              onClick={() => setText(sample)}
              className="mt-2 rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium text-[var(--color-accent-strong)] transition-colors hover:bg-[rgba(0,113,227,0.06)]"
            >
              {t.common.sample}
            </button>
          )}
        </div>

        {parsed.error ? (
          <p
            className="mono whitespace-pre-wrap rounded-xl error-bg px-3.5 py-2.5 text-[13.5px] leading-5 text-[var(--color-bad)]"
            role="alert"
          >
            {parsed.error}
          </p>
        ) : (
          <>
            <div className="whitespace-pre-wrap break-words rounded-xl border hairline bg-[var(--color-surface)] p-3 text-[14px] leading-6">
              {text === "" ? (
                <span className="text-[#a1a1a6]">{pick(L.noMatch, locale)}</span>
              ) : (
                segments.map((seg, i) =>
                  seg.hit ? (
                    <mark
                      key={i}
                      className="rounded-[3px] bg-[rgba(0,113,227,0.25)] text-[var(--color-ink)]"
                    >
                      {seg.s}
                    </mark>
                  ) : (
                    <span key={i}>{seg.s}</span>
                  ),
                )
              )}
            </div>

            <p className="text-[13.5px] font-medium text-[var(--color-sub)]">
              {fillLocal(pick(L.matches, locale), parsed.matches.length)}
              {parsed.matches.length >= MAX_RENDER && ` · ${fillLocal(pick(L.truncated, locale), MAX_RENDER)}`}
            </p>

            {parsed.matches.length > 0 && (
              <ul className="max-h-72 space-y-1.5 overflow-y-auto">
                {parsed.matches.map((m, i) => (
                  <li key={i} className="mono rounded-xl bg-[var(--color-surface)] px-3.5 py-2 text-[13px] leading-5">
                    <span className="font-semibold">
                      {pick(L.match, locale)} #{i + 1}
                    </span>{" "}
                    <span className="text-[var(--color-sub)]">
                      {pick(L.at, locale)} {m.index}
                    </span>
                    {" · "}
                    {m.text === "" ? '""' : m.text}
                    {m.groups.map((g, gi) => (
                      <span key={gi} className="text-[var(--color-sub)]">
                        {" "}
                        ${gi + 1} {g === undefined ? "—" : `"${g}"`}
                      </span>
                    ))}
                    {m.named.map(([name, v]) => (
                      <span key={name} className="text-[var(--color-sub)]">
                        {" "}
                        &lt;{name}&gt; "{v}"
                      </span>
                    ))}
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </ToolPanel>
  );
}
