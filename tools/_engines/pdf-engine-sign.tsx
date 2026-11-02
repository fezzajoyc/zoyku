"use client";

import { useCallback, useRef, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { DropZone, downloadBlob, formatBytes } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { SHARED, Err, Ghost, Label, Primary, baseName, parsePageRanges, toPdfBlob, tr, type L } from "./pdf-ui";
import { sanitizeWinAnsi } from "./pdf-text";

const UI: Record<string, L> = {
  draw: { en: "Draw your signature", zh: "在下方手写签名", ja: "署名を描く", es: "Dibuja tu firma", pt: "Desenhe sua assinatura" },
  clear: { en: "Clear", zh: "清除重写", ja: "クリア", es: "Borrar", pt: "Limpar" },
  position: { en: "Position", zh: "位置", ja: "位置", es: "Posición", pt: "Posição" },
  width: { en: "Signature width", zh: "签名宽度", ja: "署名の幅", es: "Ancho de la firma", pt: "Largura da assinatura" },
  stampPages: { en: "Stamp on pages", zh: "签署页码", ja: "署名するページ", es: "Aplicar en páginas", pt: "Aplicar nas páginas" },
  addDate: { en: "Add today's date below the signature", zh: "在签名下方添加当天日期", ja: "署名の下に日付を追加", es: "Añadir la fecha de hoy bajo la firma", pt: "Adicionar a data de hoje abaixo da assinatura" },
  sign: { en: "Sign & download", zh: "签署并下载", ja: "署名してダウンロード", es: "Firmar y descargar", pt: "Assinar e baixar" },
  needSign: { en: "Draw a signature first.", zh: "请先手写签名。", ja: "先に署名を描いてください。", es: "Primero dibuja una firma.", pt: "Desenhe uma assinatura primeiro." },
};

const POS_LABELS = ["top left", "top", "top right", "left", "center", "right", "bottom left", "bottom", "bottom right"];

export function PdfSignEngine() {
  const { t, locale } = useI18n();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [hasInk, setHasInk] = useState(false);
  const [pos, setPos] = useState(8); // bottom right
  const [widthPct, setWidthPct] = useState(25);
  const [pages, setPages] = useState("");
  const [addDate, setAddDate] = useState(false);
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

  function pos2d(e: React.PointerEvent<HTMLCanvasElement>): { x: number; y: number } {
    const rect = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function start(e: React.PointerEvent<HTMLCanvasElement>) {
    e.currentTarget.setPointerCapture(e.pointerId);
    drawing.current = true;
    last.current = pos2d(e);
  }

  function stroke(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!drawing.current || !last.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const p = pos2d(e);
    ctx.strokeStyle = "#111114";
    ctx.lineWidth = 2.4;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(last.current.x, last.current.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    last.current = p;
    if (!hasInk) setHasInk(true);
  }

  function end() {
    drawing.current = false;
    last.current = null;
  }

  function clearPad() {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasInk(false);
  }

  /** Crop the transparent margins so the stamp is tight around the ink. */
  function trimmedPng(): string | null {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    const { width, height } = canvas;
    const data = ctx.getImageData(0, 0, width, height).data;
    let minX = width, minY = height, maxX = -1, maxY = -1;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (data[(y * width + x) * 4 + 3] > 10) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }
    if (maxX < 0) return null;
    const pad = 6;
    minX = Math.max(0, minX - pad);
    minY = Math.max(0, minY - pad);
    maxX = Math.min(width - 1, maxX + pad);
    maxY = Math.min(height - 1, maxY + pad);
    const crop = document.createElement("canvas");
    crop.width = maxX - minX + 1;
    crop.height = maxY - minY + 1;
    crop.getContext("2d")?.drawImage(canvas, minX, minY, crop.width, crop.height, 0, 0, crop.width, crop.height);
    return crop.toDataURL("image/png");
  }

  async function run() {
    if (!file) {
      setErr(tr(SHARED.needFile, locale));
      return;
    }
    const png = trimmedPng();
    if (!png) {
      setErr(tr(UI.needSign, locale));
      return;
    }
    setBusy(true);
    setErr("");
    try {
      const { PDFDocument, StandardFonts, degrees } = await import("pdf-lib");
      const doc = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
      if (doc.isEncrypted) throw new Error("encrypted");
      const img = await doc.embedPng(png);
      const n = doc.getPageCount();
      const targets = pages.trim() ? parsePageRanges(pages, n) : [1];
      if (!targets) throw new Error("range");
      const margin = 26;
      const dateText = addDate
        ? sanitizeWinAnsi(new Date().toLocaleDateString(locale === "zh" ? "zh-CN" : locale === "ja" ? "ja-JP" : locale === "pt" ? "pt-BR" : locale, { year: "numeric", month: "short", day: "numeric" }))
        : "";
      const font = dateText ? await doc.embedFont(StandardFonts.Helvetica) : null;
      for (const p of targets) {
        const page = doc.getPage(p - 1);
        const { width, height } = page.getSize();
        const cellW = (width - margin * 2) / 3;
        const cellH = (height - margin * 2) / 3;
        const col = pos % 3;
        const row = Math.floor(pos / 3);
        let w = (widthPct / 100) * width;
        w = Math.min(w, cellW * 0.95);
        const h = (img.height / img.width) * w;
        const cellX = margin + col * cellW;
        const cellY = margin + (2 - row) * cellH;
        const x = cellX + (cellW - w) / 2;
        const y = cellY + Math.max(0, (cellH - h - (dateText ? 14 : 0)) / 2);
        page.drawImage(img, { x, y, width: w, height: h, rotate: degrees(0) });
        if (font && dateText) {
          page.drawText(dateText, { x: x + w / 2 - font.widthOfTextAtSize(dateText, 9) / 2, y: y - 12, size: 9, font });
        }
      }
      const bytes = await doc.save();
      setOut({ blob: toPdfBlob(bytes), name: `${baseName(file.name)}-signed.pdf` });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "";
      setErr(msg === "encrypted" ? tr(SHARED.encrypted, locale) : msg === "range" ? tr(SHARED.badRange, locale) : tr(SHARED.failed, locale));
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

          <div>
            <Label>{tr(UI.draw, locale)}</Label>
            <canvas
              ref={canvasRef}
              width={1120}
              height={400}
              onPointerDown={start}
              onPointerMove={stroke}
              onPointerUp={end}
              onPointerLeave={end}
              className="h-40 w-full touch-none rounded-xl border-2 border-dashed bg-[var(--color-surface)]"
              style={{ borderColor: hasInk ? "var(--color-accent)" : undefined, borderStyle: hasInk ? "solid" : undefined }}
              aria-label={tr(UI.draw, locale)}
            />
            <div className="mt-2">
              <Ghost onClick={clearPad}>{tr(UI.clear, locale)}</Ghost>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <Label>{tr(UI.position, locale)}</Label>
              <div className="grid w-24 grid-cols-3 gap-1">
                {POS_LABELS.map((_, i) => (
                  <button key={i} type="button" aria-label={POS_LABELS[i]} aria-pressed={pos === i} onClick={() => setPos(i)}
                    className={`h-7 w-7 rounded-md border ${pos === i ? "border-[var(--color-accent)] bg-[rgba(0,113,227,0.15)]" : "hairline hover:bg-[var(--color-surface)]"}`} />
                ))}
              </div>
            </div>
            <div>
              <Label>{tr(UI.width, locale)}: {widthPct}%</Label>
              <input type="range" min={12} max={50} value={widthPct} onChange={(e) => setWidthPct(parseInt(e.target.value, 10))} className="w-full" aria-label={tr(UI.width, locale)} />
            </div>
            <div>
              <Label>{tr(UI.stampPages, locale)}</Label>
              <input className="field mono" value={pages} onChange={(e) => setPages(e.target.value)} placeholder="1" aria-label={tr(UI.stampPages, locale)} />
            </div>
            <label className="flex items-end gap-2 pb-2 text-[13.5px] text-[var(--color-sub)]">
              <input type="checkbox" checked={addDate} onChange={(e) => setAddDate(e.target.checked)} className="h-4 w-4 accent-[var(--color-accent)]" />
              {tr(UI.addDate, locale)}
            </label>
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
            <Primary onClick={run} disabled={busy}>{tr(UI.sign, locale)}</Primary>
            {file && !busy && <Ghost onClick={reset}>{t.common.reset}</Ghost>}
          </div>
        </div>
      )}
    </ToolPanel>
  );
}
