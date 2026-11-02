"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton, DropZone, downloadBlob, formatBytes } from "@/components/client-ui";
import { Icon } from "@/components/icons";
import type { Locale } from "@/lib/site";
import { ToolPanel } from "@/components/ui";
import { canvasToBlob, loadImage } from "./image-util";

/**
 * favicon-generator 引擎:单图 → 6 尺寸 PNG favicon 套件。
 * 非正方形图片居中放进正方形画布,留白填充所选底色;圆角 0/25/50% 可选。
 * 预览画布按真实像素渲染,.zip 打包走 jszip 按需加载。
 */

const SIZES = [16, 32, 48, 180, 192, 512] as const;

const FILES: Record<number, string> = {
  16: "favicon-16x16.png",
  32: "favicon-32x32.png",
  48: "favicon-48x48.png",
  180: "apple-touch-icon.png",
  192: "android-chrome-192x192.png",
  512: "android-chrome-512x512.png",
};

const KINDS: Record<number, Record<string, string>> = {
  16: { en: "Browser tab", zh: "浏览器标签页", ja: "ブラウザタブ", es: "Pestaña del navegador", pt: "Aba do navegador" },
  32: { en: "Browser tab / HiDPI", zh: "标签页 / HiDPI", ja: "タブ / HiDPI", es: "Pestaña / HiDPI", pt: "Aba / HiDPI" },
  48: { en: "Shortcuts & bookmarks", zh: "快捷方式与书签", ja: "ショートカット・ブックマーク", es: "Accesos y marcadores", pt: "Atalhos e favoritos" },
  180: { en: "Apple touch icon", zh: "Apple 触屏图标", ja: "Apple タッチアイコン", es: "Icono Apple touch", pt: "Ícone Apple touch" },
  192: { en: "Android / PWA", zh: "Android / PWA", ja: "Android / PWA", es: "Android / PWA", pt: "Android / PWA" },
  512: { en: "Android / PWA (large)", zh: "Android / PWA(大图)", ja: "Android / PWA(大サイズ)", es: "Android / PWA (grande)", pt: "Android / PWA (grande)" },
};

const SNIPPET = `<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png">
<link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png">
<link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">`;

const L: Record<string, Record<string, string>> = {
  bg: { en: "Padding background", zh: "留白背景色", ja: "余白の背景色", es: "Color de relleno", pt: "Cor de preenchimento" },
  radius: { en: "Corner radius", zh: "圆角", ja: "角の丸み", es: "Radio de esquinas", pt: "Raio dos cantos" },
  square: { en: "Square", zh: "直角", ja: "四角", es: "Rectas", pt: "Retos" },
  rounded: { en: "Rounded", zh: "圆角", ja: "角丸", es: "Redondeadas", pt: "Arredondados" },
  circle: { en: "Circle", zh: "圆形", ja: "円", es: "Círculo", pt: "Círculo" },
  generate: { en: "Generate favicon set", zh: "生成 favicon 套件", ja: "favicon セットを生成", es: "Generar set de favicons", pt: "Gerar set de favicons" },
  zip: { en: "Download all (.zip)", zh: "打包下载(.zip)", ja: "すべてダウンロード(.zip)", es: "Descargar todo (.zip)", pt: "Baixar tudo (.zip)" },
  snippet: { en: "Paste into your <head>", zh: "粘贴到页面的 <head>", ja: "ページの <head> に貼り付け", es: "Pégalo en tu <head>", pt: "Cole no <head> da página" },
  preview: { en: "192 px live preview", zh: "192 px 实时预览", ja: "192 px ライブプレビュー", es: "Vista previa 192 px", pt: "Pré-visualização 192 px" },
  padNote: {
    en: "Non-square images are centered and padded with the background color.",
    zh: "非正方形图片会居中放置,留白填充所选背景色。",
    ja: "正方形以外の画像は中央に配置され、余白は背景色で埋められます。",
    es: "Las imágenes no cuadradas se centran y el hueco se rellena con el color de fondo.",
    pt: "Imagens não quadradas ficam centralizadas e o espaço é preenchido com a cor de fundo.",
  },
  failed: {
    en: "This file could not be read as an image.",
    zh: "无法将该文件读取为图片。",
    ja: "このファイルは画像として読み込めませんでした。",
    es: "No se pudo leer este archivo como imagen.",
    pt: "Não foi possível ler este arquivo como imagem.",
  },
};

/** contain-fit 到正方形画布,先阶梯式减半缩放保证小尺寸清晰。 */
function buildMaster(img: HTMLImageElement, bg: string): HTMLCanvasElement {
  const side = Math.max(img.naturalWidth, img.naturalHeight);
  const target = Math.min(1024, side);
  let src: HTMLImageElement | HTMLCanvasElement = img;
  let w = img.naturalWidth;
  let h = img.naturalHeight;
  while (w / 2 >= target && h / 2 >= target) {
    const half = document.createElement("canvas");
    half.width = Math.round(w / 2);
    half.height = Math.round(h / 2);
    const hx = half.getContext("2d");
    if (!hx) break;
    hx.imageSmoothingEnabled = true;
    hx.imageSmoothingQuality = "high";
    hx.drawImage(src, 0, 0, half.width, half.height);
    src = half;
    w = half.width;
    h = half.height;
  }
  const master = document.createElement("canvas");
  master.width = target;
  master.height = target;
  const mx = master.getContext("2d");
  if (!mx) return master;
  mx.imageSmoothingEnabled = true;
  mx.imageSmoothingQuality = "high";
  mx.fillStyle = bg;
  mx.fillRect(0, 0, target, target);
  const k = target / Math.max(w, h);
  mx.drawImage(src, (target - w * k) / 2, (target - h * k) / 2, w * k, h * k);
  return master;
}

/** 把正方形母版画进 target,圆角按画布边长的百分比裁切。 */
function drawIcon(target: HTMLCanvasElement, master: HTMLCanvasElement, size: number, radiusPct: number): void {
  target.width = size;
  target.height = size;
  const ctx = target.getContext("2d");
  if (!ctx) return;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  const r = (size * radiusPct) / 100;
  if (r > 0) {
    ctx.beginPath();
    ctx.moveTo(r, 0);
    ctx.arcTo(size, 0, size, size, r);
    ctx.arcTo(size, size, 0, size, r);
    ctx.arcTo(0, size, 0, 0, r);
    ctx.arcTo(0, 0, size, 0, r);
    ctx.closePath();
    ctx.clip();
  }
  ctx.drawImage(master, 0, 0, size, size);
}

const RADII = [0, 25, 50] as const;

const checkerStyle = {
  backgroundImage: "repeating-conic-gradient(#e9e9ee 0% 25%, #ffffff 0% 50%)",
  backgroundSize: "14px 14px",
} as const;

type Row = { size: number; name: string; url: string; blob: Blob };

export function ImageFaviconEngine() {
  const { t, locale } = useI18n();
  const [file, setFile] = useState<File | null>(null);
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [bg, setBg] = useState("#ffffff");
  const [radius, setRadius] = useState<(typeof RADII)[number]>(0);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [rows, setRows] = useState<Row[]>([]);

  const previewRef = useRef<HTMLCanvasElement>(null);
  const urlsRef = useRef<string[]>([]);
  useEffect(() => {
    const urls = urlsRef.current;
    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, []);

  const trL = useCallback((k: string) => L[k][locale] ?? L[k].en, [locale]);

  const pick = useCallback(
    async (list: File[]) => {
      const f = list.find((x) => x.type.startsWith("image/"));
      if (!f) return;
      setFile(f);
      setRows([]);
      setErr("");
      setImg(null);
      try {
        setImg(await loadImage(f));
      } catch {
        setErr(trL("failed"));
      }
    },
    [trL],
  );

  const reset = () => {
    setFile(null);
    setImg(null);
    setRows([]);
    setErr("");
  };

  // 底色变化 → 重建正方形母版(含留白)
  const master = useMemo(() => (img ? buildMaster(img, bg) : null), [img, bg]);

  // 192 px 实时预览:尺寸/圆角/底色变化即刻重绘
  useEffect(() => {
    const canvas = previewRef.current;
    if (!canvas || !master) return;
    drawIcon(canvas, master, 192, radius);
  }, [master, radius]);

  async function generate() {
    if (!master) return;
    setBusy(true);
    setErr("");
    try {
      const out: Row[] = [];
      for (const size of SIZES) {
        const canvas = document.createElement("canvas");
        drawIcon(canvas, master, size, radius);
        const blob = await canvasToBlob(canvas, "image/png");
        const url = URL.createObjectURL(blob);
        urlsRef.current.push(url);
        out.push({ size, name: FILES[size], url, blob });
      }
      setRows(out);
    } catch {
      setErr(t.common.error);
    } finally {
      setBusy(false);
    }
  }

  async function zipAll() {
    const JSZip = (await import("jszip")).default;
    const zip = new JSZip();
    for (const r of rows) zip.file(r.name, r.blob);
    downloadBlob(await zip.generateAsync({ type: "blob" }), "favicon-kit.zip");
  }

  const srcDims = img ? `${img.naturalWidth} × ${img.naturalHeight} px` : "";

  return (
    <ToolPanel>
      <DropZone onFiles={(list) => void pick(list)} accept="image/*" multiple={false}>
        <p className="text-[14px] text-[var(--color-sub)]">{t.common.dropFile}</p>
      </DropZone>

      {file && (
        <ul className="mt-3 space-y-2">
          <li className="flex items-center gap-2.5 rounded-xl border hairline px-3.5 py-2.5">
            <span className="min-w-0 flex-1 truncate text-[14px]">{file.name}</span>
            <span className="mono flex-none text-[12.5px] text-[var(--color-sub)]">{formatBytes(file.size)}</span>
            <button type="button" onClick={reset} aria-label={t.common.clear}
              className="h-7 w-7 flex-none rounded-full text-[14px] leading-none text-[var(--color-sub)] hover:bg-[var(--color-surface)]">×</button>
          </li>
        </ul>
      )}

      {img && master && (
        <div className="mt-4 grid gap-5 sm:grid-cols-[auto_1fr]">
          <div>
            <span className="mb-1.5 block text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">{trL("preview")}</span>
            <div className="inline-block rounded-2xl border hairline p-2" style={checkerStyle}>
              <canvas ref={previewRef} width={192} height={192} className="block" style={{ width: 192, height: 192 }} aria-label={trL("preview")} />
            </div>
            <p className="mono mt-1.5 text-[12px] text-[var(--color-sub)]">{srcDims}</p>
          </div>
          <div className="space-y-3">
            <label className="block">
              <span className="mb-1.5 block text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">{trL("bg")}</span>
              <span className="flex items-center gap-2.5">
                <input
                  type="color"
                  value={bg}
                  onChange={(e) => setBg(e.target.value)}
                  aria-label={trL("bg")}
                  className="h-10 w-14 cursor-pointer rounded-lg border hairline bg-[var(--color-card)] p-1"
                />
                <span className="mono text-[13px] uppercase text-[var(--color-sub)]">{bg}</span>
              </span>
            </label>
            <div>
              <span className="mb-1.5 block text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">{trL("radius")}</span>
              <div className="flex flex-wrap gap-1.5">
                {RADII.map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRadius(r)}
                    className={`rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                      radius === r ? "border-transparent bg-[var(--color-ink)] text-white" : "hairline hover:bg-[var(--color-surface)]"
                    }`}
                  >
                    {r === 0 ? trL("square") : r === 25 ? trL("rounded") : trL("circle")}
                    <span className="mono ml-1.5 opacity-60">{r}%</span>
                  </button>
                ))}
              </div>
            </div>
            <p className="text-[12.5px] leading-5 text-[var(--color-sub)]">{trL("padNote")}</p>
          </div>
        </div>
      )}

      {err && <p role="alert" className="mt-3 rounded-xl error-bg px-3.5 py-2.5 text-[13.5px] leading-5 text-[var(--color-bad)]">{err}</p>}

      {rows.length > 0 && (
        <div className="mt-4 overflow-x-auto rounded-2xl border hairline p-4">
          <ul className="min-w-[460px] space-y-2">
            {rows.map((r) => (
              <li key={r.name} className="flex items-center gap-3 text-[14px]">
                <span className="flex-none rounded-lg border hairline p-1.5" style={checkerStyle}>
                  {/* 16–48 px 用 pixelated 呈现真实像素;512 行可横向滚动 */}
                  <img
                    src={r.url}
                    alt={r.name}
                    width={r.size}
                    height={r.size}
                    style={r.size <= 48 ? { imageRendering: "pixelated" } : undefined}
                    className="block"
                  />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="mono block truncate font-medium">{r.name}</span>
                  <span className="block text-[12.5px] text-[var(--color-sub)]">
                    {r.size} × {r.size} px · {trKind(KINDS[r.size], locale)} · {formatBytes(r.blob.size)}
                  </span>
                </span>
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

      {rows.length > 0 && (
        <div className="mt-4 rounded-2xl border hairline p-4">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
            <span className="text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">{trL("snippet")}</span>
            <CopyButton value={SNIPPET} />
          </div>
          <pre className="mono overflow-x-auto rounded-xl bg-[var(--color-surface)] p-3.5 text-[12px] leading-5">{SNIPPET}</pre>
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2.5">
        <button
          type="button"
          onClick={() => void generate()}
          disabled={busy || !master}
          className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-accent)] px-5 py-2.5 text-[15px] font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Icon name="sparkle" size={15} />
          {busy ? t.common.processing : trL("generate")}
        </button>
        {rows.length > 1 && (
          <button
            type="button"
            onClick={() => void zipAll()}
            className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-ink)] px-4 py-2.5 text-[14px] font-medium text-white transition-opacity hover:opacity-85"
          >
            <Icon name="download" size={15} />
            {trL("zip")}
          </button>
        )}
        {file && !busy && (
          <button
            type="button"
            onClick={reset}
            className="rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)]"
          >
            {t.common.reset}
          </button>
        )}
      </div>
    </ToolPanel>
  );
}

function trKind(kind: Record<string, string> | undefined, locale: Locale): string {
  if (!kind) return "";
  return kind[locale] ?? kind.en;
}
