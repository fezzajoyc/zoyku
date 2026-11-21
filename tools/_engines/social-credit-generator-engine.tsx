"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import { SOCIAL_CREDIT_ALPHABET, SOCIAL_CREDIT_STANDARD_URL } from "../_lib/social-credit";
import {
  generateSocialCreditSamples, getSocialCreditSampleDisplay, ORGANIZATION_CODE_STANDARD_URL,
  type SocialCreditGenerationResult, type SocialCreditGeneratorField,
} from "../_lib/social-credit-generator";
import { SOCIAL_CREDIT_GENERATOR_MESSAGES } from "../_lib/social-credit-generator-copy";
import { fill } from "../_lib/types";

const initial = { department: "", category: "", addressCode: "", startBody: "", count: "10" };
const fields = [
  { key: "department", example: "9", keyboard: "text" },
  { key: "category", example: "1", keyboard: "text" },
  { key: "addressCode", example: "350100", keyboard: "numeric" },
  { key: "startBody", example: "M000100Y", keyboard: "text" },
  { key: "count", example: "1–100", keyboard: "numeric" },
] as const;
const secondary = "inline-flex min-h-11 items-center justify-center rounded-full border hairline px-4 py-2 text-sm font-medium transition-colors hover:bg-[var(--color-surface)]";
const sourceLink = "inline-flex min-h-11 items-center text-[var(--color-accent-text)] underline underline-offset-4";

export function SocialCreditGeneratorEngine() {
  const { locale } = useI18n();
  const l = SOCIAL_CREDIT_GENERATOR_MESSAGES[locale];
  const id = useId();
  const inputs = useRef<Partial<Record<SocialCreditGeneratorField, HTMLInputElement | null>>>({});
  const revision = useRef(0);
  const [values, setValues] = useState(initial);
  const [result, setResult] = useState<SocialCreditGenerationResult | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [notice, setNotice] = useState("");

  function resetDisplay() {
    revision.current++;
    setResult(null);
    setRevealed(false);
    setNotice("");
  }

  function generate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    resetDisplay();
    const generated = generateSocialCreditSamples(values);
    setResult(generated);
    const invalid = fields.find(({ key }) => generated.fieldErrors[key]);
    if (invalid) {
      const current = revision.current;
      requestAnimationFrame(() => {
        if (current === revision.current) inputs.current[invalid.key]?.focus();
      });
    }
  }

  const { rows, text } = getSocialCreditSampleDisplay(result?.codes ?? [], revealed);
  const summary = rows.length ? fill(l.generated, { total: rows.length }) : l.empty;

  async function copy() {
    const current = ++revision.current;
    setNotice("");
    try {
      await navigator.clipboard.writeText(text);
      if (current === revision.current) setNotice(l.copied);
    } catch {
      if (current === revision.current) setNotice(l.copyFailed);
    }
  }

  function download() {
    revision.current++;
    try {
      const url = URL.createObjectURL(new Blob([text + "\n"], { type: "text/plain;charset=utf-8" }));
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      const link = document.createElement("a");
      link.href = url;
      link.download = "social-credit-test-samples.txt";
      link.click();
      setNotice(l.downloaded);
    } catch {
      setNotice(l.downloadFailed);
    }
  }

  return <ToolPanel><div className="space-y-5" data-social-credit-generator>
    <div className="space-y-2 text-sm leading-6 text-[var(--color-sub)]">
      <p>{l.scope}</p>
      <p>{l.inputPolicy}</p>
      <p>{l.localNote}</p>
      <div className="flex flex-wrap gap-x-5">
        <a href={ORGANIZATION_CODE_STANDARD_URL} target="_blank" rel="noopener noreferrer" className={sourceLink}>GB 11714-1997 (PDF)</a>
        <a href={SOCIAL_CREDIT_STANDARD_URL} target="_blank" rel="noopener noreferrer" className={sourceLink}>GB 32100-2015 (PDF)</a>
      </div>
    </div>
    <form onSubmit={generate} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map(({ key, example, keyboard }) => {
          const error = result?.fieldErrors[key];
          const fieldId = `${id}-${key}`;
          const describedBy = [error && `${fieldId}-error`, keyboard === "text" && `${id}-alphabet`].filter(Boolean).join(" ");
          return <div key={key} className="min-w-0">
            <label htmlFor={fieldId} className="mb-1.5 block text-sm font-medium">{l.fields[key]}</label>
            <input
              ref={node => { inputs.current[key] = node; }}
              id={fieldId}
              type="text"
              inputMode={keyboard}
              className="field mono min-h-11 w-full"
              dir="ltr"
              value={values[key]}
              placeholder={example}
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              aria-invalid={Boolean(error)}
              aria-describedby={describedBy || undefined}
              data-testid={`social-credit-generator-${key}`}
              onChange={event => {
                setValues({ ...values, [key]: event.target.value });
                resetDisplay();
              }}
            />
            {error && <p id={`${fieldId}-error`} className="mt-1 text-sm leading-6 text-[var(--color-bad)]">{l.errors[error]}</p>}
            {key === "startBody" && <p id={`${id}-alphabet`} className="mono mt-1 break-all text-sm leading-6 text-[var(--color-sub)]">
              <bdi dir="ltr">{SOCIAL_CREDIT_ALPHABET}</bdi>
            </p>}
          </div>;
        })}
      </div>
      <div className="flex flex-wrap gap-2.5">
        <button type="submit" className="inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--color-action-bg)] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--color-action-hover)]">{l.generate}</button>
        <button type="button" className={secondary} onClick={() => {
          setValues(initial);
          resetDisplay();
          inputs.current.department?.focus();
        }}>{l.clear}</button>
      </div>
    </form>
    {result && result.errors.length > 0 && <p role="alert" className="sr-only">{result.errors.map(error => l.errors[error]).join(" ")}</p>}
    <p role="status" aria-live="polite" aria-atomic="true" className="text-sm font-medium">{notice || summary}</p>
    {rows.length > 0 && <section aria-label={summary} className="space-y-4">
      <p className="text-sm leading-6 text-[var(--color-sub)]">{l.maskedNote}</p>
      <div className="flex flex-wrap gap-2.5">
        <button type="button" className={secondary} aria-pressed={revealed} onClick={() => {
          revision.current++;
          setRevealed(!revealed);
          setNotice("");
        }}>{revealed ? l.hide : l.reveal}</button>
        <button type="button" className={secondary} onClick={copy}>{l.copy}</button>
        <button type="button" className={secondary} onClick={download}>{l.download}</button>
      </div>
      <ul className="grid gap-2 sm:grid-cols-2">
        {rows.map((row, index) => <li key={index} className="min-w-0 rounded-xl border hairline px-3 py-2.5 text-sm leading-6">
          <bdi dir="ltr" className="mono break-all" data-testid="social-credit-generated-code">{row}</bdi>
        </li>)}
      </ul>
    </section>}
  </div></ToolPanel>;
}
