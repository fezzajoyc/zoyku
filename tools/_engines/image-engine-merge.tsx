"use client";

import { useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { DropZone, downloadBlob, formatBytes } from "@/components/client-ui";
import { computeMergeLayout } from "../_lib/merge-layout";
import { ToolPanel } from "@/components/ui";
import { Lightbox } from "@/components/lightbox";

type Layout = "horizontal" | "vertical" | "grid";

const LABELS: Record<string, Record<string, string>> = {
  layout: { en: "Layout", zh: "排列方式", ja: "レイアウト", es: "Disposición", pt: "Disposição" },
  horizontal: { en: "Side by side", zh: "横向并排", ja: "横に並べる", es: "Horizontal", pt: "Lado a lado" },
  vertical: { en: "Stacked", zh: "纵向堆叠", ja: "縦に並べる", es: "Vertical", pt: "Empilhadas" },
  grid: { en: "Grid", zh: "网格", ja: "グリッド", es: "Cuadrícula", pt: "Grade" },
  gap: { en: "Gap", zh: "间距", ja: "間隔", es: "Separación", pt: "Espaço" },
  background: { en: "Background", zh: "背景色", ja: "背景色", es: "Fondo", pt: "Fundo" },
  merge: { en: "Merge images", zh: "拼接图片", ja: "画像を結合", es: "Combinar", pt: "Combinar" },
};

/** 多图拼接:横向 / 纵向 / 网格,统一缩放到等高/等宽/等格。 */
export function ImageMergeEngine() {
  const { t, locale } = useI18n();
  const [files, setFiles] = useState<File[]>([]);
  const [zoom, setZoom] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [layout, setLayout] = useState<Layout>("horizontal");
  const [gap, setGap] = useState(8);
  const [bg, setBg] = useState("#ffffff");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [out, setOut] = useState<{ blob: Blob; w: number; h: number } | null>(null);

  const trL = (k: string) => LABELS[k][locale] ?? LABELS[k].en;

  const addFiles = (list: File[]) => {
    const imgs = list.filter((f) => f.type.startsWith("image/"));
    if (imgs.length) {
      setFiles((p) => [...p, ...imgs].slice(0, 9));
      setOut(null);
      setErr("");
    }
  };

  async function merge() {
    if (files.length < 2) return;
    setBusy(true);
    setErr("");
    try {
      const bitmaps = await Promise.all(files.map((f) => createImageBitmap(f)));
      const plan = computeMergeLayout(layout, bitmaps, gap);
      let place = plan.place;
      const W = plan.width;
      const H = plan.height;
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, W);
      canvas.height = Math.max(1, H);
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("canvas");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      bitmaps.forEach((b, i) => {
        const p = place(b, i);
        ctx.drawImage(b, p.x, p.y, p.w, p.h);
      });
      const blob = await new Promise<Blob>((resolve, reject) =>
        canvas.toBlob((b2) => (b2 ? resolve(b2) : reject(new Error("encode"))), "image/png"),
      );
      setPreviewUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return URL.createObjectURL(blob);
      });
      setOut({ blob, w: canvas.width, h: canvas.height });
    } catch {
      setErr(t.common.error);
    } finally {
      setBusy(false);
    }
  }

  return (
    <ToolPanel>
      <DropZone onFiles={addFiles} accept="image/*">
        <p className="text-[14px] text-[var(--color-sub)]">
          {t.common.dropFiles} (2–9)
        </p>
      </DropZone>

      {files.length > 0 && (
        <p className="mt-3 text-[13.5px] text-[var(--color-sub)]">
          {files.length} · {formatBytes(files.reduce((a, f) => a + f.size, 0))}
        </p>
      )}

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <div>
          <span className="mb-1.5 block text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">{trL("layout")}</span>
          <div className="flex flex-wrap gap-1.5">
            {(["horizontal", "vertical", "grid"] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLayout(l)}
                className={`rounded-lg border px-2.5 py-1.5 text-[12.5px] font-medium transition-colors ${
                  layout === l ? "border-transparent bg-[var(--color-ink)] text-white" : "hairline hover:bg-[var(--color-surface)]"
                }`}
              >
                {trL(l)}
              </button>
            ))}
          </div>
        </div>
        <div>
          <span className="mb-1.5 block text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">
            {trL("gap")}: {gap}px
          </span>
          <input type="range" min={0} max={48} value={gap} onChange={(e) => setGap(+e.target.value)} className="w-full" aria-label={trL("gap")} />
        </div>
        <div>
          <span className="mb-1.5 block text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">{trL("background")}</span>
          <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="h-10 w-20 cursor-pointer rounded-lg border hairline" aria-label={trL("background")} />
        </div>
      </div>

      {err && <p role="alert" className="mt-3 rounded-xl error-bg px-3.5 py-2.5 text-[13.5px] text-[var(--color-bad)]">{err}</p>}

      {out && (
        <div className="mt-4 rounded-2xl border hairline p-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={previewUrl}
            alt=""
            className="max-h-72 cursor-zoom-in rounded-lg"
            onClick={() => setZoom(previewUrl)}
          />
          {zoom && <Lightbox src={zoom} alt="" onClose={() => setZoom(null)} />}
          <div className="mt-3 flex items-center gap-2.5">
            <span className="mono text-[12.5px] text-[var(--color-sub)]">
              {out.w}×{out.h} · {formatBytes(out.blob.size)}
            </span>
            <button
              type="button"
              onClick={() => downloadBlob(out.blob, "merged.png")}
              className="ml-auto rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium hover:bg-[var(--color-surface)]"
            >
              {t.common.download}
            </button>
          </div>
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2.5">
        <button
          type="button"
          onClick={merge}
          disabled={busy || files.length < 2}
          className="rounded-full bg-[var(--color-accent)] px-5 py-2.5 text-[15px] font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-40"
        >
          {trL("merge")}
        </button>
        {files.length > 0 && (
          <button
            type="button"
            onClick={() => { setFiles([]); setOut(null); setPreviewUrl((p) => { if (p) URL.revokeObjectURL(p); return ""; }); }}
            className="rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)]"
          >
            {t.common.reset}
          </button>
        )}
      </div>
    </ToolPanel>
  );
}
