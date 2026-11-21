# GB 11714-1997 source evidence for test sample generation

On 2026-11-21, the review re-fetched the five-page scan published by the National Organization Unified Social Credit Code Data Service Center (CODS). The 163,265-byte PDF had SHA-256 `46b6762ca99fdea8d6e2f2cd0a8425f3669b5a491d64d498ac4ed0d1848d7af0`. [CODS PDF](https://irss.cods.org.cn/cods/2020-10/29/12582hi/2026052817544819074.pdf) · [SAMR standard record](https://openstd.samr.gov.cn/bzgk/std/newGbInfo?hcno=D4FCCBF166BB7DDD95236DC211E660BF)

The review rendered physical pages 2–5 at 140 dpi and inspected each image. Poppler reported missing CJK font mappings in the OCR layer, but the scanned page image was legible throughout the relevant clauses and annexes.

| Physical page | Observed in the rendered scan | PNG SHA-256 |
| --- | --- | --- |
| 2 | Clause 2.1.2 computes `11 − (weighted sum mod 11)` with weights `3, 7, 9, 10, 5, 8, 4, 2`. Remainder 1 becomes `X`; remainder 0 becomes `0`. | `548b7268f81df4e8be56a061f1f00795471bbb88ab3265008e643620faf87535` |
| 3 | Clause 3 identifies `PDY00001`–`PDY99999` as an internal custom range that is excluded from cross-system information exchange. | `b523ec9c60e63e989be341ef96c05ec1a28d2d45ac4e35a594c2a89fa5fb2c44` |
| 4 | Annex A lists 36 character values: digits `0`–`9`, followed by `A=10` through `Z=35`. It includes `M=22` and `Y=34`. | `72b33ab06f48046772905d70fd5d8c9dbe224b829aa406f84b7407b4774f81fb` |
| 5 | Annex B starts with `D2143569`, obtains weighted sum 199 and remainder 1, and prints `D2143569-X`. The printed separator is omitted for machine processing. | `b615e9c20952cb2f297d118c2249618e7dbc024f93cf6843122168b262e4e36a` |

To reproduce the visual review, run `pdftoppm -f 2 -l 5 -r 140 -png gb11714.pdf page` on the linked PDF. The PNG hashes record this render and may differ with a different Poppler or PNG version.

The tool uses the 36-value table to compute the inner check, then applies GB 32100-2015's separate 31-symbol map for the outer check and the sample sequence. It excludes the entire `PDY` prefix to keep the internal custom range out of generated batches. Sample generation checks field shapes and both check characters. Verification against department, organization category, administrative division and registration records remains outside its scope. [GB 32100-2015 source review](2026-11-21-china-money-credit-sources.json)
