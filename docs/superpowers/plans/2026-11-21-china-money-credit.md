# China Money and Credit Implementation Plan

> **For agentic workers:** Use superpowers:subagent-driven-development for independent modules and receiving-code-review for evidence-based review.

**Goal:** Ship the next evidenced China-specific capability batch with truthful limits, privacy and repeatable acceptance.

**Architecture:** New pure modules and small localized client engines, registered through existing category arrays. Root owns integration, counts, research ledger, final verification and Git; individual agents own isolated new files.

**Tech Stack:** Existing Next/React/TypeScript/Vitest/Tailwind setup; no new runtime dependencies or network service.

- [x] Inspect clean `6fc9d51`, AGENTS, engineering/TDD guidance and local Next server/client guide; reuse the existing worktree on `codex/china-money-credit`.
- [x] Save readable official-source evidence with method/page/date and distinguish blocked sources from verified ones.
- [x] Implement credit tests first in `tests/social-credit*.test.ts(x)`, then `tools/_lib/social-credit.ts`, `social-credit-copy.ts`, `tools/_engines/social-credit-engine.tsx`, `tools/security/social-credit-validator.ts`; preserve precise scope flags.
- [x] If official RMB rules are readable, implement failing `tests/rmb-uppercase*.test.ts(x)`, then `tools/_lib/rmb-uppercase.ts`, `rmb-uppercase-copy.ts`, `tools/_engines/rmb-uppercase-engine.tsx`, `tools/utility/rmb-uppercase.ts`; otherwise record the source gate as pending and omit that route.
- [x] Independently review source examples, algorithms and UI claims. Run `npx vitest run tests/social-credit tests/rmb-uppercase`; inspect results and fix failures before registration.
- [x] Root appends imports/definitions in `tools/security/index.ts` and, only if shipped, `tools/utility/index.ts`. Update `tests/registry.test.ts` and README from the actual registry delta, not a guessed sitemap/build total.
- [x] Run full `npm test`, `npx tsc --noEmit`, `npm run lint`, then `CIRCLE_NODE_TOTAL=2 npm run build`; preserve baseline warning distinction.
- [x] Replace local3477 preview with the successful build. Run reusable new browser scripts plus prior home/theme/core regressions, SEO static audit and bounded HTTP samples; inspect changed screenshots and incomplete findings.
- [x] Update the delivery ledger and dated verification evidence, commit a coherent batch, and fast-forward the still-clean original checkout. No push or deployment; leave all remaining gaps open.

Registration pattern:

```ts
import socialCreditValidator from "./social-credit-validator";
// Append socialCreditValidator to SECURITY_TOOLS.
```

New UI browser scripts must receive an existing page or browser plus `baseURL`, `reportDir` and supplied `axePath`; do not hard-code an individual's Playwright installation. Source snapshots and large screenshots belong in the local reports directory, while concise evidence/verification belongs in `docs/research/`.
