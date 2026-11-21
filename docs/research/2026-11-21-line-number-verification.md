# Line number generator — scoped verification

Implemented from the already stored official LDDGO-01-025 category card: add customizable, aligned line numbers at the beginning or end of each line. Source records are in `2026-11-21-lddgo-catalog-matrix.json` and the confirmed-missing row in `2026-11-21-lddgo-semantic-batch1.json`. No additional network request or competitor operation was performed. This delivers our declared scope, not a same-input parity claim.

## Files and contract

- `tools/_lib/line-numbers.ts`: exported `addLineNumbers(input, options)` returns `{ out, error, lineCount }`; `LINE_NUMBERS_LIMITS` declares all limits.
- `tools/_lib/line-numbers-copy.ts`: native page copy, actual control labels and error messages for all 15 supported languages, including 3 steps and 2 FAQs per locale.
- `tools/_engines/text-engine-line-numbers.tsx`: local live preview, labelled position/start/step/padding/separator controls, sample, clear, empty/error feedback and copy only when output exists. Numeric/text control contents use LTR direction within RTL pages.
- `tools/text/line-number-generator.ts`: definition using the existing `hash` icon and related text tools. Root owns registration and MCP integration.
- `tests/line-numbers.test.ts`, `tests/line-numbers-copy.test.ts`: 36 focused tests.

Prefix or suffix numbering defaults to start 1, step 1, no padding, and literal separator `. `. Start accepts whole numbers 0–1,000,000,000 and step 1–1,000,000. Padding is a minimum width of 0–12, filled with spaces, or automatic width based on the final number. A wider number is never shortened. The separator is literal text of at most 64 UTF-16 units; escape sequences, templates and regular expressions are not interpreted.

Input is limited to 100,000 UTF-16 units before newline normalization, 10,000 lines and 300,000 output units. Output length is checked before construction and errors return no partial text. The final number is guarded by `Number.isSafeInteger`. CRLF and lone CR normalize to LF. Other text, whitespace, Unicode and blank lines are preserved. Empty input returns empty output and zero lines; `a\n` has two lines, including the final empty line.

## Observed checks

- RED: tests first failed because the new module was absent; an exported no-op scaffold then produced **34 assertion failures**, confirming the core fixtures detect missing behavior.
- GREEN: `npx vitest run tests/line-numbers.test.ts tests/line-numbers-copy.test.ts` — **2 files, 36 tests passed**.
- `npx eslint tools/_lib/line-numbers.ts tools/_lib/line-numbers-copy.ts tools/_engines/text-engine-line-numbers.tsx tools/text/line-number-generator.ts tests/line-numbers.test.ts tests/line-numbers-copy.test.ts` — passed, no diagnostics.
- Scoped TypeScript: temporary `/tmp/tsconfig-line-numbers.json` extends the project settings, includes the six owned code/test files, disables incremental state and sets the project base directory; `npx tsc -p /tmp/tsconfig-line-numbers.json --noEmit --pretty false` — passed.
- An additional whole-project `tsc --noEmit --incremental false` reported only the concurrent `tools/_lib/yaml-converter.ts:75` `Object.values` overload error. No line-number diagnostics were present. That file was left to its owner; this is not a whole-project success claim.

Fixtures cover independent expected prefix/suffix outputs, start zero and non-unit step, leading/interior/final blank lines, empty input, mixed CRLF/CR/LF, CJK/emoji/Arabic/combining content, literal template/escape-like separator text, space alignment across digit boundaries, invalid options, exact input/line/output limits and largest allowed number progression. Copy contracts require all 15 distinct native taglines, minimum tagline lengths, steps/FAQs and localized runtime messages.

Browser interaction, clipboard behavior, responsive/dark/RTL visual review, shared registry/overlay regression, full build and MCP execution remain with the root integration task. No commit was made.

根任务已完成全仓与真实浏览器集成验收，详见[2026-11-22 统一记录](2026-11-22-complete-catalog-verification.md)。原聚焦记录仍保留工作单元交接边界。
