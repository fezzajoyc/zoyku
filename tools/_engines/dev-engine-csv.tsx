"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";

/**
 * JSON ⇄ CSV 双向转换引擎,direction 由服务端工具文件以 prop 传入。
 * json→csv:对象数组 → 列取并集,正确引号转义;csv→json:表头 → 对象,类型推断。
 */

type Direction = "json2csv" | "csv2json";

const NUM_RE = /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/;

const L = {
  delimiter: { en: "Delimiter", zh: "分隔符", ja: "区切り文字", es: "Delimitador", pt: "Delimitador" },
  notArray: {
    en: "Input must be a JSON array of objects.",
    zh: "输入必须是对象数组(JSON)。",
    ja: "入力はオブジェクトの JSON 配列である必要があります。",
    es: "La entrada debe ser un array JSON de objetos.",
    pt: "A entrada deve ser um array JSON de objetos.",
  },
  noRows: {
    en: "No CSV rows found.",
    zh: "未找到 CSV 数据行。",
    ja: "CSV の行が見つかりません。",
    es: "No se encontraron filas CSV.",
    pt: "Nenhuma linha CSV encontrada.",
  },
};

const pick = (label: Record<string, string>, locale: string) => label[locale] ?? label.en;

function parseCsv(text: string, delim: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let inQ = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQ) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          cell += '"';
          i++;
        } else inQ = false;
      } else cell += c;
    } else if (c === '"') inQ = true;
    else if (c === delim) {
      row.push(cell);
      cell = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else cell += c;
  }
  if (cell !== "" || row.length > 0) {
    row.push(cell);
    rows.push(row);
  }
  return rows.filter((r) => r.some((v) => v.trim() !== ""));
}

function escapeCell(v: unknown): string {
  if (v === null || v === undefined) return "";
  let s = typeof v === "object" ? JSON.stringify(v) : String(v);
  if (/[",\n\r]/.test(s)) s = `"${s.replaceAll('"', '""')}"`;
  return s;
}

function infer(v: string): unknown {
  if (v === "") return "";
  if (v === "true") return true;
  if (v === "false") return false;
  if (v === "null") return null;
  if (NUM_RE.test(v)) return Number(v);
  return v;
}

export function DevCsvEngine({ direction, sample = "" }: { direction: Direction; sample?: string }) {
  const { locale, t } = useI18n();
  const [input, setInput] = useState("");
  const [delim, setDelim] = useState<"," | ";">(",");

  const run = useMemo(() => {
    if (!input.trim()) return { out: "", err: null as string | null };
    try {
      if (direction === "json2csv") {
        const data: unknown = JSON.parse(input);
        if (!Array.isArray(data) || data.some((x) => typeof x !== "object" || x === null || Array.isArray(x))) {
          return { out: "", err: pick(L.notArray, locale) };
        }
        const rows = data as Record<string, unknown>[];
        const cols: string[] = [];
        for (const r of rows) for (const k of Object.keys(r)) if (!cols.includes(k)) cols.push(k);
        const lines = [cols.map(escapeCell).join(delim)];
        for (const r of rows) lines.push(cols.map((c) => escapeCell(r[c])).join(delim));
        return { out: lines.join("\n"), err: null };
      }
      const rows = parseCsv(input, delim);
      if (rows.length === 0) return { out: "", err: pick(L.noRows, locale) };
      const header = rows[0];
      const objs = rows.slice(1).map((r) =>
        Object.fromEntries(header.map((h, idx) => [h.trim() || `column${idx + 1}`, infer(r[idx] ?? "")])),
      );
      return { out: JSON.stringify(objs, null, 2), err: null };
    } catch (e) {
      return { out: "", err: e instanceof Error ? e.message : String(e) };
    }
  }, [input, direction, delim, locale]);

  return (
    <ToolPanel>
      <div className="space-y-4">
        <textarea
          className="field mono"
          rows={8}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t.common.input}
          spellCheck={false}
          aria-label={t.common.input}
        />

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[13px] font-semibold">{pick(L.delimiter, locale)}</span>
          {[",", ";"].map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setDelim(d as "," | ";")}
              className={`mono rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                delim === d
                  ? "border-transparent bg-[var(--color-ink)] text-white"
                  : "hairline hover:bg-[var(--color-surface)]"
              }`}
            >
              {d === "," ? '"," (comma)' : '";" (semicolon)'}
            </button>
          ))}
        </div>

        {run.err && (
          <p
            className="mono whitespace-pre-wrap rounded-xl error-bg px-3.5 py-2.5 text-[13.5px] leading-5 text-[var(--color-bad)]"
            role="alert"
          >
            {run.err}
          </p>
        )}

        <textarea
          className="field mono bg-[var(--color-surface)]"
          rows={8}
          value={run.out}
          readOnly
          placeholder={t.common.output}
          spellCheck={false}
          aria-label={t.common.output}
        />

        <div className="flex flex-wrap gap-2.5">
          <CopyButton value={run.out} />
          <button
            type="button"
            onClick={() => setInput("")}
            className="rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)]"
          >
            {t.common.clear}
          </button>
          {sample && input === "" && (
            <button
              type="button"
              onClick={() => setInput(sample)}
              className="rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium text-[var(--color-accent-strong)] transition-colors hover:bg-[rgba(0,113,227,0.06)]"
            >
              {t.common.sample}
            </button>
          )}
        </div>
      </div>
    </ToolPanel>
  );
}
