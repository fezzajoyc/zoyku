"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import type { Locale } from "@/lib/site";
import { TRANSFORMS } from "../_lib/transform-registry";
import { fill } from "../_lib/types";

/**
 * HTML 实体双向引擎:方向切换 + 非 ASCII 数字实体开关。
 * 变换本体在 transform-registry 注册(escapeId / unescapeId 由工具文件传入)。
 */

const L: Record<string, Record<string, string>> = {
  escape: { en: "Escape", zh: "转义", ja: "エスケープ", es: "Escapar", pt: "Escapar" },
  unescape: { en: "Unescape", zh: "反转义", ja: "アンエスケープ", es: "Desescapar", pt: "Reverter" },
  numeric: {
    en: "Numeric entities for non-ASCII (é → &#233;)",
    zh: "非 ASCII 字符用数字实体(é → &#233;)",
    ja: "非 ASCII は数値実体参照(é → &#233;)",
    es: "Entidades numéricas para no ASCII (é → &#233;)",
    pt: "Entidades numéricas para não ASCII (é → &#233;)",
  },
  counts: {
    en: "{a} chars in → {b} chars out ({d})",
    zh: "输入 {a} 字符 → 输出 {b} 字符({d})",
    ja: "入力 {a} 文字 → 出力 {b} 文字({d})",
    es: "{a} caracteres de entrada → {b} de salida ({d})",
    pt: "{a} caracteres de entrada → {b} de saída ({d})",
  },
};

const pick = (l: Record<string, string>, locale: Locale) => l[locale] ?? l.en;

export function DevHtmlEscapeEngine({
  escapeId = "html-escape",
  unescapeId = "html-unescape",
  sample = `<a href="/docs?a=1&b=2">Tom & Jerry's "favorites"</a>`,
}: {
  escapeId?: string;
  unescapeId?: string;
  sample?: string;
}) {
  const { locale, t } = useI18n();
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"escape" | "unescape">("escape");
  const [numeric, setNumeric] = useState(false);

  const id = mode === "escape" ? escapeId : unescapeId;

  const output = useMemo(() => {
    const run = TRANSFORMS[id];
    if (!run) return input;
    try {
      return run(input, { numeric });
    } catch {
      return input;
    }
  }, [input, id, numeric]);

  const charsIn = [...input].length;
  const charsOut = [...output].length;
  const delta = charsOut - charsIn;
  const deltaText = delta > 0 ? `+${delta}` : `${delta}`;
  const counts = fill(pick(L.counts, locale), {
    a: String(charsIn),
    b: String(charsOut),
    d: deltaText,
  });

  const modeButton = (value: "escape" | "unescape", label: string) => (
    <button
      type="button"
      onClick={() => setMode(value)}
      aria-pressed={mode === value}
      className={`rounded-full border px-3 py-1.5 text-[13px] font-medium transition-colors ${
        mode === value
          ? "border-transparent bg-[var(--color-ink)] text-white dark:bg-white dark:text-[#1d1d1f]"
          : "hairline hover:bg-[var(--color-surface)]"
      }`}
    >
      {label}
    </button>
  );

  return (
    <ToolPanel>
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          {modeButton("escape", pick(L.escape, locale))}
          {modeButton("unescape", pick(L.unescape, locale))}
          {mode === "escape" && (
            <label className="ml-1 inline-flex cursor-pointer items-center gap-2 text-[14px]">
              <input
                type="checkbox"
                className="accent-[var(--color-accent)]"
                checked={numeric}
                onChange={(e) => setNumeric(e.target.checked)}
              />
              {pick(L.numeric, locale)}
            </label>
          )}
        </div>

        <textarea
          className="field mono"
          rows={6}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t.common.input}
          spellCheck={false}
          aria-label={t.common.input}
        />

        <textarea
          className="field mono bg-[var(--color-surface)]"
          rows={6}
          value={output}
          readOnly
          placeholder={t.common.output}
          spellCheck={false}
          aria-label={t.common.output}
        />

        {input !== "" && (
          <p className="mono text-[13px] text-[var(--color-sub)]">{counts}</p>
        )}

        <div className="flex flex-wrap gap-2.5">
          <CopyButton value={output} />
          <button
            type="button"
            onClick={() => setInput("")}
            className="rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)]"
          >
            {t.common.clear}
          </button>
          {input === "" && (
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
