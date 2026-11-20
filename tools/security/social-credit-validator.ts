import { SocialCreditEngine } from "../_engines/social-credit-engine";
import { socialCreditToolCopy } from "../_lib/social-credit-copy";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "social-credit-validator", category: "security", icon: "shield",
  engine: { component: SocialCreditEngine },
  related: ["chinese-id-validator", "email-validator", "json-formatter"],
  copy: socialCreditToolCopy(),
});
