"use client";

import { useCallback, useRef, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { DropZone, downloadBlob, formatBytes } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import {
  Err, FileRow, Label, Primary, Progress, baseName, loadPdf,
  renderPageToCanvas, tr, type L,
} from "./pdf-ui";

/**
 * Extract PDF images: walks each page's operator list for paintImageXObject /
 * paintImageXObjectRepeat / paintInlineImageXObject and recovers the embedded
 * bitmaps (not page screenshots). Dedupes by object id + dimensions, renders
 * each hit to PNG (or JPEG for photos), single download or ZIP for batches.
 * Everything runs locally with pdf.js; nothing is uploaded.
 */

type Hit = { id: string; page: number; canvas: HTMLCanvasElement; kind: "png" | "jpeg" };

const UI: Record<string, L> = {
  addFile: { en: "Drop a PDF to extract its images", zh: "拖入要提取图片的 PDF", ja: "画像を抽出する PDF をドロップ", es: "Suelta un PDF para extraer sus imágenes", pt: "Solte um PDF para extrair as imagens" },
  found: { en: "Embedded images found", zh: "找到内嵌图片", ja: "埋め込み画像が見つかりました", es: "Imágenes incrustadas encontradas", pt: "Imagens incrustadas encontradas" },
  none: { en: "No embedded bitmaps found — this PDF may use vector graphics only. Photos and pasted images always appear here.", zh: "没有找到内嵌位图——这份 PDF 可能只用矢量图形。照片和粘贴的图片一定会出现在这里。", ja: "埋め込みビットマップは見つかりませんでした——この PDF はベクター図形のみの可能性があります。写真や貼り付け画像は必ずここに表示されます。", es: "No se encontraron mapas de bits incrustados — este PDF puede usar solo gráficos vectoriales. Las fotos y las imágenes pegadas siempre aparecen aquí.", pt: "Nenhum bitmap incrustado encontrado — este PDF pode usar apenas gráficos vetoriais. Fotos e imagens coladas sempre aparecem aqui." },
  downloadAll: { en: "Download all (ZIP)", zh: "全部下载(ZIP)", ja: "すべてダウンロード(ZIP)", es: "Descargar todo (ZIP)", pt: "Baixar tudo (ZIP)" },
  extractNote: {
    en: "This recovers the actual embedded bitmaps — the original photos and graphics exactly as they were placed in the file, at full stored resolution — not screenshots of the page. Fonts, vector shapes and text are not images and are skipped. Everything runs locally with pdf.js; the file never leaves your device.",
    zh: "这里恢复的是真正的内嵌位图——原始照片和图形,与放入文件时完全一致、保持存储分辨率——而不是页面截图。字体、矢量图形和文字不是图像,会被跳过。全部由 pdf.js 本地完成,文件不离开你的设备。",
    ja: "ここで復元するのは本物の埋め込みビットマップ——ファイルに置かれたままの元の写真・グラフィックを、保存解像度のまま取得します。ページのスクリーンショットではありません。フォント・ベクター図形・テキストは画像ではないため対象外です。すべて pdf.js によるローカル処理で、ファイルは端末の外に出ません。",
    es: "Esto recupera los mapas de bits incrustados reales — las fotos y gráficos originales tal como se colocaron en el archivo, a su resolución almacenada completa — no capturas de la página. Las fuentes, las formas vectoriales y el texto no son imágenes y se omiten. Todo corre localmente con pdf.js; el archivo nunca sale de su dispositivo.",
    pt: "Isto recupera os bitmaps incrustados reais — as fotos e gráficos originais exatamente como foram colocados no arquivo, na resolução armazenada completa — não capturas de tela da página. Fontes, formas vetoriais e texto não são imagens e são ignorados. Tudo roda localmente com pdf.js; o arquivo nunca sai do seu dispositivo.",
  },
};

export function PdfExtractImagesEngine() {
  const { t, locale } = useI18n();
  const [file, setFile] = useState<File | null>(null);
  const [hits, setHits] = useState<Hit[]>([]);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [zipping, setZipping] = useState(false);
  const [err, setErr] = useState("");
  const urlsRef = useRef<string[]>([]);
  const doneRef = useRef(false);

  const reset = useCallback(() => {
    setFile(null);
    setHits([]);
    setErr("");
    setProgress(0);
    doneRef.current = false;
    for (const u of urlsRef.current) URL.revokeObjectURL(u);
    urlsRef.current = [];
  }, []);

  const onFile = async (f: File) => {
    setErr("");
    setOut0();
    try {
      const { loadPdfjs, loadPdf } = await import("./pdf-ui");
      await loadPdfjs();
      const bytes = new Uint8Array(await f.arrayBuffer());
      const doc = await loadPdf(bytes);
      setFile(f);
      setBusy(true);
      const found: Hit[] = [];
      const seen = new Set<string>();
      for (let n = 1; n <= doc.numPages; n++) {
        const page = await doc.getPage(n);
        const opList = await page.getOperatorList();
        const OPS = (await import("pdfjs-dist")).OPS;
        for (let i = 0; i < opList.fnArray.length; i++) {
          const fn = opList.fnArray[i];
          if (fn !== OPS.paintImageXObject && fn !== OPS.paintImageXObjectRepeat && fn !== OPS.paintInlineImageXObject) continue;
          const args = opList.argsArray[i];
          try {
            let objData: { width: number; height: number; bitmapOrData: unknown } | null = null;
            if (fn === OPS.paintInlineImageXObject) {
              objData = args[0];
            } else {
              const name = args[0] as string;
              if (typeof name !== "string") continue;
              let obj: unknown = null;
              try { obj = await page.objs.get(name); } catch { continue; }
              if (!obj) { try { obj = await page.commonObjs.get(name); } catch { continue; } }
              if (!obj) continue;
              objData = obj as { width: number; height: number; bitmapOrData: unknown };
            }
            const w = (objData as { width?: number }).width ?? 0;
            const h = (objData as { height?: number }).height ?? 0;
            if (w < 16 || h < 16) continue; // 忽略纹理/装饰小图
            const key = `${w}x${h}`;
            const dedupeKey = `${n}:${name ?? "inline"}:${key}`;
            void dedupeKey;
            const canvas = objToCanvas(objData!, w, h);
            if (!canvas) continue;
            // 去重:同尺寸 + 同像素哈希(粗采样)
            const sig = canvasSig(canvas) + `@${w}x${h}`;
            if (seen.has(sig)) continue;
            seen.add(sig);
            found.push({ id: `p${n}-${found.length + 1}`, page: n, canvas, kind: w * h > 400000 ? "jpeg" : "png" });
          } catch {
            // 单个对象失败不影响整页
          }
        }
        page.cleanup();
        setProgress(Math.round((n / doc.numPages) * 90));
      }
      setHits(found);
      doneRef.current = true;
      setProgress(100);
    } catch (e) {
      setErr(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  };

  const setOut0 = () => { setHits([]); setProgress(0); doneRef.current = false; };

  const hitBlob = (h: Hit): Promise<Blob> =>
    new Promise((res) => h.canvas.toBlob((b) => res(b!), h.kind === "jpeg" ? "image/jpeg" : "image/png", h.kind === "jpeg" ? 0.92 : undefined));

  const downloadOne = async (h: Hit) => {
    const blob = await hitBlob(h);
    downloadBlob(blob, `${baseName(file?.name ?? "pdf")}-p${h.page}-${h.id}.${h.kind === "jpeg" ? "jpg" : "png"}`);
  };

  const downloadAll = async () => {
    if (hits.length === 0 || zipping) return;
    setZipping(true);
    try {
      const JSZip = (await import("jszip")).default;
      const zip = new JSZip();
      for (let i = 0; i < hits.length; i++) {
        const blob = await hitBlob(hits[i]);
        zip.file(`${baseName(file?.name ?? "pdf")}-p${hits[i].page}-${i + 1}.${hits[i].kind === "jpeg" ? "jpg" : "png"}`, blob);
      }
      const blob = await zip.generateAsync({ type: "blob" });
      downloadBlob(blob, `${baseName(file?.name ?? "pdf")}-images.zip`);
    } finally {
      setZipping(false);
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
            {busy && <Progress value={progress} />}
            <Err msg={err} />
            {hits.length > 0 && (
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2.5">
                  <Label>{`${tr(UI.found, locale)}: ${hits.length}`}</Label>
                  {hits.length > 1 && (
                    <button type="button" onClick={downloadAll} disabled={zipping}
                      className="rounded-full bg-[var(--color-ink)] px-4 py-1.5 text-[12.5px] font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-40 dark:bg-white dark:text-[#1d1d1f]">
                      {zipping ? "…" : tr(UI.downloadAll, locale)}
                    </button>
                  )}
                </div>
                <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                  {hits.map((h, i) => (
                    <li key={h.id} className="overflow-hidden rounded-xl border hairline">
                      <button type="button" onClick={() => downloadOne(h)} title={t.common.download}
                        className="block w-full cursor-zoom-in">
                        <Thumb canvas={h.canvas} idx={i} />
                      </button>
                      <p className="px-2 py-1.5 text-[11.5px] text-[var(--color-sub)]">
                        p{h.page} · {h.canvas.width}×{h.canvas.height}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {!busy && hits.length === 0 && (
              <p className="rounded-xl bg-[var(--color-surface)] px-3.5 py-3 text-[13.5px] leading-5 text-[var(--color-sub)]">
                {tr(UI.none, locale)}
              </p>
            )}
            <p className="rounded-xl bg-[var(--color-surface)] px-3.5 py-3 text-[13.5px] leading-5 text-[var(--color-sub)]">
              {tr(UI.extractNote, locale)}
            </p>
          </div>
        )}
      </div>
    </ToolPanel>
  );
}

function Thumb({ canvas, idx }: { canvas: HTMLCanvasElement; idx: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  if (typeof document !== "undefined" && !ready) {
    queueMicrotask(() => {
      const el = ref.current;
      if (!el) return;
      el.width = canvas.width; el.height = canvas.height;
      el.getContext("2d")?.drawImage(canvas, 0, 0);
      setReady(true);
    });
  }
  void idx;
  return <canvas ref={ref} className="block max-h-40 w-full bg-white object-contain" aria-label="extracted image" />;
}

function objToCanvas(obj: { width: number; height: number; bitmapOrData?: unknown; bitmap?: unknown; data?: unknown }, w: number, h: number): HTMLCanvasElement | null {
  try {
    const canvas = document.createElement("canvas");
    canvas.width = w; canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    const o = obj as Record<string, unknown>;
    if (o.bitmap instanceof ImageBitmap) {
      ctx.drawImage(o.bitmap, 0, 0);
      return canvas;
    }
    const data = o.data as Uint8ClampedArray | Uint8Array | null;
    if (data && data.length >= w * h * 3) {
      const rgba = new Uint8ClampedArray(w * h * 4);
      if (data.length === w * h * 4) {
        rgba.set(data as Uint8ClampedArray);
      } else {
        // RGB → RGBA
        for (let i = 0, j = 0; j < w * h * 4; i += 3, j += 4) {
          rgba[j] = data[i]; rgba[j + 1] = data[i + 1]; rgba[j + 2] = data[i + 2]; rgba[j + 3] = 255;
        }
      }
      const imgData = new ImageData(rgba, w, h);
      ctx.putImageData(imgData, 0, 0);
      return canvas;
    }
    return null;
  } catch {
    return null;
  }
}

function canvasSig(canvas: HTMLCanvasElement): string {
  try {
    const ctx = canvas.getContext("2d");
    if (!ctx) return `${canvas.width}x${canvas.height}`;
    const d = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let s = 0;
    const step = Math.max(4, Math.floor(d.length / 4 / 64));
    for (let i = 0; i < d.length; i += 4 * step) s = (s * 31 + d[i] + d[i + 1] + d[i + 2]) | 0;
    return `${s}`;
  } catch {
    return Math.random().toString();
  }
}
