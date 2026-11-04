import type { CategoryId } from "@/lib/site";
import type { ToolDef } from "./_lib/types";
import { TEXT_TOOLS } from "./text";
import { UNIT_TOOLS } from "./unit";
import { PDF_TOOLS } from "./pdf";
import { IMAGE_TOOLS } from "./image";
import { DEV_TOOLS } from "./developer";
import { SEO_TOOLS } from "./seo";
import { SECURITY_TOOLS } from "./security";
import { CALC_TOOLS } from "./calculators";
import { UTILITY_TOOLS } from "./utility";
import { MEDIA_TOOLS } from "./media";

export const ALL_TOOLS: ToolDef[] = [
  ...TEXT_TOOLS,
  ...UNIT_TOOLS,
  ...PDF_TOOLS,
  ...IMAGE_TOOLS,
  ...DEV_TOOLS,
  ...SEO_TOOLS,
  ...SECURITY_TOOLS,
  ...CALC_TOOLS,
  ...UTILITY_TOOLS,
  ...MEDIA_TOOLS,
];

export const TOOL_BY_SLUG = new Map<string, ToolDef>(
  ALL_TOOLS.map((t) => [t.slug, t]),
);

export function toolsByCategory(cat: CategoryId): ToolDef[] {
  return ALL_TOOLS.filter((t) => t.category === cat);
}

export function relatedTools(t: ToolDef): ToolDef[] {
  return t.related
    .map((s) => TOOL_BY_SLUG.get(s))
    .filter((x): x is ToolDef => Boolean(x) && x!.slug !== t.slug);
}
