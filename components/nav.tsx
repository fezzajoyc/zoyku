"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CATEGORIES, SITE } from "@/lib/site";
import { useI18n } from "./i18n-provider";
import { LangSwitch } from "./lang-switch";
import { CommandPalette } from "./command-palette";
import { ThemeToggle } from "./theme-toggle";
import { Icon } from "./icons";
import { BrandLogo } from "./brand-logo";
import { closeCategoryDetails, isComposingKey } from "@/lib/home-interactions";

export function Nav() {
  const { locale, t } = useI18n();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const categoryDetails = useRef<HTMLDetailsElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);
  const closePalette = useCallback(() => setPaletteOpen(false), []);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (isComposingKey(event)) return;
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (categoryDetails.current) categoryDetails.current.open = false;
        setMenuOpen(false);
        setPaletteOpen((current) => !current);
      }
      if (event.key === "Escape") {
        closeCategoryDetails(event, categoryDetails.current);
        setMenuOpen(false);
        if (menuOpen) menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);
  useEffect(() => {
    const dismissOutside = (event: Event) => {
      if (!(event.target instanceof Node)) return;
      const categories = categoryDetails.current;
      if (categories?.open && !categories.contains(event.target)) categories.open = false;
      if (!mobileNavRef.current?.contains(event.target) && !menuButton.current?.contains(event.target)) setMenuOpen(false);
    };
    const mobile = window.matchMedia("(max-width: 767px)");
    const dismissOnBreakpoint = () => {
      setMenuOpen(false);
      if (categoryDetails.current) categoryDetails.current.open = false;
    };
    document.addEventListener("pointerdown", dismissOutside);
    document.addEventListener("focusin", dismissOutside);
    mobile.addEventListener("change", dismissOnBreakpoint);
    return () => {
      document.removeEventListener("pointerdown", dismissOutside);
      document.removeEventListener("focusin", dismissOutside);
      mobile.removeEventListener("change", dismissOnBreakpoint);
    };
  }, []);
  return (
    <>
      <a href="#main" className="site-skip-link">
        {SKIP_LABEL[locale] ?? SKIP_LABEL.en}
      </a>
      <header className="site-header">
        <div className="home-container site-nav-row">
          <Link
            href={`/${locale}`}
            className="site-brand"
            aria-label={SITE.name}
            onClick={() => setMenuOpen(false)}
          >
            <span className="site-brand-mark">
              <BrandLogo size={19} />
            </span>
            <span>{SITE.name.toLowerCase()}</span>
          </Link>
          <nav className="site-desktop-nav" aria-label={t.nav.menu}>
            <Link href={`/${locale}/tools`}>{t.nav.tools}</Link>
            <details ref={categoryDetails} className="site-category-menu">
              <summary>
                {t.nav.categories}
                <span aria-hidden="true">⌄</span>
              </summary>
              <div>
                {CATEGORIES.map((category) => (
                  <Link
                    key={category}
                    href={`/${locale}/categories/${category}`}
                    onClick={(event) =>
                      event.currentTarget
                        .closest("details")
                        ?.removeAttribute("open")
                    }
                  >
                    {t.categories[category].name}
                  </Link>
                ))}
              </div>
            </details>
            <Link href={`/${locale}/about`}>{t.nav.about}</Link>
          </nav>
          <div className="site-nav-actions">
            <button
              type="button"
              onClick={() => {
                if (categoryDetails.current) categoryDetails.current.open = false;
                setPaletteOpen(true);
                setMenuOpen(false);
              }}
              aria-label={t.nav.search}
              className="site-icon-button"
            >
              <Icon name="search" size={18} />
            </button>
            <span className="site-theme-control">
              <ThemeToggle />
            </span>
            <span className="site-language-control">
              <LangSwitch />
            </span>
            <button
              ref={menuButton}
              type="button"
              className="site-mobile-menu-toggle site-icon-button"
              aria-label={t.nav.menu}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen((current) => !current)}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                aria-hidden="true"
              >
                {menuOpen ? (
                  <path d="m6 6 12 12M18 6 6 18" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        <nav
          ref={mobileNavRef}
          id="mobile-navigation"
          className="site-mobile-nav"
          aria-label={t.nav.menu}
          hidden={!menuOpen}
          onClick={(event) => {
            if ((event.target as HTMLElement).closest("a")) setMenuOpen(false);
          }}
        >
          <Link href={`/${locale}/tools`}>{t.nav.tools}</Link>
          <p>{t.nav.categories}</p>
          <div>
            {CATEGORIES.map((category) => (
              <Link key={category} href={`/${locale}/categories/${category}`}>
                {t.categories[category].name}
              </Link>
            ))}
          </div>
          <Link href={`/${locale}/about`}>{t.nav.about}</Link>
          <Link href={`/${locale}/privacy`}>{t.footer.privacy}</Link>
        </nav>
      </header>
      <CommandPalette open={paletteOpen} onClose={closePalette} />
    </>
  );
}

const SKIP_LABEL: Record<string, string> = {
  en: "Skip to content",
  zh: "跳到主要内容",
  ja: "本文へ移動",
  es: "Ir al contenido",
  pt: "Ir para o conteúdo",
  fr: "Aller au contenu",
  de: "Zum Inhalt",
  ru: "Перейти к содержимому",
  it: "Vai al contenuto",
  tr: "İçeriğe geç",
  ko: "본문으로 이동",
  ar: "انتقل إلى المحتوى",
  hi: "सामग्री पर जाएँ",
  id: "Lewati ke konten",
  vi: "Đến nội dung",
};
