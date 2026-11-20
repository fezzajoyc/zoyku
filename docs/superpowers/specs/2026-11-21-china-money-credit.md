# China-specific rules: credit code and RMB amount

The user has authorized ongoing competitor-gap work, local implementation, testing and polishing. This batch follows the existing registry and visual conventions; no redesign, deployment or push is requested.

## Selected design

Use two focused local tool pages rather than a combined form. A generic text transform would conceal the distinct standards, validation and error recovery; a server lookup would add privacy and availability dependencies without proving registration authenticity. Each page has its own testable pure module, small client engine and authored 15-language copy.

- `social-credit-validator`: 18-character unified social credit code format/check-digit checks and visible 1/1/6/9/1 segment parsing. Read the actual GB 32100-2015 standard and amendment evidence first. State exactly what is checked; do not claim to verify issuing-department/category tables, current/historical administrative codes, GB11714 internal organization-code semantics, registration, existence or status. Up to100 rows; explicit resource limits; preserve row numbers. Default masked results, deliberate local reveal, copy/TXT of currently displayed values. No persistence, input-bearing requests, logs or URL state.
- `rmb-uppercase`: only ship after readable official banking/settlement-writing rules are obtained. Convert nonnegative decimal amounts up to999999999999.99 using decimal strings or integer cents, never floating point; reject more than two fractional digits instead of silently rounding. State supported separators/normalization. Return normalized numeric and Chinese financial uppercase forms; explain 元/角/分/整 and zero handling. This is formatting, not bank acceptance or financial advice. Reverse Chinese-number parsing, tax calculations and policy datasets are out of scope.

If an official source is unavailable or access is disallowed, retain the capability as pending and complete only the independently evidenced tool. Do not substitute a competitor's implementation for a standard or invent a successful source read.

## Quality and integration

Keep empty/error/success/clear states real and accessible; labels, descriptions, errors, keyboard focus, status announcements, mobile width and light/dark contrast follow existing controls/tokens. Samples are synthetic or identified standard examples. Input changes clear stale results. The same rules and copy appear in initial HTML, metadata and Markdown routes.

Before implementation, add failing tests for ordinary, empty, invalid, oversized, boundary, full-width/Unicode and roundtrip cases where applicable. Independent checks use the actual standard example/algorithm or official amount examples. Browser acceptance exercises real output, clipboard/TXT if offered, offline behavior, locale routes, keyboard/error recovery and axe; incomplete findings remain separate from passes. A full test/type/lint/build and production SEO/browser pass precedes local integration. Keep unrelated edits, and retain the current preview/worktree for hourly continuation.
