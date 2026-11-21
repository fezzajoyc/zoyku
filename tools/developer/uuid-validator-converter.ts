import { DevUuidInspectorEngine } from "../_engines/dev-engine-uuid-inspector";
import { UUID_INSPECTOR_COPY } from "../_lib/uuid-inspector-copy";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "uuid-validator-converter",
  category: "developer",
  icon: "key",
  engine: { component: DevUuidInspectorEngine },
  related: ["uuid-generator", "ulid-generator", "base64-encoder", "base64-decoder"],
  copy: UUID_INSPECTOR_COPY,
});
