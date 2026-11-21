import { FilePartsEngine } from "../_engines/util-engine-file-parts";
import { FILE_PARTS_COPY } from "../_lib/file-parts-copy";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "file-splitter-merger",
  category: "utility",
  icon: "file",
  engine: { component: FilePartsEngine },
  related: ["file-type-detector", "hash-generator", "merge-pdf", "split-pdf"],
  copy: FILE_PARTS_COPY,
});
