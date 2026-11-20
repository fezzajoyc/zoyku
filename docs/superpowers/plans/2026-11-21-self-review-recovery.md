# Self-review: recoverability and data preservation

Date: 2026-11-21 (Asia/Shanghai). Baseline: `138735e`, 209 registered tools.

User scope: continue self-review, improve confirmed defects, then inspect and test the result. This batch adds no new tools and does not claim general competitor superiority, complete accessibility compliance, or production deployment.

## Confirmed defects and acceptance

1. Shared CopyButton: rejected Clipboard API + failed/throwing fallback must not report success. Old operations and timers must not overwrite a changed source, newer click, or unmounted component. Preserve the original single-button DOM and all custom classes.
2. Chinese ID pages: pending copy must not restore stale notices after edit, clear, rerun, reveal/hide, a newer copy, or download. Download failures must expose recovery and release object URLs.
3. JWT decoder: non-object JSON and out-of-range NumericDate must not crash the route. Preserve input and exact JSON number lexemes for inspection/copy; reject malformed UTF-8 and duplicate top-level keys. State that decoding does not verify trust. NumericDate comparison uses `now < exp`, including fractional seconds, captured when the input changes.
4. CSV pair: quote using the selected separator; do not silently round large numbers, turn overflow into null, or overwrite duplicate keys. Reject malformed records and output beyond explicit limits before constructing the entire oversized result. Document type inference and non-reversible CSV semantics.
5. URL parser: recognize bare dotted hosts/localhost/IP addresses with ports while retaining explicit/custom schemes under a documented conservative policy. Preserve internal/trailing empty path segments and repeated query parameters.
6. Icon registry: every registered key must exist; unknown and inherited object keys must safely use the generic fallback.

## Execution and verification

- Reproduce each defect against the baseline or failing permanent regression test before the product change.
- Give independent agents separate files; root owns JWT, shared capability-copy integration, and full verification. Cross-review focuses on the confirmed scope.
- Run focused tests, TypeScript, lint, actual browser interaction, and affected-page screenshots.
- After all files freeze: full test suite, TypeScript, lint comparison, production build, production browser suites, static SEO audit, and bounded HTTP audit. Preserve failures/incomplete accessibility checks in the report.
- Write a final evidence report and update the delivery ledger. Commit the coherent local batch; fast-forward the original checkout only if still clean and compatible. Do not push or deploy.

Detailed outcomes belong in `docs/research/2026-11-21-self-review-recovery-verification.md`; pending checks must not be recorded as passing.
