#!/usr/bin/env python3
"""Fetch and snapshot LDDGO's public tool-directory cards."""

from __future__ import annotations

import argparse
import hashlib
import json
import re
import sys
import time
import urllib.error
import urllib.request
from collections import Counter
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlparse


ROOT = Path(__file__).resolve().parents[2]
OUT_JSON = ROOT / "docs/research/2026-11-21-lddgo-catalog-matrix.json"
OUT_MD = ROOT / "docs/research/2026-11-21-lddgo-catalog-matrix.md"
BASE = "https://www.lddgo.net"
ROBOTS_URL = f"{BASE}/robots.txt"
METADATA_DELAY_SECONDS = 0.6
METADATA_FIELDS = ("title", "h1", "meta_description", "meta_keywords", "canonical",
                   "self_canonical", "json_ld_types")
CATEGORY_NAMES = {
    1: ("字符", "STRING"),
    2: ("转换", "CONVERTER"),
    3: ("加密", "ENCRYPT"),
    4: ("网络", "NETWORK"),
    5: ("更多", "MORE"),
    6: ("图表", "CHART"),
    7: ("数学", "MATH"),
    8: ("坐标", "COORDINATE"),
    9: ("图片", "IMAGE"),
    10: ("文件", "FILE"),
}
ROUTE_ROOTS = {
    "string", "convert", "encrypt", "network", "common", "chart", "math",
    "coordinate", "image", "file", "code", "doc", "ai", "modernimg", "modernsvg",
}


def fetch(url: str) -> str:
    request = urllib.request.Request(url, headers={"User-Agent": "ZoykuResearch/1.0"})
    with urllib.request.urlopen(request, timeout=25) as response:
        return response.read().decode(response.headers.get_content_charset() or "utf-8", errors="replace")


def clean_text(value: str) -> str:
    return re.sub(r"\s+", " ", value).strip()


class PageMetadataParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.title_parts: list[str] = []
        self.h1_parts: list[str] = []
        self.meta_description = ""
        self.meta_keywords = ""
        self.canonical = ""
        self.json_ld_types: list[str] = []
        self._json_ld_parts: list[str] = []
        self._capture: str | None = None
        self._inside_json_ld = False

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attr_map = {key.lower(): value or "" for key, value in attrs}
        if tag.lower() == "title":
            self._capture = "title"
        elif tag.lower() == "h1":
            self._capture = "h1"
        elif tag.lower() == "meta" and attr_map.get("name", "").lower() == "description":
            self.meta_description = clean_text(attr_map.get("content", ""))
        elif tag.lower() == "meta" and attr_map.get("name", "").lower() == "keywords":
            self.meta_keywords = clean_text(attr_map.get("content", ""))
        elif tag.lower() == "link" and "canonical" in attr_map.get("rel", "").lower().split():
            self.canonical = attr_map.get("href", "")
        elif tag.lower() == "script" and attr_map.get("type", "").lower() == "application/ld+json":
            self._inside_json_ld = True
            self._json_ld_parts = []

    def handle_endtag(self, tag: str) -> None:
        if tag.lower() == "title" and self._capture == "title":
            self._capture = None
        elif tag.lower() == "h1" and self._capture == "h1":
            self._capture = None
        elif tag.lower() == "script" and self._inside_json_ld:
            raw = "".join(self._json_ld_parts).strip()
            self._inside_json_ld = False
            try:
                data = json.loads(raw)
                items = data if isinstance(data, list) else [data]
                for item in items:
                    if isinstance(item, dict):
                        types = item.get("@type", [])
                        self.json_ld_types.extend([types] if isinstance(types, str) else types)
            except (json.JSONDecodeError, TypeError):
                self.json_ld_types.append("unparseable_json_ld")

    def handle_data(self, data: str) -> None:
        if self._inside_json_ld:
            self._json_ld_parts.append(data)
        if self._capture == "title":
            self.title_parts.append(data)
        elif self._capture == "h1":
            self.h1_parts.append(data)

    def result(self) -> dict[str, str | None]:
        return {
            "title": clean_text("".join(self.title_parts)) or None,
            "meta_description": self.meta_description or None,
            "meta_keywords": self.meta_keywords or None,
            "h1": clean_text("".join(self.h1_parts)) or None,
            "canonical": self.canonical or None,
            "json_ld_types": sorted(set(self.json_ld_types)),
        }


def fetch_page_metadata(
    url: str, opener: urllib.request.OpenerDirector | None = None,
) -> dict[str, object]:
    try:
        request = urllib.request.Request(url, headers={"User-Agent": "ZoykuResearch/1.0"})
        open_page = opener.open if opener else urllib.request.urlopen
        with open_page(request, timeout=12) as response:
            html = response.read().decode(response.headers.get_content_charset() or "utf-8", errors="replace")
            response_status = response.status
            final_url = response.geturl()
        parser = PageMetadataParser()
        parser.feed(html)
        result = parser.result()
        result["status"] = "ok" if response_status < 400 else "http_error"
        result["http_status"] = response_status
        result["final_url"] = final_url
        result["self_canonical"] = bool(result["canonical"] and urljoin(final_url, result["canonical"]) == final_url)
        return result
    except urllib.error.HTTPError as error:
        return {
            "title": None,
            "meta_description": None,
            "meta_keywords": None,
            "h1": None,
            "canonical": None,
            "json_ld_types": [],
            "status": "http_error",
            "http_status": error.code,
            "final_url": error.geturl(),
        }
    except Exception as error:  # noqa: BLE001 - capture source failures in the matrix
        return {
            "title": None,
            "meta_description": None,
            "meta_keywords": None,
            "h1": None,
            "canonical": None,
            "json_ld_types": [],
            "status": f"error:{type(error).__name__}",
            "http_status": None,
            "final_url": None,
        }


class DirectoryParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.cards: list[dict[str, str]] = []
        self.card: dict[str, str] | None = None
        self.stack: list[tuple[str, str]] = []
        self.capture: str | None = None
        self.capture_depth = 0
        self.parts: list[str] = []

    @staticmethod
    def classes(attrs: list[tuple[str, str | None]]) -> set[str]:
        values = dict(attrs).get("class") or ""
        return set(values.split())

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        classes = self.classes(attrs)
        attr_map = dict(attrs)
        parent = self.stack[-1][1] if self.stack else ""
        if tag == "div" and "tool_box_layout" in classes:
            self.card = {"title": "", "description": "", "href": ""}
        elif self.card is not None and tag == "a" and parent == "tool_box_use" and not self.card["href"]:
            self.card["href"] = attr_map.get("href") or ""
        elif self.card is not None and tag == "h3" and "tool_box_title" in classes:
            self.capture = "title"
            self.capture_depth = len(self.stack)
            self.parts = []
        elif self.card is not None and tag == "p" and "tool_box_desc" in classes:
            self.capture = "description"
            self.capture_depth = len(self.stack)
            self.parts = []
        self.stack.append((tag, "tool_box_use" if "tool_box_use" in classes else (self.stack[-1][1] if self.stack else "")))

    def handle_endtag(self, tag: str) -> None:
        if self.capture and self.stack and len(self.stack) - 1 == self.capture_depth:
            if self.card is not None:
                self.card[self.capture] = clean_text("".join(self.parts))
            self.capture = None
            self.parts = []
        if tag == "div" and self.card is not None:
            current_classes = self._last_classes
            if "tool_box_layout" in current_classes:
                if self.card.get("href"):
                    self.cards.append(self.card)
                self.card = None
        if self.stack:
            self.stack.pop()

    def handle_data(self, data: str) -> None:
        if self.capture:
            self.parts.append(data)

    @property
    def _last_classes(self) -> set[str]:
        # Track the open tag's classes separately; HTMLParser does not pass them to handle_endtag.
        return self._classes_stack[-1] if self._classes_stack else set()

    def feed(self, data: str) -> None:  # type: ignore[override]
        self._classes_stack: list[set[str]] = []
        super().feed(data)

    def handle_startendtag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        self.handle_starttag(tag, attrs)
        self.handle_endtag(tag)


def parse_directory(html: str) -> list[dict[str, str]]:
    parser = DirectoryParser()
    parser._classes_stack = []
    original_start = parser.handle_starttag
    original_end = parser.handle_endtag

    def start(tag: str, attrs: list[tuple[str, str | None]]) -> None:
        parser._classes_stack.append(parser.classes(attrs))
        original_start(tag, attrs)

    def end(tag: str) -> None:
        original_end(tag)
        if parser._classes_stack:
            parser._classes_stack.pop()

    parser.handle_starttag = start  # type: ignore[method-assign]
    parser.handle_endtag = end  # type: ignore[method-assign]
    parser.feed(html)
    return parser.cards


def registry_entries() -> list[dict[str, str]]:
    entries = []
    tools_dir = ROOT / "tools"
    for path in sorted(tools_dir.rglob("*.ts")):
        relative = path.relative_to(tools_dir)
        if relative.parts[0].startswith("_") or path.name == "index.ts":
            continue
        source = path.read_text(encoding="utf-8")
        slug_match = re.search(r'\bslug:\s*"([^"]+)"', source)
        en_match = re.search(r'\ben:\s*\{\s*\n?\s*name:\s*"([^"]+)"', source)
        zh_match = re.search(r'\bzh:\s*\{\s*\n?\s*name:\s*"([^"]+)"', source)
        if slug_match:
            entries.append({
                "slug": slug_match.group(1),
                "en_name": en_match.group(1) if en_match else "",
                "zh_name": zh_match.group(1) if zh_match else "",
                "source": str(path.relative_to(ROOT)),
            })
    return entries


def classify_target(url: str) -> tuple[str, str]:
    parsed = urlparse(url)
    path = parsed.path
    if parsed.netloc and parsed.netloc.lower() != "www.lddgo.net":
        return "external", "not-comparable"
    if "//" in path[1:]:
        return "malformed_route", "needs-source"
    if path.startswith("/doc/"):
        return "documentation", "not-comparable"
    if path.startswith(("/modernimg/", "/modernsvg/")):
        return "web_application", "not-comparable"
    return "same_origin_tool", "needs-source"


def norm_path(url: str) -> str:
    parsed = urlparse(url)
    path = parsed.path.rstrip("/")
    path = re.sub(r"^/en(?=/)", "", path)
    host = parsed.netloc.lower()
    return f"{host}{path}" if host and host != "www.lddgo.net" else path


def slug_candidates(url: str, registry: list[dict[str, str]]) -> list[dict[str, str]]:
    leaf = urlparse(url).path.rstrip("/").split("/")[-1].lower()
    leaf_norm = re.sub(r"[^a-z0-9]+", "-", leaf).strip("-")
    exact = [entry for entry in registry if entry["slug"].lower() == leaf_norm]
    if exact:
        return [{**entry, "basis": "exact_route_leaf", "confidence": "high_slug_only"} for entry in exact]
    return []


def homepage_count(url: str, locale: str) -> tuple[int, str]:
    html = fetch(url)
    text = re.sub(r"<[^>]+>", " ", html)
    text = clean_text(text)
    pattern = r"(\d+)\s*个在线工具" if locale == "zh" else r"(\d+)\s+online tools"
    match = re.search(pattern, text, re.IGNORECASE)
    if not match:
        raise RuntimeError(f"Could not extract displayed tool count from {url}")
    return int(match.group(1)), match.group(0)


def robots_disallow_prefixes(text: str) -> tuple[str, ...]:
    # This source currently publishes only literal prefixes in its wildcard group.
    in_wildcard_group = False
    found_group = False
    prefixes = []
    for line in text.splitlines():
        key, _, value = line.partition("#")[0].partition(":")
        key, value = key.strip().lower(), value.strip()
        if key == "user-agent":
            in_wildcard_group = value == "*"
            found_group |= in_wildcard_group
        elif in_wildcard_group and key == "disallow" and value:
            if "*" in value or "$" in value:
                raise RuntimeError("LDDGO wildcard robots rules changed; inspect them before fetching pages")
            prefixes.append(value)
    if not found_group:
        raise RuntimeError("No wildcard user-agent group found in LDDGO robots.txt")
    return tuple(prefixes)


def collect_metadata(rows: list[dict], per_category: int) -> dict:
    robots = fetch(ROBOTS_URL)
    blocked = robots_disallow_prefixes(robots)

    def allowed(url: str) -> bool:
        parsed = urlparse(url)
        return (
            parsed.scheme == "https"
            and parsed.netloc == "www.lddgo.net"
            and classify_target(url)[0] == "same_origin_tool"
            and not parsed.path.startswith(blocked)
        )

    class SafeRedirects(urllib.request.HTTPRedirectHandler):
        def redirect_request(self, req, fp, code, msg, headers, newurl):
            # Keep redirects in bounds and avoid fetching a second page automatically.
            return None

    opener = urllib.request.build_opener(SafeRedirects())
    counts = {}
    status = Counter()
    fields = Counter({key: 0 for key in METADATA_FIELDS})
    stop_status = None
    for category in CATEGORY_NAMES:
        eligible = [
            row for row in rows
            if row["category_id"] == category
            and row["language_pairing_basis"] == "normalized_destination"
            and all(row.get(f"url_{lang}") and allowed(row[f"url_{lang}"]) for lang in ("zh", "en"))
        ]
        sample_size = min(per_category, len(eligible))
        sample = [
            eligible[((2 * index + 1) * len(eligible)) // (2 * sample_size)]
            for index in range(sample_size)
        ]
        category_stats = {"eligible_pairs": len(eligible), "selected_pairs": len(sample),
                          "attempted_pages": 0, "success_pages": 0}
        counts[str(category)] = category_stats
        for row in sample:
            if stop_status:
                break
            row["page_seo"]["collection_status"] = "metadata_sampled"
            for lang in ("zh", "en"):
                time.sleep(METADATA_DELAY_SECONDS)
                record = fetch_page_metadata(row[f"url_{lang}"], opener)
                row["page_seo"][lang] = record
                category_stats["attempted_pages"] += 1
                status[str(record["http_status"] or record["status"])] += 1
                if record["status"] == "ok":
                    category_stats["success_pages"] += 1
                    for key in METADATA_FIELDS:
                        if record.get(key):
                            fields[key] += 1
                if record["http_status"] in (429, 503):
                    stop_status = record["http_status"]
                    break
            row["canonical_verified"] = all(
                (row["page_seo"][lang] or {}).get("self_canonical") for lang in ("zh", "en")
            )
        print(f"{CATEGORY_NAMES[category][1]}: {category_stats}", file=sys.stderr, flush=True)

    return {
        "observed_at_utc": datetime.now(timezone.utc).replace(microsecond=0).isoformat(),
        "robots_url": ROBOTS_URL,
        "robots_sha256": hashlib.sha256(robots.encode()).hexdigest(),
        "robots_wildcard_disallow_prefixes": list(blocked),
        "method": "single sequential GET, stratified by category and directory position",
        "delay_seconds": METADATA_DELAY_SECONDS,
        "requested_pairs_per_category": per_category,
        "categories": counts,
        "page_records": sum(status.values()),
        "http_status_counts": dict(status),
        "field_counts_among_successes": dict(fields),
        "stopped_after_http_status": stop_status,
    }


def main() -> int:
    argparser = argparse.ArgumentParser(description=__doc__)
    argparser.add_argument("--fetch-page-metadata", action="store_true", help="sample public detail page metadata")
    argparser.add_argument("--metadata-per-category", type=int, default=6, choices=range(1, 13),
                           help="number of bilingual tool pairs sampled in each category, 1–12 (default 6)")
    args = argparser.parse_args()
    fetch_metadata = args.fetch_page_metadata
    registry = registry_entries()
    homepage_zh_count, homepage_zh_text = homepage_count(f"{BASE}/", "zh")
    homepage_en_count, homepage_en_text = homepage_count(f"{BASE}/en/index", "en")
    category_rows: dict[tuple[int, str], list[dict[str, str]]] = {}
    category_titles: dict[tuple[int, str], str] = {}
    for lang in ("zh", "en"):
        for category_id, (zh_name, en_name) in CATEGORY_NAMES.items():
            path = f"/{'en/' if lang == 'en' else ''}base/class?classID={category_id}"
            html = fetch(urljoin(BASE, path))
            cards = parse_directory(html)
            category_rows[(category_id, lang)] = cards
            category_titles[(category_id, lang)] = en_name if lang == "en" else zh_name

    zh_by_path: dict[str, dict[str, str]] = {}
    en_by_path: dict[str, dict[str, str]] = {}
    for category_id, (_, code) in CATEGORY_NAMES.items():
        for lang, target in (("zh", zh_by_path), ("en", en_by_path)):
            for card in category_rows[(category_id, lang)]:
                href = urljoin(BASE, card["href"])
                key = norm_path(href)
                if key not in target:
                    target[key] = {**card, "category_id": str(category_id), "category_code": code, "url": href}

    rows = []
    seen = set()
    for category_id, (zh_name, en_name) in CATEGORY_NAMES.items():
        zh_cards = category_rows[(category_id, "zh")]
        en_cards = category_rows[(category_id, "en")]
        for card_index, zh_card in enumerate(zh_cards, start=1):
            zh_url = urljoin(BASE, zh_card["href"])
            key = norm_path(zh_url)
            en_card = en_by_path.get(key)
            pairing_basis = "normalized_destination" if en_card else "same_category_card_position"
            if en_card is None and card_index <= len(en_cards):
                en_card = en_cards[card_index - 1]
            en_url = urljoin(BASE, en_card["href"]) if en_card else None
            en_target_type, _ = classify_target(en_url) if en_url else (None, None)
            target_type, status = classify_target(zh_url)
            if key in seen:
                duplicate = True
            else:
                duplicate = False
                seen.add(key)
            candidates = slug_candidates(zh_url, registry) if target_type == "same_origin_tool" else []
            if candidates and status == "needs-source":
                status = "needs-source"
            rows.append({
                "catalog_id": f"LDDGO-{category_id:02d}-{card_index:03d}",
                "category_id": category_id,
                "category_zh": zh_name,
                "category_en": en_name,
                "title_zh": zh_card["title"],
                "description_zh": zh_card["description"],
                "url_zh": zh_url,
                "title_en": en_card["title"] if en_card else None,
                "description_en": en_card["description"] if en_card else None,
                "url_en": en_url,
                "target_type": target_type,
                "english_target_type": en_target_type,
                "language_pairing_basis": pairing_basis if en_card else "unpaired",
                "english_route_malformed": bool(en_url and classify_target(en_url)[0] == "malformed_route"),
                "page_seo": {
                    "zh": None,
                    "en": None,
                    "keyword_volume_or_rank": None,
                    "collection_status": "not_selected_for_metadata_sample" if fetch_metadata else "not_fetched_in_catalog_snapshot",
                },
                "canonical_verified": False,
                "duplicate_destination_after_language_normalization": duplicate,
                "zoyku_slug_candidates": candidates,
                "mapping_status": status,
                "evidence": {
                    "zh_directory": f"{BASE}/base/class?classID={category_id}",
                    "en_directory": f"{BASE}/en/base/class?classID={category_id}",
                    "capture_method": "tool_box_layout card / tool_box_title / tool_box_desc / tool_box_use first anchor",
                },
            })

    metadata = collect_metadata(rows, args.metadata_per_category) if fetch_metadata else None
    metadata_records = metadata["page_records"] if metadata else 0
    metadata_status_counts = metadata["http_status_counts"] if metadata else {}
    observed_at = datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")
    counts_by_category = {
        str(category_id): len(category_rows[(category_id, "zh")])
        for category_id in CATEGORY_NAMES
    }
    unique_zh = len({norm_path(row["url_zh"]) for row in rows})
    exact_slug_rows = sum(bool(row["zoyku_slug_candidates"]) for row in rows)
    target_counts = Counter(row["target_type"] for row in rows)
    summary = {
        "observed_at_utc": observed_at,
        "official_homepage_display_count_zh": homepage_zh_count,
        "official_homepage_display_text_zh": homepage_zh_text,
        "official_homepage_display_count_en": homepage_en_count,
        "official_homepage_display_text_en": homepage_en_text,
        "category_card_rows_zh": len(rows),
        "category_card_rows_en": sum(len(category_rows[(category_id, "en")]) for category_id in CATEGORY_NAMES),
        "unique_zh_destinations_after_language_normalization": unique_zh,
        "rows_with_exact_local_slug_candidate": exact_slug_rows,
        "target_type_counts": dict(target_counts),
        "category_counts": counts_by_category,
        "registry_entries_scanned": len(registry),
        "metadata_sweep_enabled": fetch_metadata,
        "metadata_page_records": metadata_records,
        "metadata_http_status_counts": metadata_status_counts,
        "metadata_sample": metadata,
        "limitations": [
            "Exact route-leaf matches are candidates only; slug equality does not prove equivalent behavior.",
            "No same-input competitor tool operation was performed by this snapshot script.",
            "Keyword volume/rank, detailed interaction behavior and competitor accessibility were not audited.",
            "Rows without exact slug candidates remain needs-source rather than being asserted missing.",
        ],
    }
    payload = {
        "schema_version": 1,
        "title": "LDDGO official directory catalog snapshot and preliminary Zoyku mapping",
        "source": "Official LDDGO category card pages",
        "summary": summary,
        "rows": rows,
    }
    OUT_JSON.parent.mkdir(parents=True, exist_ok=True)
    OUT_JSON.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    markdown = [
        "# LDDGO 官方目录快照与 Zoyku 初步映射",
        "",
        f"抓取时间：{observed_at}。来源为 LDDGO 官方中英文首页及 20 个分类页。",
        "",
        "## 计数",
        "",
        f"- 中文分类页卡片：{len(rows)}；语言归一化后的唯一目标：{unique_zh}。",
        f"- 英文分类页卡片：{summary['category_card_rows_en']}。",
        f"- 本地 registry 定义扫描：{len(registry)}。",
        f"- 路由叶段与本地 slug 完全相同的候选：{exact_slug_rows}；这只说明 slug 相同，不证明功能等价。",
        f"- 目标类型：`{json.dumps(dict(target_counts), ensure_ascii=False)}`。",
        "",
        "| 分类 | 中文卡片数 | 英文卡片数 |",
        "| --- | ---: | ---: |",
    ]
    for category_id, (zh_name, en_name) in CATEGORY_NAMES.items():
        markdown.append(f"| {zh_name} {en_name} | {len(category_rows[(category_id, 'zh')])} | {len(category_rows[(category_id, 'en')])} |")
    markdown.extend([
        "",
        "## 映射规则与限制",
        "",
        "- 每条卡片保留中英文标题、简介、目标链接及对应官方分类页证据。",
        "- 只自动生成 route leaf 与 Zoyku slug 完全相同的候选；即使完全相同也保留 `needs-source`，需人工确认场景和功能范围。",
        "- 外部链接、文档页、独立 Web 应用标记为 `not-comparable`；格式异常路径标记 `needs-source`。",
        "- 未找到精确候选不等同于缺失；未逐页核查的同义能力不猜测，均保留 `needs-source`。",
        "- 本快照不包含同输入功能测试、关键词搜索量/排名或同行无障碍审计。",
        "",
    ])
    if metadata:
        eligible_pairs = sum(row["eligible_pairs"] for row in metadata["categories"].values())
        eligible_pages = 2 * eligible_pairs
        coverage = metadata_records / eligible_pages if eligible_pages else 0
        markdown.extend([
            "## 详情页抽样",
            "",
            f"已请求 {metadata_records} 个详情页。可采的 {eligible_pairs} 对中英文链接共 {eligible_pages} 页，"
            f"本次覆盖率为 {coverage:.1%}。HTTP 状态分布为 `{json.dumps(metadata_status_counts)}`。",
            "",
            "样本按各分类中目录位置等距选取。每次串行请求间隔至少 0.6 秒。"
            "采集范围和排除路径依据采集时的 [robots.txt](https://www.lddgo.net/robots.txt)。"
            "仅选取官方目录中可按路径配对的同源工具，外链、文档、独立应用和路径异常归入未抽样项。",
            "",
            "| 分类 | 可采配对 | 样本配对 | 已请求页面 | 成功页面 |",
            "| --- | ---: | ---: | ---: | ---: |",
        ])
        for category_id, (zh_name, en_name) in CATEGORY_NAMES.items():
            stat = metadata["categories"][str(category_id)]
            markdown.append(f"| {zh_name} {en_name} | {stat['eligible_pairs']} | {stat['selected_pairs']} | "
                            f"{stat['attempted_pages']} | {stat['success_pages']} |")
        markdown.extend([
            "",
            f"成功页面的字段计数为 `{json.dumps(metadata['field_counts_among_successes'])}`。"
            "自指 canonical 按实际响应 URL 比较。字段计数反映 HTML 内的标签，交互和渲染表现需另行验证。",
            "",
        ])
        if metadata["stopped_after_http_status"]:
            markdown.extend([f"收到 HTTP {metadata['stopped_after_http_status']} 后结束本次采集。", ""])
    markdown.extend([
        "机器可读逐行数据：[`2026-11-21-lddgo-catalog-matrix.json`](2026-11-21-lddgo-catalog-matrix.json)。",
        "",
        "## 刷新",
        "",
        "在 `toolsite` 目录运行：",
        "",
        "```sh",
        "python3 scripts/research/lddgo-catalog-snapshot.py",
        "python3 scripts/research/lddgo-catalog-snapshot.py --fetch-page-metadata",
        "```",
        "",
    ])
    OUT_MD.write_text("\n".join(markdown), encoding="utf-8")

    print(json.dumps({
        "json": str(OUT_JSON),
        "markdown": str(OUT_MD),
        "row_count": len(rows),
        "unique_zh_destinations": unique_zh,
        "category_counts": counts_by_category,
        "english_row_count": summary["category_card_rows_en"],
        "exact_slug_candidates": exact_slug_rows,
        "target_type_counts": dict(target_counts),
    }, ensure_ascii=False, indent=2))
    if (
        len(rows) != homepage_zh_count
        or summary["category_card_rows_en"] != homepage_en_count
        or unique_zh != len(rows)
        or homepage_zh_count != homepage_en_count
    ):
        print("Directory count or destination uniqueness mismatch; inspect the generated snapshot.", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
