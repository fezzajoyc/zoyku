"use client";

import { useCallback, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton, DropZone, downloadBlob, formatBytes } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { SHARED, Err, Ghost, Label, Primary, Progress, baseName, canvasToBlob, loadPdf, renderPageToCanvas, toPdfBlob, tr, type L } from "./pdf-ui";
import { escapeXml, itemsToLines, linesToParagraphs, lineToCells, sanitizeWinAnsi, type TextLine } from "./pdf-text";

export type OfficeTarget = "text" | "docx" | "xlsx" | "pptx" | "fromdocx";

const UI: Record<string, L> = {
  text: { en: "Extract text", zh: "提取文本", ja: "テキストを抽出", es: "Extraer texto", pt: "Extrair texto" },
  docx: { en: "Convert to Word", zh: "转换为 Word", ja: "Word に変換", es: "Convertir a Word", pt: "Converter para Word" },
  xlsx: { en: "Convert to Excel", zh: "转换为 Excel", ja: "Excel に変換", es: "Convertir a Excel", pt: "Converter para Excel" },
  pptx: { en: "Convert to PowerPoint", zh: "转换为 PowerPoint", ja: "PowerPoint に変換", es: "Convertir a PowerPoint", pt: "Converter para PowerPoint" },
  fromdocx: { en: "Convert to PDF", zh: "转换为 PDF", ja: "PDF に変換", es: "Convertir a PDF", pt: "Converter para PDF" },
  empty: { en: "No text found in this PDF.", zh: "该 PDF 中没有找到文本。", ja: "この PDF にテキストが見つかりません。", es: "No se encontró texto en este PDF.", pt: "Nenhum texto encontrado neste PDF." },
  words: { en: "words", zh: "字", ja: "語", es: "palabras", pt: "palavras" },
};

/* ------------------------------------------------------------------ */
/* Text extraction from PDF (pdf.js)                                   */
/* ------------------------------------------------------------------ */

async function extractPdfLines(file: File, onPage?: (done: number, total: number) => void): Promise<TextLine[][]> {
  const pdf = await loadPdf(new Uint8Array(await file.arrayBuffer()));
  const pages: TextLine[][] = [];
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    pages.push(itemsToLines(content.items as never));
    page.cleanup();
    onPage?.(i, pdf.numPages);
  }
  pdf.destroy();
  return pages;
}

/* ------------------------------------------------------------------ */
/* Minimal OOXML (.docx) writer — no library needed beyond JSZip       */
/* ------------------------------------------------------------------ */

const CT_TYPES = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
<Default Extension="xml" ContentType="application/xml"/>
<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
<Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
</Types>`;

const RELS = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`;

const DOC_RELS = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>`;

const STYLES = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
<w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri" w:eastAsia="Calibri"/><w:sz w:val="22"/></w:rPr></w:rPrDefault></w:docDefaults>
<w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/></w:style>
<w:style w:type="paragraph" w:styleId="Heading1"><w:name w:val="heading 1"/><w:basedOn w:val="Normal"/><w:pPr><w:outlineLvl w:val="0"/><w:spacing w:before="280" w:after="120"/></w:pPr><w:rPr><w:b/><w:sz w:val="34"/></w:rPr></w:style>
<w:style w:type="paragraph" w:styleId="Heading2"><w:name w:val="heading 2"/><w:basedOn w:val="Normal"/><w:pPr><w:outlineLvl w:val="1"/><w:spacing w:before="240" w:after="100"/></w:pPr><w:rPr><w:b/><w:sz w:val="28"/></w:rPr></w:style>
<w:style w:type="paragraph" w:styleId="Heading3"><w:name w:val="heading 3"/><w:basedOn w:val="Normal"/><w:pPr><w:outlineLvl w:val="2"/><w:spacing w:before="200" w:after="80"/></w:pPr><w:rPr><w:b/><w:sz w:val="24"/></w:rPr></w:style>
</w:styles>`;

function docxParagraph(text: string, style?: string): string {
  if (!text) return "<w:p/>";
  const pPr = style ? `<w:pPr><w:pStyle w:val="${style}"/></w:pPr>` : "";
  return `<w:p>${pPr}<w:r><w:t xml:space="preserve">${escapeXml(text)}</w:t></w:r></w:p>`;
}

/* ------------------------------------------------------------------ */
/* word/document.xml → typed blocks (for Word → PDF)                   */
/* ------------------------------------------------------------------ */

type Block = { text: string; size: number; bold: boolean };

async function readDocxParagraphs(file: File): Promise<Block[]> {
  const JSZip = (await import("jszip")).default;
  const zip = await JSZip.loadAsync(await file.arrayBuffer());
  const entry = zip.file("word/document.xml");
  if (!entry) throw new Error("nodocx");
  const xml = await entry.async("string");
  const doc = new DOMParser().parseFromString(xml, "application/xml");
  const blocks: Block[] = [];
  for (const p of Array.from(doc.getElementsByTagName("w:p"))) {
    let text = "";
    let bold = false;
    let size = 11;
    for (const r of Array.from(p.getElementsByTagName("w:r"))) {
      const rpr = r.getElementsByTagName("w:rPr")[0];
      if (rpr) {
        if (rpr.getElementsByTagName("w:b").length) bold = true;
        const sz = rpr.getElementsByTagName("w:sz")[0]?.getAttribute("w:val");
        if (sz) size = Math.max(size, parseInt(sz, 10) / 2);
      }
      for (const t of Array.from(r.getElementsByTagName("w:t"))) text += t.textContent ?? "";
      if (r.getElementsByTagName("w:tab").length) text += "  ";
    }
    const styleEl = p.getElementsByTagName("w:pStyle")[0]?.getAttribute("w:val") ?? "";
    if (/^heading\d$/i.test(styleEl)) {
      const lvl = parseInt(styleEl.replace(/\D/g, ""), 10) || 1;
      size = Math.max(size, [0, 17, 14, 12.5][Math.min(lvl, 3)] ?? 12);
      bold = true;
    }
    const clean = text.replace(/\s+/g, " ").trim();
    if (clean) blocks.push({ text: clean, size, bold });
    else blocks.push({ text: "", size: 11, bold: false });
  }
  return blocks;
}

/* ------------------------------------------------------------------ */
/* Word → PDF typesetting (pdf-lib, standard fonts, WinAnsi-safe)      */
/* ------------------------------------------------------------------ */

async function typesetBlocksToPdf(blocks: Block[]): Promise<Uint8Array> {
  const { PDFDocument, StandardFonts, rgb } = await import("pdf-lib");
  const doc = await PDFDocument.create();
  const body = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const W = 595.28;
  const H = 841.89;
  const M = 57;
  const maxWidth = W - M * 2;
  let page = doc.addPage([W, H]);
  let y = H - M;

  for (const b of blocks) {
    const font = b.bold ? bold : body;
    const size = Math.min(28, Math.max(8, b.size));
    const lh = size * 1.5;
    if (!b.text) {
      y -= lh * 0.6;
      continue;
    }
    if (y - lh < M) {
      page = doc.addPage([W, H]);
      y = H - M;
    }
    for (const line of wrapText(sanitizeWinAnsi(b.text), font, size, maxWidth)) {
      if (y - lh < M) {
        page = doc.addPage([W, H]);
        y = H - M;
      }
      page.drawText(line, { x: M, y: y - size, size, font, color: rgb(0.08, 0.08, 0.1) });
      y -= lh;
    }
    if (b.bold) y -= size * 0.4; // small gap after headings
  }
  return doc.save();
}

function wrapText(text: string, font: { widthOfTextAtSize: (s: string, size: number) => number }, size: number, maxW: number): string[] {
  const out: string[] = [];
  for (const rawLine of text.split("\n")) {
    const words = rawLine.split(/\s+/).filter(Boolean);
    let cur = "";
    for (const w of words) {
      const attempt = cur ? `${cur} ${w}` : w;
      if (font.widthOfTextAtSize(attempt, size) <= maxW) {
        cur = attempt;
      } else {
        if (cur) out.push(cur);
        if (font.widthOfTextAtSize(w, size) > maxW) {
          // hard-break overlong words
          let piece = "";
          for (const ch of w) {
            if (piece && font.widthOfTextAtSize(piece + ch, size) > maxW) {
              out.push(piece);
              piece = ch;
            } else {
              piece += ch;
            }
          }
          cur = piece;
        } else {
          cur = w;
        }
      }
    }
    out.push(cur);
  }
  return out.filter((s, i) => s !== "" || i === 0);
}

/* ------------------------------------------------------------------ */
/* The engine                                                          */
/* ------------------------------------------------------------------ */

export function PdfOfficeEngine({ target }: { target: OfficeTarget }) {
  const { t, locale } = useI18n();
  const accept = target === "fromdocx" ? ".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document" : "application/pdf,.pdf";
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [err, setErr] = useState("");
  const [text, setText] = useState("");
  const [out, setOut] = useState<{ blob: Blob; name: string } | null>(null);

  const pick = useCallback((fs: File[]) => {
    const f = fs[0];
    if (!f) return;
    setFile(f);
    setOut(null);
    setErr("");
    setText("");
  }, []);

  const reset = () => {
    setFile(null);
    setOut(null);
    setErr("");
    setText("");
    setProgress(0);
  };

  async function run() {
    if (!file) return;
    setBusy(true);
    setErr("");
    setOut(null);
    setProgress(0.03);
    try {
      if (target === "text") {
        const pages = await extractPdfLines(file, (d, n) => setProgress(d / n));
        const parts = pages.map((lines) => lines.map((l) => l.text).join("\n"));
        const full = parts.filter(Boolean).join("\n\n");
        if (!full.trim()) throw new Error("empty");
        setText(full);
        setOut({
          blob: new Blob([full], { type: "text/plain;charset=utf-8" }),
          name: `${baseName(file.name)}.txt`,
        });
      } else if (target === "docx") {
        const pages = await extractPdfLines(file, (d, n) => setProgress(d / n));
        const all = pages.flat();
        if (!all.length) throw new Error("empty");
        const sizes = [...all].map((l) => l.size).sort((a, b) => a - b);
        const median = sizes[Math.floor(sizes.length / 2)] || 10;
        const paras = linesToParagraphs(all);
        const typed = paras.map((p) => {
          const firstLine = all.find((l) => p.startsWith(l.text));
          const sz = firstLine?.size ?? median;
          const heading = sz > median * 1.55 ? 1 : sz > median * 1.3 ? 2 : firstLine?.bold && sz > median ? 3 : 0;
          return { text: p, heading: heading as 0 | 1 | 2 | 3 };
        });
        const zipMod = await import("jszip");
        const zip = new zipMod.default();
        zip.file("[Content_Types].xml", CT_TYPES);
        zip.file("_rels/.rels", RELS);
        zip.file("word/document.xml", buildDocumentXml(typed));
        zip.file("word/_rels/document.xml.rels", DOC_RELS);
        zip.file("word/styles.xml", STYLES);
        const blob = await zip.generateAsync({ type: "blob", mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
        setOut({ blob, name: `${baseName(file.name)}.docx` });
      } else if (target === "xlsx") {
        const pages = await extractPdfLines(file, (d, n) => setProgress(d / n));
        const rows: (string | number)[][] = [["Page", "Content"]];
        pages.forEach((lines, pi) => {
          if (pi > 0) rows.push(["", ""]);
          for (const l of lines) {
            const cells = lineToCells(l.text);
            rows.push([pi + 1, cells.length > 1 ? "" : (cells[0] ?? l.text), ...cells.slice(1)]);
          }
        });
        const XLSX = await import("xlsx");
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet(rows);
        ws["!cols"] = [{ wch: 6 }, { wch: 80 }];
        XLSX.utils.book_append_sheet(wb, ws, "PDF Text");
        const bytes = XLSX.write(wb, { bookType: "xlsx", type: "array" }) as ArrayBuffer;
        setOut({ blob: new Blob([bytes], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }), name: `${baseName(file.name)}.xlsx` });
      } else if (target === "pptx") {
        const pdf = await loadPdf(new Uint8Array(await file.arrayBuffer()));
        const PptxGenJS = (await import("pptxgenjs")).default;
        const pptx = new PptxGenJS();
        pptx.layout = "LAYOUT_16x9";
        const SW = 13.333;
        const SH = 7.5;
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const v1 = page.getViewport({ scale: 1 });
          const canvas = await renderPageToCanvas(page, Math.min(2, 1400 / v1.width));
          const imgW = SW;
          const imgH = (SW * canvas.height) / canvas.width;
          const slide = pptx.addSlide();
          if (imgH <= SH) {
            slide.addImage({ data: canvas.toDataURL("image/jpeg", 0.9), x: 0, y: (SH - imgH) / 2, w: imgW, h: imgH });
          } else {
            const h = SH;
            const w = (h * canvas.width) / canvas.height;
            slide.addImage({ data: canvas.toDataURL("image/jpeg", 0.9), x: (SW - w) / 2, y: 0, w, h });
          }
          page.cleanup();
          setProgress(i / pdf.numPages);
          if (i % 2 === 0) await new Promise((r) => setTimeout(r, 0));
        }
        pdf.destroy();
        const blob = (await pptx.write({ outputType: "blob" })) as Blob;
        setOut({ blob, name: `${baseName(file.name)}.pptx` });
      } else {
        // word → pdf
        const blocks = await readDocxParagraphs(file);
        if (!blocks.length) throw new Error("empty");
        const bytes = await typesetBlocksToPdf(blocks);
        setOut({ blob: toPdfBlob(bytes), name: `${baseName(file.name)}.pdf` });
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : "";
      if (msg === "empty") setErr(tr(UI.empty, locale));
      else if (msg === "nodocx") setErr(tr(SHARED.failed, locale));
      else setErr(tr(SHARED.failed, locale));
    } finally {
      setBusy(false);
    }
  }

  const btn = tr(UI[target], locale);
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;

  return (
    <ToolPanel>
      {!file ? (
        <div>
          <DropZone onFiles={pick} accept={accept} multiple={false}>
            <p className="text-[14px] text-[var(--color-sub)]">
              {target === "fromdocx" ? "DOCX — " + t.common.dropFile : "PDF — " + t.common.dropFile}
            </p>
          </DropZone>
          {target === "docx" && (
            <p className="mt-2 text-[12.5px] leading-5 text-[var(--color-sub)]">{tr(SHARED.textPdfNote, locale)}</p>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center gap-2.5 rounded-xl border hairline px-3.5 py-2.5 text-[14px]">
            <span className="min-w-0 flex-1 truncate">{file.name}</span>
            <span className="mono flex-none text-[12.5px] text-[var(--color-sub)]">{formatBytes(file.size)}</span>
            <button type="button" onClick={reset} aria-label={t.common.reset}
              className="h-7 w-7 flex-none rounded-full text-[14px] leading-none text-[var(--color-sub)] hover:bg-[var(--color-surface)]">×</button>
          </div>

          {busy && <Progress value={progress} />}
          <Err msg={err} />

          {text && (
            <div>
              <Label>{t.common.output} · {words} {tr(UI.words, locale)}</Label>
              <textarea className="field mono bg-[var(--color-surface)]" rows={10} readOnly value={text} aria-label={t.common.output} />
            </div>
          )}

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
            <Primary onClick={run} disabled={busy}>{btn}</Primary>
            {text && <CopyButton value={text} />}
            {!busy && <Ghost onClick={reset}>{t.common.reset}</Ghost>}
          </div>
        </div>
      )}
    </ToolPanel>
  );
}

/** document.xml for the generated .docx (heading styles applied). */
function buildDocumentXml(paragraphs: { text: string; heading: 0 | 1 | 2 | 3 }[]): string {
  const body =
    paragraphs.map((p) => docxParagraph(p.text, p.heading ? `Heading${p.heading}` : undefined)).join("") +
    `<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440"/></w:sectPr>`;
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>${body}</w:body></w:document>`;
}
