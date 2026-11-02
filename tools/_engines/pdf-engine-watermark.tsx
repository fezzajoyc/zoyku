"use client";

import { useCallback, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { DropZone, downloadBlob, formatBytes } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { SHARED, Err, Ghost, Label, Primary, baseName, toPdfBlob, tr, type L } from "./pdf-ui";
import { sanitizeWinAnsi } from "./pdf-text";

const UI: Record<string, L> = {
  text: { en: "Watermark text", zh: "水印文字", ja: "ウォーターマーク文字", es: "Texto de la marca", pt: "Texto da marca d'água" },
  layout: { en: "Layout", zh: "排版", ja: "レイアウト", es: "Disposición", pt: "Layout" },
  center: { en: "Center", zh: "居中单个", ja: "中央に 1 つ", es: "Centrado", pt: "Centralizado" },
  tile: { en: "Tiled", zh: "平铺多个", ja: "タイル状", es: "Mosaico", pt: "Em mosaico" },
  size: { en: "Font size", zh: "字号", ja: "フォントサイズ", es: "Tamaño", pt: "Tamanho" },
  opacity: { en: "Opacity", zh: "不透明度", ja: "不透明度", es: "Opacidad", pt: "Opacidade" },
  color: { en: "Color", zh: "颜色", ja: "色", es: "Color", pt: "Cor" },
  watermark: { en: "Add watermark", zh: "添加水印", ja: "ウォーターマークを追加", es: "Añadir marca de agua", pt: "Adicionar marca d'água" },
};

const COLORS: { id: string; rgb: [number, number, number]; css: string }[] = [
  { id: "gray", rgb: [0.55, 0.55, 0.58], css: "#8c8c94" },
  { id: "red", rgb: [0.85, 0.2, 0.2], css: "#d93333" },
  { id: "blue", rgb: [0.15, 0.4, 0.85], css: "#2666d9" },
  { id: "black", rgb: [0.1, 0.1, 0.12], css: "#1a1a1f" },
];

export function PdfWatermarkEngine() {
  const { t, locale } = useI18n();
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("CONFIDENTIAL");
  const [layout, setLayout] = useState<"center" | "tile">("center");
  const [size, setSize] = useState(48);
  const [opacity, setOpacity] = useState(18);
  const [color, setColor] = useState("gray");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [out, setOut] = useState<{ blob: Blob; name: string } | null>(null);

  const pick = useCallback((fs: File[]) => {
    const f = fs.find((x) => /\.pdf$/i.test(x.name) || x.type === "application/pdf");
    if (!f) return;
    setFile(f);
    setOut(null);
    setErr("");
  }, []);

  const reset = () => {
    setFile(null);
    setOut(null);
    setErr("");
  };

  async function run() {
    if (!file) {
      setErr(tr(SHARED.needFile, locale));
      return;
    }
    const safe = sanitizeWinAnsi(text) || "WATERMARK";
    setBusy(true);
    setErr("");
    try {
      const { PDFDocument, degrees, rgb, StandardFonts } = await import("pdf-lib");
      const doc = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
      if (doc.isEncrypted) throw new Error("encrypted");
      const font = await doc.embedFont(StandardFonts.HelveticaBold);
      const c = COLORS.find((x) => x.id === color) ?? COLORS[0];
      for (const page of doc.getPages()) {
        const { width, height } = page.getSize();
        const fontSize = Math.max(8, Math.min(200, size));
        const textW = font.widthOfTextAtSize(safe, fontSize);
        if (layout === "center") {
          page.drawText(safe, {
            x: Math.max(8, (width - textW) / 2),
            y: height / 2 - fontSize / 2.6,
            font,
            size: fontSize,
            color: rgb(c.rgb[0], c.rgb[1], c.rgb[2]),
            opacity: opacity / 100,
            rotate: degrees(0),
          });
        } else {
          const stepX = Math.max(textW * 1.35, fontSize * 6);
          const stepY = fontSize * 4.2;
          for (let row = 0; row * stepY < height + stepY; row++) {
            const offset = row % 2 === 0 ? 0 : stepX / 2;
            for (let x = -textW; x + offset < width + textW; x += stepX) {
              page.drawText(safe, {
                x: x + offset,
                y: height - row * stepY - fontSize,
                font,
                size: fontSize,
                color: rgb(c.rgb[0], c.rgb[1], c.rgb[2]),
                opacity: opacity / 100,
                rotate: degrees(30),
              });
            }
          }
        }
      }
      const bytes = await doc.save();
      setOut({ blob: toPdfBlob(bytes), name: `${baseName(file.name)}-watermarked.pdf` });
    } catch (e) {
      setErr(e instanceof Error && e.message === "encrypted" ? tr(SHARED.encrypted, locale) : tr(SHARED.failed, locale));
    } finally {
      setBusy(false);
    }
  }

  return (
    <ToolPanel>
      {!file ? (
        <DropZone onFiles={pick} accept="application/pdf,.pdf" multiple={false} />
      ) : (
        <div className="space-y-3">
          <div className="flex items-center gap-2.5 rounded-xl border hairline px-3.5 py-2.5 text-[14px]">
            <span className="min-w-0 flex-1 truncate">{file.name}</span>
            <span className="mono flex-none text-[12.5px] text-[var(--color-sub)]">{formatBytes(file.size)}</span>
            <button type="button" onClick={reset} aria-label={t.common.reset}
              className="h-7 w-7 flex-none rounded-full text-[14px] leading-none text-[var(--color-sub)] hover:bg-[var(--color-surface)]">×</button>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label>{tr(UI.text, locale)}</Label>
              <input className="field" value={text} maxLength={60} onChange={(e) => setText(e.target.value)} aria-label={tr(UI.text, locale)} />
            </div>
            <div>
              <Label>{tr(UI.layout, locale)}</Label>
              <div className="flex gap-2">
                {(["center", "tile"] as const).map((m) => (
                  <button key={m} type="button" onClick={() => setLayout(m)}
                    className={`rounded-full border px-3 py-1.5 text-[13px] font-medium ${layout === m ? "border-transparent bg-[var(--color-ink)] text-white" : "hairline hover:bg-[var(--color-surface)]"}`}>
                    {tr(UI[m], locale)}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label>{tr(UI.color, locale)}</Label>
              <div className="flex gap-2">
                {COLORS.map((c) => (
                  <button key={c.id} type="button" aria-label={c.id} aria-pressed={color === c.id} onClick={() => setColor(c.id)}
                    className={`h-8 w-8 rounded-full border-2 transition-transform ${color === c.id ? "scale-110 border-[var(--color-ink)]" : "border-transparent"}`}
                    style={{ background: c.css }} />
                ))}
              </div>
            </div>
            <div>
              <Label>{tr(UI.size, locale)}: {size}</Label>
              <input type="range" min={16} max={110} value={size} onChange={(e) => setSize(parseInt(e.target.value, 10))} className="w-full" aria-label={tr(UI.size, locale)} />
            </div>
            <div>
              <Label>{tr(UI.opacity, locale)}: {opacity}%</Label>
              <input type="range" min={5} max={70} value={opacity} onChange={(e) => setOpacity(parseInt(e.target.value, 10))} className="w-full" aria-label={tr(UI.opacity, locale)} />
            </div>
          </div>

          <Err msg={err} />
          {out && (
            <div className="flex items-center gap-2.5 rounded-xl border hairline px-3.5 py-2.5 text-[14px]">
              <span className="min-w-0 flex-1 truncate">{out.name}</span>
              <span className="mono flex-none text-[12.5px] text-[var(--color-sub)]">{formatBytes(out.blob.size)}</span>
              <button type="button" onClick={() => downloadBlob(out.blob, out.name)}
                className="flex-none rounded-full border hairline px-3 py-1 text-[12.5px] font-medium hover:bg-[var(--color-surface)]">
                {t.common.download}
              </button>
            </div>
          )}

          <div className="flex flex-wrap gap-2.5">
            <Primary onClick={run} disabled={busy}>{tr(UI.watermark, locale)}</Primary>
            {file && !busy && <Ghost onClick={reset}>{t.common.reset}</Ghost>}
          </div>
        </div>
      )}
    </ToolPanel>
  );
}
