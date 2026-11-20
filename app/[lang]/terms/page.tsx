import type { Metadata } from "next";
import { trustCopy } from "@/lib/trust-copy";
import { SITE } from "@/lib/site";
import { dict } from "@/lib/i18n";
import { isLocale, LOCALES, type Locale } from "@/lib/site";
import { HTML_LANG } from "@/lib/i18n";
import { Container, Prose, SectionHead } from "@/components/ui";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: raw } = await params;
  const lang = isLocale(raw) ? raw : "en";
  const t = dict(lang as Locale);
  return {
    title: t.footer.terms,
    alternates: {
      canonical: `/${lang}/terms`,
      languages: { ...Object.fromEntries(LOCALES.map((l) => [HTML_LANG[l], `/${l}/terms`])), "x-default": "/en/terms" },
    },
  };
}

export default async function TermsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) return null;
  const t = dict(lang);
  const copy = trustCopy(lang);
  return (
    <Container className="max-w-3xl py-12">
      <SectionHead as="h1" title={t.footer.terms} />
      <Prose paragraphs={[copy.terms.replace("{brand}", SITE.name)]} />
    </Container>
  );
}
