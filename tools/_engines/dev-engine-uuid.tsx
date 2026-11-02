"use client";

import { useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { HTML_LANG } from "@/lib/i18n";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { fill } from "../_lib/types";

/** UUID v4 批量生成器:crypto.randomUUID(老浏览器回退 getRandomValues)。 */

function uuidV4(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") return crypto.randomUUID();
  const b = crypto.getRandomValues(new Uint8Array(16));
  b[6] = (b[6] & 0x0f) | 0x40;
  b[8] = (b[8] & 0x3f) | 0x80;
  const h = [...b].map((x) => x.toString(16).padStart(2, "0")).join("");
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
}

const COUNT_LABEL: Record<string, string> = {
  en: "Count",
  zh: "数量",
  ja: "個数",
  es: "Cantidad",
  pt: "Quantidade",
};

const NOTE: Record<string, string> = {
  en: "UUID v4 is fully random — unlike v1/v6/v7 it carries no timestamp. {n} IDs generated locally at {time}.",
  zh: "UUID v4 完全随机——与 v1/v6/v7 不同,它不包含时间戳。已于 {time} 在本地生成 {n} 个 ID。",
  ja: "UUID v4 は完全にランダムです。v1/v6/v7 と異なりタイムスタンプを含みません。{time} にローカルで {n} 個生成しました。",
  es: "UUID v4 es totalmente aleatorio: a diferencia de v1/v6/v7 no lleva marca de tiempo. {n} IDs generados localmente a las {time}.",
  pt: "UUID v4 é totalmente aleatório — diferente de v1/v6/v7, não contém timestamp. {n} IDs gerados localmente às {time}.",
};

export function DevUuidEngine() {
  const { locale, t } = useI18n();
  const [count, setCount] = useState(10);
  const [out, setOut] = useState("");
  const [note, setNote] = useState("");

  const generate = () => {
    const n = Math.max(1, Math.min(500, Math.floor(count) || 1));
    const ids = Array.from({ length: n }, uuidV4);
    setOut(ids.join("\n"));
    const time = new Intl.DateTimeFormat(HTML_LANG[locale] ?? HTML_LANG.en, { dateStyle: "short", timeStyle: "medium" }).format(
      new Date(),
    );
    setNote(fill(NOTE[locale] ?? NOTE.en, { n: String(n), time }));
  };

  return (
    <ToolPanel>
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <label className="inline-flex items-center gap-2 text-[14px]">
            <span>{COUNT_LABEL[locale] ?? COUNT_LABEL.en}</span>
            <input
              type="number"
              className="field bare mono w-24 px-2.5 py-1.5 text-[14px]"
              min={1}
              max={500}
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              aria-label={COUNT_LABEL[locale] ?? COUNT_LABEL.en}
            />
          </label>
          <button
            type="button"
            onClick={generate}
            className="rounded-full bg-[var(--color-accent)] px-4 py-1.5 text-[13.5px] font-medium text-white transition-colors hover:bg-[var(--color-accent-strong)]"
          >
            Generate UUID v4
          </button>
        </div>

        <textarea
          className="field mono bg-[var(--color-surface)]"
          rows={8}
          value={out}
          readOnly
          placeholder={t.common.output}
          spellCheck={false}
          aria-label={t.common.output}
        />

        {note && <p className="text-[13px] leading-5 text-[var(--color-sub)]">{note}</p>}

        <div className="flex flex-wrap gap-2.5">
          <CopyButton value={out} />
          <button
            type="button"
            onClick={() => {
              setOut("");
              setNote("");
            }}
            className="rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)]"
          >
            {t.common.clear}
          </button>
        </div>
      </div>
    </ToolPanel>
  );
}
