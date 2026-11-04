"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton, DropZone, downloadBlob, formatBytes } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { guessImageMimeFromBytes, imageMimeToExt, isImageMime, parseDataUrl } from "../_lib/converters";

/**
 * Base64 图片双向引擎。编码:图片文件 → data URL(FileReader,不进主包逻辑);
 * 解码:data URL → 校验/预览/下载。校验逻辑(parseDataUrl、魔数探测)
 * 全在 tools/_lib/converters.ts,Node 可测。
 */

const L = {
  encodeTab: {
    en: "Image → Base64",
    zh: "图片 → Base64",
    ja: "画像 → Base64",
    es: "Imagen → Base64",
    pt: "Imagem → Base64",
  },
  decodeTab: {
    en: "Base64 → Image",
    zh: "Base64 → 图片",
    ja: "Base64 → 画像",
    es: "Base64 → Imagen",
    pt: "Base64 → Imagem",
  },
  original: { en: "Original file", zh: "原文件", ja: "元ファイル", es: "Archivo original", pt: "Arquivo original" },
  dataUrlSize: { en: "Data URL size", zh: "Data URL 大小", ja: "Data URL サイズ", es: "Tamaño del data URL", pt: "Tamanho do data URL" },
  overhead: { en: "Text overhead", zh: "文本膨胀", ja: "テキスト膨張率", es: "Sobrecoste de texto", pt: "Sobrecusto de texto" },
  rawBase64: { en: "Base64 only", zh: "仅 Base64", ja: "Base64 のみ", es: "Solo Base64", pt: "Somente Base64" },
  notImage: {
    en: "This tool is for image data URLs only (image/*).",
    zh: "本工具只支持图片类型的 data URL(image/*)。",
    ja: "このツールは画像形式の data URL(image/*)専用です。",
    es: "Esta herramienta solo admite data URLs de imagen (image/*).",
    pt: "Esta ferramenta só aceita data URLs de imagem (image/*).",
  },
  badDataUrl: {
    en: "Not a valid base64 data URL — expected something like data:image/png;base64,…",
    zh: "不是合法的 base64 data URL——应形如 data:image/png;base64,…",
    ja: "有効な base64 data URL ではありません — data:image/png;base64,… の形式で入力してください。",
    es: "No es un data URL base64 válido — se espera algo como data:image/png;base64,…",
    pt: "Não é um data URL base64 válido — esperava algo como data:image/png;base64,…",
  },
  mimeMismatch: {
    en: "Heads-up: the declared MIME doesn't match the file content (detected {detected}).",
    zh: "注意:声明的 MIME 与文件内容不符(检测到 {detected})。",
    ja: "注意:宣言された MIME がファイルの内容と一致しません(検出: {detected})。",
    es: "Ojo: el MIME declarado no coincide con el contenido (detectado {detected}).",
    pt: "Atenção: o MIME declarado não corresponde ao conteúdo (detectado {detected}).",
  },
  readFail: {
    en: "Could not read this file. Is it a valid image?",
    zh: "无法读取该文件,请确认它是有效的图片。",
    ja: "ファイルを読み込めませんでした。有効な画像か確認してください。",
    es: "No se pudo leer el archivo. ¿Es una imagen válida?",
    pt: "Não foi possível ler o arquivo. É uma imagem válida?",
  },
};

const pick = (label: Record<string, string>, locale: string) => label[locale] ?? label.en;

const fill = (tpl: string, vars: Record<string, string>): string =>
  tpl.replace(/\{(\w+)\}/g, (_, k: string) => (k in vars ? vars[k] : `{${k}}`));

type EncodeState = { name: string; size: number; dataUrl: string } | null;

export function DevBase64ImageEngine({ sample = "" }: { sample?: string }) {
  const { locale, t } = useI18n();
  const [tab, setTab] = useState<"encode" | "decode">("encode");
  const [enc, setEnc] = useState<EncodeState>(null);
  const [encErr, setEncErr] = useState<string | null>(null);
  const [decInput, setDecInput] = useState("");
  const readerRef = useRef<FileReader | null>(null);

  const readFile = useCallback(
    (file: File) => {
      setEncErr(null);
      const reader = new FileReader();
      readerRef.current = reader;
      reader.onload = () =>
        setEnc({ name: file.name, size: file.size, dataUrl: String(reader.result ?? "") });
      reader.onerror = () => setEncErr(pick(L.readFail, locale));
      reader.readAsDataURL(file);
    },
    [locale],
  );

  const decoded = useMemo(() => parseDataUrl(decInput), [decInput]);
  const decError = useMemo(() => {
    if (!decInput.trim()) return null;
    if (!decoded) return pick(L.badDataUrl, locale);
    if (!isImageMime(decoded.mime)) return pick(L.notImage, locale);
    return null;
  }, [decInput, decoded, locale]);

  const detected = decoded ? guessImageMimeFromBytes(decoded.bytes) : null;
  const mimeMismatch = decoded && detected !== null && detected !== decoded.mime;

  // 编码页:原字节 vs data URL 文本长度(即贴进 HTML/CSS 的实际大小)
  const overheadPct =
    enc && enc.size > 0 ? (((enc.dataUrl.length - enc.size) / enc.size) * 100).toFixed(1) : null;
  const rawB64 = enc ? (enc.dataUrl.split(",")[1] ?? "") : "";

  const tabCls = (active: boolean): string =>
    `rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
      active
        ? "border-transparent bg-[var(--color-ink)] text-white dark:bg-white dark:text-[#1d1d1f]"
        : "hairline hover:bg-[var(--color-surface)]"
    }`;

  return (
    <ToolPanel>
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <button type="button" aria-pressed={tab === "encode"} className={tabCls(tab === "encode")} onClick={() => setTab("encode")}>
            {pick(L.encodeTab, locale)}
          </button>
          <button type="button" aria-pressed={tab === "decode"} className={tabCls(tab === "decode")} onClick={() => setTab("decode")}>
            {pick(L.decodeTab, locale)}
          </button>
        </div>

        {tab === "encode" ? (
          <div className="space-y-4">
            {!enc && <DropZone accept="image/*" multiple={false} onFiles={(files) => readFile(files[0])} />}

            {encErr && (
              <p
                className="rounded-xl error-bg px-3.5 py-2.5 text-[13.5px] leading-5 text-[var(--color-bad)]"
                role="alert"
              >
                {encErr}
              </p>
            )}

            {enc && (
              <>
                <div className="flex flex-wrap items-start gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={enc.dataUrl}
                    alt={enc.name}
                    className="max-h-40 max-w-[40%] rounded-xl border hairline object-contain"
                  />
                  <dl className="min-w-0 flex-1 space-y-1 text-[13.5px]">
                    <div className="flex justify-between gap-3">
                      <dt className="text-[var(--color-sub)]">{pick(L.original, locale)}</dt>
                      <dd className="mono truncate">{`${enc.name} · ${formatBytes(enc.size)}`}</dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt className="text-[var(--color-sub)]">{pick(L.dataUrlSize, locale)}</dt>
                      <dd className="mono">{formatBytes(enc.dataUrl.length)}</dd>
                    </div>
                    {overheadPct !== null && (
                      <div className="flex justify-between gap-3">
                        <dt className="text-[var(--color-sub)]">{pick(L.overhead, locale)}</dt>
                        <dd className="mono">{`+${overheadPct}%`}</dd>
                      </div>
                    )}
                  </dl>
                </div>

                <textarea
                  className="field mono bg-[var(--color-surface)]"
                  rows={6}
                  value={enc.dataUrl}
                  readOnly
                  spellCheck={false}
                  aria-label="data URL"
                />

                <div className="flex flex-wrap gap-2.5">
                  <CopyButton value={enc.dataUrl} />
                  <CopyButton value={rawB64} label={pick(L.rawBase64, locale)} />
                  <button
                    type="button"
                    onClick={() => setEnc(null)}
                    className="rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)]"
                  >
                    {t.common.clear}
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <textarea
              className="field mono"
              rows={5}
              value={decInput}
              onChange={(e) => setDecInput(e.target.value)}
              placeholder="data:image/png;base64,…"
              spellCheck={false}
              aria-label={t.common.input}
            />

            {decError && (
              <p
                className="whitespace-pre-wrap rounded-xl error-bg px-3.5 py-2.5 text-[13.5px] leading-5 text-[var(--color-bad)]"
                role="alert"
              >
                {decError}
              </p>
            )}

            {decoded && isImageMime(decoded.mime) && (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={decInput.trim()}
                  alt={decoded.mime}
                  className="max-h-64 max-w-full rounded-xl border hairline object-contain"
                />
                {mimeMismatch && (
                  <p className="rounded-xl error-bg px-3.5 py-2.5 text-[13.5px] leading-5 text-[var(--color-bad)]">
                    {fill(pick(L.mimeMismatch, locale), { detected })}
                  </p>
                )}
                <p className="mono text-[13px] text-[var(--color-sub)]">
                  {`${decoded.mime} · ${formatBytes(decoded.bytes.length)}`}
                </p>
                <div className="flex flex-wrap gap-2.5">
                  <button
                    type="button"
                    onClick={() =>
                      downloadBlob(
                        new Blob([decoded.bytes as unknown as BlobPart], { type: decoded.mime }),
                        `image.${imageMimeToExt(decoded.mime)}`,
                      )
                    }
                    className="rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)]"
                  >
                    {t.common.download}
                  </button>
                  <button
                    type="button"
                    onClick={() => setDecInput("")}
                    className="rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)]"
                  >
                    {t.common.clear}
                  </button>
                  {sample && (
                    <button
                      type="button"
                      onClick={() => setDecInput(sample)}
                      className="rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium text-[var(--color-accent-strong)] transition-colors hover:bg-[rgba(0,113,227,0.06)]"
                    >
                      {t.common.sample}
                    </button>
                  )}
                </div>
              </>
            )}

            {!decoded && !decError && sample && (
              <button
                type="button"
                onClick={() => setDecInput(sample)}
                className="rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium text-[var(--color-accent-strong)] transition-colors hover:bg-[rgba(0,113,227,0.06)]"
              >
                {t.common.sample}
              </button>
            )}
          </div>
        )}
      </div>
    </ToolPanel>
  );
}
