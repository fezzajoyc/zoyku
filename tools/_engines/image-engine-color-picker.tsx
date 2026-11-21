"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import { CopyButton, DropZone, formatBytes } from "@/components/client-ui";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import type { ImageColorPickerMessages } from "@/tools/_lib/image-color-picker-copy";
import { IMAGE_COLOR_PICKER_MESSAGES } from "@/tools/_lib/image-color-picker-copy";
import {
  IMAGE_COLOR_PICKER_LIMITS,
  formatPixelColor,
  mapPointerToPixel,
  sampleRgbaPixel,
  type FormattedPixelColor,
} from "@/tools/_lib/image-color-picker";

function readImage(file: File): { promise: Promise<HTMLImageElement>; cancel: () => void } {
  const url = URL.createObjectURL(file);
  const image = new Image();
  let settled = false;
  let rejectPending: (reason: Error) => void = () => {};
  const promise = new Promise<HTMLImageElement>((resolve, reject) => {
    rejectPending = reject;
    const release = () => {
      if (settled) return;
      settled = true;
      image.onload = null;
      image.onerror = null;
      URL.revokeObjectURL(url);
    };
    image.onload = () => {
      release();
      resolve(image);
    };
    image.onerror = () => {
      release();
      reject(new Error("decode"));
    };
    image.src = url;
  });
  return {
    promise,
    cancel: () => {
      if (settled) return;
      image.onload = null;
      image.onerror = null;
      settled = true;
      image.src = "";
      URL.revokeObjectURL(url);
      rejectPending(new Error("cancelled"));
    },
  };
}

function localized(locale: string): ImageColorPickerMessages {
  return IMAGE_COLOR_PICKER_MESSAGES[locale as keyof typeof IMAGE_COLOR_PICKER_MESSAGES] ?? IMAGE_COLOR_PICKER_MESSAGES.en;
}

export function ImageColorPickerEngine() {
  const { locale } = useI18n();
  const L = localized(locale);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pendingLoadRef = useRef<{ cancel: () => void } | null>(null);
  const revision = useRef(0);
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState(0);
  const [size, setSize] = useState<{ width: number; height: number } | null>(null);
  const [coordinates, setCoordinates] = useState({ x: "0", y: "0" });
  const [pixel, setPixel] = useState<FormattedPixelColor | null>(null);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => () => {
    revision.current++;
    pendingLoadRef.current?.cancel();
    pendingLoadRef.current = null;
  }, []);

  const clear = useCallback(() => {
    revision.current++;
    pendingLoadRef.current?.cancel();
    pendingLoadRef.current = null;
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = 0;
      canvas.height = 0;
    }
    setFileName("");
    setFileSize(0);
    setSize(null);
    setCoordinates({ x: "0", y: "0" });
    setPixel(null);
    setError("");
    setStatus("");
  }, []);

  const setSample = useCallback((x: number, y: number) => {
    const canvas = canvasRef.current;
    const currentSize = size;
    if (!canvas || !currentSize) {
      setError(L.errors.noImage);
      return;
    }
    try {
      const context = canvas.getContext("2d", { willReadFrequently: true });
      if (!context) throw new Error("canvas");
      const data = context.getImageData(x, y, 1, 1).data;
      const next = formatPixelColor(sampleRgbaPixel(data, 1, 1, 0, 0));
      setPixel({ ...next, x, y });
      setCoordinates({ x: String(x), y: String(y) });
      setError("");
      setStatus(`${L.pixel}: ${x}, ${y} — ${next.rgba}`);
    } catch {
      setError(L.errors.invalidCoord);
    }
  }, [L, size]);

  const pick = useCallback((files: File[]) => {
    const file = files[0];
    if (!file) return;
    const current = ++revision.current;
    pendingLoadRef.current?.cancel();
    pendingLoadRef.current = null;
    setError("");
    setPixel(null);
    setStatus(L.reading);
    if (canvasRef.current) {
      canvasRef.current.width = 0;
      canvasRef.current.height = 0;
    }
    setFileName("");
    setSize(null);
    setFileSize(0);
    if (file.type === "image/svg+xml" || (!file.type.startsWith("image/") && !/\.(png|jpe?g|webp|gif|bmp|avif)$/i.test(file.name))) {
      setError(L.errors.decode);
      setStatus("");
      return;
    }
    if (file.size > IMAGE_COLOR_PICKER_LIMITS.maxFileBytes) {
      setError(L.errors.fileTooLarge);
      setStatus("");
      return;
    }

    const loading = readImage(file);
    pendingLoadRef.current = loading;
    void loading.promise.then((image) => {
      if (current !== revision.current) return;
      pendingLoadRef.current = null;
      const width = image.naturalWidth;
      const height = image.naturalHeight;
      if (width <= 0 || height <= 0) throw new Error("decode");
      if (width > IMAGE_COLOR_PICKER_LIMITS.maxSide || height > IMAGE_COLOR_PICKER_LIMITS.maxSide) {
        throw new Error("side");
      }
      if (width * height > IMAGE_COLOR_PICKER_LIMITS.maxPixels) throw new Error("pixels");

      const canvas = canvasRef.current;
      if (!canvas) throw new Error("canvas");
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d", { willReadFrequently: true });
      if (!context) throw new Error("canvas");
      context.drawImage(image, 0, 0, width, height);
      setFileName(file.name);
      setFileSize(file.size);
      setSize({ width, height });
      setCoordinates({ x: "0", y: "0" });
      const data = context.getImageData(0, 0, 1, 1).data;
      const firstPixel = formatPixelColor(sampleRgbaPixel(data, 1, 1, 0, 0));
      setPixel({ ...firstPixel, x: 0, y: 0 });
      setStatus(`${L.pixel}: 0, 0 — ${firstPixel.rgba}`);
    }).catch((cause: unknown) => {
      if (current !== revision.current) return;
      const code = cause instanceof Error ? cause.message : "decode";
      setError(code === "side" ? L.errors.sideTooLarge : code === "pixels" ? L.errors.imageTooLarge : L.errors.decode);
      setStatus("");
      setSize(null);
      setPixel(null);
    });
  }, [L]);

  const sampleAtEvent = useCallback((event: MouseEvent<HTMLCanvasElement>) => {
    if (!size) {
      setError(L.errors.noImage);
      return;
    }
    const point = mapPointerToPixel(
      { clientX: event.clientX, clientY: event.clientY },
      event.currentTarget.getBoundingClientRect(),
      size.width,
      size.height,
    );
    if (point) setSample(point.x, point.y);
  }, [L.errors.noImage, setSample, size]);

  const onCanvasKeyDown = useCallback((event: KeyboardEvent<HTMLCanvasElement>) => {
    if (!size || !pixel) return;
    const offsets: Record<string, { x: number; y: number }> = {
      ArrowLeft: { x: -1, y: 0 },
      ArrowRight: { x: 1, y: 0 },
      ArrowUp: { x: 0, y: -1 },
      ArrowDown: { x: 0, y: 1 },
    };
    const offset = offsets[event.key];
    if (!offset) return;
    event.preventDefault();
    setSample(
      Math.max(0, Math.min(size.width - 1, pixel.x + offset.x)),
      Math.max(0, Math.min(size.height - 1, pixel.y + offset.y)),
    );
  }, [pixel, setSample, size]);

  const updateCoordinate = useCallback((axis: "x" | "y", value: string) => {
    const next = { ...coordinates, [axis]: value };
    setCoordinates(next);
    if (!size || !/^(0|[1-9]\d*)$/.test(next.x) || !/^(0|[1-9]\d*)$/.test(next.y)) {
      if (size) setError(L.errors.invalidCoord);
      return;
    }
    const x = Number(next.x);
    const y = Number(next.y);
    if (x >= size.width || y >= size.height) {
      setError(L.errors.invalidCoord);
      return;
    }
    setSample(x, y);
  }, [L.errors.invalidCoord, coordinates, setSample, size]);

  const canvasLabel = size && pixel
    ? `${fileName}, ${size.width} × ${size.height}. ${L.pixel} ${pixel.x}, ${pixel.y}: ${pixel.rgba}`
    : L.drop;

  return (
    <ToolPanel>
      <DropZone onFiles={pick} accept="image/*" multiple={false}>
        <p className="text-[14px] text-[var(--color-sub)]">{L.drop}</p>
      </DropZone>
      <p className="mt-2 text-[12.5px] leading-5 text-[var(--color-sub)]">{L.localNote}</p>

      {status && <p role="status" className="mt-3 text-[13px] text-[var(--color-sub)]">{status}</p>}
      {error && <p role="alert" className="mt-3 rounded-xl error-bg px-3.5 py-2.5 text-[13.5px] leading-5 text-[var(--color-bad)]">{error}</p>}

      <canvas
        ref={canvasRef}
        role="img"
        tabIndex={0}
        aria-label={canvasLabel}
        onClick={sampleAtEvent}
        onKeyDown={onCanvasKeyDown}
        className={`mt-4 block h-auto max-h-[65vh] max-w-full cursor-crosshair object-contain focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] ${size ? "" : "hidden"}`}
      />

      {size && (
        <div className="mt-4 flex flex-wrap items-end gap-3">
          <p className="mr-auto min-w-0 max-w-full truncate text-[12.5px] text-[var(--color-sub)]">
            <span className="font-medium text-[var(--color-ink)]">{fileName}</span> · {formatBytes(fileSize)} · {size.width} × {size.height} px
          </p>
          <button type="button" onClick={clear} className="rounded-lg border hairline px-3 py-2 text-[13px] font-medium hover:bg-[var(--color-surface)]">{L.clear}</button>
        </div>
      )}

      {size && (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:max-w-md">
          <label className="min-w-0 text-[12.5px] font-semibold text-[var(--color-sub)]">
            <span className="mb-1 block">{L.xLabel}</span>
            <input className="field mono w-full" type="number" min={0} max={size.width - 1} step={1} inputMode="numeric" value={coordinates.x} aria-describedby="image-color-coord-help" onChange={(event) => updateCoordinate("x", event.target.value)} />
          </label>
          <label className="min-w-0 text-[12.5px] font-semibold text-[var(--color-sub)]">
            <span className="mb-1 block">{L.yLabel}</span>
            <input className="field mono w-full" type="number" min={0} max={size.height - 1} step={1} inputMode="numeric" value={coordinates.y} aria-describedby="image-color-coord-help" onChange={(event) => updateCoordinate("y", event.target.value)} />
          </label>
          <p id="image-color-coord-help" className="col-span-2 text-[12px] text-[var(--color-sub)]">{L.coordinates}: 0 to {size.width - 1}, 0 to {size.height - 1}</p>
        </div>
      )}

      {pixel && (
        <section className="mt-5 border-t hairline pt-4" aria-label={L.pixel}>
          <div className="mb-3 flex items-center gap-3">
            <span aria-hidden="true" className="relative h-10 w-10 flex-none overflow-hidden rounded-md border hairline" style={{ backgroundImage: pixel.a < 255 ? "repeating-conic-gradient(#d8d8dc 0% 25%, #ffffff 0% 50%)" : undefined, backgroundSize: "10px 10px" }}>
              <span className="absolute inset-0" style={{ backgroundColor: pixel.rgba }} />
            </span>
            <div className="min-w-0">
              <h2 className="text-[14px] font-semibold text-[var(--color-ink)]">{L.pixel}</h2>
              <p className="mono text-[12px] text-[var(--color-sub)]">{L.coordinates}: ({pixel.x}, {pixel.y})</p>
            </div>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              { label: L.hex, copyLabel: L.copyHex, value: pixel.hex },
              { label: L.hex8, copyLabel: L.copyFormat, value: pixel.hex8 },
              { label: L.rgb, copyLabel: L.copyFormat, value: pixel.rgb },
              { label: L.rgba, copyLabel: L.copyRgba, value: pixel.rgba },
            ].map(({ label, copyLabel, value }) => (
              <div key={label} className="flex min-w-0 items-center gap-2 rounded-lg border hairline px-2.5 py-2">
                <div className="min-w-0 flex-1">
                  <span className="block text-[11px] font-semibold text-[var(--color-sub)]">{label}</span>
                  <code className="mono block truncate text-[12.5px] text-[var(--color-ink)]">{value}</code>
                </div>
                <CopyButton value={value} label={`${copyLabel}: ${label}`} className="!px-2.5 !py-1 !text-[11.5px]" />
              </div>
            ))}
          </div>
        </section>
      )}
    </ToolPanel>
  );
}
