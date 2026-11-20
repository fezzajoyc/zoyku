"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import { RMB_UPPERCASE_MESSAGES } from "../_lib/rmb-uppercase-copy";
import { convertRmbUppercase, RMB_UPPERCASE_SOURCE, type RmbUppercaseError, type RmbUppercaseResult } from "../_lib/rmb-uppercase";

const secondary = "inline-flex min-h-11 items-center justify-center rounded-full border hairline px-4 py-2 text-sm font-medium transition-colors hover:bg-[var(--color-surface)]";

export function RmbUppercaseEngine() {
  const { locale } = useI18n();
  const l = RMB_UPPERCASE_MESSAGES[locale];
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const revision = useRef(0);
  const [input, setInput] = useState("");
  const [result, setResult] = useState<Extract<RmbUppercaseResult, { ok: true }> | null>(null);
  const [error, setError] = useState<RmbUppercaseError | null>(null);
  const [notice, setNotice] = useState("");

  const resetResult = () => { revision.current++; setResult(null); setError(null); setNotice(""); };
  const clear = () => { setInput(""); resetResult(); inputRef.current?.focus(); };
  const run = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    revision.current++; setNotice("");
    const converted = convertRmbUppercase(input);
    if (converted.ok) { setResult(converted); setError(null); }
    else { setResult(null); setError(converted.error); inputRef.current?.focus(); }
  };
  const displayedText = result ? `${l.normalizedLabel}: ￥${result.normalizedAmount}\n${l.uppercaseLabel}: ${result.uppercase}` : "";
  const copy = async () => {
    const current = revision.current;
    try {
      await navigator.clipboard.writeText(displayedText);
      if (current === revision.current) setNotice(l.copied);
    } catch {
      if (current === revision.current) setNotice(l.copyFailed);
    }
  };
  const download = () => {
    try {
      const url = URL.createObjectURL(new Blob([displayedText + "\n"], { type: "text/plain;charset=utf-8" }));
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      const anchor = document.createElement("a");
      anchor.href = url; anchor.download = "rmb-uppercase.txt"; anchor.click();
      setNotice(l.downloaded);
    } catch { setNotice(l.downloadFailed); }
  };

  return <ToolPanel><div data-rmb-uppercase-tool className="space-y-5">
    <div className="space-y-2 text-sm leading-6 text-[var(--color-sub)]">
      <p>{l.limitNote}</p><p>{l.styleNote}</p><p>{l.sourceDetail}</p><p>{l.localNote}</p>
      <a href={RMB_UPPERCASE_SOURCE.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-[var(--color-accent-text)] underline underline-offset-4">{l.sourceLabel}</a>
    </div>
    <form onSubmit={run} noValidate className="space-y-4">
      <div>
        <label htmlFor={`${id}-amount`} className="mb-1.5 block text-sm font-medium">{l.amountLabel}</label>
        <input ref={inputRef} id={`${id}-amount`} type="text" inputMode="decimal" className="field mono min-h-11 w-full" value={input} placeholder="0.00"
          autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck={false}
          aria-invalid={Boolean(error)} aria-describedby={`${id}-hint${error ? ` ${id}-error` : ""}`}
          onChange={(event) => { setInput(event.target.value); resetResult(); }} />
        <p id={`${id}-hint`} className="mt-1 text-sm leading-6 text-[var(--color-sub)]">{l.inputHint}</p>
        {error && <p id={`${id}-error`} role="alert" className="mt-2 text-sm leading-6 text-[var(--color-bad)]">{l.errors[error]}</p>}
      </div>
      <div className="flex flex-wrap gap-2.5">
        <button type="submit" className="inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--color-action-bg)] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--color-action-hover)]">{l.convert}</button>
        <button type="button" className={secondary} onClick={clear}>{l.clear}</button>
      </div>
    </form>
    <p role="status" aria-live="polite" aria-atomic="true" className="text-sm font-medium">{notice || (result ? l.ready : l.empty)}</p>
    {result && <section aria-labelledby={`${id}-result`} className="space-y-4">
      <h2 id={`${id}-result`} className="text-base font-semibold">{l.resultTitle}</h2>
      <div><p id={`${id}-normalized-label`} className="mb-1 text-sm font-medium">{l.normalizedLabel}</p>
        <output aria-labelledby={`${id}-normalized-label`} data-testid="rmb-normalized-output" dir="ltr" className="mono block break-all text-lg font-medium">￥{result.normalizedAmount}</output>
      </div>
      <div><label htmlFor={`${id}-uppercase`} className="mb-1.5 block text-sm font-medium">{l.uppercaseLabel}</label>
        <textarea id={`${id}-uppercase`} data-testid="rmb-uppercase-output" readOnly value={result.uppercase} rows={3} dir="ltr" lang="zh-Hans" className="field w-full resize-y leading-7" />
      </div>
      <div className="flex flex-wrap gap-2.5"><button type="button" className={secondary} onClick={copy}>{l.copy}</button>
        <button type="button" className={secondary} onClick={download}>{l.download}</button></div>
    </section>}
  </div></ToolPanel>;
}
