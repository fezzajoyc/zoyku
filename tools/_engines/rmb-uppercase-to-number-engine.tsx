"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import { RMB_UPPERCASE_MESSAGES } from "../_lib/rmb-uppercase-copy";
import { RMB_UPPERCASE_SOURCE } from "../_lib/rmb-uppercase";
import { RMB_REVERSE_READY, RMB_UPPERCASE_TO_NUMBER_MESSAGES, rmbUppercaseParseError } from "../_lib/rmb-uppercase-to-number-copy";
import { parseRmbUppercase, type RmbUppercaseParseError, type RmbUppercaseParseResult } from "../_lib/rmb-uppercase-to-number";

const secondary = "inline-flex min-h-11 items-center justify-center rounded-full border hairline px-4 py-2 text-sm font-medium transition-colors hover:bg-[var(--color-surface)]";
const example = "人民币陆仟零柒元壹角肆分";

export function RmbUppercaseToNumberEngine() {
  const { locale } = useI18n();
  const copy = RMB_UPPERCASE_TO_NUMBER_MESSAGES[locale];
  const common = RMB_UPPERCASE_MESSAGES[locale];
  const id = useId();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const revision = useRef(0);
  const [input, setInput] = useState("");
  const [result, setResult] = useState<Extract<RmbUppercaseParseResult, { ok: true }> | null>(null);
  const [error, setError] = useState<RmbUppercaseParseError | null>(null);
  const [notice, setNotice] = useState("");

  function resetResult() {
    revision.current++;
    setResult(null);
    setError(null);
    setNotice("");
  }

  function clear() {
    setInput("");
    resetResult();
    inputRef.current?.focus();
  }

  function convert(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    revision.current++;
    setNotice("");
    const parsed = parseRmbUppercase(input);
    if (parsed.ok) {
      setResult(parsed);
      setError(null);
    } else {
      setResult(null);
      setError(parsed.error);
      inputRef.current?.focus();
    }
  }

  const decimal = result ? `￥${result.normalizedAmount}` : "";
  const displayedText = result
    ? [`${common.normalizedLabel}: ${decimal}`, `${copy.minor}: ${result.minorUnits}`, `${copy.canonical}: ${result.canonicalUppercase}`].join("\n")
    : "";

  async function copyResult() {
    const current = ++revision.current;
    setNotice("");
    try {
      await navigator.clipboard.writeText(displayedText);
      if (current === revision.current) setNotice(common.copied);
    } catch {
      if (current === revision.current) setNotice(common.copyFailed);
    }
  }

  function downloadResult() {
    revision.current++;
    try {
      const url = URL.createObjectURL(new Blob([displayedText + "\n"], { type: "text/plain;charset=utf-8" }));
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "rmb-uppercase-to-number.txt";
      anchor.click();
      setNotice(common.downloaded);
    } catch {
      setNotice(common.downloadFailed);
    }
  }

  return (
    <ToolPanel>
      <div data-rmb-uppercase-to-number-tool className="space-y-5">
        <div className="space-y-2 text-sm leading-6 text-[var(--color-sub)]">
          <p>{copy.scope}</p>
          <p>{common.localNote}</p>
        </div>
        <form onSubmit={convert} noValidate className="space-y-4">
          <div>
            <label htmlFor={`${id}-amount`} className="mb-1.5 block text-sm font-medium">{copy.input}</label>
            <textarea
              ref={inputRef}
              id={`${id}-amount`}
              value={input}
              rows={2}
              dir="ltr"
              lang="zh-Hans"
              placeholder={example}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              aria-invalid={Boolean(error)}
              aria-describedby={`${id}-grammar ${id}-normalize${error ? ` ${id}-error` : ""}`}
              onChange={(event) => {
                setInput(event.target.value);
                resetResult();
              }}
              className="field min-h-11 w-full resize-y leading-7"
            />
            <div className="mt-1 space-y-1 text-sm leading-6 text-[var(--color-sub)]">
              <p id={`${id}-grammar`}>{copy.grammar}</p>
              <p id={`${id}-normalize`}>{copy.normalize}</p>
              <a href={RMB_UPPERCASE_SOURCE.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-[var(--color-accent-text)] underline underline-offset-4">{common.sourceLabel}</a>
            </div>
            {error && <p id={`${id}-error`} role="alert" className="mt-2 text-sm leading-6 text-[var(--color-bad)]">{rmbUppercaseParseError(locale, error)}</p>}
          </div>
          <div className="flex flex-wrap gap-2.5">
            <button type="submit" className="inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--color-action-bg)] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--color-action-hover)]">{common.convert}</button>
            <button type="button" className={secondary} onClick={clear}>{common.clear}</button>
          </div>
        </form>
        <p role="status" aria-atomic="true" className="text-sm font-medium">{notice || (result ? RMB_REVERSE_READY[locale] : error ? "" : common.empty)}</p>
        {result && (
          <section aria-labelledby={`${id}-result`} className="space-y-4">
            <h2 id={`${id}-result`} className="text-base font-semibold">{common.resultTitle}</h2>
            <dl className="grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="mb-1 text-sm font-medium">{common.normalizedLabel}</dt>
                <dd data-testid="rmb-reverse-decimal" className="mono break-all text-lg font-medium"><bdi dir="ltr">{decimal}</bdi></dd>
              </div>
              <div>
                <dt className="mb-1 text-sm font-medium">{copy.minor}</dt>
                <dd data-testid="rmb-reverse-fen" className="mono break-all text-lg font-medium"><bdi dir="ltr">{result.minorUnits}</bdi></dd>
              </div>
            </dl>
            <div>
              <label htmlFor={`${id}-canonical`} className="mb-1.5 block text-sm font-medium">{copy.canonical}</label>
              <textarea id={`${id}-canonical`} data-testid="rmb-reverse-canonical" readOnly value={result.canonicalUppercase} rows={2} dir="ltr" lang="zh-Hans" className="field w-full resize-y leading-7" />
            </div>
            {result.normalizationApplied && <p className="text-sm text-[var(--color-sub)]">{copy.applied}</p>}
            <div className="flex flex-wrap gap-2.5">
              <button type="button" className={secondary} onClick={copyResult}>{common.copy}</button>
              <button type="button" className={secondary} onClick={downloadResult}>{common.download}</button>
            </div>
          </section>
        )}
      </div>
    </ToolPanel>
  );
}
