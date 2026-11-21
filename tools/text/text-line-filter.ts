import { TextLineFilterEngine } from "../_engines/text-engine-line-filter";
import { textLineFilterToolCopy } from "../_lib/text-line-filter-copy";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "text-line-filter", category: "text", icon: "text",
  engine: { component: TextLineFilterEngine },
  related: ["line-number-generator", "text-sorter", "remove-duplicate-lines", "find-and-replace"],
  copy: textLineFilterToolCopy(),
});
