import { categoryFaqPool } from "@/tools/_lib/category-faqs";

/**
 * 分类页长内容:每个分类 3-4 段正文(定位/隐私/工作流/与竞品差异),
 * 7 语 × 7 分类。分类页是 hub 页,承担 "pdf tools" 类大词——内容量对排名影响大。
 * 取词入口 categoryIntro(cat, locale),未覆盖语言回退英文。
 */

export const CATEGORY_INTROS: Record<string, { en: string[] } & Partial<Record<string, string[]>>> = {
  pdf: {
    en: [
      "PDF is the format work arrives in: contracts to sign, bank statements to file, scans to combine, forms to submit. The tools in this category cover the full lifecycle — merging scattered files into one document, splitting a 200-page manual into chapters, rotating sideways scans, deleting sensitive pages, flattening form fields before submission, and converting between PDF and the formats around it (Word, Excel, PowerPoint, JPG).",
      "Every tool here runs entirely in your browser. The file you drop is read by JavaScript on your own device with pdf-lib and pdf.js — it is never uploaded to a server, never queued for processing, never retained. That matters for the documents people are most careful with: IDs, contracts, medical and financial records. Close the tab and nothing remains anywhere.",
      "The workflow is deliberately minimal: drag, adjust, download. There are no accounts, no watermarks stamped onto your output, no 'free tier' limits that quietly require payment, and no email gate in front of the download button. Batch operations (splitting into many files, merging many sources) produce a ZIP when there is more than one result.",
      "Compared with the well-known PDF suites, the difference is structural rather than cosmetic: they process files on their servers because the business model needs the upload — this site processes them locally because the browser can. The output is the same standard PDF; the difference is that your document never crosses the network.",
    ],
  },
  image: {
    en: [
      "Image work is mostly repetitive and local: compress a photo until it fits a marketplace limit, resize a batch to uniform dimensions, crop screenshots, strip EXIF before sharing, convert between WebP, PNG and JPG for different platforms. This category covers those jobs with the same rule every time — the image stays on your device.",
      "Compression and conversion run through the browser's own Canvas and WebCodecs pipelines, so quality behavior matches what you see in native apps: real downsampling instead of quality degradation stacked through repeated server re-encodes. File size targets (like 'compress to under 500 KB') are supported with iterative quality search rather than a fixed guess.",
      "Privacy is not a bonus feature here — it is the mechanism. EXIF data (GPS coordinates, device serials, timestamps) never leaves the photo because the photo never leaves the browser. Removing metadata before posting is a two-click job instead of an act of trust in a remote service.",
      "The tools are built for repetition: batch inputs, consistent output naming, and an interface that keeps your settings between files instead of resetting after every download. For one-off edits, each tool still works in a single pass with no signup in the way.",
    ],
  },
  text: {
    en: [
      "Text tools earn their place by being instant: no submit button, no round trip, results updating as you type. Counting words and characters against an essay limit, cleaning paste artifacts out of a document, deduplicating a mailing list, sorting lines, comparing two versions of a paragraph — these are seconds-long tasks that shouldn't require opening an editor.",
      "Everything in this category processes text in memory as you type, which makes it safe for sensitive content: drafts, internal notes, customer messages, anything you wouldn't paste into a stranger's website. Nothing is transmitted, logged, or stored — reload the page and even the recent-tools memory is the only trace.",
      "The counting tools understand what word processors count: words are split the way writers expect, CJK text is counted per character rather than per space-separated chunk, and sentence and paragraph counts use the conventions of the language you're writing in. That makes the numbers trustworthy against Word, Google Docs, or manuscript submission limits.",
      "Transform tools (case conversion, slug generation, duplicate removal, diff) use shared, tested text-processing functions — the same implementations that power this site's AI-callable tools — so edge cases (Unicode whitespace, emoji clusters, mixed scripts) behave predictably instead of surprising you.",
    ],
  },
  developer: {
    en: [
      "Daily development is full of small conversions: format this JSON, decode that URL, hash these strings, generate test identifiers, check what a user-agent claims. Each is thirty seconds of work that shouldn't cost a context switch to a heavyweight IDE feature or a sketchy ad-filled converter site.",
      "This category is a set of small, sharp tools that each do one job correctly: JSON formatting with real error locations, Base64 and URL codecs that follow RFC 4648 and RFC 3986, hash generation through the browser's native WebCrypto, UUID generation per RFC 9562, and formatters that preserve your input rather than re-serializing it into something subtly different.",
      "Everything runs client-side, which is exactly what developers need for real work: pasted API responses, tokens, connection strings and internal payloads stay in the browser. Pasting production secrets into a server-side 'formatter' is a habit worth breaking — here there is no server to send them to.",
      "The tools double as a reference: where a format has rules (JSON number precision, Base64 padding, JWT structure), the output shows the relevant detail instead of hiding it. For AI agents, the same logic behind these tools is also exposed through this site's MCP server, so scripts and chat assistants can call the identical tested implementations.",
    ],
  },
  seo: {
    en: [
      "On-page SEO is mostly mechanical: write a title that fits the pixel width, generate schema markup that validates, produce hreflang tags that don't contradict your sitemap, preview how a snippet actually renders before publishing. This category automates the mechanical part so the time goes to content instead of tag syntax.",
      "Generators produce current best-practice output: JSON-LD schema (not the deprecated microdata formats), hreflang with x-default handled correctly, meta tag sets that match what Google actually displays, and robots/sitemap files with the syntax validators expect. Where search engines have documented limits (title pixel width, description truncation points), the tools enforce them live as you type.",
      "The SERP preview renders an approximation of the actual result layout — mobile and desktop — so you catch a truncated title or an ugly URL before it ships, not after it's indexed. Schema output can be pasted directly into a page and checked against Google's Rich Results requirements.",
      "These are the same checks used on this site's own 180+ tool pages, so the generators reflect practice rather than theory: they produce exactly the markup that ships here, kept current as search engine requirements change.",
    ],
  },
  security: {
    en: [
      "Security checks and generators are the tools people most need and most wrongly trust to random websites: password generators, hash verifiers, TOTP codes, key strength checks. The paradox of using an online generator is obvious — if the site knows your password, it isn't secret. Every tool here closes that hole by generating and computing locally.",
      "Generation uses the browser's cryptographic random source (crypto.getRandomValues), not Math.random. Passwords, tokens and keys produced here have never existed anywhere but your device's memory. Hash verification (MD5, SHA family) runs through WebCrypto against the same file you're checking, byte for byte, without uploading a download to compare it.",
      "The lookup tools (HTTP status codes, header references) are the documentation half of the category: fast answers to 'what does a 418 mean' during an incident, without ads or a blog post wrapped around the answer.",
      "For anything beyond browser-scale work — key ceremonies, compliance audits, password manager vaults — use dedicated tooling. For the everyday jobs: generating a strong passphrase, verifying a checksum, decoding a JWT to see what it actually claims, these tools do it honestly, which here means: locally.",
    ],
  },
  utility: {
    en: [
      "Unit conversion is the internet's oldest utility-tool genre, and the common failure modes are well known: rounded constants, missing unit pairs, and the silent US/imperial confusion (a 'gallon' that changes meaning at the border). This category is built against those failures: exact defined constants, six significant digits, and both systems labeled.",
      "The factors come from official definitions, not convenient approximations — the inch is exactly 2.54 cm, the pound exactly 0.45359237 kg, the US gallon exactly 3.785411784 liters. Conversions route through the SI base unit at full precision, so chained conversions (acres → hectares → m²) accumulate no rounding error.",
      "Beyond physical units, the everyday calculators here — date arithmetic, cooking conversions, shoe sizes, timezone-aware time tools — follow the same principle: use the standard definition, show the assumption, and never let a display rounding decision masquerade as a measurement fact.",
      "Everything computes as you type, works offline once loaded, and handles the full range without magic limits. For AI agents, the complete conversion engine is also exposed through this site's MCP server — the browser tool and the agent tool share one tested implementation.",
    ],
  },
};

export function categoryIntro(cat: string, locale: string): string[] {
  const entry = CATEGORY_INTROS[cat];
  if (!entry) return [];
  return entry[locale] ?? entry.en!;
}
