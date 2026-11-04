"use client";

import { useCallback, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { DropZone, downloadBlob, formatBytes } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { Lightbox } from "@/components/lightbox";
import {
  SHARED, Err, FileRow, Ghost, Label, Primary, Progress, baseName, loadPdf,
  parsePageRanges, renderPageToCanvas, toPdfBlob, tr, type L,
} from "./pdf-ui";
import type { PDFDocument } from "pdf-lib";

type Op = "merge" | "split" | "rotate" | "delete" | "rearrange";
type Out = { name: string; blob: Blob };

const UI: Record<string, L> = {
  merge: { en: "Merge PDFs", zh: "合并 PDF", ja: "PDF を結合", es: "Combinar PDF", pt: "Mesclar PDFs" },
  split: { en: "Split PDF", zh: "拆分 PDF", ja: "PDF を分割", es: "Dividir PDF", pt: "Dividir PDF" },
  rotate: { en: "Rotate pages", zh: "旋转页面", ja: "ページを回転", es: "Rotar páginas", pt: "Rotacionar páginas" },
  delete: { en: "Delete pages", zh: "删除页面", ja: "ページを削除", es: "Eliminar páginas", pt: "Excluir páginas" },
  applyOrder: { en: "Apply order & download", zh: "应用新顺序并下载", ja: "順序を適用してダウンロード", es: "Aplicar orden y descargar", pt: "Aplicar ordem e baixar" },
  everyN: { en: "Every N pages", zh: "每 N 页一份", ja: "N ページごと", es: "Cada N páginas", pt: "A cada N páginas" },
  ranges: { en: "Custom ranges", zh: "自定义范围", ja: "範囲を指定", es: "Rangos personalizados", pt: "Intervalos personalizados" },
  pagesPerFile: { en: "Pages per file", zh: "每个文件的页数", ja: "1 ファイルのページ数", es: "Páginas por archivo", pt: "Páginas por arquivo" },
  splitRanges: { en: "Ranges (e.g. 1-3, 4-6)", zh: "范围(如 1-3, 4-6)", ja: "範囲(例: 1-3, 4-6)", es: "Rangos (p. ej. 1-3, 4-6)", pt: "Intervalos (ex.: 1-3, 4-6)" },
  angle: { en: "Rotation", zh: "旋转角度", ja: "回転角度", es: "Ángulo", pt: "Ângulo" },
  deletePages: { en: "Pages to delete", zh: "要删除的页码", ja: "削除するページ", es: "Páginas a eliminar", pt: "Páginas a excluir" },
  deleteHint: { en: "The remaining pages keep their content unchanged.", zh: "其余页面内容保持不变。", ja: "残りのページは内容が変更されません。", es: "Las páginas restantes no cambian.", pt: "As páginas restantes permanecem inalteradas." },
  reverse: { en: "Reverse", zh: "反序", ja: "逆順", es: "Invertir", pt: "Inverter" },
  orderReset: { en: "Reset order", zh: "恢复原顺序", ja: "順序をリセット", es: "Restablecer", pt: "Redefinir ordem" },
  errAllDeleted: { en: "You cannot delete every page.", zh: "不能删除所有页面。", ja: "すべてのページは削除できません。", es: "No puedes eliminar todas las páginas.", pt: "Não é possível excluir todas as páginas." },
};

export function PdfPagesEngine({ op }: { op: Op }) {
  const { t, locale } = useI18n();
  const [files, setFiles] = useState<File[]>([]);
  const [count, setCount] = useState(0);
  const [busy, setBusy] = useState(false);
  const [zoom, setZoom] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [err, setErr] = useState("");
  const [outs, setOuts] = useState<Out[]>([]);

  // split options
  const [splitMode, setSplitMode] = useState<"every" | "ranges">("every");
  const [perFile, setPerFile] = useState(2);
  const [ranges, setRanges] = useState("");
  // rotate options
  const [angle, setAngle] = useState(90);
  const [rotPages, setRotPages] = useState("");
  // delete options
  const [delPages, setDelPages] = useState("");
  // rearrange state
  const [order, setOrder] = useState<number[]>([]);
  const [thumbs, setThumbs] = useState<string[]>([]);
  // merge drag-to-reorder (HTML5 DnD; ↑/↓ buttons remain as fallback)
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [overIdx, setOverIdx] = useState<number | null>(null);

  const single = op !== "merge";
  const file = files[0];

  const reset = useCallback(() => {
    setFiles([]);
    setCount(0);
    setOuts([]);
    setErr("");
    setOrder([]);
    setThumbs([]);
    setProgress(0);
  }, []);

  const addFiles = useCallback(
    (list: File[]) => {
      setOuts([]);
      setErr("");
      const pdfs = list.filter((f) => /\.pdf$/i.test(f.name) || f.type === "application/pdf");
      if (!pdfs.length) {
        setErr(t.common.error);
        return;
      }
      if (single) {
        setFiles([pdfs[0]]);
        void inspect(pdfs[0]);
      } else {
        setFiles((prev) => [...prev, ...pdfs]);
      }
    },
    [single, t.common.error],
  );

  /** 单文件操作:移除即回到选择态;合并:只移除这一行,其余保留。 */
  const removeAt = (i: number) => {
    setOuts([]);
    setErr("");
    if (single) {
      reset();
      return;
    }
    setFiles((prev) => prev.filter((_, k) => k !== i));
  };

  /** Read the page count (pdf-lib) and, for rearrange, page thumbnails (pdf.js). */
  async function inspect(f: File) {
    try {
      const { PDFDocument } = await import("pdf-lib");
      const doc = await PDFDocument.load(await f.arrayBuffer(), { ignoreEncryption: true });
      if (doc.isEncrypted) {
        setErr(tr(SHARED.encrypted, locale));
        return;
      }
      const n = doc.getPageCount();
      setCount(n);
      if (op === "rearrange") {
        setOrder(Array.from({ length: n }, (_, i) => i + 1));
        setThumbs([]);
        // Thumbnails are best-effort: rendered one by one, capped for large PDFs.
        try {
          const pdf = await loadPdf(new Uint8Array(await f.arrayBuffer()));
          const urls: string[] = [];
          const limit = Math.min(n, 60);
          for (let i = 1; i <= limit; i++) {
            const page = await pdf.getPage(i);
            const v1 = page.getViewport({ scale: 1 });
            const canvas = await renderPageToCanvas(page, Math.min(1.2, 150 / v1.width));
            urls.push(canvas.toDataURL("image/jpeg", 0.7));
            page.cleanup();
            if (i % 4 === 0) await new Promise((r) => setTimeout(r, 0));
          }
          setThumbs(urls);
          pdf.destroy();
        } catch {
          setThumbs([]);
        }
      }
    } catch {
      setErr(tr(SHARED.failed, locale));
    }
  }

  const move = (i: number, dir: -1 | 1) => {
    setOrder((prev) => {
      const next = [...prev];
      const j = i + dir;
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  };

  const reorderFiles = (from: number, to: number) => {
    setFiles((prev) => {
      const next = [...prev];
      const [f] = next.splice(from, 1);
      next.splice(to, 0, f);
      return next;
    });
  };

  async function run() {
    if (!files.length) {
      setErr(tr(SHARED.needFile, locale));
      return;
    }
    setBusy(true);
    setErr("");
    setOuts([]);
    setProgress(0.02);
    try {
      const { PDFDocument, degrees } = await import("pdf-lib");
      const out: Out[] = [];
      const load = async (f: File) => {
        const doc = await PDFDocument.load(await f.arrayBuffer(), { ignoreEncryption: true });
        if (doc.isEncrypted) throw new Error("encrypted");
        return doc;
      };
      const save = async (doc: PDFDocument, name: string) => {
        const bytes = await doc.save();
        out.push({ name, blob: toPdfBlob(bytes) });
      };

      if (op === "merge") {
        const merged = await PDFDocument.create();
        let i = 0;
        for (const f of files) {
          const src = await load(f);
          const pages = await merged.copyPages(src, src.getPageIndices());
          pages.forEach((p) => merged.addPage(p));
          setProgress(++i / files.length);
        }
        await save(merged, "merged.pdf");
      } else if (op === "split") {
        const src = await load(file);
        const n = src.getPageCount();
        const base = baseName(file.name);
        let groups: number[][] = [];
        if (splitMode === "every") {
          const size = Math.max(1, Math.floor(perFile) || 1);
          for (let i = 0; i < n; i += size) {
            // 1 基页码:copyPages 前统一 -1,标签直接可读
            groups.push(Array.from({ length: Math.min(size, n - i) }, (_, k) => i + k + 1));
          }
        } else {
          for (const part of ranges.split(/[,，、\s]+/).filter(Boolean)) {
            const nums = parsePageRanges(part, n);
            if (!nums) throw new Error("range");
            groups.push(nums);
          }
        }
        if (!groups.length) throw new Error("range");
        let gi = 0;
        for (const g of groups) {
          const dst = await PDFDocument.create();
          const pages = await dst.copyPages(src, g.map((p) => p - 1));
          pages.forEach((p) => dst.addPage(p));
          const label = g.length === 1 ? `${g[0]}` : `${g[0]}-${g[g.length - 1]}`;
          await save(dst, `${base}-${String(++gi).padStart(2, "0")}-p${label}.pdf`);
          setProgress(gi / groups.length);
        }
      } else if (op === "rotate") {
        const doc = await load(file);
        const targets = rotPages.trim()
          ? parsePageRanges(rotPages, doc.getPageCount())
          : doc.getPageIndices().map((i) => i + 1);
        if (!targets) throw new Error("range");
        for (const p of targets) {
          const page = doc.getPage(p - 1);
          page.setRotation(degrees((page.getRotation().angle + angle + 360) % 360));
        }
        await save(doc, `${baseName(file.name)}-rotated.pdf`);
      } else if (op === "delete") {
        const doc = await load(file);
        const n = doc.getPageCount();
        const del = parsePageRanges(delPages, n);
        if (!del) throw new Error("range");
        if (del.length >= n) throw new Error("all");
        const keep = Array.from({ length: n }, (_, i) => i + 1).filter((p) => !del.includes(p));
        const dst = await PDFDocument.create();
        const pages = await dst.copyPages(doc, keep.map((p) => p - 1));
        pages.forEach((p) => dst.addPage(p));
        await save(dst, `${baseName(file.name)}-pages-deleted.pdf`);
      } else {
        // rearrange — order always rebuilds the document in the chosen sequence
        const doc = await load(file);
        const dst = await PDFDocument.create();
        const pages = await dst.copyPages(doc, order.map((p) => p - 1));
        pages.forEach((p) => dst.addPage(p));
        await save(dst, `${baseName(file.name)}-reordered.pdf`);
      }
      setOuts(out);
    } catch (e) {
      console.error("[pdf-pages] run failed:", e);
      const msg = e instanceof Error ? e.message : "";
      if (msg === "encrypted") setErr(tr(SHARED.encrypted, locale));
      else if (msg === "all") setErr(tr(UI.errAllDeleted, locale));
      else if (msg === "range") setErr(tr(SHARED.badRange, locale));
      else setErr(tr(SHARED.failed, locale));
    } finally {
      setBusy(false);
    }
  }

  const btn = op === "merge" ? UI.merge : op === "split" ? UI.split : op === "rotate" ? UI.rotate : op === "delete" ? UI.delete : UI.applyOrder;

  return (
    <ToolPanel>
      {/* 合并等多文件操作:拖放区常驻,随时补加文件;单文件操作:选择后隐藏 */}
      {(files.length === 0 || !single) && (
        <DropZone onFiles={addFiles} accept="application/pdf,.pdf">
          <p className="text-[14px] text-[var(--color-sub)]">
            {files.length > 0
              ? tr(SHARED.addMore, locale)
              : single
                ? t.common.dropFile
                : t.common.dropFiles}
          </p>
        </DropZone>
      )}
      {files.length > 0 && (
        <div className={`space-y-3 ${files.length > 0 && !single ? "mt-3" : ""}`}>
          <ul className="space-y-2" onDragEnd={() => { setDragIdx(null); setOverIdx(null); }}>
            {files.map((f, i) => (
              <li
                key={`${f.name}-${i}`}
                draggable={op === "merge"}
                onDragStart={(e) => { setDragIdx(i); e.dataTransfer.effectAllowed = "move"; }}
                onDragOver={(e) => { if (dragIdx !== null && dragIdx !== i) { e.preventDefault(); e.dataTransfer.dropEffect = "move"; setOverIdx(i); } }}
                onDragLeave={() => setOverIdx((p) => (p === i ? null : p))}
                onDrop={(e) => { e.preventDefault(); if (dragIdx !== null && dragIdx !== i) reorderFiles(dragIdx, i); setDragIdx(null); setOverIdx(null); }}
                className={`rounded-xl ${overIdx === i ? "ring-2 ring-[var(--color-ink)]" : ""}`}
              >
                <FileRow
                  name={f.name}
                  size={single && count ? `${tr(SHARED.pages, locale)}: ${count} · ${formatBytes(f.size)}` : formatBytes(f.size)}
                  first={i === 0}
                  last={i === files.length - 1}
                  onUp={op === "merge" && i > 0 ? () => setFiles((p) => { const n = [...p]; [n[i - 1], n[i]] = [n[i], n[i - 1]]; return n; }) : undefined}
                  onDown={op === "merge" && i < files.length - 1 ? () => setFiles((p) => { const n = [...p]; [n[i + 1], n[i]] = [n[i], n[i + 1]]; return n; }) : undefined}
                  onRemove={() => removeAt(i)}
                />
              </li>
            ))}
          </ul>

          {op === "split" && (
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <Label>{tr(UI.everyN, locale)} / {tr(UI.ranges, locale)}</Label>
                <div className="flex gap-2">
                  <button type="button" onClick={() => setSplitMode("every")}
                    className={`rounded-full border px-3 py-1.5 text-[13px] font-medium ${splitMode === "every" ? "border-transparent bg-[var(--color-ink)] text-white" : "hairline hover:bg-[var(--color-surface)]"}`}>
                    {tr(UI.everyN, locale)}
                  </button>
                  <button type="button" onClick={() => setSplitMode("ranges")}
                    className={`rounded-full border px-3 py-1.5 text-[13px] font-medium ${splitMode === "ranges" ? "border-transparent bg-[var(--color-ink)] text-white" : "hairline hover:bg-[var(--color-surface)]"}`}>
                    {tr(UI.ranges, locale)}
                  </button>
                </div>
              </div>
              {splitMode === "every" ? (
                <div>
                  <Label>{tr(UI.pagesPerFile, locale)}</Label>
                  <input type="number" className="field bare" min={1} max={999} value={perFile}
                    onChange={(e) => setPerFile(parseInt(e.target.value, 10) || 1)} aria-label={tr(UI.pagesPerFile, locale)} />
                </div>
              ) : (
                <div>
                  <Label>{tr(UI.splitRanges, locale)}</Label>
                  <input className="field mono" value={ranges} onChange={(e) => setRanges(e.target.value)}
                    placeholder="1-3, 4-6, 8" aria-label={tr(UI.splitRanges, locale)} />
                </div>
              )}
            </div>
          )}

          {op === "rotate" && (
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <Label>{tr(UI.angle, locale)}</Label>
                <select className="field" value={angle} onChange={(e) => setAngle(parseInt(e.target.value, 10))} aria-label={tr(UI.angle, locale)}>
                  <option value={90}>90° ↻</option>
                  <option value={180}>180°</option>
                  <option value={270}>90° ↺</option>
                </select>
              </div>
              <div>
                <Label>{tr(SHARED.pageRange, locale)}</Label>
                <input className="field mono" value={rotPages} onChange={(e) => setRotPages(e.target.value)}
                  placeholder={tr(SHARED.allPages, locale)} aria-label={tr(SHARED.pageRange, locale)} />
              </div>
            </div>
          )}

          {op === "delete" && (
            <div>
              <Label>{tr(UI.deletePages, locale)}</Label>
              <input className="field mono" value={delPages} onChange={(e) => setDelPages(e.target.value)}
                placeholder="1, 3-5" aria-label={tr(UI.deletePages, locale)} />
              <p className="mt-1.5 text-[12.5px] text-[var(--color-sub)]">{tr(UI.deleteHint, locale)}</p>
            </div>
          )}

          {op === "rearrange" && order.length > 0 && (
            <div>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <Ghost onClick={() => setOrder((p) => [...p].reverse())}>{tr(UI.reverse, locale)}</Ghost>
                <Ghost onClick={() => setOrder(Array.from({ length: count }, (_, i) => i + 1))}>{tr(UI.orderReset, locale)}</Ghost>
              </div>
              <ol className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 md:grid-cols-5">
                {order.map((page, i) => (
                  <li key={page} className="flex flex-col items-center rounded-xl border hairline p-2">
                    <span className="mono mb-1 text-[11.5px] text-[var(--color-sub)]">{page}</span>
                    <span className="flex h-24 w-full items-center justify-center overflow-hidden rounded-lg bg-[var(--color-surface)]">
                      {thumbs[page - 1] ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={thumbs[page - 1]}
                          alt=""
                          className="max-h-24 max-w-full cursor-zoom-in object-contain transition-transform hover:scale-105"
                          onClick={() => setZoom(thumbs[page - 1]!)}
                        />
                      ) : (
                        <span className="mono text-[15px] text-[var(--color-sub)]">{page}</span>
                      )}
                    </span>
                    <span className="mt-1.5 flex gap-1">
                      <button type="button" aria-label={tr(SHARED.moveUp, locale)} disabled={i === 0} onClick={() => move(i, -1)}
                        className="h-6 w-6 rounded-full text-[12px] text-[var(--color-sub)] hover:bg-[var(--color-surface)] disabled:opacity-30">↑</button>
                      <button type="button" aria-label={tr(SHARED.moveDown, locale)} disabled={i === order.length - 1} onClick={() => move(i, 1)}
                        className="h-6 w-6 rounded-full text-[12px] text-[var(--color-sub)] hover:bg-[var(--color-surface)] disabled:opacity-30">↓</button>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {busy && <Progress value={progress} />}
          {zoom && <Lightbox src={zoom} alt="" onClose={() => setZoom(null)} />}
          <Err msg={err} />

          {outs.length > 0 && <Results outs={outs} />}

          <div className="flex flex-wrap gap-2.5">
            <Primary onClick={run} disabled={busy || (single && !count)}>{tr(btn, locale)}</Primary>
            {files.length > 0 && !busy && <Ghost onClick={reset}>{t.common.reset}</Ghost>}
          </div>
        </div>
      )}
    </ToolPanel>
  );
}

function Results({ outs }: { outs: Out[] }) {
  const { t, locale } = useI18n();
  const [zipBusy, setZipBusy] = useState(false);

  async function zipAll() {
    setZipBusy(true);
    try {
      const JSZip = (await import("jszip")).default;
      const zip = new JSZip();
      for (const o of outs) zip.file(o.name, o.blob);
      const blob = await zip.generateAsync({ type: "blob" });
      downloadBlob(blob, `${outs[0]?.name.replace(/\.pdf$/, "") ?? "files"}-pdf.zip`);
    } finally {
      setZipBusy(false);
    }
  }

  return (
    <div className="rounded-2xl border hairline p-4">
      <p className="mb-2 text-[13.5px] font-semibold">{t.common.output}</p>
      <ul className="space-y-1.5">
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
        <div className="mt-3">
          <button type="button" onClick={zipAll} disabled={zipBusy}
            className="rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium hover:bg-[var(--color-surface)] disabled:opacity-40">
            {zipBusy ? t.common.processing : tr(SHARED.downloadAll, locale)}
          </button>
        </div>
      )}
    </div>
  );
}
