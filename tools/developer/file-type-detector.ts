import { DevFileTypeEngine } from "../_engines/dev-engine-file-type";
import { FILE_SIGNATURE_COPY } from "../_lib/file-signature-copy";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "file-type-detector",
  category: "developer",
  icon: "file",
  engine: { component: DevFileTypeEngine },
  related: ["mime-types", "hash-generator", "base64-encoder", "base64-decoder"],
  copy: FILE_SIGNATURE_COPY,
});
