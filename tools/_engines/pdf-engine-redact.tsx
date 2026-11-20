"use client";

import { useCallback, useRef, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { DropZone, downloadBlob, formatBytes } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { REDACT_UI as UI } from "./pdf-locales";
import { preparePagesForRedaction, UnsupportedRedactionError } from "../_lib/pdf-redaction";
import {
  SHARED, Err, FileRow, Label, Primary, Progress, baseName, loadPdf,
  renderPageToCanvas, toPdfBlob, tr,
} from "./pdf-ui";

type Rect = { x: number; y: number; w: number; h: number }; // 页面分数坐标,y 自顶

export function PdfRedactEngine() {
  const { t, locale } = useI18n();
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [pageNo, setPageNo] = useState(1); // 1-based
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [ratio, setRatio] = useState(1);
  const [boxes, setBoxes] = useState<Record<number, Rect[]>>({}); // pageNo → rects
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [err, setErr] = useState("");
  const [out, setOut] = useState<{ name: string; blob: Blob } | null>(null);

  const wrapRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef<{ x: number; y: number } | null>(null);
  const docRef = useRef<{ doc: import("pdfjs-dist").PDFDocumentProxy; file: File } | null>(null);

  const totalBoxes = Object.values(boxes).reduce((s, r) => s + r.length, 0);
  const curBoxes = boxes[pageNo] ?? [];

  const reset = useCallback(() => {
    setFile(null);
    setPreviewUrl("");
    setBoxes({});
    setPageNo(1);
    setPageCount(0);
    setOut(null);
    setErr("");
    setProgress(0);
    docRef.current = null;
  }, []);

  const onFile = async (f: File) => {
    setErr("");
    setOut(null);
    setBoxes({});
    setPageNo(1);
    try {
      const bytes = new Uint8Array(await f.arrayBuffer());
      const doc = await loadPdf(bytes);
      docRef.current = { doc, file: f };
      setFile(f);
      setPageCount(doc.numPages);
      await renderPreview(doc, 1);
    } catch {
      setErr(tr(SHARED.failed, locale));
    }
  };

  const renderPreview = async (doc: import("pdfjs-dist").PDFDocumentProxy, n: number) => {
    const page = await doc.getPage(n);
    const vp = page.getViewport({ scale: 1 });
    setRatio(vp.height / vp.width);
    const canvas = await renderPageToCanvas(page, 1.6);
    setPreviewUrl(canvas.toDataURL("image/jpeg", 0.85));
  };

  const goPage = async (n: number) => {
    if (!docRef.current || n < 1 || n > pageCount) return;
    setPageNo(n);
    await renderPreview(docRef.current.doc, n);
  };

  const rel = (e: { clientX: number; clientY: number }) => {
    const el = wrapRef.current;
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return {
      x: Math.min(Math.max((e.clientX - r.left) / r.width, 0), 1),
      y: Math.min(Math.max((e.clientY - r.top) / r.height, 0), 1),
    };
  };

  const onDown = (e: React.PointerEvent) => {
    const p = rel(e);
    if (!p) return;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    dragStart.current = p;
    // 按下即追加一个零尺寸草稿框:onMove 只更新最后一个,onUp 固化,新拖动自然成为新框
    setBoxes((prev) => ({ ...prev, [pageNo]: [...(prev[pageNo] ?? []), { x: p.x, y: p.y, w: 0, h: 0 }] }));
  };
  const onMove = (e: React.PointerEvent) => {
    if (!dragStart.current || !wrapRef.current) return;
    const p = rel(e);
    const s = dragStart.current;
    if (!p) return;
    const draft: Rect = {
      x: Math.min(s.x, p.x), y: Math.min(s.y, p.y),
      w: Math.abs(p.x - s.x), h: Math.abs(p.y - s.y),
    };
    if (draft.w < 0.01 || draft.h < 0.01) return;
    setBoxes((prev) => {
      const list = prev[pageNo] ?? [];
      if (list.length === 0) return { ...prev, [pageNo]: [draft] };
      return { ...prev, [pageNo]: [...list.slice(0, -1), draft] };
    });
  };
  const onUp = () => { dragStart.current = null; };

  const run = async () => {
    if (!docRef.current || totalBoxes === 0) return;
    setBusy(true);
    setProgress(0);
    setErr("");
    setOut(null);
    try {
      const { doc, file: f } = docRef.current;
      const pdfLib = await import("pdf-lib");
      const { PDFDocument } = pdfLib;
      const source = await PDFDocument.load(await f.arrayBuffer());
      preparePagesForRedaction(source, source.getPageIndices().filter((index) => !boxes[index + 1]?.length), pdfLib);
      const outDoc = await PDFDocument.create();
      const DPI = 150;
      const scale = DPI / 72;
      for (let n = 1; n <= pageCount; n++) {
        const rects = boxes[n] ?? [];
        if (rects.length === 0) {
          const [unchanged] = await outDoc.copyPages(source, [n - 1]);
          outDoc.addPage(unchanged);
          setProgress(n / pageCount * 0.9);
          continue;
        }
        const page = await doc.getPage(n);
        const vp = page.getViewport({ scale: 1 });
        const canvas = await renderPageToCanvas(page, scale);
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("canvas unavailable");
        ctx.fillStyle = "#000000";
        for (const r of rects) {
          const x = Math.floor(r.x * canvas.width);
          const y = Math.floor(r.y * canvas.height);
          ctx.fillRect(x, y, Math.ceil((r.x + r.w) * canvas.width) - x, Math.ceil((r.y + r.h) * canvas.height) - y);
        }
        const jpeg = canvasToJpegBytes(canvas);
        const img = await outDoc.embedJpg(jpeg);
        const p = outDoc.addPage([vp.width, vp.height]);
        p.drawImage(img, { x: 0, y: 0, width: vp.width, height: vp.height });
        page.cleanup();
        setProgress(n / pageCount * 0.9);
      }
      const bytes = await outDoc.save();
      setProgress(1);
      setOut({ name: `${baseName(f.name)}-redacted.pdf`, blob: toPdfBlob(bytes) });
    } catch (error) {
      setErr(tr(error instanceof UnsupportedRedactionError ? UI.unsupported : SHARED.failed, locale));
    } finally {
      setBusy(false);
    }
  };

  return (
    <ToolPanel>
      <div className="space-y-5">
        <p className="rounded-xl bg-[var(--color-surface)] px-3.5 py-3 text-[13.5px] leading-5 text-[var(--color-sub)]">
          {tr(UI.redactNote, locale)}
        </p>
        {!file ? (
          <DropZone accept="application/pdf" multiple={false} onFiles={(fs) => fs[0] && onFile(fs[0])}>
            {tr(UI.addFile, locale)}
          </DropZone>
        ) : (
          <div className="space-y-4">
            <FileRow name={file.name} size={formatBytes(file.size)} onRemove={reset} />

            {/* 页码导航 */}
            <div className="flex items-center gap-3 text-[13.5px]">
              <button type="button" onClick={() => goPage(pageNo - 1)} disabled={pageNo <= 1}
                className="rounded-full border hairline px-3 py-1.5 font-medium disabled:opacity-40 hover:bg-[var(--color-surface)]">‹</button>
              <span className="mono tabular-nums text-[var(--color-sub)]">
                {tr(UI.pageOf, locale).replace("{n}", String(pageNo)).replace("{total}", String(pageCount))}
              </span>
              <button type="button" onClick={() => goPage(pageNo + 1)} disabled={pageNo >= pageCount}
                className="rounded-full border hairline px-3 py-1.5 font-medium disabled:opacity-40 hover:bg-[var(--color-surface)]">›</button>
              {curBoxes.length > 0 && (
                <Ghost onClick={() => setBoxes((p) => ({ ...p, [pageNo]: [] }))}>{tr(UI.clearPage, locale)}</Ghost>
              )}
              {totalBoxes > 0 && <Ghost onClick={() => setBoxes({})}>{tr(UI.clearAll, locale)}</Ghost>}
            </div>

            {previewUrl && (
              <div>
                <Label>{tr(UI.dragHint, locale)}</Label>
                <div
                  ref={wrapRef}
                  role="application"
                  aria-label={tr(UI.dragHint, locale)}
                  className="relative w-full max-w-lg touch-none select-none overflow-hidden rounded-xl border hairline"
                  style={{ aspectRatio: `1 / ${ratio}` }}
                  onPointerDown={onDown}
                  onPointerMove={onMove}
                  onPointerUp={onUp}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={previewUrl} alt="" draggable={false} className="pointer-events-none absolute inset-0 h-full w-full object-fill" />
                  {curBoxes.map((r, i) => (
                    <div key={i} aria-hidden className="absolute bg-black"
                      style={{ left: `${r.x * 100}%`, top: `${r.y * 100}%`, width: `${r.w * 100}%`, height: `${r.h * 100}%` }} />
                  ))}
                </div>
                <p className="mt-1.5 text-[12.5px] text-[var(--color-sub)]">
                  {curBoxes.length > 0
                    ? `${tr(UI.boxesOnPage, locale)}: ${curBoxes.length}`
                    : tr(UI.empty, locale)}
                </p>
              </div>
            )}

            {busy && <Progress value={progress} />}
            <Err msg={err} />

            {out && (
              <div className="rounded-2xl border hairline p-4">
                <p className="mb-2 text-[13.5px] font-semibold">{t.common.output}</p>
                <ul className="space-y-1.5">
                  <li className="flex items-center gap-2.5 text-[14px]">
                    <span className="min-w-0 flex-1 truncate">{out.name}</span>
                    <span className="mono flex-none text-[12.5px] text-[var(--color-sub)]">{formatBytes(out.blob.size)}</span>
                    <button type="button" onClick={() => downloadBlob(out.blob, out.name)}
                      className="flex-none rounded-full border hairline px-3 py-1 text-[12.5px] font-medium hover:bg-[var(--color-surface)]">
                      {t.common.download}
                    </button>
                  </li>
                </ul>
              </div>
            )}

            <div className="flex flex-wrap gap-2.5">
              <Primary onClick={run} disabled={busy || totalBoxes === 0}>{tr(UI.redact, locale)}</Primary>
              {file && !busy && <Ghost onClick={reset}>{t.common.reset}</Ghost>}
            </div>
          </div>
        )}
      </div>
    </ToolPanel>
  );
}

function canvasToJpegBytes(canvas: HTMLCanvasElement): Uint8Array {
  const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
  const b64 = dataUrl.split(",")[1];
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
  return arr;
}

function Ghost({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" onClick={onClick}
      className="rounded-full border hairline px-3 py-1.5 text-[12.5px] font-medium hover:bg-[var(--color-surface)]">
      {children}
    </button>
  );
}
