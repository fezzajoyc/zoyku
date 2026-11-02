"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { DropZone } from "@/components/client-ui";
import { Icon } from "@/components/icons";
import type { Locale } from "@/lib/site";
import { ToolPanel } from "@/components/ui";
import {
  FORMAT_EXT,
  canvasToBlob,
  clamp,
  loadImage,
  originalFormat,
  outputName,
} from "./image-util";
import { CropStage, fitRect, type CropRect } from "./image-crop-widget";
import { ResultList, downloadAllResults, type ImgResult } from "./image-results";

/** crop-image 引擎:比例预设 + 拖拽选框 + 数值偏移,选区按相对位置批量套用到所有文件。 */

type Preset = { id: string; ratio: number | null; label: string };

const PRESETS: Preset[] = [
  { id: "free", ratio: null, label: "Free" },
  { id: "1:1", ratio: 1, label: "1:1" },
  { id: "4:3", ratio: 4 / 3, label: "4:3" },
  { id: "3:2", ratio: 3 / 2, label: "3:2" },
  { id: "16:9", ratio: 16 / 9, label: "16:9" },
  { id: "9:16", ratio: 9 / 16, label: "9:16" },
];

const L: Record<string, Record<string, string>> =  {
  cropAll: {
    en: "Crop",
    zh: "裁剪",
    ja: "切り抜き",
    es: "Recortar",
    pt: "Recortar",
  },
  apply: {
    en: "Apply to all files",
    zh: "应用到所有文件",
    ja: "すべてのファイルに適用",
    es: "Aplicar a todos los archivos",
    pt: "Aplicar a todos os arquivos",
  },
  batchNote: {
    en: "The selection is scaled proportionally to each image.",
    zh: "选区会按比例缩放后套用到每张图片。",
    ja: "選択範囲は各画像の比率に合わせて拡大縮小されます。",
    es: "La selección se escala proporcionalmente en cada imagen.",
    pt: "A seleção é escalada proporcionalmente em cada imagem.",
  },
  x: { en: "X", zh: "X", ja: "X", es: "X", pt: "X" },
  y: { en: "Y", zh: "Y", ja: "Y", es: "Y", pt: "Y" },
  w: { en: "W", zh: "宽", ja: "幅", es: "An", pt: "L" },
  h: { en: "H", zh: "高", ja: "高さ", es: "Al", pt: "A" },
  aspect: { en: "Aspect", zh: "比例", ja: "比率", es: "Proporción", pt: "Proporção" },
} satisfies Record<string, Record<string, string>>;

export function ImageCropEngine({ accept = "image/*" }: { accept?: string }) {
  const { locale, t } = useI18n();
  const [files, setFiles] = useState<File[]>([]);
  const [active, setActive] = useState(0);
  const [preview, setPreview] = useState<{ url: string; w: number; h: number } | null>(null);
  const [rect, setRect] = useState<CropRect>({ x: 0, y: 0, w: 0, h: 0 });
  const [aspect, setAspect] = useState<number | null>(null);
  const [results, setResults] = useState<ImgResult[]>([]);
  const [busy, setBusy] = useState(false);

  const previewUrlRef = useRef<string | null>(null);
  const urlsRef = useRef<string[]>([]);
  useEffect(() => {
    const urls = urlsRef.current;
    return () => {
      urls.forEach((u) => URL.revokeObjectURL(u));
      if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    };
  }, []);

  const addFiles = useCallback((list: File[]) => {
    setFiles((prev) => [...prev, ...list]);
    setResults([]);
  }, []);

  // 活动预览文件切换时重建 object URL 并载入尺寸
  useEffect(() => {
    const file = files[active];
    if (!file) {
      setPreview(null);
      return;
    }
    let alive = true;
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      if (!alive) return;
      const w = img.naturalWidth;
      const h = img.naturalHeight;
      setPreview({ url, w, h });
      setRect(fitRect(w, h, aspect));
    };
    img.onerror = () => {
      if (alive) setPreview(null);
    };
    img.src = url;
    if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    previewUrlRef.current = url;
    return () => {
      alive = false;
    };
    // aspect 刻意不进依赖:切换预览时不重置用户已选比例之外的选框
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files, active]);

  const setPreset = (p: Preset) => {
    setAspect(p.ratio);
    if (preview) setRect(fitRect(preview.w, preview.h, p.ratio));
  };

  const updateRect = (r: CropRect) => {
    if (!preview) return;
    setRect({
      x: clamp(Math.round(r.x), 0, Math.max(0, preview.w - 1)),
      y: clamp(Math.round(r.y), 0, Math.max(0, preview.h - 1)),
      w: clamp(Math.round(r.w), 1, preview.w),
      h: clamp(Math.round(r.h), 1, preview.h),
    });
  };

  const run = useCallback(async () => {
    if (!preview || files.length === 0) return;
    setBusy(true);
    const rows: ImgResult[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const img = await loadImage(file);
        const k = img.naturalWidth / preview.w;
        const natW = img.naturalWidth;
        const natH = img.naturalHeight;
        const sx = clamp(Math.round(rect.x * k), 0, natW - 1);
        const sy = clamp(Math.round(rect.y * k), 0, natH - 1);
        const sw = clamp(Math.round(rect.w * k), 1, natW - sx);
        const sh = clamp(Math.round(rect.h * k), 1, natH - sy);

        const target = originalFormat(file);
        const canvas = document.createElement("canvas");
        canvas.width = sw;
        canvas.height = sh;
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("encode-failed");
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        if (target === "image/jpeg") {
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, sw, sh);
        }
        ctx.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh);
        const blob = await canvasToBlob(canvas, target, target === "image/png" ? undefined : 0.92);
        const url = URL.createObjectURL(blob);
        urlsRef.current.push(url);
        rows.push({
          id: `${file.name}-${i}-${file.lastModified}`,
          name: outputName(file, "-cropped", FORMAT_EXT[target]),
          ok: true,
          url,
          blob,
          before: file.size,
          after: blob.size,
          w: sw,
          h: sh,
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
  }, [files, preview, rect]);

  const numField = (
    label: string,
    value: number,
    set: (v: number) => void,
  ) => (
    <label className="flex items-center gap-1.5 text-[13px]">
      <span className="mono w-4 text-[var(--color-sub)]">{label}</span>
      <input
        type="number"
        min={0}
        className="field bare mono w-24 px-2.5 py-1.5 text-[14px]"
        value={value || ""}
        onChange={(e) => set(Number(e.target.value) || 0)}
        aria-label={label}
      />
    </label>
  );

  return (
    <ToolPanel>
      <DropZone onFiles={addFiles} accept={accept}>
        <p className="text-[14px] text-[var(--color-sub)]">{t.common.dropFiles}</p>
      </DropZone>

      {files.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          {files.map((f, i) => (
            <button
              key={`${f.name}-${i}-${f.lastModified}`}
              type="button"
              onClick={() => setActive(i)}
              className={`mono max-w-52 truncate rounded-full border px-2.5 py-1 text-[12.5px] font-medium transition-colors ${
                i === active
                  ? "border-transparent bg-[var(--color-ink)] text-white"
                  : "hairline hover:bg-[var(--color-surface)]"
              }`}
            >
              {f.name}
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              setFiles([]);
              setResults([]);
              setActive(0);
            }}
            className="rounded-full border hairline px-3 py-1 text-[12.5px] font-medium transition-colors hover:bg-[var(--color-surface)]"
          >
            {t.common.clear}
          </button>
        </div>
      )}

      {preview && (
        <>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-[13px] font-semibold">{L.aspect[locale] ?? L.aspect.en}</span>
            {PRESETS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPreset(p)}
                className={`mono rounded-full border px-3 py-1.5 text-[13px] font-medium transition-colors ${
                  aspect === p.ratio
                    ? "border-transparent bg-[var(--color-ink)] text-white"
                    : "hairline hover:bg-[var(--color-surface)]"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className="mt-4">
            <CropStage
              src={preview.url}
              width={preview.w}
              height={preview.h}
              rect={rect}
              aspect={aspect}
              onChange={updateRect}
            />
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2.5">
            {numField(L.x[locale] ?? L.x.en, rect.x, (v) => updateRect({ ...rect, x: v }))}
            {numField(L.y[locale] ?? L.y.en, rect.y, (v) => updateRect({ ...rect, y: v }))}
            {numField(L.w[locale] ?? L.w.en, rect.w, (v) => updateRect({ ...rect, w: v }))}
            {numField(L.h[locale] ?? L.h.en, rect.h, (v) => updateRect({ ...rect, h: v }))}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => void run()}
              disabled={busy}
              className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-accent)] px-4 py-2 text-[14px] font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              <Icon name="crop" size={15} />
              {L.cropAll[locale] ?? L.cropAll.en}
            </button>
            <span className="text-[12.5px] text-[var(--color-sub)]">
              {files.length > 1 ? `${L.apply[locale] ?? L.apply.en} · ${L.batchNote[locale] ?? L.batchNote.en}` : ""}
            </span>
          </div>
        </>
      )}

      {(busy || results.length > 0) && (
        <ResultList rows={results} busy={busy} onDownloadAll={() => downloadAllResults(results)} />
      )}
    </ToolPanel>
  );
}
