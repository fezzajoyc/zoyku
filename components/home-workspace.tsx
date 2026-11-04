"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Icon } from "./icons";
import { tileStyle } from "@/lib/tool-colors";
import { readPins, togglePin } from "@/lib/pins";
import { CATEGORIES } from "@/lib/site";
import type { CategoryId } from "@/lib/site";

type Item = { slug: string; category: string; icon: string; name: string; tagline: string };

// 空状态热门推荐(存在才渲染)
const POPULAR_SLUGS = [
  "merge-pdf",
  "image-compressor",
  "word-counter",
  "json-formatter",
  "qr-generator",
  "password-generator",
];

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
 * 苹果风格首屏工作台:
 * 仿 macOS Spotlight 搜索 + Apple 产品选择胶囊 + 井井有条 Bento 卡片阵列
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
    popular: string;
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

  // 挂载后读取本地收藏(SSR 一致性)
  useEffect(() => {
    setPins(readPins());
  }, []);

  // ⌘K / Ctrl+K 聚焦搜索框;Esc 清空
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

  // 分类统计
  const counts = useMemo(() => {
    const m = new Map<string, number>();
    for (const t of tools) m.set(t.category, (m.get(t.category) ?? 0) + 1);
    return m;
  }, [tools]);

  return (
    <div className="mx-auto w-full max-w-6xl">
      {/* macOS Spotlight 风格大搜索框 */}
      <div className="relative mx-auto max-w-2xl">
        <div className="relative flex items-center rounded-2xl border hairline bg-[var(--color-card)] py-2.5 pl-4.5 pr-3 shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_28px_rgba(0,0,0,0.4)] transition-all duration-200 focus-within:border-[var(--color-accent)] focus-within:ring-4 focus-within:ring-[var(--color-ring)]">
          <span className="flex-none text-[var(--color-sub)]">
            <Icon name="search" size={20} />
          </span>
          <input
            ref={searchRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={labels.placeholder}
            aria-label={labels.placeholder}
            className="h-11 w-full bg-transparent px-3 text-[16px] text-[var(--color-ink)] outline-none placeholder:text-[var(--color-sub)]"
          />
          {query ? (
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-[var(--color-surface)] px-2.5 py-0.5 text-xs font-semibold tabular-nums text-[var(--color-sub)]">
                {filtered.length}
              </span>
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label={labels.clear}
                className="flex h-7 w-7 items-center justify-center rounded-full text-xs text-[var(--color-sub)] transition-colors hover:bg-[var(--color-surface)] hover:text-[var(--color-ink)]"
              >
                ✕
              </button>
            </div>
          ) : (
            <kbd className="hidden rounded-lg border hairline bg-[var(--color-surface)] px-2.5 py-1 text-[11px] font-semibold text-[var(--color-sub)] sm:inline-block">
              ⌘K
            </kbd>
          )}
        </div>
      </div>

      {/* 热门工具直达条(10015 editorial 位):搜索框正下方,一击到主工具 */}
      {!query && cat === "all" && (
        <div className="no-scrollbar mx-auto mt-3.5 flex max-w-4xl items-center gap-2 overflow-x-auto px-1 py-1" aria-label={labels.popular}>
          {POPULAR_SLUGS.map((slug) => {
            const tool = tools.find((tl) => tl.slug === slug);
            if (!tool) return null;
            return (
              <Link
                key={slug}
                href={`/${locale}/tools/${slug}`}
                className="inline-flex flex-none items-center gap-1.5 rounded-full border hairline bg-[var(--color-card)] px-3.5 py-1.5 text-[12.5px] font-medium text-[var(--color-ink)] transition-colors hover:border-[var(--color-accent)] hover:bg-[var(--color-surface)]"
              >
                <Icon name={tool.icon} size={13} className="text-[var(--color-accent)]" />
                {tool.name}
              </Link>
            );
          })}
        </div>
      )}

      {/* Apple 经典产品分类胶囊架 (Segmented Category Shelf) */}
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
          className={`flex flex-none items-center gap-2 rounded-full px-4 py-2 text-[13.5px] font-medium transition-all duration-180 ${
            cat === "all"
              ? "bg-[var(--color-ink)] text-white dark:bg-white dark:text-[#1d1d1f] shadow-xs dark:bg-white dark:text-[#1d1d1f]"
              : "bg-[var(--color-surface)] text-[var(--color-sub)] hover:text-[var(--color-ink)]"
          }`}
        >
          <Icon name="grid" size={14} />
          <span>{labels.all}</span>
          <span
            className={`rounded-full px-1.5 py-0.2 text-[11px] font-semibold tabular-nums ${
              cat === "all"
                ? "bg-white/20 text-white dark:bg-black/10 dark:text-[#1d1d1f]"
                : "bg-black/5 dark:bg-white/10 text-[var(--color-sub)]"
            }`}
          >
            {tools.length}
          </span>
        </button>

        {pins.length > 0 && (
          <button
            type="button"
            role="tab"
            aria-selected={cat === "pinned"}
            onClick={() => setCat(cat === "pinned" ? "all" : "pinned")}
            className={`flex flex-none items-center gap-1.5 rounded-full px-4 py-2 text-[13.5px] font-medium transition-all duration-180 ${
              cat === "pinned"
                ? "bg-[var(--color-ink)] text-white dark:bg-white dark:text-[#1d1d1f] shadow-xs dark:bg-white dark:text-[#1d1d1f]"
                : "bg-[var(--color-surface)] text-[var(--color-sub)] hover:text-[var(--color-ink)]"
            }`}
          >
            <span className="text-amber-500">★</span>
            <span>{labels.pinned}</span>
            <span
              className={`rounded-full px-1.5 py-0.2 text-[11px] font-semibold tabular-nums ${
                cat === "pinned"
                  ? "bg-white/20 text-white dark:bg-black/10 dark:text-[#1d1d1f]"
                  : "bg-black/5 dark:bg-white/10 text-[var(--color-sub)]"
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
              className={`flex flex-none items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-[13.5px] font-medium transition-all duration-180 ${
                isCatActive
                  ? "bg-[var(--color-ink)] text-white dark:bg-white dark:text-[#1d1d1f] shadow-xs dark:bg-white dark:text-[#1d1d1f]"
                  : "bg-[var(--color-surface)] text-[var(--color-sub)] hover:text-[var(--color-ink)]"
              }`}
            >
              <Icon name={CAT_ICONS[c] ?? "file"} size={14} />
              <span>{labels.categoryNames[c] ?? c}</span>
              <span
                className={`rounded-full px-1.5 py-0.2 text-[11px] font-semibold tabular-nums ${
                  isCatActive
                    ? "bg-white/20 text-white dark:bg-black/10 dark:text-[#1d1d1f]"
                    : "bg-black/5 dark:bg-white/10 text-[var(--color-sub)]"
                }`}
              >
                {counts.get(c) ?? 0}
              </span>
            </a>
          );
        })}
      </div>

      {/* 井井有条的 Apple Bento 工具网格 */}
      {filtered.length === 0 ? (
        <div className="mx-auto mt-12 max-w-md rounded-2xl border hairline bg-[var(--color-card)] p-8 text-center shadow-xs">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-surface)] text-[var(--color-sub)]">
            <Icon name="search" size={22} />
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
            className="mt-4 inline-flex items-center gap-1.5 rounded-full border hairline bg-[var(--color-surface)] px-4.5 py-2 text-[13.5px] font-medium text-[var(--color-ink)] transition-colors hover:bg-[var(--color-card)]"
          >
            ✕ {labels.clear}
          </button>
          {/* 空状态热门推荐(IT-Tools 模式):给搜索落空的用户一个出口 */}
          <div className="mt-5 border-t hairline pt-4">
            <p className="text-[12px] font-medium text-[var(--color-sub)]">{labels.popular}</p>
            <div className="mt-2.5 flex flex-wrap justify-center gap-2">
              {POPULAR_SLUGS.map((slug) => {
                const tool = tools.find((tl) => tl.slug === slug);
                if (!tool) return null;
                return (
                  <Link
                    key={slug}
                    href={`/${locale}/tools/${slug}`}
                    onClick={() => {
                      setQuery("");
                      setCat("all");
                    }}
                    className="inline-flex items-center gap-1.5 rounded-full border hairline bg-[var(--color-card)] px-3 py-1.5 text-[12.5px] font-medium text-[var(--color-ink)] transition-colors hover:bg-[var(--color-surface)]"
                  >
                    <Icon name={tool.icon} size={13} className="text-[var(--color-accent)]" />
                    {tool.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-8 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((tool) => (
            <Link
              key={tool.slug}
              href={`/${locale}/tools/${tool.slug}`}
              className="apple-card group relative flex items-start gap-3.5 rounded-2xl p-4.5"
            >
              <span
                className="mt-0.5 inline-flex flex-none rounded-xl p-2.5 transition-transform duration-200 group-hover:scale-105"
                style={tileStyle(tool.slug, tool.category)}
              >
                <Icon name={tool.icon} size={20} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate pr-6 text-[14.5px] font-semibold leading-snug tracking-tight text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-accent)]">
                  {tool.name}
                </span>
                <span className="mt-1 block line-clamp-2 text-[13px] leading-relaxed text-[var(--color-sub)]">
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
                className={`absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-md text-[13px] transition-all ${
                  pins.includes(tool.slug)
                    ? "star-pop-anim text-amber-500 opacity-100"
                    : "text-[var(--color-sub)] opacity-0 hover:text-amber-500 focus-visible:opacity-100 group-hover:opacity-100"
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
