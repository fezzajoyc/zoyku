import { RmbUppercaseToNumberEngine } from "../_engines/rmb-uppercase-to-number-engine";
import { rmbUppercaseToNumberCopy } from "../_lib/rmb-uppercase-to-number-copy";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "rmb-uppercase-to-number",
  category: "utility",
  icon: "calc",
  engine: { component: RmbUppercaseToNumberEngine },
  related: ["rmb-uppercase", "percentage-calculator", "vat-calculator"],
  copy: rmbUppercaseToNumberCopy(),
});
