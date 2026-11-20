import type { Locale } from "@/lib/site";
import type { ToolCopy, ToolDef } from "@/tools/_lib/types";
import { OVERLAYS } from "@/tools/_i18n";
import { lookupCopy } from "@/lib/network-copy";
import { unlockCopy, wordPdfCopy, redactPdfCopy } from "@/tools/_lib/pdf-capability-copy";
import { imageCompressionCopy } from "@/tools/_lib/image-capability-copy";
import { jsonCapabilityCopy } from "@/tools/_lib/json-capability-copy";

/** Return authored tool copy. FAQs describe the actual tool, never a category quota. */
export function toolCopy(tool: ToolDef, locale: Locale): ToolCopy {
  const base = tool.copy[locale] ?? OVERLAYS[locale]?.[tool.slug] ?? tool.copy.en;
  if (tool.slug === "unlock-pdf") return unlockCopy(locale, base);
  if (tool.slug === "word-to-pdf") return wordPdfCopy(locale, base);
  if (tool.slug === "redact-pdf") return redactPdfCopy(locale, base);
  if (tool.slug === "image-compressor") return imageCompressionCopy(locale, base);
  if (tool.slug === "json-formatter") return jsonCapabilityCopy(locale, base, "formatter");
  if (tool.slug === "json-minifier") return jsonCapabilityCopy(locale, base, "minifier");
  if (tool.slug === "ip-lookup" || tool.slug === "whois-lookup") return lookupCopy(tool.slug, locale, base);
  return base;
}

export function hasNativeCopy(tool: ToolDef, locale: Locale): boolean {
  return Boolean(tool.copy[locale] ?? OVERLAYS[locale]?.[tool.slug]);
}
