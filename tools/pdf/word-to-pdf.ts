import { PdfOfficeEngine } from "../_engines/pdf-engine-office";
import { wordPdfCopy } from "../_lib/pdf-capability-copy";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "word-to-pdf",
  category: "pdf",
  icon: "file",
  engine: { component: PdfOfficeEngine, props: { target: "fromdocx" } },
  related: ["pdf-to-word", "merge-pdf", "watermark-pdf", "compress-pdf", "sign-pdf", "split-pdf", "delete-pdf-pages", "pdf-to-ppt", "ocr-pdf", "rotate-pdf"],
  copy: {
    en: wordPdfCopy("en"),
    zh: wordPdfCopy("zh"),
    ja: wordPdfCopy("ja"),
    es: wordPdfCopy("es"),
    pt: wordPdfCopy("pt"),
  },
});
