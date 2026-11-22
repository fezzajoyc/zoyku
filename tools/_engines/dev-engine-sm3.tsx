"use client";

import { useState } from "react";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { pick } from "./calc-ui";
import { useI18n } from "@/components/i18n-provider";
import { computeSm3, type Sm3InputFormat } from "../_lib/sm3-hash";

/**
 * CN-017:SM3 国密哈希引擎。输入 text/hex/base64 → 输出 hex + base64 双行。
 * sm-crypto 懒加载。结果即时显示(输入防抖省略——SM3 极快,手动按钮保持与站内一致)。
 */

const L = {
  input: {
    en: "Input",
    zh: "输入",
    ja: "入力",
    es: "Entrada",
    pt: "Entrada",
  },
  format: { en: "Input format", zh: "输入格式", ja: "入力形式", es: "Formato de entrada", pt: "Formato de entrada" },
  result: { en: "Digest", zh: "摘要结果", ja: "ダイジェスト", es: "Resumen", pt: "Resumo" },
  convert: { en: "Compute", zh: "计算", ja: "計算", es: "Calcular", pt: "Calcular" },
  charCount: { en: "{n} bytes", zh: "{n} 字节", ja: "{n} バイト", es: "{n} bytes", pt: "{n} bytes" },
  badHex: {
    en: "Invalid hex — input must be an even-length string of 0-9 a-f A-F.",
    zh: "无效十六进制——必须为偶数长度的 0-9 a-f A-F 字符串。",
    ja: "無効な 16 進数 — 0-9 a-f A-F の偶数長の文字列である必要があります。",
    es: "Hexadecimal no válido: debe ser una cadena de longitud par con 0-9 a-f A-F.",
    pt: "Hexadecimal inválido: deve ser uma cadeia de comprimento par com 0-9 a-f A-F.",
  },
  badBase64: {
    en: "Invalid Base64 — standard alphabet with padding at the end only.",
    zh: "无效 Base64——标准字母表,padding 只能出现在末尾。",
    ja: "無効な Base64 — 標準アルファベットでパディングは末尾のみ。",
    es: "Base64 no válido: alfabeto estándar con relleno solo al final.",
    pt: "Base64 inválido: alfabeto padrão com preenchimento apenas no final.",
  },
  note: {
    en: "SM3 (GB/T 32905-2016) is the Chinese national-standard cryptographic hash — same 256-bit digest length as SHA-256, required by Chinese commercial cryptography and e-signature workflows. Computed locally with sm-crypto; your data never leaves this tab.",
    zh: "SM3(GB/T 32905-2016)是中国商用密码哈希标准——与 SHA-256 同为 256 位摘要,用于国密体系、电子签章等场景。由本机 sm-crypto 计算,数据不会离开此标签页。",
    ja: "SM3(GB/T 32905-2016)は中国の国家暗号ハッシュ標準 — SHA-256 と同じ 256 ビットのダイジェスト長を持ちます。ローカルの sm-crypto で計算され、データはこのタブから出ません。",
    es: "SM3 (GB/T 32905-2016) es el estándar chino de hash criptográfico — longitud de resumen de 256 bits igual que SHA-256, requerido por flujos de criptografía comercial china y firma electrónica. Calculado localmente con sm-crypto; sus datos nunca salen de esta pestaña.",
    pt: "SM3 (GB/T 32905-2016) é o padrão chinês de hash criptográfico — comprimento de resumo de 256 bits igual ao SHA-256, exigido por fluxos de criptografia comercial chinesa e assinatura eletrônica. Calculado localmente com sm-crypto; seus dados nunca saem desta aba.",
  },
};

const FORMAT_LABELS: Record<Sm3InputFormat, { en: string; zh: string; ja: string; es: string; pt: string }> = {
  text: { en: "Text (UTF-8)", zh: "文本(UTF-8)", ja: "テキスト(UTF-8)", es: "Texto (UTF-8)", pt: "Texto (UTF-8)" },
  hex: { en: "Hex", zh: "十六进制", ja: "16 進数", es: "Hexadecimal", pt: "Hexadecimal" },
  base64: { en: "Base64", zh: "Base64", ja: "Base64", es: "Base64", pt: "Base64" },
};

export function DevEngineSm3() {
  const { locale } = useI18n();
  const [input, setInput] = useState("");
  const [format, setFormat] = useState<Sm3InputFormat>("text");
  const [result, setResult] = useState<{ hex: string; base64: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const doCompute = async () => {
    setErr(null);
    setBusy(true);
    const r = await computeSm3(input, format);
    setBusy(false);
    if (r.ok) setResult({ hex: r.hex, base64: r.base64 });
    else {
      setResult(null);
      setErr(pick(locale, r.code === "badHex" ? L.badHex : L.badBase64));
    }
  };

  const byteCount = format === "text" ? new TextEncoder().encode(input).length : format === "hex" ? Math.floor(input.trim().length / 2) : Math.floor((input.trim().length * 3) / 4);

  return (
    <ToolPanel>
      <div className="space-y-4">
        <div className="space-y-2">
          <p className="text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">{pick(locale, L.format)}</p>
          <div className="flex flex-wrap gap-2" role="group">
            {(Object.keys(FORMAT_LABELS) as Sm3InputFormat[]).map((f) => (
              <button
                key={f}
                type="button"
                aria-pressed={format === f}
                onClick={() => setFormat(f)}
                className={`mono rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                  format === f
                    ? "border-transparent bg-[var(--color-ink)] text-white dark:bg-white dark:text-[#1d1d1f]"
                    : "hairline hover:bg-[var(--color-surface)]"
                }`}
              >
                {pick(locale, FORMAT_LABELS[f])}
              </button>
            ))}
          </div>
        </div>

        <textarea
          className="field mono"
          rows={5}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={pick(locale, L.input)}
          spellCheck={false}
          aria-label={pick(locale, L.input)}
        />
        {input.trim() && (
          <p className="text-[12.5px] text-[var(--color-sub)]">{pick(locale, L.charCount).replace("{n}", String(byteCount))}</p>
        )}

        <button
          type="button"
          onClick={doCompute}
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

        {result && (
          <div className="space-y-2">
            <p className="text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">{pick(locale, L.result)}</p>
            <textarea
              className="field mono bg-[var(--color-surface)]"
              rows={2}
              value={result.hex}
              readOnly
              spellCheck={false}
              aria-label={pick(locale, L.result)}
            />
            <CopyButton value={result.hex} />
            <div className="pt-1" />
            <textarea
              className="field mono bg-[var(--color-surface)]"
              rows={2}
              value={result.base64}
              readOnly
              spellCheck={false}
              aria-label="Base64"
            />
            <CopyButton value={result.base64} />
          </div>
        )}

        <p className="text-[13px] leading-5 text-[var(--color-sub)]">{pick(locale, L.note)}</p>
      </div>
    </ToolPanel>
  );
}
