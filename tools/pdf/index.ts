import type { ToolDef } from "../_lib/types";
import pageNumbersPdf from "./page-numbers-pdf";
import mergePdf from "./merge-pdf";
import splitPdf from "./split-pdf";
import rotatePdf from "./rotate-pdf";
import deletePdfPages from "./delete-pdf-pages";
import rearrangePdfPages from "./rearrange-pdf-pages";
import watermarkPdf from "./watermark-pdf";
import signPdf from "./sign-pdf";
import compressPdf from "./compress-pdf";
import jpgToPdf from "./jpg-to-pdf";
import pngToPdf from "./png-to-pdf";
import imageToPdf from "./image-to-pdf";
import pdfToJpg from "./pdf-to-jpg";
import pdfToPng from "./pdf-to-png";
import pdfToWord from "./pdf-to-word";
import pdfToExcel from "./pdf-to-excel";
import pdfToPpt from "./pdf-to-ppt";
import wordToPdf from "./word-to-pdf";
import pdfToText from "./pdf-to-text";
import ocrPdf from "./ocr-pdf";

export const PDF_TOOLS: ToolDef[] = [
  mergePdf,
  splitPdf,
  rotatePdf,
  deletePdfPages,
  rearrangePdfPages,
  watermarkPdf,
  signPdf,
  compressPdf,
  jpgToPdf,
  pngToPdf,
  imageToPdf,
  pdfToJpg,
  pdfToPng,
  pdfToWord,
  pdfToExcel,
  pdfToPpt,
  wordToPdf,
  pdfToText,
  ocrPdf,
  pageNumbersPdf,
];
