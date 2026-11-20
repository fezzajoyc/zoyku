import { ChineseIdEngine } from "../_engines/chinese-id-engine";
import { chineseIdToolCopy } from "../_lib/chinese-id-copy";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "chinese-id-generator", category: "security", icon: "shield",
  engine: { component: ChineseIdEngine, props: { mode: "generator" } },
  related: ["chinese-id-validator", "random-number", "password-generator"],
  copy: chineseIdToolCopy("generator"),
});
