"use client";

import { useState } from "react";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { Tabs, pick } from "./calc-ui";
import { useI18n } from "@/components/i18n-provider";
import { tomlToJson, jsonToToml, errMessage } from "../_lib/toml-convert";

/**
 * CN-022:TOML↔JSON 双向转换引擎。@iarna/toml 懒加载。
 * 两个标签:TOML→JSON / JSON→TOML。错误信息带解析器定位。
 */

const L = {
  toml: {
    en: "TOML → JSON",
    zh: "TOML → JSON",
    ja: "TOML → JSON",
    es: "TOML → JSON",
    pt: "TOML → JSON",
  },
  json: {
    en: "JSON → TOML",
    zh: "JSON → TOML",
    ja: "JSON → TOML",
    es: "JSON → TOML",
    pt: "JSON → TOML",
  },
  inToml: {
    en: "TOML input",
    zh: "TOML 输入",
    ja: "TOML 入力",
    es: "Entrada TOML",
    pt: "Entrada TOML",
  },
  inJson: {
    en: "JSON input",
    zh: "JSON 输入",
    ja: "JSON 入力",
    es: "Entrada JSON",
    pt: "Entrada JSON",
  },
  outJson: {
    en: "JSON output",
    zh: "JSON 输出",
    ja: "JSON 出力",
    es: "Salida JSON",
    pt: "Saída JSON",
  },
  outToml: {
    en: "TOML output",
    zh: "TOML 输出",
    ja: "TOML 出力",
    es: "Salida TOML",
    pt: "Saída TOML",
  },
  convert: { en: "Convert", zh: "转换", ja: "変換", es: "Convertir", pt: "Converter" },
  note: {
    en: "Powered by @iarna/toml (MIT), a spec-compliant TOML 1.0 parser. The TOML root must be a table (object) — arrays and scalars are rejected with a clear message. TOML dates become ISO date strings in JSON output; in the JSON → TOML direction date strings stay strings rather than being guessed into date types. Conversion runs locally; nothing is uploaded.",
    zh: "由 @iarna/toml(MIT)驱动,符合 TOML 1.0 规范。TOML 根必须是表(对象)——数组或标量会被明确拒绝。TOML 日期在 JSON 输出中变成 ISO 日期字符串;JSON→TOML 方向的日期字符串保持字符串,不会被猜测转换成日期类型。转换在本机完成,不上传。",
    ja: "@iarna/toml(MIT)による TOML 1.0 準拠の変換です。TOML のルートはテーブル(オブジェクト)である必要があり、配列やスカラーは明確に拒否されます。TOML の日付は JSON 出力では ISO 文字列になり、JSON→TOML 方向では日付文字列は文字列のままです。変換はローカルで行われ、アップロードはありません。",
    es: "Impulsado por @iarna/toml (MIT), un analizador compatible con TOML 1.0. La raíz TOML debe ser una tabla (objeto); los arrays y escalares se rechazan con un mensaje claro. Las fechas TOML se convierten en cadenas ISO en la salida JSON; en la dirección JSON → TOML las cadenas de fecha permanecen como cadenas. La conversión es local; nada se sube.",
    pt: "Impulsionado por @iarna/toml (MIT), um parser compatível com TOML 1.0. A raiz TOML deve ser uma tabela (objeto); arrays e escalares são rejeitados com mensagem clara. Datas TOML viram strings ISO na saída JSON; na direção JSON → TOML as strings de data permanecem strings. A conversão é local; nada é enviado.",
  },
};

export function DevEngineToml() {
  const { locale } = useI18n();
  const [dir, setDir] = useState<"t2j" | "j2t">("t2j");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const doConvert = async () => {
    setErr(null);
    setBusy(true);
    const r = dir === "t2j" ? await tomlToJson(input) : await jsonToToml(input);
    setBusy(false);
    if (!r.ok) {
      setOutput("");
      setErr(errMessage(r, locale));
      return;
    }
    setOutput("json" in r ? r.json : r.toml);
  };

  return (
    <ToolPanel>
      <div className="space-y-4">
        <Tabs
          options={[
            { id: "t2j", label: pick(locale, L.toml) },
            { id: "j2t", label: pick(locale, L.json) },
          ]}
          value={dir}
          onChange={(v) => {
            setDir(v as "t2j" | "j2t");
            setOutput("");
            setErr(null);
          }}
        />

        <textarea
          className="field mono"
          rows={8}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={dir === "t2j" ? pick(locale, L.inToml) : pick(locale, L.inJson)}
          spellCheck={false}
          aria-label={dir === "t2j" ? pick(locale, L.inToml) : pick(locale, L.inJson)}
        />

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
            <p className="text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">
              {dir === "t2j" ? pick(locale, L.outJson) : pick(locale, L.outToml)}
            </p>
            <textarea
              className="field mono bg-[var(--color-surface)]"
              rows={10}
              value={output}
              readOnly
              spellCheck={false}
              aria-label={dir === "t2j" ? pick(locale, L.outJson) : pick(locale, L.outToml)}
            />
            <CopyButton value={output} />
          </div>
        )}

        <p className="text-[13px] leading-5 text-[var(--color-sub)]">{pick(locale, L.note)}</p>
      </div>
    </ToolPanel>
  );
}
