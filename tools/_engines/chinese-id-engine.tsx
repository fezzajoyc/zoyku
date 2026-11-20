"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import { fill } from "../_lib/types";
import { CHINESE_ID_MESSAGES } from "../_lib/chinese-id-copy";
import {
  CHINESE_ID_STANDARD_URL, generateChineseIdSamples, maskChineseId, validateChineseIdBatch,
  type ChineseIdError, type ChineseIdGenerationOptions,
} from "../_lib/chinese-id";

type ValidationRows = ReturnType<typeof validateChineseIdBatch>["results"];
const control = "field min-h-11 w-full";
const button = "inline-flex min-h-11 items-center justify-center rounded-full border hairline px-4 py-2 text-sm font-medium transition-colors hover:bg-[var(--color-surface)]";

export function ChineseIdEngine({ mode }: { mode: "validator" | "generator" }) {
  const { locale } = useI18n();
  const l = CHINESE_ID_MESSAGES[locale];
  const id = useId();
  const revision = useRef(0);
  const [input, setInput] = useState("");
  const [referenceDate, setReferenceDate] = useState("");
  const [areaCode, setAreaCode] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [sex, setSex] = useState<ChineseIdGenerationOptions["sex"]>("any");
  const [startSequence, setStartSequence] = useState("1");
  const [count, setCount] = useState("10");
  const [rows, setRows] = useState<ValidationRows>([]);
  const [numbers, setNumbers] = useState<string[]>([]);
  const [errors, setErrors] = useState<ChineseIdError[]>([]);
  const [revealed, setRevealed] = useState(false);
  const [notice, setNotice] = useState("");

  const resetResults = () => { revision.current++; setRows([]); setNumbers([]); setErrors([]); setRevealed(false); setNotice(""); };
  const clear = () => { setInput(""); setReferenceDate(""); setAreaCode(""); setBirthDate(""); setSex("any"); setStartSequence("1"); setCount("10"); resetResults(); };
  const run = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    revision.current++;
    setRevealed(false); setNotice("");
    if (mode === "validator") {
      const result = validateChineseIdBatch(input, referenceDate);
      setRows(result.results); setErrors(result.error ? [result.error] : []);
    } else {
      const result = generateChineseIdSamples({ areaCode, birthDate, sex, startSequence: Number(startSequence), count: Number(count), referenceDate });
      setNumbers(result.numbers); setErrors(result.errors);
    }
  };
  const display = (number: string) => revealed ? number : maskChineseId(number);
  const displayedText = mode === "generator" ? numbers.map(display).join("\n") : rows.map((row) => {
    const number = display(row.canonicalNumber ?? row.normalized);
    return `${l.line} ${row.lineNumber}: ${number || "—"} — ${row.valid ? l.valid : row.errors.map((key) => l.errors[key]).join(" ")}${row.legacyAssumption ? ` — ${l.converted}` : ""}`;
  }).join("\n");
  const total = mode === "validator" ? rows.length : numbers.length;
  const valid = rows.filter((row) => row.valid).length;
  const summary = !total ? l.empty : mode === "validator"
    ? fill(l.results, { total, valid, invalid: total - valid })
    : fill(l.generated, { total });

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
      link.href = url; link.download = `chinese-id-${mode}.txt`; link.click();
      setNotice(l.downloaded);
    } catch { setNotice(l.downloadFailed); }
  };
  const errorId = (key: string) => `${id}-${key}-error`;
  const errorFor = (codes: ChineseIdError[]) => errors.filter((key) => codes.includes(key));
  const inlineError = (key: string, codes: ChineseIdError[]) => {
    const found = errorFor(codes);
    return found.length ? <p id={errorId(key)} className="mt-1 text-sm text-[var(--color-bad)]">{found.map((code) => l.errors[code]).join(" ")}</p> : null;
  };
  const describedBy = (key: string, codes: ChineseIdError[]) => errorFor(codes).length ? errorId(key) : undefined;

  return <ToolPanel><div className="space-y-5" data-chinese-id-tool={mode}>
    <div className="space-y-2 text-sm leading-6 text-[var(--color-sub)]">
      {mode === "generator" && <p>{l.sampleNote}</p>}
      <p>{l.limitNote}</p>
      <p>{l.localNote}</p>
      <a href={CHINESE_ID_STANDARD_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-[var(--color-accent)] underline underline-offset-4">{l.source}</a>
    </div>
    <form onSubmit={run} noValidate className="space-y-4">
      {mode === "validator" ? <div>
        <label htmlFor={`${id}-input`} className="mb-1.5 block text-sm font-medium">{l.input}</label>
        <textarea id={`${id}-input`} className={`${control} mono`} rows={5} value={input} spellCheck={false} autoComplete="off" autoCorrect="off" autoCapitalize="off"
          aria-describedby={`${id}-input-hint${errors.some((key) => key !== "reference_date") ? ` ${id}-errors` : ""}`}
          aria-invalid={errors.some((key) => key !== "reference_date")}
          onChange={(event) => { setInput(event.target.value); resetResults(); }} />
        <p id={`${id}-input-hint`} className="mt-1 text-sm text-[var(--color-sub)]">{l.inputHint}</p>
      </div> : <div className="grid gap-4 sm:grid-cols-2">
        <div><label htmlFor={`${id}-area`} className="mb-1.5 block text-sm font-medium">{l.areaCode}</label>
          <input id={`${id}-area`} className={`${control} mono`} value={areaCode} inputMode="numeric" autoComplete="off" spellCheck={false}
            aria-invalid={errorFor(["province"]).length > 0} aria-describedby={describedBy("area", ["province"])}
            onChange={(event) => { setAreaCode(event.target.value); resetResults(); }} />{inlineError("area", ["province"])}</div>
        <div><label htmlFor={`${id}-birth`} className="mb-1.5 block text-sm font-medium">{l.birthDate}</label>
          <input id={`${id}-birth`} className={control} value={birthDate} type="date" min="0001-01-01" max={referenceDate || "9999-12-31"} autoComplete="off"
            aria-invalid={errorFor(["birth_date", "future_birth"]).length > 0} aria-describedby={describedBy("birth", ["birth_date", "future_birth"])}
            onChange={(event) => { setBirthDate(event.target.value); resetResults(); }} />{inlineError("birth", ["birth_date", "future_birth"])}</div>
        <div><label htmlFor={`${id}-sex`} className="mb-1.5 block text-sm font-medium">{l.sex}</label>
          <select id={`${id}-sex`} className={control} value={sex} onChange={(event) => { setSex(event.target.value as typeof sex); resetResults(); }}>
            <option value="any">{l.any}</option><option value="male">{l.male}</option><option value="female">{l.female}</option>
          </select></div>
        <div><label htmlFor={`${id}-sequence`} className="mb-1.5 block text-sm font-medium">{l.startSequence}</label>
          <input id={`${id}-sequence`} className={control} type="number" min="1" max="999" step="1" value={startSequence} autoComplete="off"
            aria-invalid={errorFor(["sequence", "sequence_capacity"]).length > 0} aria-describedby={describedBy("sequence", ["sequence", "sequence_capacity"])}
            onChange={(event) => { setStartSequence(event.target.value); resetResults(); }} />{inlineError("sequence", ["sequence", "sequence_capacity"])}</div>
        <div><label htmlFor={`${id}-count`} className="mb-1.5 block text-sm font-medium">{l.count}</label>
          <input id={`${id}-count`} className={control} type="number" min="1" max="100" step="1" value={count} autoComplete="off"
            aria-invalid={errorFor(["count", "sequence_capacity"]).length > 0} aria-describedby={describedBy("count", ["count", "sequence_capacity"])}
            onChange={(event) => { setCount(event.target.value); resetResults(); }} />{inlineError("count", ["count", "sequence_capacity"])}</div>
      </div>}
      <div className="max-w-md"><label htmlFor={`${id}-reference`} className="mb-1.5 block text-sm font-medium">{l.referenceDate}</label>
        <input id={`${id}-reference`} className={control} type="date" min="0001-01-01" max="9999-12-31" value={referenceDate} autoComplete="off"
          aria-invalid={errorFor(["reference_date"]).length > 0} aria-describedby={describedBy("reference", ["reference_date"])}
          onChange={(event) => { setReferenceDate(event.target.value); resetResults(); }} />{inlineError("reference", ["reference_date"])}</div>
      <div className="flex flex-wrap gap-2.5"><button type="submit" className="inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--color-accent-strong)] px-5 py-2.5 text-sm font-medium text-white transition-[filter] hover:brightness-95">{mode === "validator" ? l.validate : l.generate}</button>
        <button type="button" className={button} onClick={clear}>{l.clear}</button></div>
    </form>
    {errors.length > 0 && <div id={`${id}-errors`} role="alert" className="rounded-xl border border-[var(--color-hairline)] p-4 text-sm leading-6 text-[var(--color-bad)]"><ul className="list-inside list-disc">{errors.map((key) => <li key={key}>{l.errors[key]}</li>)}</ul></div>}
    <p role="status" aria-live="polite" aria-atomic="true" className="text-sm font-medium">{notice || summary}</p>
    {total > 0 && <section aria-label={mode === "validator" ? l.validate : l.generate} className="space-y-4">
      <p className="text-sm leading-6 text-[var(--color-sub)]">{l.maskedNote}</p>
      <div className="flex flex-wrap gap-2.5"><button type="button" className={button} aria-pressed={revealed} onClick={() => { revision.current++; setRevealed(!revealed); setNotice(""); }}>{revealed ? l.hide : l.reveal}</button>
        <button type="button" className={button} onClick={copy}>{l.copy}</button><button type="button" className={button} onClick={download}>{l.download}</button></div>
      {mode === "generator" ? <pre data-testid="generated-numbers" dir="ltr" className="mono max-h-96 overflow-auto whitespace-pre rounded-xl bg-[var(--color-surface)] p-4 text-sm leading-7" tabIndex={0}>{numbers.map(display).join("\n")}</pre>
        : <ol className="space-y-3">{rows.map((row) => <li key={row.lineNumber} className="rounded-xl border border-[var(--color-hairline)] p-4 text-sm leading-6">
          <p className="font-medium">{l.line} {row.lineNumber} · {row.valid ? l.valid : l.invalid}</p>
          <p><bdi className="mono break-all" data-testid="validated-number">{display(row.canonicalNumber ?? row.normalized) || "—"}</bdi></p>
          {row.errors.length > 0 && <ul className="list-inside list-disc text-[var(--color-bad)]">{row.errors.map((key) => <li key={key}>{l.errors[key]}</li>)}</ul>}
          {row.legacyAssumption && <p className="mt-2 text-[var(--color-sub)]">{l.converted}</p>}
          {revealed && row.parsed && <dl className="mt-3 grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-x-3 gap-y-1 break-words">
            <dt>{l.areaCode}</dt><dd><bdi>{row.parsed.areaCode}</bdi></dd>
            <dt>{l.province}</dt><dd><bdi>{row.parsed.provinceCode}</bdi></dd>
            <dt>{l.birthDate}</dt><dd><bdi>{row.parsed.birthDate}</bdi></dd>
            <dt>{l.age}</dt><dd>{row.parsed.age}</dd>
            <dt>{l.sex}</dt><dd>{l[row.parsed.sex]}</dd>
            <dt>{l.sequence}</dt><dd><bdi>{row.parsed.sequence}</bdi></dd>
          </dl>}
        </li>)}</ol>}
    </section>}
  </div></ToolPanel>;
}
