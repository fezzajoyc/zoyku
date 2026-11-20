"use client";

import { useCallback, useRef, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton, DropZone, downloadBlob, formatBytes } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { OCR_UI as UI, OCR_LANGUAGES as LANGS } from "./pdf-locales";
import { loadTesseract } from "./ocr-loader";
import { SHARED, Err, Ghost, Label, Primary, Progress, baseName, loadPdf, parsePageRanges, renderPageToCanvas, tr } from "./pdf-ui";

/**
 * tesseract.js is loaded on demand from a CDN (it is not bundled): the OCR
 * engine, its worker and the selected language model are fetched on first use.
 * The PDF itself never leaves the device — recognition runs in the browser.
 */
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
      if (!full) setErr(tr(UI.empty, locale));
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
            {tr(UI.cdnNote, locale)}
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
