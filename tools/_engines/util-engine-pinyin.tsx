"use client";

import { useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { pick } from "./calc-ui";
import { convertToPinyin, type PinyinMode } from "../_lib/pinyin-convert";

/**
 * CN-014:汉字转拼音引擎。四种模式:带声调/声调数字/无声调/首字母。
 * pinyin-pro 懒加载(词典 0.91MB unpacked),多音字按词组语境自动校正。
 */

const L = {
  tab: {
    en: "Chinese text input",
    zh: "要转换的汉字",
    ja: "変換する中国語テキスト",
    es: "Texto chino a convertir",
    pt: "Texto chinês a converter",
  },
  mode: { en: "Output mode", zh: "输出模式", ja: "出力モード", es: "Modo de salida", pt: "Modo de saída" },
  result: { en: "Pinyin result", zh: "拼音结果", ja: "ピンイン結果", es: "Resultado en Pinyin", pt: "Resultado em Pinyin" },
  convert: { en: "Convert", zh: "转换", ja: "変換", es: "Convertir", pt: "Converter" },
  charCount: { en: "{n} characters", zh: "{n} 个字符", ja: "{n} 文字", es: "{n} caracteres", pt: "{n} caracteres" },
  noChinese: {
    en: "No Chinese characters detected — paste text containing 汉字.",
    zh: "未检测到汉字——请输入包含汉字的文本。",
    ja: "中国語の文字が検出されません — 漢字を含むテキストを入力してください。",
    es: "No se detectaron caracteres chinos: pega texto que contenga 汉字.",
    pt: "Nenhum caractere chinês detectado — cole texto contendo 汉字.",
  },
  tooLong: {
    en: "Text exceeds the 50,000-character limit — split it into parts.",
    zh: "超出 50,000 字上限——请分段处理。",
    ja: "5万字の上限を超えました — 分割して処理してください。",
    es: "El texto supera el límite de 50,000 caracteres: divídelo en partes.",
    pt: "O texto excede o limite de 50.000 caracteres: divida em partes.",
  },
  note: {
    en: "Powered by pinyin-pro (MIT). Polyphonic characters (多音字) are resolved from context — 重庆 → chóng qìng, not zhòng qìng. Conversion runs locally; text never leaves this tab.",
    zh: "由 pinyin-pro(MIT)驱动。多音字按词组语境自动校正——重庆读 chóng qìng 而非 zhòng qìng。转换在本机完成,文本不会离开此标签页。",
    ja: "pinyin-pro(MIT)によるローカル変換。多音字は文脈から解決されます(重慶 → chóng qìng)。テキストはこのタブから出ません。",
    es: "Funciona localmente con pinyin-pro (MIT). Los caracteres polifónicos (多音字) se resuelven por contexto: 重庆 → chóng qìng, no zhòng qìng. El texto nunca sale de esta pestaña.",
    pt: "Funciona localmente com pinyin-pro (MIT). Caracteres polifônicos (多音字) são resolvidos pelo contexto: 重庆 → chóng qìng, não zhòng qìng. O texto nunca sai desta aba.",
  },
};

const MODE_LABELS: Record<PinyinMode, { en: string; zh: string; ja: string; es: string; pt: string }> = {
  tone: {
    en: "Tone marks (zhōng wén)",
    zh: "带声调(zhōng wén)",
    ja: "声調記号(zhōng wén)",
    es: "Tonos (zhōng wén)",
    pt: "Tons (zhōng wén)",
  },
  num: {
    en: "Tone numbers (zhong1)",
    zh: "声调数字(zhong1)",
    ja: "声調数字(zhong1)",
    es: "Números de tono (zhong1)",
    pt: "Números de tom (zhong1)",
  },
  none: {
    en: "No tones (zhong)",
    zh: "无声调(zhong)",
    ja: "声調なし(zhong)",
    es: "Sin tonos (zhong)",
    pt: "Sem tons (zhong)",
  },
  first: {
    en: "First letters (z w)",
    zh: "首字母(z w)",
    ja: "頭文字(z w)",
    es: "Iniciales (z w)",
    pt: "Iniciais (z w)",
  },
};

export function UtilEnginePinyin() {
  const { locale } = useI18n();
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<PinyinMode>("tone");
  const [output, setOutput] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const doConvert = async () => {
    setErr(null);
    setBusy(true);
    const r = await convertToPinyin(input, mode);
    setBusy(false);
    if (r.ok) setOutput(r.text);
    else {
      setOutput("");
      setErr(pick(locale, r.code === "noChinese" ? L.noChinese : L.tooLong));
    }
  };

  return (
    <ToolPanel>
      <div className="space-y-4">
        <div className="space-y-2">
          <p className="text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">{pick(locale, L.mode)}</p>
          <div className="flex flex-wrap gap-2" role="group">
            {(Object.keys(MODE_LABELS) as PinyinMode[]).map((m) => (
              <button
                key={m}
                type="button"
                aria-pressed={mode === m}
                onClick={() => setMode(m)}
                className={`mono rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                  mode === m
                    ? "border-transparent bg-[var(--color-ink)] text-white dark:bg-white dark:text-[#1d1d1f]"
                    : "hairline hover:bg-[var(--color-surface)]"
                }`}
              >
                {pick(locale, MODE_LABELS[m])}
              </button>
            ))}
          </div>
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
        {input && (
          <p className="text-[12.5px] text-[var(--color-sub)]">
            {pick(locale, L.charCount).replace("{n}", String(input.length))}
          </p>
        )}

        <button
          type="button"
          onClick={doConvert}
          disabled={busy || !input.trim()}
          className="rounded-full bg-[var(--color-ink)] px-4 py-2 text-[13.5px] font-medium text-white dark:bg-white dark:text-[#1d1d1f] transition-opacity disabled:opacity-40"
        >
          {busy ? "…" : pick(locale, L.convert)}
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
