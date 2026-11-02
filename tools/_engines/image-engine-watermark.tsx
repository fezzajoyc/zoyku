"use client";

import { useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { DropZone, downloadBlob, formatBytes } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";

type Res = { name: string; blob: Blob; before: number };

const POS = ["tl", "tc", "tr", "ml", "mc", "mr", "bl", "bc", "br"] as const;
type Pos = (typeof POS)[number];

const LABELS: Record<string, Record<string, string>> = {
  text: { en: "Watermark text", zh: "水印文字", ja: "ウォーターマーク文字", es: "Texto de marca", pt: "Texto da marca" },
  opacity: { en: "Opacity", zh: "不透明度", ja: "不透明度", es: "Opacidad", pt: "Opacidade" },
  size: { en: "Text size", zh: "文字大小", ja: "文字サイズ", es: "Tamaño", pt: "Tamanho" },
  position: { en: "Position", zh: "位置", ja: "位置", es: "Posición", pt: "Posição" },
  tile: { en: "Tile across image", zh: "平铺全图", ja: "全画面にタイル", es: "En mosaico", pt: "Em mosaico" },
  apply: { en: "Apply watermark", zh: "添加水印", ja: "ウォーターマークを追加", es: "Aplicar marca", pt: "Aplicar marca" },
};

/** 批量文字水印:九宫格定位或平铺,单文件/批量均可。 */
export function ImageWatermarkEngine() {
  const { t, locale } = useI18n();
  const [files, setFiles] = useState<File[]>([]);
  const [text, setText] = useState("");
  const [opacity, setOpacity] = useState(35);
  const [fontSize, setFontSize] = useState(36);
  const [pos, setPos] = useState<Pos>("br");
  const [tile, setTile] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [results, setResults] = useState<Res[]>([]);

  const trL = (k: string) => LABELS[k][locale] ?? LABELS[k].en;

  const addFiles = (list: File[]) => {
    const imgs = list.filter((f) => f.type.startsWith("image/"));
    if (imgs.length) {
      setFiles((p) => [...p, ...imgs]);
      setResults([]);
      setErr("");
    }
  };

  const removeAt = (i: number) => {
    setFiles((p) => p.filter((_, j) => j !== i));
    setResults([]);
  };

  async function apply() {
    if (!files.length || !text.trim()) return;
    setBusy(true);
    setErr("");
    setResults([]);
    try {
      const out: Res[] = [];
      for (const f of files) {
        const bitmap = await createImageBitmap(f);
        const canvas = document.createElement("canvas");
        canvas.width = bitmap.width;
        canvas.height = bitmap.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("canvas");
        ctx.drawImage(bitmap, 0, 0);
        const fs = Math.max(10, Math.round((fontSize / 100) * Math.min(canvas.width, canvas.height) * 0.12));
        ctx.font = `600 ${fs}px sans-serif`;
        const m = ctx.measureText(text);
        ctx.globalAlpha = opacity / 100;
        ctx.fillStyle = "#ffffff";
        ctx.shadowColor = "rgba(0,0,0,0.55)";
        ctx.shadowBlur = fs / 6;

        const pad = fs * 0.6;
        const drawAt = (x: number, y: number) => ctx.fillText(text, x, y);
        if (tile) {
          const stepX = m.width + fs * 2.2;
          const stepY = fs * 2.6;
          for (let y = fs; y < canvas.height + stepY; y += stepY) {
            for (let x = -m.width; x < canvas.width + stepX; x += stepX) drawAt(x, y);
          }
        } else {
          const col = pos.endsWith("l") ? pad : pos.endsWith("r") ? canvas.width - m.width - pad : (canvas.width - m.width) / 2;
          const row = pos.startsWith("t") ? fs + pad / 2 : pos.startsWith("b") ? canvas.height - pad : (canvas.height + fs) / 2;
          drawAt(col, row);
        }
        const blob = await new Promise<Blob>((resolve, reject) =>
          canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("encode"))), "image/jpeg", 0.9),
        );
        out.push({ name: f.name.replace(/\.[^.]+$/, "") + "-watermark.jpg", blob, before: f.size });
      }
      setResults(out);
    } catch {
      setErr(t.common.error);
    } finally {
      setBusy(false);
    }
  }

  return (
    <ToolPanel>
      <DropZone onFiles={addFiles} accept="image/*">
        <p className="text-[14px] text-[var(--color-sub)]">{t.common.dropFiles}</p>
      </DropZone>

      {files.length > 0 && (
        <ul className="mt-3 space-y-2">
          {files.map((f, i) => (
            <li key={`${f.name}-${i}`} className="flex items-center gap-2.5 rounded-xl border hairline px-3.5 py-2.5">
              <span className="min-w-0 flex-1 truncate text-[14px]">{f.name}</span>
              <span className="mono flex-none text-[12.5px] text-[var(--color-sub)]">{formatBytes(f.size)}</span>
              <button type="button" onClick={() => removeAt(i)} aria-label={t.common.clear}
                className="h-7 w-7 flex-none rounded-full text-[14px] leading-none text-[var(--color-sub)] hover:bg-[var(--color-surface)]">×</button>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="space-y-3">
          <label className="block">
            <span className="mb-1.5 block text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">{trL("text")}</span>
            <input className="field" value={text} onChange={(e) => setText(e.target.value)} maxLength={60} aria-label={trL("text")} />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">
              {trL("opacity")}: {opacity}%
            </span>
            <input type="range" min={10} max={100} value={opacity} onChange={(e) => setOpacity(+e.target.value)} className="w-full" aria-label={trL("opacity")} />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">
              {trL("size")}: {fontSize}
            </span>
            <input type="range" min={12} max={90} value={fontSize} onChange={(e) => setFontSize(+e.target.value)} className="w-full" aria-label={trL("size")} />
          </label>
        </div>
        <div className="space-y-3">
          <div>
            <span className="mb-1.5 block text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">{trL("position")}</span>
            <div className="inline-grid grid-cols-3 gap-1">
              {POS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => { setPos(p); setTile(false); }}
                  aria-label={p}
                  className={`h-8 w-8 rounded-lg border transition-colors ${pos === p && !tile ? "border-transparent bg-[var(--color-ink)]" : "hairline hover:bg-[var(--color-surface)]"}`}
                />
              ))}
            </div>
          </div>
          <label className="flex cursor-pointer items-center gap-2 text-[14px]">
            <input type="checkbox" className="accent-[var(--color-accent)]" checked={tile} onChange={(e) => setTile(e.target.checked)} />
            {trL("tile")}
          </label>
        </div>
      </div>

      {err && <p role="alert" className="mt-3 rounded-xl error-bg px-3.5 py-2.5 text-[13.5px] text-[var(--color-bad)]">{err}</p>}

      {results.length > 0 && (
        <div className="mt-4 rounded-2xl border hairline p-4">
          <ul className="space-y-1.5">
            {results.map((r) => (
              <li key={r.name} className="flex items-center gap-2.5 text-[14px]">
                <span className="min-w-0 flex-1 truncate">{r.name}</span>
                <span className="mono flex-none text-[12.5px] text-[var(--color-sub)]">{formatBytes(r.before)} → {formatBytes(r.blob.size)}</span>
                <button
                  type="button"
                  onClick={() => downloadBlob(r.blob, r.name)}
                  className="flex-none rounded-full border hairline px-3 py-1 text-[12.5px] font-medium hover:bg-[var(--color-surface)]"
                >
                  {t.common.download}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2.5">
        <button
          type="button"
          onClick={apply}
          disabled={busy || !files.length || !text.trim()}
          className="rounded-full bg-[var(--color-accent)] px-5 py-2.5 text-[15px] font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-40"
        >
          {trL("apply")}
        </button>
        {files.length > 0 && !busy && (
          <button
            type="button"
            onClick={() => { setFiles([]); setResults([]); }}
            className="rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)]"
          >
            {t.common.reset}
          </button>
        )}
      </div>
    </ToolPanel>
  );
}
