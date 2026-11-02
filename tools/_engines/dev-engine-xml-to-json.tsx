"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";

/**
 * XML → JSON 引擎:fast-xml-parser 动态 import(不进主包)。
 * 先用 XMLValidator 给出友好的行/列定位,再交给 XMLParser
 * (ignoreAttributes:false,属性前缀 "@",trim)。
 */

const PARSER_OPTIONS = { ignoreAttributes: false, attributeNamePrefix: "@", trimValues: true };

const L = {
  badXml: {
    en: "This doesn't look like valid XML.",
    zh: "这不是合法的 XML。",
    ja: "有効な XML ではありません。",
    es: "Esto no parece XML válido.",
    pt: "Isto não parece ser um XML válido.",
  },
};

const pick = (label: Record<string, string>, locale: string) => label[locale] ?? label.en;

export function DevXmlToJsonEngine({ sample = "" }: { sample?: string }) {
  const { locale, t } = useI18n();
  const [input, setInput] = useState("");
  const [out, setOut] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const fxpRef = useRef<typeof import("fast-xml-parser") | null>(null);

  useEffect(() => {
    let cancelled = false;
    const timer = setTimeout(async () => {
      if (!input.trim()) {
        setOut("");
        setErr(null);
        return;
      }
      try {
        if (!fxpRef.current) fxpRef.current = await import("fast-xml-parser");
        const { XMLParser, XMLValidator } = fxpRef.current;
        if (cancelled) return;
        const verdict = XMLValidator.validate(input);
        if (verdict !== true) {
          const detail = verdict.err ? ` ${verdict.err.msg} (line ${verdict.err.line})` : "";
          setOut("");
          setErr(`${pick(L.badXml, locale)}${detail}`);
          return;
        }
        const parsed = new XMLParser(PARSER_OPTIONS).parse(input);
        if (cancelled) return;
        setOut(JSON.stringify(parsed, null, 2));
        setErr(null);
      } catch (e) {
        if (!cancelled) {
          setOut("");
          setErr(`${pick(L.badXml, locale)} ${e instanceof Error ? e.message : String(e)}`);
        }
      }
    }, 200);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [input, locale]);

  return (
    <ToolPanel>
      <div className="grid gap-4 lg:grid-cols-2">
        <textarea
          className="field mono h-80"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t.common.input}
          spellCheck={false}
          aria-label={t.common.input}
        />
        <textarea
          className="field mono h-80 bg-[var(--color-surface)]"
          value={out}
          readOnly
          placeholder={t.common.output}
          spellCheck={false}
          aria-label={t.common.output}
        />
      </div>

      {err && (
        <p
          className="mono mt-4 whitespace-pre-wrap rounded-xl error-bg px-3.5 py-2.5 text-[13.5px] leading-5 text-[var(--color-bad)]"
          role="alert"
        >
          {err}
        </p>
      )}

      <div className="mt-4 flex flex-wrap gap-2.5">
        <CopyButton value={out} />
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
    </ToolPanel>
  );
}
