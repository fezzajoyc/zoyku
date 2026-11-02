"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { sortLines } from "../_lib/transforms";

const ORDERS: readonly {
  id: "asc" | "desc" | "length" | "numeric";
  label: Record<string, string>;
}[] = [
  { id: "asc", label: { en: "A → Z", zh: "A → Z", ja: "A → Z", es: "A → Z", pt: "A → Z" } },
  { id: "desc", label: { en: "Z → A", zh: "Z → A", ja: "Z → A", es: "Z → A", pt: "Z → A" } },
  { id: "length", label: { en: "Short → long", zh: "短 → 长", ja: "短 → 長", es: "Corto → largo", pt: "Curto → longo" } },
  { id: "numeric", label: { en: "Numeric 0 → 9", zh: "数字 0 → 9", ja: "数値 0 → 9", es: "Numérico 0 → 9", pt: "Numérico 0 → 9" } },
];

export function TextSorter() {
  const { locale, t } = useI18n();
  const [input, setInput] = useState("");
  const [order, setOrder] = useState<(typeof ORDERS)[number]["id"]>("asc");

  const output = useMemo(() => sortLines(input, order), [input, order]);

  return (
    <ToolPanel>
      <div className="mb-4 flex flex-wrap gap-2">
        {ORDERS.map((o) => (
          <button
            key={o.id}
            type="button"
            onClick={() => setOrder(o.id)}
            className={`rounded-full border px-3 py-1.5 text-[13px] font-medium transition-colors ${
              order === o.id
                ? "border-transparent bg-[var(--color-ink)] text-white"
                : "hairline hover:bg-[var(--color-surface)]"
            }`}
          >
            {o.label[locale] ?? o.label.en}
          </button>
        ))}
      </div>
      <textarea
        className="field mono"
        rows={9}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={t.common.input}
        spellCheck={false}
        aria-label={t.common.input}
      />
      <textarea
        className="field mono mt-3 bg-[var(--color-surface)]"
        rows={9}
        value={output}
        readOnly
        placeholder={t.common.output}
        spellCheck={false}
        aria-label={t.common.output}
      />
      <div className="mt-3 flex gap-2.5">
        <CopyButton value={output} />
        <button
          type="button"
          onClick={() => setInput("")}
          className="rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)]"
        >
          {t.common.clear}
        </button>
      </div>
    </ToolPanel>
  );
}
