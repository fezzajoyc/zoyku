"use client";

import { useId, useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { CSV_DELIMITERS, type CsvDelimiter } from "../_lib/csv";
import { transformCsvTable, type CsvTableOperation } from "../_lib/csv-table";
import { CSV_TABLE_MESSAGES, csvTableErrorText, csvTableLimitsText } from "../_lib/csv-table-copy";
import { fill } from "../_lib/types";

const SAMPLE_CELLS = [["name", "code", "note"], ["Ada, Countess", "007", 'said "hi"'], ["中😀", "-0", "line\nnext"]];

export function DevCsvTableEngine() {
  const { locale, t } = useI18n();
  const [input, setInput] = useState("");
  const [operation, setOperation] = useState<CsvTableOperation>("transpose");
  const [delimiter, setDelimiter] = useState<CsvDelimiter>(",");
  const [firstColumn, setFirstColumn] = useState("1");
  const [secondColumn, setSecondColumn] = useState("2");
  const id = useId();
  const l = CSV_TABLE_MESSAGES[locale];
  const result = useMemo(() => transformCsvTable(input, {
    operation, delimiter, firstColumn: firstColumn.trim() === "" ? undefined : Number(firstColumn),
    secondColumn: secondColumn.trim() === "" ? undefined : Number(secondColumn),
  }), [input, operation, delimiter, firstColumn, secondColumn]);
  const error = result.error ? csvTableErrorText(locale, result.error) : null;
  const delimiterLabels = { ",": l.comma, ";": l.semicolon, "\t": l.tab };
  const loadSample = () => {
    // The sample follows the selected delimiter, including quoted embedded LF.
    setInput(SAMPLE_CELLS.map(row => row.map(value => `"${value.replaceAll('"', '""')}"`).join(delimiter)).join("\n"));
  };

  return <ToolPanel><div className="space-y-4" data-csv-table-tool="">
    <div id={`${id}-rules`} className="space-y-2 text-sm leading-6 text-[var(--color-sub)]">
      <p>{l.intro}</p><p>{l.rules}</p><p>{csvTableLimitsText(locale)}</p>
    </div>
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="space-y-2">
        <label htmlFor={`${id}-operation`} className="text-[13px] font-semibold">{l.operation}</label>
        <select id={`${id}-operation`} className="field" value={operation} onChange={event => setOperation(event.target.value as CsvTableOperation)}>
          <option value="transpose">{l.transpose}</option><option value="swap">{l.swap}</option>
        </select>
      </div>
      <div className="space-y-2">
        <label htmlFor={`${id}-delimiter`} className="text-[13px] font-semibold">{l.delimiter}</label>
        <select id={`${id}-delimiter`} className="field" value={delimiter} onChange={event => setDelimiter(event.target.value as CsvDelimiter)}>
          {CSV_DELIMITERS.map(value => <option key={value} value={value}>{delimiterLabels[value]}</option>)}
        </select>
      </div>
    </div>
    {operation === "swap" && <div className="grid gap-4 sm:grid-cols-2">
      {([{ key: "first", label: l.firstColumn, value: firstColumn, set: setFirstColumn }, { key: "second", label: l.secondColumn, value: secondColumn, set: setSecondColumn }]).map(column => <div className="space-y-2" key={column.key}>
        <label htmlFor={`${id}-${column.key}`} className="text-[13px] font-semibold">{column.label}</label>
        <input id={`${id}-${column.key}`} className="field mono" dir="ltr" type="number" min="1" step="1" value={column.value}
          onChange={event => column.set(event.target.value)} aria-invalid={result.error === "selection"}
          aria-describedby={`${id}-rules${result.error === "selection" ? ` ${id}-error` : ""}`} />
      </div>)}
    </div>}
    <div className="space-y-2">
      <label htmlFor={`${id}-input`} className="text-[13px] font-semibold">{t.common.input}</label>
      <textarea id={`${id}-input`} className="field mono" dir="ltr" rows={8} value={input} onChange={event => setInput(event.target.value)}
        placeholder={t.common.input} spellCheck={false} autoComplete="off" aria-invalid={Boolean(error)}
        aria-describedby={`${id}-rules${error ? ` ${id}-error` : ""}`} />
    </div>
    {error && <p id={`${id}-error`} role="alert" className="whitespace-pre-wrap rounded-xl error-bg px-3.5 py-2.5 text-sm leading-6 text-[var(--color-bad)]">{error}</p>}
    <div className="space-y-2">
      <label htmlFor={`${id}-output`} className="text-[13px] font-semibold">{t.common.output}</label>
      <textarea id={`${id}-output`} className="field mono bg-[var(--color-surface)]" dir="ltr" rows={8} value={result.out} readOnly
        placeholder={t.common.output} spellCheck={false} aria-describedby={`${id}-status`} />
      <p id={`${id}-status`} role="status" aria-live="polite" className="text-sm text-[var(--color-sub)]">
        {error ? "" : result.rows > 0 ? fill(l.count, { rows: result.rows, columns: result.columns, cells: result.rows * result.columns }) : l.empty}
      </p>
    </div>
    <div className="flex flex-wrap gap-2.5">
      {result.out !== "" && <CopyButton value={result.out} />}
      <button type="button" onClick={() => setInput("")} className="min-h-11 rounded-full border hairline px-3.5 py-2 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)]">{t.common.clear}</button>
      <button type="button" onClick={loadSample} className="min-h-11 rounded-full border hairline px-3.5 py-2 text-[13px] font-medium text-[var(--color-accent-text)] transition-colors hover:bg-[var(--color-surface)]">{t.common.sample}</button>
    </div>
  </div></ToolPanel>;
}
