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

  // 首页热门位排序:最能体现"隐私文件不上传"的工具优先
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

      {/* Hero Section (大厂纯净工整布局) */}
      <section className="hero-glow-bg relative overflow-hidden pt-14 pb-16 sm:pt-20 sm:pb-20">
        <Container className="relative pb-10 text-center">
          {/* Eyebrow Pill */}
          <div className="hero-in flex justify-center">
            <Pill tone="accent">
              <Icon name="sparkle" size={13} />
              <span>{t.home.eyebrow}</span>
            </Pill>
          </div>

          {/* H1 权威标题 */}
          <h1
            className="hero-title mx-auto mt-5 max-w-4xl text-[var(--color-ink)]"
            style={{ animationDelay: "0.06s" }}
          >
            <RotatingText phrases={phrases} />
          </h1>

          <p
            className="hero-in mx-auto mt-4 max-w-2xl text-[16px] leading-relaxed text-[var(--color-sub)] sm:text-[17.5px]"
            style={{ animationDelay: "0.12s" }}
          >
            {fill(t.home.heroSub, { n: ALL_TOOLS.length })}
          </p>
        </Container>

        {/* 首屏核心工作台 (直接进入工具搜索与分流) */}
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
                pinned: t.home.pinned,
                pin: t.home.pin,
                unpin: t.home.unpin,
                categoryNames: Object.fromEntries(
                  Object.entries(t.categories).map(([k, v]) => [k, v.name]),
                ),
              }}
            />
          </div>

          {/* 核心指标统计条 */}
          <div className="mx-auto mt-14 max-w-3xl">
            <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              {[
                {
                  value: <CountUp to={total} />,
                  label: t.home.statsLabels.tools,
                  sub: "100% Free",
                },
                {
                  value: "0",
                  label: t.home.statsLabels.uploads,
                  sub: "In-Memory",
                },
                {
                  value: <CountUp to={LOCALES.length} />,
                  label: t.home.statsLabels.languages,
                  sub: "Global Ready",
                },
                {
                  value: "0",
                  label: t.home.statsLabels.accounts,
                  sub: "Instant Access",
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="tool-card-pro rounded-xl p-4 text-center"
                >
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="gradient-text block text-2xl font-bold tracking-tight sm:text-3xl tabular-nums">
                      {stat.value}
                    </span>
                    <span className="mt-1 block text-xs font-semibold uppercase tracking-wider text-[var(--color-ink)]">
                      {stat.label}
                    </span>
                    <span className="mono mt-0.5 block text-[11px] text-[var(--color-sub)]">
                      {stat.sub}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* 最近使用记录 */}
          <RecentTools locale={locale} />

          {/* 信任承诺条 */}
          <div className="mt-8 flex justify-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-x-8 gap-y-2.5 rounded-full border hairline bg-[var(--color-card)] px-6 py-2.5 text-[13px] text-[var(--color-sub)] shadow-xs">
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
                <Icon name="sparkle" size={14} className="text-[var(--color-accent)]" />
                <span className="font-medium text-[var(--color-ink)]">{t.home.trustFast}</span>
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* 分类 Showcase (严谨工整的 Bento Grid) */}
      <section className="border-y hairline bg-[var(--color-surface)] py-16 sm:py-20">
        <Container>
          <Reveal>
            <SectionHead
              title={t.home.categoriesTitle}
              sub={t.home.categoriesSub}
            />
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((c, i) => {
              const catTools = toolsByCategory(c);
              const hue = CATEGORY_HUE[c as CategoryId] ?? 222;
              return (
                <Reveal key={c} delay={(i % 3) * 60}>
                  <div className="tool-card-pro group relative flex h-full flex-col justify-between rounded-xl p-5">
                    {/* 整卡可点 */}
                    <Link
                      href={`/${locale}/categories/${c}`}
                      aria-label={t.categories[c].name}
                      className="absolute inset-0 z-0 rounded-xl"
                    />
                    <div>
                      <div className="mb-3.5 flex items-center justify-between">
                        <div
                          className="inline-flex rounded-xl p-2.5 transition-transform duration-200 group-hover:scale-105"
                          style={{
                            background: `light-dark(hsl(${hue} 90% 94%), hsl(${hue} 40% 20%))`,
                            color: `light-dark(hsl(${hue} 65% 40%), hsl(${hue} 70% 70%))`,
                          }}
                        >
                          <Icon name={CAT_ICONS[c] ?? "file"} size={20} />
                        </div>
                        <span className="mono rounded-md bg-[var(--color-surface)] px-2.5 py-0.5 text-xs font-semibold tabular-nums text-[var(--color-sub)]">
                          {catTools.length}
                        </span>
                      </div>
                      <h3 className="text-[17px] font-semibold leading-snug tracking-tight text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-accent)]">
                        {t.categories[c].name}
                      </h3>
                      <p className="mt-1.5 text-[13.5px] leading-relaxed text-[var(--color-sub)]">
                        {t.categories[c].desc}
                      </p>
                    </div>

                    <div className="relative z-10 mt-5 flex flex-wrap items-center gap-1.5 border-t hairline pt-3.5">
                      {catTools
                        .filter((tool) => tool.engine.component !== undefined && !UNIT_SLUGS.has(tool.slug))
                        .slice(0, 3)
                        .map((tool) => (
                          <Link
                            key={tool.slug}
                            href={`/${locale}/tools/${tool.slug}`}
                            className="inline-flex items-center rounded-md border hairline bg-[var(--color-surface)]/60 px-2 py-0.5 text-[12px] font-medium text-[var(--color-sub)] transition-colors hover:border-[var(--color-accent)]/30 hover:bg-[var(--color-card)] hover:text-[var(--color-accent-strong)]"
                          >
                            {toolCopy(tool, locale).name}
                          </Link>
                        ))}
                      <Link
                        href={`/${locale}/categories/${c}`}
                        className="ml-auto inline-flex items-center text-[12.5px] font-semibold text-[var(--color-accent-strong)] transition-transform group-hover:translate-x-1"
                      >
                        →
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
      <Container className="py-16 sm:py-22">
        <Reveal>
          <SectionHead
            title={t.home.featuredTitle}
            sub={t.home.popularSub}
            right={
              <Link
                href={`/${locale}/tools`}
                className="group inline-flex items-center gap-1 text-[13.5px] font-semibold text-[var(--color-accent-strong)]"
              >
                <span>{t.nav.tools}</span>
                <span className="transition-transform duration-150 group-hover:translate-x-1">→</span>
              </Link>
            }
          />
        </Reveal>
        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((tool, i) => (
            <Reveal key={tool.slug} delay={(i % 4) * 60}>
              <ToolCard tool={tool} locale={locale} />
            </Reveal>
          ))}
        </div>
      </Container>

      {/* 企业级隐私安全架构段 (严谨、权威、零假大空) */}
      <section id="privacy" className="relative overflow-hidden bg-slate-950 py-18 text-white sm:py-24">
        <Container className="relative text-center">
          <Reveal>
            <div className="mono inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3.5 py-1 text-xs font-medium text-emerald-400 mb-4">
              <Icon name="shield" size={13} />
              <span>100% Client-Side Sandbox Security</span>
            </div>
            <h2 className="hero-title mx-auto max-w-3xl tracking-tight text-white">
              {t.home.privacyTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[16px] leading-relaxed text-slate-300">
              {t.home.privacySub}
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 text-left sm:grid-cols-3">
            {[
              { icon: "lock", title: t.home.privacyPoint1T, desc: t.home.privacyPoint1D },
              { icon: "key", title: t.home.privacyPoint2T, desc: t.home.privacyPoint2D },
              { icon: "check", title: t.home.privacyPoint3T, desc: t.home.privacyPoint3D },
            ].map((p, i) => (
              <Reveal key={p.title} delay={i * 80}>
                <div className="h-full rounded-xl border border-white/10 bg-white/[0.04] p-6 transition-colors hover:border-white/20 hover:bg-white/[0.06]">
                  <span className="inline-flex rounded-lg bg-blue-500/20 p-2.5 text-blue-400">
                    <Icon name={p.icon} size={20} />
                  </span>
                  <h3 className="mt-4 text-[16.5px] font-semibold text-white tracking-tight">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-slate-400">
                    {p.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={160}>
            <Link
              href={`/${locale}/privacy`}
              className="group mt-10 inline-flex items-center gap-1.5 text-[14px] font-semibold text-blue-400 transition-colors hover:text-blue-300"
            >
              <span>{t.home.privacyLink}</span>
              <span className="transition-transform duration-150 group-hover:translate-x-1">→</span>
            </Link>
          </Reveal>
        </Container>
      </section>

      {/* 收尾 CTA */}
      <Container className="py-18 sm:py-24 text-center">
        <Reveal>
          <div className="tool-card-pro rounded-2xl p-8 sm:p-14">
            <h2 className="section-title mx-auto max-w-2xl text-[clamp(1.75rem,3.2vw,2.4rem)] font-bold tracking-tight">
              {t.home.endTitle}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-[15px] sm:text-[16px] text-[var(--color-sub)]">
              {t.home.endSub}
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                href={`/${locale}/tools`}
                className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-ink)] px-8 py-3.5 text-[15px] font-semibold text-white shadow-sm transition-all hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
              >
                <span>{t.home.browseAll}</span>
                <span className="transition-transform duration-150 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </>
  );
}
