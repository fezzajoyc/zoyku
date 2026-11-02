"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { DropZone, downloadBlob } from "@/components/client-ui";
import { Icon } from "@/components/icons";
import type { Locale } from "@/lib/site";
import { ToolPanel } from "@/components/ui";
import { FORMAT_EXT, canvasToBlob, clamp, loadImage, outputName } from "./image-util";
import { ResultList, type ImgResult } from "./image-results";
import { computeBorderPlan, MAX_BORDER, type BorderFormat, type BorderMode } from "@/tools/_lib/image-geometry";

/**
 * image-border 引擎:批量加边框。画布向外扩 2×边宽,原图原尺寸放入中间;
 * 边框可透明(强制 PNG)或纯色(PNG / JPG 自选);全部下载打包成 ZIP。
 */

const PREVIEW_MAX = 360;

const L: Record<string, Record<string, string>> = {
  width: { en: "Border width", zh: "边框宽度", ja: "枠の幅", es: "Ancho del borde", pt: "Largura da borda" },
  padding: { en: "Border", zh: "边框样式", ja: "枠のスタイル", es: "Estilo del borde", pt: "Estilo da borda" },
  transparent: { en: "Transparent", zh: "透明", ja: "透明", es: "Transparente", pt: "Transparente" },
  color: { en: "Color", zh: "纯色", ja: "単色", es: "Color", pt: "Cor" },
  format: { en: "Output format", zh: "输出格式", ja: "出力フォーマット", es: "Formato de salida", pt: "Formato de saída" },
  apply: { en: "Add borders", zh: "批量加边框", ja: "一括で枠を付ける", es: "Añadir bordes", pt: "Adicionar bordas" },
  preview: { en: "Live preview — first image", zh: "实时预览 · 第一张图", ja: "ライブプレビュー(1 枚目)", es: "Vista previa · primera imagen", pt: "Pré-visualização · 1ª imagem" },
  pngNote: {
    en: "Transparent padding needs PNG — the frame stays see-through.",
    zh: "透明边框需使用 PNG,边框保持透空。",
    ja: "透明な枠には PNG が必要です。枠は透過したままになります。",
    es: "El relleno transparente necesita PNG: el marco queda translúcido.",
    pt: "O preenchimento transparente precisa de PNG: a moldura fica translúcida.",
  },
};

const checkerStyle = {
  backgroundImage: "repeating-conic-gradient(#e9e9ee 0% 25%, #ffffff 0% 50%)",
  backgroundSize: "14px 14px",
} as const;

function chipCls(active: boolean): string {
  return `rounded-full border px-3 py-1.5 text-[13px] font-medium transition-colors ${
    active ? "border-transparent bg-[var(--color-ink)] text-white" : "hairline hover:bg-[var(--color-surface)]"
  }`;
}

export function ImageBorderEngine() {
  const { t, locale } = useI18n();
  const [files, setFiles] = useState<File[]>([]);
  const [preview, setPreview] = useState<{ w: number; h: number; el: HTMLImageElement } | null>(null);
  const [border, setBorder] = useState(24);
  const [mode, setMode] = useState<BorderMode>("transparent");
  const [color, setColor] = useState("#ffffff");
  const [format, setFormat] = useState<BorderFormat>("image/png");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [results, setResults] = useState<ImgResult[]>([]);

  const previewUrlRef = useRef<string | null>(null);
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
  };

  // 第一张图重建预览
  useEffect(() => {
    const file = files[0];
    if (!file) {
      setPreview(null);
      return;
    }
    let alive = true;
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      if (alive) setPreview({ w: img.naturalWidth, h: img.naturalHeight, el: img });
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

  // 预览:画布含边框,按长边 ≤ 360 px 缩放,边宽同步缩放
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = previewCanvasRef.current;
    if (!canvas || !preview) return;
    const plan = computeBorderPlan({
      width: preview.w,
      height: preview.h,
      border,
      mode,
      format,
    });
    if (!plan) return;
    const scale = Math.min(1, PREVIEW_MAX / Math.max(plan.canvasWidth, plan.canvasHeight));
    const w = Math.max(1, Math.round(plan.canvasWidth * scale));
    const h = Math.max(1, Math.round(plan.canvasHeight * scale));
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, w, h);
    if (plan.format === "image/jpeg" || mode === "color") {
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, w, h);
    }
    ctx.drawImage(preview.el, plan.offsetX * scale, plan.offsetY * scale, preview.w * scale, preview.h * scale);
  }, [preview, border, mode, color, format]);

  const chooseFormat = (f: BorderFormat) => {
    setFormat(f);
    if (f === "image/jpeg" && mode === "transparent") setMode("color");
  };
  const chooseMode = (m: BorderMode) => {
    setMode(m);
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
        const plan = computeBorderPlan({
          width: img.naturalWidth,
          height: img.naturalHeight,
          border,
          mode,
          format,
        });
        if (!plan) throw new Error("encode-failed");
        const canvas = document.createElement("canvas");
        canvas.width = plan.canvasWidth;
        canvas.height = plan.canvasHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("encode-failed");
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        if (mode === "color") {
          ctx.fillStyle = color;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        ctx.drawImage(img, plan.offsetX, plan.offsetY);
        const blob = await canvasToBlob(canvas, plan.format, plan.format === "image/jpeg" ? 0.92 : undefined);
        const url = URL.createObjectURL(blob);
        urlsRef.current.push(url);
        rows.push({
          id: `${file.name}-${i}-${file.lastModified}`,
          name: outputName(file, "-bordered", FORMAT_EXT[plan.format]),
          ok: true,
          url,
          blob,
          before: file.size,
          after: blob.size,
          w: plan.canvasWidth,
          h: plan.canvasHeight,
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
  }, [files, border, mode, color, format]);

  // 全部下载 = 打包 ZIP(jszip 按需加载)
  const zippingRef = useRef(false);
  const zipAll = useCallback(async () => {
    const ok = results.filter((r): r is ImgResult & { blob: Blob } => r.ok && r.blob !== undefined);
    if (ok.length === 0 || zippingRef.current) return;
    zippingRef.current = true;
    try {
      const JSZip = (await import("jszip")).default;
      const zip = new JSZip();
      for (const r of ok) zip.file(r.name, r.blob);
      downloadBlob(await zip.generateAsync({ type: "blob" }), "bordered-images.zip");
    } catch {
      setErr(t.common.error);
    } finally {
      zippingRef.current = false;
    }
  }, [results, t.common.error]);

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
              style={mode === "transparent" && format === "image/png" ? checkerStyle : undefined}
            >
              <canvas ref={previewCanvasRef} className="block h-auto max-w-full" aria-label={trL("preview")} />
            </div>
            <p className="mono mt-1.5 text-[12px] text-[var(--color-sub)]">
              {preview.w} × {preview.h} px → {preview.w + 2 * border} × {preview.h + 2 * border} px
            </p>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">
                {trL("width")}: <span className="mono">{border} px</span>
              </span>
              <input
                type="range"
                min={0}
                max={MAX_BORDER}
                step={1}
                value={border}
                onChange={(e) => setBorder(clamp(Number(e.target.value), 0, MAX_BORDER))}
                className="w-full"
                aria-label={trL("width")}
              />
              <span className="mono mt-1 block text-[11.5px] text-[var(--color-sub)]">0 – {MAX_BORDER} px</span>
            </label>
            <div className="space-y-3">
              <div>
                <span className="mb-1.5 block text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">{trL("padding")}</span>
                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => chooseMode("transparent")}
                    className={`${chipCls(mode === "transparent")}${format === "image/jpeg" ? " cursor-not-allowed opacity-40" : ""}`}
                    disabled={format === "image/jpeg"}
                  >
                    {trL("transparent")}
                  </button>
                  <button type="button" onClick={() => chooseMode("color")} className={chipCls(mode === "color")}>
                    {trL("color")}
                  </button>
                  {mode === "color" && (
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
                  <button
                    type="button"
                    onClick={() => chooseFormat("image/jpeg")}
                    className={`${chipCls(format === "image/jpeg")}${mode === "transparent" ? " cursor-not-allowed opacity-40" : ""}`}
                    disabled={mode === "transparent"}
                  >
                    JPG
                  </button>
                </div>
                {mode === "transparent" && <p className="mt-1.5 text-[12.5px] leading-5 text-[var(--color-sub)]">{trL("pngNote")}</p>}
              </div>
            </div>
          </div>
        </>
      )}

      {err && <p role="alert" className="mt-3 rounded-xl error-bg px-3.5 py-2.5 text-[13.5px] leading-5 text-[var(--color-bad)]">{err}</p>}

      <ResultList rows={results} busy={busy} onDownloadAll={() => void zipAll()} />

      <div className="mt-4 flex flex-wrap gap-2.5">
        <button
          type="button"
          onClick={() => void run()}
          disabled={busy || !preview}
          className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-accent)] px-4 py-2 text-[14px] font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Icon name="crop" size={15} />
          {busy ? t.common.processing : trL("apply")}
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
