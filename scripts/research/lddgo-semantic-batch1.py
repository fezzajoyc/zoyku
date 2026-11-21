#!/usr/bin/env python3
"""Validate/render the manually reviewed LDDGO batch; never fetch or edit sources."""

from __future__ import annotations

import argparse
import hashlib
import json
import re
from collections import Counter
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
REPORT = ROOT / "docs/research/2026-11-21-lddgo-semantic-batch1.json"
MARKDOWN = REPORT.with_suffix(".md")
CATALOG = ROOT / "docs/research/2026-11-21-lddgo-catalog-matrix.json"
STATUSES = {"existing", "partial", "missing", "not-comparable", "needs-source"}


def registered_definitions() -> dict[str, str]:
    """Follow the category arrays spread by registry.ts, not every definition file."""
    registry = (ROOT / "tools/registry.ts").read_text()
    categories = re.findall(r'import\s*\{\s*\w+\s*\}\s*from\s*"\./([^\"]+)"', registry)
    result = {}
    for category in categories:
        index = ROOT / "tools" / category / "index.ts"
        source = index.read_text()
        imports = dict(re.findall(r'import\s+(\w+)\s+from\s+"\./([^\"]+)"', source))
        array = re.search(r'export const \w+(?:\s*:\s*[^=]+)?\s*=\s*\[([^\]]+)\]', source, re.S)
        assert array, f"Cannot read category array: {index}"
        for variable in re.findall(r"\b\w+\b", array[1]):
            assert variable in imports, f"Unresolved array entry {variable}: {index}"
            definition = index.parent / f"{imports[variable]}.ts"
            match = re.search(r'\bslug:\s*"([^\"]+)"', definition.read_text())
            assert match, f"Missing slug: {definition}"
            slug = match[1]
            assert slug not in result, f"Duplicate registered slug: {slug}"
            result[slug] = definition.relative_to(ROOT).as_posix()
    return result


def validate(report: dict) -> dict:
    catalog = json.loads(CATALOG.read_text())
    catalog_by_id = {row["catalog_id"]: row for row in catalog["rows"]}
    registered = registered_definitions()
    rows = report["rows"]
    assert len(rows) == 72
    assert len({row["catalog_id"] for row in rows}) == len(rows)
    assert [row["catalog_id"] for row in rows] == sorted(row["catalog_id"] for row in rows)
    source_refs = 0
    source_files = set()
    for row in rows:
        peer = catalog_by_id[row["catalog_id"]]
        assert not peer.get("peer_review"), f"Historical exact-slug row repeated: {row['catalog_id']}"
        assert row["status"] in STATUSES
        assert row["peer_urls"] == {"zh": peer["url_zh"], "en": peer["url_en"]}
        assert row["peer_declared_scope"] == {"zh": peer["description_zh"], "en": peer["description_en"]}
        assert row["category_id"] == peer["category_id"]
        assert row["same_input_status"] == "unverified"
        assert row["peer_runtime_runs_in_this_batch"] == 0
        assert row["evidence_level"] == "E1-directory-and-local-source"
        assert row["local_evidence"]
        if row["status"] in {"missing", "not-comparable"}:
            assert not row["mapped_slugs"], row["catalog_id"]
        if row["status"] in {"existing", "partial"}:
            assert row["mapped_slugs"], row["catalog_id"]
        assert not set(row["mapped_slugs"]) & set(row["related_slugs_not_equivalent"])
        for slug in row["mapped_slugs"] + row["related_slugs_not_equivalent"]:
            assert slug in registered, f"Unregistered slug: {slug}"
            assert any(item["path"] == registered[slug] for item in row["local_evidence"])
        for item in row["local_evidence"]:
            path = ROOT / item["path"]
            assert path.is_file(), path
            lines = path.read_text().splitlines()
            assert 1 <= item["line"] <= len(lines), item
            actual = lines[item["line"] - 1].strip()
            assert item["anchor"] in actual, f"Stale source anchor: {item}"
            assert item["excerpt"] == actual, f"Stale source excerpt: {item}"
            assert item["file_sha256"] == hashlib.sha256(path.read_bytes()).hexdigest(), f"Changed reviewed source: {path}"
            source_refs += 1
            source_files.add(item["path"])
        expected_metadata = {
            lang: peer.get("page_seo", {}).get(lang)
            for lang in ("zh", "en") if peer.get("page_seo", {}).get(lang)
        }
        assert row["peer_detail_metadata_reused"] == expected_metadata
        for field in ("matched_workflow", "boundary_or_gap", "next_action", "workflow_group"):
            assert row[field], (row["catalog_id"], field)
    summary = report["summary"]
    assert summary["reviewed_catalog_rows"] == len(rows)
    assert summary["catalog_total"] == len(catalog["rows"])
    assert summary["category_counts"] == dict(Counter(row["category_zh"] for row in rows))
    assert summary["status_counts"] == dict(Counter(row["status"] for row in rows))
    assert summary["distinct_matched_zoyku_slugs"] == len({slug for row in rows for slug in row["mapped_slugs"]})
    assert summary["distinct_workflow_groups"] == len({row["workflow_group"] for row in rows})
    assert summary["rows_with_prior_url_mentions"] == sum(bool(row["prior_url_mentions"]) for row in rows)
    assert summary["rows_with_reused_detail_metadata"] == sum(bool(row["peer_detail_metadata_reused"]) for row in rows)
    assert summary["reused_detail_metadata_page_records"] == sum(len(row["peer_detail_metadata_reused"]) for row in rows)
    assert summary["new_network_requests"] == summary["peer_runtime_runs"] == 0
    assert summary["reviewed_exact_slug_historical_rows"] == 0
    return {"rows": len(rows), "statuses": summary["status_counts"], "registered_slugs_now": len(registered), "source_references": source_refs, "distinct_source_files": len(source_files), "same_input_runs": 0}


def escape_cell(value: str) -> str:
    return value.replace("|", "\\|").replace("\n", " ")


def render(report: dict) -> str:
    summary = report["summary"]
    lines = [
        "# LDDGO 语义能力映射批次 1", "",
        "日期：2026-11-21。读取官方已保存的中英文目录与本地当前源码；本批没有新增网络请求、提交表单或运行同行工具。", "",
        f"复核 **{summary['reviewed_catalog_rows']} 个目录条目**：字符 32、图片 22、文件 18。状态为 **existing 22、partial 19、missing 29、not-comparable 1、needs-source 1**。映射涉及 46 个不同的本地 slug、54 个工作流分组；这些数字都不是新增工具数、独立能力总数或完整等价率。", "",
        "原矩阵的 11 个精确 slug 历史复核全部排除；本批为新的目录 ID 语义复核。复用原 120 页分层样本中的 7 对 / 14 页元数据；它们仍是原抽样证据，不增加抓取覆盖率，也不升级为控件或运行时证据。", "",
        "所有条目的证据等级为 `E1-directory-and-local-source`：同行功能范围取自官方已保存的目录声明，本地功能取自实际引擎、注册参数和源码锚点。`existing` 只表示目录所述核心任务已可用，完整参数、结果、格式、速度、隐私、SEO 和无障碍均未证实等价。72 行的 `same_input_status` 均为 `unverified`。", "",
        "## 优先处理的工作流", "",
        "1. **先修正覆盖口径。** 图片水平/垂直翻转已在 `rotate-image`；PDF 顺序、删除和旋转已有三个注册入口；图片坐标拾取已在 `image-color-picker`。不应仅因目录名不同再次建内核。",
        "2. **图片/PDF 覆盖层合并排期。** 图片单张与批量水印都缺图片/logo 输入；PDF 水印和盖章也缺任意上传图片覆盖。对应 4 个目录条目（09-017、09-035、10-004、10-012），应先设计共享覆盖层，分别核验旋转、缩放、透明度及 PDF 页范围。",
        "3. **开发者工具按实际语法核对边界。** `json-path-query` 只解析点路径和数组索引；JSON5、JSON Schema 校验/推断/生成、XPath 和 Java/Golang/Python 正则运行时均不能用相邻工具充数。`json-yaml-converter` 注册的是 JSON→YAML，未挂载的反向引擎分支不算已交付。",
        "4. **扩展现有图片引擎。** 批量任意角旋转、JPEG/WebP 的 SVG 缩放输出、图片水印、额外滤镜、DPI 元数据编辑及更广元数据解析应分别定义输入输出契约。通用 `image/*` 接收范围不能作全格式支持证明。",
        "5. **文件工作流是实质缺口。** 通用 ZIP 压缩/解压、批量重命名、文件拆分、字符集检测/转换与魔数类型检测没有注册实现。内部 ZIP 下载、输出文件名 helper、MIME 静态表都不能作为完成证据。",
        "6. **PDF 密码能力保持未完成。** `unlock-pdf` 能检测加密但不会生成解锁产物；没有加密/权限设置能力。`flatten-pdf` 的表单扁平化不能代替加密或解密。PDF 页码的字体/颜色和 PDF 元数据编辑是另外的明确边界。", "",
        "这些优先级依据可复用内核、明确源码边界与客户端可行性整理；本批没有搜索量、排名或流量证据，实施前仍需目标工作流的同行控件/同输入核验。", "",
        "## 与并行实现的边界", "",
        "已读取 `lib/tool-copy.ts`：`unlockCopy`、`imageCompressionCopy`、`jsonCapabilityCopy` 等会覆盖定义文件的原始文案，判断以引擎可达分支、注册 props 和最终能力说明为依据。没有把旧 authored copy 的遗漏自动判成缺能力。", "",
        "检查时工作树扫描与注册数组有 216 个 slug。父任务正整合 `csv-table-editor` 与 `image-palette-generator`；本批未验证这两个新工具，也未将其或父任务的 Browserling 同输入记录算作本批成果。工作树数量不代表生产发布数量。", "",
        "## 逐行索引", "",
        "| 目录 ID | 中英文目录名称 | 状态 | 本地工作流 slug | 分组 |", "| --- | --- | --- | --- | --- |",
    ]
    for row in report["rows"]:
        local = ", ".join(f"`{slug}`" for slug in row["mapped_slugs"]) or "—"
        title = f"{row['title_zh']} / {row['title_en']}"
        lines.append(f"| [{row['catalog_id']}](#{row['catalog_id'].lower()}) | {escape_cell(title)} | `{row['status']}` | {local} | `{row['workflow_group']}` |")
    lines += ["", "## 逐行工作流与证据", ""]
    for row in report["rows"]:
        lines += [f"### {row['catalog_id']}", "", f"**{row['title_zh']} / {row['title_en']} — `{row['status']}`**", "", f"同行：[中文详情]({row['peer_urls']['zh']}) · [English]({row['peer_urls']['en']}) · [官方分类]({row['official_directory_sources']['zh_directory']})。目录声明：{row['peer_declared_scope']['zh']}", "", f"匹配工作流：{row['matched_workflow']}", "", f"边界：{row['boundary_or_gap']}", "", f"下一步（{row['priority']}）：{row['next_action']}", ""]
        if row["related_slugs_not_equivalent"]:
            lines += ["相邻但不等价：" + ", ".join(f"`{slug}`" for slug in row["related_slugs_not_equivalent"]) + "。", ""]
        source_links = [f"[{item['path']}:{item['line']}](../../{item['path']}#L{item['line']})" for item in row["local_evidence"]]
        lines += ["源码：" + "；".join(source_links) + "。", ""]
        if row["peer_detail_metadata_reused"]:
            lines += ["历史详情元数据：复用原 120 页样本中的中英文记录；本批未重新请求，没有运行时证据。", ""]
    lines += ["## 复核与重放", "", "机器可读数据保留各行的中英文官方目录原文、匹配/相邻 slug、工作流分组、源码路径/行号/摘录/SHA-256 与复用元数据：", "", "- [JSON 报告](2026-11-21-lddgo-semantic-batch1.json)", "- [校验和报告生成脚本](../../scripts/research/lddgo-semantic-batch1.py)", "", "```sh", "python3 scripts/research/lddgo-semantic-batch1.py --render", "python3 scripts/research/lddgo-semantic-batch1.py --check", "```", "", "脚本默认只校验；`--render` 只从本批 JSON 重建本批 Markdown，不发网络请求，不修改原 420 行矩阵、中央文档或应用源码。源文件变化会让 SHA-256/行锚点校验失败，要求重新阅读受影响的能力边界。", ""]
    return "\n".join(lines)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--render", action="store_true", help="render this batch's Markdown after validating")
    parser.add_argument("--check", action="store_true", help="also verify Markdown matches JSON")
    args = parser.parse_args()
    report = json.loads(REPORT.read_text())
    evidence = validate(report)
    markdown = render(report)
    if args.render:
        MARKDOWN.write_text(markdown)
    if args.check:
        assert MARKDOWN.read_text() == markdown, "Stale Markdown; run --render"
    print(json.dumps({"status": "ok", **evidence}, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
