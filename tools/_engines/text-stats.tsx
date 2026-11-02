"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import { countTextStats as countStats } from "../_lib/transforms";
import { fill } from "../_lib/types";


/** 词数/字符数/句数三个工具页共用,primary 决定首位强调指标。 */
export function TextStats({ primary }: { primary: "words" | "characters" | "sentences" }) {
  const { t } = useI18n();
  const [input, setInput] = useState("");
  const stats = useMemo(() => countStats(input), [input]);

  const minutes = Math.max(1, Math.round((stats.words + stats.characters * 0.3) / 220));
  const defs: { key: keyof typeof stats; label: string; value: number }[] = [
    { key: "words", label: t.text.stats.words, value: stats.words },
    { key: "characters", label: t.text.stats.characters, value: stats.characters },
    { key: "charsNoSpaces", label: t.text.stats.charsNoSpaces, value: stats.charsNoSpaces },
    { key: "sentences", label: t.text.stats.sentences, value: stats.sentences },
    { key: "paragraphs", label: t.text.stats.paragraphs, value: stats.paragraphs },
    { key: "lines", label: t.text.stats.lines, value: stats.lines },
  ];
  const cells = [defs.find((d) => d.key === primary)!, ...defs.filter((d) => d.key !== primary)];

  return (
    <ToolPanel>
      <textarea
        className="field"
        rows={10}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={t.common.input}
        aria-label={t.common.input}
      />
      <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
        {cells.map((c, i) => (
          <div
            key={c.label}
            className={`rounded-xl border hairline px-4 py-3 ${i === 0 ? "bg-[rgba(0,113,227,0.05)]" : ""}`}
          >
            <p className="mono text-xl font-semibold tabular-nums">{c.value}</p>
            <p className="mt-0.5 text-[13px] text-[var(--color-sub)]">{c.label}</p>
          </div>
        ))}
      </div>
      {input.trim() !== "" && (
        <p className="mt-3 text-[13px] text-[var(--color-sub)]">
          {t.text.stats.readingTime}: {fill(t.text.stats.readingMinutes, { n: minutes })}
        </p>
      )}
    </ToolPanel>
  );
}
