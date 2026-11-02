"use client";

import { useCallback, useRef, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton, DropZone, downloadBlob, formatBytes } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import type { Locale } from "@/lib/site";
import { loadImage } from "./image-util";

/**
 * ocr-image 引擎:单张图片 → 文字。tesseract.js 按需从 CDN 加载
 * (与 pdf-engine-ocr 相同的加载方式:script 注入 + 模块级 Promise 缓存),
 * 语言模型也按语言从 CDN 下载;图片本身始终留在设备上。
 */

const TESSERACT_CDN = "https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/dist/tesseract.min.js";

let tesseractPromise: Promise<Record<string, unknown>> | null = null;

function loadTesseract(): Promise<Record<string, unknown>> {
  if (tesseractPromise) return tesseractPromise;
  tesseractPromise = new Promise((resolve, reject) => {
    const w = window as unknown as Record<string, unknown>;
    if (w.Tesseract) {
      resolve(w.Tesseract as Record<string, unknown>);
      return;
    }
    const script = document.createElement("script");
    script.src = TESSERACT_CDN;
    script.async = true;
    script.onload = () => {
      if (w.Tesseract) resolve(w.Tesseract as Record<string, unknown>);
      else reject(new Error("cdn"));
    };
    script.onerror = () => reject(new Error("cdn"));
    document.head.appendChild(script);
  });
  return tesseractPromise;
}

const LANGS: { id: string; label: Record<string, string> }[] = [
  { id: "eng", label: { en: "English", zh: "英语", ja: "英語", es: "Inglés", pt: "Inglês" } },
  { id: "chi_sim", label: { en: "Chinese (Simplified)", zh: "简体中文", ja: "簡体字中国語", es: "Chino (simplificado)", pt: "Chinês (simplificado)" } },
  { id: "jpn", label: { en: "Japanese", zh: "日语", ja: "日本語", es: "Japonés", pt: "Japonês" } },
  { id: "spa", label: { en: "Spanish", zh: "西班牙语", ja: "スペイン語", es: "Español", pt: "Espanhol" } },
  { id: "por", label: { en: "Portuguese", zh: "葡萄牙语", ja: "ポルトガル語", es: "Portugués", pt: "Português" } },
  { id: "deu", label: { en: "German", zh: "德语", ja: "ドイツ語", es: "Alemán", pt: "Alemão" } },
  { id: "fra", label: { en: "French", zh: "法语", ja: "フランス語", es: "Francés", pt: "Francês" } },
];

const L: Record<string, Record<string, string>> = {
  language: { en: "Language", zh: "识别语言", ja: "言語", es: "Idioma", pt: "Idioma" },
  start: { en: "Extract text", zh: "开始识别", ja: "テキストを抽出", es: "Extraer texto", pt: "Extrair texto" },
  loadModel: {
    en: "Preparing the OCR engine and language model (first use downloads ~10–20 MB)…",
    zh: "正在准备 OCR 引擎和语言模型(首次使用约下载 10–20 MB)…",
    ja: "OCR エンジンと言語モデルを準備中(初回は約 10–20 MB をダウンロード)…",
    es: "Preparando el motor de OCR y el modelo de idioma (el primer uso descarga ~10–20 MB)…",
    pt: "Preparando o motor de OCR e o modelo de idioma (o primeiro uso baixa ~10–20 MB)…",
  },
  cdnNote: {
    en: "First use downloads the OCR engine and the language model (~10–20 MB per language) from a CDN; the image itself never leaves your device.",
    zh: "首次使用会从 CDN 下载 OCR 引擎和对应语言模型(每种语言约 10–20 MB);图片本身始终留在你的设备上。",
    ja: "初回使用時に CDN から OCR エンジンと言語モデル(言語ごとに約 10–20 MB)をダウンロードします。画像自体は端末内にとどまります。",
    es: "En el primer uso se descargan el motor de OCR y el modelo de idioma (~10–20 MB por idioma) desde un CDN; la imagen nunca sale de tu dispositivo.",
    pt: "No primeiro uso, o motor de OCR e o modelo de idioma (~10–20 MB por idioma) são baixados de um CDN; a imagem nunca sai do seu dispositivo.",
  },
  recognizing: { en: "Recognizing text…", zh: "正在识别文字…", ja: "テキストを認識中…", es: "Reconociendo texto…", pt: "Reconhecendo texto…" },
  chars: { en: "characters", zh: "个字符", ja: "文字", es: "caracteres", pt: "caracteres" },
  empty: {
    en: "No readable text was found in this image. Try a sharper, better-lit photo.",
    zh: "这张图里没有识别出文字。试试更清晰、光线更好的照片。",
    ja: "この画像から読み取れるテキストは見つかりませんでした。より鮮明で明るい写真をお試しください。",
    es: "No se encontró texto legible en esta imagen. Prueba con una foto más nítida y mejor iluminada.",
    pt: "Nenhum texto legível foi encontrado nesta imagem. Tente uma foto mais nítida e melhor iluminada.",
  },
  cdnFail: {
    en: "Could not load the OCR engine from the CDN. Check your internet connection and try again — the image itself never leaves your device.",
    zh: "无法从 CDN 加载 OCR 引擎,请检查网络后重试——图片本身不会离开你的设备。",
    ja: "CDN から OCR エンジンを読み込めませんでした。ネットワークを確認して再試行してください。画像自体は端末から送信されません。",
    es: "No se pudo cargar el motor de OCR desde el CDN. Comprueba tu conexión e inténtalo de nuevo: la imagen nunca sale de tu dispositivo.",
    pt: "Não foi possível carregar o motor de OCR do CDN. Verifique sua conexão e tente novamente — a imagem nunca sai do seu dispositivo.",
  },
  failed: {
    en: "This file could not be read as an image.",
    zh: "无法将该文件读取为图片。",
    ja: "このファイルは画像として読み込めませんでした。",
    es: "No se pudo leer este archivo como imagen.",
    pt: "Não foi possível ler este arquivo como imagem.",
  },
};

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
              className="rounded-full bg-[var(--color-accent)] px-5 py-2.5 text-[15px] font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
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
