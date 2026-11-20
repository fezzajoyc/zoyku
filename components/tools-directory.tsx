"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Icon } from "./icons";
import { tileStyle } from "@/lib/tool-colors";
import { readPins, togglePin } from "@/lib/pins";
import { searchTools } from "@/lib/tool-search";

type Item = {
  slug: string;
  category: string;
  icon: string;
  name: string;
  tagline: string;
};

export function ToolsDirectory({
  tools,
  labels,
}: {
  tools: Item[];
  labels: {
    filterPlaceholder: string;
    empty: string;
    clearSearch?: string;
    backHome?: string;
    pinned?: string;
    pin?: string;
    unpin?: string;
    categoryNames: Record<string, string>;
    hrefLang: string;
  };
}) {
  const [query, setQuery] = useState("");
  const [pins, setPins] = useState<string[]>([]);

  useEffect(() => {
    setQuery(new URLSearchParams(window.location.search).get("q") ?? "");
    setPins(readPins());
  }, []);

  const togglePinLocal = (slug: string) => {
    setPins((prev) => togglePin(slug, prev));
  };

  const filtered = useMemo(() => searchTools(tools, query), [tools, query]);

  const grouped = useMemo(() => {
    const map = new Map<string, Item[]>();
    for (const tool of filtered) {
      const arr = map.get(tool.category) ?? [];
      arr.push(tool);
      map.set(tool.category, arr);
    }
    return map;
  }, [filtered]);

  return (
    <div>
      <input
        type="search"
        className="field mb-6 max-w-md"
        placeholder={labels.filterPlaceholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label={labels.filterPlaceholder}
      />

      {filtered.length === 0 && (
        <div className="rounded-2xl border hairline bg-[var(--color-card)] p-8 text-center">
          <p className="text-[15px] text-[var(--color-sub)]">
            {labels.empty.replace("{query}", query)}
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2.5">
            <button
              type="button"
              onClick={() => setQuery("")}
              className="rounded-full border hairline px-4 py-2 text-[13.5px] font-medium transition-colors hover:bg-[var(--color-surface)]"
            >
              ✕ {labels.clearSearch}
            </button>
            <Link
              href={`/${labels.hrefLang}`}
              className="rounded-full bg-[var(--color-accent)] px-4 py-2 text-[13.5px] font-medium text-white transition-colors hover:bg-[var(--color-accent-strong)]"
            >
              {labels.backHome}
            </Link>
          </div>
        </div>
      )}

      {[...grouped.entries()].map(([cat, items]) => (
        <section key={cat} className="mb-10">
          <h2 className="section-title mb-4">
            {labels.categoryNames[cat] ?? cat}
            <span className="ml-2 text-[14px] font-normal text-[var(--color-sub)]">
              {items.length}
            </span>
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((tool) => (
              <div
                key={tool.slug}
                className="group relative rounded-xl border hairline bg-[var(--color-card)] transition-colors hover:bg-[var(--color-surface)]"
              >
                <Link
                  href={`/${labels.hrefLang}/tools/${tool.slug}`}
                  prefetch={false}
                  className="flex min-w-0 items-start gap-3 p-4 pe-10"
                >
                  <span
                    className="mt-0.5 inline-flex flex-none rounded-lg p-2"
                    style={tileStyle(tool.slug, tool.category)}
                  >
                    <Icon name={tool.icon} size={18} />
                  </span>
                  <span className="min-w-0">
                    <span className="block pr-5 font-medium leading-tight">
                      {tool.name}
                    </span>
                    <span className="mt-1 line-clamp-2 text-[13px] leading-5 text-[var(--color-sub)]">
                      {tool.tagline}
                    </span>
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    togglePinLocal(tool.slug);
                  }}
                  aria-label={`${pins.includes(tool.slug) ? labels.unpin : labels.pin}: ${tool.name}`}
                  aria-pressed={pins.includes(tool.slug)}
                  className={`absolute end-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-md text-[18px] transition-all ${
                    pins.includes(tool.slug)
                      ? "text-[#946509] dark:text-[#f4c15d] opacity-100"
                      : "text-[var(--color-sub)] opacity-70 hover:opacity-100 hover:text-[var(--color-ink)] focus-visible:opacity-100 group-hover:opacity-100"
                  }`}
                >
                  ★
                </button>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
