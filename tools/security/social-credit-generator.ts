import { SocialCreditGeneratorEngine } from "../_engines/social-credit-generator-engine";
import { socialCreditGeneratorToolCopy } from "../_lib/social-credit-generator-copy";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "social-credit-generator",
  category: "security",
  icon: "shield",
  engine: { component: SocialCreditGeneratorEngine },
  related: ["social-credit-validator", "chinese-id-generator", "chinese-id-validator"],
  copy: socialCreditGeneratorToolCopy(),
});
