"use client";

import { useCallback, useRef, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { DropZone, downloadBlob, formatBytes } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import {
  SHARED, Err, FileRow, Label, Primary, Progress, baseName, loadPdf,
  renderPageToCanvas, toPdfBlob, tr, type L,
} from "./pdf-ui";

type Rect = { x: number; y: number; w: number; h: number }; // 页面分数坐标,y 自顶

const UI: Record<string, L> = {
  redact: { en: "Redact PDF", zh: "涂黑 PDF", ja: "PDF を黒塗り", es: "Censurar PDF", pt: "Tachar PDF" },
  addFile: { en: "Drop a PDF to redact", zh: "拖入要涂黑的 PDF", ja: "黒塗りする PDF をドロップ", es: "Suelta un PDF para censurar", pt: "Solte um PDF para tachar" },
  dragHint: { en: "Drag boxes over the content to remove. Add as many as you need.", zh: "在要删除的内容上拖出黑框,可添加多个。", ja: "削除したい内容の上をドラッグして枠を作ります。いくつでも追加できます。", es: "Arrastra recuadros sobre el contenido a eliminar. Añade todos los que necesites.", pt: "Arraste retângulos sobre o conteúdo a remover. Adicione quantos precisar." },
  boxesOnPage: { en: "Boxes on this page", zh: "本页黑框", ja: "このページの枠", es: "Recuadros en esta página", pt: "Retângulos nesta página" },
  clearPage: { en: "Clear this page", zh: "清空本页", ja: "このページをクリア", es: "Vaciar esta página", pt: "Limpar esta página" },
  clearAll: { en: "Clear all pages", zh: "清空全部", ja: "すべてクリア", es: "Vaciar todo", pt: "Limpar tudo" },
  pageOf: { en: "Page {n} of {total}", zh: "第 {n} / {total} 页", ja: "{total} ページ中 {n} ページ目", es: "Página {n} de {total}", pt: "Página {n} de {total}" },
  empty: { en: "No boxes yet — nothing to redact on export.", zh: "还没有黑框——导出时不会有任何涂黑。", ja: "まだ枠がありません——書き出しても黒塗りはありません。", es: "Aún no hay recuadros — la exportación no censurará nada.", pt: "Ainda sem retângulos — a exportação não tachará nada." },
  redactNote: {
    en: "True redaction, not a black sticker: each page is re-rendered at 150 DPI and the marked regions are destroyed before the new PDF is written. The text under the boxes is physically gone — it cannot be selected, extracted or recovered, at the cost that redacted pages become images (no selectable text). Pages without boxes are copied unchanged.",
    zh: "真删除,不是贴黑条:每页按 150 DPI 重新渲染,标记区域在写入新 PDF 前被物理销毁。黑框下的文字彻底消失——无法选中、无法提取、无法恢复;代价是被涂黑的页变成图像(无可选文本)。没有黑框的页原样复制。",
    ja: "黒シールではなく本物の削除:各ページを 150 DPI で再レンダリングし、マークした領域は新しい PDF を書き出す前に破壊されます。枠の下のテキストは物理的に消え、選択・抽出・復元はできません。その代償として黒塗りページは画像になります(テキスト選択不可)。枠のないページはそのままコピーされます。",
    es: "Censura real, no una etiqueta negra: cada página se vuelve a renderizar a 150 DPI y las regiones marcadas se destruyen antes de escribir el nuevo PDF. El texto bajo los recuadros desaparece físicamente: no se puede seleccionar, extraer ni recuperar, a cambio de que las páginas censuradas pasen a ser imágenes (sin texto seleccionable). Las páginas sin recuadros se copian sin cambios.",
    pt: "Tachadura real, não um adesivo preto: cada página é re-renderizada a 150 DPI e as regiões marcadas são destruídas antes de o novo PDF ser gravado. O texto sob os retângulos desaparece fisicamente — não pode ser selecionado, extraído nem recuperado; em troca, as páginas tachadas viram imagens (sem texto selecionável). Páginas sem retângulos são copiadas sem alteração.",
  },
};

const num2 = (v: number) => Math.round(v * 100);

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
      const { loadPdfjs, loadPdf } = await import("./pdf-ui");
      await loadPdfjs();
      const bytes = new Uint8Array(await f.arrayBuffer());
      const doc = await loadPdf(bytes);
      docRef.current = { doc, file: f };
      setFile(f);
      setPageCount(doc.numPages);
      await renderPreview(doc, 1);
    } catch (e) {
      setErr(e instanceof Error ? e.message : String(e));
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
      const { PDFDocument } = await import("pdf-lib");
      const outDoc = await PDFDocument.create();
      const DPI = 150;
      const scale = DPI / 72;
      for (let n = 1; n <= pageCount; n++) {
        const page = await doc.getPage(n);
        const vp = page.getViewport({ scale: 1 });
        const canvas = await renderPageToCanvas(page, scale);
        const ctx = canvas.getContext("2d");
        const rects = boxes[n] ?? [];
        if (ctx && rects.length > 0) {
          ctx.fillStyle = "#000000";
          for (const r of rects) {
            ctx.fillRect(r.x * canvas.width, r.y * canvas.height, r.w * canvas.width, r.h * canvas.height);
          }
        }
        const jpeg = canvasToJpegBytes(canvas);
        const img = await outDoc.embedJpg(jpeg);
        const p = outDoc.addPage([vp.width, vp.height]);
        p.drawImage(img, { x: 0, y: 0, width: vp.width, height: vp.height });
        setProgress(Math.round((n / pageCount) * 90));
      }
      const bytes = await outDoc.save();
      setProgress(100);
      setOut({ name: `${baseName(f.name)}-redacted.pdf`, blob: toPdfBlob(bytes) });
    } catch (e) {
      setErr(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  };

  return (
    <ToolPanel>
      <div className="space-y-5">
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

            <p className="rounded-xl bg-[var(--color-surface)] px-3.5 py-3 text-[13.5px] leading-5 text-[var(--color-sub)]">
              {tr(UI.redactNote, locale)}
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
