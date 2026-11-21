# Image watermark upgrade: scoped verification

Evidence: the saved LDDGO full comparison records single-image and batch image-watermark workflows, with the concrete gap “No image/logo watermark input.” This upgrade keeps the existing `watermark-image` route and adds one uploaded PNG/JPEG/WebP logo alongside existing text and tiling.

## Implemented scope

- Native controls and page copy in all 15 supported languages. One text mark or one uploaded logo, nine named positions, opacity including zero, proportional width, clockwise rotation from −180° to 180°, shorter-edge margin and tiling.
- The pure `planImageWatermark` computes proportional draw size, rotated bounding box and center coordinates. It shrinks the whole mark proportionally when required to keep rotated content within the margin. Tiling fails explicitly above 144 placements rather than skipping excess marks.
- A real Canvas preview of the first source uses the same compositor as the full-size output. The preview is at most 640 pixels on its longer side. Result thumbnails point to actual encoded output Blobs; every source keeps its original dimensions.
- PNG preserves source/logo transparency. JPEG first paints an explicit white background. Original metadata and animation are not preserved. The UI checks a PNG/JPEG/WebP file signature before browser decoding; renaming a different format does not make it accepted.
- Sources: at most 6, each 10 MiB, total 30 MiB, each 10,000,000 pixels and no side above 8192. Logo: 5 MiB, 2,000,000 pixels and sides at most 4096. Output Blobs total at most 50 MiB. Pixel bounds are checked after browser decode; these limits do not guarantee pre-decode memory allocation. Browser decode and canvas failures have localized errors.
- Source, logo and configuration edits invalidate results and pending processing. Clear cancels result publication; the current decode finishes and releases its bitmap. Batch processing is sequential and prevents overlapping Apply jobs. Preview generations suppress stale decode completion. Every bitmap closes in `finally`; temporary full-size canvases are reset after encoding.
- Result-preview URLs are revoked on changes and unmount. Separate download URLs are created only on click and revoked after five seconds or on unmount. Download-start feedback is cleared before another attempt so a failed click cannot retain a prior success indicator.

`imageWatermarkCopy(locale, base)` replaces old capability descriptions, steps, FAQs and deep-dive content; the root owns its shared `lib/tool-copy.ts` branch. It removes old JPG-only/text-only statements and provides accurate alpha/size/rotation/boundary information in every language. The definition directly uses the same 15-language copy.

## Validation

The focused tests cover proportional sizes, rotated bounds across all nine positions, signed rotations, tiny/tall images, margin containment, every tile staying within bounds, explicit tile-count rejection, inclusive source/logo pixel limits and malformed configuration. SSR checks all 15 locale controls, nine accessible position names, zero-opacity range, PNG default and truthful page/error copy.

Commands: `npm test -- tests/image-watermark.test.ts tests/image-watermark-ui.test.tsx`; focused ESLint over the six source/test files; `npx tsc --noEmit`. Browser pixel checks, real upload/download/error/race checks and complete regression are root integration work; scoped source/SSR verification does not establish competitor output parity.

Browser hooks: `[data-image-watermark-tool]`, `[data-watermark-source] input[type=file]`, `[data-watermark-logo] input[type=file]`, `[data-watermark-mode]`, `[data-watermark-control=opacity|relativeWidth|rotation|margin]`, `[data-watermark-format]`, `[data-watermark-preview]`, `[data-watermark-result]` and `[data-watermark-download]`.
