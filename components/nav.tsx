"use client";

import { useState } from "react";

import { SITE } from "@/lib/site";

import Link from "next/link";
import { useI18n } from "./i18n-provider";
import { LangSwitch } from "./lang-switch";
import { CommandPalette } from "./command-palette";
import { ThemeToggle } from "./theme-toggle";
import { Icon } from "./icons";
import { BrandLogo } from "./brand-logo";
import { CATEGORIES } from "@/lib/site";

export function Nav() {
  const { locale, t } = useI18n();
  const [paletteOpen, setPaletteOpen] = useState(false);
  return (
    <>

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-[var(--color-accent)] focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-40 border-b hairline bg-[var(--color-nav)] backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center gap-4 px-5 sm:px-8">
        <Link href={`/${locale}`} className="flex items-center gap-2.5 font-semibold tracking-tight">
          <span className="inline-flex rounded-lg bg-[var(--color-ink)] p-1.5 text-white dark:bg-white dark:text-[#1d1d1f]">
            <BrandLogo size={16} />
          </span>
          <span className="text-[15.5px] font-bold">{SITE.name}</span>
        </Link>
        <nav
          className="no-scrollbar -mx-1 flex flex-1 items-center gap-3 overflow-x-auto px-1 text-[13px] text-[var(--color-sub)] xl:gap-3.5 xl:text-[13.5px]"
          aria-label={t.nav.menu}
        >
          <Link href={`/${locale}/tools`} className="flex-none transition-colors hover:text-[var(--color-ink)]">
            {t.nav.tools}
          </Link>
          {CATEGORIES.map((c) => (
            <Link
              key={c}
              href={`/${locale}/categories/${c}`}
              className="flex-none whitespace-nowrap transition-colors hover:text-[var(--color-ink)]"
            >
              {t.categories[c].name}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          onClick={() => setPaletteOpen(true)}
          aria-label={t.nav.search}
          className="inline-flex items-center gap-2 rounded-full border hairline px-3 py-1.5 text-[13px] text-[var(--color-sub)] transition-colors hover:bg-[var(--color-surface)]"
        >
          <Icon name="search" size={14} />
          <span className="hidden md:inline">{t.tools.filterPlaceholder.replace("…", "")}</span>
          <kbd className="hidden rounded-md border hairline bg-[var(--color-surface)] px-1.5 py-0.5 text-[11px] md:inline">⌘K</kbd>
        </button>
        <ThemeToggle />
        <LangSwitch />
      </div>
    </header>
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </>
  );
}
