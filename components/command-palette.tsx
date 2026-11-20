"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { isComposingKey, revealActiveOption } from "@/lib/home-interactions";
import { useI18n } from "./i18n-provider";
import { Icon } from "./icons";
import { ALL_TOOLS } from "@/tools/registry";
import { toolCopy } from "@/lib/tool-copy";
import { searchTools } from "@/lib/tool-search";

export function CommandPalette({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { locale, t } = useI18n();
  const router = useRouter();
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const items = useMemo(
    () =>
      ALL_TOOLS.map((tool) => {
        const c = toolCopy(tool, locale);
        return {
          slug: tool.slug,
          name: c.name,
          tagline: c.tagline,
          icon: tool.icon,
        };
      }),
    [locale],
  );
  const results = useMemo(() => searchTools(items, q).slice(0, 9), [items, q]);
  useEffect(() => {
    if (!open) return;
    const previous =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setQ("");
    setActive(0);
    const frame = requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
      previous?.focus();
    };
  }, [open]);
  const activeOptionId = results[active]
    ? `command-result-${results[active].slug}`
    : undefined;
  useEffect(() => {
    if (open) revealActiveOption(dialogRef.current, activeOptionId);
  }, [open, activeOptionId, results]);
  if (!open) return null;
  const go = (slug: string) => {
    onClose();
    router.push(`/${locale}/tools/${slug}`);
  };
  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center bg-black/40 px-4 pt-[12vh] backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={t.nav.search}
        className="w-full max-w-xl overflow-hidden rounded-2xl border hairline bg-[var(--color-card)] shadow-[0_24px_64px_rgba(0,0,0,0.25)]"
        onClick={(event) => event.stopPropagation()}
        onKeyDown={(event) => {
          if (isComposingKey(event.nativeEvent)) return;
          if (event.key === "Escape") {
            event.preventDefault();
            onClose();
          }
          if (event.key === "Tab") {
            const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
              'input, button, a[href], [tabindex="0"]',
            );
            if (!focusable?.length) return;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (event.shiftKey && document.activeElement === first) {
              event.preventDefault();
              last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
              event.preventDefault();
              first.focus();
            }
          }
        }}
      >
        <div className="flex items-center gap-3 border-b hairline px-4">
          <Icon
            name="search"
            size={17}
            className="flex-none text-[var(--color-sub)]"
          />
          <input
            ref={inputRef}
            value={q}
            onChange={(event) => {
              setQ(event.target.value);
              setActive(0);
            }}
            onKeyDown={(event) => {
              if (isComposingKey(event.nativeEvent)) return;
              if (event.key === "ArrowDown") {
                event.preventDefault();
                setActive((index) =>
                  Math.min(index + 1, Math.max(0, results.length - 1)),
                );
              }
              if (event.key === "ArrowUp") {
                event.preventDefault();
                setActive((index) => Math.max(index - 1, 0));
              }
              if (event.key === "Enter" && results[active])
                go(results[active].slug);
            }}
            placeholder={t.tools.filterPlaceholder}
            className="h-14 min-w-0 w-full bg-transparent py-4 text-[16px] outline-none placeholder:text-[var(--color-sub)]"
            role="combobox"
            aria-autocomplete="list"
            aria-expanded="true"
            aria-controls="command-search-results"
            aria-activedescendant={activeOptionId}
            aria-label={t.nav.search}
          />
          <button
            type="button"
            onClick={onClose}
            aria-label={t.common.close}
            className="flex-none rounded-md border hairline bg-[var(--color-surface)] px-2 py-1 text-[11px] text-[var(--color-sub)]"
          >
            Esc
          </button>
        </div>
        <ul
          id="command-search-results"
          className="max-h-[55vh] overflow-y-auto p-2"
          role="listbox"
          aria-label={t.nav.search}
        >
          {results.length === 0 && (
            <li
              role="presentation"
              className="px-3 py-8 text-center text-[13.5px] text-[var(--color-sub)]"
            >
              {t.tools.noResults}
            </li>
          )}
          {results.map((result, index) => (
            <li
              key={result.slug}
              id={`command-result-${result.slug}`}
              role="option"
              aria-selected={index === active}
            >
              <button
                type="button"
                onMouseEnter={() => setActive(index)}
                onClick={() => go(result.slug)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-start ${index === active ? "bg-[var(--color-surface)]" : ""}`}
              >
                <span className="inline-flex flex-none rounded-lg bg-[var(--color-surface)] p-2 text-[var(--color-ink)]">
                  <Icon name={result.icon} size={16} />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[14px] font-medium">
                    {result.name}
                  </span>
                  <span className="block truncate text-[12.5px] text-[var(--color-sub)]">
                    {result.tagline}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
