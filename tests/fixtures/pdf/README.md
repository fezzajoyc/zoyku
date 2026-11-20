# Synthetic PDF regression fixtures

These files contain no personal or user documents.

- `owner-restricted.pdf`: one 240 × 320 pt page, made with ReportLab and encrypted using pypdf (RC4-128, empty user password, owner password `synthetic-owner`, permissions 0). The visible text is `OWNER RESTRICTED TEST`. It opens without a user password but has real encrypted content. This catches the unsafe assumption that `ignoreEncryption: true` decrypts a PDF.
- `redacted-page.jpg`: a 4 × 4 solid black JPEG made with Pillow. The Node engine-handler tests supply it at the browser canvas boundary; pdf-lib writes the actual exported PDF and PDF.js independently parses the resulting text, page count, and page dimensions.
- `unsupported-script.docx`: a minimal valid OOXML package with the text `中文正文 العربية हिन्दी`, for browser validation of the unsupported-font guard.
- `latin-text.docx`: the same minimal OOXML structure with `Résumé — café € 25`, for browser validation of the supported conversion path.

Fixtures are checked in so running JavaScript regressions does not require Python or a network connection.
