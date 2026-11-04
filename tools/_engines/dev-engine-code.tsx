"use client";

import { useEffect, useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton, formatBytes } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { TRANSFORMS } from "../_lib/transform-registry";

/**
 * Developer 类目的格式化/压缩/校验通用引擎:
 * transform 由服务端工具文件以注册表 ID 传入(mode);
 * sql-format 例外——引擎内部动态 import sql-formatter,不走注册表。
 */

type Props = {
  /** TRANSFORMS 注册表 ID,或特殊值 "sql-format" */
  mode: string;
  /** 显示 2/4/Tab 缩进选择(json-beautify 用) */
  indent?: boolean;
  /** 显示输入/输出字节数与节省百分比 */
  showSize?: boolean;
  /** 校验器模式:结果为 "OK" 显示绿色状态,否则红色错误;合法时顺带展示格式化结果 */
  validator?: "json" | "xml";
  /** json-beautify 显示 Sort keys A→Z 开关(竞品标配功能) */
  sort?: boolean;
  sample?: string;
};

const INDENT_LABELS: Record<string, Record<string, string>> = {
  "2": { en: "2 spaces", zh: "2 空格", ja: "2 スペース", es: "2 espacios", pt: "2 espaços" , fr: "2 espaces", de: "2 Leerzeichen", ru: "2 пробела", it: "2 spazi", tr: "2 boşluk", ko: "공백 2", ar: "مسافتان", hi: "2 स्पेस", id: "2 spasi", vi: "2 dấu cách" },
  "4": { en: "4 spaces", zh: "4 空格", ja: "4 スペース", es: "4 espacios", pt: "4 espaços" , fr: "4 espaces", de: "4 Leerzeichen", ru: "4 пробела", it: "4 spazi", tr: "4 boşluk", ko: "공백 4", ar: "4 مسافات", hi: "4 स्पेस", id: "4 spasi", vi: "4 dấu cách" },
  tab: { en: "Tab", zh: "Tab", ja: "タブ", es: "Tab", pt: "Tab" , fr: "Tabulation", de: "Tab", ru: "Табуляция", it: "Tab", tr: "Sekme", ko: "탭", ar: "علامة جدولة", hi: "टैब", id: "Tab", vi: "Tab" },
};

const VALID_LABELS: Record<string, Record<string, string>> = {
  json: { en: "Valid JSON", zh: "JSON 格式有效", ja: "JSON は有効です", es: "JSON válido", pt: "JSON válido" , fr: "JSON valide", de: "Gültiges JSON", ru: "Корректный JSON", it: "JSON valido", tr: "Geçerli JSON", ko: "유효한 JSON", ar: "JSON صالح", hi: "मान्य JSON", id: "JSON valid", vi: "JSON hợp lệ" },
  xml: { en: "Valid XML", zh: "XML 格式有效", ja: "XML は有効です", es: "XML válido", pt: "XML válido" , fr: "XML valide", de: "Gültiges XML", ru: "Корректный XML", it: "XML valido", tr: "Geçerli XML", ko: "유효한 XML", ar: "XML صالح", hi: "मान्य XML", id: "XML valid", vi: "XML hợp lệ" },
};



const SORT_LABELS: Record<string, string> = {
  en: "Sort keys A→Z",
  zh: "键名 A→Z 排序",
  ja: "キーを A→Z でソート",
  es: "Ordenar claves A→Z",
  pt: "Ordenar chaves A→Z",
  fr: "Trier les clés A→Z",
  de: "Schlüssel A→Z sortieren",
  ru: "Сортировать ключи A→Z",
  it: "Ordina chiavi A→Z",
  tr: "Anahtarları A→Z sırala",
  ko: "키 A→Z 정렬",
  ar: "ترتيب المفاتيح A→Z",
  hi: "कुंजियाँ A→Z क्रमित करें",
  id: "Urutkan kunci A→Z",
  vi: "Sắp xếp khóa A→Z",
};
const utf8Bytes = (s: string) => new TextEncoder().encode(s).length;

export function DevCodeEngine({ mode, indent = false, showSize = false, validator, sort = false, sample }: Props) {
  const { locale, t } = useI18n();
  const [input, setInput] = useState("");
  const [indentChoice, setIndentChoice] = useState<"2" | "4" | "tab">("2");
  const [sortOn, setSortOn] = useState(false);
  const [sqlState, setSqlState] = useState<{ out: string; err: string | null }>({ out: "", err: null });

  const isSql = mode === "sql-format";

  useEffect(() => {
    if (!isSql) return;
    let cancelled = false;
    const timer = setTimeout(() => {
      if (!input.trim()) {
        setSqlState({ out: "", err: null });
        return;
      }
      (async () => {
        try {
          const { format } = await import("sql-formatter");
          const res = format(input, { tabWidth: 2, keywordCase: "upper" });
          if (!cancelled) setSqlState({ out: res, err: null });
        } catch (e) {
          if (!cancelled) setSqlState({ out: "", err: e instanceof Error ? e.message : String(e) });
        }
      })();
    }, 250);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [input, isSql]);

  const run = useMemo(() => {
    if (isSql) return { out: sqlState.out, err: sqlState.err, valid: null as boolean | null };
    const fn = TRANSFORMS[mode];
    if (!fn) return { out: "", err: null, valid: null as boolean | null };
    try {
      const out = fn(input, { four: indentChoice === "4", tab: indentChoice === "tab", sort: sortOn });
      if (validator) {
        if (out === "OK") {
          const prettyFn = TRANSFORMS[validator === "json" ? "json-beautify" : "xml-format"];
          let pretty = "";
          try {
            pretty = prettyFn ? prettyFn(input, {}) : "";
          } catch {
            pretty = "";
          }
          return { out: pretty, err: null, valid: true as const };
        }
        if (out === "") return { out: "", err: null, valid: null as boolean | null };
        return { out: "", err: out, valid: false as const };
      }
      return { out, err: null, valid: null as boolean | null };
    } catch (e) {
      return { out: "", err: e instanceof Error ? e.message : String(e), valid: null as boolean | null };
    }
  }, [input, mode, indentChoice, sortOn, validator, isSql, sqlState]);

  const sizeInfo = useMemo(() => {
    if (!showSize || !input || !run.out || run.out === input) return null;
    const inB = utf8Bytes(input);
    const outB = utf8Bytes(run.out);
    const saved = inB > 0 ? Math.round((1 - outB / inB) * 100) : 0;
    return { inB, outB, saved };
  }, [showSize, input, run.out]);

  return (
    <ToolPanel>
      <div className="space-y-4">
        <textarea
          className="field mono"
          rows={9}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t.common.input}
          spellCheck={false}
          aria-label={t.common.input}
        />

        {indent && (
          <div className="flex flex-wrap gap-2">
            {(["2", "4", "tab"] as const).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setIndentChoice(key)}
                className={`mono rounded-full border px-3 py-1.5 text-[13px] font-medium transition-colors ${
                  indentChoice === key
                    ? "border-transparent bg-[var(--color-ink)] text-white dark:bg-white dark:text-[#1d1d1f]"
                    : "hairline hover:bg-[var(--color-surface)]"
                }`}
              >
                {INDENT_LABELS[key][locale] ?? INDENT_LABELS[key].en}
              </button>
            ))}
          </div>
        )}

        {sort && mode === "json-beautify" && (
          <button
            type="button"
            onClick={() => setSortOn((v) => !v)}
            aria-pressed={sortOn}
            className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
              sortOn
                ? "border-transparent bg-[var(--color-ink)] text-white dark:bg-white dark:text-[#1d1d1f]"
                : "hairline hover:bg-[var(--color-surface)]"
            }`}
          >
            {SORT_LABELS[locale] ?? SORT_LABELS.en}
          </button>
        )}

        {run.valid === true && (
          <p
            className="flex items-center gap-1.5 text-[14px] font-medium text-[var(--color-good)]"
            role="status"
          >
            <span aria-hidden>✓</span>
            {VALID_LABELS[validator ?? "json"][locale] ?? VALID_LABELS[validator ?? "json"].en}
          </p>
        )}
        {run.err && (
          <p
            className="mono whitespace-pre-wrap rounded-xl error-bg px-3.5 py-2.5 text-[13.5px] leading-5 text-[var(--color-bad)]"
            role="alert"
          >
            {run.err}
          </p>
        )}

        <textarea
          className="field mono bg-[var(--color-surface)]"
          rows={9}
          value={run.out}
          readOnly
          placeholder={t.common.output}
          spellCheck={false}
          aria-label={t.common.output}
        />

        {sizeInfo && (
          <p className="mono text-[13px] text-[var(--color-sub)]">
            {formatBytes(sizeInfo.inB)} → {formatBytes(sizeInfo.outB)}
            {sizeInfo.saved > 0 && <span className="text-[var(--color-good)]"> · −{sizeInfo.saved}%</span>}
          </p>
        )}

        <div className="flex flex-wrap gap-2.5">
          <CopyButton value={run.out} />
          <button
            type="button"
            onClick={() => setInput("")}
            className="rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)]"
          >
            {t.common.clear}
          </button>
          {sample && input === "" && (
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
