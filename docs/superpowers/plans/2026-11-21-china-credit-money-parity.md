# China credit and money parity implementation plan

**Goal:** Complete two bounded tasks from the existing approved gap queue, and record actual same-input peer comparisons rather than feature-name counts.

**Architecture:** New client engines consume serializable tool definitions and pure `_lib` functions. All processing stays local. Reuse current styles, copy/export recovery, registry-driven routing and SEO; no new dependencies or shared-style redesign.

**Baseline:** `1745bd2`, 209 tools. Working branch: `codex/china-credit-money-parity`. The user has repeatedly authorized implementation and verification of the existing queue; proceed with these professional defaults without another approval pause.

## 1. Credit test samples — CN-004, bounded scope

- [ ] Read the official GB11714 formula, 36-character value table and D2143569-X example independently; preserve PDF hash and rendered evidence. GB32100 outer mapping remains 31 characters; do not confuse the two maps.
- [ ] Add pure generator, engine, 15-language copy and `tools/security/social-credit-generator.ts`. Manual department/category/address and eight-character starting organization body; deterministic sequence, 1–100 results, explicit raw limits and no wrapping. Compute both check characters. State code-table and registration checks not performed; handle the reserved PDY range explicitly.
- [ ] Write failing tests before implementation. Anchor `organizationCheck("D2143569") === "X"`; verify a zero-remainder vector, 36-map letters M/Y, both checks independently for every generated item, distinctness, exhaustion, invalid characters/field widths, empty/non-text/oversized/Unicode inputs, masking and exact current export content.
- [ ] Run actual browser input, error correction, Clear, masking/reveal, clipboard, TXT/API-failure/old-operation recovery, offline, 15 locales, 320px/RTL, light/dark and axe. Caller provides browser page and axe bundle; no personal machine paths in repo QA.

## 2. Strict financial amount reverse conversion — bounded CN-006

- [ ] Preserve the actually read CNCC appendix and eight printed spellings. Treat a dead candidate URL, failed search service or search snippet as insufficient evidence.
- [ ] Add pure parser, engine, 15-language copy and `tools/utility/rmb-uppercase-to-number.ts`. Support a declared strict financial-character subset, optional leading 人民币, explicit groups/zero placement and legal suffix positions. Normalize only disclosed variants. Use BigInt cents; range 0–999999999999.99, raw limit 128 UTF-16 units, no implicit rounding or stripping arbitrary text.
- [ ] First test all eight official spellings; `人民币陆仟零柒元壹角肆分` must return `6007.14`. Reject repeated units, embedded `abc`, misplaced 整/正, internal whitespace, negatives and over-limit input. Test a large independent forward→reverse corpus, exact min/max and Unicode. An unsupported spelling is not a declaration that a bank must reject it.
- [ ] Verify visible normalized decimal, cents and canonical uppercase; current copy/TXT, failures, offline, all locales and scoped accessibility. Reuse existing presentation without altering the forward converter's output.

## 3. Integration and actual peer comparison

- [ ] Root owns `tools/security/index.ts`, `tools/utility/index.ts`, reciprocal related links, `tests/registry.test.ts`, README/benchmark counts and the delivery ledger. Change the deliberate registry anchor to 211 first and observe the 209 mismatch; then register exactly two real tools. New HTML tool entries: 211×15=3,165.
- [ ] Independent reviewer records actual LDDGO/other accessible official tool inputs, outputs, errors, keyboard and narrow-screen findings in `docs/research/2026-11-21-china-peer-benchmark.{md,json}`. Respect access refusals. Compare usability goals as well as strictness; do not call a permissive converter incorrect merely for its documented policy.
- [ ] Review both new algorithms and source evidence; fix concrete findings. Keep universal Chinese-number parsing, complete code tables, identity/registration authenticity and unmeasured business/SEO outcomes open.
- [ ] Run full tests, TypeScript, lint, optimized build, new-tool production browser suites and representative existing regressions; full static SEO and bounded HTTP audit. Record exact scope, failures and incomplete axe checks.
- [ ] Update ledger source records as partial or scoped delivery, not full closure of the broad CN-004/CN-006 descriptions. Commit locally and fast-forward the clean original checkout only if still compatible; keep preview/worktree, no push or deployment.
