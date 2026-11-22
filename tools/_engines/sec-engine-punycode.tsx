"use client";

import { useState } from "react";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { Tabs, pick } from "./calc-ui";
import { useI18n } from "@/components/i18n-provider";
import { idnaEncode, idnaDecode, punycodeEncode, punycodeDecode } from "../_lib/punycode";

/**
 * CN-033:Punycode/IDN 引擎。编码(Unicode→xn--)/解码(xn--→Unicode)双向。
 * 多标签域名逐标签处理;底层 punycode npm 包(Mathias Bynens,战斗验证)。
 */

const L = {
  enc: { en: "Encode (Unicode → xn--)", zh: "编码(Unicode → xn--)", ja: "エンコード(Unicode → xn--)", es: "Codificar (Unicode → xn--)", pt: "Codificar (Unicode → xn--)" },
  dec: { en: "Decode (xn-- → Unicode)", zh: "解码(xn-- → Unicode)", ja: "デコード(xn-- → Unicode)", es: "Decodificar (xn-- → Unicode)", pt: "Decodificar (xn-- → Unicode)" },
  input: { en: "Domain name", zh: "域名", ja: "ドメイン名", es: "Nombre de dominio", pt: "Nome de domínio" },
  output: { en: "Result", zh: "结果", ja: "結果", es: "Resultado", pt: "Resultado" },
  run: { en: "Convert", zh: "转换", ja: "変換", es: "Convertir", pt: "Converter" },
  badInput: {
    en: "Invalid domain name — check the format and character set.",
    zh: "无效域名——请检查格式与字符集。",
    ja: "無効なドメイン名 — フォーマットと文字セットを確認してください。",
    es: "Nombre de dominio no válido — revise el formato y el conjunto de caracteres.",
    pt: "Nome de domínio inválido — verifique o formato e o conjunto de caracteres.",
  },
  note: {
    en: "Encodes and decodes internationalized domain names per RFC 3492 (Punycode) and RFC 5890 (IDNA). Multi-label domains are processed label by label; the xn-- prefix signals that a label is Punycode-encoded Unicode. Uses the battle-tested punycode library; everything runs locally, no DNS queries.",
    zh: "依 RFC 3492(Punycode)与 RFC 5890(IDNA)编解码国际化域名。多标签域名逐标签处理;xn-- 前缀标示该标签为 Punycode 编码的 Unicode。使用久经考验的 punycode 库;全部本机完成,不做 DNS 查询。",
    ja: "RFC 3492(Punycode)と RFC 5890(IDNA)に基づき国際化ドメイン名を符号化・復号します。マルチラベルドメインはラベルごとに処理され、xn-- プレフィックスは Punycode 符号化された Unicode を示します。実績のある punycode ライブラリを使用し、すべてローカルで動作します。",
    es: "Codifica y decodifica nombres de dominio internacionalizados según RFC 3492 (Punycode) y RFC 5890 (IDNA). Los dominios de múltiples etiquetas se procesan etiqueta por etiqueta; el prefijo xn-- indica que la etiqueta es Unicode codificado en Punycode. Usa la librería punycode probada; todo local.",
    pt: "Codifica e decodifica nomes de domínio internacionalizados conforme RFC 3492 (Punycode) e RFC 5890 (IDNA). Domínios de múltiplas etiquetas são processados etiqueta por etiqueta; o prefixo xn-- indica que a etiqueta é Unicode codificado em Punycode. Usa a biblioteca punycode comprovada; tudo local.",
  },
};

export function SecEnginePunycode() {
  const { locale } = useI18n();
  const [dir, setDir] = useState<"enc" | "dec">("enc");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const doRun = async () => {
    setErr(null);
    setBusy(true);
    if (dir === "enc") {
      const r = idnaEncode(input);
      setBusy(false);
      if (r.ok) setOutput(r.data);
      else setErr(pick(locale, L.badInput));
    } else {
      // 解码:先试 IDNA,失败则试纯 Punycode
      const idna = idnaDecode(input);
      if (idna.ok) {
        setBusy(false);
        setOutput(idna.data);
        return;
      }
      const raw = punycodeDecode(input);
      setBusy(false);
      if (raw.ok) setOutput(raw.data);
      else setErr(pick(locale, L.badInput));
    }
  };

  return (
    <ToolPanel>
      <div className="space-y-4">
        <Tabs
          options={[
            { id: "enc", label: pick(locale, L.enc) },
            { id: "dec", label: pick(locale, L.dec) },
          ]}
          value={dir}
          onChange={(v) => {
            setDir(v as "enc" | "dec");
            setOutput("");
            setErr(null);
          }}
        />

        <input
          type="text"
          className="field mono"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={pick(locale, L.input)}
          aria-label={pick(locale, L.input)}
          spellCheck={false}
          autoComplete="off"
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
            <textarea className="field mono bg-[var(--color-surface)]" rows={2} value={output} readOnly spellCheck={false} aria-label={output} />
            <CopyButton value={output} />
          </div>
        )}

        <p className="text-[13px] leading-5 text-[var(--color-sub)]">{pick(locale, L.note)}</p>
      </div>
    </ToolPanel>
  );
}
