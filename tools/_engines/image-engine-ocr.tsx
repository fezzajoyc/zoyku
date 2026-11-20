"use client";

import { useCallback, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton, DropZone, downloadBlob, formatBytes } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { loadTesseract } from "./ocr-loader";
import { OCR_UI, OCR_LANGUAGES as LANGS } from "./pdf-locales";
import { loadImage } from "./image-util";

/**
 * ocr-image 引擎:单张图片 → 文字。tesseract.js 按需从 CDN 加载
 * (与 pdf-engine-ocr 相同的加载方式:script 注入 + 模块级 Promise 缓存),
 * 语言模型也按语言从 CDN 下载;图片本身始终留在设备上。
 */

const L: Record<string, Record<string, string>> = { ...OCR_UI, start: OCR_UI.extract };

/** 识别前限制长边,避免动辄 4000 px 的照片拖慢识别;2400 px 足够文档级 OCR。 */
const MAX_LONG_EDGE = 2400;

export function ImageOcrEngine() {
  const { t, locale } = useI18n();
  const [file, setFile] = useState<File | null>(null);
  const [lang, setLang] = useState("eng");
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");
  const [err, setErr] = useState("");
  const [note, setNote] = useState("");
  const [text, setText] = useState("");

  const trL = useCallback((k: string) => L[k][locale] ?? L[k].en, [locale]);

  const pick = useCallback(
    (list: File[]) => {
      const f = list.find((x) => x.type.startsWith("image/"));
      if (!f) return;
      setFile(f);
      setText("");
      setErr("");
      setNote("");
      setProgress(0);
      setStatus("");
    },
    [],
  );

  const reset = () => {
    setFile(null);
    setText("");
    setErr("");
    setNote("");
    setProgress(0);
    setStatus("");
  };

  async function run() {
    if (!file) return;
    setBusy(true);
    setErr("");
    setNote("");
    setText("");
    setProgress(0.03);
    setStatus(trL("loadModel"));
    try {
      let T: Record<string, any>;
      try {
        T = await loadTesseract();
      } catch {
        throw new Error("cdn");
      }
      const img = await loadImage(file);
      const long = Math.max(img.naturalWidth, img.naturalHeight);
      const k = Math.min(1, MAX_LONG_EDGE / long);
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(img.naturalWidth * k));
      canvas.height = Math.max(1, Math.round(img.naturalHeight * k));
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("canvas");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const result = await T.recognize(canvas, lang, {
        logger: (m: { status?: string; progress?: number }) => {
          if (typeof m.progress === "number") setProgress(Math.min(0.99, m.progress));
          const s = m.status ?? "";
          if (s.startsWith("loading")) setStatus(trL("loadModel"));
          else if (s === "recognizing text") setStatus(trL("recognizing"));
        },
      });
      const out = ((result?.data?.text as string | undefined) ?? "").replace(/\n{3,}/g, "\n\n").trim();
      setText(out);
      setProgress(1);
      if (!out) setNote(trL("empty"));
    } catch (e) {
      const msg = e instanceof Error ? e.message : "";
      if (msg === "cdn") setErr(trL("cdnFail"));
      else if (msg === "decode-failed") setErr(trL("failed"));
      else setErr(t.common.error);
    } finally {
      setBusy(false);
      setStatus("");
    }
  }

  function downloadTxt() {
    if (!file || !text) return;
    const base = file.name.replace(/\.[^.]+$/, "") || "image";
    downloadBlob(new Blob([text], { type: "text/plain;charset=utf-8" }), `${base}-text.txt`);
  }

  return (
    <ToolPanel>
      {!file ? (
        <DropZone onFiles={pick} accept="image/*" multiple={false}>
          <p className="text-[14px] text-[var(--color-sub)]">{t.common.dropFile}</p>
        </DropZone>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center gap-2.5 rounded-xl border hairline px-3.5 py-2.5 text-[14px]">
            <span className="min-w-0 flex-1 truncate">{file.name}</span>
            <span className="mono flex-none text-[12.5px] text-[var(--color-sub)]">{formatBytes(file.size)}</span>
            <button type="button" onClick={reset} aria-label={t.common.clear}
              className="h-7 w-7 flex-none rounded-full text-[14px] leading-none text-[var(--color-sub)] hover:bg-[var(--color-surface)]">×</button>
          </div>

          <div className="max-w-xs">
            <span className="mb-1.5 block text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">{trL("language")}</span>
            <select className="field" value={lang} onChange={(e) => setLang(e.target.value)} disabled={busy} aria-label={trL("language")}>
              {LANGS.map((l) => (
                <option key={l.id} value={l.id}>{l.label[locale] ?? l.label.en}</option>
              ))}
            </select>
          </div>

          <p className="text-[12.5px] leading-5 text-[var(--color-sub)]">{trL("cdnNote")}</p>

          {busy && (
            <div className="space-y-1.5">
              <div
                className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--color-surface)]"
                role="progressbar"
                aria-valuenow={Math.round(progress * 100)}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div className="h-full rounded-full bg-[var(--color-accent)] transition-[width]" style={{ width: `${Math.round(progress * 100)}%` }} />
              </div>
              {status && <p className="text-[12.5px] text-[var(--color-sub)]">{status}</p>}
            </div>
          )}

          {err && <p role="alert" className="rounded-xl error-bg px-3.5 py-2.5 text-[13.5px] leading-5 text-[var(--color-bad)]">{err}</p>}
          {!err && note && <p className="rounded-xl bg-[var(--color-surface)] px-3.5 py-2.5 text-[13.5px] leading-5 text-[var(--color-sub)]">{note}</p>}

          {text && (
            <div>
              <div className="mb-1.5 flex items-center justify-between gap-2">
                <span className="text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">{t.common.output}</span>
                <span className="mono text-[12px] text-[var(--color-sub)]">{text.length} {trL("chars")}</span>
              </div>
              <textarea
                className="field mono"
                rows={10}
                value={text}
                onChange={(e) => setText(e.target.value)}
                aria-label={t.common.output}
                spellCheck={false}
              />
            </div>
          )}

          <div className="flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={() => void run()}
              disabled={busy}
              className="rounded-full bg-[var(--color-action-bg)] px-5 py-2.5 text-[15px] font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {busy ? t.common.processing : trL("start")}
            </button>
            {text && <CopyButton value={text} />}
            {text && (
              <button
                type="button"
                onClick={downloadTxt}
                className="rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)]"
              >
                .txt
              </button>
            )}
            {!busy && file && (
              <button
                type="button"
                onClick={reset}
                className="rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)]"
              >
                {t.common.reset}
              </button>
            )}
          </div>
        </div>
      )}
    </ToolPanel>
  );
}
