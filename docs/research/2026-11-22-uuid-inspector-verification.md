# UUID inspector scoped verification

Implemented `uuid-validator-converter` for the stored official LDDGO-01-081 demand: https://www.lddgo.net/string/uuid-format-convert-verify. The directory declares string/HEX/binary/Base64 conversion, validation and version identification. This is an original local implementation, not a claim of identical peer controls or output behavior.

Sources: official RFC 9562, https://www.rfc-editor.org/rfc/rfc9562.txt, fetched 2026-11-22; §4.1 variant bits, §4.2 version assignments, §§5.9–5.10 NIL/MAX; Appendix A.1–A.6 vectors for v1/v3/v4/v5/v6/v7, and Appendix B.1–B.2 illustrative v8 examples. v8 examples validate layout recognition only, not an endorsed v8 generation algorithm.

Core API: `inspectUuid(input: unknown): UuidInspectionResult`. A failure returns `ok: false` with `input-type`, `empty`, `too-long` or `format`. A parsed result returns canonical/uppercase/raw HEX/URN/braced/binary/Base64, 16 network-order bytes, variant family, version nibble and interpreted version. `isRfc9562` means the RFC variant plus an assigned version nibble 1–8, or the special NIL/MAX values. It does not establish generator correctness, randomness, uniqueness or security. Non-RFC variants and unassigned versions remain convertible, with `isRfc9562: false` and no interpreted version. Version 2 is recognized as the DCE Security assignment in Table 2; it is not generated or algorithmically verified.

Input contract: one canonical 36-character UUID, raw 32-digit HEX, exactly 128 binary digits, or strict standard 24-character Base64 ending in `==`. A single case-insensitive `urn:uuid:` prefix or pair of braces may wrap canonical text only. Surrounding whitespace/case is normalized. Nested/combined wrappers, Base64URL, missing padding and nonzero padding bits are rejected. The 128 UTF-16 input-unit bound applies before trimming. No Microsoft GUID field-byte swapping or timestamp extraction is performed.

The page and all runtime labels, format names, errors, variant/special descriptions and rules are authored in all 15 locales. Input/output use LTR; Arabic explanatory layout uses RTL. Empty and malformed input show no copyable result. Parseable non-RFC values are labeled as unrecognized layouts rather than silently certified.

Verification on 2026-11-22 01:11 Asia/Shanghai:

- Core tests were written first and failed because the module did not exist; implementation then passed all 49 core cases.
- UI/copy tests were written before the engine and failed because that module did not exist; final scoped run: 2 files, 81 tests passed.
- Node Buffer independently verifies all RFC example Base64/byte outputs; all seven supported representations round-trip across the official vectors. Literal v4 Base64 example is pinned.
- Variant boundaries, version 0/9/A/F, NIL/MAX, malformed wrappers/HEX/hyphens, Unicode rejection, Base64 padding, binary length, raw UTF-16 boundary, native rendering and copy controls are covered.
- Scoped ESLint: passed, no warnings or errors.
- `npx tsc --noEmit`: passed, no diagnostics.

The package does not edit shared registration, MCP, counters or central handoff files. Parent integration and browser interaction acceptance remain separate checks; no browser or peer runtime result is claimed here.
