"use client";

import type { ReactNode } from "react";
import type { Locale } from "@/lib/site";
import type { PDFDocumentProxy, PDFPageProxy } from "pdfjs-dist";
import { useI18n } from "@/components/i18n-provider";

/* ------------------------------------------------------------------ */
/* pdf.js loader — main-thread "fake worker", no worker URL / CDN.    */
/* Setting globalThis.pdfjsWorker before the first getDocument() call */
/* makes pdf.js skip `new Worker(...)` entirely (verified in 4.10).   */
/* ------------------------------------------------------------------ */

let pdfjsCache: typeof import("pdfjs-dist") | null = null;

export async function loadPdfjs() {
  if (!pdfjsCache) {
    const [pdfjs, worker] = await Promise.all([
      import("pdfjs-dist"),
      import("pdfjs-dist/build/pdf.worker.min.mjs"),
    ]);
    (globalThis as unknown as Record<string, unknown>).pdfjsWorker = worker;
    pdfjsCache = pdfjs;
  }
  return pdfjsCache;
}

export async function loadPdf(bytes: Uint8Array): Promise<PDFDocumentProxy> {
  const pdfjs = await loadPdfjs();
  // pdf.js transfers the buffer, so always hand it a copy.
  return pdfjs.getDocument({ data: bytes.slice(0), isEvalSupported: false }).promise;
}

/** Render one pdf.js page into a fresh canvas at the given scale. */
export async function renderPageToCanvas(page: PDFPageProxy, scale: number): Promise<HTMLCanvasElement> {
  const viewport = page.getViewport({ scale });
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.floor(viewport.width));
  canvas.height = Math.max(1, Math.floor(viewport.height));
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas unavailable");
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  await page.render({ canvasContext: ctx, viewport }).promise;
  return canvas;
}

/** pdf-lib's Uint8Array does not satisfy BlobPart under TS 5.9's lib — cast once, here. */
export function toPdfBlob(bytes: Uint8Array): Blob {
  return new Blob([bytes as unknown as BlobPart], { type: "application/pdf" });
}

export function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality?: number): Promise<Blob> {
  return new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("encode failed"))), type, quality),
  );
}

export { downloadBlob, formatBytes } from "@/components/client-ui";

/* ------------------------------------------------------------------ */
/* Inline labels (Record<Locale, string>) and tiny UI atoms.          */
/* ------------------------------------------------------------------ */

export type L = Record<string, string>;
export function tr(labels: L, locale: Locale): string {
  return labels[locale] ?? labels.en;
}

export const SHARED: Record<string, L> = {
  pages: { en: "Pages", zh: "页数", ja: "ページ数", es: "Páginas", pt: "Páginas" },
  pageRange: { en: "Pages (e.g. 1-3, 5)", zh: "页码(如 1-3, 5)", ja: "ページ(例: 1-3, 5)", es: "Páginas (p. ej. 1-3, 5)", pt: "Páginas (ex.: 1-3, 5)" },
  allPages: { en: "All pages", zh: "所有页面", ja: "すべてのページ", es: "Todas las páginas", pt: "Todas as páginas" },
  remove: { en: "Remove", zh: "移除", ja: "削除", es: "Quitar", pt: "Remover" },
  moveUp: { en: "Move up", zh: "上移", ja: "上へ", es: "Subir", pt: "Mover para cima" },
  moveDown: { en: "Move down", zh: "下移", ja: "下へ", es: "Bajar", pt: "Mover para baixo" },
  downloadAll: { en: "Download all (.zip)", zh: "打包下载(.zip)", ja: "すべてダウンロード(.zip)", es: "Descargar todo (.zip)", pt: "Baixar tudo (.zip)" },
  result: { en: "Result", zh: "结果", ja: "結果", es: "Resultado", pt: "Resultado" },
  addMore: { en: "Add more files", zh: "继续添加文件", ja: "ファイルを追加", es: "Añadir más archivos", pt: "Adicionar mais arquivos" },
  needFile: { en: "Choose a PDF file first.", zh: "请先选择 PDF 文件。", ja: "先に PDF ファイルを選択してください。", es: "Primero elige un archivo PDF.", pt: "Escolha um arquivo PDF primeiro." },
  badRange: { en: "Invalid page list.", zh: "页码格式不正确。", ja: "ページ指定が正しくありません。", es: "Lista de páginas no válida.", pt: "Lista de páginas inválida." },
  failed: { en: "Could not process this file. Is it a valid PDF?", zh: "无法处理该文件,请确认它是有效的 PDF。", ja: "このファイルを処理できませんでした。有効な PDF か確認してください。", es: "No se pudo procesar el archivo. ¿Es un PDF válido?", pt: "Não foi possível processar o arquivo. É um PDF válido?" },
  rasterizeNote: { en: "Compression re-renders pages as images at your chosen DPI — text will no longer be selectable or searchable.", zh: "压缩会把每页按所选 DPI 重新渲染为图片,文字将无法选中或搜索。", ja: "圧縮は各ページを指定 DPI の画像として再描画するため、文字の選択・検索はできなくなります。", es: "La compresión vuelve a renderizar las páginas como imágenes al DPI elegido: el texto ya no se podrá seleccionar ni buscar.", pt: "A compressão renderiza as páginas como imagens no DPI escolhido — o texto deixará de ser selecionável ou pesquisável." },
  textPdfNote: { en: "Works best on text-based PDFs. Scanned documents and complex two-column layouts may lose formatting — use PDF to Text or OCR for those.", zh: "适合文本型 PDF。扫描件和复杂双栏排版可能丢失格式,这类文件请用 PDF 转文本或 OCR 工具。", ja: "テキスト型 PDF に最適です。スキャン文書や複雑な段組レイアウトでは書式が崩れる場合があり、その場合は PDF からテキスト抽出や OCR をご利用ください。", es: "Funciona mejor con PDF de texto. Los documentos escaneados y los diseños complejos pueden perder el formato; usa PDF a texto u OCR para esos casos.", pt: "Funciona melhor com PDFs de texto. Documentos escaneados e layouts complexos podem perder a formatação — use PDF para texto ou OCR nesses casos." },

  encrypted: { en: "This PDF is password-protected and cannot be processed here.", zh: "该 PDF 有密码保护,无法在此处理。", ja: "この PDF はパスワードで保護されているため処理できません。", es: "Este PDF está protegido con contraseña y no se puede procesar aquí.", pt: "Este PDF é protegido por senha e não pode ser processado aqui." },
  outName: { en: "Output", zh: "输出文件", ja: "出力", es: "Salida", pt: "Saída" },
  done: { en: "Done", zh: "完成", ja: "完了", es: "Listo", pt: "Pronto" },
};

export function Err({ msg }: { msg: string }) {
  if (!msg) return null;
  return (
    <p role="alert" className="mt-3 rounded-xl error-bg px-3.5 py-2.5 text-[13.5px] leading-5 text-[var(--color-bad)]">
      {msg}
    </p>
  );
}

export function Primary({
  onClick, disabled, children,
}: { onClick: () => void; disabled?: boolean; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="rounded-full bg-[var(--color-accent)] px-5 py-2.5 text-[15px] font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
    >
      {children}
    </button>
  );
}

export function Ghost({
  onClick, children, className = "",
}: { onClick: () => void; children: ReactNode; className?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)] ${className}`}
    >
      {children}
    </button>
  );
}

export function Label({ children }: { children: ReactNode }) {
  return <span className="mb-1.5 block text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">{children}</span>;
}

export function Progress({ value }: { value: number }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--color-surface)]" role="progressbar" aria-valuenow={Math.round(value * 100)} aria-valuemin={0} aria-valuemax={100}>
      <div className="h-full rounded-full bg-[var(--color-accent)] transition-[width]" style={{ width: `${Math.round(value * 100)}%` }} />
    </div>
  );
}

/** One chosen file with optional reorder/remove controls. */
export function FileRow({
  name, size, first, last, onUp, onDown, onRemove, controls = true,
}: {
  name: string; size?: string; first?: boolean; last?: boolean;
  onUp?: () => void; onDown?: () => void; onRemove?: () => void; controls?: boolean;
}) {
  const { locale } = useI18n();
  return (
    <li className="flex items-center gap-2.5 rounded-xl border hairline px-3.5 py-2.5">
      <span className="min-w-0 flex-1 truncate text-[14px]">{name}</span>
      {size && <span className="mono flex-none text-[12.5px] text-[var(--color-sub)]">{size}</span>}
      {controls && (
        <span className="flex flex-none items-center gap-1">
          {onUp && !first && (
            <button type="button" aria-label={tr(SHARED.moveUp, locale)} onClick={onUp}
              className="h-7 w-7 rounded-full text-[13px] text-[var(--color-sub)] hover:bg-[var(--color-surface)]"><span aria-hidden="true">↑</span></button>
          )}
          {onDown && !last && (
            <button type="button" aria-label={tr(SHARED.moveDown, locale)} onClick={onDown}
              className="h-7 w-7 rounded-full text-[13px] text-[var(--color-sub)] hover:bg-[var(--color-surface)]"><span aria-hidden="true">↓</span></button>
          )}
          {onRemove && (
            <button type="button" aria-label={tr(SHARED.remove, locale)} onClick={onRemove}
              className="h-7 w-7 rounded-full text-[14px] leading-none text-[var(--color-sub)] hover:bg-[var(--color-surface)]"><span aria-hidden="true">×</span></button>
          )}
        </span>
      )}
    </li>
  );
}

/* ------------------------------------------------------------------ */
/* Misc helpers                                                        */
/* ------------------------------------------------------------------ */

/** Parse "1,3-5" into sorted unique 1-based page numbers within [1, count]. */
export function parsePageRanges(spec: string, count: number): number[] | null {
  const out = new Set<number>();
  for (const part of spec.split(/[,，、\s]+/).filter(Boolean)) {
    const m = part.match(/^(\d+)(?:\s*[-–~]\s*(\d+))?$/);
    if (!m) return null;
    const a = parseInt(m[1], 10);
    const b = m[2] ? parseInt(m[2], 10) : a;
    if (!Number.isFinite(a) || !Number.isFinite(b) || a < 1 || b < a) return null;
    for (let i = a; i <= Math.min(b, count); i++) out.add(i);
  }
  if (out.size === 0) return null;
  return [...out].sort((x, y) => x - y);
}

export function baseName(name: string): string {
  return name.replace(/\.[^.]+$/, "") || "file";
}

export function toDataUrl(canvas: HTMLCanvasElement): string {
  return canvas.toDataURL("image/png");
}
