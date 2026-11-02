"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { jsonDiff, jsonQuery, jsonToTs, type JsonDiffEntry } from "../_lib/jsontool";

type Mode = "to-ts" | "diff" | "query";

const LABELS: Record<string, Record<string, string>> = {
  input: { en: "JSON", zh: "JSON", ja: "JSON", es: "JSON", pt: "JSON" },
  second: { en: "Second JSON", zh: "第二个 JSON", ja: "2 番目の JSON", es: "Segundo JSON", pt: "Segundo JSON" },
  path: { en: "Path (e.g. $.user.name or $.items[0].id)", zh: "路径(如 $.user.name 或 $.items[0].id)", ja: "パス(例: $.user.name)", es: "Ruta (p. ej. $.user.name)", pt: "Caminho (ex.: $.user.name)" },
  rootName: { en: "Root interface name", zh: "根接口名", ja: "ルート interface 名", es: "Nombre de la interfaz raíz", pt: "Nome da interface raiz" },
  result: { en: "Result", zh: "结果", ja: "結果", es: "Resultado", pt: "Resultado" },
  diffEmpty: { en: "The two JSON documents are identical.", zh: "两个 JSON 完全相同。", ja: "2 つの JSON は同一です。", es: "Los dos JSON son idénticos.", pt: "Os dois JSON são idênticos." },
};

/** JSON 深度工具:→TypeScript / 结构 diff / path 查询(三模式一个引擎)。 */
export function DevEngineJsonPlus({ mode }: { mode: Mode }) {
  const { locale, t } = useI18n();
  const [input, setInput] = useState("");
  const [second, setSecond] = useState("");
  const [path, setPath] = useState("$.a.b");
  const [rootName, setRootName] = useState("Root");

  const trL = (k: string) => LABELS[k]?.[locale] ?? LABELS[k]?.en ?? k;
  const parsed = useMemo(() => {
    try {
      return { ok: true, value: JSON.parse(input || "null") as unknown };
    } catch (e) {
      return { ok: false, error: (e as Error).message };
    }
  }, [input]);

  const parsed2 = useMemo(() => {
    if (mode !== "diff") return { ok: true, value: null as unknown };
    try {
      return { ok: true, value: JSON.parse(second || "null") as unknown };
    } catch (e) {
      return { ok: false, error: (e as Error).message };
    }
  }, [second, mode]);

  const result = useMemo(() => {
    if (mode === "diff") {
      if (!parsed.ok) return { kind: "error" as const, text: parsed.error };
      if (!parsed2.ok) return { kind: "error" as const, text: parsed2.error };
      const entries = jsonDiff(parsed.value, parsed2.value);
      if (entries.length === 0) return { kind: "text" as const, text: trL("diffEmpty") };
      return { kind: "diff" as const, entries };
    }
    if (mode === "query") {
      if (!parsed.ok && input) return { kind: "error" as const, text: parsed.error };
      const r = jsonQuery(parsed.value, path);
      return { kind: "text" as const, text: r.found ? JSON.stringify(r.value, null, 2) : `${r.error ?? "not found"}` };
    }
    // to-ts
    if (!parsed.ok && input) return { kind: "error" as const, text: parsed.error };
    const r = jsonToTs(parsed.value, /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(rootName) ? rootName : "Root");
    return "error" in r ? { kind: "error" as const, text: r.error } : { kind: "text" as const, text: r.code };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, input, parsed, parsed2, path, rootName]);

  return (
    <ToolPanel>
      <textarea
        className="field mono"
        rows={8}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={trL("input")}
        spellCheck={false}
        aria-label={trL("input")}
      />

      {mode === "diff" && (
        <div className="mt-3">
          <textarea
            className="field mono"
            rows={8}
            value={second}
            onChange={(e) => setSecond(e.target.value)}
            placeholder={trL("second")}
            spellCheck={false}
            aria-label={trL("second")}
          />
        </div>
      )}

      {mode === "query" && (
        <input
          className="field mono mt-3"
          value={path}
          onChange={(e) => setPath(e.target.value)}
          placeholder={trL("path")}
          aria-label={trL("path")}
        />
      )}

      {mode === "to-ts" && (
        <input
          className="field mono mt-3"
          value={rootName}
          onChange={(e) => setRootName(e.target.value)}
          placeholder={trL("rootName")}
          aria-label={trL("rootName")}
        />
      )}

      {result.kind === "error" && (
        <p role="alert" className="error-bg mt-3 rounded-xl px-3.5 py-2.5 text-[13.5px] leading-5 text-[var(--color-bad)]">
          {result.text}
        </p>
      )}

      {result.kind === "diff" ? (
        <div className="mono mt-3 max-h-96 overflow-auto rounded-xl border hairline bg-[var(--color-surface)] p-4 text-[13px] leading-6">
          {result.entries.length === 0 ? (
            <span className="text-[var(--color-good)]">{trL("diffEmpty")}</span>
          ) : (
            result.entries.map((e: JsonDiffEntry, i) => (
              <div key={i} className="whitespace-pre-wrap">
                <span className={e.type === "added" ? "text-[var(--color-good)]" : e.type === "removed" ? "text-[var(--color-bad)]" : "text-[var(--color-accent-strong)]"}>
                  {e.type === "added" ? "+" : e.type === "removed" ? "−" : "~"}
                </span>{" "}
                {e.path}
                {e.type === "changed" && `  ${e.from} → ${e.to}`}
                {e.type === "added" && `  ${e.to}`}
                {e.type === "removed" && `  ${e.from}`}
              </div>
            ))
          )}
        </div>
      ) : result.kind === "text" ? (
        <>
          <textarea
            className="field mono mt-3 bg-[var(--color-surface)]"
            rows={10}
            value={result.text}
            readOnly
            aria-label={trL("result")}
          />
          <div className="mt-3">
            <CopyButton value={result.text} />
          </div>
        </>
      ) : null}
    </ToolPanel>
  );
}
