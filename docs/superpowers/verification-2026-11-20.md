# Zoyku design and quality verification — 2026-11-20

## Implemented scope

- Restored the compact supplied homepage: left-aligned reading/search hierarchy, bounded local SVG ribbon, four featured tools, seven categories, privacy note and footer. Full tool navigation stays in the directory.
- Added the authorized reversible A-to-B material transition: smoothstep over the first 400 CSS pixels, scene-scoped passive/rAF updates, bounded ambient layer and frosted search/cards. Reduced motion stays at static A; unsupported blur gets solid surfaces.
- Repaired shared search, favorites markup/contrast, mobile menu and keyboard focus behavior.
- Repaired monthly contribution timing across compounding frequencies, adult/low-calorie guards, imported TOTP defaults, mail DNS states, IP quota guidance and exchange-rate cache freshness/date validation.
- Replaced misleading PDF unlocking with protection inspection; blocked lossy unsupported DOCX text; made OCR loading retryable. Redaction removes marked source-page graphs and rejects unsupported unmarked resource graphs. All 15 locales disclose the restricted preservation boundary and intentionally retained unmarked/duplicated content.
- Added processing/source disclosures, localized trust pages, removed synthetic FAQ padding and invented sitemap dates, and corrected structured-data audit checks.
- Updated compatible production dependencies and patched the development test stack to Vitest 4.1.12 / Vite 7.3.8.

## Verified evidence

- Full regression: **55 files / 1,378 tests passed**, Vitest 4.1.12 (`/tmp/zoyku-quality-tests-final2.log`).
- TypeScript: `npx tsc --noEmit --incremental false` passed.
- ESLint: **0 errors, 55 warnings**. Warnings are existing React Compiler migration diagnostics; compiler optimization is not enabled.
- MCP bundle built successfully.
- Independent numeric/security, PDF/security, trust/SEO and UI source reviews completed. Reported material findings were repaired and re-reviewed.
- External PDF exploit fixtures verified that `/SeparationInfo` cannot retain a hidden marked page and that unused shared Form resources stop output safely.
- Real browser checks confirmed mobile navigation, search word-order tolerance, favorite persistence, palette scroll/focus restoration, honest encrypted-PDF status with no output, unsupported DOCX rejection, and successful Latin DOCX export. The downloaded PDF was independently parsed as one page containing `Résumé — café € 25`.
- Browser health checks suppressed child and sub-1,000 kcal target outputs with explanations. TOTP import reset previously selected SHA-512 / 8 digits / 60 seconds to the omitted-link defaults SHA-1 / 6 / 30.

## Dependency audit boundary

The fresh official-registry audit has **0 critical, 0 moderate, 1 high** finding. The remaining high is `image-size@1.2.1`, indirectly declared by `pptxgenjs`. The current browser PPTX bundle contains no inputs from that package; the application supplies canvas-generated JPEGs with explicit dimensions. This reachability check does not remove the upstream advisory. No incompatible forced override was applied.

## Product limits

- PDF decryption and owner-restriction removal are unavailable; the former unlock URL checks protection only.
- DOCX-to-PDF is supported text conversion, not full Word layout/font preservation. Unsupported scripts stop before output.
- Unmarked PDF pages are preserved only within the documented standard-font/resource subset. The export intentionally retains their content; users must mark each occurrence of sensitive content and review the entire result.
- Representative corrected tools were exercised. The test count is not a claim that every interactive path of all 205 tools has been manually checked.
- No public deployment, push, search-ranking gain, live Core Web Vitals result or Search Console outcome is claimed.
