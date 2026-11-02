"use client";

import { useCallback, useRef, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton, DropZone, downloadBlob, formatBytes } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { SHARED, Err, Ghost, Label, Primary, Progress, baseName, loadPdf, parsePageRanges, renderPageToCanvas, tr, type L } from "./pdf-ui";

/**
 * tesseract.js is loaded on demand from a CDN (it is not bundled): the OCR
 * engine, its worker and the selected language model are fetched on first use.
 * The PDF itself never leaves the device — recognition runs in the browser.
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

const LANGS: { id: string; label: L }[] = [
  { id: "eng", label: { en: "English", zh: "英语", ja: "英語", es: "Inglés", pt: "Inglês" } },
  { id: "chi_sim", label: { en: "Chinese (Simplified)", zh: "简体中文", ja: "簡体字中国語", es: "Chino (simplificado)", pt: "Chinês (simplificado)" } },
  { id: "jpn", label: { en: "Japanese", zh: "日语", ja: "日本語", es: "Japonés", pt: "Japonês" } },
  { id: "spa", label: { en: "Spanish", zh: "西班牙语", ja: "スペイン語", es: "Español", pt: "Espanhol" } },
  { id: "por", label: { en: "Portuguese", zh: "葡萄牙语", ja: "ポルトガル語", es: "Portugués", pt: "Português" } },
  { id: "fra", label: { en: "French", zh: "法语", ja: "フランス語", es: "Francés", pt: "Francês" } },
  { id: "deu", label: { en: "German", zh: "德语", ja: "ドイツ語", es: "Alemán", pt: "Alemão" } },
];

const UI: Record<string, L> = {
  language: { en: "Language", zh: "识别语言", ja: "言語", es: "Idioma", pt: "Idioma" },
  start: { en: "Run OCR", zh: "开始识别", ja: "OCR を実行", es: "Ejecutar OCR", pt: "Executar OCR" },
  page: { en: "Page", zh: "第", ja: "ページ", es: "Página", pt: "Página" },
  cdnFail: {
    en: "Could not load the OCR engine from the CDN. Check your internet connection and try again — the PDF itself never leaves your device.",
    zh: "无法从 CDN 加载 OCR 引擎,请检查网络后重试——PDF 文件本身不会离开你的设备。",
    ja: "CDN から OCR エンジンを読み込めませんでした。ネットワークを確認して再試行してください。PDF ファイル自体は端末から送信されません。",
    es: "No se pudo cargar el motor de OCR desde el CDN. Comprueba tu conexión e inténtalo de nuevo: el PDF nunca sale de tu dispositivo.",
    pt: "Não foi possível carregar o motor de OCR do CDN. Verifique sua conexão e tente novamente — o PDF nunca sai do seu dispositivo.",
  },
};

export function PdfOcrEngine() {
  const { t, locale } = useI18n();
  const [file, setFile] = useState<File | null>(null);
  const [lang, setLang] = useState("eng");
  const [pages, setPages] = useState("");
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");
  const [err, setErr] = useState("");
  const [text, setText] = useState("");

  const cancel = useRef(false);

  const pick = useCallback((fs: File[]) => {
    const f = fs.find((x) => /\.pdf$/i.test(x.name) || x.type === "application/pdf");
    if (!f) return;
    setFile(f);
    setText("");
    setErr("");
  }, []);

  const reset = () => {
    setFile(null);
    setText("");
    setErr("");
    setProgress(0);
    setStatus("");
  };

  async function run() {
    if (!file) {
      setErr(tr(SHARED.needFile, locale));
      return;
    }
    setBusy(true);
    setErr("");
    setText("");
    setProgress(0.02);
    cancel.current = false;
    try {
      let T: Record<string, any>;
      try {
        T = (await loadTesseract()) as Record<string, any>;
      } catch {
        throw new Error("cdn");
      }
      const pdf = await loadPdf(new Uint8Array(await file.arrayBuffer()));
      const n = pdf.numPages;
      const targets = pages.trim() ? parsePageRanges(pages, n) : Array.from({ length: n }, (_, i) => i + 1);
      if (!targets) throw new Error("range");
      const parts: string[] = [];
      let done = 0;
      for (const p of targets) {
        if (cancel.current) break;
        setStatus(`${tr(UI.page, locale)} ${p}/${targets[targets.length - 1]}`);
        const page = await pdf.getPage(p);
        const canvas = await renderPageToCanvas(page, 2);
        page.cleanup();
        const result = await T.recognize(canvas, lang, {
          logger: (m: { status?: string; progress?: number }) => {
            if (m.status === "recognizing text" && typeof m.progress === "number") {
              setProgress(Math.min(0.99, (done + m.progress) / targets.length));
            }
          },
        });
        const pageText = (result?.data?.text as string | undefined)?.trim() ?? "";
        if (pageText) parts.push(pageText);
        done += 1;
        setProgress(done / targets.length);
      }
      pdf.destroy();
      const full = parts.join("\n\n");
      setText(full);
      if (!full) setStatus(t.common.error);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "";
      if (msg === "cdn") setErr(tr(UI.cdnFail, locale));
      else if (msg === "range") setErr(tr(SHARED.badRange, locale));
      else setErr(tr(SHARED.failed, locale));
    } finally {
      setBusy(false);
      setStatus("");
    }
  }

  function downloadTxt() {
    if (text) downloadBlob(new Blob([text], { type: "text/plain;charset=utf-8" }), `${baseName(file?.name ?? "ocr")}-ocr.txt`);
  }

  return (
    <ToolPanel>
      {!file ? (
        <DropZone onFiles={pick} accept="application/pdf,.pdf" multiple={false} />
      ) : (
        <div className="space-y-3">
          <div className="flex items-center gap-2.5 rounded-xl border hairline px-3.5 py-2.5 text-[14px]">
            <span className="min-w-0 flex-1 truncate">{file.name}</span>
            <span className="mono flex-none text-[12.5px] text-[var(--color-sub)]">{formatBytes(file.size)}</span>
            <button type="button" onClick={reset} aria-label={t.common.reset}
              className="h-7 w-7 flex-none rounded-full text-[14px] leading-none text-[var(--color-sub)] hover:bg-[var(--color-surface)]">×</button>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <Label>{tr(UI.language, locale)}</Label>
              <select className="field" value={lang} onChange={(e) => setLang(e.target.value)} aria-label={tr(UI.language, locale)}>
                {LANGS.map((l) => <option key={l.id} value={l.id}>{tr(l.label, locale)}</option>)}
              </select>
            </div>
            <div>
              <Label>{tr(SHARED.pageRange, locale)}</Label>
              <input className="field mono" value={pages} onChange={(e) => setPages(e.target.value)}
                placeholder={tr(SHARED.allPages, locale)} aria-label={tr(SHARED.pageRange, locale)} />
            </div>
          </div>

          <p className="text-[12.5px] leading-5 text-[var(--color-sub)]">
            {locale === "zh"
              ? "首次使用会从 CDN 下载 OCR 引擎和对应语言模型(约 10–20 MB);PDF 文件本身始终留在你的设备上。"
              : locale === "ja"
                ? "初回使用時に CDN から OCR エンジンと言語モデル(約 10–20 MB)をダウンロードします。PDF ファイル自体は端末内にとどまります。"
                : locale === "es"
                  ? "En el primer uso se descargan el motor de OCR y el modelo de idioma (~10–20 MB) desde un CDN; el PDF nunca sale de tu dispositivo."
                  : locale === "pt"
                    ? "No primeiro uso, o motor de OCR e o modelo de idioma (~10–20 MB) são baixados de um CDN; o PDF nunca sai do seu dispositivo."
                    : "First use downloads the OCR engine and language model (~10–20 MB) from a CDN; the PDF itself never leaves your device."}
          </p>

          {busy && (
            <div className="space-y-1.5">
              <Progress value={progress} />
              {status && <p className="text-[12.5px] text-[var(--color-sub)]">{status}</p>}
            </div>
          )}
          <Err msg={err} />

          {text && (
            <div>
              <Label>{t.common.output}</Label>
              <textarea className="field mono bg-[var(--color-surface)]" rows={10} readOnly value={text} aria-label={t.common.output} />
            </div>
          )}

          <div className="flex flex-wrap gap-2.5">
            <Primary onClick={run} disabled={busy}>{tr(UI.start, locale)}</Primary>
            {text && <CopyButton value={text} />}
            {text && (
              <button type="button" onClick={downloadTxt}
                className="rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)]">
                .txt
              </button>
            )}
            {!busy && file && <Ghost onClick={reset}>{t.common.reset}</Ghost>}
          </div>
        </div>
      )}
    </ToolPanel>
  );
}
