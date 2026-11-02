"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { DropZone } from "@/components/client-ui";
import { Icon } from "@/components/icons";
import type { Locale } from "@/lib/site";
import { ToolPanel } from "@/components/ui";
import { canvasToBlob, clamp, loadImage, outputName } from "./image-util";
import { ResultList, downloadAllResults, type ImgResult } from "./image-results";
import {
  MAX_SHRINK_PCT,
  MIN_SHRINK_PCT,
  computeCirclePlan,
  minPctForDiameter,
} from "@/tools/_lib/image-geometry";

/**
 * crop-circle-image 引擎:批量圆形裁剪。直径默认 = 短边,滑块按 % 缩小;
 * 圆内像素原样保留,四角透明,输出仅 PNG。
 */

const PREVIEW_MAX = 360;

const L: Record<string, Record<string, string>> = {
  shrink: { en: "Circle size", zh: "圆的大小", ja: "円のサイズ", es: "Tamaño del círculo", pt: "Tamanho do círculo" },
  apply: { en: "Crop into circles", zh: "批量裁成圆形", ja: "一括で円形に切り抜き", es: "Recortar en círculos", pt: "Cortar em círculos" },
  preview: { en: "Live preview — first image", zh: "实时预览 · 第一张图", ja: "ライブプレビュー(1 枚目)", es: "Vista previa · primera imagen", pt: "Pré-visualização · 1ª imagem" },
  pngNote: {
    en: "Output is always PNG so the corners stay truly transparent, not white.",
    zh: "输出一律为 PNG,四角是真透明而不是白色。",
    ja: "出力は常に PNG で、四隅は白ではなく本当に透過します。",
    es: "La salida siempre es PNG para que las esquinas queden transparentes de verdad, no blancas.",
    pt: "A saída é sempre PNG para que os cantos fiquem realmente transparentes, não brancos.",
  },
};

const checkerStyle = {
  backgroundImage: "repeating-conic-gradient(#e9e9ee 0% 25%, #ffffff 0% 50%)",
  backgroundSize: "14px 14px",
} as const;

export function ImageCircleEngine() {
  const { t, locale } = useI18n();
  const [files, setFiles] = useState<File[]>([]);
  const [preview, setPreview] = useState<{ w: number; h: number; el: HTMLImageElement } | null>(null);
  const [pct, setPct] = useState(MAX_SHRINK_PCT);
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

  // 该图能出 1px 直径的最小百分比;滑块更小时按它兜底
  const floorPct = preview ? minPctForDiameter(preview.w, preview.h) : MIN_SHRINK_PCT;
  const effPct = Math.max(pct, floorPct);
  const previewPlan = preview ? computeCirclePlan(preview.w, preview.h, effPct) : null;

  // 预览:圆形正方形区域按长边 ≤ 360 px 缩放,与真实输出一致
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = previewCanvasRef.current;
    if (!canvas || !preview) return;
    const plan = computeCirclePlan(preview.w, preview.h, Math.max(pct, minPctForDiameter(preview.w, preview.h)));
    if (!plan) return;
    const scale = Math.min(1, PREVIEW_MAX / plan.d);
    const d = Math.max(1, Math.round(plan.d * scale));
    canvas.width = d;
    canvas.height = d;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, d, d);
    ctx.beginPath();
    ctx.arc(d / 2, d / 2, d / 2, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(preview.el, plan.cx, plan.cy, plan.d, plan.d, 0, 0, d, d);
  }, [preview, pct]);

  const run = useCallback(async () => {
    if (files.length === 0) return;
    setBusy(true);
    setErr("");
    const rows: ImgResult[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const img = await loadImage(file);
        const plan = computeCirclePlan(img.naturalWidth, img.naturalHeight, Math.max(pct, minPctForDiameter(img.naturalWidth, img.naturalHeight)));
        if (!plan) throw new Error("encode-failed");
        const canvas = document.createElement("canvas");
        canvas.width = plan.d;
        canvas.height = plan.d;
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("encode-failed");
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.beginPath();
        ctx.arc(plan.d / 2, plan.d / 2, plan.d / 2, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(img, plan.cx, plan.cy, plan.d, plan.d, 0, 0, plan.d, plan.d);
        const blob = await canvasToBlob(canvas, "image/png");
        const url = URL.createObjectURL(blob);
        urlsRef.current.push(url);
        rows.push({
          id: `${file.name}-${i}-${file.lastModified}`,
          name: outputName(file, "-circle", "png"),
          ok: true,
          url,
          blob,
          before: file.size,
          after: blob.size,
          w: plan.d,
          h: plan.d,
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
  }, [files, pct]);

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
            <div className="inline-block max-w-full overflow-hidden rounded-2xl border hairline p-2" style={checkerStyle}>
              <canvas ref={previewCanvasRef} className="block h-auto max-w-full rounded-full" aria-label={trL("preview")} />
            </div>
            <p className="mono mt-1.5 text-[12px] text-[var(--color-sub)]">
              {preview.w} × {preview.h} px → {previewPlan?.d ?? 0} × {previewPlan?.d ?? 0} px
            </p>
          </div>

          <label className="mt-4 block sm:max-w-sm">
            <span className="mb-1.5 block text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">
              {trL("shrink")}: <span className="mono">{effPct}%</span>
            </span>
            <input
              type="range"
              min={MIN_SHRINK_PCT}
              max={MAX_SHRINK_PCT}
              step={1}
              value={effPct}
              onChange={(e) => setPct(clamp(Number(e.target.value), MIN_SHRINK_PCT, MAX_SHRINK_PCT))}
              className="w-full"
              aria-label={trL("shrink")}
            />
            <span className="mono mt-1 block text-[11.5px] text-[var(--color-sub)]">{MIN_SHRINK_PCT}% – 100%</span>
          </label>
          <p className="mt-2 text-[12.5px] leading-5 text-[var(--color-sub)]">{trL("pngNote")}</p>
        </>
      )}

      {err && <p role="alert" className="mt-3 rounded-xl error-bg px-3.5 py-2.5 text-[13.5px] leading-5 text-[var(--color-bad)]">{err}</p>}

      <ResultList rows={results} busy={busy} onDownloadAll={() => downloadAllResults(results)} />

      <div className="mt-4 flex flex-wrap gap-2.5">
        <button
          type="button"
          onClick={() => void run()}
          disabled={busy || !preview}
          className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-accent)] px-4 py-2 text-[14px] font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Icon name="palette" size={15} />
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
