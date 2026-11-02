"use client";

import { useCallback, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { DropZone, downloadBlob, formatBytes } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { SHARED, Err, FileRow, Ghost, Label, Primary, baseName, canvasToBlob, toPdfBlob, tr, type L } from "./pdf-ui";

type Kind = "jpg" | "png" | "any";

const UI: Record<string, L> = {
  pageSize: { en: "Page size", zh: "页面大小", ja: "ページサイズ", es: "Tamaño de página", pt: "Tamanho da página" },
  fit: { en: "Fit to image", zh: "随图片尺寸", ja: "画像に合わせる", es: "Ajustar a la imagen", pt: "Ajustar à imagem" },
  a4: { en: "A4", zh: "A4", ja: "A4", es: "A4", pt: "A4" },
  letter: { en: "Letter", zh: "Letter", ja: "レター", es: "Carta", pt: "Carta" },
  orientation: { en: "Orientation", zh: "方向", ja: "向き", es: "Orientación", pt: "Orientação" },
  auto: { en: "Auto", zh: "自动", ja: "自動", es: "Automática", pt: "Automática" },
  portrait: { en: "Portrait", zh: "纵向", ja: "縦", es: "Vertical", pt: "Retrato" },
  landscape: { en: "Landscape", zh: "横向", ja: "横", es: "Horizontal", pt: "Paisagem" },
  margin: { en: "Margin (pt)", zh: "页边距(pt)", ja: "余白 (pt)", es: "Margen (pt)", pt: "Margem (pt)" },
  build: { en: "Create PDF", zh: "生成 PDF", ja: "PDF を作成", es: "Crear PDF", pt: "Criar PDF" },
  badImage: { en: "Some files could not be read as images.", zh: "部分文件无法作为图片读取。", ja: "一部のファイルを画像として読み込めませんでした。", es: "Algunos archivos no se pudieron leer como imágenes.", pt: "Alguns arquivos não puderam ser lidos como imagens." },
};

const ACCEPT_LABEL: Record<Kind, L> = {
  jpg: { en: "JPG images", zh: "JPG 图片", ja: "JPG 画像", es: "Imágenes JPG", pt: "Imagens JPG" },
  png: { en: "PNG images", zh: "PNG 图片", ja: "PNG 画像", es: "Imágenes PNG", pt: "Imagens PNG" },
  any: { en: "Images (JPG, PNG, WebP…)", zh: "图片(JPG、PNG、WebP 等)", ja: "画像(JPG、PNG、WebP など)", es: "Imágenes (JPG, PNG, WebP…)", pt: "Imagens (JPG, PNG, WebP…)" },
};

const ACCEPTS: Record<Kind, string> = {
  jpg: "image/jpeg,.jpg,.jpeg",
  png: "image/png,.png",
  any: "image/*",
};

const A4 = [595.28, 841.89];
const LETTER = [612, 792];

export function ImagesToPdfEngine({ kind }: { kind: Kind }) {
  const { t, locale } = useI18n();
  const [images, setImages] = useState<File[]>([]);
  const [pageSize, setPageSize] = useState<"fit" | "a4" | "letter">("fit");
  const [orientation, setOrientation] = useState<"auto" | "portrait" | "landscape">("auto");
  const [margin, setMargin] = useState(24);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [out, setOut] = useState<{ blob: Blob; name: string } | null>(null);

  const addFiles = useCallback((list: File[]) => {
    const imgs = list.filter((f) => f.type.startsWith("image/"));
    if (imgs.length) {
      setImages((prev) => [...prev, ...imgs]);
      setOut(null);
      setErr("");
    }
  }, []);

  const reset = () => {
    setImages([]);
    setOut(null);
    setErr("");
  };

  const move = (i: number, dir: -1 | 1) => {
    setImages((prev) => {
      const next = [...prev];
      [next[i], next[i + dir]] = [next[i + dir], next[i]];
      return next;
    });
  };

  /** Re-encode anything that is not a plain JPEG/PNG through a canvas so pdf-lib can embed it. */
  async function toEmbeddable(f: File): Promise<{ data: Uint8Array; type: "jpg" | "png" }> {
    const buf = new Uint8Array(await f.arrayBuffer());
    if (f.type === "image/jpeg" && buf[0] === 0xff && buf[1] === 0xd8) {
      return { data: buf, type: "jpg" };
    }
    if (f.type === "image/png" && buf[0] === 0x89 && buf[1] === 0x50) {
      return { data: buf, type: "png" };
    }
    const url = URL.createObjectURL(f);
    try {
      const img = await new Promise<HTMLImageElement>((res, rej) => {
        const el = new Image();
        el.onload = () => res(el);
        el.onerror = () => rej(new Error("decode"));
        el.src = url;
      });
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      canvas.getContext("2d")?.drawImage(img, 0, 0);
      const blob = await canvasToBlob(canvas, "image/png");
      return { data: new Uint8Array(await blob.arrayBuffer()), type: "png" };
    } finally {
      URL.revokeObjectURL(url);
    }
  }

  async function run() {
    if (!images.length) {
      setErr(t.common.dropFile);
      return;
    }
    setBusy(true);
    setErr("");
    try {
      const { PDFDocument } = await import("pdf-lib");
      const doc = await PDFDocument.create();
      for (const f of images) {
        let emb;
        try {
          const { data, type } = await toEmbeddable(f);
          emb = { img: type === "jpg" ? await doc.embedJpg(data) : await doc.embedPng(data) };
        } catch {
          throw new Error("badImage");
        }
        const { img } = emb;
        let pw: number;
        let ph: number;
        if (pageSize === "fit") {
          pw = img.width;
          ph = img.height;
        } else {
          const base = pageSize === "a4" ? A4 : LETTER;
          const landscape =
            orientation === "landscape" || (orientation === "auto" && img.width > img.height);
          pw = landscape ? base[1] : base[0];
          ph = landscape ? base[0] : base[1];
        }
        const page = doc.addPage([pw, ph]);
        const m = pageSize === "fit" ? 0 : Math.max(0, margin);
        const maxW = pw - m * 2;
        const maxH = ph - m * 2;
        const scale = Math.min(maxW / img.width, maxH / img.height, 1);
        const w = img.width * scale;
        const h = img.height * scale;
        page.drawImage(img, { x: (pw - w) / 2, y: (ph - h) / 2, width: w, height: h });
      }
      const bytes = await doc.save();
      const name = `${images.length === 1 ? baseName(images[0].name) : "images"}.pdf`;
      setOut({ blob: toPdfBlob(bytes), name });
    } catch (e) {
      setErr(e instanceof Error && e.message === "badImage" ? tr(UI.badImage, locale) : tr(SHARED.failed, locale));
    } finally {
      setBusy(false);
    }
  }

  return (
    <ToolPanel>
      <DropZone onFiles={addFiles} accept={ACCEPTS[kind]}>
        <p className="text-[14px] text-[var(--color-sub)]">
          {images.length ? tr(SHARED.addMore, locale) : tr(ACCEPT_LABEL[kind], locale) + " — " + t.common.dropFiles.toLowerCase()}
        </p>
      </DropZone>

      {images.length > 0 && (
        <ul className="mt-3 space-y-2">
          {images.map((f, i) => (
            <FileRow key={`${f.name}-${i}`} name={f.name} size={formatBytes(f.size)}
              first={i === 0} last={i === images.length - 1}
              onUp={i > 0 ? () => move(i, -1) : undefined}
              onDown={i < images.length - 1 ? () => move(i, 1) : undefined}
              onRemove={() => { setImages((p) => p.filter((_, j) => j !== i)); setOut(null); }} />
          ))}
        </ul>
      )}

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <div>
          <Label>{tr(UI.pageSize, locale)}</Label>
          <select className="field" value={pageSize} onChange={(e) => setPageSize(e.target.value as typeof pageSize)} aria-label={tr(UI.pageSize, locale)}>
            <option value="fit">{tr(UI.fit, locale)}</option>
            <option value="a4">{tr(UI.a4, locale)}</option>
            <option value="letter">{tr(UI.letter, locale)}</option>
          </select>
        </div>
        {pageSize !== "fit" && (
          <>
            <div>
              <Label>{tr(UI.orientation, locale)}</Label>
              <select className="field" value={orientation} onChange={(e) => setOrientation(e.target.value as typeof orientation)} aria-label={tr(UI.orientation, locale)}>
                <option value="auto">{tr(UI.auto, locale)}</option>
                <option value="portrait">{tr(UI.portrait, locale)}</option>
                <option value="landscape">{tr(UI.landscape, locale)}</option>
              </select>
            </div>
            <div>
              <Label>{tr(UI.margin, locale)}</Label>
              <input type="number" className="field bare" min={0} max={120} value={margin}
                onChange={(e) => setMargin(parseInt(e.target.value, 10) || 0)} aria-label={tr(UI.margin, locale)} />
            </div>
          </>
        )}
      </div>

      <Err msg={err} />
      {out && (
        <div className="mt-3 flex items-center gap-2.5 rounded-xl border hairline px-3.5 py-2.5 text-[14px]">
          <span className="min-w-0 flex-1 truncate">{out.name}</span>
          <span className="mono flex-none text-[12.5px] text-[var(--color-sub)]">{formatBytes(out.blob.size)}</span>
          <button type="button" onClick={() => downloadBlob(out.blob, out.name)}
            className="flex-none rounded-full border hairline px-3 py-1 text-[12.5px] font-medium hover:bg-[var(--color-surface)]">
            {t.common.download}
          </button>
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2.5">
        <Primary onClick={run} disabled={busy || !images.length}>{tr(UI.build, locale)}</Primary>
        {images.length > 0 && !busy && <Ghost onClick={reset}>{t.common.reset}</Ghost>}
      </div>
    </ToolPanel>
  );
}
