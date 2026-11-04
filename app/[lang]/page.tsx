import Link from "next/link";
import { dict } from "@/lib/i18n";
import { CATEGORIES, LOCALES, isLocale, type Locale, type CategoryId } from "@/lib/site";
import { ALL_TOOLS, toolsByCategory } from "@/tools/registry";
import { toolCopy } from "@/lib/tool-copy";
import { Container, SectionHead, ToolCard, Pill } from "@/components/ui";
import { Icon } from "@/components/icons";
import { JsonLd } from "@/components/jsonld";
import { RotatingText } from "@/components/rotating-text";
import { Reveal } from "@/components/reveal";
import { CountUp } from "@/components/count-up";
import { RecentTools } from "@/components/recent-tools";
import { HomeWorkspace } from "@/components/home-workspace";
import { fill } from "@/tools/_lib/types";
import { SITE } from "@/lib/site";
import { CATEGORY_HUE } from "@/lib/tool-colors";

const UNIT_SLUGS = new Set([
  "length-converter", "weight-converter", "temperature-converter", "data-converter",
  "area-converter", "volume-converter", "speed-converter", "time-converter",
  "energy-converter", "pressure-converter",
]);

const CAT_ICONS: Record<string, string> = {
  pdf: "pdf",
  image: "image",
  text: "text",
  developer: "code",
  seo: "seo",
  security: "shield",
  utility: "calc",
};

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) return null;
  const locale = lang as Locale;
  const t = dict(locale);

  // 首页精选工具:兼顾高频使用与本地隐私优势
  const FEATURED_ORDER = [
    "image-compressor", "merge-pdf", "heic-to-jpg", "split-pdf", "pdf-to-word", "jpg-to-pdf",
    "compress-pdf", "pdf-to-jpg", "word-counter", "password-generator", "json-formatter",
    "case-converter", "currency-converter", "meta-tag-generator",
  ];
  const featured = FEATURED_ORDER.map((s) => ALL_TOOLS.find((tool) => tool.slug === s))
    .filter((x): x is NonNullable<typeof x> => Boolean(x))
    .slice(0, 8);
  const total = ALL_TOOLS.length;
  const phrases = [t.home.heroTitle, ...t.home.rotating];
  // 首页 FAQ:{n} 占位符填真实工具数;同一份数据同时渲染可见手风琴与 FAQPage JSON-LD(ghb-next 的三方同源纪律)
  const homeFaqs = t.home.faqs.map((f) => ({
    q: f.q,
    a: fill(f.a, { n: total, count: total }),
  }));

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: `${SITE.name} — ${t.home.featuredTitle}`,
          itemListElement: featured.map((tool, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: toolCopy(tool, locale).name,
            url: `${SITE.domain}/${locale}/tools/${tool.slug}`,
          })),
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: homeFaqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />

      {/* Hero Section: 苹果官网式纯净、大气发布会风格 */}
      <section className="relative overflow-hidden pt-16 pb-16 sm:pt-24 sm:pb-22">
        <Container className="relative pb-10 text-center">
          {/* Apple Eyebrow Badge */}
          <div className="hero-in flex justify-center">
            <Pill tone="accent">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
              <span>{t.home.eyebrow}</span>
            </Pill>
          </div>

          {/* Apple Display 标题 */}
          <h1
            className="hero-title mx-auto mt-5 max-w-4xl text-[var(--color-ink)]"
            style={{ animationDelay: "0.06s" }}
          >
            <RotatingText phrases={phrases} />
          </h1>

          <p
            className="hero-in mx-auto mt-4.5 max-w-2xl text-[17px] leading-relaxed text-[var(--color-sub)] sm:text-[19px]"
            style={{ animationDelay: "0.12s" }}
          >
            {fill(t.home.heroSub, { n: ALL_TOOLS.length })}
          </p>
        </Container>

        {/* 首屏工作台:macOS Spotlight 风格搜索与分类 */}
        <Container className="relative">
          <div className="hero-in" style={{ animationDelay: "0.18s" }}>
            <HomeWorkspace
              locale={locale}
              tools={ALL_TOOLS.map((tool) => {
                const c = toolCopy(tool, locale);
                return {
                  slug: tool.slug,
                  category: tool.category,
                  icon: tool.icon,
                  name: c.name,
                  tagline: c.tagline,
                };
              })}
              labels={{
                placeholder: t.tools.filterPlaceholder,
                all: t.home.browseAll,
                empty: t.tools.empty,
                clear: t.common.clear,
                popular: t.home.popular,
                pinned: t.home.pinned,
                pin: t.home.pin,
                unpin: t.home.unpin,
                categoryNames: Object.fromEntries(
                  Object.entries(t.categories).map(([k, v]) => [k, v.name]),
                ),
              }}
            />
          </div>

          {/* 核心指标统计条 (仅保留真实数据: 工具数 与 语言数) */}
          <div className="mx-auto mt-14 max-w-lg">
            <dl className="grid grid-cols-2 gap-4 sm:gap-6">
              {[
                {
                  value: <CountUp to={total} />,
                  label: t.home.statsLabels.tools,
                  sub: "100% Free",
                },
                {
                  value: <CountUp to={LOCALES.length} />,
                  label: t.home.statsLabels.languages,
                  sub: "Global Ready",
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="apple-card rounded-2xl p-5 text-center"
                >
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-ink)] tabular-nums">
                      {stat.value}
                    </span>
                    <span className="mt-1.5 block text-[13px] font-semibold text-[var(--color-ink)]">
                      {stat.label}
                    </span>
                    <span className="mt-0.5 block text-[12px] text-[var(--color-sub)]">
                      {stat.sub}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* 最近使用 */}
          <RecentTools locale={locale} />

          {/* 信任承诺条 */}
          <div className="mt-10 flex justify-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-x-8 gap-y-2.5 rounded-full border hairline bg-[var(--color-card)] px-7 py-2.5 text-[13px] text-[var(--color-sub)] shadow-xs">
              <span className="inline-flex items-center gap-2">
                <Icon name="lock" size={14} className="text-[var(--color-good)]" />
                <span className="font-medium text-[var(--color-ink)]">{t.home.trustLocal}</span>
              </span>
              <span className="hidden h-3 w-px bg-[var(--color-hairline)] sm:inline-block" />
              <span className="inline-flex items-center gap-2">
                <Icon name="check" size={14} className="text-[var(--color-good)]" />
                <span className="font-medium text-[var(--color-ink)]">{t.home.trustFree}</span>
              </span>
              <span className="hidden h-3 w-px bg-[var(--color-hairline)] sm:inline-block" />
              <span className="inline-flex items-center gap-2">
                <Icon name="zap" size={14} className="text-[var(--color-accent)]" />
                <span className="font-medium text-[var(--color-ink)]">{t.home.trustFast}</span>
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* 分类 Showcase: 苹果风格 Bento Grid (井井有条) */}
      <section className="border-y hairline bg-[var(--color-surface)] py-18 sm:py-24">
        <Container>
          <Reveal>
            <SectionHead
              title={t.home.categoriesTitle}
              sub={t.home.categoriesSub}
            />
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((c, i) => {
              const catTools = toolsByCategory(c);
              const hue = CATEGORY_HUE[c as CategoryId] ?? 222;
              return (
                <Reveal key={c} delay={(i % 3) * 60}>
                  <div className="apple-card group relative flex h-full flex-col justify-between rounded-2xl p-6">
                    {/* 整卡可点 */}
                    <Link
                      href={`/${locale}/categories/${c}`}
                      aria-label={t.categories[c].name}
                      className="absolute inset-0 z-0 rounded-2xl"
                    />
                    <div>
                      <div className="mb-4 flex items-center justify-between">
                        <div
                          className="inline-flex rounded-xl p-2.5 transition-transform duration-200 group-hover:scale-105"
                          style={{
                            background: `light-dark(hsl(${hue} 90% 94%), hsl(${hue} 40% 20%))`,
                            color: `light-dark(hsl(${hue} 65% 40%), hsl(${hue} 70% 70%))`,
                          }}
                        >
                          <Icon name={CAT_ICONS[c] ?? "file"} size={22} />
                        </div>
                        <span className="rounded-full bg-[var(--color-surface)] px-2.5 py-0.5 text-xs font-semibold tabular-nums text-[var(--color-sub)]">
                          {catTools.length}
                        </span>
                      </div>
                      <h3 className="text-[18px] font-semibold leading-snug tracking-tight text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-accent)]">
                        {t.categories[c].name}
                      </h3>
                      <p className="mt-1.5 text-[14px] leading-relaxed text-[var(--color-sub)]">
                        {t.categories[c].desc}
                      </p>
                    </div>

                    <div className="relative z-10 mt-6 flex flex-wrap items-center gap-1.5 border-t hairline pt-4">
                      {catTools
                        .filter((tool) => tool.engine.component !== undefined && !UNIT_SLUGS.has(tool.slug))
                        .slice(0, 3)
                        .map((tool) => (
                          <Link
                            key={tool.slug}
                            href={`/${locale}/tools/${tool.slug}`}
                            className="inline-flex items-center rounded-lg border hairline bg-[var(--color-surface)]/80 px-2.5 py-1 text-[12.5px] font-medium text-[var(--color-sub)] transition-colors hover:border-[var(--color-accent)]/30 hover:bg-[var(--color-card)] hover:text-[var(--color-accent-strong)]"
                          >
                            {toolCopy(tool, locale).name}
                          </Link>
                        ))}
                      <Link
                        href={`/${locale}/categories/${c}`}
                        className="ml-auto inline-flex items-center text-[13px] font-medium text-[var(--color-accent)] transition-transform group-hover:translate-x-1"
                      >
                        ›
                      </Link>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 热门精选工具 */}
      <Container className="py-18 sm:py-24">
        <Reveal>
          <SectionHead
            title={t.home.featuredTitle}
            sub={t.home.popularSub}
            right={
              <Link
                href={`/${locale}/tools`}
                className="apple-link text-[14.5px]"
              >
                <span>{t.nav.tools}</span>
                <span className="text-base">›</span>
              </Link>
            }
          />
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((tool, i) => (
            <Reveal key={tool.slug} delay={(i % 4) * 60}>
              <ToolCard tool={tool} locale={locale} />
            </Reveal>
          ))}
        </div>
      </Container>

      {/* 全工具目录:SSR 内链锚点 — 每个工具页都从首页获得一条真实链接(PDF24/站内 hub 模式) */}
      <section className="border-t hairline bg-[var(--color-surface)] py-18 sm:py-24">
        <Container>
          <Reveal>
            <SectionHead
              title={t.home.allToolsTitle}
              sub={fill(t.home.allToolsSub, { count: total })}
            />
          </Reveal>
          <div className="mx-auto max-w-3xl">
            {CATEGORIES.map((c) => {
              const catTools = toolsByCategory(c);
              return (
                <div key={c} className="border-b hairline py-5 last:border-b-0">
                  <Link
                    href={`/${locale}/categories/${c}`}
                    className="flex items-baseline gap-2.5"
                  >
                    <h3 className="text-[15px] font-semibold tracking-tight text-[var(--color-ink)]">
                      {t.categories[c].name}
                    </h3>
                    <span className="text-[12px] font-medium tabular-nums text-[var(--color-sub)]">
                      {catTools.length}
                    </span>
                  </Link>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {catTools.map((tool) => (
                      <Link
                        key={tool.slug}
                        href={`/${locale}/tools/${tool.slug}`}
                        className="inline-flex items-center rounded-lg border hairline bg-[var(--color-card)] px-2.5 py-1 text-[12.5px] font-medium text-[var(--color-sub)] transition-colors hover:border-[var(--color-accent)]/30 hover:bg-[var(--color-card)] hover:text-[var(--color-accent-strong)]"
                      >
                        {toolCopy(tool, locale).name}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 苹果经典全黑隐私架构段 (Apple Privacy. That's iPhone. 风格) */}
      <section id="privacy" className="relative overflow-hidden bg-[#000000] py-20 text-white sm:py-28">
        <Container className="relative text-center">
          <Reveal>
            <span className="text-[12px] font-semibold uppercase tracking-wider text-[#2997ff]">
              Privacy Architecture
            </span>
            <h2 className="hero-title mx-auto mt-3 max-w-3xl tracking-tight text-white">
              {t.home.privacyTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[16.5px] leading-relaxed text-[#86868b]">
              {t.home.privacySub}
            </p>
          </Reveal>
          <div className="mt-14 grid gap-6 text-left sm:grid-cols-3">
            {[
              { icon: "lock", title: t.home.privacyPoint1T, desc: t.home.privacyPoint1D },
              { icon: "key", title: t.home.privacyPoint2T, desc: t.home.privacyPoint2D },
              { icon: "check", title: t.home.privacyPoint3T, desc: t.home.privacyPoint3D },
            ].map((p, i) => (
              <Reveal key={p.title} delay={i * 80}>
                <div className="h-full rounded-2xl bg-[#161617] p-7 transition-colors border border-white/5 hover:border-white/10">
                  <span className="inline-flex rounded-xl bg-white/10 p-2.5 text-[#2997ff]">
                    <Icon name={p.icon} size={22} />
                  </span>
                  <h3 className="mt-5 text-[17.5px] font-semibold text-white tracking-tight">
                    {p.title}
                  </h3>
                  <p className="mt-2.5 text-[14.5px] leading-relaxed text-[#86868b]">
                    {p.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={160}>
            <Link
              href={`/${locale}/privacy`}
              className="mt-12 inline-flex items-center gap-1 text-[15px] font-normal text-[#2997ff] hover:underline"
            >
              <span>{t.home.privacyLink}</span>
              <span className="text-base">›</span>
            </Link>
          </Reveal>
        </Container>
      </section>

      {/* 首页可见 FAQ:与上方 FAQPage JSON-LD 同源(可见内容 = 结构化数据,不留空壳 schema) */}
      <section className="py-18 sm:py-24">
        <Container className="max-w-3xl">
          <Reveal>
            <SectionHead title={t.tool.faq} />
          </Reveal>
          <div>
            {homeFaqs.map((f, i) => (
              <details key={i} className="faq" open={i === 0}>
                <summary>{f.q}</summary>
                <p className="faq-a">{f.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      {/* 苹果式收尾 CTA */}
      <Container className="py-20 sm:py-28 text-center">
        <Reveal>
          <div className="apple-card rounded-3xl p-8 sm:p-16">
            <h2 className="section-title mx-auto max-w-2xl text-[clamp(1.85rem,3.4vw,2.5rem)] font-bold tracking-tight text-[var(--color-ink)]">
              {t.home.endTitle}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-[16px] text-[var(--color-sub)]">
              {t.home.endSub}
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                href={`/${locale}/tools`}
                className="apple-btn-primary rounded-full px-8 py-3.5 text-[15px] font-medium shadow-xs"
              >
                {t.home.browseAll}
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </>
  );
}
