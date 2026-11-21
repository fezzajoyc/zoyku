import { DevByteEncodingEngine } from "../_engines/dev-engine-byte-encoding";
import { BYTE_ENCODING_COPY } from "../_lib/byte-encoding-copy";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "byte-encoding-converter",
  category: "developer",
  icon: "swap",
  engine: { component: DevByteEncodingEngine },
  related: ["base64-encoder", "base64-decoder", "binary-converter", "uuid-validator-converter", "hash-generator"],
  copy: BYTE_ENCODING_COPY,
});
