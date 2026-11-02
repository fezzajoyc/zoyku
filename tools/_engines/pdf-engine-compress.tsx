"use client";

import { useCallback, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { DropZone, downloadBlob, formatBytes } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { SHARED, Err, Ghost, Label, Primary, Progress, baseName, canvasToBlob, loadPdf, renderPageToCanvas, toPdfBlob, tr, type L } from "./pdf-ui";

type Res = { name: string; before: number; after: number; blob: Blob };

const UI: Record<string, L> = {
  dpi: { en: "Resolution", zh: "分辨率", ja: "解像度", es: "Resolución", pt: "Resolução" },
  quality: { en: "JPEG quality", zh: "JPEG 质量", ja: "JPEG 品質", es: "Calidad JPEG", pt: "Qualidade JPEG" },
  gray: { en: "Convert to grayscale", zh: "转为灰度", ja: "グレースケールに変換", es: "Convertir a escala de grises", pt: "Converter para tons de cinza" },
  compress: { en: "Compress", zh: "开始压缩", ja: "圧縮する", es: "Comprimir", pt: "Comprimir" },
  before: { en: "Before", zh: "压缩前", ja: "圧縮前", es: "Antes", pt: "Antes" },
  after: { en: "After", zh: "压缩后", ja: "圧縮後", es: "Después", pt: "Depois" },
  saved: { en: "Saved", zh: "节省", ja: "削減", es: "Ahorro", pt: "Economia" },
  total: { en: "Total", zh: "合计", ja: "合計", es: "Total", pt: "Total" },
  bigger: { en: "no gain — try a lower resolution or quality", zh: "未能变小——试试更低的分辨率或质量", ja: "サイズを削減できませんでした。解像度または品質を下げてください", es: "sin ganancia — prueba una resolución o calidad menor", pt: "sem ganho — tente resolução ou qualidade menor" },
};

const DPI_OPTIONS = [72, 96, 120, 150];

export function PdfCompressEngine() {
  const { t, locale } = useI18n();
  const [files, setFiles] = useState<File[]>([]);
  const [dpi, setDpi] = useState(96);
  const [quality, setQuality] = useState(60);
  const [gray, setGray] = useState(false);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [err, setErr] = useState("");
  const [results, setResults] = useState<Res[]>([]);

  const addFiles = useCallback((list: File[]) => {
    const pdfs = list.filter((f) => /\.pdf$/i.test(f.name) || f.type === "application/pdf");
    if (pdfs.length) {
      setFiles((prev) => [...prev, ...pdfs]);
      setResults([]);
      setErr("");
    }
  }, []);

  const reset = () => {
    setFiles([]);
    setResults([]);
    setErr("");
    setProgress(0);
  };

  const removeAt = (i: number) => {
    setFiles((prev) => prev.filter((_, j) => j !== i));
    setResults([]);
  };

  async function run() {
    if (!files.length) {
      setErr(tr(SHARED.needFile, locale));
      return;
    }
    setBusy(true);
    setErr("");
    setResults([]);
    setProgress(0.02);
    const out: Res[] = [];
    try {
      const { PDFDocument } = await import("pdf-lib");
      const scale = dpi / 72;
      let done = 0;
      for (const f of files) {
        let pdf;
        try {
          pdf = await loadPdf(new Uint8Array(await f.arrayBuffer()));
        } catch {
          throw new Error("invalid:" + f.name);
        }
        const newDoc = await PDFDocument.create();
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const base = page.getViewport({ scale: 1 });
          const canvas = await renderPageToCanvas(page, scale);
          if (gray) {
            const ctx = canvas.getContext("2d");
            if (ctx) {
              const d = ctx.getImageData(0, 0, canvas.width, canvas.height);
              for (let p = 0; p < d.data.length; p += 4) {
                const v = (d.data[p] * 299 + d.data[p + 1] * 587 + d.data[p + 2] * 114) / 1000;
                d.data[p] = d.data[p + 1] = d.data[p + 2] = v;
              }
              ctx.putImageData(d, 0, 0);
            }
          }
          const jpg = await canvasToBlob(canvas, "image/jpeg", quality / 100);
          const img = await newDoc.embedJpg(await jpg.arrayBuffer());
          const p2 = newDoc.addPage([base.width, base.height]);
          p2.drawImage(img, { x: 0, y: 0, width: base.width, height: base.height });
          page.cleanup();
          done += 1;
          setProgress(Math.min(0.99, done / pdf.numPages / files.length + (out.length / Math.max(1, files.length)) * 0.5));
        }
        pdf.destroy();
        const bytes = await newDoc.save({ useObjectStreams: true });
        const name = `${baseName(f.name)}-compressed.pdf`;
        out.push({ name, before: f.size, after: bytes.length, blob: toPdfBlob(bytes) });
        setResults([...out]);
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : "";
      setErr(msg.startsWith("invalid:") ? tr(SHARED.failed, locale) : tr(SHARED.failed, locale));
    } finally {
      setBusy(false);
    }
  }

  async function zipAll() {
    const JSZip = (await import("jszip")).default;
    const zip = new JSZip();
    for (const r of results) zip.file(r.name, r.blob);
    downloadBlob(await zip.generateAsync({ type: "blob" }), "compressed-pdfs.zip");
  }

  const totalBefore = results.reduce((a, r) => a + r.before, 0);
  const totalAfter = results.reduce((a, r) => a + r.after, 0);

  return (
    <ToolPanel>
      <DropZone onFiles={addFiles} accept="application/pdf,.pdf">
        <p className="text-[14px] text-[var(--color-sub)]">{files.length ? tr(SHARED.addMore, locale) : t.common.dropFiles}</p>
      </DropZone>

      {files.length > 0 && (
        <ul className="mt-3 space-y-2">
          {files.map((f, i) => (
            <li key={`${f.name}-${i}`} className="flex items-center gap-2.5 rounded-xl border hairline px-3.5 py-2.5">
              <span className="min-w-0 flex-1 truncate text-[14px]">{f.name}</span>
              <span className="mono flex-none text-[12.5px] text-[var(--color-sub)]">{formatBytes(f.size)}</span>
              <button type="button" onClick={() => removeAt(i)} aria-label={tr(SHARED.remove, locale)}
                className="h-7 w-7 flex-none rounded-full text-[14px] leading-none text-[var(--color-sub)] hover:bg-[var(--color-surface)]">×</button>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <div>
          <Label>{tr(UI.dpi, locale)}</Label>
          <select className="field" value={dpi} onChange={(e) => setDpi(parseInt(e.target.value, 10))} aria-label={tr(UI.dpi, locale)}>
            {DPI_OPTIONS.map((d) => <option key={d} value={d}>{d} DPI</option>)}
          </select>
        </div>
        <div>
          <Label>{tr(UI.quality, locale)}: {quality}%</Label>
          <input type="range" min={30} max={92} value={quality} onChange={(e) => setQuality(parseInt(e.target.value, 10))} className="w-full" aria-label={tr(UI.quality, locale)} />
        </div>
        <label className="flex items-end gap-2 pb-2.5 text-[13.5px] text-[var(--color-sub)]">
          <input type="checkbox" checked={gray} onChange={(e) => setGray(e.target.checked)} className="h-4 w-4 accent-[var(--color-accent)]" />
          {tr(UI.gray, locale)}
        </label>
      </div>

      {busy && <div className="mt-3"><Progress value={progress} /></div>}
      <Err msg={err} />

      {results.length > 0 && (
        <div className="mt-4 overflow-x-auto rounded-2xl border hairline p-4">
          <table className="w-full text-[13.5px]">
            <thead>
              <tr className="text-left text-[var(--color-sub)]">
                <th className="py-1.5 pr-3 font-semibold">{t.common.input}</th>
                <th className="py-1.5 pr-3 font-semibold">{tr(UI.before, locale)}</th>
                <th className="py-1.5 pr-3 font-semibold">{tr(UI.after, locale)}</th>
                <th className="py-1.5 pr-3 font-semibold">{tr(UI.saved, locale)}</th>
                <th className="py-1.5" />
              </tr>
            </thead>
            <tbody>
              {results.map((r) => {
                const pct = r.before > 0 ? Math.round((1 - r.after / r.before) * 100) : 0;
                return (
                  <tr key={r.name} className="border-t hairline">
                    <td className="max-w-48 truncate py-2 pr-3">{r.name.replace(/-compressed\.pdf$/, ".pdf")}</td>
                    <td className="mono py-2 pr-3 text-[var(--color-sub)]">{formatBytes(r.before)}</td>
                    <td className="mono py-2 pr-3">{formatBytes(r.after)}</td>
                    <td className={`py-2 pr-3 font-medium ${pct > 0 ? "text-[var(--color-good)]" : "text-[var(--color-bad)]"}`}>
                      {pct > 0 ? `-${pct}%` : tr(UI.bigger, locale)}
                    </td>
                    <td className="py-2">
                      <button type="button" onClick={() => downloadBlob(r.blob, r.name)}
                        className="rounded-full border hairline px-3 py-1 text-[12.5px] font-medium hover:bg-[var(--color-surface)]">
                        {t.common.download}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {results.length > 1 && (
            <div className="mt-2 flex flex-wrap items-center justify-between gap-2 border-t hairline pt-3">
              <span className="text-[13px] text-[var(--color-sub)]">
                {tr(UI.total, locale)}: {formatBytes(totalBefore)} → {formatBytes(totalAfter)}
                {totalBefore > 0 && totalAfter < totalBefore && (
                  <span className="ml-1 font-medium text-[var(--color-good)]">-{Math.round((1 - totalAfter / totalBefore) * 100)}%</span>
                )}
              </span>
              <button type="button" onClick={zipAll}
                className="rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium hover:bg-[var(--color-surface)]">
                {tr(SHARED.downloadAll, locale)}
              </button>
            </div>
          )}
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2.5">
        <Primary onClick={run} disabled={busy || !files.length}>{tr(UI.compress, locale)}</Primary>
        {files.length > 0 && !busy && <Ghost onClick={reset}>{t.common.reset}</Ghost>}
      </div>
    </ToolPanel>
  );
}
