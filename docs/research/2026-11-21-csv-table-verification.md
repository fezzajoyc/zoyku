# CSV table editor: scoped design and verification

Date: 2026-11-21, Asia/Shanghai. Scope: `csv-table-editor`, its pure transformer, engine, native 15-language copy, focused tests, and a reusable export of the existing CSV parser. Registry, MCP integration, full regression, build and browser acceptance are owned by the parent integration task.

## Evidence and design

Demand and page-structure evidence: [peer catalog batch 3](2026-11-21-peer-catalog-batch3.md), specifically Browserling's [swap columns](https://www.browserling.com/tools/csv-swap-columns) and [columns to rows](https://www.browserling.com/tools/csv-columns-to-rows) workflows. The parent independently exercised these pages with shared samples; its [runtime evidence](2026-11-21-csv-peer-runtime.json) records matching cell values for four valid samples and peer padding for two ragged samples. This tool deliberately rejects ragged rows, so a missing cell cannot be mistaken for an original empty cell.

Reuse the existing strict state-machine parser through `export { parseRows as parseCsvRows }`; existing callers and parser behavior are unchanged. Avoid a new parser or spreadsheet dependency. Expose `transformCsvTable(input, { operation, delimiter?, firstColumn?, secondColumn? })`, returning `{ out, error, rows, columns }`. Supported operations are `transpose` and `swap`; comma is the default delimiter, with semicolon and Tab also supported. Swap uses one-based integer positions, with equal selections allowed. Counts describe the output, including its ordinary first row.

Every parsed cell remains text. No trimming, header handling, type inference or BOM normalization is performed. Embedded delimiters, quotes, CR/LF, Unicode, spaces, leading zeros, `-0`, and large integers retain their cell values. Empty physical records are ignored, but quoted empty cells and space-only records are kept. Serialization uses the selected delimiter, LF record separators, and required CSV escaping; quote layout is allowed to normalize. A one-cell empty record serializes as `""`, so reparsing does not discard it.

Immutable budgets are 1,000,000 input UTF-16 units, 4,000,000 output units, 100,000 cells, 10,000 rows and 1,000 columns. Dimensions apply before and after the operation. Invalid input, quote syntax, ragged widths, invalid column selections, unsupported options and budget overruns return empty output and zero counts. Output serialization checks its budget incrementally before joining chunks. Under these input and cell caps, valid matrix rearrangement does not independently approach 4,000,000 units; the guard remains explicit.

The client engine uses shared theme classes, associated visible labels, LTR data fields inside RTL layouts, the existing copy button, clear/sample controls, a localized empty state, output dimensions, and linked errors. All custom controls, rules and boundary messages have native copy for all 15 locales. Page copy has three steps and two FAQs per locale. The sample follows the selected delimiter.

## Test-first evidence

- 21:35:53: `npx vitest run tests/csv-table.test.ts` failed with `expected undefined to be type of 'function'` before the transformer existed.
- 21:37:58: transformer plus existing CSV tests passed: 2 files, 151 tests.
- 21:39:00: `npx vitest run tests/csv-table-ui.test.tsx` failed with the same missing-function assertion before the engine existed.
- The first UI import-only verification after implementation hit Vitest's 5-second timeout while importing the shared UI/translation graph. The render fixture now isolates the provider, panel wrapper and copy-button shell, following existing CSV regression tests. Real transformation and serialization are exercised without mocks. This is render coverage, not browser interaction coverage.

## Final scoped checks

Executed after implementation:

```bash
npx tsc --noEmit --incremental false
npx eslint tools/_lib/csv-table.ts tools/_lib/csv-table-copy.ts tools/_engines/dev-engine-csv-table.tsx tools/developer/csv-table-editor.ts tests/csv-table.test.ts tests/csv-table-ui.test.tsx
npx vitest run tests/csv-table.test.ts tests/csv-table-ui.test.tsx tests/csv.test.ts tests/csv-regression.test.tsx
```

TypeScript exited 0. ESLint exited 0 after replacing a test variable named `module`, which violated the Next.js lint rule. Final focused tests at 21:51:39 passed: **4 files, 201 tests**. Coverage includes swap/transpose and inverse operations, raw cell strings for all delimiters, empty records, malformed quoting, ragged rows, invalid numeric selections, 10,001 repetitions of a CJK/emoji string, exact input and cell limits, both dimension limits, transposed limits, output shape, associated controls, Arabic LTR data, empty/error output, and native copy contracts for all locales.

No build, full test run, browser acceptance or commit was performed by this scoped implementation task. Parent integration owns those checks.
