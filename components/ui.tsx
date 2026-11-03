import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "./icons";
import { dict, type Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/site";
import type { ToolDef } from "@/tools/_lib/types";
import { toolCopy } from "@/lib/tool-copy";
import { tileStyle } from "@/lib/tool-colors";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`apple-card rounded-2xl p-5 sm:p-6 ${className}`}>
      {children}
    </div>
  );
}

export function Pill({
  children,
  tone = "sub",
  className = "",
}: {
  children: ReactNode;
  tone?: "sub" | "accent" | "good" | "glass";
  className?: string;
}) {
  const tones = {
    sub: "bg-[var(--color-surface)] text-[var(--color-sub)] border-transparent",
    accent: "bg-[rgba(0,113,227,0.08)] text-[var(--color-accent)] border-[rgba(0,113,227,0.2)] dark:bg-[rgba(41,151,255,0.12)] dark:border-[rgba(41,151,255,0.25)]",
    good: "bg-[rgba(26,127,55,0.08)] text-[var(--color-good)] border-[rgba(26,127,55,0.2)] dark:bg-[rgba(48,209,88,0.12)] dark:border-[rgba(48,209,88,0.25)]",
    glass: "bg-[var(--color-card)] text-[var(--color-ink)] border-[var(--color-hairline)] shadow-xs",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-all ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

export function SectionHead({
  title,
  sub,
  right,
  badge,
}: {
  title: string;
  sub?: string;
  right?: ReactNode;
  badge?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        {badge ? <div className="mb-2.5">{badge}</div> : null}
        <h2 className="section-title tracking-tight text-[var(--color-ink)]">{title}</h2>
        {sub ? <p className="mt-1.5 text-[15px] sm:text-[16px] leading-relaxed text-[var(--color-sub)]">{sub}</p> : null}
      </div>
      {right}
    </div>
  );
}

export function ToolCard({
  tool,
  locale,
}: {
  tool: ToolDef;
  locale: Locale;
}) {
  const t = dict(locale);
  const c = toolCopy(tool, locale);
  const name = c.name;
  const tagline = c.tagline;
  return (
    <Link
      href={`/${locale}/tools/${tool.slug}`}
      className="apple-card group relative flex flex-col justify-between rounded-2xl p-5"
    >
      <div>
        <div className="mb-3.5 flex items-center justify-between">
          <div
            className="inline-flex rounded-xl p-2.5 transition-transform duration-200 group-hover:scale-105"
            style={tileStyle(tool.slug, tool.category)}
          >
            <Icon name={tool.icon} size={20} />
          </div>
          <span className="rounded-full bg-[var(--color-surface)] px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-sub)]">
            {tool.category}
          </span>
        </div>
        <h3 className="text-[15.5px] font-semibold leading-snug tracking-tight text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-accent)]">
          {name}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-[var(--color-sub)]">
          {tagline}
        </p>
      </div>
      <div className="mt-4 flex items-center text-[13.5px] font-normal text-[var(--color-accent)]">
        <span>{t.common.openTool}</span>
        <span className="ml-0.5 text-base transition-transform duration-150 group-hover:translate-x-1">›</span>
      </div>
    </Link>
  );
}

export function ToolPanel({ children }: { children: ReactNode }) {
  return <div className="apple-card rounded-2xl p-4 sm:p-6">{children}</div>;
}

export function Prose({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="space-y-3.5 text-[16px] leading-7 text-[var(--color-sub)]">
      {paragraphs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}

export function Breadcrumb({
  items,
  locale = "en",
}: {
  items: { label: string; href?: string }[];
  locale?: string;
}) {
  const BREADCRUMB: Partial<Record<string, string>> = {
    en: "Breadcrumb", zh: "面包屑", ja: "パンくずリスト", es: "Miga de pan", pt: "Trilha de navegação",
    fr: "Fil d'Ariane", de: "Brotkrumen", ru: "Навигационная цепочка", it: "Percorso", tr: "Sayfa yolu",
    ko: "탐색 경로", ar: "مسار التنقل", hi: "ब्रेडक्रम", id: "Breadcrumb", vi: "Đường dẫn",
  };
  return (
    <nav aria-label={BREADCRUMB[locale] ?? "Breadcrumb"} className="mb-6 text-[13px] text-[var(--color-sub)]">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden>/</span>}
            {it.href ? (
              <Link href={it.href} className="hover:text-[var(--color-ink)]">
                {it.label}
              </Link>
            ) : (
              <span className="text-[var(--color-ink)]">{it.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function D({ locale }: { locale: Locale }): Dictionary {
  return dict(locale);
}
