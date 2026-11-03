import Link from "next/link";
import { dict } from "@/lib/i18n";
import { CATEGORIES, LOCALES, isLocale, type Locale, type CategoryId } from "@/lib/site";
import { ALL_TOOLS, toolsByCategory } from "@/tools/registry";
import { toolCopy } from "@/lib/tool-copy";
import { Container, SectionHead, ToolCard } from "@/components/ui";
import { Icon } from "@/components/icons";
import { JsonLd } from "@/components/jsonld";
import { RotatingText } from "@/components/rotating-text";
import { Reveal } from "@/components/reveal";
import { CountUp } from "@/components/count-up";
import { RecentTools } from "@/components/recent-tools";
import { HomeWorkspace } from "@/components/home-workspace";
import { HeroIntroSplash, GravityMouseField, QuantumParticles } from "@/components/hero-intro-splash";
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

      {/* Antigravity 开屏入场仪式感 */}
      <HeroIntroSplash />

      {/* Hero Section with Antigravity Gravity-Well & Dot Matrix */}
      <section className="relative overflow-hidden pt-16 sm:pt-24 pb-16">
        {/* Antigravity Blueprint Grid */}
        <div
          aria-hidden="true"
          className="antigravity-grid pointer-events-none absolute inset-0 -z-20 opacity-70 dark:opacity-40"
        />

        {/* 鼠标动态引力光斑追踪与微粒子 */}
        <GravityMouseField />
        <QuantumParticles />

        {/* Antigravity Chromatic Gravity-Well (Google DeepMind 质感重力井光晕) */}
        <div aria-hidden="true" className="gravity-well -z-10" />

        <Container className="relative pb-10 text-center">
          {/* Eyebrow Pill 带实时呼吸灯 */}
          <div className="hero-in flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border hairline bg-[var(--color-card)]/80 px-3.5 py-1.5 text-xs font-medium text-[var(--color-ink)] shadow-xs backdrop-blur-xl">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="mono text-[11px] uppercase tracking-wider text-[var(--color-sub)]">
                Local Runtime
              </span>
              <span className="text-[var(--color-hairline)]">|</span>
              <span className="inline-flex items-center gap-1.5 font-semibold text-[var(--color-accent-strong)]">
                <Icon name="sparkle" size={13} />
                {t.home.eyebrow}
              </span>
            </div>
          </div>

          {/* 高置信度 Hero 标题 */}
          <h1
            className="hero-title mx-auto mt-7 max-w-4xl text-[var(--color-ink)]"
            style={{ animationDelay: "0.08s" }}
          >
            <RotatingText phrases={phrases} />
          </h1>

          <p
            className="hero-in mx-auto mt-5 max-w-2xl text-[16.5px] leading-relaxed text-[var(--color-sub)] sm:text-[18px]"
            style={{ animationDelay: "0.16s" }}
          >
            {fill(t.home.heroSub, { n: ALL_TOOLS.length })}
          </p>
        </Container>

        {/* 首屏工作台 (Antigravity Command Center) */}
        <Container className="relative">
          <div className="hero-in" style={{ animationDelay: "0.24s" }}>
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

          {/* 遥测指标舱 (Telemetry Metrics Pods) */}
          <div className="mx-auto mt-16 max-w-3xl">
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
                  className="ag-card group relative overflow-hidden rounded-2xl p-4 text-center backdrop-blur-md"
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

          {/* 最近使用 */}
          <RecentTools locale={locale} />

          {/* 信任条 (Frosted Trust Capsule) */}
          <div className="mt-10 flex justify-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-x-8 gap-y-2.5 rounded-full border hairline bg-[var(--color-card)]/70 px-6 py-2.5 text-[13px] text-[var(--color-sub)] shadow-xs backdrop-blur-xl">
              <span className="inline-flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[rgba(19,115,51,0.12)] text-[var(--color-good)]">
                  <Icon name="lock" size={12} />
                </span>
                <span className="font-medium text-[var(--color-ink)]">{t.home.trustLocal}</span>
              </span>
              <span className="hidden h-3 w-px bg-[var(--color-hairline)] sm:inline-block" />
              <span className="inline-flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[rgba(19,115,51,0.12)] text-[var(--color-good)]">
                  <Icon name="check" size={12} />
                </span>
                <span className="font-medium text-[var(--color-ink)]">{t.home.trustFree}</span>
              </span>
              <span className="hidden h-3 w-px bg-[var(--color-hairline)] sm:inline-block" />
              <span className="inline-flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[rgba(26,115,232,0.12)] text-[var(--color-accent)]">
                  <Icon name="sparkle" size={12} />
                </span>
                <span className="font-medium text-[var(--color-ink)]">{t.home.trustFast}</span>
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* 分类 Showcase (Antigravity Collections Bento) */}
      <section className="border-y hairline bg-[var(--color-surface)]/60 py-16 sm:py-22">
        <Container>
          <Reveal>
            <SectionHead
              title={t.home.categoriesTitle}
              sub={t.home.categoriesSub}
              badge={
                <span className="mono rounded-full bg-[rgba(26,115,232,0.08)] px-2.5 py-0.5 text-xs font-semibold text-[var(--color-accent-strong)] dark:bg-[rgba(138,180,248,0.15)]">
                  Collections
                </span>
              }
            />
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((c, i) => {
              const catTools = toolsByCategory(c);
              const hue = CATEGORY_HUE[c as CategoryId] ?? 222;
              return (
                <Reveal key={c} delay={(i % 3) * 75}>
                  <div className="ag-card group relative flex h-full flex-col justify-between rounded-2xl p-5">
                    {/* 整卡可点 */}
                    <Link
                      href={`/${locale}/categories/${c}`}
                      aria-label={t.categories[c].name}
                      className="absolute inset-0 z-0 rounded-2xl"
                    />
                    <div>
                      <div className="mb-3.5 flex items-center justify-between">
                        <div
                          className="inline-flex rounded-xl p-2.5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-1"
                          style={{
                            background: `light-dark(hsl(${hue} 90% 94%), hsl(${hue} 40% 20%))`,
                            color: `light-dark(hsl(${hue} 65% 40%), hsl(${hue} 70% 70%))`,
                          }}
                        >
                          <Icon name={CAT_ICONS[c] ?? "file"} size={20} />
                        </div>
                        <span className="mono rounded-full bg-[var(--color-surface)] px-2.5 py-0.5 text-xs font-semibold tabular-nums text-[var(--color-sub)]">
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
                            className="inline-flex items-center rounded-lg border hairline bg-[var(--color-surface)]/60 px-2 py-0.5 text-[12px] font-medium text-[var(--color-sub)] transition-colors hover:border-[var(--color-accent)]/30 hover:bg-[var(--color-card)] hover:text-[var(--color-accent-strong)]"
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

      {/* 热门精选工具 (Featured Matrix) */}
      <Container className="py-16 sm:py-24">
        <Reveal>
          <SectionHead
            title={t.home.featuredTitle}
            sub={t.home.popularSub}
            badge={
              <span className="mono rounded-full bg-[rgba(245,158,11,0.1)] px-2.5 py-0.5 text-xs font-semibold text-amber-600 dark:text-amber-400">
                ★ Top Picks
              </span>
            }
            right={
              <Link
                href={`/${locale}/tools`}
                className="group inline-flex items-center gap-1 text-[13.5px] font-semibold text-[var(--color-accent-strong)]"
              >
                <span>{t.nav.tools}</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1.5">→</span>
              </Link>
            }
          />
        </Reveal>
        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((tool, i) => (
            <Reveal key={tool.slug} delay={(i % 4) * 75}>
              <ToolCard tool={tool} locale={locale} />
            </Reveal>
          ))}
        </div>
      </Container>

      {/* 隐私架构段 (Antigravity Obsidian Containment Zone) */}
      <section id="privacy" className="relative overflow-hidden bg-[#090a0d] py-20 text-white sm:py-26">
        {/* Antigravity Privacy Shield Aura & Pulse Waves */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[460px] w-[820px] rounded-full opacity-20 blur-[130px]"
          style={{
            background:
              "radial-gradient(circle, rgba(16,185,129,0.45) 0%, rgba(56,189,248,0.2) 50%, transparent 70%)",
          }}
        />
        <div
          aria-hidden="true"
          className="shield-pulse-ring pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full border border-emerald-500/20"
        />
        <div
          aria-hidden="true"
          className="shield-pulse-ring pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[820px] w-[820px] rounded-full border border-cyan-500/10"
          style={{ animationDelay: "2.5s" }}
        />
        <Container className="relative text-center">
          <Reveal>
            <div className="mono inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3.5 py-1 text-xs font-medium text-emerald-400 backdrop-blur-md mb-5">
              <Icon name="shield" size={13} />
              <span>Zero-Upload Privacy Architecture</span>
            </div>
            <h2 className="hero-title mx-auto max-w-3xl tracking-tight text-white">
              {t.home.privacyTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[16px] leading-relaxed text-white/70">
              {t.home.privacySub}
            </p>
          </Reveal>
          <div className="mt-14 grid gap-6 text-left sm:grid-cols-3">
            {[
              { icon: "lock", title: t.home.privacyPoint1T, desc: t.home.privacyPoint1D },
              { icon: "key", title: t.home.privacyPoint2T, desc: t.home.privacyPoint2D },
              { icon: "check", title: t.home.privacyPoint3T, desc: t.home.privacyPoint3D },
            ].map((p, i) => (
              <Reveal key={p.title} delay={i * 90}>
                <div className="group h-full rounded-2xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06] hover:shadow-[0_16px_36px_rgba(0,0,0,0.5)]">
                  <span className="inline-flex rounded-xl border border-white/10 bg-gradient-to-br from-blue-500/20 to-emerald-500/20 p-3 text-cyan-400 transition-transform duration-300 group-hover:scale-110">
                    <Icon name={p.icon} size={20} />
                  </span>
                  <h3 className="mt-4 text-[17px] font-semibold text-white tracking-tight">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-white/60">
                    {p.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={180}>
            <Link
              href={`/${locale}/privacy`}
              className="group mt-12 inline-flex items-center gap-1.5 text-[14px] font-semibold text-cyan-400 transition-colors hover:text-cyan-300"
            >
              <span>{t.home.privacyLink}</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1.5">→</span>
            </Link>
          </Reveal>
        </Container>
      </section>

      {/* 收尾 CTA Banner (Antigravity Signature Ink Card) */}
      <Container className="py-20 sm:py-26">
        <Reveal>
          <div className="ag-card relative overflow-hidden rounded-3xl p-8 text-center sm:p-16">
            {/* Chromatic Accent Behind CTA */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[220px] w-[500px] rounded-full opacity-35 blur-[90px] dark:opacity-15"
              style={{
                background:
                  "radial-gradient(circle, rgba(66,133,244,0.6) 0%, rgba(155,81,224,0.35) 60%, transparent 80%)",
              }}
            />
            <h2 className="relative section-title mx-auto max-w-2xl text-[clamp(1.85rem,3.4vw,2.55rem)] font-bold tracking-tight">
              {t.home.endTitle}
            </h2>
            <p className="relative mx-auto mt-3 max-w-xl text-[15px] sm:text-[16px] text-[var(--color-sub)]">
              {t.home.endSub}
            </p>
            <div className="relative mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href={`/${locale}/tools`}
                className="ink-pill group inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-[15px] font-semibold shadow-md"
              >
                <span>{t.home.browseAll}</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1.5">→</span>
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </>
  );
}
