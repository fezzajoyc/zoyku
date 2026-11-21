"use client";

import { useEffect, useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import { pick } from "./calc-ui";
import { countTextStats as countStats, computeTextInsights, checkPlatformLimits, sentenceSegments, sentenceBand, writingSuggestions, type SuggestionKey } from "../_lib/transforms";
import { fill } from "../_lib/types";


/** 词数/字符数/句数三个工具页共用,primary 决定首位强调指标。 */
export function TextStats({ primary }: { primary: "words" | "characters" | "sentences" }) {
  const { locale, t } = useI18n();
  const [input, setInput] = useState("");
  const [flowOn, setFlowOn] = useState(true);
  // R2:自愿开启的本地草稿自动保存(仅本浏览器;清空文本即清存储)
  const [autoSave, setAutoSave] = useState(false);
  const DRAFT_KEY = "wordcounter.draft";
  const AUTO_KEY = "wordcounter.autosave";

  useEffect(() => {
    // 挂载时:若用户此前开启过自动保存且留有草稿 → 恢复
    try {
      if (localStorage.getItem(AUTO_KEY) === "1") {
        setAutoSave(true);
        const draft = localStorage.getItem(DRAFT_KEY);
        if (draft) setInput(draft);
      }
    } catch {
      /* localStorage 不可用(隐私模式)= 自动保存静默禁用 */
    }
  }, []);

  useEffect(() => {
    if (!autoSave) return;
    try {
      if (input === "") localStorage.removeItem(DRAFT_KEY);
      else localStorage.setItem(DRAFT_KEY, input);
    } catch {
      /* 配额满/隐私模式:保存失败静默,不打断输入 */
    }
  }, [input, autoSave]);

  const toggleAutoSave = () => {
    setAutoSave((on) => {
      if (on) {
        // 关闭 = 立即清除已存草稿(可清除承诺)
        try {
          localStorage.removeItem(DRAFT_KEY);
          localStorage.removeItem(AUTO_KEY);
        } catch {
          /* noop */
        }
      } else {
        try {
          localStorage.setItem(AUTO_KEY, "1");
          if (input !== "") localStorage.setItem(DRAFT_KEY, input);
        } catch {
          /* noop */
        }
      }
      return !on;
    });
  };
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
            onClick={() => {
              setInput("");
              try {
                localStorage.removeItem(DRAFT_KEY);
              } catch {
                /* noop */
              }
            }}
            aria-label={t.common.clear}
            className="absolute right-3 top-3 inline-flex h-7 w-7 items-center justify-center rounded-full border hairline bg-[var(--color-card)] text-[13px] text-[var(--color-sub)] transition-colors hover:bg-[var(--color-surface)] hover:text-[var(--color-ink)]"
          >
            ×
          </button>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          aria-pressed={autoSave}
          onClick={toggleAutoSave}
          className={`rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
            autoSave
              ? "border-transparent bg-[var(--color-ink)] text-white dark:bg-white dark:text-[#1d1d1f]"
              : "hairline hover:bg-[var(--color-surface)]"
          }`}
        >
          {pick(locale, {
            en: "Auto-save draft locally", zh: "本地自动保存草稿", ja: "下書きをローカル自動保存", es: "Autoguardar borrador localmente", pt: "Salvamento automático local do rascunho",
            fr: "Sauvegarde locale du brouillon", de: "Entwurf lokal automatisch speichern", ru: "Автосохранение черновика локально", it: "Salvataggio automatico locale della bozza",
            tr: "Taslağı yerel olarak otomatik kaydet", ko: "초안 로컬 자동 저장", ar: "الحفظ التلقائي للمسودة محليًا", hi: "ड्राफ्ट स्थानीय रूप से ऑटो-सेव",
            id: "Simpan otomatis draf secara lokal", vi: "Tự động lưu bản nháp cục bộ",
          })}
        </button>
        <span className="text-[12.5px] leading-5 text-[var(--color-sub)]">
          {pick(locale, {
            en: "Opt-in: the draft is stored only in this browser and cleared with the text.",
            zh: "自愿开启:草稿只存于本浏览器,清空文本即同步清除。",
            ja: "オプトイン:下書きはこのブラウザにのみ保存され、テキスト消去と同時に消えます。",
            es: "Opcional: el borrador se guarda solo en este navegador y se borra con el texto.",
            pt: "Opcional: o rascunho fica só neste navegador e é apagado junto com o texto.",
            fr: "Sur activation : le brouillon reste dans ce navigateur et s'efface avec le texte.",
            de: "Opt-in: Der Entwurf bleibt nur in diesem Browser und wird mit dem Text gelöscht.",
            ru: "По включению: черновик хранится только в этом браузере и стирается вместе с текстом.",
            it: "Opt-in: la bozza resta solo in questo browser e si cancella con il testo.",
            tr: "İsteğe bağlı: taslak yalnızca bu tarayıcıda saklanır, metinle birlikte silinir.",
            ko: "옵트인: 초안은 이 브라우저에만 저장되며 텍스트 지우면 같이 지워집니다.",
            ar: "اختياري: تُحفظ المسودة في هذا المتصفح فقط وتُمسح مع النص.",
            hi: "ऑप्ट-इन: ड्राफ्ट केवल इसी ब्राउज़र में सहेजा जाता है, टेक्स्ट साफ़ करने पर हट जाता है।",
            id: "Opt-in: draf hanya disimpan di browser ini dan terhapus bersama teksnya.",
            vi: "Tùy chọn: bản nháp chỉ lưu trong trình duyệt này và xóa cùng văn bản.",
          })}
        </span>
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
      {primary === "sentences" && hasText && insights.sentenceWords.length >= 2 && insights.sentenceWords.length <= 60 && (
        <div className="mt-3 border-t hairline pt-3">
          <p className="text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">
            {t.text.stats.sentenceChart}
          </p>
          <div className="mt-2 flex h-16 items-end gap-[3px]" role="img" aria-label={t.text.stats.sentenceChart}>
            {insights.sentenceWords.map((w, i) => {
              const maxW = Math.max(...insights.sentenceWords);
              const h = maxW > 0 ? Math.max(8, Math.round((w / maxW) * 64)) : 8;
              const band = sentenceBand(w);
              const color = band === 3 ? "var(--color-bad)" : band === 2 ? "#b8860b" : "var(--color-good)";
              return (
                <span
                  key={i}
                  title={`${i + 1}: ${w}`}
                  className="w-full max-w-[18px] flex-none rounded-t-sm transition-all"
                  style={{ height: h, background: color }}
                />
              );
            })}
          </div>
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
