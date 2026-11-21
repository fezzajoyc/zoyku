"use client";

import { useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { pick } from "./calc-ui";
import { convertChineseText, CHINESE_VARIANT_LABELS, type ChineseVariant } from "../_lib/chinese-text-convert";

/**
 * CN-016:简繁中文转换引擎。
 * 双向:简→繁(标准/台/港)、繁→简。opencc-js 懒加载(词典 5.81MB unpacked)。
 * 结果实时预览,CopyButton 一键复制。
 */

const L = {
  tab: { en: "Text to convert", zh: "要转换的文本", ja: "変換するテキスト", es: "Texto a convertir", pt: "Texto a converter" },
  variant: { en: "Conversion direction", zh: "转换方向", ja: "変換方向", es: "Dirección", pt: "Direção" },
  result: { en: "Result", zh: "转换结果", ja: "結果", es: "Resultado", pt: "Resultado" },
  empty: { en: "Type or paste text to see the conversion.", zh: "输入或粘贴文本即可查看转换结果。", ja: "テキストを入力すると変換結果が表示されます。", es: "Escribe o pega texto para ver la conversión.", pt: "Digite ou cole texto para ver a conversão." },
  charCount: { en: "{n} characters", zh: "{n} 个字符", ja: "{n} 文字", es: "{n} caracteres", pt: "{n} caracteres" },
  note: { en: "Powered by OpenCC (MIT). Conversion runs locally — text never leaves this tab. Variant mappings follow the OpenCC dictionaries (s2t, s2tw, s2hk, t2s).", zh: "由 OpenCC(MIT)驱动,转换在本机完成——文本不会离开此标签页。变体映射遵循 OpenCC 词典(s2t、s2tw、s2hk、t2s)。", ja: "OpenCC(MIT)によるローカル変換です。テキストはこのタブから出ません。変換は OpenCC 辞書に従います。", es: "Funciona localmente con OpenCC (MIT); el texto nunca sale de esta pestaña. Los mapeos siguen los diccionarios de OpenCC.", pt: "Funciona localmente com OpenCC (MIT); o texto nunca sai desta aba. Os mapeamentos seguem os dicionários OpenCC." },
};

export function UtilEngineChineseText() {
  const { locale, t } = useI18n();
  const [input, setInput] = useState("");
  const [variant, setVariant] = useState<ChineseVariant>("s2t");
  const [output, setOutput] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const doConvert = async () => {
    setErr(null);
    setBusy(true);
    const r = await convertChineseText(input, variant);
    setBusy(false);
    if (r.ok) setOutput(r.text);
    else {
      setOutput("");
      setErr(r.code === "empty" ? pick(locale, L.empty) : "");
    }
  };

  return (
    <ToolPanel>
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2" role="group">
          {(Object.keys(CHINESE_VARIANT_LABELS) as ChineseVariant[]).map((v) => (
            <button
              key={v}
              type="button"
              aria-pressed={variant === v}
              onClick={() => setVariant(v)}
              className={`mono rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                variant === v
                  ? "border-transparent bg-[var(--color-ink)] text-white dark:bg-white dark:text-[#1d1d1f]"
                  : "hairline hover:bg-[var(--color-surface)]"
              }`}
            >
              {CHINESE_VARIANT_LABELS[v]}
            </button>
          ))}
        </div>

        <textarea
          className="field mono"
          rows={5}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={pick(locale, L.tab)}
          spellCheck={false}
          aria-label={pick(locale, L.tab)}
        />

        <button
          type="button"
          onClick={doConvert}
          disabled={busy || !input.trim()}
          className="rounded-full bg-[var(--color-ink)] px-4 py-2 text-[13.5px] font-medium text-white dark:bg-white dark:text-[#1d1d1f] transition-opacity disabled:opacity-40"
        >
          {busy ? "…" : pick(locale, { en: "Convert", zh: "转换", ja: "変換", es: "Convertir", pt: "Converter" })}
        </button>

        {err && (
          <p role="alert" className="rounded-xl error-bg px-3.5 py-2.5 text-[13.5px] leading-5 text-[var(--color-bad)]">
            {err}
          </p>
        )}

        {output && (
          <div className="space-y-2">
            <p className="text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">{pick(locale, L.result)}</p>
            <textarea
              className="field mono bg-[var(--color-surface)]"
              rows={5}
              value={output}
              readOnly
              spellCheck={false}
              aria-label={pick(locale, L.result)}
            />
            <CopyButton value={output} />
          </div>
        )}

        <p className="text-[13px] leading-5 text-[var(--color-sub)]">{pick(locale, L.note)}</p>
      </div>
    </ToolPanel>
  );
}
