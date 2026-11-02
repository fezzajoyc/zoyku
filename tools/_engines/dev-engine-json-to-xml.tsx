"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton, downloadBlob } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { ConvertError, jsonToXml, toXmlName } from "../_lib/converters";

/**
 * JSON → XML 引擎:序列化逻辑全部在 tools/_lib/converters.ts 的 jsonToXml
 * (Node 可测),这里只做输入、根元素名设置与错误呈现。
 */

const L = {
  root: { en: "Root element", zh: "根元素", ja: "ルート要素", es: "Elemento raíz", pt: "Elemento raiz" },
  badJson: {
    en: "This doesn't look like valid JSON.",
    zh: "这不是合法的 JSON。",
    ja: "有効な JSON ではありません。",
    es: "Esto no parece JSON válido.",
    pt: "Isto não parece ser um JSON válido.",
  },
};

const pick = (label: Record<string, string>, locale: string) => label[locale] ?? label.en;

export function DevJsonToXmlEngine({ sample = "" }: { sample?: string }) {
  const { locale, t } = useI18n();
  const [input, setInput] = useState("");
  const [rootName, setRootName] = useState("root");

  const run = useMemo(() => {
    if (!input.trim()) return { out: "", err: null as string | null };
    let value: unknown;
    try {
      value = JSON.parse(input);
    } catch (e) {
      return { out: "", err: `${pick(L.badJson, locale)} (${e instanceof Error ? e.message : String(e)})` };
    }
    try {
      return { out: jsonToXml(value, { rootName: rootName.trim() || "root" }), err: null };
    } catch (e) {
      // ConvertError 的文案本身已面向用户;JSON.parse 之外的意外错误原样透出
      if (e instanceof ConvertError) return { out: "", err: e.message };
      return { out: "", err: e instanceof Error ? e.message : String(e) };
    }
  }, [input, rootName, locale]);

  const download = () => {
    const name = toXmlName(rootName.trim() || "root") || "converted";
    downloadBlob(new Blob([run.out], { type: "application/xml;charset=utf-8" }), `${name}.xml`);
  };

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

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[13px] font-semibold">{pick(L.root, locale)}</span>
          <input
            className="mono w-40 rounded-full border hairline px-3.5 py-1.5 text-[13px]"
            value={rootName}
            onChange={(e) => setRootName(e.target.value)}
            placeholder="root"
            spellCheck={false}
            aria-label={pick(L.root, locale)}
          />
        </div>

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
          rows={10}
          value={run.out}
          readOnly
          placeholder={t.common.output}
          spellCheck={false}
          aria-label={t.common.output}
        />

        <div className="flex flex-wrap gap-2.5">
          <CopyButton value={run.out} />
          {run.out && (
            <button
              type="button"
              onClick={download}
              className="rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)]"
            >
              {t.common.download} .xml
            </button>
          )}
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
