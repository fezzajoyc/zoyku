"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import { countTextStats as countStats, computeTextInsights, checkPlatformLimits, sentenceSegments, sentenceBand, writingSuggestions, type SuggestionKey } from "../_lib/transforms";
import { fill } from "../_lib/types";


/** 词数/字符数/句数三个工具页共用,primary 决定首位强调指标。 */
export function TextStats({ primary }: { primary: "words" | "characters" | "sentences" }) {
  const { t } = useI18n();
  const [input, setInput] = useState("");
  const [flowOn, setFlowOn] = useState(true);
  const stats = useMemo(() => countStats(input), [input]);
  const insights = useMemo(() => computeTextInsights(input, stats), [input, stats]);
  // 平台限制校验:character 视角(character-counter)才显示,词数视角不掺和
  const platformLimits = useMemo(
    () => (primary === "characters" && input !== "" ? checkPlatformLimits(input, stats.characters) : []),
    [primary, input, stats.characters],
  );
  const hasText = input.trim() !== "";
  const tips = useMemo(
    () =>
      hasText
        ? writingSuggestions({
            longestSentenceWords: insights.longestSentenceWords,
            readingGrade: insights.readingGrade,
            words: stats.words,
            paragraphs: stats.paragraphs,
          })
        : ([] as SuggestionKey[]),
    [hasText, insights.longestSentenceWords, insights.readingGrade, stats.words, stats.paragraphs],
  );

  // 阅读时长:拉丁词 220 wpm + CJK 逐字 300 cpm,分开算——
  // 旧公式 (words + characters*0.3)/220 把字符又乘了一遍,纯英文 220 词会被算成 2.6 分钟。
  const minutes = Math.max(
    1,
    Math.round((stats.words - stats.cjkChars) / 220 + stats.cjkChars / 300),
  );
  const defs: { key: keyof typeof stats; label: string; value: number }[] = [
    { key: "words", label: t.text.stats.words, value: stats.words },
    { key: "characters", label: t.text.stats.characters, value: stats.characters },
    { key: "charsNoSpaces", label: t.text.stats.charsNoSpaces, value: stats.charsNoSpaces },
    { key: "sentences", label: t.text.stats.sentences, value: stats.sentences },
    { key: "paragraphs", label: t.text.stats.paragraphs, value: stats.paragraphs },
    { key: "lines", label: t.text.stats.lines, value: stats.lines },
  ];
  const cells = [defs.find((d) => d.key === primary)!, ...defs.filter((d) => d.key !== primary)];

  // 第二/三行洞察指标(wordcounter.net DETAILS 对标,全部本地计算)
  const insightCells = [
    { label: t.text.stats.uniqueWords, value: insights.uniqueWords },
    { label: t.text.stats.avgWordLen, value: insights.avgWordLen },
    { label: t.text.stats.pages, value: insights.pages },
  ];
  const writingCells = [
    { label: t.text.stats.avgSentence, value: insights.avgSentenceWords },
    { label: t.text.stats.longestSentence, value: insights.longestSentenceWords },
    { label: t.text.stats.readingLevel, value: insights.readingGrade },
  ];

  return (
    <ToolPanel>
      <div className="relative">
        {flowOn && hasText && input.length <= 20000 && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 overflow-hidden whitespace-pre-wrap break-words rounded-xl border border-transparent px-3.5 py-2.5 text-[15px] leading-6 text-transparent"
          >
            {sentenceSegments(input).map((seg, i) =>
              seg.band === -1 ? (
                <span key={i}>{seg.text}</span>
              ) : (
                <mark key={i} className={`rounded px-0.5 flow-band-${seg.band}`}>
                  {seg.text}
                </mark>
              ),
            )}
          </div>
        )}
        <textarea
          className="field relative bg-transparent"
          rows={10}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t.common.input}
          aria-label={t.common.input}
          onScroll={(e) => {
            const backdrop = (e.target as HTMLTextAreaElement).previousElementSibling as HTMLElement | null;
            if (backdrop) backdrop.scrollTop = (e.target as HTMLTextAreaElement).scrollTop;
          }}
        />
        {input !== "" && (
          <button
            type="button"
            onClick={() => setInput("")}
            aria-label={t.common.clear}
            className="absolute right-3 top-3 inline-flex h-7 w-7 items-center justify-center rounded-full border hairline bg-[var(--color-card)] text-[13px] text-[var(--color-sub)] transition-colors hover:bg-[var(--color-surface)] hover:text-[var(--color-ink)]"
          >
            ×
          </button>
        )}
      </div>
      {!hasText && (
        <p className="mt-3 text-center text-[13px] text-[var(--color-sub)]">
          {t.text.stats.emptyHint}
        </p>
      )}
      {hasText && input.length <= 20000 && (
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-[var(--color-sub)]">
          <button
            type="button"
            onClick={() => setFlowOn((v) => !v)}
            aria-pressed={flowOn}
            className={`rounded-full border px-2.5 py-0.5 font-medium transition-colors ${
              flowOn
                ? "border-transparent bg-[var(--color-ink)] text-white dark:bg-white dark:text-[#1d1d1f]"
                : "hairline hover:bg-[var(--color-surface)]"
            }`}
          >
            {t.text.stats.flowTitle}
          </button>
          {flowOn &&
            ([0, 1, 2, 3] as const).map((b) => (
              <span key={b} className="inline-flex items-center gap-1">
                <span aria-hidden className={`inline-block h-2.5 w-2.5 rounded-sm flow-band-${b}`} />
                {t.text.stats.flowBands[b]}
              </span>
            ))}
        </div>
      )}
      <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
        {cells.map((c, i) => (
          <div
            key={c.label}
            className={`rounded-xl border hairline px-4 py-3 ${i === 0 ? "bg-[rgba(0,113,227,0.05)]" : ""}`}
          >
            <p className="mono text-xl font-semibold tabular-nums">{c.value}</p>
            <p className="mt-0.5 text-[13px] text-[var(--color-sub)]">{c.label}</p>
          </div>
        ))}
      </div>
      {hasText && (
        <div className="mt-2.5 grid grid-cols-3 gap-2.5">
          {insightCells.map((c) => (
            <div key={c.label} className="rounded-xl px-4 py-2.5">
              <p className="mono text-[15px] font-semibold tabular-nums text-[var(--color-ink)]">{c.value}</p>
              <p className="mt-0.5 text-[12.5px] text-[var(--color-sub)]">{c.label}</p>
            </div>
          ))}
          {writingCells.map((c) => (
            <div key={c.label} className="rounded-xl px-4 py-2.5">
              <p className="mono text-[15px] font-semibold tabular-nums text-[var(--color-ink)]">{c.value}</p>
              <p className="mt-0.5 text-[12.5px] text-[var(--color-sub)]">{c.label}</p>
            </div>
          ))}
        </div>
      )}
      {hasText && (
        <div className="mt-1 flex flex-wrap items-baseline gap-x-6 gap-y-1 text-[13px] text-[var(--color-sub)]">
          <span>
            {t.text.stats.readingTime}: {fill(t.text.stats.readingMinutes, { n: minutes })}
          </span>
          <span>
            {t.text.stats.speakingTime}: {fill(t.text.stats.readingMinutes, { n: insights.speakingMinutes })}
          </span>
        </div>
      )}
      {hasText && tips.length > 0 && (
        <div className="mt-3 border-t hairline pt-3">
          <ul className="space-y-1.5">
            {tips.map((k) => (
              <li key={k} className="flex gap-2 text-[13.5px] leading-6 text-[var(--color-sub)]">
                <span
                  aria-hidden
                  className={`mt-2 h-1.5 w-1.5 flex-none rounded-full ${k === "flowGood" ? "bg-[var(--color-good)]" : "bg-[var(--color-accent)]"}`}
                />
                {t.text.stats.flowTips[k]}
              </li>
            ))}
          </ul>
        </div>
      )}
      {hasText && insights.topKeywords.length > 0 && (
        <div className="mt-3 border-t hairline pt-3">
          <p className="text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">
            {t.text.stats.keywordsTitle}
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {insights.topKeywords.map((k) => (
              <span
                key={k.word}
                className="inline-flex items-baseline gap-1.5 rounded-lg border hairline bg-[var(--color-surface)] px-2.5 py-1 text-[12.5px]"
              >
                <span className="font-medium text-[var(--color-ink)]">{k.word}</span>
                <span className="tabular-nums text-[var(--color-sub)]">
                  {fill(t.text.stats.keywordCount, { count: k.count, pct: k.pct })}
                </span>
              </span>
            ))}
          </div>
          {platformLimits.some((p) => !p.ok) && (
            <p className="mt-2 text-[12.5px] leading-5 text-[var(--color-sub)]">
              {t.text.stats.trimHint}
            </p>
          )}
        </div>
      )}
      {platformLimits.length > 0 && (
        <div className="mt-3 border-t hairline pt-3">
          <p className="text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">
            {t.text.stats.limitsTitle}
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {platformLimits.map((p) => (
              <span
                key={p.name}
                className={`inline-flex flex-col gap-1 rounded-lg border px-2.5 py-1 text-[12.5px] ${
                  p.ok
                    ? "border-[var(--color-good)]/30 bg-[rgba(52,199,89,0.08)]"
                    : "border-[var(--color-bad)]/30 bg-[rgba(255,59,48,0.08)]"
                }`}
              >
                <span className="inline-flex items-baseline gap-1.5">
                  <span className={`font-medium ${p.ok ? "text-[var(--color-good)]" : "text-[var(--color-bad)]"}`}>
                    {p.name}
                  </span>
                  <span className="tabular-nums text-[var(--color-sub)]">
                    {p.ok
                      ? fill(t.text.stats.charsLeft, { n: p.limit - p.used })
                      : fill(t.text.stats.charsOver, { n: p.used - p.limit })}
                  </span>
                </span>
                <span aria-hidden className="block h-[3px] w-full overflow-hidden rounded-full bg-[var(--color-hairline)]">
                  <span
                    className="block h-full rounded-full transition-all"
                    style={{
                      width: `${Math.round(p.pct * 100)}%`,
                      background: p.pct >= 1 ? "var(--color-bad)" : p.pct >= 0.85 ? "#b8860b" : "var(--color-good)",
                    }}
                  />
                </span>
              </span>
            ))}
          </div>
        </div>
      )}
    </ToolPanel>
  );
}
