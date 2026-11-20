"use client";

import { useId, useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { CSV_DELIMITERS, csvToJson, jsonToCsv, type CsvDelimiter } from "../_lib/csv";
import { CSV_MESSAGES, csvErrorText, csvLimitsText } from "../_lib/csv-copy";

export function DevCsvEngine({ direction, sample = "" }: { direction: "json2csv" | "csv2json"; sample?: string }) {
  const { locale, t } = useI18n();
  const [input, setInput] = useState("");
  const [delimiter, setDelimiter] = useState<CsvDelimiter>(",");
  const id = useId();
  const l = CSV_MESSAGES[locale];
  const result = useMemo(() => direction === "json2csv" ? jsonToCsv(input, delimiter) : csvToJson(input, delimiter), [input, delimiter, direction]);
  const error = result.error ? csvErrorText(locale, result.error) : null;
  const labels = { ",": l.comma, ";": l.semicolon, "\t": l.tab };

  return <ToolPanel><div className="space-y-4" data-csv-tool={direction}>
    <div id={`${id}-rules`} className="space-y-2 text-sm leading-6 text-[var(--color-sub)]">
      <p>{direction === "json2csv" ? l.json : l.inference}</p>
      <p>{l.shape}</p><p>{csvLimitsText(locale)}</p>
    </div>
    <textarea className="field mono" dir="ltr" rows={8} value={input} onChange={event => setInput(event.target.value)}
      placeholder={t.common.input} spellCheck={false} autoComplete="off" aria-label={t.common.input}
      aria-invalid={Boolean(error)} aria-describedby={`${id}-rules${error ? ` ${id}-error` : ""}`} />
    <fieldset className="space-y-2">
      <legend className="text-[13px] font-semibold">{l.delimiter}</legend>
      <div className="flex flex-wrap gap-2">{CSV_DELIMITERS.map(value => <button key={value} type="button" aria-pressed={delimiter === value}
        data-csv-delimiter={value === "\t" ? "tab" : value} onClick={() => setDelimiter(value)}
        className={`mono min-h-11 rounded-full border px-3.5 py-2 text-[13px] font-medium transition-colors ${delimiter === value ? "border-transparent bg-[var(--color-ink)] text-white dark:bg-white dark:text-[#1d1d1f]" : "hairline hover:bg-[var(--color-surface)]"}`}>
        {value === "\t" ? l.tab : `${value} — ${labels[value]}`}
      </button>)}</div>
    </fieldset>
    {error && <p id={`${id}-error`} role="alert" className="whitespace-pre-wrap rounded-xl error-bg px-3.5 py-2.5 text-sm leading-6 text-[var(--color-bad)]">{error}</p>}
    <textarea className="field mono bg-[var(--color-surface)]" dir="ltr" rows={8} value={result.out} readOnly
      placeholder={t.common.output} spellCheck={false} aria-label={t.common.output} />
    <div className="flex flex-wrap gap-2.5">
      <CopyButton value={result.out} />
      <button type="button" onClick={() => setInput("")} className="min-h-11 rounded-full border hairline px-3.5 py-2 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)]">{t.common.clear}</button>
      {sample && input === "" && <button type="button" onClick={() => setInput(sample)} className="min-h-11 rounded-full border hairline px-3.5 py-2 text-[13px] font-medium text-[var(--color-accent-text)] transition-colors hover:bg-[rgba(0,113,227,0.06)]">{t.common.sample}</button>}
    </div>
  </div></ToolPanel>;
}
