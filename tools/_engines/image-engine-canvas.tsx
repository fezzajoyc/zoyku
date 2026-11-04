"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { DropZone } from "@/components/client-ui";
import { Icon } from "@/components/icons";
import type { Locale } from "@/lib/site";
import { ToolPanel } from "@/components/ui";
import {
  FORMAT_EXT,
  canvasToBlob,
  loadImage,
  originalFormat,
  outputName,
  supportsEncode,
  type ImgFormat,
} from "./image-util";
import { ResultList, downloadAllResults, type ImgResult } from "./image-results";

/**
 * 一个引擎服务 8 个图像工具:compress / resize / rotate / convert / exif-remove。
 * 工具文件通过可序列化 props 决定行为;处理全程用 Canvas API 在浏览器完成。
 */

export type CanvasOp = "compress" | "resize" | "rotate" | "convert" | "exif-remove";

export type ImageCanvasProps = {
  op: CanvasOp;
  accept?: string;
  /** convert/compress 的默认输出格式;lockFormat 时是唯一格式 */
  defaultFormat?: ImgFormat;
  /** 0–1 */
  defaultQuality?: number;
  /** 隐藏格式选择(jpg-to-png、png-to-jpg 用) */
  lockFormat?: boolean;
  suffix?: string;
};

type FormatChoice = ImgFormat | "original";

const L: Record<string, Record<string, string>> =  {
  outputFormat: {
    en: "Output format", zh: "输出格式", ja: "出力フォーマット",
    es: "Formato de salida", pt: "Formato de saída",
  },
  quality: {
    en: "Quality", zh: "画质", ja: "品質", es: "Calidad", pt: "Qualidade",
  },
  original: {
    en: "Same as original", zh: "与原图相同", ja: "元画像と同じ",
    es: "Igual que el original", pt: "Igual ao original",
  },
  width: { en: "Width", zh: "宽度", ja: "幅", es: "Ancho", pt: "Largura" },
  height: { en: "Height", zh: "高度", ja: "高さ", es: "Alto", pt: "Altura" },
  lockAspect: {
    en: "Lock aspect ratio", zh: "锁定宽高比", ja: "アスペクト比を固定",
    es: "Bloquear proporción", pt: "Manter proporção",
  },
  scale: { en: "Scale", zh: "缩放比例", ja: "拡大率", es: "Escala", pt: "Escala" },
  rotateCW: {
    en: "Rotate 90° CW", zh: "顺时针旋转 90°", ja: "90° 右に回転",
    es: "Girar 90° horario", pt: "Girar 90° horário",
  },
  rotateCCW: {
    en: "Rotate 90° CCW", zh: "逆时针旋转 90°", ja: "90° 左に回転",
    es: "Girar 90° antihorario", pt: "Girar 90° anti-horário",
  },
  rotate180: {
    en: "Rotate 180°", zh: "旋转 180°", ja: "180° 回転",
    es: "Girar 180°", pt: "Girar 180°",
  },
  flipH: {
    en: "Flip horizontal", zh: "水平翻转", ja: "左右反転",
    es: "Voltear horizontal", pt: "Espelhar horizontal",
  },
  flipV: {
    en: "Flip vertical", zh: "垂直翻转", ja: "上下反転",
    es: "Voltear vertical", pt: "Espelhar vertical",
  },
  stripNote: {
    en: "The image is re-encoded from raw pixels, which removes EXIF, GPS coordinates and all other metadata. Visual quality is kept at 92%.",
    zh: "图片会从原始像素重新编码,从而移除 EXIF、GPS 坐标等全部元数据,画质保持在 92%。",
    ja: "画像は生ピクセルから再エンコードされ、EXIF・GPS 座標などのメタデータがすべて削除されます。画質は 92% を維持します。",
    es: "La imagen se recodifica desde los píxeles originales, lo que elimina EXIF, las coordenadas GPS y todos los demás metadatos. La calidad visual se mantiene en el 92%.",
    pt: "A imagem é recodificada a partir dos pixels originais, o que remove EXIF, coordenadas GPS e todos os outros metadados. A qualidade visual é mantida em 92%.",
  },
  webpFallback: {
    en: "This browser cannot encode WebP — JPEG was used instead.",
    zh: "当前浏览器不支持 WebP 编码,已改用 JPEG。",
    ja: "このブラウザは WebP エンコードに対応していないため、JPEG で保存しました。",
    es: "Este navegador no puede generar WebP: se usó JPEG en su lugar.",
    pt: "Este navegador não gera WebP: foi usado JPEG no lugar.",
  },
  px: { en: "Pixels", zh: "像素", ja: "ピクセル", es: "Píxeles", pt: "Pixels" },
  pct: { en: "Percent", zh: "百分比", ja: "パーセント", es: "Porcentaje", pt: "Porcentagem" },
  appliedTo: {
    en: "Applied to all files",
    zh: "对所有文件生效",
    ja: "すべてのファイルに適用",
    es: "Se aplica a todos los archivos",
    pt: "Aplicado a todos os arquivos",
  },
} satisfies Record<string, Record<string, string>>;

const FORMAT_LABEL: Record<ImgFormat, string> = {
  "image/png": "PNG",
  "image/jpeg": "JPG",
  "image/webp": "WebP",
};

function chipCls(active: boolean): string {
  return `rounded-full border px-3 py-1.5 text-[13px] font-medium transition-colors ${
    active
      ? "border-transparent bg-[var(--color-ink)] text-white dark:bg-white dark:text-[#1d1d1f]"
      : "hairline hover:bg-[var(--color-surface)]"
  }`;
}

function drawToCanvas(
  img: HTMLImageElement,
  tw: number,
  th: number,
  rot = 0,
  flipH = false,
  flipV = false,
  opaque = false,
): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = tw;
  canvas.height = th;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("encode-failed");
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  if (opaque) {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, tw, th);
  }
  ctx.save();
  ctx.translate(tw / 2, th / 2);
  if (rot) ctx.rotate((rot * Math.PI) / 2);
  ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
  ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);
  ctx.restore();
  return canvas;
}

export function ImageCanvasEngine({
  op,
  accept = "image/*",
  defaultFormat = "image/jpeg",
  defaultQuality = 0.8,
  lockFormat = false,
  suffix = "",
}: ImageCanvasProps) {
  const { locale, t } = useI18n();
  const [files, setFiles] = useState<File[]>([]);
  const [results, setResults] = useState<ImgResult[]>([]);
  const [busy, setBusy] = useState(false);
  const [fellBack, setFellBack] = useState(false);

  // 输出设置
  const [fmt, setFmt] = useState<FormatChoice>(defaultFormat);
  const [quality, setQuality] = useState(Math.round(defaultQuality * 100));
  // resize 设置
  const [unit, setUnit] = useState<"px" | "pct">("px");
  const [wIn, setWIn] = useState(0);
  const [hIn, setHIn] = useState(0);
  const [pctIn, setPctIn] = useState(100);
  const [lock, setLock] = useState(true);
  const lastEdit = useRef<"w" | "h">("w");
  // rotate 设置
  const [rot, setRot] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);

  const urlsRef = useRef<string[]>([]);
  const trackUrl = (url: string) => urlsRef.current.push(url);

  useEffect(() => {
    const urls = urlsRef.current;
    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, []);

  const dropResults = useCallback(() => {
    setResults((prev) => {
      prev.forEach((r) => r.url && URL.revokeObjectURL(r.url));
      return [];
    });
  }, []);

  const addFiles = useCallback(
    (list: File[]) => {
      dropResults();
      setFiles((prev) => [...prev, ...list]);
    },
    [dropResults],
  );

  const clearFiles = useCallback(() => {
    dropResults();
    setFiles([]);
    setRot(0);
    setFlipH(false);
    setFlipV(false);
  }, [dropResults]);

  // resize:第一个文件载入后初始化像素输入
  useEffect(() => {
    if (op !== "resize" || files.length === 0) return;
    let alive = true;
    void loadImage(files[0]).then((img) => {
      if (!alive) return;
      setWIn(img.naturalWidth);
      setHIn(img.naturalHeight);
      lastEdit.current = "w";
    });
    return () => {
      alive = false;
    };
  }, [files, op]);

  const effectiveFormat: ImgFormat = fmt === "original" ? "image/jpeg" : fmt;

  // 换输出格式后重置 WebP 回退提示
  useEffect(() => {
    setFellBack(false);
  }, [fmt]);

  const run = useCallback(async () => {
    if (files.length === 0) return;
    setBusy(true);
    const rows: ImgResult[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const img = await loadImage(file);
        const nw = img.naturalWidth;
        const nh = img.naturalHeight;
        const before = file.size;

        let want: ImgFormat;
        if (fmt === "original") {
          want = originalFormat(file);
        } else {
          want = fmt;
        }
        let note: string | undefined;
        let target: ImgFormat = want;
        if (!supportsEncode(want)) {
          target = "image/jpeg";
          note = `${FORMAT_LABEL[want]} → JPEG`;
          setFellBack(true);
        }

        // 计算目标尺寸
        let tw = nw;
        let th = nh;
        if (op === "resize") {
          if (unit === "pct") {
            tw = Math.max(1, Math.round((nw * pctIn) / 100));
            th = Math.max(1, Math.round((nh * pctIn) / 100));
          } else if (lock) {
            const ratio = nh / nw;
            if (lastEdit.current === "w") {
              tw = Math.max(1, Math.round(wIn));
              th = Math.max(1, Math.round(tw * ratio));
            } else {
              th = Math.max(1, Math.round(hIn));
              tw = Math.max(1, Math.round(th / ratio));
            }
          } else {
            tw = Math.max(1, Math.round(wIn));
            th = Math.max(1, Math.round(hIn));
          }
        }
        // rotate:90/270 交换宽高
        if (op === "rotate" && rot % 2 === 1) {
          [tw, th] = [th, tw];
        }

        const lossy = target !== "image/png";
        const q = op === "exif-remove" ? 0.92 : lossy ? Math.min(1, Math.max(0.1, quality / 100)) : undefined;
        const canvas = drawToCanvas(img, tw, th, op === "rotate" ? rot : 0, op === "rotate" && flipH, op === "rotate" && flipV, target === "image/jpeg");
        const blob = await canvasToBlob(canvas, target, q);
        const outName =
          op === "convert" && FORMAT_EXT[target] === file.name.split(".").pop()?.toLowerCase()
            ? outputName(file, "-converted", FORMAT_EXT[target])
            : outputName(file, suffix, FORMAT_EXT[target]);
        const url = URL.createObjectURL(blob);
        trackUrl(url);
        rows.push({
          id: `${file.name}-${i}-${file.lastModified}`,
          name: outName,
          ok: true,
          url,
          blob,
          before,
          after: blob.size,
          w: tw,
          h: th,
          note,
        });
      } catch (e) {
        rows.push({
          id: `${file.name}-${i}-${file.lastModified}`,
          name: file.name,
          ok: false,
          err: e instanceof Error && e.message === "encode-failed" ? "encode" : "decode",
          before: file.size,
        });
      }
    }
    setResults((prev) => {
      prev.forEach((r) => r.url && URL.revokeObjectURL(r.url));
      return rows;
    });
    setBusy(false);
  }, [files, fmt, quality, op, unit, pctIn, wIn, hIn, lock, rot, flipH, flipV, suffix]);

  // 设置或文件变化后自动重跑(轻量防抖,滑块拖动不会每次 tick 都重编)
  useEffect(() => {
    if (files.length === 0) return;
    const timer = setTimeout(() => void run(), 220);
    return () => clearTimeout(timer);
  }, [run, files.length]);

  const lossyVisible = effectiveFormat !== "image/png";
  const showQuality = (op === "compress" || op === "convert") && lossyVisible;
  const showFormatChips = op === "compress" || (op === "convert" && !lockFormat);

  const filePills = useMemo(
    () =>
      files.map((f, i) => (
        <span
          key={`${f.name}-${i}-${f.lastModified}`}
          className="mono inline-flex max-w-full items-center gap-1 rounded-full bg-[var(--color-surface)] px-2.5 py-1 text-[12.5px]"
        >
          <span className="truncate">{f.name}</span>
        </span>
      )),
    [files],
  );

  return (
    <ToolPanel>
      <DropZone onFiles={addFiles} accept={accept}>
        <p className="text-[14px] text-[var(--color-sub)]">
          {files.length === 0 ? t.common.dropFiles : L.appliedTo[locale] ?? L.appliedTo.en}
        </p>
      </DropZone>

      {files.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          {filePills}
          <button
            type="button"
            onClick={clearFiles}
            className="rounded-full border hairline px-3 py-1 text-[12.5px] font-medium transition-colors hover:bg-[var(--color-surface)]"
          >
            {t.common.clear}
          </button>
        </div>
      )}

      {/* 按操作类型渲染设置区 */}
      {(showFormatChips || op === "convert") && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-[13px] font-semibold">{L.outputFormat[locale] ?? L.outputFormat.en}</span>
          {showFormatChips ? (
            (["image/jpeg", "image/webp", "image/png"] as ImgFormat[]).map((f) => (
              <button key={f} type="button" onClick={() => setFmt(f)} className={chipCls(fmt === f)}>
                {FORMAT_LABEL[f]}
              </button>
            ))
          ) : (
            <span className="mono rounded-full bg-[var(--color-surface)] px-3 py-1.5 text-[13px]">
              {FORMAT_LABEL[effectiveFormat]}
            </span>
          )}
          {fmt === "original" && <span className="text-[12.5px] text-[var(--color-sub)]">({L.original[locale] ?? L.original.en})</span>}
        </div>
      )}

      {showQuality && (
        <div className="mt-4">
          <label className="flex items-center gap-3 text-[13px] font-semibold">
            {L.quality[locale] ?? L.quality.en}
            <span className="mono rounded-full bg-[var(--color-surface)] px-2.5 py-1 text-[12.5px] font-medium">{quality}%</span>
            <input
              type="range"
              min={10}
              max={100}
              step={5}
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="min-w-40 flex-1"
              aria-label={L.quality[locale] ?? L.quality.en}
            />
          </label>
        </div>
      )}

      {op === "resize" && (
        <div className="mt-4 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[13px] font-semibold">{t.common.settings}</span>
            <button type="button" onClick={() => setUnit("px")} className={chipCls(unit === "px")}>
              {L.px[locale] ?? L.px.en}
            </button>
            <button type="button" onClick={() => setUnit("pct")} className={chipCls(unit === "pct")}>
              {L.pct[locale] ?? L.pct.en}
            </button>
          </div>
          {unit === "px" ? (
            <div className="flex flex-wrap items-center gap-2.5">
              <label className="flex items-center gap-1.5 text-[13px]">
                {L.width[locale] ?? L.width.en}
                <input
                  type="number"
                  min={1}
                  className="field bare mono w-28 px-2.5 py-1.5 text-[14px]"
                  value={wIn || ""}
                  onChange={(e) => {
                    lastEdit.current = "w";
                    setWIn(Number(e.target.value) || 0);
                    if (lock && hIn) setHIn(Math.round((Number(e.target.value) || 0) * (hIn / wIn || 0)));
                  }}
                  aria-label={L.width[locale] ?? L.width.en}
                />
              </label>
              <button
                type="button"
                onClick={() => setLock((v) => !v)}
                title={L.lockAspect[locale] ?? L.lockAspect.en}
                aria-pressed={lock}
                className={`inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors ${
                  lock ? "border-transparent bg-[var(--color-ink)] text-white dark:bg-white dark:text-[#1d1d1f]" : "hairline hover:bg-[var(--color-surface)]"
                }`}
              >
                <Icon name="link" size={15} />
              </button>
              <label className="flex items-center gap-1.5 text-[13px]">
                {L.height[locale] ?? L.height.en}
                <input
                  type="number"
                  min={1}
                  className="field bare mono w-28 px-2.5 py-1.5 text-[14px]"
                  value={hIn || ""}
                  onChange={(e) => {
                    lastEdit.current = "h";
                    setHIn(Number(e.target.value) || 0);
                    if (lock && wIn) setWIn(Math.round((Number(e.target.value) || 0) * (wIn / hIn || 0)));
                  }}
                  aria-label={L.height[locale] ?? L.height.en}
                />
              </label>
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-2.5">
              <label className="flex items-center gap-1.5 text-[13px]">
                {L.scale[locale] ?? L.scale.en}
                <input
                  type="number"
                  min={1}
                  max={1000}
                  className="field bare mono w-24 px-2.5 py-1.5 text-[14px]"
                  value={pctIn}
                  onChange={(e) => setPctIn(Math.min(1000, Math.max(1, Number(e.target.value) || 1)))}
                  aria-label={L.scale[locale] ?? L.scale.en}
                />
                <span className="text-[var(--color-sub)]">%</span>
              </label>
              {[25, 50, 75, 200].map((p) => (
                <button key={p} type="button" onClick={() => setPctIn(p)} className={chipCls(pctIn === p)}>
                  {p}%
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {op === "rotate" && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-[13px] font-semibold">{t.common.settings}</span>
          <button type="button" onClick={() => setRot((r) => (r + 1) % 4)} className={chipCls(false)}>
            {L.rotateCW[locale] ?? L.rotateCW.en}
          </button>
          <button type="button" onClick={() => setRot((r) => (r + 3) % 4)} className={chipCls(false)}>
            {L.rotateCCW[locale] ?? L.rotateCCW.en}
          </button>
          <button type="button" onClick={() => setRot((r) => (r + 2) % 4)} className={chipCls(false)}>
            {L.rotate180[locale] ?? L.rotate180.en}
          </button>
          <button
            type="button"
            onClick={() => setFlipH((v) => !v)}
            aria-pressed={flipH}
            className={chipCls(flipH)}
          >
            {L.flipH[locale] ?? L.flipH.en}
          </button>
          <button
            type="button"
            onClick={() => setFlipV((v) => !v)}
            aria-pressed={flipV}
            className={chipCls(flipV)}
          >
            {L.flipV[locale] ?? L.flipV.en}
          </button>
          <button
            type="button"
            onClick={() => {
              setRot(0);
              setFlipH(false);
              setFlipV(false);
            }}
            className="rounded-full border hairline px-3 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)]"
          >
            {t.common.reset}
          </button>
          <span className="mono rounded-full bg-[var(--color-surface)] px-2.5 py-1 text-[12.5px] font-medium" role="status">
            {(rot * 90 + 360) % 360}°{flipH ? " ⇔" : ""}{flipV ? " ⇕" : ""}
          </span>
        </div>
      )}

      {op === "exif-remove" && (
        <p className="mt-4 flex items-start gap-2 rounded-xl bg-[var(--color-surface)] px-3.5 py-2.5 text-[13.5px] leading-5 text-[var(--color-sub)]">
          <Icon name="shield" size={15} className="mt-0.5 flex-none text-[var(--color-good)]" />
          {L.stripNote[locale] ?? L.stripNote.en}
        </p>
      )}

      {fellBack && (
        <p className="mt-3 text-[13px] text-[var(--color-bad)]" role="status">
          {L.webpFallback[locale] ?? L.webpFallback.en}
        </p>
      )}

      {(busy || results.length > 0) && (
        <ResultList rows={results} busy={busy} onDownloadAll={() => downloadAllResults(results)} />
      )}
    </ToolPanel>
  );
}
