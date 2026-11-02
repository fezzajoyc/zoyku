"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { DropZone } from "@/components/client-ui";
import { Icon } from "@/components/icons";
import type { Locale } from "@/lib/site";
import { ToolPanel } from "@/components/ui";
import { canvasToBlob, clamp } from "./image-util";
import { ResultList, downloadAllResults, type ImgResult } from "./image-results";

/** svg-converter 引擎:SVG → PNG,按 1x–4x 或自定义倍率栅格化,透明背景保留,批量。 */

const L: Record<string, Record<string, string>> =  {
  scale: { en: "Scale", zh: "缩放倍率", ja: "倍率", es: "Escala", pt: "Escala" },
  custom: { en: "Custom", zh: "自定义", ja: "カスタム", es: "Personalizada", pt: "Personalizada" },
  badSvg: {
    en: "This file does not look like a valid SVG.",
    zh: "这不是有效的 SVG 文件。",
    ja: "有効な SVG ファイルではないようです。",
    es: "Este archivo no parece un SVG válido.",
    pt: "Este arquivo não parece um SVG válido.",
  },
  transparent: {
    en: "PNG output keeps transparency; the raster is rendered at the exact target size, so icons stay sharp.",
    zh: "PNG 输出保留透明背景;栅格按目标尺寸精确渲染,图标依然清晰。",
    ja: "PNG 出力は透明背景を保持し、目標サイズどおりにレンダリングされるため、アイコンはくっきりしたままです。",
    es: "La salida PNG mantiene la transparencia; el raster se genera al tamaño exacto, así los iconos quedan nítidos.",
    pt: "A saída PNG mantém a transparência; o raster é gerado no tamanho exato, então os ícones ficam nítidos.",
  },
} satisfies Record<string, Record<string, string>>;

const FALLBACK = 512;

function firstTag(text: string): string | null {
  const i = text.indexOf("<svg");
  if (i < 0) return null;
  const j = text.indexOf(">", i);
  return j < 0 ? null : text.slice(i, j + 1);
}

function attr(tag: string, name: string): string | null {
  const m = tag.match(new RegExp(`\\s${name}\\s*=\\s*("([^"]*)"|'([^']*)')`, "i"));
  return m ? (m[2] ?? m[3] ?? null) : null;
}

function toNum(v: string | null): number | null {
  if (!v) return null;
  const m = v.match(/-?[\d.]+/);
  if (!m) return null;
  const n = Number(m[0]);
  return Number.isFinite(n) && n > 0 ? n : null;
}

/** 读 SVG 的固有尺寸:width/height 优先,否则 viewBox */
function svgIntrinsic(text: string): { w: number; h: number } {
  const tag = firstTag(text);
  if (!tag) return { w: FALLBACK, h: FALLBACK };
  const w = toNum(attr(tag, "width"));
  const h = toNum(attr(tag, "height"));
  if (w && h) return { w, h };
  const vb = attr(tag, "viewBox");
  if (vb) {
    const parts = vb.split(/[\s,]+/).map(Number);
    if (parts.length === 4 && parts.every(Number.isFinite) && parts[2] > 0 && parts[3] > 0) {
      return { w: parts[2], h: parts[3] };
    }
  }
  return { w: FALLBACK, h: FALLBACK };
}

/** 在根标签上强制 width/height(并补 viewBox),让栅格化在目标尺寸精确渲染 */
function svgAtSize(text: string, w: number, h: number): string {
  const i = text.indexOf("<svg");
  const j = text.indexOf(">", i);
  if (i < 0 || j < 0) throw new Error("decode-failed");
  let tag = text.slice(i, j + 1);
  const set = (name: string, val: number) => {
    if (new RegExp(`\\s${name}\\s*=`, "i").test(tag)) {
      tag = tag.replace(new RegExp(`\\s${name}\\s*=\\s*("[^"]*"|'[^']*')`, "i"), ` ${name}="${val}"`);
    } else {
      tag = tag.replace(/^<svg/, `<svg ${name}="${val}"`);
    }
  };
  if (!/\sviewBox\s*=/i.test(tag)) {
    const old = svgIntrinsic(text);
    tag = tag.replace(/^<svg/, `<svg viewBox="0 0 ${old.w} ${old.h}"`);
  }
  set("width", w);
  set("height", h);
  return text.slice(0, i) + tag + text.slice(j + 1);
}

function chipCls(active: boolean): string {
  return `rounded-full border px-3 py-1.5 text-[13px] font-medium transition-colors ${
    active
      ? "border-transparent bg-[var(--color-ink)] text-white"
      : "hairline hover:bg-[var(--color-surface)]"
  }`;
}

export function ImageSvgEngine({
  accept = ".svg,image/svg+xml",
}: {
  accept?: string;
}) {
  const { locale, t } = useI18n();
  const [files, setFiles] = useState<File[]>([]);
  const [scale, setScale] = useState(2);
  const [results, setResults] = useState<ImgResult[]>([]);
  const [busy, setBusy] = useState(false);

  const urlsRef = useRef<string[]>([]);
  useEffect(() => {
    const urls = urlsRef.current;
    return () => {
      urls.forEach((u) => URL.revokeObjectURL(u));
    };
  }, []);

  const addFiles = useCallback((list: File[]) => {
    setFiles((prev) => [...prev, ...list]);
    setResults([]);
  }, []);

  const run = useCallback(async () => {
    if (files.length === 0) return;
    setBusy(true);
    const rows: ImgResult[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const text = await file.text();
        const { w: bw, h: bh } = svgIntrinsic(text);
        const tw = Math.max(1, Math.round(bw * scale));
        const th = Math.max(1, Math.round(bh * scale));

        const svgBlob = new Blob([svgAtSize(text, tw, th)], { type: "image/svg+xml;charset=utf-8" });
        const url0 = URL.createObjectURL(svgBlob);
        const img = await new Promise<HTMLImageElement>((resolve, reject) => {
          const im = new Image();
          im.onload = () => resolve(im);
          im.onerror = () => reject(new Error("decode-failed"));
          im.src = url0;
        });
        URL.revokeObjectURL(url0);

        const canvas = document.createElement("canvas");
        canvas.width = tw;
        canvas.height = th;
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("encode-failed");
        ctx.drawImage(img, 0, 0, tw, th);
        const blob = await canvasToBlob(canvas, "image/png");
        const url = URL.createObjectURL(blob);
        urlsRef.current.push(url);
        const base = file.name.replace(/\.[^.]+$/, "") || file.name;
        const tag = Number.isInteger(scale) ? `@${scale}x` : `-${scale}x`;
        rows.push({
          id: `${file.name}-${i}-${file.lastModified}`,
          name: `${base}${tag}.png`,
          ok: true,
          url,
          blob,
          before: file.size,
          after: blob.size,
          w: tw,
          h: th,
          note: `${bw}→${tw}px`,
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
  }, [files, scale]);

  useEffect(() => {
    if (files.length === 0) return;
    const timer = setTimeout(() => void run(), 200);
    return () => clearTimeout(timer);
  }, [run, files.length]);

  return (
    <ToolPanel>
      <DropZone onFiles={addFiles} accept={accept}>
        <p className="text-[14px] text-[var(--color-sub)]">{t.common.dropFiles}</p>
      </DropZone>

      {files.length > 0 && (
        <>
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
              onClick={() => {
                setFiles([]);
                setResults([]);
              }}
              className="rounded-full border hairline px-3 py-1 text-[12.5px] font-medium transition-colors hover:bg-[var(--color-surface)]"
            >
              {t.common.clear}
            </button>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-[13px] font-semibold">{L.scale[locale] ?? L.scale.en}</span>
            {[1, 2, 3, 4].map((s) => (
              <button key={s} type="button" onClick={() => setScale(s)} className={`mono ${chipCls(scale === s)}`}>
                {s}×
              </button>
            ))}
            <label className="flex items-center gap-1.5 text-[13px]">
              <span className="text-[var(--color-sub)]">{L.custom[locale] ?? L.custom.en}</span>
              <input
                type="number"
                min={0.5}
                max={10}
                step={0.5}
                className="field bare mono w-20 px-2.5 py-1.5 text-[14px]"
                value={scale}
                onChange={(e) => setScale(clamp(Number(e.target.value) || 1, 0.5, 10))}
                aria-label={L.custom[locale] ?? L.custom.en}
              />
              <span className="text-[var(--color-sub)]">×</span>
            </label>
          </div>

          <p className="mt-3 flex items-start gap-2 rounded-xl bg-[var(--color-surface)] px-3.5 py-2.5 text-[13.5px] leading-5 text-[var(--color-sub)]">
            <Icon name="layers" size={15} className="mt-0.5 flex-none" />
            {L.transparent[locale] ?? L.transparent.en}
          </p>
        </>
      )}

      {(busy || results.length > 0) && (
        <ResultList rows={results} busy={busy} onDownloadAll={() => downloadAllResults(results)} />
      )}
    </ToolPanel>
  );
}
