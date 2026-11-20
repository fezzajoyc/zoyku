# Export notice ordering regression

Date: 2026-11-21 (Asia/Shanghai). Baseline: `180554b`.

Hourly self-review follows the previous copy-notice fix into the two recent tools with independent export handlers: social-credit validation and RMB uppercase conversion. Their copy handlers capture a revision without advancing it, and download handlers do not invalidate pending copies. Amount/credit algorithms, data, source claims, metadata, styles and registered tools are outside this patch.

1. Reproduce overlapping Copy→Copy and Copy→Download operations in the real browser, including both outcomes and old promise resolve/reject. Check that a new pending copy clears the previous notice. Add permanent regression checks before editing product handlers.
2. Apply the minimal event-handler fix, then run focused browser regressions and tests. Preserve the original copy/download contents, masking, input limits, accessibility semantics and error recovery.
3. Run full tests, TypeScript, lint, optimized build, current production tool suites and a bounded SEO check. Keep incomplete accessibility checks and any unsuccessful attempts in the evidence record.
4. Update the delivery ledger and verification record. Commit locally; synchronize the original checkout only if clean and still fast-forwardable. Preserve the preview and do not push or deploy.
