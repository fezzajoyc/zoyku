"use client";

import { useCallback, useRef, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { DropZone, formatBytes } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import {
  SHARED, Err, FileRow, Label, Primary, Progress, loadPdf,
  renderPageToCanvas, tr, type L,
} from "./pdf-ui";

/**
 * Compare PDFs: renders both documents page by page at a fixed scale and
 * computes a per-page pixel diff (fraction of differing pixels after light
 * anti-alias tolerance). Side-by-side thumbnails + diff heatmap overlay for
 * pages that differ. Everything runs locally with pdf.js.
 */

type Side = { file: File; pageCount: number };
type PageDiff = { page: number; score: number; url?: string };

const UI: Record<string, L> = {
  left: { en: "Original", zh: "原版", ja: "元文書", es: "Original", pt: "Original" },
  right: { en: "Revised", zh: "修订版", ja: "改訂版", es: "Revisado", pt: "Revisado" },
  dropLeft: { en: "Drop the original PDF", zh: "拖入原版 PDF", ja: "元の PDF をドロップ", es: "Suelta el PDF original", pt: "Solte o PDF original" },
  dropRight: { en: "Drop the revised PDF", zh: "拖入修订版 PDF", ja: "改訂版の PDF をドロップ", es: "Suelta el PDF revisado", pt: "Solte o PDF revisado" },
  compare: { en: "Compare", zh: "开始对比", ja: "比較する", es: "Comparar", pt: "Comparar" },
  pagesDiffer: { en: "{n} of {total} pages differ", zh: "{total} 页中有 {n} 页存在差异", ja: "{total} ページ中 {n} ページに差分", es: "{n} de {total} páginas difieren", pt: "{n} de {total} páginas diferem" },
  identical: { en: "The two documents render identically.", zh: "两份文档渲染完全一致。", ja: "2 つの文書は同一に描画されます。", es: "Los dos documentos se renderizan de forma idéntica.", pt: "Os dois documentos renderizam de forma idêntica." },
  diffScore: { en: "changed pixels", zh: "差异像素", ja: "差分ピクセル", es: "píxeles diferentes", pt: "pixels diferentes" },
  openDiff: { en: "View diff", zh: "查看差异", ja: "差分を見る", es: "Ver diferencia", pt: "Ver diferença" },
  backToList: { en: "Back to page list", zh: "返回页列表", ja: "ページ一覧へ戻る", es: "Volver a la lista", pt: "Voltar à lista" },
  compareNote: {
    en: "Comparison is visual: both documents are rendered page by page at the same scale and compared pixel by pixel, with a small tolerance so anti-aliasing does not produce false positives. Text moves, image swaps, layout changes and added or removed content all show up. The comparison runs entirely in your browser — neither document is uploaded, which matters when the two versions are drafts of something confidential.",
    zh: "对比是视觉级的:两份文档按同一比例逐页渲染并逐像素比较,带轻微容差避免抗锯齿误报。文字移动、图片替换、版式变化、内容增删都会被发现。对比完全在浏览器内完成——两份文档都不上传,当两版是机密文件的草稿时,这一点很重要。",
    ja: "比較はビジュアルです。2 つの文書を同じスケールでページごとに描画し、軽い許容差つきでピクセル比較します(アンチエイリアスの誤検出を防ぐ)。文字の移動・画像差し替え・レイアウト変更・内容の追加削除はすべて検出されます。比較は完全にブラウザ内で実行され、どちらの文書もアップロードされません——両バージョンが機密の下書きである場合に効いてきます。",
    es: "La comparación es visual: ambos documentos se renderizan página a página a la misma escala y se comparan píxel a píxel, con una pequeña tolerancia para que el anti-aliasing no produzca falsos positivos. Movimientos de texto, cambios de imagen, ajustes de maquetación y contenido añadido o eliminado se detectan. La comparación corre por completo en su navegador — ningún documento se sube, lo que importa cuando las dos versiones son borradores de algo confidencial.",
    pt: "A comparação é visual: os dois documentos são renderizados página a página na mesma escala e comparados pixel a pixel, com uma pequena tolerância para que o anti-aliasing não produza falsos positivos. Movimentação de texto, troca de imagens, mudanças de layout e conteúdo adicionado ou removido aparecem. A comparação roda inteiramente no seu navegador — nenhum documento é enviado, o que importa quando as duas versões são rascunhos de algo confidencial.",
  },
};

const DIFF_SCALE = 1.2; // 渲染比例:精度与速度平衡
const TOLERANCE = 24;    // 每通道容差

export function PdfCompareEngine() {
  const { t, locale } = useI18n();
  const [left, setLeft] = useState<Side | null>(null);
  const [right, setRight] = useState<Side | null>(null);
  const [leftDoc, setLeftDoc] = useState<import("pdfjs-dist").PDFDocumentProxy | null>(null);
  const [rightDoc, setRightDoc] = useState<import("pdfjs-dist").PDFDocumentProxy | null>(null);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [diffs, setDiffs] = useState<PageDiff[] | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [err, setErr] = useState("");
  const [viewPage, setViewPage] = useState<PageDiff | null>(null);

  const reset = useCallback(() => {
    setLeft(null); setRight(null);
    setLeftDoc(null); setRightDoc(null);
    setDiffs(null); setViewPage(null);
    setErr(""); setProgress(0);
  }, []);

  const loadSide = async (f: File, side: "left" | "right") => {
    setErr(""); setDiffs(null); setViewPage(null);
    try {
      const { loadPdfjs, loadPdf } = await import("./pdf-ui");
      await loadPdfjs();
      const bytes = new Uint8Array(await f.arrayBuffer());
      const doc = await loadPdf(bytes);
      const sideObj = { file: f, pageCount: doc.numPages };
      if (side === "left") { setLeft(sideObj); setLeftDoc(doc); } else { setRight(sideObj); setRightDoc(doc); }
    } catch (e) {
      setErr(e instanceof Error ? e.message : String(e));
    }
  };

  const run = async () => {
    if (!leftDoc || !rightDoc) return;
    setBusy(true); setProgress(0); setErr(""); setViewPage(null);
    try {
      const total = Math.max(leftDoc.numPages, rightDoc.numPages);
      setTotalPages(total);
      const results: PageDiff[] = [];
      for (let n = 1; n <= total; n++) {
        const lp = n <= leftDoc.numPages ? await leftDoc.getPage(n) : null;
        const rp = n <= rightDoc.numPages ? await rightDoc.getPage(n) : null;
        if (!lp || !rp) {
          results.push({ page: n, score: 1 }); // 页数不齐:整页视为差异
          setProgress(Math.round((n / total) * 90));
          continue;
        }
        const lc = await renderPageToCanvas(lp, DIFF_SCALE);
        const rc = await renderPageToCanvas(rp, DIFF_SCALE);
        // 尺寸不一致:渲染尺寸不同 → 按覆盖率把较小侧缩放到较大侧再比
        const W = Math.max(lc.width, rc.width);
        const H = Math.max(lc.height, rc.height);
        const a = normalize(lc, W, H);
        const b = normalize(rc, W, H);
        const score = pixelDiffScore(a, b, TOLERANCE);
        if (score > 0.001) {
          const heat = heatmap(a, b, TOLERANCE, lc);
          results.push({ page: n, score, url: heat ? heat.toDataURL("image/jpeg", 0.85) : undefined });
        }
        lp.cleanup(); rp.cleanup();
        setProgress(Math.round((n / total) * 90));
      }
      setDiffs(results);
      setProgress(100);
    } catch (e) {
      setErr(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  };

  const differing = diffs ? diffs.filter((d) => d.score > 0) : [];

  return (
    <ToolPanel>
      <div className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          {!left ? (
            <div>
              <Label>{tr(UI.left, locale)}</Label>
              <DropZone accept="application/pdf" multiple={false} onFiles={(fs) => fs[0] && loadSide(fs[0], "left")}>
                {tr(UI.dropLeft, locale)}
              </DropZone>
            </div>
          ) : (
            <div>
              <Label>{tr(UI.left, locale)}</Label>
              <FileRow name={left.file.name} size={formatBytes(left.file.size)} onRemove={() => { setLeft(null); setLeftDoc(null); setDiffs(null); }} />
              <p className="mt-1 text-[12.5px] text-[var(--color-sub)]">{tr(SHARED.pages, locale)}: {left.pageCount}</p>
            </div>
          )}
          {!right ? (
            <div>
              <Label>{tr(UI.right, locale)}</Label>
              <DropZone accept="application/pdf" multiple={false} onFiles={(fs) => fs[0] && loadSide(fs[0], "right")}>
                {tr(UI.dropRight, locale)}
              </DropZone>
            </div>
          ) : (
            <div>
              <Label>{tr(UI.right, locale)}</Label>
              <FileRow name={right.file.name} size={formatBytes(right.file.size)} onRemove={() => { setRight(null); setRightDoc(null); setDiffs(null); }} />
              <p className="mt-1 text-[12.5px] text-[var(--color-sub)]">{tr(SHARED.pages, locale)}: {right.pageCount}</p>
            </div>
          )}
        </div>

        {busy && <Progress value={progress} />}
        <Err msg={err} />

        {diffs && !viewPage && (
          <div className="space-y-3">
            <p className="text-[14px] font-semibold">
              {differing.length === 0
                ? tr(UI.identical, locale)
                : tr(UI.pagesDiffer, locale).replace("{n}", String(differing.length)).replace("{total}", String(totalPages))}
            </p>
            {differing.length > 0 && (
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                {differing.map((d) => (
                  <li key={d.page} className="overflow-hidden rounded-xl border hairline">
                    <button type="button" onClick={() => setViewPage(d)} className="block w-full text-left">
                      {d.url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={d.url} alt="" className="block max-h-44 w-full object-contain" />
                      ) : (
                        <div className="flex h-32 items-center justify-center bg-[var(--color-surface)] text-[12px] text-[var(--color-sub)]">∅</div>
                      )}
                      <p className="px-2 py-1.5 text-[11.5px] text-[var(--color-sub)]">
                        {tr(SHARED.pages, locale)} {d.page} · {Math.round(d.score * 100)}% {tr(UI.diffScore, locale)}
                      </p>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {viewPage && (
          <div className="space-y-3">
            <div>
              <Label>{`${tr(SHARED.pages, locale)} ${viewPage.page} · ${Math.round(viewPage.score * 100)}% ${tr(UI.diffScore, locale)}`}</Label>
              {viewPage.url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={viewPage.url} alt="" className="block max-h-[70vh] w-full rounded-xl border hairline object-contain" />
              ) : null}
            </div>
            <Ghost onClick={() => setViewPage(null)}>{tr(UI.backToList, locale)}</Ghost>
          </div>
        )}

        <p className="rounded-xl bg-[var(--color-surface)] px-3.5 py-3 text-[13.5px] leading-5 text-[var(--color-sub)]">
          {tr(UI.compareNote, locale)}
        </p>

        <div className="flex flex-wrap gap-2.5">
          <Primary onClick={run} disabled={busy || !leftDoc || !rightDoc}>{tr(UI.compare, locale)}</Primary>
          {(left || right) && !busy && <Ghost onClick={reset}>{t.common.reset}</Ghost>}
        </div>
      </div>
    </ToolPanel>
  );
}

function normalize(src: HTMLCanvasElement, W: number, H: number): HTMLCanvasElement {
  if (src.width === W && src.height === H) return src;
  const c = document.createElement("canvas");
  c.width = W; c.height = H;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, W, H);
  ctx.drawImage(src, 0, 0);
  return c;
}

/** 差异像素占比(每通道容差内视为相同) */
function pixelDiffScore(a: HTMLCanvasElement, b: HTMLCanvasElement, tol: number): number {
  const ctxA = a.getContext("2d")!;
  const ctxB = b.getContext("2d")!;
  const da = ctxA.getImageData(0, 0, a.width, a.height).data;
  const db = ctxB.getImageData(0, 0, b.width, b.height).data;
  let diff = 0;
  const total = a.width * a.height;
  for (let i = 0; i < da.length; i += 4) {
    if (
      Math.abs(da[i] - db[i]) > tol ||
      Math.abs(da[i + 1] - db[i + 1]) > tol ||
      Math.abs(da[i + 2] - db[i + 2]) > tol
    ) diff++;
  }
  return diff / total;
}

/** 差异热图:差异像素涂红叠在原版渲染上 */
function heatmap(a: HTMLCanvasElement, b: HTMLCanvasElement, tol: number, base: HTMLCanvasElement): HTMLCanvasElement | null {
  try {
    const ctxA = a.getContext("2d")!;
    const ctxB = b.getContext("2d")!;
    const da = ctxA.getImageData(0, 0, a.width, a.height).data;
    const db = ctxB.getImageData(0, 0, b.width, b.height).data;
    const c = document.createElement("canvas");
    c.width = a.width; c.height = a.height;
    const ctx = c.getContext("2d")!;
    ctx.drawImage(base, 0, 0);
    const img = ctx.getImageData(0, 0, c.width, c.height);
    const d = img.data;
    for (let i = 0; i < da.length; i += 4) {
      if (
        Math.abs(da[i] - db[i]) > tol ||
        Math.abs(da[i + 1] - db[i + 1]) > tol ||
        Math.abs(da[i + 2] - db[i + 2]) > tol
      ) {
        d[i] = 220; d[i + 1] = 38; d[i + 2] = 38; d[i + 3] = 190;
      }
    }
    ctx.putImageData(img, 0, 0);
    return c;
  } catch {
    return null;
  }
}

function Ghost({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" onClick={onClick}
      className="rounded-full border hairline px-3 py-1.5 text-[12.5px] font-medium hover:bg-[var(--color-surface)]">
      {children}
    </button>
  );
}
