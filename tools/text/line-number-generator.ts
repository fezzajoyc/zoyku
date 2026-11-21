import { LineNumbersEngine } from "../_engines/text-engine-line-numbers";
import { lineNumbersToolCopy } from "../_lib/line-numbers-copy";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "line-number-generator", category: "text", icon: "hash",
  engine: { component: LineNumbersEngine },
  related: ["text-sorter", "remove-duplicate-lines", "text-cleaner", "find-and-replace"],
  copy: lineNumbersToolCopy(),
});
