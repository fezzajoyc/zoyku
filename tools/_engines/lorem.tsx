"use client";

import { useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { loremParagraphs } from "../_lib/transforms";

export function LoremGenerator() {
  const { locale, t } = useI18n();
  const [count, setCount] = useState(3);
  const [output, setOutput] = useState(() => loremParagraphs(3));
  const unitLabel = ({
    en: "paragraphs",
    zh: "段落数",
    ja: "段落",
    es: "párrafos",
    pt: "parágrafos",
  } as Record<string, string>)[locale] ?? "paragraphs";

  return (
    <ToolPanel>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2 text-[14px]">
          <input
            type="number"
            min={1}
            max={50}
            className="field bare mono w-20"
            value={count}
            onChange={(e) => setCount(Math.min(50, Math.max(1, Number(e.target.value) || 1)))}
          />
          <span className="text-[var(--color-sub)]">{unitLabel}</span>
        </label>
        <button
          type="button"
          onClick={() => setOutput(loremParagraphs(count))}
          className="rounded-full bg-[var(--color-accent)] px-4 py-1.5 text-[13px] font-medium text-white transition-colors hover:bg-[var(--color-accent-strong)]"
        >
          {t.common.reset}
        </button>
      </div>
      <textarea
        className="field"
        rows={10}
        value={output}
        onChange={(e) => setOutput(e.target.value)}
        aria-label={t.common.output}
      />
      <div className="mt-3">
        <CopyButton value={output} />
      </div>
    </ToolPanel>
  );
}
