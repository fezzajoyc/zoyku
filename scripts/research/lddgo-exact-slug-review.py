#!/usr/bin/env python3
"""Apply the reviewed evidence for the 11 exact-slug LDDGO candidates."""

from __future__ import annotations

import json
import re
from collections import Counter
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
JSON_PATH = ROOT / "docs/research/2026-11-21-lddgo-catalog-matrix.json"
MD_PATH = ROOT / "docs/research/2026-11-21-lddgo-catalog-matrix.md"
EVIDENCE_PATH = ROOT / "docs/research/2026-11-21-lddgo-exact-slug-review.md"

REVIEWS = {
    "LDDGO-01-043": {
        "status": "partial",
        "local_slug": "json-viewer",
        "local_source": ["tools/developer/json-viewer.ts", "tools/_engines/dev-engine-json-viewer.tsx"],
        "observed_peer_controls": ["JSONEditor tree/text view", "format", "compress", "open", "download", "copy", "reset"],
        "comparison": "Core tree viewing is present locally with typed values, expand/collapse and formatted-source copy. The peer page exposes file open/download and a compress action; those workflows are not present in the local engine.",
        "limits": "No same-input browser interaction was completed because the shared browser session was locked; the detail page markup and local source were inspected.",
    },
    "LDDGO-01-082": {
        "status": "partial",
        "local_slug": "ulid-generator",
        "local_source": ["tools/developer/ulid-generator.ts", "tools/_engines/dev-engine-ulid.tsx", "tools/_lib/ulid.ts"],
        "observed_peer_controls": ["batch count", "join format", "join string", "seed time", "monotonic toggle", "generate", "copy", "download", "clear"],
        "comparison": "Both generate ULIDs locally and expose batch output. The local tool uses crypto.getRandomValues, shows decoded timestamps and caps quantity at 100; the peer page exposes seed-time, monotonic and join-format controls plus download. Those option semantics are not equivalent.",
        "limits": "The peer page claims batch generation/download in its description; the controls were inspected from HTTP HTML, not executed with a shared sample.",
    },
    "LDDGO-01-084": {
        "status": "partial",
        "local_slug": "json-diff",
        "local_source": ["tools/developer/json-diff.ts", "tools/_engines/dev-engine-jsonplus.tsx", "tools/_lib/jsontool.ts"],
        "observed_peer_controls": ["two JSON textareas", "clear/copy/open per side", "compare", "example", "return", "clear"],
        "comparison": "Both compare two JSON documents and report path-level changes. The local engine returns added/removed/changed entries and has a local copy action; the peer page additionally exposes per-side file open controls and an example/return workflow.",
        "limits": "No same-input diff result was collected from both pages; status is based on page controls and local source.",
    },
    "LDDGO-05-014": {
        "status": "partial",
        "local_slug": "stopwatch",
        "local_source": ["tools/calculators/stopwatch.ts", "tools/_engines/calc-engine-stopwatch.tsx", "tools/_lib/stopwatch.ts"],
        "observed_peer_controls": ["start/pause", "lap", "download", "reset"],
        "comparison": "Core stopwatch and lap timing are present locally, with requestAnimationFrame display anchored to Date.now and explicit start/pause/resume/lap/reset states. The peer page exposes lap download; the local tool has no matching export control.",
        "limits": "Peer millisecond wording was read from the page description; no timing-drift or download interaction comparison was run.",
    },
    "LDDGO-05-071": {
        "status": "partial",
        "local_slug": "bmr-calculator",
        "local_source": ["tools/calculators/bmr-calculator.ts", "tools/_engines/calc-engine-health.tsx", "tools/_lib/health.ts"],
        "observed_peer_controls": ["formula selector: Harris-Benedict, revised Harris-Benedict, Mifflin-St Jeor, Katch-McArdle", "sex", "age", "height", "weight", "body-fat input", "kcal/kJ", "calculate", "share", "clear"],
        "comparison": "The local route calculates Mifflin-St Jeor BMR with metric/imperial input and a documented formula note. The peer route offers four formula choices, an optional body-fat field and kcal/kJ output plus share/clear controls; local formula selection and sharing are absent.",
        "limits": "Formula outputs were not cross-checked with identical inputs; health results remain estimates and should not be presented as medical advice.",
    },
    "LDDGO-07-018": {
        "status": "partial",
        "local_slug": "gpa-calculator",
        "local_source": ["tools/calculators/gpa-calculator.ts", "tools/_engines/calc-engine-gpa.tsx", "tools/_lib/grade.ts"],
        "observed_peer_controls": ["score type: 100-point, 5-point, grade", "weighted toggle", "add/delete course", "calculate", "clear"],
        "comparison": "Both accept course rows and credits and calculate GPA. The local route supports letter grades, 4.0/5.0 scale, cumulative transcript blending, sample and clear; the peer route accepts 100-point, 5-point and grade inputs and has a weighted switch. Input conversion rules are therefore only partially comparable.",
        "limits": "No institution-specific GPA table was assumed; no identical course set was submitted to both pages.",
    },
    "LDDGO-07-019": {
        "status": "partial",
        "local_slug": "percentage-calculator",
        "local_source": ["tools/calculators/percentage-calculator.ts", "tools/_engines/calc-engine-basic.tsx"],
        "observed_peer_controls": ["multiple percentage input/result groups", "clear"],
        "comparison": "The local route covers three live modes: X% of Y, X as a percentage of Y, and percentage change with increase/decrease direction. The peer markup exposes several grouped input/result pairs, so its exact mode set is broader or differently organized; the two surfaces are not proven equivalent.",
        "limits": "Peer formulas were not executed and the source page does not provide a machine-readable capability contract in the fetched HTML.",
    },
    "LDDGO-09-015": {
        "status": "partial",
        "local_slug": "color-picker",
        "local_source": ["tools/calculators/color-picker.ts", "tools/_engines/calc-engine-color.tsx"],
        "observed_peer_controls": ["image upload/drop zone", "canvas image sampling", "hex/hex8/rgba fields", "clear"],
        "comparison": "The peer page is an image color sampler: it uploads an image and extracts a pixel color. The local same-named route is a swatch/screen picker that outputs hex, RGB and HSL; it does not accept an image for pixel sampling. The shared slug hides a real workflow gap.",
        "limits": "This is a partial match for color picking, not proof that the local tool implements the peer's image-sampling capability.",
        "alternate_mapping": "Missing dedicated image color sampler; do not close the gap based on the existing screen/swatch picker.",
    },
    "LDDGO-09-016": {
        "status": "partial",
        "local_slug": "crop-image",
        "local_source": ["tools/image/crop-image.ts", "tools/_engines/image-engine-crop.tsx", "tools/image/image-splitter.ts"],
        "observed_peer_controls": ["image upload/drop zone", "grid crop or width/height mode", "row/column controls", "radius/background options", "generate", "clear", "download"],
        "comparison": "The local crop route supports free and fixed aspect-ratio crops, numeric coordinates and applying a selection to multiple files. The peer route explicitly supports grid/row-column splitting and a width-height mode; local grid splitting is a separate image-splitter route, so the exact route is only partial.",
        "limits": "The alternate local splitter was recorded as related capability; no shared image sample was run on both pages.",
        "alternate_mapping": "image-splitter covers the peer's grid-output workflow more directly than crop-image.",
    },
    "LDDGO-10-008": {
        "status": "partial",
        "local_slug": "image-to-pdf",
        "local_source": ["tools/pdf/image-to-pdf.ts", "tools/_engines/pdf-engine-images-to-pdf.tsx"],
        "observed_peer_controls": ["multiple image upload", "page size", "portrait/landscape", "file order", "margin", "single/multiple PDF output", "generate", "download", "clear"],
        "comparison": "Both accept multiple images and expose page size, orientation, margin and ordering. The peer page has an explicit single-versus-multiple-PDF output mode; the local engine emits one PDF for the selected image list and does not expose that split-output mode.",
        "limits": "The peer page description says JPEG/PNG; the local engine accepts a wider image set through browser decoding. Format compatibility was not exhaustively tested.",
    },
    "LDDGO-10-011": {
        "status": "partial",
        "local_slug": "compress-pdf",
        "local_source": ["tools/pdf/compress-pdf.ts", "tools/_engines/pdf-engine-compress.tsx"],
        "observed_peer_controls": ["PDF upload/drop zone", "compression level: screen/ebook/default/printer", "generate", "download", "clear"],
        "comparison": "Both expose local PDF compression with downloadable output. The peer uses named compression presets; the local route exposes DPI, JPEG quality and grayscale, and explicitly rasterizes pages before rebuilding the PDF. The parameter models and preservation guarantees differ.",
        "limits": "No same-file size/quality comparison was performed; local rasterization can remove selectable text, vector content, annotations and other structure.",
    },
}


def historical_metadata(rows: dict[str, dict]) -> dict[str, dict]:
    """Reuse the dated 22-page evidence table without repeating public requests."""
    found = {}
    table = EVIDENCE_PATH.read_text(encoding="utf-8")
    for line in table.splitlines():
        cells = [cell.strip() for cell in line.strip("|").split("|")]
        if len(cells) != 5 or not re.fullmatch(r"\d{2}-\d{3}", cells[0]) or cells[1] not in ("zh", "en"):
            continue
        short_id, lang, title, description, keywords = cells
        catalog_id = f"LDDGO-{short_id}"
        if catalog_id not in REVIEWS:
            continue
        if lang in found.get(catalog_id, {}):
            raise ValueError(f"Duplicate dated evidence row: {catalog_id}/{lang}")
        found.setdefault(catalog_id, {})[lang] = {
            "title": title,
            "meta_description": description,
            "meta_keywords": keywords,
            "h1": title,
            "canonical": None,
            "json_ld_types": [],
            "status": "ok",
            "http_status": 200,
            "final_url": rows[catalog_id][f"url_{lang}"],
            "self_canonical": False,
            "evidence_source": str(EVIDENCE_PATH.relative_to(ROOT)),
            "evidence_date": "2026-11-21",
            "capture_method": "historical_HTTP_HTML_table_reuse",
        }
    if set(found) != set(REVIEWS) or any(set(pair) != {"zh", "en"} for pair in found.values()):
        raise ValueError("The dated evidence table must contain both language records for all 11 reviewed IDs")
    return found


def replace_section(markdown: str, heading: str, section: str) -> str:
    """Replace only our named section, leaving later report sections intact."""
    pattern = re.compile(r"^" + re.escape(heading) + r"\n.*?(?=^## |\Z)", re.MULTILINE | re.DOTALL)
    base = pattern.sub("", markdown).rstrip()
    return base + "\n\n" + section.strip() + "\n"


def main() -> None:
    payload = json.loads(JSON_PATH.read_text(encoding="utf-8"))
    rows = {row["catalog_id"]: row for row in payload["rows"]}
    metadata = historical_metadata(rows)
    for catalog_id, review in REVIEWS.items():
        row = rows[catalog_id]
        row["mapping_status"] = review["status"]
        row["peer_review"] = {
            "evidence_level": "detail_page_markup_plus_local_source",
            "interaction_tested": False,
            "status": review["status"],
            "local_slug": review["local_slug"],
            "local_source": review["local_source"],
            "peer_detail_pages": [row["url_zh"], row["url_en"]],
            "observed_peer_controls": review["observed_peer_controls"],
            "comparison": review["comparison"],
            "limits": review["limits"],
            "page_seo": metadata[catalog_id],
            "metadata_scope": "focused_exact_slug_review_historical_evidence",
        }
        if review.get("alternate_mapping"):
            row["peer_review"]["alternate_mapping"] = review["alternate_mapping"]
        if catalog_id == "LDDGO-09-015":
            row["peer_review"]["historical_mapping"] = {
                "evidence_date": "2026-11-21",
                "comparison": review["comparison"],
                "alternate_mapping": review["alternate_mapping"],
            }
            row["peer_review"]["comparison"] = (
                "The exact-slug color-picker remains a screen/swatch tool. "
                "The later image-color-picker route implements local-image pixel sampling and "
                "HEX/HEX8/RGB/RGBA output; it supersedes the historical missing-tool annotation. "
                "This capability mapping does not claim same-image equivalence with the peer."
            )
            row["peer_review"]["alternate_mapping"] = "image-color-picker"
            row["peer_review"]["current_mapping"] = {
                "local_slug": "image-color-picker",
                "mapping_status": "existing",
                "scope": "dedicated local-image pixel-sampling workflow",
                "local_source": [
                    "tools/image/image-color-picker.ts",
                    "tools/_engines/image-engine-color-picker.tsx",
                    "tools/_lib/image-color-picker.ts",
                ],
                "local_verification": "docs/research/2026-11-21-image-color-picker-verification.md",
                "peer_same_input_tested": False,
            }

    focused = {
        "row_count": len(REVIEWS),
        "page_records": sum(len(pair) for pair in metadata.values()),
        "metadata_http_status_counts": dict(Counter(
            str(record["http_status"]) for pair in metadata.values() for record in pair.values()
        )),
        "interaction_tested": False,
        "evidence_level": "detail_page_markup_plus_local_source",
        "evidence_source": str(EVIDENCE_PATH.relative_to(ROOT)),
        "metadata_capture": "reuse_of_2026-11-21_published_local_evidence",
        "live_requests_on_apply": 0,
        "status_counts": dict(Counter(review["status"] for review in REVIEWS.values())),
        "current_capability_mapping_updates": {"LDDGO-09-015": "image-color-picker"},
    }
    payload["summary"]["focused_exact_slug_review"] = focused
    stratified = {
        record["final_url"]
        for row in rows.values()
        if row["page_seo"].get("collection_status") == "metadata_sampled"
        for lang in ("zh", "en")
        if (record := row["page_seo"].get(lang))
    }
    historical = {record["final_url"] for pair in metadata.values() for record in pair.values()}
    payload["summary"]["metadata_coverage_by_scope"] = {
        "stratified_sample_unique_pages": len(stratified),
        "historical_focused_review_unique_pages": len(historical),
        "overlap_unique_pages": len(stratified & historical),
        "combined_unique_pages": len(stratified | historical),
        "same_input_runtime_comparisons": 0,
    }
    JSON_PATH.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    heading = "## 11 个精确 slug 候选复核"
    section = [
        heading,
        "",
        "本节重放既有 [精确 slug 复核记录](2026-11-21-lddgo-exact-slug-review.md) 的 11 条映射和 "
        "22 页元数据。证据来自 2026-11-21 的详情 HTML 与本地源码；本次重放未发起网络请求。"
        "历史记录中的浏览器占用说明保留在原报告，同行同输入运行仍未验证。",
        "",
        "这些历史元数据保存在每行的 peer_review.page_seo，120 页分类分层抽样继续保存在 page_seo。"
        f"两者去重合并共 {len(stratified | historical)} 页，重叠 {len(stratified & historical)} 页。"
        "原有抽样计数及分类覆盖率只统计那 120 页。",
        "",
        "| ID | 精确同名 Zoyku | 判断 | 对照记录 |",
        "| --- | --- | --- | --- |",
    ]
    for catalog_id, review in REVIEWS.items():
        record = rows[catalog_id]["peer_review"]
        section.append(
            f"| {catalog_id} | `{review['local_slug']}` | **{review['status']}** | {record['comparison']} |"
        )
    section.extend([
        "",
        "图片颜色提取的旧“缺少独立工具”注释保存在 historical_mapping。当前能力映射为 "
        "`image-color-picker`（existing），表示本地已具备图片像素采样工作流；"
        "对同行的同图结果、完整格式和交互等价性保持未验证。",
    ])
    MD_PATH.write_text(replace_section(MD_PATH.read_text(encoding="utf-8"), heading, "\n".join(section)), encoding="utf-8")


if __name__ == "__main__":
    main()
