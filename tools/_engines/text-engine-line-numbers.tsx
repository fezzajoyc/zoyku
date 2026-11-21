"use client";

import { useId, useMemo, useRef, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import { addLineNumbers, LINE_NUMBERS_LIMITS, type LineNumbersOptions } from "../_lib/line-numbers";
import { LINE_NUMBER_MESSAGES, lineNumbersError } from "../_lib/line-numbers-copy";

const secondary = "inline-flex min-h-11 items-center justify-center rounded-full border hairline px-4 py-2 text-sm font-medium transition-colors hover:bg-[var(--color-surface)]";
const sample = "Apple\n你好 😀\n\nLast line\n";
const numeric = (value: string) => value.trim() === "" ? NaN : Number(value);

export function LineNumbersEngine() {
  const { locale } = useI18n();
  const c = LINE_NUMBER_MESSAGES[locale];
  const id = useId();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const revision = useRef(0);
  const [input, setInput] = useState("");
  const [position, setPosition] = useState<"prefix" | "suffix">("prefix");
  const [start, setStart] = useState("1");
  const [step, setStep] = useState("1");
  const [padding, setPadding] = useState<LineNumbersOptions["padding"]>(0);
  const [separator, setSeparator] = useState(". ");
  const [notice, setNotice] = useState("");
  const result = useMemo(() => addLineNumbers(input, { position, start: numeric(start), step: numeric(step), padding, separator }), [input, position, start, step, padding, separator]);

  function changed() { revision.current++; setNotice(""); }
  function clear() { changed(); setInput(""); inputRef.current?.focus(); }
  async function copy() {
    if (!result.out) return;
    const current = ++revision.current;
    setNotice("");
    try {
      await navigator.clipboard.writeText(result.out);
      if (current === revision.current) setNotice(c.copied);
    } catch {
      if (current === revision.current) setNotice(c.copyFailed);
    }
  }

  return <ToolPanel>
    <div data-line-numbers-tool className="space-y-5">
      <p id={`${id}-rules`} className="text-sm leading-6 text-[var(--color-sub)]">{c.rules}</p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <label htmlFor={`${id}-position`} className="mb-1.5 block text-sm font-medium">{c.position}</label>
          <select id={`${id}-position`} className="field min-h-11 w-full" value={position} onChange={(event) => { changed(); setPosition(event.target.value as "prefix" | "suffix"); }}>
            <option value="prefix">{c.prefix}</option><option value="suffix">{c.suffix}</option>
          </select>
        </div>
        <div>
          <label htmlFor={`${id}-start`} className="mb-1.5 block text-sm font-medium">{c.start}</label>
          <input id={`${id}-start`} type="number" dir="ltr" min={0} max={LINE_NUMBERS_LIMITS.start} step={1} value={start} onChange={(event) => { changed(); setStart(event.target.value); }} className="field min-h-11 w-full mono" aria-invalid={result.error === "start"} aria-describedby={result.error === "start" ? `${id}-error` : undefined} />
        </div>
        <div>
          <label htmlFor={`${id}-step`} className="mb-1.5 block text-sm font-medium">{c.step}</label>
          <input id={`${id}-step`} type="number" dir="ltr" min={1} max={LINE_NUMBERS_LIMITS.step} step={1} value={step} onChange={(event) => { changed(); setStep(event.target.value); }} className="field min-h-11 w-full mono" aria-invalid={result.error === "step"} aria-describedby={result.error === "step" ? `${id}-error` : undefined} />
        </div>
        <div>
          <label htmlFor={`${id}-padding`} className="mb-1.5 block text-sm font-medium">{c.padding}</label>
          <select id={`${id}-padding`} className="field min-h-11 w-full" value={String(padding)} onChange={(event) => { changed(); setPadding(event.target.value === "auto" ? "auto" : Number(event.target.value)); }}>
            <option value="0">{c.none}</option><option value="auto">{c.auto}</option>
            {Array.from({ length: 12 }, (_, index) => index + 1).map((value) => <option key={value} value={String(value)}>{c.width}: {value}</option>)}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={`${id}-separator`} className="mb-1.5 block text-sm font-medium">{c.separator}</label>
          <input id={`${id}-separator`} type="text" dir="ltr" value={separator} onChange={(event) => { changed(); setSeparator(event.target.value); }} className="field min-h-11 w-full mono" autoComplete="off" spellCheck={false} aria-invalid={result.error === "separator"} aria-describedby={`${id}-literal${result.error === "separator" ? ` ${id}-error` : ""}`} />
          <p id={`${id}-literal`} className="mt-1 text-sm text-[var(--color-sub)]">{c.literal}</p>
        </div>
      </div>
      <div>
        <label htmlFor={`${id}-input`} className="mb-1.5 block text-sm font-medium">{c.input}</label>
        <textarea ref={inputRef} id={`${id}-input`} dir="ltr" value={input} onChange={(event) => { changed(); setInput(event.target.value); }} rows={8} className="field mono w-full resize-y whitespace-pre" spellCheck={false} autoCapitalize="off" autoCorrect="off" aria-invalid={Boolean(result.error)} aria-describedby={`${id}-rules ${id}-limits${result.error ? ` ${id}-error` : ""}`} />
        <div className="mt-3 flex flex-wrap gap-2.5">
          <button type="button" className={secondary} onClick={() => { changed(); setInput(sample); inputRef.current?.focus(); }}>{c.sample}</button>
          <button type="button" className={secondary} onClick={clear}>{c.clear}</button>
        </div>
      </div>
      {result.error && <p id={`${id}-error`} role="alert" className="rounded-xl error-bg px-4 py-3 text-sm text-[var(--color-bad)]">{lineNumbersError(locale, result.error)}</p>}
      <div>
        <label htmlFor={`${id}-output`} className="mb-1.5 block text-sm font-medium">{c.output}</label>
        <textarea id={`${id}-output`} dir="ltr" value={result.out} readOnly rows={8} placeholder={c.empty} className="field mono w-full resize-y whitespace-pre" spellCheck={false} />
        <p role="status" aria-atomic="true" className="mt-2 min-h-6 text-sm text-[var(--color-sub)]">{notice || (result.out ? <>{c.lines}: <bdi dir="ltr">{result.lineCount.toLocaleString(locale)}</bdi></> : !result.error ? c.empty : "")}</p>
        {result.out && <button type="button" className={`${secondary} mt-3`} onClick={copy}>{c.copy}</button>}
      </div>
      <div className="space-y-2 text-sm leading-6 text-[var(--color-sub)]"><p id={`${id}-limits`}>{c.limits}</p><p>{c.privacy}</p></div>
    </div>
  </ToolPanel>;
}
