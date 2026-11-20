# Zoyku design restoration and quality repair

Approved direction: the user asked to restore the supplied design and implement the actionable findings from the preceding audit, then test and review the result. Use zoyku_2's compact information architecture with the supplied ribbon confined to the hero. Preserve actual tools, locale URLs, dark mode, search, recent tools and local favorites. Do not deploy or use the supplied API credential.

## Scope and acceptance

- Home: left-aligned stable brand heading, clear task description, search and recent/favorites near the top, four editorial tool cards, seven compact category cards, short privacy banner, existing native footer. The complete directory remains at /tools. Bound decorative SVG height; no giant duplicated directory, debug controls or placeholder links. Provide functional mobile navigation, readable contrast, shared word-order-independent search, clear empty states and correct focus behavior.
- Correctness: prevent fake PDF unlocking success; preserve untouched redaction pages; prevent silent non-Latin document data loss; retry failed OCR loading; reset TOTP imported defaults; parse null MX and DNS failures honestly; keep monthly investment cash flows consistent across compounding frequencies; block inappropriate child/very-low-calorie target output. Add regression cases before fixes.
- Trust: remove mandatory FAQ padding; retain tool-specific truthful FAQs. Derive local/network-assisted disclosures centrally. Update all locale privacy and About content without unverified test-count claims. Explain data suppliers, timestamps, scope and limitations where applicable.
- SEO and maintenance: keep current localized URLs, canonical/hreflang, native structured data and directory reachability; remove fabricated lastmod; stop requiring obsolete FAQ rich-result markup; update vulnerable dependencies where a compatible verified path exists. Do not claim actual rankings or traffic outcomes.
- Validate: fresh unit regression suite, TypeScript, lint of touched files/full lint assessment, production build, local HTTP/SEO checks and browser QA at desktop and 390px, English/Chinese plus an extended and RTL locale, light/dark, actual search/navigation and representative corrected tools. Independent review must resolve material findings. Keep the original checkout's unrelated content intact.

## Authorized design update: scroll-linked A to B

The user supplied a side-by-side reference and explicitly requested a continuous transition from A (minimal feathered ribbon) to B (translucent frosted fluid surfaces).

- At scroll zero retain the clean reading/search hierarchy and local feathered ribbon. Across approximately the first 400 pixels, map clamped scroll progress through a smooth ease curve to ambient color expansion, subtle parallax and card material. Scrolling back restores A.
- In B, the home search, editorial cards and category tiles use readable translucent surfaces, at most 16px backdrop blur, a fine highlight border and modest depth. Keep layouts and document height stable; decoration must remain bounded and ignore pointer input.
- Use native CSS and a small passive/requestAnimationFrame lifecycle if needed for broad support. Do not add animation libraries, intercept wheel/touch scrolling or animate React state on every scroll event. Scope all progress and styling to the homepage and clean up on navigation.
- Honor reduced-motion with a stable readable A state and no parallax. Preserve mobile, dark, RTL, keyboard navigation, search and favorites. Unsupported backdrop-filter must retain solid readable surfaces.
- Verify top/intermediate/activated/reversed states in a real browser; inspect actual computed styles and screenshots, no overflow or layout shift. Do not promise a measured frame rate without performance evidence.

## PDF redaction preservation boundary

Marked pages are rasterized at 150 DPI with marked pixels replaced before embedding. Unmarked pages retain selectable text and their geometry only within a conservative supported subset: simple content using standard PDF Type1 fonts with predefined encodings. The exporter rebuilds resource dictionaries from verified primitive font entries and rebuilds content streams from decoded bytes; it never copies an original resource graph or arbitrary stream dictionary.

Unmarked pages with external image/Form resources (XObjects), embedded/custom/Type3 fonts, custom encodings or ToUnicode/font-descriptor graphs, transparency groups, nonempty graphics states, color spaces, patterns, shadings, properties, or other complex resources must stop export without producing a download. This restriction applies even when a resource appears unused: shared unused Forms can retain the original marked content. Marked pages may still contain complex resources because only their rasterized replacement enters the output.

The limitation must be visible before file selection and in the unsupported-file error in all 15 locales. Metadata, annotations, arbitrary page entries, and parent/page links are not retained. Unmarked page content bytes, including inline content and duplicated content, are intentionally retained. Mark every occurrence of a secret wherever it appears. Review the exported file before sharing; this is regional redaction, not a general-purpose PDF sanitizer. Regression tests must cover shared unused Forms, stream-dictionary references, font/encoding graphs, and each rejected complex resource family, alongside preservation of simple text, page order, inherited boxes, and rotation.
