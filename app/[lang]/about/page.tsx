import type { Metadata } from "next";
import { trustCopy } from "@/lib/trust-copy";
import { SITE } from "@/lib/site";
import { dict } from "@/lib/i18n";
import { isLocale, LOCALES, type Locale } from "@/lib/site";
import { HTML_LANG } from "@/lib/i18n";
import { ALL_TOOLS } from "@/tools/registry";
import { Container, Prose, SectionHead } from "@/components/ui";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: raw } = await params;
  const lang = isLocale(raw) ? raw : "en";
  const t = dict(lang as Locale);
  return {
    title: t.nav.about,
    alternates: {
      canonical: `/${lang}/about`,
      languages: { ...Object.fromEntries(LOCALES.map((l) => [HTML_LANG[l], `/${l}/about`])), "x-default": "/en/about" },
    },
  };
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) return null;
  const t = dict(lang as Locale);
  const copy = trustCopy(lang);
  return (
    <Container className="max-w-3xl py-12">
      <SectionHead as="h1" title={t.nav.about} />
      <Prose paragraphs={[copy.about.replace("{brand}", SITE.name), copy.quality, copy.limits]} />
      <a className="mt-6 inline-block underline underline-offset-4" href="https://github.com/fezzajoyc/zoyku/issues" target="_blank" rel="noreferrer">{t.footer.reportIssue} ↗</a>
      <p className="mt-4"><a className="underline underline-offset-4" href={`/${lang}/privacy`}>{copy.details}</a></p>
      <p className="mt-6 text-[14px] text-[var(--color-sub)]">
        {ALL_TOOLS.length} {t.home.statsLabels.tools} · {LOCALES.length} {t.home.statsLabels.languages}
      </p>
    </Container>
  );
}

