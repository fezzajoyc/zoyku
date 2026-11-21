"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CopyButton, DropZone, formatBytes } from "@/components/client-ui";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import { IMAGE_PALETTE_MESSAGES } from "@/tools/_lib/image-palette-copy";
import { extractImagePalette, IMAGE_PALETTE_LIMITS, type ImagePaletteResult } from "@/tools/_lib/image-palette";

function readRaster(file: File) {
  const url = URL.createObjectURL(file);
  const image = new Image();
  let settled = false;
  let rejectPending: (cause: Error) => void = () => {};
  const release = () => {
    settled = true;
    image.onload = null;
    image.onerror = null;
    URL.revokeObjectURL(url);
  };
  const promise = new Promise<HTMLImageElement>((resolve, reject) => {
    rejectPending = reject;
    image.onload = () => { release(); resolve(image); };
    image.onerror = () => { release(); reject(new Error("decode")); };
    image.src = url;
  });
  return { promise, cancel: () => {
    if (settled) return;
    release();
    image.src = "";
    rejectPending(new Error("cancelled"));
  } };
}

export function ImagePaletteEngine() {
  const { locale } = useI18n();
  const L = IMAGE_PALETTE_MESSAGES[locale];
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pendingRef = useRef<{ cancel: () => void } | null>(null);
  const revision = useRef({ value: 0 });
  const [count, setCount] = useState(8);
  const [result, setResult] = useState<ImagePaletteResult | null>(null);
  const [fileInfo, setFileInfo] = useState<{ name: string; size: number | null } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const canvas = canvasRef.current;
    const activeRevision = revision.current;
    return () => {
      activeRevision.value++;
      pendingRef.current?.cancel();
      if (canvas) { canvas.width = 0; canvas.height = 0; }
    };
  }, []);

  const clear = useCallback(() => {
    revision.current.value++;
    pendingRef.current?.cancel();
    pendingRef.current = null;
    if (canvasRef.current) { canvasRef.current.width = 0; canvasRef.current.height = 0; }
    setResult(null);
    setFileInfo(null);
    setLoading(false);
    setError("");
  }, []);

  const analyzeCanvas = useCallback((canvas: HTMLCanvasElement) => {
    const context = canvas.getContext("2d", { willReadFrequently: true });
    if (!context) throw new Error("canvas");
    // The temporary native RGBA buffer is released after analysis. Only the
    // small result remains in React state; count changes just slice its groups.
    return extractImagePalette(context.getImageData(0, 0, canvas.width, canvas.height).data, canvas.width, canvas.height, { colorCount: 12 });
  }, []);

  const pick = useCallback((files: File[]) => {
    const file = files[0];
    if (!file) return;
    clear();
    const current = revision.current.value;
    if (/\.svgz?$/i.test(file.name) || file.type === "image/svg+xml" || (!file.type.startsWith("image/") && !/\.(png|jpe?g|webp|gif|bmp|avif)$/i.test(file.name))) {
      setError(L.decode);
      return;
    }
    if (file.size > IMAGE_PALETTE_LIMITS.maxFileBytes) { setError(L.fileTooLarge); return; }
    setLoading(true);
    const reading = readRaster(file);
    pendingRef.current = reading;
    void reading.promise.then(image => {
      if (current !== revision.current.value) return;
      pendingRef.current = null;
      const width = image.naturalWidth, height = image.naturalHeight;
      if (!width || !height) throw new Error("decode");
      // Guard dimensions before allocating a canvas or native ImageData.
      if (width > IMAGE_PALETTE_LIMITS.maxSide || height > IMAGE_PALETTE_LIMITS.maxSide) throw new Error("side");
      if (width * height > IMAGE_PALETTE_LIMITS.maxPixels) throw new Error("pixels");
      const canvas = canvasRef.current;
      if (!canvas) throw new Error("canvas");
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d", { willReadFrequently: true });
      if (!context) throw new Error("canvas");
      context.drawImage(image, 0, 0);
      setResult(analyzeCanvas(canvas));
      setFileInfo({ name: file.name, size: file.size });
      setLoading(false);
    }).catch((cause: unknown) => {
      if (current !== revision.current.value) return;
      pendingRef.current = null;
      const code = cause instanceof Error ? cause.message : "decode";
      setError(code === "side" ? L.sideTooLarge : code === "pixels" ? L.imageTooLarge : L.decode);
      setLoading(false);
      if (canvasRef.current) { canvasRef.current.width = 0; canvasRef.current.height = 0; }
    });
  }, [L, analyzeCanvas, clear]);

  const sample = useCallback(() => {
    clear();
    try {
      const canvas = canvasRef.current;
      if (!canvas) throw new Error("canvas");
      canvas.width = 400;
      canvas.height = 200;
      const context = canvas.getContext("2d", { willReadFrequently: true });
      if (!context) throw new Error("canvas");
      context.fillStyle = "#FF0000";
      context.fillRect(0, 0, 300, 200);
      context.fillStyle = "#0000FF";
      context.fillRect(300, 0, 100, 200);
      setResult(analyzeCanvas(canvas));
      setFileInfo({ name: L.sample, size: null });
    } catch {
      setError(L.decode);
      if (canvasRef.current) { canvasRef.current.width = 0; canvasRef.current.height = 0; }
    }
  }, [L.decode, L.sample, analyzeCanvas, clear]);

  const groups = result?.groups.slice(0, count) ?? [];
  const hexList = groups.map(color => color.hex).join("\n");
  const css = `:root {\n${groups.map((color, index) => `  --palette-${index + 1}: ${color.hex};`).join("\n")}\n}`;
  const number = new Intl.NumberFormat(locale);
  const percent = new Intl.NumberFormat(locale, { style: "percent", maximumSignificantDigits: 3 });

  return (
    <ToolPanel>
      <div dir={locale === "ar" ? "rtl" : undefined}>
        <DropZone onFiles={pick} accept="image/png,image/jpeg,image/webp,image/gif,image/bmp,image/avif" multiple={false}>
          <p className="text-[14px] text-[var(--color-sub)]">{L.drop}</p>
        </DropZone>
        <p className="mt-2 text-[12.5px] leading-5 text-[var(--color-sub)]">{L.localNote}</p>
        <div className="mt-4 flex flex-wrap items-end gap-3">
          <label className="min-w-0 text-[12.5px] font-semibold text-[var(--color-sub)]">
            <span className="mb-1 block">{L.count}</span>
            <select className="field w-full" value={count} aria-describedby="image-palette-method" onChange={event => setCount(Number(event.target.value))}>
              {Array.from({ length: 12 }, (_, i) => i + 1).map(value => <option key={value} value={value}>{value}</option>)}
            </select>
          </label>
          <button type="button" onClick={sample} className="rounded-lg border hairline px-3 py-2 text-[13px] font-medium hover:bg-[var(--color-surface)]">{L.sample}</button>
          {(loading || result || error) && <button type="button" onClick={clear} className="rounded-lg border hairline px-3 py-2 text-[13px] font-medium hover:bg-[var(--color-surface)]">{L.clear}</button>}
        </div>
        <p id="image-palette-method" className="mt-3 text-[12px] leading-5 text-[var(--color-sub)]">{L.method}</p>
        {loading && <p role="status" className="mt-3 text-[13px] text-[var(--color-sub)]">{L.reading}</p>}
        {error && <p role="alert" className="mt-3 rounded-xl error-bg px-3.5 py-2.5 text-[13.5px] text-[var(--color-bad)]">{error}</p>}
        <canvas ref={canvasRef} role="img" aria-label={fileInfo?.name ?? L.drop} className={`mt-4 block h-auto max-h-[45vh] max-w-full border hairline object-contain ${result ? "" : "hidden"}`} />
        {result && fileInfo && (
          <>
            <p className="mt-3 break-words text-[12.5px] font-medium text-[var(--color-ink)]">{fileInfo.name}{fileInfo.size !== null ? ` · ${formatBytes(fileInfo.size)}` : ""}</p>
            <dl className="mt-2 grid grid-cols-1 gap-2 text-[12.5px] sm:grid-cols-3">
              {[
                [L.source, `${result.width} × ${result.height} px`],
                [L.samples, number.format(result.sampledPixels)],
                [L.visible, number.format(result.visibleSamplePixels)],
              ].map(([label, value]) => <div key={label} className="rounded-lg bg-[var(--color-surface)] px-3 py-2"><dt className="text-[var(--color-sub)]">{label}</dt><dd dir="ltr" className="mono mt-1 text-[var(--color-ink)]">{value}</dd></div>)}
            </dl>
            {groups.length === 0 ? <p role="status" className="mt-4 rounded-xl border hairline px-3 py-3 text-[13px] leading-5 text-[var(--color-sub)]">{L.empty}</p> : (
              <section aria-label={L.palette} className="mt-5 border-t hairline pt-4">
                <h2 className="text-[14px] font-semibold text-[var(--color-ink)]">{L.palette}</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  <CopyButton value={hexList} label={L.copyList} />
                  <CopyButton value={css} label={L.copyCss} />
                </div>
                <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                  {groups.map(color => (
                    <li key={color.group} className="min-w-0 overflow-hidden rounded-xl border hairline">
                      <div aria-hidden="true" className="h-16 w-full" style={{ backgroundColor: color.hex }} />
                      <div className="space-y-2 p-3">
                        <div className="flex min-w-0 flex-wrap items-center justify-between gap-2"><code dir="ltr" className="mono text-[13px] font-semibold text-[var(--color-ink)]">{color.hex}</code><CopyButton value={color.hex} label={L.copyHex} className="!px-2.5 !py-1 !text-[11.5px]" /></div>
                        <div className="flex min-w-0 flex-wrap items-center justify-between gap-2"><code dir="ltr" className="mono break-all text-[12px] text-[var(--color-sub)]">{color.rgb}</code><CopyButton value={color.rgb} label={L.copyRgb} className="!px-2.5 !py-1 !text-[11.5px]" /></div>
                        <p className="text-[12px] text-[var(--color-sub)]">{L.frequency}: {percent.format(color.percentage / 100)}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </>
        )}
      </div>
    </ToolPanel>
  );
}
