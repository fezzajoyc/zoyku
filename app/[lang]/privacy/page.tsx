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
    title: t.footer.privacy,
    alternates: {
      canonical: `/${lang}/privacy`,
      languages: { ...Object.fromEntries(LOCALES.map((l) => [HTML_LANG[l], `/${l}/privacy`])), "x-default": "/en/privacy" },
    },
  };
}

export default async function PrivacyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) return null;
  const t = dict(lang);
  const copy = trustCopy(lang);
  return (
    <Container className="max-w-3xl py-12">
      <SectionHead as="h1" title={t.footer.privacy} />
      <Prose paragraphs={[copy.local, copy.network.replace("{query}", copy.fields.join("; ")).replace("{provider}", "Google Public DNS · ipwho.is · RDAP · ExchangeRate-API"), copy.downloads, copy.storage, copy.hosting]} />
      <section className="mt-8 border-t hairline pt-6">
        <h2 className="text-lg font-semibold">{copy.sources}</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {[
            ["Google Public DNS", "https://developers.google.com/speed/public-dns/privacy"],
            ["ipwho.is", "https://ipwhois.io/documentation"],
            ["ICANN · RDAP", "https://www.icann.org/rdap"],
            ["ExchangeRate-API", "https://www.exchangerate-api.com/terms"],
            ["jsDelivr", "https://www.jsdelivr.com/terms/privacy-policy"],
            ["Vercel", "https://vercel.com/docs/analytics/privacy-policy"],
          ].map(([label, url]) => <li key={label}><a className="underline underline-offset-4" href={url} rel="noreferrer" target="_blank">{label} ↗</a></li>)}
        </ul>
      </section>
    </Container>
  );
}
