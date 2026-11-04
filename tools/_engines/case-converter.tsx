"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import {
  toAlternating, toCamel, toConstant, toFullWidth, toHalfWidth,
  toInverse, toKebab, toPascal, toSentenceCase, toSnake, toTitleCase,
} from "../_lib/transforms";

type Mode = { id: string; fn: (s: string) => string; label: Record<string, string> };

const MODES: Mode[] = [
  { id: "upper", fn: (s) => s.toUpperCase(), label: { en: "UPPERCASE", zh: "全部大写", ja: "大文字", es: "MAYÚSCULAS", pt: "MAIÚSCULAS" } },
  { id: "lower", fn: (s) => s.toLowerCase(), label: { en: "lowercase", zh: "全部小写", ja: "小文字", es: "minúsculas", pt: "minúsculas" } },
  { id: "title", fn: toTitleCase, label: { en: "Title Case", zh: "标题式大小写", ja: "タイトルケース", es: "Tipo Título", pt: "Tipo Título" } },
  { id: "sentence", fn: toSentenceCase, label: { en: "Sentence case", zh: "句首大写", ja: "センテンスケース", es: "Tipo oración", pt: "Tipo sentença" } },
  { id: "camel", fn: toCamel, label: { en: "camelCase", zh: "camelCase", ja: "camelCase", es: "camelCase", pt: "camelCase" } },
  { id: "pascal", fn: toPascal, label: { en: "PascalCase", zh: "PascalCase", ja: "PascalCase", es: "PascalCase", pt: "PascalCase" } },
  { id: "snake", fn: toSnake, label: { en: "snake_case", zh: "snake_case", ja: "snake_case", es: "snake_case", pt: "snake_case" } },
  { id: "kebab", fn: toKebab, label: { en: "kebab-case", zh: "kebab-case", ja: "kebab-case", es: "kebab-case", pt: "kebab-case" } },
  { id: "constant", fn: toConstant, label: { en: "CONSTANT_CASE", zh: "CONSTANT_CASE", ja: "CONSTANT_CASE", es: "CONSTANT_CASE", pt: "CONSTANT_CASE" } },
  { id: "alternating", fn: toAlternating, label: { en: "aLtErNaTiNg", zh: "大小写交替", ja: "交互", es: "aLtErNo", pt: "aLtErNaDo" } },
  { id: "inverse", fn: toInverse, label: { en: "iNVERSE cASE", zh: "大小写互换", ja: "反転", es: "cASO iNVERSO", pt: "cASO iNVERSO" } },
  { id: "fullwidth", fn: toFullWidth, label: { en: "Full-width", zh: "全角", ja: "全角", es: "Ancho completo", pt: "Largura total" } },
  { id: "halfwidth", fn: toHalfWidth, label: { en: "Half-width", zh: "半角", ja: "半角", es: "Ancho medio", pt: "Largura média" } },
];

const cjkHint: Record<string, string> = {
  en: "Chinese has no upper/lowercase — those characters pass through unchanged. Try Full-width / Half-width for CJK-specific conversion.",
  zh: "中文没有大小写之分——汉字原样保留。需要中文相关转换请用「全角 / 半角」。",
  ja: "中国語・日本語に大文字小文字はありません——そのまま保持されます。全角 / 半角変換をご利用ください。",
  es: "El chino no tiene mayúsculas/minúsculas: esos caracteres se mantienen igual. Prueba Ancho completo / Ancho medio.",
  pt: "O chinês não tem maiúsculas/minúsculas — os caracteres passam inalterados. Experimente Largura total / Largura média.",
};

export function CaseConverter() {
  const { locale, t } = useI18n();
  const [input, setInput] = useState("");
  const [mode, setMode] = useState("title");

  const output = useMemo(() => {
    const m = MODES.find((x) => x.id === mode)!;
    try {
      return m.fn(input);
    } catch {
      return input;
    }
  }, [input, mode]);

  // 中文没有大小写概念:case 类模式下检测到 CJK 时给诚实提示
  const hasCJK = /[\u4e00-\u9fff\u3040-\u30ff\uac00-\ud7af]/.test(input);
  const caseOnlyMode = ["upper", "lower", "title", "sentence"].includes(mode);

  return (
    <ToolPanel>
      <div className="mb-4 flex flex-wrap gap-2">
        {MODES.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setMode(m.id)}
            className={`mono rounded-full border px-3 py-1.5 text-[13px] font-medium transition-colors ${
              mode === m.id
                ? "border-transparent bg-[var(--color-ink)] text-white dark:bg-white dark:text-[#1d1d1f]"
                : "hairline hover:bg-[var(--color-surface)]"
            }`}
          >
            {m.label[locale] ?? m.label.en}
          </button>
        ))}
      </div>
      <textarea
        className="field"
        rows={6}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={t.common.input}
        aria-label={t.common.input}
      />
      {hasCJK && caseOnlyMode && (
        <p className="mt-3 rounded-xl bg-[rgba(0,113,227,0.06)] px-3.5 py-2.5 text-[13px] leading-5 text-[var(--color-accent-strong)]">
          {cjkHint[locale] ?? cjkHint.en}
        </p>
      )}
      <textarea
        className="field mono mt-3 bg-[var(--color-surface)]"
        rows={6}
        value={output}
        readOnly
        placeholder={t.common.output}
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
