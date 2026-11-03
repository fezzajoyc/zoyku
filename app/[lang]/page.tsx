import Link from "next/link";
import { dict } from "@/lib/i18n";
import { CATEGORIES, LOCALES, isLocale, type Locale } from "@/lib/site";
import { ALL_TOOLS, toolsByCategory } from "@/tools/registry";
import { toolCopy } from "@/lib/tool-copy";
import { Container, Pill, SectionHead, ToolCard } from "@/components/ui";
import { Icon } from "@/components/icons";
import { JsonLd } from "@/components/jsonld";
import { RotatingText } from "@/components/rotating-text";
import { Marquee } from "@/components/marquee";
import { Reveal } from "@/components/reveal";
import { CountUp } from "@/components/count-up";
import { RecentTools } from "@/components/recent-tools";
import { HomeWorkspace } from "@/components/home-workspace";
import { fill } from "@/tools/_lib/types";
import { SITE } from "@/lib/site";

// 首页 marquee 的明星工具(slug, 每行 8 个,双向滚动)
const MARQUEE_ROW_1 = ["merge-pdf", "image-compressor", "word-counter", "json-formatter", "qr-generator", "image-resizer", "split-pdf", "password-generator"];
const MARQUEE_ROW_2 = ["case-converter", "pdf-to-word", "currency-converter", "color-converter", "remove-duplicate-lines", "text-diff", "heic-to-jpg", "regex-tester"];

const UNIT_SLUGS = new Set([
  "length-converter", "weight-converter", "temperature-converter", "data-converter",
  "area-converter", "volume-converter", "speed-converter", "time-converter",
  "energy-converter", "pressure-converter",
]);

function Chip({ slug, locale }: { slug: string; locale: Locale }) {
  const tool = ALL_TOOLS.find((tl) => tl.slug === slug);
  if (!tool) return null;
  return (
    <Link
      href={`/${locale}/tools/${tool.slug}`}
      className="inline-flex flex-none items-center gap-2 rounded-full border hairline bg-[var(--color-card)] px-4 py-2.5 text-[13.5px] font-medium text-[var(--color-ink)] shadow-[0_2px_10px_rgba(0,0,0,0.05)] transition-transform hover:scale-105"
    >
      <span className="text-[var(--color-accent)]">
        <Icon name={tool.icon} size={16} />
      </span>
      {toolCopy(tool, locale).name}
    </Link>
  );
}

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) return null;
  const locale = lang as Locale;
  const t = dict(locale);
  // 首页热门位排序:最能体现"隐私文件不上传"的工具优先(PDF/图像交错),避免同类扎堆
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

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="hero-blob pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(0,113,227,0.5), rgba(122,77,214,0.35), transparent)",
          }}
        />
        <Container className="relative pb-12 pt-20 text-center sm:pt-28">
          <div className="hero-in">
            <Pill tone="accent">
              <Icon name="sparkle" size={13} />
              {t.home.eyebrow}
            </Pill>
          </div>
          <h1
            className="hero-title mx-auto mt-5 max-w-3xl"
            style={{ animationDelay: "0.08s" }}
          >
            <RotatingText phrases={phrases} />
          </h1>
          <p
            className="hero-in mx-auto mt-5 max-w-2xl text-[17px] leading-7 text-[var(--color-sub)]"
            style={{ animationDelay: "0.16s" }}
          >
            {fill(t.home.heroSub, { n: ALL_TOOLS.length })}
          </p>
        </Container>
        {/* 首屏工作台:搜索 + 分类胶囊 + 全工具网格(TinyWow × iLovePDF) */}
        <Container className="relative pb-14">
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
                categoryNames: Object.fromEntries(
                  Object.entries(t.categories).map(([k, v]) => [k, v.name]),
                ),
              }}
            />
          </div>

          {/* 数字条:count-up */}
          <dl className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-y-6 sm:grid-cols-4">
            {[
              { n: <CountUp to={total} />, raw: total, label: t.home.statsLabels.tools },
              { n: <CountUp to={LOCALES.length} />, raw: LOCALES.length, label: t.home.statsLabels.languages },
              { n: 0, raw: 0, label: t.home.statsLabels.uploads },
              { n: 0, raw: 0, label: t.home.statsLabels.accounts },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <dt className="sr-only">{s.raw} {s.label}</dt>
                <dd>
                  <span className="gradient-text block text-[26px] font-bold tabular-nums tracking-tight">
                    {s.n}
                  </span>
                  <span className="mt-0.5 block text-[13px] text-[var(--color-sub)]">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>

          <RecentTools locale={locale} />

          {/* 信任条 */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 border-t hairline pt-6 text-[13.5px] text-[var(--color-sub)]">
            <span className="inline-flex items-center gap-1.5">
              <Icon name="lock" size={14} className="text-[var(--color-good)]" /> {t.home.trustLocal}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Icon name="check" size={14} className="text-[var(--color-good)]" /> {t.home.trustFree}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Icon name="sparkle" size={14} className="text-[var(--color-good)]" /> {t.home.trustFast}
            </span>
          </div>
        </Container>
      </section>

      {/* 分类 */}
      <section className="border-y hairline bg-[var(--color-surface)]">
        <Container className="py-16 sm:py-20">
          <Reveal>
            <SectionHead title={t.home.categoriesTitle} sub={t.home.categoriesSub} />
          </Reveal>
          <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((c, i) => {
              const catTools = toolsByCategory(c);
              return (
                <Reveal key={c} delay={(i % 3) * 90}>
                  <div
                    className={`relative flex h-full flex-col rounded-2xl border hairline bg-[var(--color-card)] p-5 transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.07)]`}
                  >
                    {/* 整卡可点:伪元素拉伸分类链接铺满卡片,内部工具链接仍各自可点 */}
                    <Link
                      href={`/${locale}/categories/${c}`}
                      aria-label={t.categories[c].name}
                      className="absolute inset-0 rounded-2xl after:absolute after:inset-0"
                    />
                    <div className="mb-3 inline-flex w-fit rounded-xl bg-[var(--color-surface)] p-2.5">
                      <Icon name={c === "pdf" ? "pdf" : c} size={20} />
                    </div>
                    <h3 className="font-semibold">
                      {t.categories[c].name}
                      <span className="ml-2 text-[13px] font-normal text-[var(--color-sub)]">
                        {catTools.length}
                      </span>
                    </h3>
                    <p className="mt-1.5 text-[13.5px] leading-5 text-[var(--color-sub)]">
                      {t.categories[c].desc}
                    </p>
                    <div className="relative z-10 mt-auto flex flex-wrap gap-x-3 gap-y-1 pt-3 text-[13px] font-medium text-[var(--color-accent-strong)]">
                      {catTools
                        .filter((tool) => tool.engine.component !== undefined && !UNIT_SLUGS.has(tool.slug))
                        .slice(0, 3)
                        .map((tool) => (
                        <Link
                          key={tool.slug}
                          href={`/${locale}/tools/${tool.slug}`}
                          className="hover:underline"
                        >
                          {toolCopy(tool, locale).name}
                        </Link>
                      ))}
                      <Link href={`/${locale}/categories/${c}`} className="hover:underline">
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

      {/* 热门工具 */}
      <Container className="py-16 sm:py-20">
        <Reveal>
          <SectionHead
            title={t.home.featuredTitle}
            sub={t.home.popularSub}
            right={
              <Link
                href={`/${locale}/tools`}
                className="text-[13.5px] font-medium text-[var(--color-accent-strong)]"
              >
                {t.nav.tools} →
              </Link>
            }
          />
        </Reveal>
        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((tool, i) => (
            <Reveal key={tool.slug} delay={(i % 4) * 80}>
              <ToolCard tool={tool} locale={locale} />
            </Reveal>
          ))}
        </div>
      </Container>

      {/* 隐私主张(暗色段) */}
      <section id="privacy" className="bg-[var(--color-ink)] text-white">
        <Container className="py-16 text-center sm:py-24">
          <Reveal>
            <h2 className="hero-title mx-auto max-w-3xl">{t.home.privacyTitle}</h2>
            <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-7 text-white/65">
              {t.home.privacySub}
            </p>
          </Reveal>
          <div className="mt-12 grid gap-8 text-left sm:grid-cols-3">
            {[
              { icon: "lock", title: t.home.privacyPoint1T, desc: t.home.privacyPoint1D },
              { icon: "key", title: t.home.privacyPoint2T, desc: t.home.privacyPoint2D },
              { icon: "check", title: t.home.privacyPoint3T, desc: t.home.privacyPoint3D },
            ].map((p, i) => (
              <Reveal key={p.title} delay={i * 110}>
                <div className="rounded-2xl bg-white/5 p-6">
                  <span className="inline-flex rounded-xl bg-white/10 p-2.5 text-[#6db2ff]">
                    <Icon name={p.icon} size={20} />
                  </span>
                  <h3 className="mt-4 font-semibold">{p.title}</h3>
                  <p className="mt-2 text-[14px] leading-6 text-white/60">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={220}>
            <Link
              href={`/${locale}/privacy`}
              className="mt-10 inline-block text-[14px] font-medium text-[#6db2ff] hover:underline"
            >
              {t.home.privacyLink} →
            </Link>
          </Reveal>
        </Container>
      </section>

      {/* 收尾 CTA */}
      <Container className="py-16 text-center sm:py-24">
        <Reveal>
          <h2 className="section-title mx-auto max-w-2xl text-[clamp(1.6rem,3vw,2.4rem)]">
            {t.home.endTitle}
          </h2>
          <p className="mt-3 text-[15px] text-[var(--color-sub)]">{t.home.endSub}</p>
          <Link
            href={`/${locale}/tools`}
            className="mt-8 inline-block rounded-full bg-[var(--color-accent)] px-8 py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-[var(--color-accent-strong)]"
          >
            {t.home.browseAll}
          </Link>
        </Reveal>
      </Container>
    </>
  );
}
