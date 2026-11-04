"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";

/**
 * JSON Viewer:左侧可折叠树,右侧原始 JSON(格式化)。
 * 解析错误显示行号(JSON.parse 的 position 换算)。
 */

const LABELS: Record<string, Record<string, string>> = {
  input: { en: "Paste JSON", zh: "粘贴 JSON", ja: "JSON を貼り付け", es: "Pega JSON", pt: "Cole JSON" },
  raw: { en: "Raw (formatted)", zh: "原始(格式化)", ja: "整形済み", es: "Crudo (formateado)", pt: "Bruto (formatado)" },
  tree: { en: "Tree", zh: "树", ja: "ツリー", es: "Árbol", pt: "Árvore" },
  expandAll: { en: "Expand all", zh: "全部展开", ja: "すべて展開", es: "Expandir todo", pt: "Expandir tudo" },
  collapseAll: { en: "Collapse all", zh: "全部折叠", ja: "すべて折りたたむ", es: "Colapsar todo", pt: "Recolher tudo" },
  empty: { en: "Paste a JSON document to explore it as a collapsible tree.", zh: "粘贴一段 JSON,即可用可折叠树浏览。", ja: "JSON を貼り付けると折りたたみ可能なツリーで確認できます。", es: "Pega un documento JSON para explorarlo como árbol plegable.", pt: "Cole um documento JSON para explorá-lo como árvore retrátil." },
};

/** 把 JSON.parse 报错的 position 转成 行:列 */
function errorWithLine(src: string, message: string): string {
  const m = /position (\d+)/.exec(message);
  if (!m) return message;
  const pos = Number(m[1]);
  const before = src.slice(0, pos);
  const line = before.split("\n").length;
  const col = pos - before.lastIndexOf("\n");
  return `line ${line}, column ${col}: ${message}`;
}

type Node = { key: string; value: unknown; path: string };

function childrenOf(value: unknown, prefix: string): Node[] {
  if (Array.isArray(value)) return value.map((v, i) => ({ key: String(i), value: v, path: `${prefix}[${i}]` }));
  if (value && typeof value === "object")
    return Object.entries(value as Record<string, unknown>).map(([k, v]) => ({ key: k, value: v, path: prefix ? `${prefix}.${k}` : k }));
  return [];
}

function valueType(v: unknown): "null" | "bool" | "num" | "str" | "arr" | "obj" {
  if (v === null) return "null";
  if (Array.isArray(v)) return "arr";
  switch (typeof v) {
    case "boolean": return "bool";
    case "number": return "num";
    case "string": return "str";
    default: return "obj";
  }
}

const TYPE_COLOR: Record<string, string> = {
  null: "var(--color-sub)",
  bool: "#b8860b",
  num: "#0b7285",
  str: "#2b8a3e",
  arr: "#7048e8",
  obj: "#e8590c",
};

function previewText(v: unknown): string {
  const t = valueType(v);
  if (t === "str") {
    const s = v as string;
    return `"${s.length > 60 ? s.slice(0, 57) + "…" : s}"`;
  }
  if (t === "arr") return `Array(${(v as unknown[]).length})`;
  if (t === "obj") return `Object(${Object.keys(v as object).length})`;
  return String(v);
}

function TreeNode({ node, depth, collapsed, toggle }: { node: Node; depth: number; collapsed: Set<string>; toggle: (p: string) => void }) {
  const v = node.value;
  const t = valueType(v);
  const isBranch = t === "arr" || t === "obj";
  const isOpen = !collapsed.has(node.path);
  const kids = isBranch && isOpen ? childrenOf(v, node.path) : [];
  return (
    <div>
      <div
        className="flex items-baseline gap-1.5 py-0.5 leading-6"
        style={{ paddingLeft: depth * 16 }}
      >
        {isBranch ? (
          <button
            type="button"
            onClick={() => toggle(node.path)}
            className="mono w-4 flex-none cursor-pointer text-left text-[var(--color-sub)] hover:text-[var(--color-ink)]"
            aria-expanded={isOpen}
          >
            {isOpen ? "▾" : "▸"}
          </button>
        ) : (
          <span className="w-4 flex-none" />
        )}
        {node.key !== "" && (
          <span className="mono break-all text-[13px] font-medium">{node.key}</span>
        )}
        {isBranch ? (
          <button
            type="button"
            onClick={() => toggle(node.path)}
            className="mono cursor-pointer break-all text-left text-[13px] text-[var(--color-sub)] hover:underline"
          >
            {t === "arr" ? `[${(v as unknown[]).length}]` : `{${Object.keys(v as object).length}}`}
          </button>
        ) : (
          <span className="mono break-all text-[13px]" style={{ color: TYPE_COLOR[t] }}>
            {previewText(v)}
          </span>
        )}
      </div>
      {kids.map((k) => (
        <TreeNode key={k.path} node={k} depth={depth + 1} collapsed={collapsed} toggle={toggle} />
      ))}
    </div>
  );
}

function collectBranchPaths(value: unknown, prefix = ""): string[] {
  const out: string[] = [];
  for (const c of childrenOf(value, prefix)) {
    if (valueType(c.value) === "arr" || valueType(c.value) === "obj") {
      out.push(c.path, ...collectBranchPaths(c.value, c.path));
    }
  }
  return out;
}

export function DevEngineJsonViewer() {
  const { locale } = useI18n();
  const L = (k: string) => LABELS[k]?.[locale] ?? LABELS[k]?.en ?? k;
  const [input, setInput] = useState("");
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());

  const parsed = useMemo(() => {
    if (!input.trim()) return null;
    try {
      return { ok: true as const, value: JSON.parse(input) as unknown };
    } catch (e) {
      return { ok: false as const, error: errorWithLine(input, (e as Error).message) };
    }
  }, [input]);

  const toggle = (p: string) =>
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(p)) next.delete(p);
      else next.add(p);
      return next;
    });

  const allBranches = parsed?.ok ? collectBranchPaths(parsed.value) : [];
  const pretty = parsed?.ok ? JSON.stringify(parsed.value, null, 2) : "";

  return (
    <ToolPanel>
      <div className="space-y-4">
        <textarea
          className="field mono"
          rows={6}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={L("input")}
          spellCheck={false}
          aria-label={L("input")}
        />

        {!input.trim() && <p className="text-[13.5px] text-[var(--color-sub)]">{L("empty")}</p>}

        {parsed && !parsed.ok && (
          <p className="mono rounded-lg bg-[var(--color-surface)] px-3 py-2 text-[13px]" style={{ color: "var(--color-bad)" }}>
            {parsed.error}
          </p>
        )}

        {parsed?.ok && (
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-xl border hairline p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[13px] font-semibold">{L("tree")}</span>
                <div className="flex gap-2">
                  <button type="button" onClick={() => setCollapsed(new Set())} className="rounded-full border hairline px-2.5 py-1 text-[12px] hover:bg-[var(--color-surface)]">
                    {L("expandAll")}
                  </button>
                  <button type="button" onClick={() => setCollapsed(new Set(allBranches))} className="rounded-full border hairline px-2.5 py-1 text-[12px] hover:bg-[var(--color-surface)]">
                    {L("collapseAll")}
                  </button>
                </div>
              </div>
              <div className="max-h-[420px] overflow-auto">
                <TreeNode node={{ key: "", value: parsed.value, path: "" }} depth={0} collapsed={collapsed} toggle={toggle} />
              </div>
            </div>
            <div className="rounded-xl border hairline p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[13px] font-semibold">{L("raw")}</span>
                <CopyButton value={pretty} />
              </div>
              <pre className="mono max-h-[420px] overflow-auto whitespace-pre text-[12.5px] leading-5">{pretty}</pre>
            </div>
          </div>
        )}
      </div>
    </ToolPanel>
  );
}
