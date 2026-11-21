"use client";

import { useId, useRef, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { filterTextLines, type TextLineFilterOptions } from "../_lib/text-line-filter";
import { TEXT_LINE_FILTER_COPY, TEXT_LINE_FILTER_MESSAGES, textLineFilterError } from "../_lib/text-line-filter-copy";

const secondary = "inline-flex min-h-11 items-center justify-center rounded-full border hairline px-4 py-2 text-sm font-medium hover:bg-[var(--color-surface)]";
const sample = "Apple|red|3\nbanana|yellow|6\n\nAPPLE|green|5\n中😀|blue|2\n";
const numeric = (value: string) => value.trim() === "" ? NaN : Number(value);

export function TextLineFilterEngine() {
  const { locale } = useI18n();
  const c = TEXT_LINE_FILTER_MESSAGES[locale];
  const page = TEXT_LINE_FILTER_COPY[locale];
  const id = useId();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<TextLineFilterOptions["mode"]>("contains");
  const [query, setQuery] = useState("apple");
  const [action, setAction] = useState<"include" | "exclude">("include");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [from, setFrom] = useState("1");
  const [to, setTo] = useState("1");
  const [min, setMin] = useState("0");
  const [max, setMax] = useState("100000");
  const [delimiter, setDelimiter] = useState("|");
  const [column, setColumn] = useState("2");
  const [missing, setMissing] = useState<"reject" | "empty">("reject");
  const options: TextLineFilterOptions = mode === "contains" ? { mode, query, action, caseSensitive }
    : mode === "range" ? { mode, from: numeric(from), to: numeric(to) }
    : mode === "length" ? { mode, min: numeric(min), max: numeric(max) }
    : { mode, delimiter, column: numeric(column), missingColumn: missing };
  const result = filterTextLines(input, options);
  const described = `${id}-rules ${id}-limits${result.error ? ` ${id}-error` : ""}`;
  const field = (key: string, label: string, value: string, change: (value: string) => void, type = "text", minimum?: number, maximum?: number) => <div>
    <label htmlFor={`${id}-${key}`} className="mb-1.5 block text-sm font-medium">{label}</label>
    <input id={`${id}-${key}`} dir="ltr" type={type} min={minimum} max={maximum} step={type === "number" ? 1 : undefined} value={value} onChange={(event) => change(event.target.value)} className="field mono min-h-11 w-full" autoComplete="off" spellCheck={false} aria-describedby={described} />
  </div>;

  return <ToolPanel><div data-text-line-filter-tool className="space-y-5">
    <div>
      <label htmlFor={`${id}-mode`} className="mb-1.5 block text-sm font-medium">{c.mode}</label>
      <select id={`${id}-mode`} className="field min-h-11 w-full" value={mode} onChange={(event) => setMode(event.target.value as TextLineFilterOptions["mode"])}>
        <option value="contains">{c.contains}</option><option value="range">{c.range}</option><option value="length">{c.length}</option><option value="column">{c.column}</option>
      </select>
    </div>
    <div className="grid gap-4 sm:grid-cols-2">
      {mode === "contains" && <>
        {field("query", c.query, query, setQuery)}
        <div><label htmlFor={`${id}-action`} className="mb-1.5 block text-sm font-medium">{c.contains}</label><select id={`${id}-action`} className="field min-h-11 w-full" value={action} onChange={(event) => setAction(event.target.value as "include" | "exclude")}><option value="include">{c.include}</option><option value="exclude">{c.exclude}</option></select></div>
        <label className="inline-flex min-h-11 items-center gap-2 text-sm"><input type="checkbox" checked={caseSensitive} onChange={(event) => setCaseSensitive(event.target.checked)} />{c.caseSensitive}</label>
      </>}
      {mode === "range" && <>{field("from", c.from, from, setFrom, "number", 1, 10000)}{field("to", c.to, to, setTo, "number", 1, 10000)}</>}
      {mode === "length" && <>{field("min", c.min, min, setMin, "number", 0, 100000)}{field("max", c.max, max, setMax, "number", 0, 100000)}</>}
      {mode === "column" && <>
        {field("delimiter", c.delimiter, delimiter, setDelimiter)}{field("column", c.columnNumber, column, setColumn, "number", 1, 10000)}
        <div><label htmlFor={`${id}-missing`} className="mb-1.5 block text-sm font-medium">{c.missing}</label><select id={`${id}-missing`} className="field min-h-11 w-full" value={missing} onChange={(event) => setMissing(event.target.value as "reject" | "empty")}><option value="reject">{c.reject}</option><option value="empty">{c.emptyColumn}</option></select></div>
      </>}
    </div>
    <p id={`${id}-rules`} className="text-sm leading-6 text-[var(--color-sub)]">{page.rules}</p>
    <div><label htmlFor={`${id}-input`} className="mb-1.5 block text-sm font-medium">{c.input}</label><textarea ref={inputRef} id={`${id}-input`} rows={8} dir="ltr" value={input} onChange={(event) => setInput(event.target.value)} className="field mono w-full resize-y whitespace-pre" spellCheck={false} autoCapitalize="off" autoCorrect="off" aria-invalid={Boolean(result.error)} aria-describedby={described} /></div>
    <div className="flex flex-wrap gap-2.5"><button type="button" className={secondary} onClick={() => { setInput(sample); inputRef.current?.focus(); }}>{c.sample}</button><button type="button" className={secondary} onClick={() => { setInput(""); inputRef.current?.focus(); }}>{c.clear}</button></div>
    {result.error && <p id={`${id}-error`} role="alert" className="rounded-xl error-bg px-4 py-3 text-sm text-[var(--color-bad)]">{textLineFilterError(locale, result.error)}</p>}
    <div><label htmlFor={`${id}-output`} className="mb-1.5 block text-sm font-medium">{c.output}</label><textarea id={`${id}-output`} rows={8} dir="ltr" value={result.out} readOnly className="field mono w-full resize-y whitespace-pre" spellCheck={false} /></div>
    <div role="status" aria-atomic="true" className="space-y-1 text-sm text-[var(--color-sub)]">
      {!result.error && <p>{c.inputLines}: <bdi dir="ltr">{result.inputLines.toLocaleString(locale)}</bdi> · {c.outputLines}: <bdi dir="ltr">{result.outputLines.toLocaleString(locale)}</bdi></p>}
      {!result.error && <p>{result.inputLines === 0 ? c.emptyInput : result.outputLines === 0 ? c.noMatch : result.out === "" ? c.emptyResult : ""}</p>}
    </div>
    {result.out !== "" && <CopyButton value={result.out} />}
    <p id={`${id}-limits`} className="text-sm leading-6 text-[var(--color-sub)]">{page.limits}</p>
  </div></ToolPanel>;
}
