"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import { fill } from "../_lib/types";
import { SOCIAL_CREDIT_MESSAGES } from "../_lib/social-credit-copy";
import {
  SOCIAL_CREDIT_STANDARD_URL, SOCIAL_CREDIT_STANDARD_INFO_URL, maskSocialCredit, validateSocialCreditBatch,
  type SocialCreditError,
} from "../_lib/social-credit";

type Rows = ReturnType<typeof validateSocialCreditBatch>["results"];
const button = "inline-flex min-h-11 items-center justify-center rounded-full border hairline px-4 py-2 text-sm font-medium transition-colors hover:bg-[var(--color-surface)]";

export function SocialCreditEngine() {
  const { locale } = useI18n();
  const l = SOCIAL_CREDIT_MESSAGES[locale];
  const id = useId();
  const revision = useRef(0);
  const [input, setInput] = useState("");
  const [rows, setRows] = useState<Rows>([]);
  const [error, setError] = useState<SocialCreditError | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [notice, setNotice] = useState("");
  const resetResults = () => { revision.current++; setRows([]); setError(null); setRevealed(false); setNotice(""); };
  const run = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    revision.current++;
    const result = validateSocialCreditBatch(input);
    setRows(result.results); setError(result.error); setRevealed(false); setNotice("");
  };
  const display = (value: string) => revealed ? value : maskSocialCredit(value);
  const displayedText = rows.map(row => `${l.line} ${row.lineNumber}: ${display(row.normalized) || "—"} — ${row.valid ? l.valid : row.errors.map(key => l.errors[key]).join(" ")}`).join("\n");
  const valid = rows.filter(row => row.valid).length;
  const summary = rows.length ? fill(l.summary, { total: rows.length, valid, invalid: rows.length - valid }) : l.empty;
  const copy = async () => {
    const current = ++revision.current;
    setNotice("");
    try {
      await navigator.clipboard.writeText(displayedText);
      if (current === revision.current) setNotice(l.copied);
    } catch {
      if (current === revision.current) setNotice(l.copyFailed);
    }
  };
  const download = () => {
    revision.current++;
    try {
      const url = URL.createObjectURL(new Blob([displayedText + "\n"], { type: "text/plain;charset=utf-8" }));
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      const link = document.createElement("a");
      link.href = url; link.download = "social-credit-validation.txt"; link.click();
      setNotice(l.downloaded);
    } catch { setNotice(l.downloadFailed); }
  };

  return <ToolPanel><div className="space-y-5" data-social-credit-tool>
    <div className="space-y-2 text-sm leading-6 text-[var(--color-sub)]">
      <p>{l.normalizationNote}</p><p>{l.limitNote}</p><p>{l.localNote}</p>
      <div className="flex flex-col items-start gap-1">
        <a href={SOCIAL_CREDIT_STANDARD_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-[var(--color-accent)] underline underline-offset-4">{l.source}</a>
        <a href={SOCIAL_CREDIT_STANDARD_INFO_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-[var(--color-accent)] underline underline-offset-4">{l.standardInfo}</a>
      </div>
    </div>
    <form onSubmit={run} noValidate className="space-y-4">
      <div>
        <label htmlFor={`${id}-input`} className="mb-1.5 block text-sm font-medium">{l.input}</label>
        <textarea id={`${id}-input`} className="field mono min-h-11 w-full" dir="ltr" rows={5} value={input}
          spellCheck={false} autoComplete="off" autoCorrect="off" autoCapitalize="off"
          aria-invalid={error !== null} aria-describedby={`${id}-hint${error ? ` ${id}-error` : ""}`}
          onChange={event => { setInput(event.target.value); resetResults(); }} />
        <p id={`${id}-hint`} className="mt-1 text-sm leading-6 text-[var(--color-sub)]">{l.inputHint}</p>
      </div>
      <div className="flex flex-wrap gap-2.5">
        <button type="submit" className="inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--color-accent-strong)] px-5 py-2.5 text-sm font-medium text-white transition-[filter] hover:brightness-95">{l.validate}</button>
        <button type="button" className={button} onClick={() => { setInput(""); resetResults(); }}>{l.clear}</button>
      </div>
    </form>
    {error && <div id={`${id}-error`} role="alert" className="rounded-xl border border-[var(--color-hairline)] p-4 text-sm leading-6 text-[var(--color-bad)]">{l.errors[error]}</div>}
    <p role="status" aria-live="polite" aria-atomic="true" className="text-sm font-medium">{notice || summary}</p>
    {rows.length > 0 && <section aria-label={l.validate} className="space-y-4">
      <p className="text-sm leading-6 text-[var(--color-sub)]">{l.maskedNote}</p>
      <div className="flex flex-wrap gap-2.5">
        <button type="button" className={button} aria-pressed={revealed} onClick={() => { revision.current++; setRevealed(!revealed); setNotice(""); }}>{revealed ? l.hide : l.reveal}</button>
        <button type="button" className={button} onClick={copy}>{l.copy}</button>
        <button type="button" className={button} onClick={download}>{l.download}</button>
      </div>
      <ol className="space-y-3">{rows.map(row => <li key={row.lineNumber} className="rounded-xl border border-[var(--color-hairline)] p-4 text-sm leading-6">
        <p className="font-medium">{l.line} {row.lineNumber} · {row.valid ? l.valid : l.invalid}</p>
        <p><bdi dir="ltr" className="mono break-all" data-testid="social-credit-number">{display(row.normalized) || "—"}</bdi></p>
        {row.normalizationApplied && <p className="mt-1 text-[var(--color-sub)]">{l.normalized}</p>}
        {row.errors.length > 0 && <ul className="list-inside list-disc text-[var(--color-bad)]">{row.errors.map(key => <li key={key}>{l.errors[key]}</li>)}</ul>}
        {revealed && row.parsed && <dl className="mt-3 grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-x-3 gap-y-1 break-words">
          <dt>{l.department}</dt><dd><bdi dir="ltr">{row.parsed.registrationDepartment}</bdi></dd>
          <dt>{l.category}</dt><dd><bdi dir="ltr">{row.parsed.organizationCategory}</bdi></dd>
          <dt>{l.address}</dt><dd><bdi dir="ltr">{row.parsed.addressCode}</bdi></dd>
          <dt>{l.subject}</dt><dd><bdi dir="ltr">{row.parsed.subjectIdentifier}</bdi></dd>
          <dt>{l.checkCharacter}</dt><dd><bdi dir="ltr">{row.parsed.checkCharacter}</bdi></dd>
        </dl>}
      </li>)}</ol>
    </section>}
  </div></ToolPanel>;
}
