"use client";

import { useCallback, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { DropZone, downloadBlob, formatBytes } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { SHARED, Err, Ghost, Label, Primary, Progress, baseName, canvasToBlob, loadPdf, renderPageToCanvas, tr, type L } from "./pdf-ui";

type Fmt = "png" | "jpg";

const UI: Record<string, L> = {
  dpi: { en: "Resolution", zh: "分辨率", ja: "解像度", es: "Resolución", pt: "Resolução" },
  convert: { en: "Convert to", zh: "转换为", ja: "変換", es: "Convertir a", pt: "Converter para" },
  pages: { en: "images", zh: "张图片", ja: "枚の画像", es: "imágenes", pt: "imagens" },
};

const DPI_OPTIONS = [96, 150, 200, 300];

export function PdfToImagesEngine({ format }: { format: Fmt }) {
  const { t, locale } = useI18n();
  const [file, setFile] = useState<File | null>(null);
  const [dpi, setDpi] = useState(150);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [err, setErr] = useState("");
  const [outs, setOuts] = useState<{ name: string; blob: Blob }[]>([]);

  const pick = useCallback((fs: File[]) => {
    const f = fs.find((x) => /\.pdf$/i.test(x.name) || x.type === "application/pdf");
    if (!f) return;
    setFile(f);
    setOuts([]);
    setErr("");
  }, []);

  const reset = () => {
    setFile(null);
    setOuts([]);
    setErr("");
    setProgress(0);
  };

  async function run() {
    if (!file) {
      setErr(tr(SHARED.needFile, locale));
      return;
    }
    setBusy(true);
    setErr("");
    setOuts([]);
    setProgress(0.02);
    try {
      const pdf = await loadPdf(new Uint8Array(await file.arrayBuffer()));
      const base = baseName(file.name);
      const mime = format === "png" ? "image/png" : "image/jpeg";
      const ext = format;
      const out: { name: string; blob: Blob }[] = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const canvas = await renderPageToCanvas(page, dpi / 72);
        const blob = await canvasToBlob(canvas, mime, 0.92);
        out.push({ name: `${base}-${String(i).padStart(2, "0")}.${ext}`, blob });
        page.cleanup();
        setProgress(i / pdf.numPages);
        // let the UI breathe between pages
        if (i % 2 === 0) await new Promise((r) => setTimeout(r, 0));
      }
      pdf.destroy();
      setOuts(out);
    } catch {
      setErr(tr(SHARED.failed, locale));
    } finally {
      setBusy(false);
    }
  }

  async function zipAll() {
    const JSZip = (await import("jszip")).default;
    const zip = new JSZip();
    for (const o of outs) zip.file(o.name, o.blob);
    downloadBlob(await zip.generateAsync({ type: "blob" }), `${baseName(file?.name ?? "pdf")}-${format}.zip`);
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

          <div className="sm:max-w-56">
            <Label>{tr(UI.dpi, locale)}</Label>
            <select className="field" value={dpi} onChange={(e) => setDpi(parseInt(e.target.value, 10))} aria-label={tr(UI.dpi, locale)}>
              {DPI_OPTIONS.map((d) => <option key={d} value={d}>{d} DPI</option>)}
            </select>
          </div>

          {busy && <Progress value={progress} />}
          <Err msg={err} />

          {outs.length > 0 && (
            <div className="rounded-2xl border hairline p-4">
              <p className="mb-2 text-[13.5px] font-semibold">
                {outs.length} {tr(UI.pages, locale)} · {formatBytes(outs.reduce((a, o) => a + o.blob.size, 0))}
              </p>
              <ul className="grid max-h-72 gap-1.5 overflow-y-auto">
                {outs.map((o) => (
                  <li key={o.name} className="flex items-center gap-2.5 text-[14px]">
                    <span className="min-w-0 flex-1 truncate">{o.name}</span>
                    <span className="mono flex-none text-[12.5px] text-[var(--color-sub)]">{formatBytes(o.blob.size)}</span>
                    <button type="button" onClick={() => downloadBlob(o.blob, o.name)}
                      className="flex-none rounded-full border hairline px-3 py-1 text-[12.5px] font-medium hover:bg-[var(--color-surface)]">
                      {t.common.download}
                    </button>
                  </li>
                ))}
              </ul>
              {outs.length > 1 && (
                <button type="button" onClick={zipAll}
                  className="mt-3 rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium hover:bg-[var(--color-surface)]">
                  {tr(SHARED.downloadAll, locale)}
                </button>
              )}
            </div>
          )}

          <div className="flex flex-wrap gap-2.5">
            <Primary onClick={run} disabled={busy}>{tr(UI.convert, locale)} {format.toUpperCase()}</Primary>
            {!busy && <Ghost onClick={reset}>{t.common.reset}</Ghost>}
          </div>
        </div>
      )}
    </ToolPanel>
  );
}
