"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Icon } from "./icons";
import { readPins, togglePin } from "@/lib/pins";
import { HOME_COPY } from "@/lib/home-copy";
import { searchTools } from "@/lib/tool-search";
import { isLocale } from "@/lib/site";
import { RecentTools } from "./recent-tools";
import { isComposingKey } from "@/lib/home-interactions";

type Item = {
  slug: string;
  category: string;
  icon: string;
  name: string;
  tagline: string;
};
const SUGGESTIONS = ["merge-pdf", "image-compressor", "json-formatter"];

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
  const [showPins, setShowPins] = useState(false);
  const [pins, setPins] = useState<string[]>([]);
  const searchRef = useRef<HTMLInputElement>(null);
  const composing = useRef(false);
  useEffect(() => {
    setPins(readPins());
  }, []);
  const copy = HOME_COPY[isLocale(locale) ? locale : "en"];
  const isSearching = query.trim().length > 0;
  const filtered = useMemo(
    () =>
      searchTools(
        showPins ? tools.filter((tool) => pins.includes(tool.slug)) : tools,
        query,
      ),
    [tools, showPins, pins, query],
  );
  const visible = showPins ? filtered : filtered.slice(0, 8);
  const toggleFavorite = (slug: string) =>
    setPins((current) => togglePin(slug, current));
  return (
    <div className="home-workspace">
      <form
        className="home-search"
        role="search"
        action={`/${locale}/tools`}
        onSubmit={(event) => {
          if (!isSearching || composing.current) event.preventDefault();
        }}
      >
        <Icon name="search" size={20} />
        <input
          ref={searchRef}
          type="search"
          name="q"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onCompositionStart={() => { composing.current = true; }}
          onCompositionEnd={() => { composing.current = false; }}
          onKeyDown={(event) => {
            if (isComposingKey(event.nativeEvent)) {
              if (event.key === "Enter") event.preventDefault();
              return;
            }
            if (event.key === "Escape") {
              setQuery("");
              setShowPins(false);
            }
          }}
          placeholder={labels.placeholder}
          aria-label={labels.placeholder}
          aria-controls={
            isSearching || showPins ? "home-search-results" : undefined
          }
        />
        {query ? (
          <button
            type="button"
            className="home-search-clear"
            onClick={() => {
              setQuery("");
              searchRef.current?.focus();
            }}
            aria-label={labels.clear}
          >
            ×
          </button>
        ) : (
          <kbd aria-hidden="true">⌘ K</kbd>
        )}
      </form>
      <div className="home-search-meta">
        <div className="home-suggestions">
          <span>{labels.popular}</span>
          {SUGGESTIONS.map((slug) => {
            const tool = tools.find((item) => item.slug === slug);
            return tool ? (
              <Link key={slug} href={`/${locale}/tools/${slug}`}>
                {tool.name}
              </Link>
            ) : null;
          })}
        </div>
        <button
          type="button"
          className="home-favorites-toggle"
          onClick={() => setShowPins((value) => !value)}
          aria-expanded={showPins}
          aria-controls="home-search-results"
        >
          <span aria-hidden="true">☆</span>
          {labels.pinned}
          {pins.length > 0 && (
            <span className="home-favorites-count">{pins.length}</span>
          )}
        </button>
      </div>
      {(isSearching || showPins) && (
        <section
          id="home-search-results"
          className="home-search-results"
          aria-label={showPins ? labels.pinned : labels.placeholder}
        >
          <p className="home-results-count" role="status" aria-live="polite">
            {showPins ? labels.pinned : labels.placeholder} · {filtered.length}
          </p>
          {visible.length ? (
            <>
              <ul>
                {visible.map((tool) => (
                  <li key={tool.slug} className="home-result-card">
                    <Link href={`/${locale}/tools/${tool.slug}`} prefetch={false}>
                      <Icon name={tool.icon} size={19} />
                      <span>
                        <strong>{tool.name}</strong>
                        <span className="home-card-tagline">
                          {tool.tagline}
                        </span>
                      </span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => toggleFavorite(tool.slug)}
                      aria-label={`${pins.includes(tool.slug) ? labels.unpin : labels.pin}: ${tool.name}`}
                      aria-pressed={pins.includes(tool.slug)}
                      className={pins.includes(tool.slug) ? "is-pinned" : ""}
                    >
                      {pins.includes(tool.slug) ? "★" : "☆"}
                    </button>
                  </li>
                ))}
              </ul>
              <Link
                className="home-results-all"
                href={`/${locale}/tools${isSearching ? `?q=${encodeURIComponent(query)}` : ""}`}
              >
                {labels.all}
                <span className="home-link-arrow" aria-hidden="true">→</span>
              </Link>
            </>
          ) : (
            <div className="home-search-empty">
              <p>
                {showPins && !isSearching
                  ? copy.favoritesEmpty
                  : labels.empty.replace("{query}", query)}
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setShowPins(false);
                  searchRef.current?.focus();
                }}
              >
                {labels.clear}
              </button>
            </div>
          )}
        </section>
      )}
      <RecentTools locale={locale} />
    </div>
  );
}
