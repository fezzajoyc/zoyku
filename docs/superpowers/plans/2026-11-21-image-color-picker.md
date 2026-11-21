# Image Pixel Color Picker Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a local-only image pixel sampler that reports exact coordinates and HEX/RGB/RGBA values, including alpha.

**Architecture:** Keep coordinate mapping and RGBA formatting in a tested `_lib` module. A client engine decodes one bounded raster image to Canvas and exposes click, keyboard, and coordinate-input sampling. Registry copy, locale overlays, MCP, counts, tests, and SEO derive from that feature.

**Tech Stack:** TypeScript, React client component, Canvas 2D, Vitest, existing DropZone/CopyButton, Zod MCP registry.

---

### Task 1: Pixel math

**Files:**
- Create: `tools/_lib/image-color-picker.ts`
- Test: `tests/image-color-picker.test.ts`

- [ ] **Step 1: Test coordinate mapping** for top-left, bottom-right, fractional points and points outside the rendered rectangle; invalid dimensions return an explicit failure.
- [ ] **Step 2: Run the focused test and confirm it fails** because the exported mapping helper is not implemented.
- [ ] **Step 3: Implement mapping** by scaling client coordinates through the rendered rectangle and flooring to an original-image pixel coordinate.
- [ ] **Step 4: Test RGBA formatting** for opaque red, semi-transparent alpha 128, fully transparent pixels, invalid channel count/range, and invalid coordinates.
- [ ] **Step 5: Implement pixel formatting** with both `#RRGGBB` and `#RRGGBBAA`, plus `rgb(...)` and `rgba(...)` output.
- [ ] **Step 6: Run `npx vitest run tests/image-color-picker.test.ts`** and confirm all focused cases pass.

### Task 2: Browser engine

**Files:**
- Create: `tools/_engines/image-engine-color-picker.tsx`
- Test: `tests/image-color-picker-ui.test.ts`

- [ ] **Step 1: Add UI copy contract tests** for 15 locale completeness, accessible Canvas labeling, keyboard arrows, visible coordinate labels, clear action and error/status roles.
- [ ] **Step 2: Run the focused UI contract test and confirm it fails** before adding the engine.
- [ ] **Step 3: Implement a single-image DropZone flow** with accepted raster MIME checks, 25 MiB file cap, 16,384-pixel side cap and 40 MP decode cap.
- [ ] **Step 4: Draw at native dimensions with `willReadFrequently`**, sample using the shared helpers, and release `ImageBitmap` on replacement, clear and unmount.
- [ ] **Step 5: Add pointer sampling, focusable arrow-key sampling, numeric x/y fields, color swatch, HEX/HEX8/RGB/RGBA outputs, CopyButtons and clear/error/status states.
- [ ] **Step 6: Add 15-language UI labels and localized error messages; ensure all dynamic output is keyboard/screen-reader reachable.
- [ ] **Step 7: Run UI contract tests and targeted ESLint.**

### Task 3: Registry, locale, and MCP integration

**Files:**
- Create: `tools/image/image-color-picker.ts`
- Create: `tools/_lib/image-color-picker-copy.ts`
- Modify: `tools/image/index.ts`
- Modify: `tools/_i18n/index.ts`
- Modify: `mcp/tools.ts`
- Test: `tests/mcp.test.ts`
- Test: `tests/registry.test.ts`
- Modify: `README.md`, `mcp/package.json`

- [ ] **Step 1: Add the MCP contract test** for an RGBA pixel and invalid channels; run it and confirm `image_pixel_color` is not registered.
- [ ] **Step 2: Register the image tool** with en/zh/ja/es/pt copy, ten translated overlays, 3–6 related tools and the correct `image` category.
- [ ] **Step 3: Register MCP tool `image_pixel_color`** using the exact shared `formatPixelColor` helper and a four-channel bounded schema.
- [ ] **Step 4: Update test-anchored counts** to 213 tools, 3,195 tool pages and 39 MCP tools; run registry, overlay and MCP tests.

### Task 4: Validation and handoff

**Files:**
- Modify: `docs/research/2026-11-21-competitor-parity-handoff.md`
- Create: `docs/research/2026-11-21-image-color-picker-verification.md`

- [ ] **Step 1: Run full tests, `npx tsc --noEmit`, targeted ESLint and `git diff --check`**; fix regressions before proceeding.
- [ ] **Step 2: Run `npm run build` and `npm run build:mcp`**; confirm the new page appears in static route output.
- [ ] **Step 3: Run HTTP SEO sample audit** against the production server and verify the new page title, one H1, canonical, hreflang, OG and WebApplication schema.
- [ ] **Step 4: Browser-check default state, a generated transparent PNG pixel sample, invalid file/error state, keyboard navigation and 390px overflow.**
- [ ] **Step 5: Record exact commands/results, source limits, incomplete peer comparisons and next priority (grid slicing) in the handoff.**
