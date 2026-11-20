import Link from "next/link";
import { dict } from "@/lib/i18n";
import { CATEGORIES, SITE, isLocale } from "@/lib/site";
import { ALL_TOOLS, toolsByCategory } from "@/tools/registry";
import { toolCopy } from "@/lib/tool-copy";
import { HOME_COPY, HOME_EDITORIAL } from "@/lib/home-copy";
import { Icon } from "@/components/icons";
import { JsonLd } from "@/components/jsonld";
import { HomeWorkspace } from "@/components/home-workspace";
import { RibbonBackground } from "@/components/ribbon-background";
import { HomeMaterialScene } from "@/components/home-material-scene";

const EDITORIAL_SLUGS = [
  "merge-pdf",
  "image-compressor",
  "word-counter",
  "json-formatter",
];
const CAT_ICONS: Record<string, string> = {
  pdf: "file",
  image: "image",
  text: "text",
  developer: "code",
  seo: "seo",
  security: "shield",
  utility: "grid",
};

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) return null;
  const t = dict(lang);
  const copy = HOME_COPY[lang];
  const editorial = HOME_EDITORIAL[lang];
  const featured = EDITORIAL_SLUGS.flatMap(
    (slug) => ALL_TOOLS.find((tool) => tool.slug === slug) ?? [],
  );
  return (
    <HomeMaterialScene>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: `${SITE.name} — ${editorial.title}`,
          itemListElement: featured.map((tool, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: toolCopy(tool, lang).name,
            url: `${SITE.domain}/${lang}/tools/${tool.slug}`,
          })),
        }}
      />
      <div className="home-material-ambient" aria-hidden="true">
        <RibbonBackground />
      </div>
      <section className="home-hero" aria-labelledby="home-heading">
        <div className="home-container home-hero-content">
          <p className="home-eyebrow">
            <span aria-hidden="true" />
            {copy.count.replace("{n}", String(ALL_TOOLS.length))}
          </p>
          <h1 id="home-heading" className="home-title">
            <span>{copy.title[0]}</span>
            <span>
              {copy.title[1]} <em>{copy.title[2]}</em>
            </span>
          </h1>
          <p className="home-description">{copy.description}</p>
          <HomeWorkspace
            locale={lang}
            tools={ALL_TOOLS.map((tool) => ({
              slug: tool.slug,
              category: tool.category,
              icon: tool.icon,
              name: toolCopy(tool, lang).name,
              tagline: toolCopy(tool, lang).tagline,
            }))}
            labels={{
              placeholder: t.tools.filterPlaceholder,
              all: t.home.browseAll,
              empty: t.tools.empty,
              clear: t.common.clear,
              popular: copy.try,
              pinned: t.home.pinned,
              pin: t.home.pin,
              unpin: t.home.unpin,
              categoryNames: Object.fromEntries(
                Object.entries(t.categories).map(([key, value]) => [
                  key,
                  value.name,
                ]),
              ),
            }}
          />
          <ul className="home-trust" aria-label={copy.privacyEyebrow}>
            <li>
              <Icon name="shield" size={16} />
              {copy.noSignup}
            </li>
            <li>
              <Icon name="zap" size={16} />
              {copy.localFiles}
            </li>
            <li>
              <Icon name="check" size={16} />
              {copy.free}
            </li>
          </ul>
        </div>
      </section>
      <div className="home-container home-sections">
        <section
          aria-labelledby="home-popular-heading"
          className="home-editorial"
        >
          <div className="home-section-heading">
            <h2 id="home-popular-heading">{editorial.title}</h2>
            <Link href={`/${lang}/tools`}>
              {t.nav.tools}
              <span className="home-link-arrow" aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="home-editorial-grid">
            {featured.map((tool, index) => {
              const c = toolCopy(tool, lang);
              return (
                <Link
                  key={tool.slug}
                  href={`/${lang}/tools/${tool.slug}`}
                  data-editorial-tool={tool.slug}
                  className={`home-tool-card home-tone-${tool.category}`}
                >
                  <span className="home-tool-icon">
                    {tool.slug === "word-counter" ? (
                      <span aria-hidden="true">Aa</span>
                    ) : tool.slug === "json-formatter" ? (
                      <span aria-hidden="true">{"{ }"}</span>
                    ) : (
                      <Icon
                        name={tool.slug === "merge-pdf" ? "file" : tool.icon}
                        size={24}
                      />
                    )}
                  </span>
                  <span className="home-tool-copy">
                    <h3>{c.name}</h3>
                    <span className="home-card-tagline">
                      {editorial.summaries[index]}
                    </span>
                  </span>
                  <span className="home-card-arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
        <section
          id="categories"
          aria-labelledby="home-categories-heading"
          className="home-categories"
        >
          <div className="home-section-heading">
            <h2 id="home-categories-heading">{copy.categories}</h2>
            <Link href={`/${lang}/tools`}>
              {copy.browseCategories}
              <span className="home-link-arrow" aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="home-category-grid">
            {CATEGORIES.map((category) => (
              <Link
                key={category}
                href={`/${lang}/categories/${category}`}
                data-home-category={category}
                className={`home-category-card home-tone-${category}`}
              >
                <span className="home-category-icon">
                  <Icon name={CAT_ICONS[category]} size={21} />
                </span>
                <span>
                  <h3>{t.categories[category].name}</h3>
                  <span className="home-category-count">
                    {toolsByCategory(category).length}{" "}
                    {t.home.statsLabels.tools}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </section>
        <section
          className="home-privacy"
          aria-labelledby="home-privacy-heading"
        >
          <span className="home-privacy-icon">
            <Icon name="shield" size={28} />
          </span>
          <div className="home-privacy-copy">
            <p>{copy.privacyEyebrow}</p>
            <h2 id="home-privacy-heading">{copy.privacyTitle}</h2>
            <span>{copy.privacyBody}</span>
          </div>
          <Link href={`/${lang}/privacy`}>
            <span className="home-privacy-link-text">{t.home.privacyLink}</span>
            <span className="home-link-arrow" aria-hidden="true">→</span>
          </Link>
        </section>
      </div>
    </HomeMaterialScene>
  );
}
