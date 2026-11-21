#!/usr/bin/env python3
"""Snapshot publicly linked tool catalogs and a fixed sample of detail pages."""

import argparse
from collections import Counter
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime
import hashlib
from html.parser import HTMLParser
import json
from pathlib import Path
import re
from urllib.error import HTTPError, URLError
from urllib.parse import urljoin, urlsplit, urlunsplit
from urllib.request import Request, urlopen
from xml.etree import ElementTree
from zoneinfo import ZoneInfo


CATALOGS = (
    ("Browserling", "developer", "https://www.browserling.com/tools", "browserling"),
    ("OnlineTools", "text", "https://onlinetexttools.com/", "online-tools"),
    ("OnlineTools", "string", "https://onlinestringtools.com/", "online-tools"),
    ("OnlineTools", "json", "https://onlinetools.com/json", "online-tools"),
    ("OnlineTools", "unicode", "https://onlinetools.com/unicode", "online-tools"),
    ("OnlineTools", "image", "https://onlinetools.com/image", "online-tools"),
    ("OnlineTools", "png", "https://onlinepngtools.com/", "online-tools"),
    ("Code Beautify", "developer", "https://codebeautify.org/", "code-beautify"),
    ("iLovePDF", "pdf", "https://www.ilovepdf.com/", "ilove"),
    ("iLoveIMG", "image", "https://www.iloveimg.com/", "ilove"),
    ("Text Mechanic", "text", "https://textmechanic.com/", "text-mechanic"),
    ("TableConvert", "tabular conversions", "https://tableconvert.com/", "table-convert"),
    ("CSS Portal", "css generators", "https://www.cssportal.com/css-generators.php", "css-portal"),
    ("WebFX", "marketing", "https://www.webfx.com/tools/", "webfx"),
    ("Ezgif", "sitemap", "https://ezgif.com/sitemap.xml", "sitemap"),
)

DETAILS = (
    "https://www.browserling.com/tools/csv-swap-columns",
    "https://www.browserling.com/tools/csv-columns-to-rows",
    "https://onlinetexttools.com/convert-comma-to-column",
    "https://onlinepngtools.com/extract-png-color-palette",
    "https://onlinetools.com/json/convert-tsv-to-json",
    "https://onlinetools.com/unicode/split-unicode-into-characters",
    "https://onlinetools.com/image/find-image-color-palette",
    "https://www.ilovepdf.com/repair-pdf",
    "https://www.iloveimg.com/resize-image",
    "https://tableconvert.com/excel-to-sql",
    "https://www.cssportal.com/css-animation-generator/",
    "https://ezgif.com/split",
    "https://ezgif.com/webp-maker",
    "https://ezgif.com/target-size-compressor",
    "https://ezgif.com/crop-pdf",
)

VOID_TAGS = set("area base br col embed hr img input link meta param source track wbr".split())
MAX_BYTES = 6_000_000


def clean(value):
    return " ".join(value.split())


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.stack = []
        self.links = []
        self.title = ""
        self.h1 = []
        self.description = None
        self.canonical = None
        self.hreflang = 0
        self.json_ld = 0

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "meta" and attrs.get("name", "").lower() == "description":
            self.description = clean(attrs.get("content", ""))
        if tag == "link":
            if "canonical" in attrs.get("rel", "").lower().split():
                self.canonical = attrs.get("href")
            if attrs.get("hreflang"):
                self.hreflang += 1
        if tag == "script" and attrs.get("type") == "application/ld+json":
            self.json_ld += 1
        if tag in VOID_TAGS:
            return
        if tag == "a" and attrs.get("href"):
            anchor = {
                "href": attrs["href"],
                "title": attrs.get("title") or "",
                "classes": set(attrs.get("class", "").split()),
                "ancestors": tuple(self.stack),
                "text": "",
            }
            self.links.append(anchor)
            attrs["_anchor"] = anchor
        if tag == "h1":
            self.h1.append("")
        self.stack.append((tag, set(attrs.get("class", "").split()), attrs.get("id"), attrs))

    def handle_endtag(self, tag):
        for index in range(len(self.stack) - 1, -1, -1):
            if self.stack[index][0] == tag:
                del self.stack[index:]
                break

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in VOID_TAGS:
            self.handle_endtag(tag)

    def handle_data(self, data):
        for tag, _, _, attrs in reversed(self.stack):
            if tag == "a" and "_anchor" in attrs:
                attrs["_anchor"]["text"] += data
                break
            if tag == "title":
                self.title += data
                break
            if tag == "h1":
                self.h1[-1] += data
                break


def fetch(url):
    request = Request(url, headers={"User-Agent": "Zoyku catalog research/1.0"})
    try:
        with urlopen(request, timeout=20) as response:
            body = response.read(MAX_BYTES + 1)
            if len(body) > MAX_BYTES:
                raise RuntimeError(f"response exceeds {MAX_BYTES} bytes: {url}")
            metadata = {
                "sourceUrl": url,
                "finalUrl": response.url,
                "status": response.status,
                "sha256": hashlib.sha256(body).hexdigest(),
                "bytes": len(body),
            }
            return metadata, body
    except HTTPError as error:
        return {"sourceUrl": url, "finalUrl": error.url, "status": error.code,
                "error": str(error.reason)}, None
    except (TimeoutError, URLError) as error:
        return {"sourceUrl": url, "status": None, "error": str(error)}, None


def normalized_url(base, href):
    if href.startswith("#"):
        return None
    parts = urlsplit(urljoin(base, href))
    if parts.scheme not in ("http", "https") or parts.netloc != urlsplit(base).netloc:
        return None
    return urlunsplit((parts.scheme, parts.netloc, parts.path.rstrip("/") or "/", "", ""))


def catalog_group(rule, label, anchor, path):
    ancestors = anchor["ancestors"]
    classes = set().union(*(classes for _, classes, _, _ in ancestors))
    ids = {element_id for _, _, element_id, _ in ancestors if element_id}
    if rule == "browserling" and "tool-category-list-list-entry" in classes and path.startswith("/tools/"):
        parent = next((value for value in ids if value.startswith("tool-category-list-")), "")
        return parent.removeprefix("tool-category-list-") or label
    if rule == "online-tools" and "card-header" in classes and "block-all-tools" in ids:
        return label
    if rule == "code-beautify" and "funbtn" in anchor["classes"] and "hero-body" in classes:
        return label
    if rule == "ilove" and "tools__item" in classes:
        return label
    if rule == "text-mechanic" and "sub-menu" in classes and path.startswith("/text-tools/"):
        return path.split("/")[2]
    if rule == "table-convert" and "tc-main" in ids and re.fullmatch(r"/[a-z0-9]+-to-[a-z0-9]+", path):
        return label
    if rule == "css-portal" and "sidebar-submenu" in classes and path.endswith("-generator"):
        return label
    if rule == "webfx" and "tool-card__link" in classes and path.startswith("/tools/") and path != "/tools":
        return label
    return None


def sitemap_kind(path):
    if path == "/" or path in {"/privacy", "/help", "/terms", "/about", "/sitemap", "/converters"}:
        return "navigation-or-information"
    if path.startswith("/archive/") or path.startswith("/blog/"):
        return "archive-or-article"
    if re.fullmatch(r"/[a-z0-9]+-to-[a-z0-9]+", path):
        return "conversion-pair-pattern"
    return "other-sitemap-path"


def catalog_snapshot(spec):
    product, label, url, rule = spec
    metadata, body = fetch(url)
    source = {"product": product, "catalog": label, **metadata,
              "evidence": "public_sitemap" if rule == "sitemap" else "official_directory"}
    if body is None:
        return source | {"entries": []}
    entries = {}
    raw_count = 0
    if rule == "sitemap":
        root = ElementTree.fromstring(body)
        if not root.tag.endswith("}urlset"):
            raise RuntimeError(f"Expected sitemap urlset at {url}")
        for entry in root.findall("{*}url/{*}loc"):
            raw_count += 1
            target = normalized_url(metadata["finalUrl"], entry.text.strip())
            if target:
                entries[target] = {"url": target, "group": sitemap_kind(urlsplit(target).path)}
    else:
        page = Page()
        page.feed(body.decode("utf-8", "replace"))
        source["title"] = clean(page.title)
        for anchor in page.links:
            target = normalized_url(metadata["finalUrl"], anchor["href"])
            if not target:
                continue
            group = catalog_group(rule, label, anchor, urlsplit(target).path)
            if not group:
                continue
            raw_count += 1
            title = clean(anchor["text"]) or clean(anchor["title"])
            entry = entries.setdefault(target, {"url": target, "title": title, "groups": []})
            if group not in entry["groups"]:
                entry["groups"].append(group)
    if not entries:
        raise RuntimeError(f"No catalog matches at {url}; verify the page structure")
    groups = Counter(group for entry in entries.values()
                     for group in (entry["groups"] if "groups" in entry else [entry["group"]]))
    return source | {
        "matchingOccurrences": raw_count,
        "uniqueUrls": len(entries),
        "groupCounts": dict(sorted(groups.items())),
        "entries": sorted(entries.values(), key=lambda entry: entry["url"]),
    }


def detail_snapshot(url):
    metadata, body = fetch(url)
    row = {"evidence": "official_detail_html", **metadata}
    if body is None:
        return row
    page = Page()
    page.feed(body.decode("utf-8", "replace"))
    canonical = urljoin(metadata["finalUrl"], page.canonical) if page.canonical else None
    return row | {
        "title": clean(page.title),
        "h1": [clean(value) for value in page.h1],
        "description": page.description,
        "canonical": canonical,
        "canonicalSelf": canonical == metadata["finalUrl"] if canonical else None,
        "hreflangCount": page.hreflang,
        "jsonLdCount": page.json_ld,
    }


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("output", type=Path)
    args = parser.parse_args()
    with ThreadPoolExecutor(max_workers=6) as executor:
        catalogs = list(executor.map(catalog_snapshot, CATALOGS))
        details = list(executor.map(detail_snapshot, DETAILS))
    report = {
        "schemaVersion": 1,
        "observedAt": datetime.now(ZoneInfo("Asia/Shanghai")).isoformat(timespec="seconds"),
        "counts": {
            "catalogs": len(catalogs),
            "catalogsAvailable": sum(bool(source["entries"]) for source in catalogs),
            "directoryUrls": len({entry["url"] for source in catalogs if source["evidence"] == "official_directory"
                                  for entry in source["entries"]}),
            "sitemapUrls": len({entry["url"] for source in catalogs if source["evidence"] == "public_sitemap"
                                for entry in source["entries"]}),
            "detailPages": len(details),
            "detailPages200": sum(row["status"] == 200 for row in details),
            "sameInputTests": 0,
        },
        "catalogs": catalogs,
        "detailSamples": details,
    }
    data = json.dumps(report, ensure_ascii=False, indent=2) + "\n"
    args.output.write_text(data, encoding="utf-8")
    print(json.dumps(report["counts"], ensure_ascii=False))
    for catalog in catalogs:
        print(catalog["product"], catalog["catalog"], catalog["status"], catalog.get("uniqueUrls", 0))


if __name__ == "__main__":
    main()
