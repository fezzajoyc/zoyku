"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { RTL_LOCALES } from "@/lib/site";
import { convertYamlJson, type YamlDirection } from "../_lib/yaml-converter";
import { YAML_CONVERTER_MESSAGES } from "../_lib/yaml-converter-copy";

export function DevEngineYaml({ mode = "json2yaml" }: { mode?: YamlDirection }) {
  const { locale } = useI18n();
  const L = YAML_CONVERTER_MESSAGES[locale];
  const [direction, setDirection] = useState<YamlDirection>(mode);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const revision = useRef(0);
  const id = useId();
  useEffect(() => () => { revision.current++; }, []);

  const invalidate = () => { revision.current++; setOutput(""); setError(null); setBusy(false); };
  const edit = (value: string) => { invalidate(); setInput(value); };
  const changeDirection = (value: YamlDirection) => { invalidate(); setDirection(value); };
  const swap = () => {
    if (!output) return;
    const nextInput = output;
    invalidate(); setInput(nextInput); setDirection(direction === "json2yaml" ? "yaml2json" : "json2yaml");
  };
  const convert = async () => {
    const current = ++revision.current;
    setOutput(""); setError(null); setBusy(true);
    const result = await convertYamlJson(input, direction);
    if (current !== revision.current) return;
    setBusy(false);
    if (result.ok) setOutput(result.output);
    else setError(result.error.code);
  };
  const errors: Record<string, string> = { empty: L.empty, syntax: L.syntax, duplicate: L.duplicate, features: L.features, number: L.number, limit: L.limit, input: L.inputError };

  return <ToolPanel><div className="space-y-4" dir={RTL_LOCALES.has(locale) ? "rtl" : "ltr"} data-yaml-converter="">
    <div id={`${id}-rules`} className="space-y-2 text-sm leading-6 text-[var(--color-sub)]"><p>{L.rules}</p><p>{L.numbers}</p><p>{L.limits}</p></div>
    <label htmlFor={`${id}-direction`} className="block text-sm font-semibold">{L.direction}</label>
    <select id={`${id}-direction`} className="field mono" dir="ltr" value={direction} onChange={event => changeDirection(event.target.value as YamlDirection)}>
      <option value="json2yaml">JSON → YAML</option><option value="yaml2json">YAML → JSON</option>
    </select>
    <label htmlFor={`${id}-input`} className="block text-sm font-semibold">{L.input} · {direction === "json2yaml" ? "JSON" : "YAML"}</label>
    <textarea id={`${id}-input`} className="field mono" dir="ltr" rows={9} value={input} onChange={event => edit(event.target.value)} spellCheck={false} autoComplete="off"
      aria-invalid={Boolean(error)} aria-describedby={`${id}-rules${error ? ` ${id}-error` : ""}`} />
    <div className="flex flex-wrap gap-2.5">
      <button type="button" disabled={busy || !input.trim()} onClick={() => { void convert(); }} className="min-h-11 rounded-full bg-[var(--color-action-bg)] px-5 py-2 text-sm font-medium text-white disabled:opacity-40">{busy ? L.loading : L.convert}</button>
      <button type="button" disabled={!output || busy} onClick={swap} className="min-h-11 rounded-full border hairline px-4 py-2 text-sm disabled:opacity-40">{L.swap}</button>
      <button type="button" onClick={() => edit("")} className="min-h-11 rounded-full border hairline px-4 py-2 text-sm">{L.clear}</button>
    </div>
    {error && <p id={`${id}-error`} role="alert" className="error-bg rounded-xl p-3 text-sm text-[var(--color-bad)]">{errors[error] ?? L.syntax}</p>}
    <label htmlFor={`${id}-output`} className="block text-sm font-semibold">{L.output} · {direction === "json2yaml" ? "YAML" : "JSON"}</label>
    <textarea id={`${id}-output`} className="field mono bg-[var(--color-surface)]" dir="ltr" rows={9} value={output} readOnly spellCheck={false} aria-live="polite" aria-busy={busy} />
    {output && !busy && <CopyButton value={output} />}
  </div></ToolPanel>;
}
