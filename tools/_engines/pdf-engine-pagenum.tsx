"use client";

import { useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { DropZone, downloadBlob, formatBytes } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { SHARED, Err, Ghost, Label, Primary, baseName, toPdfBlob, tr, type L } from "./pdf-ui";

const UI: Record<string, L> = {
  format: { en: "Number format", zh: "页码格式", ja: "番号の形式", es: "Formato", pt: "Formato" },
  position: { en: "Position", zh: "位置", ja: "位置", es: "Posición", pt: "Posição" },
  startAt: { en: "Start numbering at", zh: "起始页码", ja: "開始番号", es: "Empezar en", pt: "Começar em" },
  add: { en: "Add page numbers", zh: "添加页码", ja: "ページ番号を追加", es: "Añadir números", pt: "Adicionar números" },
  top: { en: "Top", zh: "顶部", ja: "上", es: "Arriba", pt: "Topo" },
  bottom: { en: "Bottom", zh: "底部", ja: "下", es: "Abajo", pt: "Base" },
  left: { en: "left", zh: "左", ja: "左", es: "izq.", pt: "esq." },
  center: { en: "center", zh: "中", ja: "中央", es: "centro", pt: "centro" },
  right: { en: "right", zh: "右", ja: "右", es: "der.", pt: "dir." },
};

const POSITIONS = ["bl", "bc", "br", "tl", "tc", "tr"] as const;
type Pos = (typeof POSITIONS)[number];

export function PdfPageNumEngine() {
  const { t, locale } = useI18n();
  const [file, setFile] = useState<File | null>(null);
  const [format, setFormat] = useState<"n" | "nN" | "page">("n");
  const [pos, setPos] = useState<Pos>("bc");
  const [start, setStart] = useState(1);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [out, setOut] = useState<{ name: string; blob: Blob } | null>(null);

  const reset = () => {
    setFile(null);
    setOut(null);
    setErr("");
  };

  const label = (n: number, total: number) => {
    if (format === "n") return String(n);
    if (format === "nN") return `${n} / ${total}`;
    return `Page ${n} of ${total}`;
  };

  async function run() {
    if (!file) {
      setErr(tr(SHARED.needFile, locale));
      return;
    }
    setBusy(true);
    setErr("");
    setOut(null);
    try {
      const { PDFDocument, StandardFonts, rgb } = await import("pdf-lib");
      const doc = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
      if (doc.isEncrypted) throw new Error("encrypted");
      const font = await doc.embedFont(StandardFonts.Helvetica);
      const size = 11;
      const margin = 24;
      const total = doc.getPageCount();
      doc.getPages().forEach((page, i) => {
        const text = label(start + i, total);
        const { width, height } = page.getSize();
        const tw = font.widthOfTextAtSize(text, size);
        const x = pos.endsWith("l") ? margin : pos.endsWith("r") ? width - margin - tw : (width - tw) / 2;
        const y = pos.startsWith("b") ? margin / 1.6 : height - margin;
        page.drawText(text, { x, y, size, font, color: rgb(0.35, 0.35, 0.38) });
      });
      const bytes = await doc.save();
      setOut({ name: `${baseName(file.name)}-numbered.pdf`, blob: toPdfBlob(bytes) });
    } catch {
      setErr(tr(SHARED.failed, locale));
    } finally {
      setBusy(false);
    }
  }

  return (
    <ToolPanel>
      <DropZone
        onFiles={(list) => {
          const pdf = list.find((f) => /\.pdf$/i.test(f.name) || f.type === "application/pdf");
          if (pdf) {
            setFile(pdf);
            setOut(null);
            setErr("");
          } else {
            setErr(t.common.error);
          }
        }}
        accept="application/pdf,.pdf"
        multiple={false}
      >
        <p className="text-[14px] text-[var(--color-sub)]">{t.common.dropFile}</p>
      </DropZone>

      {file && (
        <ul className="mt-3 space-y-2">
          <li className="flex items-center gap-2.5 rounded-xl border hairline px-3.5 py-2.5">
            <span className="min-w-0 flex-1 truncate text-[14px]">{file.name}</span>
            <span className="mono flex-none text-[12.5px] text-[var(--color-sub)]">{formatBytes(file.size)}</span>
            <button type="button" onClick={reset} aria-label={tr(SHARED.remove, locale)}
              className="h-7 w-7 flex-none rounded-full text-[14px] leading-none text-[var(--color-sub)] hover:bg-[var(--color-surface)]">×</button>
          </li>
        </ul>
      )}

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <div>
          <Label>{tr(UI.format, locale)}</Label>
          <select className="field" value={format} onChange={(e) => setFormat(e.target.value as typeof format)} aria-label={tr(UI.format, locale)}>
            <option value="n">1, 2, 3…</option>
            <option value="nN">1 / N</option>
            <option value="page">Page 1 of N</option>
          </select>
        </div>
        <div>
          <Label>{tr(UI.position, locale)}</Label>
          <div className="flex flex-wrap gap-1.5">
            {POSITIONS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPos(p)}
                className={`rounded-lg border px-2.5 py-1.5 text-[12px] font-medium transition-colors ${
                  pos === p ? "border-transparent bg-[var(--color-ink)] text-white dark:bg-white dark:text-[#1d1d1f]" : "hairline hover:bg-[var(--color-surface)]"
                }`}
              >
                {p.startsWith("t") ? tr(UI.top, locale) : tr(UI.bottom, locale)}
                <span className="ml-1 opacity-70">
                  {p.endsWith("l") ? tr(UI.left, locale) : p.endsWith("r") ? tr(UI.right, locale) : tr(UI.center, locale)}
                </span>
              </button>
            ))}
          </div>
        </div>
        <div>
          <Label>{tr(UI.startAt, locale)}</Label>
          <input
            type="number"
            className="field bare"
            min={1}
            value={start}
            onChange={(e) => setStart(Math.max(1, parseInt(e.target.value, 10) || 1))}
            aria-label={tr(UI.startAt, locale)}
          />
        </div>
      </div>

      <Err msg={err} />

      {out && (
        <div className="mt-4 rounded-2xl border hairline p-4">
          <ul>
            <li className="flex items-center gap-2.5 text-[14px]">
              <span className="min-w-0 flex-1 truncate">{out.name}</span>
              <span className="mono flex-none text-[12.5px] text-[var(--color-sub)]">{formatBytes(out.blob.size)}</span>
              <button
                type="button"
                onClick={() => downloadBlob(out.blob, out.name)}
                className="flex-none rounded-full border hairline px-3 py-1 text-[12.5px] font-medium hover:bg-[var(--color-surface)]"
              >
                {t.common.download}
              </button>
            </li>
          </ul>
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2.5">
        <Primary onClick={run} disabled={busy || !file}>{tr(UI.add, locale)}</Primary>
        {file && !busy && <Ghost onClick={reset}>{t.common.reset}</Ghost>}
      </div>
    </ToolPanel>
  );
}
