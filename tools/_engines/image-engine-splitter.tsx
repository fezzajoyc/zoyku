"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { DropZone, downloadBlob, formatBytes } from "@/components/client-ui";
import { Icon } from "@/components/icons";
import type { Locale } from "@/lib/site";
import { ToolPanel } from "@/components/ui";
import { canvasToBlob, loadImage } from "./image-util";
import { ResultList, type ImgResult } from "./image-results";
import {
  MAX_GRID,
  MIN_GRID,
  clampGrid,
  computeTileGrid,
  imageBaseName,
  type Tile,
} from "@/tools/_lib/image-geometry";

/**
 * image-splitter 引擎:单图按行 × 列切成 PNG 小块(2–6 行列),
 * 预览叠加切分网格线;下载逐块,或 ZIP 打包(jszip 按需加载)。
 */

const L: Record<string, Record<string, string>> = {
  rows: { en: "Rows", zh: "行数", ja: "行数", es: "Filas", pt: "Linhas" },
  cols: { en: "Columns", zh: "列数", ja: "列数", es: "Columnas", pt: "Colunas" },
  apply: { en: "Split into tiles", zh: "切成小块", ja: "タイルに分割", es: "Dividir en mosaicos", pt: "Dividir em peças" },
  preview: { en: "Live preview — grid overlay", zh: "实时预览 · 切分网格", ja: "ライブプレビュー · グリッド", es: "Vista previa · cuadrícula", pt: "Pré-visualização · grade" },
  tiles: { en: "tiles", zh: "块", ja: "タイル", es: "mosaicos", pt: "peças" },
  lastCol: { en: "last column", zh: "最后一列", ja: "最終列", es: "última columna", pt: "última coluna" },
  lastRow: { en: "last row", zh: "最后一行", ja: "最終行", es: "última fila", pt: "última linha" },
  absorbs: {
    en: "absorbs the remainder",
    zh: "吸收余数像素",
    ja: "余りを吸収",
    pt: "absorve o resto",
    es: "absorbe el resto",
  },
  tooSmall: {
    en: "This image is too small for that grid — lower the rows or columns.",
    zh: "图片对这个网格来说太小了,请减少行数或列数。",
    ja: "このグリッドには画像が小さすぎます。行数か列数を減らしてください。",
    es: "Esta imagen es demasiado pequeña para esa cuadrícula: baja filas o columnas.",
    pt: "Esta imagem é pequena demais para essa grade: reduza linhas ou colunas.",
  },
};

const lineStyle = {
  background: "rgba(255,255,255,0.9)",
  boxShadow: "0 0 0 1px rgba(0,0,0,0.45)",
} as const;

export function ImageSplitterEngine() {
  const { t, locale } = useI18n();
  const [file, setFile] = useState<File | null>(null);
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  // 预览展示用 URL(loadImage 内部的 URL 读完即 revoke,不能复用)
  const [srcUrl, setSrcUrl] = useState("");
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [busy, setBusy] = useState(false);
  const [zipping, setZipping] = useState(false);
  const [err, setErr] = useState("");
  const [results, setResults] = useState<ImgResult[]>([]);

  const urlsRef = useRef<string[]>([]);
  const srcUrlRef = useRef("");
  useEffect(() => {
    const urls = urlsRef.current;
    return () => {
      urls.forEach((u) => URL.revokeObjectURL(u));
      if (srcUrlRef.current) URL.revokeObjectURL(srcUrlRef.current);
    };
  }, []);

  const trL = useCallback((k: string) => L[k][locale] ?? L[k].en, [locale]);

  const pick = useCallback(async (list: File[]) => {
    const f = list.find((x) => x.type.startsWith("image/"));
    if (!f) return;
    setFile(f);
    setResults([]);
    setErr("");
    setImg(null);
    const displayUrl = URL.createObjectURL(f);
    try {
      const loaded = await loadImage(f);
      if (srcUrlRef.current) URL.revokeObjectURL(srcUrlRef.current);
      srcUrlRef.current = displayUrl;
      setSrcUrl(displayUrl);
      setImg(loaded);
    } catch {
      URL.revokeObjectURL(displayUrl);
      setErr(t.common.error);
    }
    // t.common.error 刻意不进依赖
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reset = () => {
    setFile(null);
    setImg(null);
    setResults([]);
    setErr("");
    if (srcUrlRef.current) {
      URL.revokeObjectURL(srcUrlRef.current);
      srcUrlRef.current = "";
    }
    setSrcUrl("");
  };

  const setNum = (which: "rows" | "cols") => (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = clampGrid(Number(e.target.value));
    if (v === null) return;
    (which === "rows" ? setRows : setCols)(v);
  };

  const w = img?.naturalWidth ?? 0;
  const h = img?.naturalHeight ?? 0;
  const base = file ? imageBaseName(file.name) : "";
  const tiles: Tile[] | null = img ? computeTileGrid(w, h, rows, cols, base) : null;
  const tileW = tiles?.[0]?.w ?? 0;
  const tileH = tiles?.[0]?.h ?? 0;
  const lastColW = tiles ? tiles[tiles.length - 1].w : 0;
  const lastRowH = tiles ? tiles[tiles.length - 1].h : 0;
  const remainder = tiles ? lastColW !== tileW || lastRowH !== tileH : false;

  // 网格叠加线:块边界换算成百分比,任意缩放下都与真实切块对齐
  const xs: number[] = [];
  const ys: number[] = [];
  if (tiles) {
    for (const tile of tiles) {
      if (tile.col === 0) ys.push(tile.y);
      if (tile.row === 0) xs.push(tile.x);
    }
    xs.push(w);
    ys.push(h);
  }

  const run = useCallback(async () => {
    if (!file || !img) return;
    const plan = computeTileGrid(img.naturalWidth, img.naturalHeight, rows, cols, imageBaseName(file.name));
    if (!plan) return;
    setBusy(true);
    setErr("");
    const out: ImgResult[] = [];
    for (let i = 0; i < plan.length; i++) {
      const tile = plan[i];
      try {
        const canvas = document.createElement("canvas");
        canvas.width = tile.w;
        canvas.height = tile.h;
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("encode-failed");
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, tile.x, tile.y, tile.w, tile.h, 0, 0, tile.w, tile.h);
        const blob = await canvasToBlob(canvas, "image/png");
        const url = URL.createObjectURL(blob);
        urlsRef.current.push(url);
        out.push({
          id: `${tile.name}-${i}`,
          name: tile.name,
          ok: true,
          url,
          blob,
          // 小块行展示块自身体积,不与整图对比(避免误导性的"压缩率")
          before: blob.size,
          w: tile.w,
          h: tile.h,
        });
      } catch {
        out.push({
          id: `${tile.name}-${i}`,
          name: tile.name,
          ok: false,
          err: "encode",
          before: 0,
        });
      }
    }
    setResults((prev) => {
      prev.forEach((r) => r.url && URL.revokeObjectURL(r.url));
      return out;
    });
    setBusy(false);
  }, [file, img, rows, cols]);

  const zippingRef = useRef(false);
  const zipAll = useCallback(async () => {
    const ok = results.filter((r): r is ImgResult & { blob: Blob } => r.ok && r.blob !== undefined);
    if (!file || ok.length === 0 || zippingRef.current) return;
    zippingRef.current = true;
    setZipping(true);
    try {
      const JSZip = (await import("jszip")).default;
      const zip = new JSZip();
      for (const r of ok) zip.file(r.name, r.blob);
      downloadBlob(await zip.generateAsync({ type: "blob" }), `${imageBaseName(file.name)}-tiles.zip`);
    } catch {
      setErr(t.common.error);
    } finally {
      zippingRef.current = false;
      setZipping(false);
    }
  }, [results, file, t.common.error]);

  const numCls =
    "field mono w-20 text-center";

  return (
    <ToolPanel>
      <DropZone onFiles={(list) => void pick(list)} accept="image/*" multiple={false}>
        <p className="text-[14px] text-[var(--color-sub)]">{t.common.dropFile}</p>
      </DropZone>

      {file && (
        <ul className="mt-3 space-y-2">
          <li className="flex items-center gap-2.5 rounded-xl border hairline px-3.5 py-2.5">
            <span className="min-w-0 flex-1 truncate text-[14px]">{file.name}</span>
            <span className="mono flex-none text-[12.5px] text-[var(--color-sub)]">{formatBytes(file.size)}</span>
            <button type="button" onClick={reset} aria-label={t.common.clear}
              className="h-7 w-7 flex-none rounded-full text-[14px] leading-none text-[var(--color-sub)] hover:bg-[var(--color-surface)]">×</button>
          </li>
        </ul>
      )}

      {img && (
        <>
          <div className="mt-4">
            <span className="mb-1.5 block text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">{trL("preview")}</span>
            <div className="relative inline-block max-w-full overflow-hidden rounded-2xl border hairline">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={srcUrl} alt={trL("preview")} className="block h-auto max-w-full" />
              {tiles && (
                <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                  {xs.slice(0, -1).map((x) => (
                    <span key={`v${x}`} className="absolute top-0 bottom-0 w-[2px]" style={{ ...lineStyle, left: `${(x / w) * 100}%` }} />
                  ))}
                  {ys.slice(0, -1).map((y) => (
                    <span key={`h${y}`} className="absolute left-0 right-0 h-[2px]" style={{ ...lineStyle, top: `${(y / h) * 100}%` }} />
                  ))}
                </div>
              )}
            </div>
            <p className="mono mt-1.5 text-[12px] text-[var(--color-sub)]">
              {w} × {h} px
              {tiles ? (
                <>
                  {" · "}
                  {rows}×{cols} = {tiles.length} {trL("tiles")} · {tileW}×{tileH} px
                  {remainder && (
                    <>
                      {" · "}
                      {trL("lastCol")} {lastColW} px / {trL("lastRow")} {lastRowH} px {trL("absorbs")}
                    </>
                  )}
                </>
              ) : (
                <>
                  {" · "}
                  {trL("tooSmall")}
                </>
              )}
            </p>
          </div>

          <div className="mt-4 flex flex-wrap items-end gap-4">
            <label className="block">
              <span className="mb-1.5 block text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">
                {trL("rows")} ({MIN_GRID}–{MAX_GRID})
              </span>
              <input
                type="number"
                inputMode="numeric"
                min={MIN_GRID}
                max={MAX_GRID}
                step={1}
                value={rows}
                onChange={setNum("rows")}
                aria-label={trL("rows")}
                className={numCls}
              />
            </label>
            <span className="pb-2.5 text-[var(--color-sub)]">×</span>
            <label className="block">
              <span className="mb-1.5 block text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">
                {trL("cols")} ({MIN_GRID}–{MAX_GRID})
              </span>
              <input
                type="number"
                inputMode="numeric"
                min={MIN_GRID}
                max={MAX_GRID}
                step={1}
                value={cols}
                onChange={setNum("cols")}
                aria-label={trL("cols")}
                className={numCls}
              />
            </label>
          </div>
        </>
      )}

      {err && <p role="alert" className="mt-3 rounded-xl error-bg px-3.5 py-2.5 text-[13.5px] leading-5 text-[var(--color-bad)]">{err}</p>}

      <ResultList rows={results} busy={busy} onDownloadAll={zipping ? undefined : () => void zipAll()} />

      <div className="mt-4 flex flex-wrap gap-2.5">
        <button
          type="button"
          onClick={() => void run()}
          disabled={busy || !tiles}
          className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-accent)] px-4 py-2 text-[14px] font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Icon name="crop" size={15} />
          {busy ? t.common.processing : trL("apply")}
        </button>
        {file && !busy && (
          <button
            type="button"
            onClick={reset}
            className="rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)]"
          >
            {t.common.reset}
          </button>
        )}
      </div>
    </ToolPanel>
  );
}
