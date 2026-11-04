"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { DropZone } from "@/components/client-ui";
import { Icon } from "@/components/icons";
import type { Locale } from "@/lib/site";
import { ToolPanel } from "@/components/ui";
import { FORMAT_EXT, canvasToBlob, clamp, loadImage, outputName } from "./image-util";
import { ResultList, downloadAllResults, type ImgResult } from "./image-results";

/**
 * round-corners-image 引擎:批量圆角。半径为像素值(预览图短边一半为上限,
 * 每张图按自身尺寸截断);角可透明(PNG)或填充纯色;输出 PNG / JPG。
 */

type Target = "image/png" | "image/jpeg";
type BgMode = "transparent" | "color";

const L: Record<string, Record<string, string>> = {
  radius: { en: "Corner radius", zh: "圆角半径", ja: "角の半径", es: "Radio de esquinas", pt: "Raio dos cantos" },
  background: { en: "Corners", zh: "四角", ja: "角", es: "Esquinas", pt: "Cantos" },
  transparent: { en: "Transparent", zh: "透明", ja: "透明", es: "Transparentes", pt: "Transparentes" },
  color: { en: "Color", zh: "纯色", ja: "単色", es: "Color", pt: "Cor" },
  format: { en: "Output format", zh: "输出格式", ja: "出力フォーマット", es: "Formato de salida", pt: "Formato de saída" },
  round: { en: "Round corners", zh: "批量加圆角", ja: "角を丸める", es: "Redondear esquinas", pt: "Arredondar cantos" },
  preview: { en: "Live preview — first image", zh: "实时预览 · 第一张图", ja: "ライブプレビュー(1 枚目)", es: "Vista previa · primera imagen", pt: "Pré-visualização · 1ª imagem" },
  jpgNote: {
    en: "JPG has no transparency — the corners are filled with the color.",
    zh: "JPG 没有透明通道,四角会用所选颜色填充。",
    ja: "JPG は透過できないため、角は選んだ色で埋められます。",
    es: "JPG no tiene transparencia: las esquinas se rellenan con el color.",
    pt: "O JPG não tem transparência — os cantos são preenchidos com a cor.",
  },
};

const checkerStyle = {
  backgroundImage: "repeating-conic-gradient(#e9e9ee 0% 25%, #ffffff 0% 50%)",
  backgroundSize: "14px 14px",
} as const;

function roundRectPath(ctx: CanvasRenderingContext2D, w: number, h: number, r: number): void {
  ctx.beginPath();
  ctx.moveTo(r, 0);
  ctx.arcTo(w, 0, w, h, r);
  ctx.arcTo(w, h, 0, h, r);
  ctx.arcTo(0, h, 0, 0, r);
  ctx.arcTo(0, 0, w, 0, r);
  ctx.closePath();
}

function chipCls(active: boolean): string {
  return `rounded-full border px-3 py-1.5 text-[13px] font-medium transition-colors ${
    active ? "border-transparent bg-[var(--color-ink)] text-white dark:bg-white dark:text-[#1d1d1f]" : "hairline hover:bg-[var(--color-surface)]"
  }`;
}

export function ImageRoundEngine() {
  const { t, locale } = useI18n();
  const [files, setFiles] = useState<File[]>([]);
  const [preview, setPreview] = useState<{ url: string; w: number; h: number; el: HTMLImageElement } | null>(null);
  const [radius, setRadius] = useState(0);
  const [bgMode, setBgMode] = useState<BgMode>("transparent");
  const [color, setColor] = useState("#ffffff");
  const [format, setFormat] = useState<Target>("image/png");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [results, setResults] = useState<ImgResult[]>([]);

  const previewUrlRef = useRef<string | null>(null);
  const firstKeyRef = useRef("");
  const urlsRef = useRef<string[]>([]);
  useEffect(() => {
    const urls = urlsRef.current;
    return () => {
      urls.forEach((u) => URL.revokeObjectURL(u));
      if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    };
  }, []);

  const trL = useCallback((k: string) => L[k][locale] ?? L[k].en, [locale]);

  const addFiles = useCallback((list: File[]) => {
    const imgs = list.filter((f) => f.type.startsWith("image/"));
    if (imgs.length) {
      setFiles((prev) => [...prev, ...imgs]);
      setResults([]);
      setErr("");
    }
  }, []);

  const clearAll = () => {
    setFiles([]);
    setResults([]);
    setErr("");
    firstKeyRef.current = "";
  };

  // 第一张图变化时重建预览;换图才重设默认半径
  useEffect(() => {
    const file = files[0];
    if (!file) {
      setPreview(null);
      return;
    }
    const key = `${file.name}-${file.lastModified}`;
    const isNew = key !== firstKeyRef.current;
    let alive = true;
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      if (!alive) return;
      const w = img.naturalWidth;
      const h = img.naturalHeight;
      setPreview({ url, w, h, el: img });
      if (isNew) {
        firstKeyRef.current = key;
        setRadius(Math.floor(Math.min(w, h) / 8));
      }
    };
    img.onerror = () => {
      if (alive) {
        setPreview(null);
        setErr(t.common.error);
      }
    };
    img.src = url;
    if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    previewUrlRef.current = url;
    return () => {
      alive = false;
    };
    // t.common.error 刻意不进依赖
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  const maxRadius = preview ? Math.max(1, Math.floor(Math.min(preview.w, preview.h) / 2)) : 0;

  // 预览:按长边 ≤ 360 px 缩放,圆角同步缩放,保证与真实输出一致
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = previewCanvasRef.current;
    if (!canvas || !preview) return;
    const scale = Math.min(1, 360 / Math.max(preview.w, preview.h));
    const w = Math.max(1, Math.round(preview.w * scale));
    const h = Math.max(1, Math.round(preview.h * scale));
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, w, h);
    if (format === "image/jpeg" || bgMode === "color") {
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, w, h);
    }
    const r = Math.min(radius, Math.floor(Math.min(preview.w, preview.h) / 2)) * scale;
    if (r > 0) {
      roundRectPath(ctx, w, h, r);
      ctx.clip();
    }
    ctx.drawImage(preview.el, 0, 0, w, h);
  }, [preview, radius, bgMode, color, format]);

  const chooseFormat = (f: Target) => {
    setFormat(f);
    if (f === "image/jpeg" && bgMode === "transparent") setBgMode("color");
  };
  const chooseBg = (m: BgMode) => {
    setBgMode(m);
    if (m === "transparent" && format === "image/jpeg") setFormat("image/png");
  };

  const run = useCallback(async () => {
    if (files.length === 0) return;
    setBusy(true);
    setErr("");
    const rows: ImgResult[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const img = await loadImage(file);
        const w = img.naturalWidth;
        const h = img.naturalHeight;
        const r = Math.min(radius, Math.floor(Math.min(w, h) / 2));
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("encode-failed");
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        if (format === "image/jpeg" || bgMode === "color") {
          ctx.fillStyle = color;
          ctx.fillRect(0, 0, w, h);
        }
        if (r > 0) {
          roundRectPath(ctx, w, h, r);
          ctx.clip();
        }
        ctx.drawImage(img, 0, 0, w, h);
        const blob = await canvasToBlob(canvas, format, format === "image/jpeg" ? 0.92 : undefined);
        const url = URL.createObjectURL(blob);
        urlsRef.current.push(url);
        rows.push({
          id: `${file.name}-${i}-${file.lastModified}`,
          name: outputName(file, "-rounded", FORMAT_EXT[format]),
          ok: true,
          url,
          blob,
          before: file.size,
          after: blob.size,
          w,
          h,
        });
      } catch {
        rows.push({
          id: `${file.name}-${i}-${file.lastModified}`,
          name: file.name,
          ok: false,
          err: "decode",
          before: file.size,
        });
      }
    }
    setResults((prev) => {
      prev.forEach((r) => r.url && URL.revokeObjectURL(r.url));
      return rows;
    });
    setBusy(false);
  }, [files, radius, bgMode, color, format]);

  return (
    <ToolPanel>
      <DropZone onFiles={addFiles} accept="image/*">
        <p className="text-[14px] text-[var(--color-sub)]">{t.common.dropFiles}</p>
      </DropZone>

      {files.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          {files.map((f, i) => (
            <span
              key={`${f.name}-${i}-${f.lastModified}`}
              className="mono inline-flex max-w-full items-center gap-1 rounded-full bg-[var(--color-surface)] px-2.5 py-1 text-[12.5px]"
            >
              <span className="truncate">{f.name}</span>
            </span>
          ))}
          <button
            type="button"
            onClick={clearAll}
            className="rounded-full border hairline px-3 py-1 text-[12.5px] font-medium transition-colors hover:bg-[var(--color-surface)]"
          >
            {t.common.clear}
          </button>
        </div>
      )}

      {preview && (
        <>
          <div className="mt-4">
            <span className="mb-1.5 block text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">{trL("preview")}</span>
            <div
              className="inline-block max-w-full overflow-hidden rounded-2xl border hairline p-2"
              style={format === "image/png" && bgMode === "transparent" ? checkerStyle : undefined}
            >
              <canvas ref={previewCanvasRef} className="block h-auto max-w-full" aria-label={trL("preview")} />
            </div>
            <p className="mono mt-1.5 text-[12px] text-[var(--color-sub)]">
              {preview.w} × {preview.h} px
            </p>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">
                {trL("radius")}: <span className="mono">{radius} px</span>
              </span>
              <input
                type="range"
                min={0}
                max={maxRadius}
                step={1}
                value={Math.min(radius, maxRadius)}
                onChange={(e) => setRadius(clamp(Number(e.target.value), 0, maxRadius))}
                className="w-full"
                aria-label={trL("radius")}
              />
              <span className="mono mt-1 block text-[11.5px] text-[var(--color-sub)]">0 – {maxRadius} px</span>
            </label>
            <div className="space-y-3">
              <div>
                <span className="mb-1.5 block text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">{trL("background")}</span>
                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => chooseBg("transparent")}
                    className={`${chipCls(bgMode === "transparent")}${format === "image/jpeg" ? " cursor-not-allowed opacity-40" : ""}`}
                    disabled={format === "image/jpeg"}
                  >
                    {trL("transparent")}
                  </button>
                  <button type="button" onClick={() => chooseBg("color")} className={chipCls(bgMode === "color")}>
                    {trL("color")}
                  </button>
                  {bgMode === "color" && (
                    <input
                      type="color"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      aria-label={trL("color")}
                      className="h-8 w-10 cursor-pointer rounded-lg border hairline bg-[var(--color-card)] p-0.5"
                    />
                  )}
                </div>
              </div>
              <div>
                <span className="mb-1.5 block text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">{trL("format")}</span>
                <div className="flex flex-wrap gap-1.5">
                  <button type="button" onClick={() => chooseFormat("image/png")} className={chipCls(format === "image/png")}>PNG</button>
                  <button type="button" onClick={() => chooseFormat("image/jpeg")} className={chipCls(format === "image/jpeg")}>JPG</button>
                </div>
              </div>
              {format === "image/jpeg" && <p className="text-[12.5px] leading-5 text-[var(--color-sub)]">{trL("jpgNote")}</p>}
            </div>
          </div>
        </>
      )}

      {err && <p role="alert" className="mt-3 rounded-xl error-bg px-3.5 py-2.5 text-[13.5px] leading-5 text-[var(--color-bad)]">{err}</p>}

      {(busy || results.length > 0) && (
        <ResultList rows={results} busy={busy} onDownloadAll={() => downloadAllResults(results)} />
      )}

      <div className="mt-4 flex flex-wrap gap-2.5">
        <button
          type="button"
          onClick={() => void run()}
          disabled={busy || !preview}
          className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-accent)] px-4 py-2 text-[14px] font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Icon name="crop" size={15} />
          {busy ? t.common.processing : trL("round")}
        </button>
        {files.length > 0 && !busy && (
          <button
            type="button"
            onClick={clearAll}
            className="rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)]"
          >
            {t.common.reset}
          </button>
        )}
      </div>
    </ToolPanel>
  );
}
