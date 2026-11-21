# Exact text sequences and Unicode codepoint frequency — scoped verification

## Evidence and honest scope

The stored combined catalog `2026-11-21-lddgo-full-comparison.json` identifies LDDGO-01-014 (`https://www.lddgo.net/string/seqno`, workflow `sequence-template`) as missing arithmetic/expression text sequences. This package adds deterministic finite-decimal arithmetic sequences and literal affixes/separators, with no expressions, random generation or arbitrary output radix. The peer record remains **partial** after delivery; no source or runtime parity is claimed.

LDDGO-01-062 (`https://www.lddgo.net/string/frequency-statistics`, workflow `character-word-frequency`) was partial: the existing keyword-density tool has word tokens but lacks a general Latin/codepoint frequency table. This package adds an explicit Unicode codepoint table. It does not add word segmentation, separate letter/word/digit/Chinese sections, or the peer's different denominators. The peer record therefore remains **partial**. No additional peer requests or same-input comparisons were made by this package; the root obtained further peer detail separately.

## Sequence contract and design

`generateTextSequence(options)` accepts `{ start: string, step: string, count: number, integerWidth?: number, prefix?: string, suffix?: string, separator?: string }`, and returns `{ out, error, count, first, last }`. Default integer width is 1, affixes empty and separator an actual LF. `first` and `last` contain the formatted numeric terms, without affixes.

The parser duplicates `parseLocaleNumber` comma/dot normalization as string operations, then converts the finite decimal digits to a BigInt coefficient. Start and step are scaled to one shared decimal power; term `i` is `start + BigInt(i) * step`. No numeric input is converted through Number, so values above the safe integer range and 18-place steps remain exact. Scientific notation and expressions are rejected. Site ambiguities are explicit: `1,234 → 1234`, `0,125 → 125`, while dot decimals such as `0.125` are unambiguous. Output removes trailing fractional zeros and uses an ASCII dot; integer zeros are added after the sign, without truncating wider terms. Negative, zero and descending steps are supported.

Resource limits: start and step each 96 raw UTF-16 units, at most 60 significant digit positions and 18 decimal places; count integer 1–10,000; integer width 1–60; each affix and separator at most 128 UTF-16 units; output at most 500,000 units. Output size is accumulated before a result is exposed; errors return no partial output. Literal template syntax and backslash sequences stay literal. Count/width UI inputs use `parseLocaleNumber`; start/step use its separator semantics without losing precision.

The sequence UI invalidates old results on every parameter change, generates on explicit submission, has sample/clear actions and shared CopyButton, and wraps long first/last values for mobile layout. All textual/numeric fields use LTR direction within RTL pages.

## Frequency contract and design

`countCharacterFrequency(input: unknown, options?)` accepts `{ ignoreWhitespace?: boolean, caseMode?: 'preserve' | 'lower', sort?: 'count-desc' | 'count-asc' | 'codepoint' | 'first', limit?: number }`. Defaults preserve case, retain whitespace, sort by decreasing count, and show 100 rows. It returns `{ rows, error, rawCodePoints, total, distinct, shown, truncated }`. **rows always contains all sorted rows**; `shown` controls only preview size. `exportCharacterFrequency(result, 'csv' | 'txt')` exports all rows.

Input is limited to 100,000 raw UTF-16 units, retained distinct codepoints to 4,096, preview to 1–500 rows, and exports to 500,000 units. An excessive distinct set returns no partial table. Empty input (`rawCodePoints=0`) differs from all-whitespace text excluded by the option (`rawCodePoints>0`, `total=0`). Counts iterate codepoints, so combining marks and ZWJ sequences are separate entries and no Unicode normalization occurs.

Lowercase uses locale-independent `String.toLowerCase()` on the **whole input before iteration**. Expansion is retained: `İ → i + U+0307`; contextual Greek final sigma follows whole-string lowercasing. Raw codepoint count is before conversion; denominator `total` is all retained transformed codepoints after optional JavaScript `\s` whitespace removal. Thus expansion can increase the denominator. Every share is count/total, including when some rows are hidden. Equal frequencies retain first appearance; numeric codepoint sort is deterministic.

CSV/TXT contain `character_json`, codepoint, count and share; JSON character notation distinguishes spaces, controls and quotes without inserting raw newlines into cells. CSV fields use ordinary quote escaping. Share export is rounded to 12 significant digits; displayed percentage uses at most six fractional decimal places. Preview limits never alter counts, denominator or export. Downloads use local Blob URLs, revoked after 5 seconds or on unmount, with visible start/failure feedback. Shared CopyButton copies the full CSV table and handles pending clipboard state. Editing input or options clears download feedback and recalculates synchronously.

## Files and observed verification

Owned production files:

- `tools/_lib/string-sequence.ts`, `tools/_lib/string-sequence-copy.ts`, `tools/_engines/text-engine-sequence.tsx`, `tools/text/text-sequence-generator.ts`.
- `tools/_lib/character-frequency.ts`, `tools/_lib/character-frequency-copy.ts`, `tools/_engines/text-engine-character-frequency.tsx`, `tools/text/character-frequency-counter.ts`.

Each ToolDef directly contains authored copy for all 15 supported locales, so old language overlays cannot replace native copy. Actual controls, empty/error feedback and rules are localized; each page has three steps and two FAQs. There are no new external runtime dependencies.

Observed commands:

- TDD RED: no-op exported cores produced **19 failing independent fixtures** before implementation.
- `npx vitest run tests/string-sequence.test.ts tests/character-frequency.test.ts tests/sequence-frequency-copy.test.ts tests/sequence-frequency-ui.test.tsx` — **4 files, 36 tests passed**.
- Scoped `npx tsc -p /tmp/tsconfig-sequence-frequency.json --noEmit --pretty false` — passed. Temporary config extends project settings, includes only owned source/tests plus Next declarations, and disables incremental state.
- ESLint on the eight owned production files and four test files — passed without diagnostics.

Tests lock exact 0.1+0.2 stepping, high precision beyond Number.MAX_SAFE_INTEGER, negative/zero/descending steps, sign-aware padding, site comma ambiguities, literal affixes, count/digit/output limits, emoji/CJK/combining/ZWJ counts, İ expansion and Greek sigma, stable sorts, preview/export independence, quote/control export fixtures, empty versus excluded input, raw input boundaries and the 4,096-distinct cap. Native SSR verifies actual labels/rules/limits and honest initial empty states in all 15 languages.

## Root browser suggestions and remaining integration

Sequence selectors: `[data-text-sequence-tool]`, `[data-sequence-field="start"]` (likewise step/count/width/prefix/suffix/separator), `[data-sequence-output]`. Sample produces `ID-000.1` through `ID-000.9` in five LF-separated terms. Set start `9007199254740993.000000000000000001`, step `0.000000000000000001`, count 3 for a precision check; changing any field must clear output. Count 10001, exponent input and a 129-unit affix must show honest error/no old result. Test the longest first/last values at mobile width.

Frequency selectors: `[data-character-frequency-tool]`, `[data-frequency-input]`, `[data-frequency-case]`, `[data-frequency-sort]`, `[data-frequency-limit]`, `[data-frequency-ignore]`, `[data-frequency-table]`, `[data-frequency-download="csv"]` or `txt`. `İIı` with lower mode should show raw=3, retained=4, with i=2, combining dot=1 and dotless i=1. `abc` with limit 1 should show one preview row, denominator 3 and all three rows in export. An empty input and all-whitespace ignored input have different guidance. Read back actual CSV/TXT downloads including quote and newline characters; verify light/dark/RTL and copy failure/recovery through the shared control.

Root owns shared registration/MCP/counts/catalog updates, browser acceptance and whole-project regression/build. This package did not edit shared index files, MCP, ledger, catalog or commit changes; it did not run a full build or claim browser/peer parity. Text-package code is frozen after the above checks pending root integration feedback.
