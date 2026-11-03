"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Icon } from "./icons";
import { tileStyle } from "@/lib/tool-colors";
import { CATEGORIES } from "@/lib/site";
import type { CategoryId } from "@/lib/site";

type Item = { slug: string; category: string; icon: string; name: string; tagline: string };

const PIN_KEY = "zoyku-pinned";

/** 星标收藏:localStorage 持久化,跨语言只存 slug。 */
function readPins(): string[] {
  try {
    const raw: string[] = JSON.parse(localStorage.getItem(PIN_KEY) ?? "[]");
    return Array.isArray(raw) ? raw : [];
  } catch {
    return [];
  }
}

/**
 * 首屏工作台(TinyWow × iLovePDF):
 * 大搜索框实时过滤 + 分类过滤胶囊(All/PDF/图片/…)+ 全部工具网格。
 * 过滤按名称/tagline/slug;选中分类时只显示该类;空结果显示清空引导。
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

  const togglePin = (slug: string) => {
    setPins((prev) => {
      const next = prev.includes(slug) ? prev.filter((s) => s !== slug) : [slug, ...prev];
      try {
        localStorage.setItem(PIN_KEY, JSON.stringify(next));
      } catch {
        /* 隐私模式静默 */
      }
      return next;
    });
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

  // 分类胶囊:带各分类工具数
  const counts = useMemo(() => {
    const m = new Map<string, number>();
    for (const t of tools) m.set(t.category, (m.get(t.category) ?? 0) + 1);
    return m;
  }, [tools]);

  return (
    <div className="mx-auto w-full max-w-6xl">
      {/* 大搜索框 */}
      <div className="relative mx-auto max-w-2xl">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-sub)]">
          <Icon name="search" size={18} />
        </span>
        <input
          ref={searchRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={labels.placeholder}
          aria-label={labels.placeholder}
          className="h-13 w-full rounded-2xl border hairline bg-[var(--color-card)] py-4 pl-11 pr-16 text-[15.5px] shadow-[0_4px_18px_rgba(0,0,0,0.06)] outline-none transition-shadow placeholder:text-[var(--color-sub)] focus:ring-2 focus:ring-[var(--color-accent)]"
        />
        {query ? (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label={labels.clear}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-[var(--color-sub)] transition-colors hover:bg-[var(--color-surface)]"
          >
            ✕
          </button>
        ) : (
          <kbd className="absolute right-3.5 top-1/2 hidden -translate-y-1/2 rounded-md border hairline bg-[var(--color-surface)] px-1.5 py-0.5 text-[11px] text-[var(--color-sub)] sm:block">
            ⌘K
          </kbd>
        )}
      </div>

      {/* 分类胶囊(横滑) */}
      <div
        className="no-scrollbar mx-auto mt-4 flex max-w-3xl items-center gap-2 overflow-x-auto px-1 pb-1"
        role="tablist"
        aria-label={labels.all}
      >
        <button
          type="button"
          role="tab"
          aria-selected={cat === "all"}
          onClick={() => setCat("all")}
          className={`flex-none rounded-full border px-4 py-1.5 text-[13.5px] font-medium transition-colors ${
            cat === "all"
              ? "border-transparent bg-[var(--color-ink)] text-white"
              : "hairline bg-[var(--color-card)] text-[var(--color-sub)] hover:text-[var(--color-ink)]"
          }`}
        >
          {labels.all} <span className="tabular-nums opacity-70">{tools.length}</span>
        </button>
        {/* Pinned 胶囊:有收藏才出现 */}
        {pins.length > 0 && (
          <button
            type="button"
            role="tab"
            aria-selected={cat === "pinned"}
            onClick={() => setCat(cat === "pinned" ? "all" : "pinned")}
            className={`flex-none whitespace-nowrap rounded-full border px-4 py-1.5 text-[13.5px] font-medium transition-colors ${
              cat === "pinned"
                ? "border-transparent bg-[var(--color-ink)] text-white"
                : "hairline bg-[var(--color-card)] text-[var(--color-sub)] hover:text-[var(--color-ink)]"
            }`}
          >
            ★ {labels.pinned} <span className="tabular-nums opacity-70">{pins.length}</span>
          </button>
        )}
        {CATEGORIES.map((c) => {
          // 混合胶囊:href 保留分类页链接(SEO 爬虫可抓),点击拦截为原地过滤
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
              className={`flex-none whitespace-nowrap rounded-full border px-4 py-1.5 text-[13.5px] font-medium transition-colors ${
                isCatActive
                  ? "border-transparent bg-[var(--color-ink)] text-white"
                  : "hairline bg-[var(--color-card)] text-[var(--color-sub)] hover:text-[var(--color-ink)]"
              }`}
            >
              {labels.categoryNames[c] ?? c}{" "}
              <span className="tabular-nums opacity-70">{counts.get(c) ?? 0}</span>
            </a>
          );
        })}
      </div>

      {/* 工具网格 */}
      {filtered.length === 0 ? (
        <div className="mx-auto mt-10 max-w-md rounded-2xl border hairline bg-[var(--color-card)] p-8 text-center">
          <p className="text-[14.5px] text-[var(--color-sub)]">
            {labels.empty.replace("{query}", query)}
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCat("all");
            }}
            className="mt-4 rounded-full border hairline px-4 py-2 text-[13.5px] font-medium transition-colors hover:bg-[var(--color-surface)]"
          >
            ✕ {labels.clear}
          </button>
        </div>
      ) : (
        <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((tool) => (
            <Link
              key={tool.slug}
              href={`/${locale}/tools/${tool.slug}`}
              className="group relative flex items-start gap-3 rounded-2xl border hairline bg-[var(--color-card)] p-4 transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.07)]"
            >
              <span
                className="mt-0.5 inline-flex flex-none rounded-xl p-2.5 transition-transform group-hover:scale-105"
                style={tileStyle(tool.slug, tool.category)}
              >
                <Icon name={tool.icon} size={18} />
              </span>
              <span className="min-w-0">
                <span className="block truncate pr-5 text-[14px] font-semibold leading-tight">
                  {tool.name}
                </span>
                <span className="mt-1 block truncate text-[12.5px] leading-5 text-[var(--color-sub)]">
                  {tool.tagline}
                </span>
              </span>
              {/* 星标收藏:右上角,点中常亮;整卡是链接,按钮拦截冒泡 */}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  togglePin(tool.slug);
                }}
                aria-label={pins.includes(tool.slug) ? labels.unpin : labels.pin}
                aria-pressed={pins.includes(tool.slug)}
                className={`absolute right-2.5 top-2.5 rounded-md p-1 text-[13px] transition-all ${
                  pins.includes(tool.slug)
                    ? "text-[#f59e0b] opacity-100"
                    : "text-[var(--color-sub)] opacity-0 hover:text-[var(--color-ink)] focus-visible:opacity-100 group-hover:opacity-100"
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
