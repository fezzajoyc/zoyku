import { RmbUppercaseEngine } from "../_engines/rmb-uppercase-engine";
import { rmbUppercaseToolCopy } from "../_lib/rmb-uppercase-copy";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "rmb-uppercase", category: "utility", icon: "calculator",
  engine: { component: RmbUppercaseEngine },
  related: ["chinese-id-validator", "percentage-calculator", "vat-calculator"],
  copy: rmbUppercaseToolCopy(),
});
