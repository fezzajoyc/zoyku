# Table and Palette Implementation Plan

**Goal:** Deliver local CSV matrix operations and a bounded whole-image palette with reviewable evidence.

**Architecture:** Each worker owns a pure module, a client engine, all native language copy, a definition and focused tests. The parent owns shared registration, protocol integration and final checks. A third worker inspects semantic competitor mappings independently.

**Tech Stack:** TypeScript, React, Next.js, Vitest, Zod, MCP SDK and browser Canvas.

- [x] CSV worker: add failing preservation, shape and resource tests; export the existing strict parser; implement transformCsvTable and localized UI. It returns text, error, rows and columns.
- [x] Palette worker: add failing alpha, distribution, group tie, shape and sampling tests; implement extractImagePalette and a race-safe local-image UI.
- [x] Parent: write registry and full-protocol failing tests. Register both definitions and MCP handlers. Limit MCP CSV request/response to 100,000 characters and raw RGBA to 4,096 pixels.
- [x] Review workers' requirements and code, address actionable findings, and synchronize 216-tool/42-MCP document counts after the registry confirms them.
- [x] Run npm test, TypeScript, lint, build and build:mcp. Audit generated sitemap HTML. Use a fresh production server to verify synthetic files, output, clipboard, invalid/transparent states, mobile, RTL, dark theme and sample accessibility.
- [x] Record actual results and limitations in the central handoff and new standalone evidence files. Keep research URL counts distinct from tested capability counts.
