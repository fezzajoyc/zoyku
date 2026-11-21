# Sequence, Frequency, Bytes and Watermark Implementation Plan

**Goal:** Deliver three new useful routes and upgrade the existing image watermark workflow from the verified gap queue.

**Design:** [Approved scope and bounded architecture](../specs/2026-11-22-sequence-bytes-watermark-design.md). The user's continuing autonomous authorization covers implementation and review; no release action is included.

- [ ] Text worker: failing exact sequence and Unicode frequency vectors, pure cores and error contracts, 15-language copy and engines, tool definitions and scoped verification.
- [ ] Byte worker: official encoding vectors and malformed/limit cases, shared byte conversion core, 15-language text/file workflow with real download and async result invalidation.
- [ ] Image worker: failing independent layout vectors, pure geometry, text/Logo input, PNG/JPEG preview/download, bounded resources and 15-language copy.
- [ ] Parent: failing registry/protocol tests, shared registry/copy integration and four MCP tools with explicit limits and honest semantics.
- [ ] Cross-review the three independent work packages; lock all findings with appropriate regression evidence.
- [ ] Run full tests, production build, lint and MCP. Audit generated SEO and actual HTML/Markdown locale responses.
- [ ] Exercise actual text/clipboard, byte downloads and pixel/alpha readback, invalid/empty/stale states, keyboard, mobile/dark/RTL and accessibility.
- [ ] Update catalog only from passed saved evidence, current counts, handoff, ledger and remaining queue. Preserve open expression, words, other codecs and PDF image-overlay gaps.
