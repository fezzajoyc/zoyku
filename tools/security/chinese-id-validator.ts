import { ChineseIdEngine } from "../_engines/chinese-id-engine";
import { chineseIdToolCopy } from "../_lib/chinese-id-copy";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "chinese-id-validator", category: "security", icon: "shield",
  engine: { component: ChineseIdEngine, props: { mode: "validator" } },
  related: ["chinese-id-generator", "email-validator", "password-strength"],
  copy: chineseIdToolCopy("validator"),
});
