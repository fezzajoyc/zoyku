# Sequence, Frequency, Byte Encoding and Image Watermark Design

This continues the user-authorized competitor gap work. Sources are the complete 420-row LDDGO comparison: 01-014 sequences, 01-062 character frequency, Base32/Base58 byte encoding, and the two image watermark workflows. Existing named-peer research supplies additional demand evidence. Each workflow remains client-only and bounded.

## Decisions

- Add `text-sequence-generator`: exact finite-decimal arithmetic using scaled integers, count/start/step, minimum integer digit padding, prefix/suffix and literal separator. Expressions are a separate open workflow. Locale separator normalization follows the shared number parser without passing exact values through floating point.
- Add `character-frequency-counter`: Unicode codepoint frequencies, optional Unicode whitespace removal and whole-string lowercase, deterministic ordering, bounded table and complete bounded CSV/TXT export. Lowercase may expand codepoints; the denominator is the transformed kept codepoints. This is distinct from words and grapheme clusters.
- Add `byte-encoding-converter`: UTF-8, HEX, RFC 4648 Base32, Bitcoin Base58 and standard Base64 share an explicit byte model. Strict padding and pad bits, leading zero bytes, fatal UTF-8 decoding, optional ASCII whitespace ignoring, local binary file input/download. Base58Check and legacy character sets remain open. Overall bytes 65,536; quadratic Base58 is limited to 1,024 bytes.
- Upgrade the existing `watermark-image` route: text and uploaded image/Logo modes, nine anchors, opacity, aspect-preserving relative width, free rotation, margin and bounded tiling. A pure geometry plan is shared with MCP. PNG preserves alpha; JPEG explicitly uses white. PDF image overlays remain open.

Separate routes match separate user tasks. Extending the old numeric-base tool would lose byte leading zeros, and a second image-watermark route would duplicate the existing task. Standards libraries are unnecessary for these bounded algorithms; fixed official vectors and independent byte/pixel readback validate them.

## Architecture and state

Three workers own isolated cores, copy, engines, tool definitions and focused tests. The parent owns category registration, capability-copy override, MCP schemas/protocol tests, counts, catalog updates and integrated review. Sources or configuration changes invalidate previous results. Async file/decode operations use revisions or disabled controls, release bitmap/URL resources, and never restore stale outputs after clear/unmount.

All UI and tool metadata are native in the 15 supported locales. Errors, limits, empty states and output semantics describe actual behavior. Shared routing generates discovery, HTML and Markdown from registry definitions. No external uploads or services are introduced.

## Acceptance

Write failing behavioral vectors before implementation. Validate exact decimals, Unicode expansions and clusters, RFC 4648 vectors, Base58 leading zeros, invalid and resource limits. For images test rotation/anchor geometry independently, then download actual PNG/JPEG and inspect decoded pixels and alpha. Cross-review each package, run whole tests/build/lint/MCP, verify all sitemap SEO and new HTML/Markdown locale responses, and inspect populated mobile dark/light/RTL views with keyboard and accessibility checks. Only saved passed browser evidence may advance catalog delivery state. Preserve prior snapshots and unresolved capability boundaries.
