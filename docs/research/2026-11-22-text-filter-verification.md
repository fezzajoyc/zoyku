# Text line filter — scoped verification

Demand evidence: stored official LDDGO-01-026 (`https://www.lddgo.net/string/text-filter`) declares text, line-number and regex row selection plus delimiter/regex column extraction. LDDGO-01-039 (`https://www.lddgo.net/string/text-length-filter`) declares per-line length filtering. The saved catalog snapshot supplies the evidence; no new network request, Browserling operation or peer same-input comparison was performed.

Implemented `text-line-filter` as four independent client modes: literal include/exclude with optional locale-independent lowercase matching, one-based inclusive existing line range, Unicode codepoint length bounds, and literal delimiter column extraction. Regex is outside this batch, so 01-026 remains **partial**. The core length task for 01-039 is implemented with explicit codepoint semantics; final delivery status depends on root browser acceptance and does not imply the peer uses the same length definition.

`filterTextLines(input: unknown, options: TextLineFilterOptions)` returns `{ out, error, inputLines, outputLines }`. Options are a discriminated union: contains/query/action/caseSensitive; range/from/to; length/min/max; column/delimiter/column/missingColumn. Missing-column policies are reject or output empty text, selected explicitly. No CSV quote, regex, escape or template interpretation. Whitespace and original Unicode are preserved; CRLF and lone CR normalize to LF. Empty input is zero lines. A trailing newline creates a final empty line. Combining marks are separate codepoints, not one grapheme. Selecting a single empty line returns `out: ""`, `outputLines: 1`, distinct from no match (`outputLines: 0`); UI explains the empty result and omits the copy action when there are no characters.

Limits: raw input 100,000 UTF-16 units; 10,000 logical lines; output 200,000 units; nonempty query/delimiter each at most 128 units. Length bounds are integers 0–100,000, minimum≤maximum; columns are integers 1–10,000. Range endpoints must exist for nonempty input. Invalid input returns no partial output. The current selection/extraction modes cannot make output longer than normalized input, so the 200,000 output guard is defensive; no artificial test changes the constants to force an unreachable path.

Files: `tools/_lib/text-line-filter.ts`, `tools/_lib/text-line-filter-copy.ts`, `tools/_engines/text-engine-line-filter.tsx`, `tools/text/text-line-filter.ts`, `tests/text-line-filter.test.ts`, `tests/text-line-filter-copy.test.ts`. Page copy, actual control labels, rules, errors, 3 steps and 2 FAQs are authored in all 15 supported locales. The UI uses the shared CopyButton, LTR text/numeric controls within RTL pages, live results/counts, sample and clear actions.

Observed checks:

- TDD RED: a no-op exported core produced 34 assertion failures against independently written expected outputs and rejection fixtures.
- GREEN: `npx vitest run tests/text-line-filter.test.ts tests/text-line-filter-copy.test.ts` — **2 files, 36 tests passed**.
- Scoped ESLint over the six owned source/test files — passed without diagnostics.
- Scoped `npx tsc -p /tmp/tsconfig-text-line-filter.json --noEmit --pretty false` — passed. Temporary config extends project settings, includes only the six owned files plus Next declarations, and disables incremental state.

Tests cover literal metacharacters, include/exclude, case-sensitive and lowercase behavior, Turkish I distinction, emoji/CJK/Arabic/combining marks, inclusive range and final empty lines, mixed newlines, no match versus empty result, multi-character delimiters, deliberate lack of CSV quoting, both missing-column policies, invalid configuration, exact 100,000-unit and 10,000-line boundaries, 128-unit query/delimiter and column 10,000.

Root owns category registration, MCP, shared counts/docs, browser interaction, accessibility/layout checks and full regression/build. This scoped package does not claim those checks, peer parity, or deployment. No shared source file, historical catalog or commit was changed here.
