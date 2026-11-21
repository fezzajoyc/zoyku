"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "@/components/client-ui";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import { intToIp, ipToInt, expandIpRange, MAX_IP_RANGE_EXPANSION } from "../_lib/subnet";
import { IPV4_RANGE_MESSAGES } from "../_lib/ipv4-range-messages";

export function UtilEngineIpv4Range() {
  const { locale } = useI18n();
  const L = IPV4_RANGE_MESSAGES[locale];
  const [start, setStart] = useState("192.0.2.1");
  const [end, setEnd] = useState("192.0.2.5");
  const result = useMemo(() => {
    const a = ipToInt(start);
    const b = ipToInt(end);
    if (a === null || b === null) return { kind: "invalid" as const };
    if (a > b) return { kind: "reversed" as const };
    const expanded = expandIpRange(a, b, MAX_IP_RANGE_EXPANSION);
    if (!expanded) return { kind: "invalid" as const };
    return { kind: "ok" as const, total: expanded.total, truncated: expanded.truncated, text: expanded.ips.map(intToIp).join("\n") };
  }, [start, end]);

  return (
    <ToolPanel>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="min-w-0 text-[12.5px] font-semibold text-[var(--color-sub)]">
          <span className="mb-1 block">{L.start}</span>
          <input className="field mono w-full" dir="ltr" value={start} onChange={(event) => setStart(event.target.value)} autoComplete="off" spellCheck={false} placeholder="192.0.2.1" />
        </label>
        <label className="min-w-0 text-[12.5px] font-semibold text-[var(--color-sub)]">
          <span className="mb-1 block">{L.end}</span>
          <input className="field mono w-full" dir="ltr" value={end} onChange={(event) => setEnd(event.target.value)} autoComplete="off" spellCheck={false} placeholder="192.0.2.5" />
        </label>
      </div>
      {result.kind === "invalid" && <p className="mt-4 text-[13.5px] leading-5 text-[var(--color-bad)]" role="alert">{L.invalid}</p>}
      {result.kind === "reversed" && <p className="mt-4 text-[13.5px] leading-5 text-[var(--color-bad)]" role="alert">{L.reversed}</p>}
      {result.kind === "ok" && (
        <section className="mt-5 border-t hairline pt-4" aria-label={L.result}>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="text-[12.5px] font-semibold text-[var(--color-sub)]">{L.total}</div>
              <div className="mono text-[22px] font-semibold text-[var(--color-accent-text)]" aria-live="polite">{result.total.toLocaleString(locale)}</div>
            </div>
            <CopyButton value={result.text} label={L.copy} />
          </div>
          {result.truncated && <p className="mt-3 rounded-lg error-bg px-3 py-2 text-[13px] leading-5 text-[var(--color-bad)]" role="status">{L.truncated.replaceAll("{n}", MAX_IP_RANGE_EXPANSION.toLocaleString(locale))}</p>}
          <textarea className="field mono mt-3 min-h-56 w-full resize-y" dir="ltr" rows={8} value={result.text} readOnly aria-label={L.result} spellCheck={false} />
        </section>
      )}
      <p className="mt-3 text-[12.5px] leading-5 text-[var(--color-sub)]">{L.note.replaceAll("{n}", MAX_IP_RANGE_EXPANSION.toLocaleString(locale))}</p>
    </ToolPanel>
  );
}
