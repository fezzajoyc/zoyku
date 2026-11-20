# Tool parity and China-specific tools — implementation plan

Goal: execute the user's requested capability comparison and missing-tool work with evidence, rather than increasing counts or asserting superiority.

Architecture: retain the registry-driven localized routes. Separate China-ID pure logic, shared UI and authored metadata; use the existing regex Worker path; add a small token-preserving JSON formatter. Shared accessibility repairs stay scoped to the affected native elements. Preserve unrelated edits and do not deploy or push.

- [x] Read the supplied reports as unverified reference material and inspect the current UI/source.
- [x] Save domestic and global capability matrices with official evidence, local pointers, status and implementation dependencies.
- [x] Reproduce six existing tools on actual inputs and independently verify representative outputs.
- [x] Add and run failing regressions for China-ID rules, regex matching, image capability copy, keyboard upload, scrollable code, reduced motion and shared accessibility.
- [x] Implement the two China-ID routes with full locale copy, input/result privacy, masked output and explicit standard/area-code boundaries.
- [x] Fix regex non-global/Unicode/zero-width/limit semantics and preserve the displayed input text.
- [x] Repair upload keyboard defaults, footer landmarks, focusable code/tables, FAQ reduced motion and calculator heading order; correct image promises in all locales.
- [x] Implement and test lossless JSON formatting/minification with explicit input/output/depth/value limits; synchronize all locale copy and UI limits.
- [x] Complete the peer/non-peer/UI synthesis and a maintained delivery ledger; distinguish baseline findings from verified repairs and remaining gaps.
- [x] Review independently, run full tests/TypeScript/lint/build, exercise production browser cases, accessibility and SEO samples, then record evidence.
- [x] Commit the coherent verified changes and fast-forward the clean original checkout; retain unfinished capability work in the ledger. Do not push or deploy.

Recurring work: an hourly heartbeat named “Zoyku 每小时质量与同行巡检” is active in the current conversation. It resumes pending work, checks evidence and records verified changes; it is not a guarantee of rankings, full competitor coverage or global accessibility conformance.

Final local integration evidence: `docs/research/2026-11-20-verification.md`. Unit 1666/1666, 64 files; TypeScript exit 0; lint 0 errors/55 unchanged warnings; build 9667 paths; static SEO 3240/3240; HTTP SEO 24/24. Production suites home26/theme9/tool12/regex4/China-ID44/JSON52 all pass. Accessibility incomplete and broader gaps remain explicitly open.
