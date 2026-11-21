#!/usr/bin/env python3
"""Derive a readable remaining-work report without changing evidence classifications."""
import json
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
RESEARCH = ROOT / "docs/research"


def generate():
    comparison = json.loads((RESEARCH / "2026-11-21-lddgo-full-comparison.json").read_text())
    catalog = json.loads((RESEARCH / "2026-11-21-lddgo-catalog-matrix.json").read_text())
    categories = {row["category_id"]: row["category_zh"] for row in catalog["rows"]}
    rows = comparison["rows"]
    assert len(rows) == len({row["catalog_id"] for row in rows}) == 420
    counts = Counter(row["status"] for row in rows)
    lines = [
        "# LDDGO 尚未补齐的工作流",
        "",
        "由[420 项完整语义对照](2026-11-21-lddgo-full-comparison.md)自动生成，保留每项同行入口及具体缺口。",
        "",
        f"当前：{counts['missing']} 项缺失、{counts['partial']} 项部分覆盖、{counts['needs-source']} 项待来源。另有 {counts['existing']} 项核心已有、{counts['not-comparable']} 项不可比。",
        "",
        "这是同行目录条目，不是独立工具数量；同一内核的单个/批量、不同选项和重复分类需要合并实施。待来源项目须先明确标准、数据或真实产品语义。完整已有项目的资源限制仍在原对照中。",
        "",
        "| 分类 | 缺失 | 部分覆盖 | 待来源 |",
        "| --- | --- | --- | --- |",
    ]
    for category, name in sorted(categories.items()):
        subset = Counter(row["status"] for row in rows if row["category_id"] == category)
        lines.append(f"| {name} | {subset['missing']} | {subset['partial']} | {subset['needs-source']} |")
    labels = {"missing": "尚缺核心工作流", "partial": "已有部分，仍需补全", "needs-source": "先补标准或需求来源"}
    for status, label in labels.items():
        lines.extend(["", f"## {label}", ""])
        for category, name in sorted(categories.items()):
            subset = [row for row in rows if row["category_id"] == category and row["status"] == status]
            if not subset:
                continue
            lines.extend([f"### {name}（{len(subset)} 项）", "", "| 同行条目 | 工作流 | 具体缺口 |", "| --- | --- | --- |"])
            for row in subset:
                escape = lambda value: str(value).replace("|", "\\|").replace("\n", " ")
                title = escape(row["title_zh"])
                gap = escape(row.get("delivery_update") or row["boundary_or_gap"])
                lines.append(f"| {row['catalog_id']} · [{title}]({row['peer_url']}) | {escape(row.get('workflow_group', ''))} | {gap} |")
            lines.append("")
    lines.extend(["[正在实施的分组队列](2026-11-22-gap-delivery-queue.md)。其他同行见[具名网站入口](2026-11-21-named-peer-catalogs.md)及[交付与研究总交接](2026-11-21-competitor-parity-handoff.md)。", ""])
    destination = RESEARCH / "2026-11-22-lddgo-open-workflows.md"
    destination.write_text("\n".join(lines))
    print(json.dumps({"output": str(destination.relative_to(ROOT)), "status_counts": dict(counts)}, ensure_ascii=False))


if __name__ == "__main__":
    generate()
