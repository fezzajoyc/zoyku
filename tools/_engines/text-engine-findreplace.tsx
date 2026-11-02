"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import type { Locale } from "@/lib/site";

const L = {
  find: { en: "Find", zh: "查找内容", ja: "検索", es: "Buscar", pt: "Localizar" },
  replaceWith: { en: "Replace with", zh: "替换为", ja: "置換後の文字列", es: "Reemplazar con", pt: "Substituir por" },
  caseSensitive: { en: "Case sensitive", zh: "区分大小写", ja: "大文字小文字を区別", es: "Distinguir mayúsculas", pt: "Diferenciar maiúsculas" },
  wholeWord: { en: "Whole words only", zh: "仅整词匹配", ja: "単語単位で検索", es: "Solo palabras completas", pt: "Apenas palavras inteiras" },
  regex: { en: "Regular expression", zh: "正则表达式", ja: "正規表現", es: "Expresión regular", pt: "Expressão regular" },
  matches: { en: "{n} match(es)", zh: "{n} 处匹配", ja: "{n} 件一致", es: "{n} coincidencia(s)", pt: "{n} ocorrência(s)" },
  invalidRegex: {
    en: "Invalid regular expression — check your pattern.",
    zh: "正则表达式无效,请检查表达式。",
    ja: "正規表現が無効です。パターンを確認してください。",
    es: "Expresión regular no válida: revisa el patrón.",
    pt: "Expressão regular inválida — verifique o padrão.",
  },
} as const;

function pick(rec: Record<string, string>, locale: Locale): string {
  return rec[locale] ?? rec.en;
}

function fill(tpl: string, n: number): string {
  return tpl.replace("{n}", String(n));
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** 查找替换引擎:普通文本/整词/正则三种模式,实时计数并替换。 */
export function FindReplace() {
  const { locale, t } = useI18n();
  const [input, setInput] = useState("");
  const [find, setFind] = useState("");
  const [replace, setReplace] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [wholeWord, setWholeWord] = useState(false);
  const [isRegex, setIsRegex] = useState(false);

  const { output, matchCount, error } = useMemo(() => {
    if (find === "") return { output: input, matchCount: 0, error: "" };
    let re: RegExp;
    try {
      const source = isRegex ? find : wholeWord ? `\\b(?:${escapeRegExp(find)})\\b` : escapeRegExp(find);
      re = new RegExp(source, `g${caseSensitive ? "" : "i"}`);
    } catch {
      return { output: input, matchCount: 0, error: "regex" };
    }
    const matches = input.match(re);
    const count = matches ? matches.length : 0;
    // 普通模式下把 $ 转义,保证替换文本按字面插入;正则模式保留 $1 等捕获组引用
    const replacement = isRegex ? replace : replace.replace(/\$/g, "$$$$");
    try {
      return { output: input.replace(re, replacement), matchCount: count, error: "" };
    } catch {
      return { output: input, matchCount: 0, error: "regex" };
    }
  }, [input, find, replace, caseSensitive, wholeWord, isRegex]);

  const options = [
    { key: "case", checked: caseSensitive, set: setCaseSensitive, label: L.caseSensitive },
    { key: "word", checked: wholeWord, set: setWholeWord, label: L.wholeWord, disabled: isRegex },
    { key: "regex", checked: isRegex, set: setIsRegex, label: L.regex },
  ] as const;

  return (
    <ToolPanel>
      <div className="space-y-4">
        <textarea
          className="field mono"
          rows={8}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t.common.input}
          spellCheck={false}
          aria-label={t.common.input}
        />
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-[13px] font-medium text-[var(--color-sub)]">{pick(L.find, locale)}</span>
            <input
              type="text"
              className="field mono"
              value={find}
              onChange={(e) => setFind(e.target.value)}
              spellCheck={false}
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-[13px] font-medium text-[var(--color-sub)]">{pick(L.replaceWith, locale)}</span>
            <input
              type="text"
              className="field mono"
              value={replace}
              onChange={(e) => setReplace(e.target.value)}
              spellCheck={false}
            />
          </label>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {options.map((o) => (
            <label key={o.key} className="inline-flex cursor-pointer items-center gap-2 text-[14px]">
              <input
                type="checkbox"
                className="accent-[var(--color-accent)]"
                checked={o.checked}
                disabled={"disabled" in o ? o.disabled : false}
                onChange={(e) => o.set(e.target.checked)}
              />
              {pick(o.label, locale)}
            </label>
          ))}
        </div>
        {error !== "" ? (
          <p className="text-[13px] font-medium text-[var(--color-bad)]">{pick(L.invalidRegex, locale)}</p>
        ) : find !== "" ? (
          <p className="text-[13px] text-[var(--color-sub)]">{fill(pick(L.matches, locale), matchCount)}</p>
        ) : null}
        <textarea
          className="field mono bg-[var(--color-surface)]"
          rows={8}
          value={output}
          readOnly
          placeholder={t.common.output}
          spellCheck={false}
          aria-label={t.common.output}
        />
        <div className="flex flex-wrap gap-2.5">
          <CopyButton value={output} />
          <button
            type="button"
            onClick={() => setInput("")}
            className="rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)]"
          >
            {t.common.clear}
          </button>
        </div>
      </div>
    </ToolPanel>
  );
}
