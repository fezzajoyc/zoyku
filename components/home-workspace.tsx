"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Icon } from "./icons";
import { tileStyle } from "@/lib/tool-colors";
import { readPins, togglePin } from "@/lib/pins";
import { CATEGORIES } from "@/lib/site";
import type { CategoryId } from "@/lib/site";

type Item = { slug: string; category: string; icon: string; name: string; tagline: string };

const CAT_ICONS: Record<string, string> = {
  pdf: "pdf",
  image: "image",
  text: "text",
  developer: "code",
  seo: "seo",
  security: "shield",
  utility: "calc",
};

/**
 * Antigravity Mission Control Workspace:
 * 悬浮指挥台搜索 + 磁性分类胶囊坞 + 无重力微动工具网格
 */
export function HomeWorkspace({
  tools,
  labels,
  locale,
}: {
  tools: Item[];
  labels: {
    placeholder: string;
    all: string;
    empty: string;
    clear: string;
    pinned: string;
    pin: string;
    unpin: string;
    categoryNames: Record<string, string>;
  };
  locale: string;
}) {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<CategoryId | "all" | "pinned">("all");
  const [pins, setPins] = useState<string[]>([]);
  const searchRef = useRef<HTMLInputElement>(null);

  // 挂载后读取本地收藏(SSR 一致性:首屏不渲染 pinned 状态)
  useEffect(() => {
    setPins(readPins());
  }, []);

  // ⌘K / Ctrl+K 聚焦搜索框;Esc 清空并失焦
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchRef.current?.focus();
        searchRef.current?.select();
      } else if (e.key === "Escape" && document.activeElement === searchRef.current) {
        setQuery("");
        searchRef.current?.blur();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const togglePinLocal = (slug: string) => {
    setPins((prev) => togglePin(slug, prev));
  };

  const q = query.trim().toLowerCase();
  const filtered = useMemo(
    () =>
      tools.filter((tool) => {
        if (cat === "pinned") {
          if (!pins.includes(tool.slug)) return false;
        } else if (cat !== "all" && tool.category !== cat) {
          return false;
        }
        return (
          !q ||
          tool.name.toLowerCase().includes(q) ||
          tool.tagline.toLowerCase().includes(q) ||
          tool.slug.replace(/-/g, " ").includes(q)
        );
      }),
    [tools, q, cat, pins],
  );

  // 分类胶囊:各分类计数
  const counts = useMemo(() => {
    const m = new Map<string, number>();
    for (const t of tools) m.set(t.category, (m.get(t.category) ?? 0) + 1);
    return m;
  }, [tools]);

  return (
    <div className="mx-auto w-full max-w-6xl">
      {/* 悬浮聚光搜索栏 (Antigravity Command Spotlight with Shimmer) */}
      <div className="relative mx-auto max-w-2xl">
        <div className="command-shimmer-wrap shadow-[0_12px_40px_rgba(0,0,0,0.06)] dark:shadow-[0_14px_44px_rgba(0,0,0,0.35)]">
          <div className="relative flex items-center rounded-[1.05rem] bg-[var(--color-card)]/90 py-2 pl-4.5 pr-3 backdrop-blur-2xl transition-all duration-300 focus-within:ring-3 focus-within:ring-[var(--color-ring)]">
            <span className="flex-none text-[var(--color-sub)]">
              <Icon name="search" size={19} />
            </span>
            <input
              ref={searchRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={labels.placeholder}
              aria-label={labels.placeholder}
              className="h-11 w-full bg-transparent px-3 text-[15.5px] outline-none placeholder:text-[var(--color-sub)]"
            />
            {query ? (
              <div className="flex items-center gap-2">
                <span className="mono rounded-full bg-[var(--color-surface)] px-2.5 py-0.5 text-xs font-semibold tabular-nums text-[var(--color-sub)]">
                  {filtered.length}
                </span>
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label={labels.clear}
                  className="flex h-7 w-7 items-center justify-center rounded-full text-xs text-[var(--color-sub)] transition-all duration-200 hover:rotate-90 hover:bg-[var(--color-surface)] hover:text-[var(--color-ink)]"
                >
                  ✕
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <kbd className="mono hidden rounded-lg border hairline bg-[var(--color-surface)] px-2.5 py-1 text-[11px] font-semibold text-[var(--color-sub)] shadow-xs sm:inline-block">
                  ⌘K
                </kbd>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 磁性分类胶囊坞 (Antigravity Magnetic Category Dock) */}
      <div
        className="no-scrollbar mx-auto mt-6 flex max-w-4xl items-center gap-2 overflow-x-auto px-1 py-1"
        role="tablist"
        aria-label={labels.all}
      >
        <button
          type="button"
          role="tab"
          aria-selected={cat === "all"}
          onClick={() => setCat("all")}
          className={`group flex flex-none items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-medium transition-all duration-200 ${
            cat === "all"
              ? "border-transparent bg-[var(--color-ink)] text-[var(--color-bg)] shadow-sm font-semibold"
              : "hairline bg-[var(--color-card)]/80 text-[var(--color-sub)] backdrop-blur-sm hover:border-[var(--color-sub)]/35 hover:bg-[var(--color-surface)] hover:text-[var(--color-ink)]"
          }`}
        >
          <Icon
            name="grid"
            size={14}
            className={cat === "all" ? "text-[var(--color-bg)]" : "text-[var(--color-sub)]"}
          />
          <span>{labels.all}</span>
          <span
            className={`mono rounded-full px-1.5 py-0.5 text-[11px] font-semibold tabular-nums transition-colors ${
              cat === "all"
                ? "bg-[var(--color-bg)]/20 text-[var(--color-bg)]"
                : "bg-[var(--color-surface)] text-[var(--color-sub)]"
            }`}
          >
            {tools.length}
          </span>
        </button>

        {/* Pinned 胶囊:有收藏才出现 */}
        {pins.length > 0 && (
          <button
            type="button"
            role="tab"
            aria-selected={cat === "pinned"}
            onClick={() => setCat(cat === "pinned" ? "all" : "pinned")}
            className={`group flex flex-none items-center gap-1.5 rounded-full border px-4 py-2 text-[13px] font-medium transition-all duration-200 ${
              cat === "pinned"
                ? "border-transparent bg-[var(--color-ink)] text-[var(--color-bg)] shadow-sm font-semibold"
                : "hairline bg-[var(--color-card)]/80 text-[var(--color-sub)] backdrop-blur-sm hover:border-[var(--color-sub)]/35 hover:bg-[var(--color-surface)] hover:text-[var(--color-ink)]"
            }`}
          >
            <span className="text-amber-400">★</span>
            <span>{labels.pinned}</span>
            <span
              className={`mono rounded-full px-1.5 py-0.5 text-[11px] font-semibold tabular-nums transition-colors ${
                cat === "pinned"
                  ? "bg-[var(--color-bg)]/20 text-[var(--color-bg)]"
                  : "bg-[var(--color-surface)] text-[var(--color-sub)]"
              }`}
            >
              {pins.length}
            </span>
          </button>
        )}

        {CATEGORIES.map((c) => {
          const catHref = `/${locale}/categories/${c}`;
          const isCatActive = cat === c;
          return (
            <a
              key={c}
              href={catHref}
              role="tab"
              aria-selected={isCatActive}
              onClick={(e) => {
                e.preventDefault();
                setQuery("");
                setCat(isCatActive ? "all" : (c as CategoryId));
              }}
              className={`group flex flex-none items-center gap-1.5 whitespace-nowrap rounded-full border px-4 py-2 text-[13px] font-medium transition-all duration-200 ${
                isCatActive
                  ? "border-transparent bg-[var(--color-ink)] text-[var(--color-bg)] shadow-sm font-semibold"
                  : "hairline bg-[var(--color-card)]/80 text-[var(--color-sub)] backdrop-blur-sm hover:border-[var(--color-sub)]/35 hover:bg-[var(--color-surface)] hover:text-[var(--color-ink)]"
              }`}
            >
              <Icon
                name={CAT_ICONS[c] ?? "file"}
                size={14}
                className={isCatActive ? "text-[var(--color-bg)]" : "text-[var(--color-sub)]"}
              />
              <span>{labels.categoryNames[c] ?? c}</span>
              <span
                className={`mono rounded-full px-1.5 py-0.5 text-[11px] font-semibold tabular-nums transition-colors ${
                  isCatActive
                    ? "bg-[var(--color-bg)]/20 text-[var(--color-bg)]"
                    : "bg-[var(--color-surface)] text-[var(--color-sub)]"
                }`}
              >
                {counts.get(c) ?? 0}
              </span>
            </a>
          );
        })}
      </div>

      {/* 无重力工具网格 (Antigravity Tool Matrix) */}
      {filtered.length === 0 ? (
        <div className="mx-auto mt-12 max-w-md rounded-3xl border hairline bg-[var(--color-card)]/80 p-8 text-center shadow-sm backdrop-blur-xl">
          <div className="mx-auto mb-4 flex h-13 w-13 items-center justify-center rounded-2xl bg-[var(--color-surface)] text-[var(--color-sub)]">
            <Icon name="search" size={24} />
          </div>
          <p className="text-[15px] font-medium text-[var(--color-ink)]">
            {labels.empty.replace("{query}", query)}
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCat("all");
            }}
            className="mt-5 inline-flex items-center gap-1.5 rounded-full border hairline bg-[var(--color-surface)] px-5 py-2 text-[13px] font-medium text-[var(--color-ink)] transition-all hover:bg-[var(--color-card)] hover:border-[var(--color-sub)]/35"
          >
            ✕ {labels.clear}
          </button>
        </div>
      ) : (
        <div className="mt-8 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((tool) => (
            <Link
              key={tool.slug}
              href={`/${locale}/tools/${tool.slug}`}
              className="ag-card group relative flex items-start gap-3.5 rounded-2xl p-4"
            >
              <span
                className="mt-0.5 inline-flex flex-none rounded-xl p-2.5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-1"
                style={tileStyle(tool.slug, tool.category)}
              >
                <Icon name={tool.icon} size={18} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate pr-6 text-[14.5px] font-semibold leading-snug tracking-tight text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-accent)]">
                  {tool.name}
                </span>
                <span className="mt-1 block line-clamp-2 text-[12.5px] leading-relaxed text-[var(--color-sub)]">
                  {tool.tagline}
                </span>
              </span>
              {/* 星标收藏:右上角 */}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  togglePinLocal(tool.slug);
                }}
                aria-label={pins.includes(tool.slug) ? labels.unpin : labels.pin}
                aria-pressed={pins.includes(tool.slug)}
                className={`absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-lg text-[13px] transition-all duration-200 active:scale-90 ${
                  pins.includes(tool.slug)
                    ? "star-pop-anim text-amber-400 opacity-100 hover:scale-115"
                    : "text-[var(--color-sub)] opacity-0 hover:scale-115 hover:text-amber-400 focus-visible:opacity-100 group-hover:opacity-100"
                }`}
              >
                ★
              </button>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
