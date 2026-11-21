"use client";

/* User-created local Blob previews are not remote assets for Next image optimization. */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useId, useRef, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { DropZone, formatBytes } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { RTL_LOCALES } from "@/lib/site";
import { identifyFileSignature } from "../_lib/file-signature";
import { IMAGE_WATERMARK_LIMITS, WATERMARK_POSITIONS, planImageWatermark, watermarkDimensionsAllowed, type WatermarkPosition } from "../_lib/image-watermark";
import { IMAGE_WATERMARK_MESSAGES } from "../_lib/image-watermark-copy";

type Format = "image/png" | "image/jpeg";
type ErrorCode = "type" | "file" | "dimensions" | "decode" | "tile" | "output" | "render" | "download";
type Config = { mode: "text" | "logo"; text: string; color: string; opacity: number; relativeWidth: number; rotation: number; margin: number; position: WatermarkPosition; tile: boolean; format: Format };
type Result = { name: string; blob: Blob; width: number; height: number; before: number; url: string };
class WatermarkError extends Error { constructor(public code: ErrorCode) { super(code); } }
const codeOf = (error: unknown): ErrorCode => error instanceof WatermarkError ? error.code : "render";
const button = "min-h-11 rounded-full border hairline px-3.5 py-2 text-sm font-medium transition-shadow hover:shadow-sm disabled:opacity-40";
const ACCEPT = "image/png,image/jpeg,image/webp,.png,.jpg,.jpeg,.webp";

async function decode(file: File, logo: boolean): Promise<ImageBitmap> {
  if (!file || file.size > (logo ? IMAGE_WATERMARK_LIMITS.logoBytes : IMAGE_WATERMARK_LIMITS.fileBytes)) throw new WatermarkError("file");
  try {
    const header = new Uint8Array(await file.slice(0, 16).arrayBuffer());
    if (!["png", "jpeg", "webp"].includes(identifyFileSignature(header)?.id ?? "")) throw new WatermarkError("type");
    const bitmap = await createImageBitmap(file);
    if (!watermarkDimensionsAllowed(bitmap.width, bitmap.height, logo)) { bitmap.close(); throw new WatermarkError("dimensions"); }
    return bitmap;
  } catch (error) { if (error instanceof WatermarkError) throw error; throw new WatermarkError("decode"); }
}

/** The same compositor paints the visible preview and the downloaded full-size canvas. */
export function drawWatermarkCanvas(canvas: HTMLCanvasElement, source: ImageBitmap, logo: ImageBitmap | null, config: Config, maxSide?: number): void {
  const scale = maxSide ? Math.min(1, maxSide / Math.max(source.width, source.height)) : 1;
  canvas.width = Math.max(1, Math.round(source.width * scale)); canvas.height = Math.max(1, Math.round(source.height * scale));
  const ctx = canvas.getContext("2d"); if (!ctx) throw new WatermarkError("render");
  ctx.setTransform(canvas.width / source.width, 0, 0, canvas.height / source.height, 0, 0);
  ctx.clearRect(0, 0, source.width, source.height);
  if (config.format === "image/jpeg") { ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, source.width, source.height); }
  ctx.drawImage(source, 0, 0);
  if (config.mode === "logo" && !logo) throw new WatermarkError("file");
  if (config.mode === "text" && !config.text.trim()) return;
  ctx.font = "600 100px sans-serif";
  const markWidth = config.mode === "logo" ? logo!.width : ctx.measureText(config.text).width + 8;
  const markHeight = config.mode === "logo" ? logo!.height : 120;
  const result = planImageWatermark({ width: source.width, height: source.height, markWidth, markHeight,
    relativeWidth: config.relativeWidth, rotation: config.rotation, margin: config.margin, position: config.position, tile: config.tile });
  if (!result.plan) throw new WatermarkError(result.error === "tile-limit" ? "tile" : "render");
  const plan = result.plan;
  ctx.globalAlpha = config.opacity / 100;
  for (const placement of plan.placements) {
    ctx.save(); ctx.translate(placement.x, placement.y); ctx.rotate(plan.radians);
    if (config.mode === "logo") ctx.drawImage(logo!, -plan.markWidth / 2, -plan.markHeight / 2, plan.markWidth, plan.markHeight);
    else {
      ctx.scale(plan.markWidth / markWidth, plan.markHeight / markHeight);
      ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillStyle = config.color;
      ctx.strokeStyle = "rgba(0,0,0,0.65)"; ctx.lineWidth = 2; ctx.lineJoin = "round";
      ctx.strokeText(config.text, 0, 0); ctx.fillText(config.text, 0, 0);
    }
    ctx.restore();
  }
  ctx.globalAlpha = 1;
}

export function ImageWatermarkEngine() {
  const { locale } = useI18n(); const L = IMAGE_WATERMARK_MESSAGES[locale]; const id = useId();
  const [files, setFiles] = useState<File[]>([]);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [config, setConfig] = useState<Config>({ mode: "text", text: "", color: "#ffffff", opacity: 35, relativeWidth: 30, rotation: 0, margin: 3, position: "br", tile: false, format: "image/png" });
  const [busy, setBusy] = useState(false); const [previewBusy, setPreviewBusy] = useState(false);
  const [previewReady, setPreviewReady] = useState(false); const [previewError, setPreviewError] = useState<ErrorCode | null>(null);
  const [error, setError] = useState<ErrorCode | null>(null); const [results, setResults] = useState<Result[]>([]);
  const [downloaded, setDownloaded] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null); const revision = useRef(0); const urls = useRef<string[]>([]);
  const downloadUrls = useRef(new Map<string, ReturnType<typeof setTimeout>>()); const noticeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const runActive = useRef(false);
  const mounted = useRef(true);
  function releaseResults() { for (const url of urls.current) URL.revokeObjectURL(url); urls.current = []; setResults([]); }
  function changed() { revision.current++; releaseResults(); setError(null); setDownloaded(null); setPreviewReady(false); setPreviewError(null); }
  function change(patch: Partial<Config>) { changed(); setConfig(current => ({ ...current, ...patch })); }
  useEffect(() => {
    mounted.current = true;
    const outputUrls = urls.current, downloads = downloadUrls.current;
    const generation = revision;
    return () => {
      mounted.current = false;
      generation.current++; for (const url of outputUrls) URL.revokeObjectURL(url);
      for (const url of urls.current) URL.revokeObjectURL(url); urls.current = [];
      for (const [url, timer] of downloads) { clearTimeout(timer); URL.revokeObjectURL(url); } downloads.clear();
      if (noticeTimer.current) clearTimeout(noticeTimer.current);
    };
  }, []);

  useEffect(() => {
    let alive = true;
    const canvas = canvasRef.current;
    if (canvas) { canvas.width = 1; canvas.height = 1; }
    if (!files[0]) { void Promise.resolve().then(() => { if (alive) setPreviewBusy(false); }); return () => { alive = false; }; }
    const timer = setTimeout(() => {
      setPreviewBusy(true);
      void (async () => {
        let source: ImageBitmap | undefined; let logo: ImageBitmap | undefined;
        try {
          source = await decode(files[0], false); if (!alive) return;
          if (config.mode === "logo") { if (!logoFile) { setPreviewBusy(false); return; } logo = await decode(logoFile, true); if (!alive) return; }
          if (!canvas) throw new WatermarkError("render");
          drawWatermarkCanvas(canvas, source, logo ?? null, config, 640);
          if (alive) setPreviewReady(true);
        } catch (problem) { if (alive) setPreviewError(codeOf(problem)); }
        finally { source?.close(); logo?.close(); if (alive) setPreviewBusy(false); }
      })();
    }, 120);
    return () => { alive = false; clearTimeout(timer); };
  }, [files, logoFile, config]);

  function addFiles(incoming: File[]) {
    changed();
    const next = [...files, ...incoming];
    if (!incoming.length || incoming.some(file => !file || typeof file.slice !== "function") || next.length > IMAGE_WATERMARK_LIMITS.files || next.some(file => file.size > IMAGE_WATERMARK_LIMITS.fileBytes) || next.reduce((sum, file) => sum + file.size, 0) > IMAGE_WATERMARK_LIMITS.totalBytes) { setError("file"); return; }
    setFiles(next);
  }
  async function apply() {
    if (runActive.current || !files.length || (config.mode === "text" ? !config.text.trim() : !logoFile)) return;
    const current = ++revision.current; const active = () => current === revision.current;
    runActive.current = true; setBusy(true); releaseResults(); setError(null);
    let logo: ImageBitmap | undefined; const pending: Result[] = []; let size = 0;
    try {
      if (config.mode === "logo") { logo = await decode(logoFile!, true); if (!active()) return; }
      for (const file of files) {
        let source: ImageBitmap | undefined; let canvas: HTMLCanvasElement | undefined;
        try {
          source = await decode(file, false); if (!active()) return;
          canvas = document.createElement("canvas"); drawWatermarkCanvas(canvas, source, logo ?? null, config);
          const blob = await new Promise<Blob>((resolve, reject) => canvas!.toBlob(value => value ? resolve(value) : reject(new WatermarkError("output")), config.format, 0.92));
          if (!active()) return;
          if (blob.type !== config.format) throw new WatermarkError("output");
          size += blob.size; if (size > IMAGE_WATERMARK_LIMITS.outputBytes) throw new WatermarkError("output");
          const url = URL.createObjectURL(blob);
          pending.push({ name: (file.name.replace(/\.[^.]+$/, "") || "image") + (config.format === "image/png" ? "-watermark.png" : "-watermark.jpg"), blob, width: source.width, height: source.height, before: file.size, url });
        } finally { source?.close(); if (canvas) { canvas.width = 1; canvas.height = 1; } }
      }
      if (active()) { urls.current = pending.map(result => result.url); setResults(pending); }
    } catch (problem) { if (active()) setError(codeOf(problem)); }
    finally {
      logo?.close(); runActive.current = false; if (mounted.current) setBusy(false);
      if (!active() || pending.length !== files.length) for (const result of pending) URL.revokeObjectURL(result.url);
    }
  }
  function download(result: Result, index: number) {
    let url: string | undefined; let anchor: HTMLAnchorElement | undefined;
    setDownloaded(null);
    setError(null);
    if (noticeTimer.current) { clearTimeout(noticeTimer.current); noticeTimer.current = null; }
    try {
      url = URL.createObjectURL(result.blob); anchor = document.createElement("a"); anchor.href = url; anchor.download = result.name; document.body.appendChild(anchor); anchor.click();
      const activeUrl = url; downloadUrls.current.set(url, setTimeout(() => { URL.revokeObjectURL(activeUrl); downloadUrls.current.delete(activeUrl); }, 5000));
      setDownloaded(index); const current = revision.current;
      noticeTimer.current = setTimeout(() => { if (current === revision.current) setDownloaded(null); }, 1600);
    } catch { if (url) URL.revokeObjectURL(url); setError("download"); } finally { anchor?.remove(); }
  }
  const errors: Record<ErrorCode, string> = { type: L.typeError, file: L.fileError, dimensions: L.dimensionError, decode: L.decodeError, tile: L.tileError, output: L.outputError, render: L.renderError, download: L.downloadError };
  const ready = files.length > 0 && (config.mode === "text" ? Boolean(config.text.trim()) : Boolean(logoFile));
  const sliders = [["opacity", L.opacity, 0, 100, config.opacity], ["relativeWidth", L.relativeWidth, 1, 90, config.relativeWidth], ["rotation", L.rotation, -180, 180, config.rotation], ["margin", L.margin, 0, 10, config.margin]] as const;

  return <ToolPanel><div className="space-y-5" dir={RTL_LOCALES.has(locale) ? "rtl" : "ltr"} data-image-watermark-tool="">
    <div className="space-y-2 text-sm leading-6 text-[var(--color-sub)]"><p>{L.local}</p><p>{L.scope}</p><p>{L.limits}</p></div>
    <div data-watermark-source=""><DropZone onFiles={addFiles} accept={ACCEPT}><p className="text-sm">{L.sourceDrop}</p></DropZone></div>
    {files.length > 0 && <ul className="space-y-2">{files.map((file, index) => <li key={`${index}-${file.name}`} className="flex items-center gap-2 rounded-xl border hairline p-3"><bdi className="min-w-0 flex-1 truncate text-sm">{file.name}</bdi><span dir="ltr" className="mono text-xs">{formatBytes(file.size)}</span><button className={button} type="button" onClick={() => { changed(); setFiles(files.filter((_, position) => position !== index)); }} aria-label={`${L.remove}: ${file.name}`}>{L.remove}</button></li>)}</ul>}
    <label htmlFor={`${id}-mode`} className="block text-sm font-semibold">{L.mode}</label>
    <select id={`${id}-mode`} className="field" data-watermark-mode="" value={config.mode} onChange={event => change({ mode: event.target.value as Config["mode"] })}><option value="text">{L.textMode}</option><option value="logo">{L.logoMode}</option></select>
    {config.mode === "text" ? <div className="grid gap-4 sm:grid-cols-2"><label className="block text-sm font-medium" htmlFor={`${id}-text`}>{L.text}<input id={`${id}-text`} className="field mt-1" value={config.text} maxLength={60} onChange={event => change({ text: event.target.value })} /></label><label className="block text-sm font-medium" htmlFor={`${id}-color`}>{L.color}<input id={`${id}-color`} type="color" className="mt-1 block h-11 w-full rounded-xl border hairline bg-[var(--color-card)]" value={config.color} onChange={event => change({ color: event.target.value })} /></label></div> : <div className="space-y-2" data-watermark-logo=""><DropZone key="logo" multiple={false} onFiles={incoming => { changed(); const file = incoming[0]; if (!file || file.size > IMAGE_WATERMARK_LIMITS.logoBytes) { setError("file"); setLogoFile(null); } else setLogoFile(file); }} accept={ACCEPT}><p className="text-sm">{L.logoDrop}</p></DropZone>{logoFile && <p className="flex items-center gap-2 text-sm"><bdi className="min-w-0 flex-1 truncate">{logoFile.name}</bdi><button className={button} type="button" onClick={() => { changed(); setLogoFile(null); }}>{L.remove}</button></p>}</div>}
    <div className="grid gap-4 sm:grid-cols-2">{sliders.map(([key, label, min, max, value]) => <label key={key} htmlFor={`${id}-${key}`} className="block text-sm font-medium">{label}: <span dir="ltr" className="mono inline-block">{value}{key === "rotation" ? "°" : "%"}</span><input id={`${id}-${key}`} className="mt-2 w-full" type="range" data-watermark-control={key} min={min} max={max} step={1} value={value} onChange={event => change({ [key]: Number(event.target.value) })} /></label>)}</div>
    <fieldset><legend className="mb-2 text-sm font-semibold">{L.position}</legend><div className="inline-grid grid-cols-3 gap-2" dir="ltr">{WATERMARK_POSITIONS.map(position => <button key={position} className={`${button} ${config.position === position && !config.tile ? "bg-[var(--color-surface)]" : ""}`} type="button" onClick={() => change({ position, tile: false })} aria-label={L.positions[position]} aria-pressed={config.position === position && !config.tile}>{L.positions[position]}</button>)}</div></fieldset>
    <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={config.tile} onChange={event => change({ tile: event.target.checked })} />{L.tile}</label>
    <label className="block text-sm font-medium" htmlFor={`${id}-format`}>{L.format}<select id={`${id}-format`} className="field mt-1" data-watermark-format="" value={config.format} onChange={event => change({ format: event.target.value as Format })}><option value="image/png">{L.png}</option><option value="image/jpeg">{L.jpeg}</option></select></label>
    <section className="space-y-2"><h2 className="text-sm font-semibold">{L.preview}</h2>{files.length ? <><p className="text-xs text-[var(--color-sub)]">{L.previewHelp}</p><canvas ref={canvasRef} className={`max-h-96 max-w-full rounded-xl border hairline ${previewReady ? "" : "hidden"}`} style={{ backgroundImage: "repeating-conic-gradient(#ddd 0% 25%, #fff 0% 50%)", backgroundSize: "16px 16px" }} aria-label={L.preview} data-watermark-preview="" /><p className="text-sm" role="status">{previewBusy ? L.loading : !previewReady ? L.markHelp : ""}</p></> : <p className="text-sm text-[var(--color-sub)]">{L.empty}</p>}</section>
    {(error || previewError) && <p role="alert" className="error-bg rounded-xl p-3 text-sm leading-6 text-[var(--color-bad)]">{errors[(error ?? previewError)!]}</p>}
    <div className="flex flex-wrap gap-2"><button type="button" className={`${button} bg-[var(--color-action-bg)] text-white`} disabled={busy || previewBusy || !ready || Boolean(previewError)} onClick={() => { void apply(); }}>{busy ? L.working : L.apply}</button><button type="button" className={button} onClick={() => { changed(); setFiles([]); setLogoFile(null); }}>{busy ? L.cancel : L.clear}</button></div>
    {results.length > 0 && <section className="space-y-3" aria-live="polite"><h2 className="text-sm font-semibold">{L.results}</h2>{results.map((result, index) => <div key={index} className="rounded-xl border hairline p-3" data-watermark-result={index}><img src={result.url} alt={`${L.resultPreview}: ${result.name}`} className="mb-2 max-h-64 max-w-full rounded-lg" /><div className="flex flex-wrap items-center gap-3"><span dir="ltr" className="mono min-w-0 flex-1 break-all text-xs">{result.name} · {result.width} × {result.height} · {formatBytes(result.before)} → {formatBytes(result.blob.size)}</span><button type="button" className={button} data-watermark-download={index} onClick={() => download(result, index)}>{downloaded === index ? `✓ ${L.downloaded}` : L.download}</button></div></div>)}</section>}
  </div></ToolPanel>;
}
