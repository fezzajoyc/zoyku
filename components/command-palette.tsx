"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "./i18n-provider";
import { Icon } from "./icons";
import { ALL_TOOLS } from "@/tools/registry";
import { toolCopy } from "@/lib/tool-copy";
import type { Locale } from "@/lib/site";

/**
 * 全局命令面板:Cmd/Ctrl+K 唤醒,毫秒级本地过滤。
 * 索引 = 工具本地化 name/tagline/slug(15 语 overlay 的场景词天然进索引)。
 */
type Item = { slug: string; name: string; tagline: string; hay: string; icon: string };

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { locale, t } = useI18n();
  const pathname = usePathname();
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const items = useMemo<Item[]>(
    () =>
      ALL_TOOLS.map((tool) => {
        const c = toolCopy(tool, locale as Locale);
        const name = c.h1 ?? c.name;
        return {
          slug: tool.slug,
          name,
          tagline: c.tagline,
          icon: tool.icon,
          hay: `${name} ${tool.slug.replace(/-/g, " ")} ${c.tagline}`.toLowerCase(),
        };
      }),
    [locale],
  );

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return items.slice(0, 9);
    const words = query.split(/\s+/);
    return items
      .filter((it) => words.every((w) => it.hay.includes(w)))
      .slice(0, 9);
  }, [q, items]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onClose();
      }
      if (e.key === "Escape") onClose();
    };
    if (!open) return;
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      setQ("");
      setActive(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open, pathname]);

  if (!open) return null;

  const go = (slug: string) => {
    onClose();
    window.location.assign(`/${locale}/tools/${slug}`);
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center bg-black/40 px-4 pt-[12vh] backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={t.nav.search}
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-2xl border hairline bg-[var(--color-card)] shadow-[0_24px_64px_rgba(0,0,0,0.25)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b hairline px-4">
          <Icon name="search" size={16} className="flex-none text-[var(--color-sub)]" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setActive(0);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)); }
              if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
              if (e.key === "Enter" && results[active]) go(results[active].slug);
            }}
            placeholder={t.tools.filterPlaceholder.replace("…", "")}
            className="h-13 w-full bg-transparent py-4 text-[15px] outline-none placeholder:text-[var(--color-sub)]"
            aria-label={t.nav.search}
          />
          <kbd className="flex-none rounded-md border hairline bg-[var(--color-surface)] px-1.5 py-0.5 text-[11px] text-[var(--color-sub)]">Esc</kbd>
        </div>
        <ul className="max-h-[46vh] overflow-y-auto p-2" role="listbox">
          {results.length === 0 && (
            <li className="px-3 py-8 text-center text-[13.5px] text-[var(--color-sub)]">{t.tools.noResults}</li>
          )}
          {results.map((r, i) => (
            <li key={r.slug} role="option" aria-selected={i === active}>
              <button
                onMouseEnter={() => setActive(i)}
                onClick={() => go(r.slug)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left ${i === active ? "bg-[var(--color-surface)]" : ""}`}
              >
                <span className="inline-flex flex-none rounded-lg bg-[var(--color-surface)] p-2 text-[var(--color-ink)]">
                  <Icon name={r.icon} size={16} />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[14px] font-medium">{r.name}</span>
                  <span className="block truncate text-[12.5px] text-[var(--color-sub)]">{r.tagline}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
