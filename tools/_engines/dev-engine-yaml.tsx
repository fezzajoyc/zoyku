"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";

type Mode = "json2yaml" | "yaml2json";

const LABELS: Record<string, Record<string, string>> = {
  json: { en: "JSON", zh: "JSON", ja: "JSON", es: "JSON", pt: "JSON" },
  yaml: { en: "YAML", zh: "YAML", ja: "YAML", es: "YAML", pt: "YAML" },
  output: { en: "Output", zh: "结果", ja: "結果", es: "Resultado", pt: "Resultado" },
};

/** JSON ↔ YAML 双向转换(js-yaml 动态加载)。 */
export function DevEngineYaml({ mode }: { mode: Mode }) {
  const { locale, t } = useI18n();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const trL = (k: string) => LABELS[k]?.[locale] ?? LABELS[k]?.en ?? k;

  async function convert() {
    setErr("");
    setOutput("");
    if (!input.trim()) return;
    setBusy(true);
    try {
      const { load, dump } = await import("js-yaml");
      if (mode === "json2yaml") {
        const obj = JSON.parse(input);
        setOutput(dump(obj, { indent: 2, lineWidth: 80 }));
      } else {
        const obj = load(input);
        setOutput(JSON.stringify(obj, null, 2));
      }
    } catch (e) {
      setErr((e as Error).message.slice(0, 200));
    } finally {
      setBusy(false);
    }
  }

  return (
    <ToolPanel>
      <textarea
        className="field mono"
        rows={9}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={mode === "json2yaml" ? trL("json") : trL("yaml")}
        spellCheck={false}
        aria-label={trL("input")}
      />
      <div className="mt-3 flex flex-wrap items-center gap-2.5">
        <button
          type="button"
          onClick={convert}
          disabled={busy || !input.trim()}
          className="rounded-full bg-[var(--color-accent)] px-5 py-2 text-[14px] font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-40"
        >
          {mode === "json2yaml" ? "JSON → YAML" : "YAML → JSON"}
        </button>
        {input && (
          <button
            type="button"
            onClick={() => { setInput(output); setOutput(""); setErr(""); }}
            className="rounded-full border hairline px-4 py-2 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)]"
          >
            ⇄ {t.common.swap}
          </button>
        )}
      </div>

      {err && (
        <p role="alert" className="error-bg mt-3 rounded-xl px-3.5 py-2.5 text-[13.5px] leading-5 text-[var(--color-bad)]">
          {err}
        </p>
      )}

      <textarea
        className="field mono mt-3 bg-[var(--color-surface)]"
        rows={9}
        value={output}
        readOnly
        placeholder={trL("output")}
        spellCheck={false}
        aria-label={trL("output")}
      />
      <div className="mt-3">
        <CopyButton value={output} />
      </div>
    </ToolPanel>
  );
}
