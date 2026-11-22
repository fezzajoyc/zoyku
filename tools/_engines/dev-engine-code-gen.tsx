"use client";

import { useState } from "react";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { Tabs, pick } from "./calc-ui";
import { useI18n } from "@/components/i18n-provider";
import { jsonToCode, CODE_LANGS, type CodeLang } from "../_lib/json-code-gen";

/**
 * CN-032:JSON → Java/C#/Golang 类生成引擎。三语言 Tab,输入 JSON,输出类代码。
 */

const L = {
  input: {
    en: "JSON input",
    zh: "JSON 输入",
    ja: "JSON 入力",
    es: "Entrada JSON",
    pt: "Entrada JSON",
  },
  output: {
    en: "Generated code",
    zh: "生成的代码",
    ja: "生成されたコード",
    es: "Código generado",
    pt: "Código gerado",
  },
  run: { en: "Generate", zh: "生成", ja: "生成", es: "Generar", pt: "Gerar" },
  badJson: {
    en: "Invalid JSON — check for trailing commas, unquoted keys or mismatched brackets.",
    zh: "非法 JSON——检查尾逗号、未引号的键或括号不匹配。",
    ja: "無効な JSON — 末尾カンマ、引用符なしのキー、括弧の不一致を確認してください。",
    es: "JSON no válido — revise comas finales, claves sin comillas o paréntesis sin cerrar.",
    pt: "JSON inválido — verifique vírgulas finais, chaves sem aspas ou parênteses não fechados.",
  },
  notObject: {
    en: "The JSON root must be an object (wrap arrays as { \"items\": [...] }).",
    zh: "JSON 根必须是对象——数组请包一层 { \"items\": [...] }。",
    ja: "JSON のルートはオブジェクトである必要があります — 配列は { \"items\": [...] } のように包んでください。",
    es: "La raíz JSON debe ser un objeto — envuelva arrays como { \"items\": [...] }.",
    pt: "A raiz JSON deve ser um objeto — envolva arrays como { \"items\": [...] }.",
  },
  note: {
    en: "Generates class definitions from a JSON document for Java (PascalCase classes, camelCase fields, List<T>), C# (PascalCase properties with get/set, List<T>) and Go (PascalCase structs with json tags). Nested objects become separate classes; arrays of objects are merged (all keys unioned) to produce a single class definition. The JSON root must be an object. Everything runs locally; no network calls.",
    zh: "从 JSON 文档生成 Java(PascalCase 类名、camelCase 字段、List<T>)、C#(PascalCase 属性带 get/set、List<T>)与 Go(PascalCase struct 带 json tag)的类定义。嵌套对象生成独立类;对象数组合并全部键生成单个类。JSON 根必须是对象。全部本机完成,无网络调用。",
    ja: "JSON ドキュメントから Java(PascalCase クラス、camelCase フィールド、List<T>)、C#(PascalCase プロパティ、List<T>)、Go(PascalCase struct、json tag)のクラス定義を生成します。ネストしたオブジェクトは独立したクラスになります。JSON のルートはオブジェクトである必要があります。すべてローカル処理です。",
    es: "Genera definiciones de clase a partir de un documento JSON para Java (clases PascalCase, campos camelCase, List<T>), C# (propiedades PascalCase con get/set, List<T>) y Go (structs PascalCase con json tags). Los objetos anidados se convierten en clases separadas. La raíz JSON debe ser un objeto. Todo local.",
    pt: "Gera definições de classe a partir de um documento JSON para Java (classes PascalCase, campos camelCase, List<T>), C# (propriedades PascalCase com get/set, List<T>) e Go (structs PascalCase com json tags). Objetos aninhados tornam-se classes separadas. A raiz JSON deve ser um objeto. Tudo local.",
  },
};

export function DevEngineCodeGen() {
  const { locale } = useI18n();
  const [lang, setLang] = useState<CodeLang>("java");
  const [rootName, setRootName] = useState("Root");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const errText = (code: string, message?: string) => {
    if (code === "badJson") return pick(locale, L.badJson);
    if (code === "notObject") return pick(locale, L.notObject);
    return message ?? pick(locale, L.badJson);
  };

  const doRun = async () => {
    setErr(null);
    setBusy(true);
    const r = jsonToCode(input, lang, rootName);
    setBusy(false);
    if (r.ok) setOutput(r.code);
    else {
      setOutput("");
      setErr(errText(r.code, r.message));
    }
  };

  const langLabels: Record<CodeLang, string> = {
    java: "Java",
    csharp: "C#",
    go: "Go",
  };

  return (
    <ToolPanel>
      <div className="space-y-4">
        <div className="space-y-2">
          <p className="text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">Target language</p>
          <div className="flex flex-wrap gap-2" role="group">
            {CODE_LANGS.map((l) => (
              <button
                key={l}
                type="button"
                aria-pressed={lang === l}
                onClick={() => setLang(l)}
                className={`mono rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                  lang === l
                    ? "border-transparent bg-[var(--color-ink)] text-white dark:bg-white dark:text-[#1d1d1f]"
                    : "hairline hover:bg-[var(--color-surface)]"
                }`}
              >
                {langLabels[l]}
              </button>
            ))}
          </div>
        </div>

        <input
          type="text"
          className="field mono"
          value={rootName}
          onChange={(e) => setRootName(e.target.value)}
          placeholder="Root"
          aria-label="Root class name"
          spellCheck={false}
        />

        <textarea
          className="field mono"
          rows={6}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={pick(locale, L.input)}
          spellCheck={false}
          aria-label={pick(locale, L.input)}
        />

        <button
          type="button"
          onClick={doRun}
          disabled={busy || !input.trim()}
          className="rounded-full bg-[var(--color-ink)] px-4 py-2 text-[13.5px] font-medium text-white dark:bg-white dark:text-[#1d1d1f] transition-opacity disabled:opacity-40"
        >
          {busy ? "…" : pick(locale, L.run)}
        </button>

        {err && (
          <p role="alert" className="rounded-xl error-bg px-3.5 py-2.5 text-[13.5px] leading-5 text-[var(--color-bad)]">
            {err}
          </p>
        )}

        {output && (
          <div className="space-y-2">
            <p className="text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">{pick(locale, L.output)}</p>
            <textarea
              className="field mono bg-[var(--color-surface)]"
              rows={12}
              value={output}
              readOnly
              spellCheck={false}
              aria-label={pick(locale, L.output)}
            />
            <CopyButton value={output} />
          </div>
        )}

        <p className="text-[13px] leading-5 text-[var(--color-sub)]">{pick(locale, L.note)}</p>
      </div>
    </ToolPanel>
  );
}
