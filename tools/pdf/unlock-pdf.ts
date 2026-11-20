import { PdfProtectEngine } from "../_engines/pdf-engine-protect";
import { UNLOCK_COPY } from "../_lib/pdf-capability-copy";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "unlock-pdf",
  category: "pdf",
  icon: "lock",
  engine: { component: PdfProtectEngine, props: { op: "unlock" } },
  related: ["flatten-pdf", "merge-pdf", "split-pdf", "rotate-pdf", "compress-pdf", "pdf-to-text", "delete-pdf-pages", "pdf-to-word"],
  copy: UNLOCK_COPY,
});
