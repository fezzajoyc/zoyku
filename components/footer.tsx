"use client";

import Link from "next/link";
import { SITE } from "@/lib/site";
import { HOME_COPY } from "@/lib/home-copy";
import { useI18n } from "./i18n-provider";
import { BrandLogo } from "./brand-logo";

export function Footer() {
  const { locale, t } = useI18n();
  return (
    <footer className="site-footer">
      <div className="home-container site-footer-row">
        <div className="site-footer-brand">
          <Link href={`/${locale}`} className="site-brand">
            <span className="site-brand-mark">
              <BrandLogo size={14} />
            </span>
            <span>{SITE.name.toLowerCase()}</span>
          </Link>
          <span>{HOME_COPY[locale].footer}</span>
        </div>
        <nav aria-label={t.nav.menu}>
          <Link href={`/${locale}/tools`} prefetch={false}>{t.nav.tools}</Link>
          <Link href={`/${locale}#categories`} prefetch={false}>{t.nav.categories}</Link>
          <Link href={`/${locale}/about`} prefetch={false}>{t.footer.about}</Link>
          <Link href={`/${locale}/privacy`} prefetch={false}>{t.footer.privacy}</Link>
          <Link href={`/${locale}/terms`} prefetch={false}>{t.footer.terms}</Link>
          <Link href={`/${locale}/mcp`} prefetch={false}>MCP</Link>
        </nav>
        <div className="site-footer-meta">
          <span>
            © {new Date().getFullYear()} {SITE.name}
          </span>
          <a
            href="https://github.com/fezzajoyc/zoyku/issues"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.footer.reportIssue}
          >
            <IconGitHub />
          </a>
        </div>
      </div>
    </footer>
  );
}

function IconGitHub() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.86c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03a9.6 9.6 0 0 1 5 0c1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.69-4.58 4.94.36.31.68.92.68 1.86v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}
