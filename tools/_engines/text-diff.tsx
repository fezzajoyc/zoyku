"use client";

import { useMemo, useState } from "react";
import { diffWords } from "diff";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";

type DiffPart = { value: string; added?: boolean; removed?: boolean };

function wordDiff(a: string, b: string): DiffPart[] {
  return diffWords(a, b);
}

export function TextDiff() {
  const { t } = useI18n();
  const [left, setLeft] = useState("");
  const [right, setRight] = useState("");

  const parts = useMemo(() => {
    if (!left && !right) return [] as DiffPart[];
    try {
      return wordDiff(left, right);
    } catch {
      return [] as DiffPart[];
    }
  }, [left, right]);

  const changes = parts.filter((p) => p.added || p.removed).length;

  return (
    <ToolPanel>
      <div className="grid gap-3 sm:grid-cols-2">
        <textarea
          className="field mono"
          rows={8}
          value={left}
          onChange={(e) => setLeft(e.target.value)}
          placeholder={t.common.input}
          spellCheck={false}
          aria-label="A"
        />
        <textarea
          className="field mono"
          rows={8}
          value={right}
          onChange={(e) => setRight(e.target.value)}
          placeholder={t.common.output}
          spellCheck={false}
          aria-label="B"
        />
      </div>
      {(left || right) && (
        <div className="mt-4">
          <p className="mb-2 text-[13px] text-[var(--color-sub)]">
            {changes > 0 ? `${changes} Δ` : "✓"}
          </p>
          <div className="mono max-h-96 overflow-auto whitespace-pre-wrap rounded-xl border hairline bg-[var(--color-surface)] p-4 text-[13.5px] leading-6">
            {parts.map((p, i) =>
              p.added ? (
                <ins key={i} className="rounded bg-[rgba(26,127,55,0.14)] text-[var(--color-good)] no-underline">
                  {p.value}
                </ins>
              ) : p.removed ? (
                <del key={i} className="rounded bg-[rgba(178,80,0,0.14)] text-[var(--color-bad)] no-underline">
                  {p.value}
                </del>
              ) : (
                <span key={i}>{p.value}</span>
              ),
            )}
          </div>
        </div>
      )}
    </ToolPanel>
  );
}
