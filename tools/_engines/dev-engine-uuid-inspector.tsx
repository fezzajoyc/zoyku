"use client";

import { useId, useMemo, useState } from "react";
import { CopyButton } from "@/components/client-ui";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import { RTL_LOCALES, type Locale } from "@/lib/site";
import { inspectUuid, type UuidInspection } from "../_lib/uuid-inspector";
import { UUID_INSPECTOR_MESSAGES } from "../_lib/uuid-inspector-copy";

export function UuidInspectorResult({ inspection, locale }: { inspection: UuidInspection; locale: Locale }) {
  const L = UUID_INSPECTOR_MESSAGES[locale];
  const fields: [keyof typeof L.formats, string][] = [
    ["canonical", inspection.canonical], ["uppercase", inspection.uppercase], ["raw", inspection.raw],
    ["urn", inspection.urn], ["braced", inspection.braced], ["binary", inspection.binary],
    ["base64", inspection.base64], ["bytes", JSON.stringify(inspection.bytes)],
  ];
  const details = [
    [L.version, inspection.version === null ? L.unknown : `v${inspection.version}`],
    [L.versionBits, String(inspection.versionNibble)],
    [L.variant, L.variants[inspection.variant]],
    [L.special, inspection.special === null ? L.unknown : L.specials[inspection.special]],
  ];
  return <div className="space-y-5" data-uuid-rfc={String(inspection.isRfc9562)}>
    <section className="rounded-xl border hairline p-4">
      <h2 className="text-[15px] font-semibold">{inspection.isRfc9562 ? L.recognized : L.unrecognized}</h2>
      <dl className="mt-3 grid gap-4 text-sm sm:grid-cols-2">{details.map(([label, value]) => <div key={label}>
        <dt className="text-[var(--color-sub)]">{label}</dt><dd className="mt-1 font-medium"><bdi>{value}</bdi></dd>
      </div>)}</dl>
    </section>
    <div className="space-y-3">{fields.map(([key, value]) => <section key={key} className="rounded-xl border hairline p-3.5">
      <h3 className="text-sm font-semibold">{L.formats[key]}</h3>
      <pre dir="ltr" className="mono my-2 whitespace-pre-wrap break-all rounded-lg bg-[var(--color-surface)] p-3 text-[13px] leading-6">{value}</pre>
      <CopyButton value={value} label={L.copy} />
    </section>)}</div>
  </div>;
}

export function DevUuidInspectorEngine() {
  const { locale } = useI18n();
  const L = UUID_INSPECTOR_MESSAGES[locale];
  const [input, setInput] = useState("");
  const result = useMemo(() => inspectUuid(input), [input]);
  const id = useId();
  const hasError = !result.ok && result.error !== "empty";
  return <ToolPanel><div className="space-y-5" dir={RTL_LOCALES.has(locale) ? "rtl" : "ltr"} data-uuid-inspector="">
    <div id={`${id}-rules`} className="space-y-2 text-sm leading-6 text-[var(--color-sub)]">
      <p>{L.local}</p><p>{L.rules}</p><p>{L.semantics}</p><p>{L.limit}</p>
    </div>
    <div className="space-y-2">
      <label htmlFor={`${id}-input`} className="block text-sm font-semibold">{L.input}</label>
      <textarea id={`${id}-input`} className="field mono w-full" dir="ltr" rows={4} value={input}
        onChange={event => setInput(event.target.value)} spellCheck={false} autoComplete="off"
        aria-invalid={hasError} aria-describedby={`${id}-rules${hasError ? ` ${id}-error` : ""}`} />
    </div>
    <div className="flex flex-wrap gap-2.5">
      <button type="button" onClick={() => setInput("919108f7-52d1-4320-9bac-f847db4148a8")} className="min-h-11 rounded-full border hairline px-4 py-2 text-sm font-medium">{L.example}</button>
      <button type="button" onClick={() => setInput("")} className="min-h-11 rounded-full border hairline px-4 py-2 text-sm font-medium">{L.clear}</button>
    </div>
    <div aria-live="polite">
      {result.ok ? <UuidInspectorResult inspection={result} locale={locale} /> : hasError
        ? <p id={`${id}-error`} role="alert" className="error-bg rounded-xl p-3 text-sm leading-6 text-[var(--color-bad)]">{result.error === "too-long" ? L.limit : L.formatError}</p>
        : <p className="text-sm leading-6 text-[var(--color-sub)]">{L.empty}</p>}
    </div>
  </div></ToolPanel>;
}
