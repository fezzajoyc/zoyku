"use client";

import { useState } from "react";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { pick } from "./calc-ui";
import { useI18n } from "@/components/i18n-provider";
import { decodeGbkBytes, decodeGbkInput, type GbkEncoding } from "../_lib/gbk-decode";

/**
 * CN-018:GBK/GB18030 解码引擎。
 * 三种输入:hex 粘贴 / Base64 粘贴 / 文件上传(≤2MB)。零依赖(浏览器原生 TextDecoder)。
 * 损坏字节显示 U+FFFD 替换计数,提示数据可能不完整。
 */

const L = {
  enc: { en: "Encoding", zh: "目标编码", ja: "エンコーディング", es: "Codificación", pt: "Codificação" },
  src: { en: "Input source", zh: "输入方式", ja: "入力ソース", es: "Fuente de entrada", pt: "Fonte de entrada" },
  pasteLabel: {
    en: "Paste bytes as hex or Base64",
    zh: "粘贴字节(hex 或 Base64)",
    ja: "バイトを 16 進または Base64 で貼り付け",
    es: "Pega los bytes en hex o Base64",
    pt: "Cole os bytes em hex ou Base64",
  },
  fileLabel: {
    en: "Choose a file (up to 2 MB)",
    zh: "选择文件(最大 2 MB)",
    ja: "ファイルを選択(最大 2 MB)",
    es: "Elija un archivo (hasta 2 MB)",
    pt: "Escolha um arquivo (até 2 MB)",
  },
  result: { en: "Decoded text", zh: "解码结果", ja: "デコード結果", es: "Texto decodificado", pt: "Texto decodificado" },
  decode: { en: "Decode", zh: "解码", ja: "デコード", es: "Decodificar", pt: "Decodificar" },
  fileName: { en: "File: {name} ({n} bytes)", zh: "文件:{name}({n} 字节)", ja: "ファイル:{name}({n} バイト)", es: "Archivo: {name} ({n} bytes)", pt: "Arquivo: {name} ({n} bytes)" },
  warn: {
    en: "{n} invalid byte sequence(s) were replaced with the � character — the source data may be corrupted or not GBK-encoded.",
    zh: "{n} 处无效字节序列被替换为 � 字符——源数据可能已损坏,或并非 GBK 编码。",
    ja: "{n} 件の無効なバイトシーケンスが � に置き換えられました — 元データが破損しているか、GBK エンコーディングではない可能性があります。",
    es: "{n} secuencia(s) de bytes no válida(s) se reemplazaron con el carácter � — los datos de origen pueden estar dañados o no estar en GBK.",
    pt: "{n} sequência(s) de bytes inválida(s) foram substituídas pelo caractere � — os dados de origem podem estar corrompidos ou não estar em GBK.",
  },
  badHex: {
    en: "Invalid hex input — use 0-9 a-f A-F pairs, whitespace allowed.",
    zh: "无效十六进制——请使用 0-9 a-f A-F 成对字符,可含空格。",
    ja: "無効な 16 進入力 — 0-9 a-f A-F のペアを使用(空白は可)。",
    es: "Entrada hexadecimal no válida: use pares 0-9 a-f A-F, se permiten espacios.",
    pt: "Entrada hexadecimal inválida: use pares 0-9 a-f A-F, espaços permitidos.",
  },
  badBase64: {
    en: "Invalid Base64 input — standard alphabet with padding.",
    zh: "无效 Base64——标准字母表并带 padding。",
    ja: "無効な Base64 入力 — 標準アルファベットとパディングを使用。",
    es: "Entrada Base64 no válida: alfabeto estándar con relleno.",
    pt: "Entrada Base64 inválida: alfabeto padrão com preenchimento.",
  },
  empty: {
    en: "Paste bytes or choose a file to decode.",
    zh: "请粘贴字节或选择文件进行解码。",
    ja: "バイトを貼り付けるかファイルを選択してください。",
    es: "Pegue bytes o elija un archivo para decodificar.",
    pt: "Cole bytes ou escolha um arquivo para decodificar.",
  },
  note: {
    en: "Decoding uses your browser's built-in WHATWG Encoding support (GBK / GB18030) — no library, no upload. GBK also covers GB2312; GB18030 additionally handles four-byte sequences for rare CJK ideographs. Text → GBK encoding is not natively supported by browsers and is out of scope here.",
    zh: "解码使用浏览器内建的 WHATWG Encoding 支持(GBK / GB18030)——零依赖、不上传。GBK 兼容 GB2312;GB18030 额外支持生僻汉字的四字节序列。文本→GBK 的编码方向浏览器无原生支持,不在本工具范围内。",
    ja: "デコードはブラウザ内蔵の WHATWG Encoding 対応(GBK / GB18030)を使用 — ライブラリ不要、アップロードなし。GBK は GB2312 を包含し、GB18030 はさらに 4 バイト系列に対応します。",
    es: "La decodificación usa el soporte WHATWG Encoding integrado en su navegador (GBK / GB18030) — sin librerías, sin subidas. GBK cubre GB2312; GB18030 además maneja secuencias de cuatro bytes.",
    pt: "A decodificação usa o suporte WHATWG Encoding integrado do seu navegador (GBK / GB18030) — sem bibliotecas, sem uploads. GBK cobre GB2312; GB18030 também lida com sequências de quatro bytes.",
  },
};

const ENC_LABELS: Record<GbkEncoding, { en: string; zh: string; ja: string; es: string; pt: string }> = {
  gbk: { en: "GBK (incl. GB2312)", zh: "GBK(兼容 GB2312)", ja: "GBK(GB2312 含む)", es: "GBK (incl. GB2312)", pt: "GBK (incl. GB2312)" },
  gb18030: { en: "GB18030", zh: "GB18030", ja: "GB18030", es: "GB18030", pt: "GB18030" },
};

type Source = "hex" | "base64" | "file";

const SRC_LABELS: Record<Source, { en: string; zh: string; ja: string; es: string; pt: string }> = {
  hex: { en: "Hex", zh: "十六进制", ja: "16 進数", es: "Hexadecimal", pt: "Hexadecimal" },
  base64: { en: "Base64", zh: "Base64", ja: "Base64", es: "Base64", pt: "Base64" },
  file: { en: "File upload", zh: "文件上传", ja: "ファイル", es: "Archivo", pt: "Arquivo" },
};

export function DevEngineGbk() {
  const { locale } = useI18n();
  const [enc, setEnc] = useState<GbkEncoding>("gbk");
  const [src, setSrc] = useState<Source>("hex");
  const [paste, setPaste] = useState("");
  const [fileMeta, setFileMeta] = useState<{ name: string; bytes: Uint8Array } | null>(null);
  const [result, setResult] = useState<{ text: string; replacementCount: number } | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const doDecode = () => {
    setErr(null);
    setBusy(true);
    let r: ReturnType<typeof decodeGbkBytes>;
    if (src === "file") {
      r = fileMeta ? decodeGbkBytes(fileMeta.bytes, enc) : { ok: false, code: "empty" as const };
    } else {
      r = decodeGbkInput(paste, src, enc);
    }
    setBusy(false);
    if (r.ok) setResult({ text: r.text, replacementCount: r.replacementCount });
    else {
      setResult(null);
      const msg =
        r.code === "badHex" ? L.badHex : r.code === "badBase64" ? L.badBase64 : r.code === "tooLarge" ? L.fileLabel : L.empty;
      setErr(pick(locale, msg));
    }
  };

  const onFile = async (f: File | undefined) => {
    if (!f) return;
    setErr(null);
    const buf = await f.arrayBuffer();
    setFileMeta({ name: f.name, bytes: new Uint8Array(buf) });
  };

  const showDecodeBtn = src !== "file" || !!fileMeta;

  return (
    <ToolPanel>
      <div className="space-y-4">
        <div className="space-y-2">
          <p className="text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">{pick(locale, L.enc)}</p>
          <div className="flex flex-wrap gap-2" role="group">
            {(Object.keys(ENC_LABELS) as GbkEncoding[]).map((e) => (
              <button
                key={e}
                type="button"
                aria-pressed={enc === e}
                onClick={() => setEnc(e)}
                className={`mono rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                  enc === e
                    ? "border-transparent bg-[var(--color-ink)] text-white dark:bg-white dark:text-[#1d1d1f]"
                    : "hairline hover:bg-[var(--color-surface)]"
                }`}
              >
                {pick(locale, ENC_LABELS[e])}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">{pick(locale, L.src)}</p>
          <div className="flex flex-wrap gap-2" role="group">
            {(Object.keys(SRC_LABELS) as Source[]).map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={src === s}
                onClick={() => setSrc(s)}
                className={`mono rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                  src === s
                    ? "border-transparent bg-[var(--color-ink)] text-white dark:bg-white dark:text-[#1d1d1f]"
                    : "hairline hover:bg-[var(--color-surface)]"
                }`}
              >
                {pick(locale, SRC_LABELS[s])}
              </button>
            ))}
          </div>
        </div>

        {src === "file" ? (
          <div className="space-y-2">
            <input
              type="file"
              onChange={(e) => onFile(e.target.files?.[0])}
              aria-label={pick(locale, L.fileLabel)}
              className="block w-full text-[13.5px] text-[var(--color-sub)] file:mr-3 file:rounded-full file:border-0 file:bg-[var(--color-ink)] file:px-4 file:py-2 file:text-[13px] file:font-medium file:text-white dark:file:bg-white dark:file:text-[#1d1d1f]"
            />
            {fileMeta && (
              <p className="text-[12.5px] text-[var(--color-sub)]">
                {pick(locale, L.fileName).replace("{name}", fileMeta.name).replace("{n}", String(fileMeta.bytes.length))}
              </p>
            )}
          </div>
        ) : (
          <textarea
            className="field mono"
            rows={4}
            value={paste}
            onChange={(e) => setPaste(e.target.value)}
            placeholder={pick(locale, L.pasteLabel)}
            spellCheck={false}
            aria-label={pick(locale, L.pasteLabel)}
          />
        )}

        {showDecodeBtn && (
          <button
            type="button"
            onClick={doDecode}
            disabled={busy}
            className="rounded-full bg-[var(--color-ink)] px-4 py-2 text-[13.5px] font-medium text-white dark:bg-white dark:text-[#1d1d1f] transition-opacity disabled:opacity-40"
          >
            {busy ? "…" : pick(locale, L.decode)}
          </button>
        )}

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
              rows={6}
              value={result.text}
              readOnly
              spellCheck={false}
              aria-label={pick(locale, L.result)}
            />
            <CopyButton value={result.text} />
            {result.replacementCount > 0 && (
              <p role="status" className="rounded-xl error-bg px-3.5 py-2.5 text-[13px] leading-5 text-[var(--color-bad)]">
                {pick(locale, L.warn).replace("{n}", String(result.replacementCount))}
              </p>
            )}
          </div>
        )}

        <p className="text-[13px] leading-5 text-[var(--color-sub)]">{pick(locale, L.note)}</p>
      </div>
    </ToolPanel>
  );
}
