"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import {
  MAX_TEST_CHARS, regexRun, regexWorkerSource,
  workerFallbackAllowed,
  type RegexMatch, type RegexRunResult, type WorkerOutcome,
} from "@/tools/_lib/regex";

/**
 * 正则测试器:pattern + flags + 测试文本,实时高亮全部匹配并列出捕获组。
 *
 * 关键改动(竞品 regex101 对标 + ReDoS 实测):匹配放到 Blob Worker 里跑,
 * 主线程用 250ms 超时竞速 —— 灾难性回溯(实测 (a+)+ 对 27 个 a 需 ~1.3s,同步执行会冻结整个标签页)
 * 超时后 terminate worker 并提示用户,页面保持可交互。Worker 不可用时降级为同步 regexRun + 长度上限。
 */

type Match = RegexMatch;

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
  timeout: {
    en: "Match timed out — this pattern may backtrack catastrophically on this input. Try a simpler pattern or a shorter test string.",
    zh: "匹配超时——这个模式在该文本上可能发生灾难性回溯。请简化模式或缩短测试文本。",
    ja: "一致検索がタイムアウトしました——このパターンは入力に対して破滅的なバックトラックを起こす可能性があります。パターンを簡略化するか文字列を短くしてください。",
    es: "La búsqueda agotó el tiempo: este patrón puede tener retroceso catastrófico con esta entrada. Prueba un patrón más simple o una cadena más corta.",
    pt: "A correspondência expirou — este padrão pode ter backtracking catastrófico nesta entrada. Simplifique o padrão ou encurte o texto.",
  },
} as const;

const pick = (label: Record<string, string>, locale: string) => label[locale] ?? label.en;
const fillLocal = (tpl: string, n: number) => tpl.replace("{n}", String(n));

const WORKER_TIMEOUT_MS = 250;

/** 在 Worker 里跑一次匹配,区分超时 / 环境不可用 / 成功。 */
function runInWorker(pattern: string, flags: string, text: string): Promise<WorkerOutcome> {
  return new Promise((resolve) => {
    let worker: Worker;
    let blobUrl: string;
    try {
      const src = regexWorkerSource();
      blobUrl = URL.createObjectURL(new Blob([src], { type: "text/javascript" }));
      worker = new Worker(blobUrl);
    } catch {
      resolve({ kind: "unavailable" });
      return;
    }
    let done = false;
    const finish = (outcome: WorkerOutcome) => {
      if (done) return;
      done = true; clearTimeout(timer); worker.terminate();
      URL.revokeObjectURL(blobUrl); // worker 终止后再回收,避免有些浏览器加载未完成时脚本被抽走
      resolve(outcome);
    };
    const timer = setTimeout(() => finish({ kind: "timeout" }), WORKER_TIMEOUT_MS);
    worker.onmessage = (ev) => finish({ kind: "ok", result: ev.data as RegexRunResult });
    worker.onerror = () => finish({ kind: "unavailable" });
    worker.postMessage({ pattern, flags, text });
  });
}

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
  const [parsed, setParsed] = useState<RegexRunResult>({ matches: [], error: null, truncated: false });
  const [timeout, setTimeoutFlag] = useState(false);
  const seqRef = useRef(0);

  const flagStr = FLAGS.filter((x) => flags[x]).join("");

  useEffect(() => {
    const seq = ++seqRef.current;
    if (!pattern || !text) {
      setParsed({ matches: [], error: null, truncated: false });
      setTimeoutFlag(false);
      return;
    }
    const capped = text.length > MAX_TEST_CHARS ? text.slice(0, MAX_TEST_CHARS) : text;
    let cancelled = false;
    void (async () => {
      const outcome = await runInWorker(pattern, flagStr, capped);
      if (cancelled || seq !== seqRef.current) return;
      // 只有"环境不支持 Worker"才同步兜底;超时绝不降级(否则把冻结搬回主线程)
      if (outcome.kind === "ok") {
        setParsed(outcome.result);
        setTimeoutFlag(false);
      } else if (workerFallbackAllowed(outcome, capped.length)) {
        setParsed(regexRun(pattern, flagStr, capped));
        setTimeoutFlag(false);
      } else {
        setParsed({ matches: [], error: null, truncated: false });
        setTimeoutFlag(true);
      }
    })();
    return () => { cancelled = true; };
  }, [pattern, flagStr, text]);

  const segments = useMemo(() => {
    const out: { s: string; hit: boolean }[] = [];
    let cursor = 0;
    for (const m of parsed.matches) {
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
            maxLength={MAX_TEST_CHARS}
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

        {timeout ? (
          <p role="alert" className="rounded-xl error-bg px-3.5 py-2.5 text-[13.5px] leading-5 text-[var(--color-bad)]">
            {pick(L.timeout, locale)}
          </p>
        ) : parsed.error ? (
          <p role="alert" className="mono whitespace-pre-wrap rounded-xl error-bg px-3.5 py-2.5 text-[13.5px] leading-5 text-[var(--color-bad)]">
            {parsed.error}
          </p>
        ) : (
          <>
            <div className="whitespace-pre-wrap break-words rounded-xl border hairline bg-[var(--color-surface)] p-3 text-[14px] leading-6">
              {text === "" ? (
                <span className="text-[var(--color-sub)]">{pick(L.noMatch, locale)}</span>
              ) : (
                segments.map((seg, i) =>
                  seg.hit ? (
                    <mark key={i} className="rounded-[3px] bg-[rgba(0,113,227,0.25)] text-[var(--color-ink)]">
                      {seg.s}
                    </mark>
                  ) : <span key={i}>{seg.s}</span>,
                )
              )}
            </div>

            <p className="text-[13.5px] font-medium text-[var(--color-sub)]">
              {fillLocal(pick(L.matches, locale), parsed.matches.length)}
              {parsed.truncated && ` · ${fillLocal(pick(L.truncated, locale), 500)}`}
            </p>

            {parsed.matches.length > 0 && (
              <ul className="max-h-72 space-y-1.5 overflow-y-auto">
                {parsed.matches.map((m, i) => (
                  <li key={i} className="mono rounded-xl bg-[var(--color-surface)] px-3.5 py-2 text-[13px] leading-5">
                    <span className="font-semibold">{pick(L.match, locale)} #{i + 1}</span>{" "}
                    <span className="text-[var(--color-sub)]">{pick(L.at, locale)} {m.index}</span>
                    {" · "}{m.text === "" ? '""' : m.text}
                    {m.groups.map((g, gi) => (
                      <span key={gi} className="text-[var(--color-sub)]"> ${gi + 1} {g === undefined ? "—" : `"${g}"`}</span>
                    ))}
                    {m.named.map(([name, v]) => (
                      <span key={name} className="text-[var(--color-sub)]"> &lt;{name}&gt; &quot;{v}&quot;</span>
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
