"use client";

import { useCallback, useRef, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { DropZone, downloadBlob, formatBytes } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import {
  SHARED, Err, FileRow, Ghost, Label, Primary, Progress, baseName, loadPdf,
  parsePageRanges, renderPageToCanvas, toPdfBlob, tr, type L,
} from "./pdf-ui";

type Rect = { x: number; y: number; w: number; h: number }; // fractions of page, 0..1, y from top

const UI: Record<string, L> = {
  crop: { en: "Crop PDF", zh: "裁剪 PDF", ja: "PDF を切り抜き", es: "Recortar PDF", pt: "Recortar PDF" },
  applyAll: { en: "All pages", zh: "所有页面", ja: "すべてのページ", es: "Todas las páginas", pt: "Todas as páginas" },
  applyRange: { en: "Custom pages", zh: "自定义页码", ja: "ページを指定", es: "Páginas personalizadas", pt: "Páginas personalizadas" },
  dragHint: { en: "Drag a rectangle on the preview, or fine-tune with the inputs below.", zh: "在预览上拖出矩形,或用下面的输入框微调。", ja: "プレビュー上でドラッグして範囲を指定するか、下の入力欄で微調整してください。", es: "Arrastra un rectángulo sobre la vista previa o ajústalo con los campos de abajo.", pt: "Arraste um retângulo na pré-visualização ou ajuste com os campos abaixo." },
  posX: { en: "Left (%)", zh: "左边距 (%)", ja: "左 (%)", es: "Izquierda (%)", pt: "Esquerda (%)" },
  posY: { en: "Top (%)", zh: "上边距 (%)", ja: "上 (%)", es: "Arriba (%)", pt: "Topo (%)" },
  posW: { en: "Width (%)", zh: "宽度 (%)", ja: "幅 (%)", es: "Ancho (%)", pt: "Largura (%)" },
  posH: { en: "Height (%)", zh: "高度 (%)", ja: "高さ (%)", es: "Alto (%)", pt: "Altura (%)" },
  clearSel: { en: "Clear selection", zh: "清除选区", ja: "選択を解除", es: "Borrar selección", pt: "Limpar seleção" },
  firstPage: { en: "Page 1 preview", zh: "第 1 页预览", ja: "1 ページ目のプレビュー", es: "Vista previa de la página 1", pt: "Pré-visualização da página 1" },
  cropNote: {
    en: "The crop is written as the PDF crop box: viewers and printers then show only the chosen region, while the original content stays in the file and can be restored by resetting the crop box.",
    zh: "裁剪以 PDF 裁剪框(crop box)方式写入:阅读器和打印机只显示所选区域,原始内容仍保留在文件中,重置裁剪框即可还原。",
    ja: "切り抜きは PDF のクロップボックスとして書き込まれます。ビューアやプリンターは選択した領域だけを表示しますが、元の内容はファイルに残っており、クロップボックスをリセットすれば復元できます。",
    es: "El recorte se escribe como crop box del PDF: los visores y las impresoras muestran solo la zona elegida, mientras el contenido original queda en el archivo y puede restaurarse restableciendo el crop box.",
    pt: "O recorte é gravado como crop box do PDF: visualizadores e impressoras mostram apenas a área escolhida, enquanto o conteúdo original permanece no arquivo e pode ser restaurado redefinindo o crop box.",
  },
};

export function PdfCropEngine() {
  const { t, locale } = useI18n();
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [ratio, setRatio] = useState(1); // page height / width from the render
  const [rect, setRect] = useState<Rect | null>(null);
  const [applyMode, setApplyMode] = useState<"all" | "range">("all");
  const [range, setRange] = useState("");
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [err, setErr] = useState("");
  const [out, setOut] = useState<{ name: string; blob: Blob } | null>(null);

  // drag state (in preview pixel space)
  const wrapRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef<{ x: number; y: number } | null>(null);

  const reset = useCallback(() => {
    setFile(null);
    setPreviewUrl("");
    setRect(null);
    setRange("");
    setApplyMode("all");
    setOut(null);
    setErr("");
    setProgress(0);
  }, []);

  const addFiles = useCallback(
    (list: File[]) => {
      setOut(null);
      setErr("");
      setRect(null);
      const pdfs = list.filter((f) => /\.pdf$/i.test(f.name) || f.type === "application/pdf");
      if (!pdfs.length) {
        setErr(t.common.error);
        return;
      }
      const f = pdfs[0];
      setFile(f);
      void (async () => {
        try {
          const pdf = await loadPdf(new Uint8Array(await f.arrayBuffer()));
          setPageCount(pdf.numPages);
          const page = await pdf.getPage(1);
          const v1 = page.getViewport({ scale: 1 });
          const canvas = await renderPageToCanvas(page, Math.min(1.5, 720 / v1.width));
          setPreviewUrl(canvas.toDataURL("image/png"));
          setRatio(v1.height / v1.width);
          page.cleanup();
          pdf.destroy();
        } catch (e) {
          console.error("[pdf-crop] preview failed:", e);
          setErr(tr(SHARED.failed, locale));
        }
      })();
    },
    [t.common.error, locale],
  );

  /** Convert a pointer event into preview-local fractions, clamped to [0,1]. */
  const point = (e: { clientX: number; clientY: number }): { x: number; y: number } | null => {
    const el = wrapRef.current;
    if (!el) return null;
    const r = el.getBoundingClientRect();
    const x = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
    const y = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
    return { x, y };
  };

  const onDown = (e: React.PointerEvent) => {
    const p = point(e);
    if (!p) return;
    dragStart.current = p;
    setRect({ x: p.x, y: p.y, w: 0, h: 0 });
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    if (!dragStart.current) return;
    const p = point(e);
    if (!p) return;
    const s = dragStart.current;
    setRect({ x: Math.min(s.x, p.x), y: Math.min(s.y, p.y), w: Math.abs(p.x - s.x), h: Math.abs(p.y - s.y) });
  };
  const onUp = () => {
    dragStart.current = null;
    setRect((r) => (r && r.w > 0.02 && r.h > 0.02 ? r : null));
  };

  const num = (v: number) => Math.round(v * 100);
  const setFromInput = (key: keyof Rect, raw: string) => {
    const v = (parseFloat(raw) || 0) / 100;
    setRect((prev) => {
      const base: Rect = prev ?? { x: 0.1, y: 0.1, w: 0.8, h: 0.8 };
      const next = { ...base, [key]: Math.min(1, Math.max(0, v)) } as Rect;
      next.x = Math.min(next.x, 1 - next.w);
      next.y = Math.min(next.y, 1 - next.h);
      next.w = Math.min(next.w, 1 - next.x);
      next.h = Math.min(next.h, 1 - next.y);
      return next;
    });
  };

  async function run() {
    if (!file) {
      setErr(tr(SHARED.needFile, locale));
      return;
    }
    if (!rect || rect.w <= 0 || rect.h <= 0) {
      setErr(tr(UI.dragHint, locale));
      return;
    }
    setBusy(true);
    setErr("");
    setOut(null);
    setProgress(0.05);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const doc = await PDFDocument.load(new Uint8Array(await file.arrayBuffer()), { ignoreEncryption: true });
      setProgress(0.3);
      const targets = applyMode === "all"
        ? doc.getPageIndices().map((i) => i + 1)
        : parsePageRanges(range, doc.getPageCount());
      if (!targets) {
        setErr(tr(SHARED.badRange, locale));
        return;
      }
      for (const p of targets) {
        const page = doc.getPage(p - 1);
        const { width, height } = page.getSize();
        // Canvas Y grows downward; PDF Y grows upward — flip the top edge.
        const x = rect.x * width;
        const w = rect.w * width;
        const h = rect.h * height;
        const y = (1 - rect.y - rect.h) * height;
        page.setCropBox(x, y, w, h);
      }
      const saved = await doc.save();
      setProgress(1);
      setOut({ name: `${baseName(file.name)}-cropped.pdf`, blob: toPdfBlob(saved) });
    } catch (e) {
      console.error("[pdf-crop] run failed:", e);
      setErr(tr(SHARED.failed, locale));
    } finally {
      setBusy(false);
    }
  }

  return (
    <ToolPanel>
      {!file && (
        <DropZone onFiles={addFiles} accept="application/pdf,.pdf">
          <p className="text-[14px] text-[var(--color-sub)]">{t.common.dropFile}</p>
        </DropZone>
      )}
      {file && (
        <div className="space-y-3">
          <ul className="space-y-2">
            <li className="rounded-xl">
              <FileRow
                name={file.name}
                size={pageCount ? `${tr(SHARED.pages, locale)}: ${pageCount} · ${formatBytes(file.size)}` : formatBytes(file.size)}
                onRemove={reset}
              />
            </li>
          </ul>

          {previewUrl && (
            <div>
              <Label>{tr(UI.firstPage, locale)}</Label>
              <div
                ref={wrapRef}
                role="application"
                aria-label={tr(UI.firstPage, locale)}
                className="relative w-full max-w-lg touch-none select-none overflow-hidden rounded-xl border hairline"
                style={{ aspectRatio: `1 / ${ratio}` }}
                onPointerDown={onDown}
                onPointerMove={onMove}
                onPointerUp={onUp}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={previewUrl} alt="" draggable={false} className="pointer-events-none absolute inset-0 h-full w-full object-fill" />
                {rect && (
                  <div
                    className="absolute border-2 border-[var(--color-accent)] bg-[var(--color-accent)]/20"
                    style={{
                      left: `${rect.x * 100}%`,
                      top: `${rect.y * 100}%`,
                      width: `${rect.w * 100}%`,
                      height: `${rect.h * 100}%`,
                    }}
                  />
                )}
              </div>
              <p className="mt-1.5 text-[12.5px] text-[var(--color-sub)]">{tr(UI.dragHint, locale)}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            <div>
              <Label>{tr(UI.posX, locale)}</Label>
              <input type="number" className="field" min={0} max={99} value={rect ? num(rect.x) : ""} disabled={!rect}
                onChange={(e) => setFromInput("x", e.target.value)} aria-label={tr(UI.posX, locale)} />
            </div>
            <div>
              <Label>{tr(UI.posY, locale)}</Label>
              <input type="number" className="field" min={0} max={99} value={rect ? num(rect.y) : ""} disabled={!rect}
                onChange={(e) => setFromInput("y", e.target.value)} aria-label={tr(UI.posY, locale)} />
            </div>
            <div>
              <Label>{tr(UI.posW, locale)}</Label>
              <input type="number" className="field" min={1} max={100} value={rect ? num(rect.w) : ""} disabled={!rect}
                onChange={(e) => setFromInput("w", e.target.value)} aria-label={tr(UI.posW, locale)} />
            </div>
            <div>
              <Label>{tr(UI.posH, locale)}</Label>
              <input type="number" className="field" min={1} max={100} value={rect ? num(rect.h) : ""} disabled={!rect}
                onChange={(e) => setFromInput("h", e.target.value)} aria-label={tr(UI.posH, locale)} />
            </div>
          </div>
          {rect && <Ghost onClick={() => setRect(null)}>{tr(UI.clearSel, locale)}</Ghost>}

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <Label>{tr(SHARED.pageRange, locale)}</Label>
              <div className="flex gap-2">
                <button type="button" onClick={() => setApplyMode("all")}
                  className={`rounded-full border px-3 py-1.5 text-[13px] font-medium ${applyMode === "all" ? "border-transparent bg-[var(--color-ink)] text-white" : "hairline hover:bg-[var(--color-surface)]"}`}>
                  {tr(UI.applyAll, locale)}
                </button>
                <button type="button" onClick={() => setApplyMode("range")}
                  className={`rounded-full border px-3 py-1.5 text-[13px] font-medium ${applyMode === "range" ? "border-transparent bg-[var(--color-ink)] text-white" : "hairline hover:bg-[var(--color-surface)]"}`}>
                  {tr(UI.applyRange, locale)}
                </button>
              </div>
            </div>
            {applyMode === "range" && (
              <div>
                <Label>{tr(SHARED.pageRange, locale)}</Label>
                <input className="field mono" value={range} onChange={(e) => setRange(e.target.value)}
                  placeholder="1-3, 5" aria-label={tr(SHARED.pageRange, locale)} />
              </div>
            )}
          </div>

          <p className="rounded-xl bg-[var(--color-surface)] px-3.5 py-3 text-[13.5px] leading-5 text-[var(--color-sub)]">
            {tr(UI.cropNote, locale)}
          </p>

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
            <Primary onClick={run} disabled={busy}>{tr(UI.crop, locale)}</Primary>
            {file && !busy && <Ghost onClick={reset}>{t.common.reset}</Ghost>}
          </div>
        </div>
      )}
    </ToolPanel>
  );
}
