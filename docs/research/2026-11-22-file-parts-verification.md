# File splitter and merger verification

Evidence: `LDDGO-10-018` raw file concatenation and `LDDGO-10-019` raw file splitting in the saved official directory. This implementation adds one registered-definition candidate, `file-splitter-merger`, for both workflows. The root integration owns category registration, MCP exposure, browser acceptance and full regression.

## Delivered behavior

- Split one local file by exact bytes per part or a selected number of balanced contiguous parts. Count mode differs by at most one byte between parts. Ranges use inclusive start and exclusive end; an empty source produces one empty part. Count cannot exceed source byte count, except the one-part empty case.
- Merge two or more local files in the displayed order; append, move up/down and remove controls set that order. The standalone byte merge function also accepts one input array, with that contract tested separately.
- Source or aggregate size is limited to 50 MiB (52,428,800 bytes), with at most 100 files or parts. Resource rejections return no partial output.
- Split results use `Blob.slice`; merge uses `new Blob(files)`. File contents are not decoded or read into full JavaScript byte arrays by the UI. Generated names use `.part001` through `.part100`; merge names replace path separators/control characters and have a bounded length.
- Blob URLs are created only when a download button is pressed, revoked after five seconds or on unmount. The button confirms that download was started; a thrown browser error displays a localized error.
- Selection, settings, file order, mode and Clear invalidate results and pending preparation; unmount invalidates preparation and releases download URLs/timers. The default part size is 1 MiB.
- All 15 locales have native page copy, runtime controls, empty state, resource rules and error labels. Text and numbers use LTR inside Arabic UI where appropriate.

These are raw binary operations. They do not merge PDF pages, unpack archives, repair files, preserve a semantic media timeline, or split text by characters/lines. Restoring a split source requires the original part order. There is no same-input competitor runtime comparison.

## Checks

`npm test -- tests/file-parts.test.ts tests/file-parts-ui.test.tsx` verifies byte reconstruction, reordered merge, subarray offsets, independent output buffers, detached buffers, empty and exact-multiple cases, balanced count coverage, malformed options, byte/count limits, safe names, real Blob output contents, all-locale SSR and native page/error copy. This is scoped verification; browser download/reorder/race acceptance is pending root integration.

Focused ESLint passed for the six implementation/test files. The scoped test run passed all 39 tests. Project TypeScript validation (`npx tsc --noEmit`) passed after concurrent UUID copy edits were completed. Browser download acceptance and full regression remain root integration checks.
