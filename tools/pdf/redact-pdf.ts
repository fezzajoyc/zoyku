import { PdfRedactEngine } from "../_engines/pdf-engine-redact";
import { redactPdfCopy } from "../_lib/pdf-capability-copy";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "redact-pdf",
  category: "pdf",
  icon: "shield",
  engine: { component: PdfRedactEngine },
  related: ["unlock-pdf", "sign-pdf", "exif-remover", "compress-pdf", "merge-pdf", "split-pdf", "page-numbers-pdf", "watermark-pdf"],
  copy: {
    en: redactPdfCopy("en"),
    zh: redactPdfCopy("zh"),
    ja: redactPdfCopy("ja"),
    es: redactPdfCopy("es"),
    pt: redactPdfCopy("pt"),
  },
});
