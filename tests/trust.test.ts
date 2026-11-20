import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { toolCopy } from '@/lib/tool-copy';
import { ALL_TOOLS, TOOL_BY_SLUG } from '@/tools/registry';
import { LOCALES } from '@/lib/site';
import { dict } from '@/lib/i18n';
import sitemap from '@/app/sitemap';
import { categoryIntro } from '@/tools/_lib/category-intros';
import { GET as markdown } from '@/app/[lang]/tools-md/[slug]/route';
import PrivacyPage from '@/app/[lang]/privacy/page';
import AboutPage from '@/app/[lang]/about/page';

describe('truthful tool content', () => {
  it('keeps authored FAQs instead of appending unrelated category promises', () => {
    const pdf = TOOL_BY_SLUG.get('compress-pdf')!;
    expect(toolCopy(pdf, 'en').faqs).toEqual(pdf.copy.en.faqs);
    expect(toolCopy(pdf, 'en').faqs.map(f=>f.a).join(' ')).not.toContain('not re-encoded page by page');
    const dns = TOOL_BY_SLUG.get('dns-lookup')!;
    expect(toolCopy(dns, 'en').faqs).toEqual(dns.copy.en.faqs);
  });
  it('all tools still have meaningful authored FAQs across every locale', () => {
    for (const tool of ALL_TOOLS) for (const locale of LOCALES) {
      const copy = toolCopy(tool, locale);
      expect(copy.faqs.length, `${tool.slug}:${locale}`).toBeGreaterThanOrEqual(2);
      expect(copy.faqs.every(f=>f.q.trim() && f.a.trim())).toBe(true);
    }
  });
  it('network-assisted markdown discloses the actual provider instead of claiming all input stays local', async () => {
    for (const [slug, provider] of [['dns-lookup', 'Google'],['email-validator','Google'],['ip-lookup','ipwho.is'],['whois-lookup','RDAP']] as const) {
      const res = await markdown(new Request(`https://zoyku.com/en/tools/${slug}.md`), {params:Promise.resolve({lang:'en',slug})});
      const body = await res.text();
      expect(body.split('## What it does')[0], slug).toContain(provider);
      expect(body.split('## What it does')[0], slug).not.toContain('user data never leaves');
    }
  });
  it('does not advertise build time as every URL content modification date', () => {
    expect(sitemap().every(entry=>entry.lastModified === undefined)).toBe(true);
  });
  it('extended locale category introductions start with localized category context', () => {
    for (const locale of ['de','fr','ar','hi','vi'] as const) {
      expect(categoryIntro('pdf',locale)[0]).toBe(dict(locale).categories.pdf.desc);
    }
  });
  it('privacy explains local storage, network queries, CDN resources and analytics in each locale', async () => {
    for (const lang of LOCALES) {
      const html = renderToStaticMarkup(await PrivacyPage({params:Promise.resolve({lang})}));
      expect(html,lang).toContain('Google');
      expect(html,lang).toContain('ipwho.is');
      expect(html,lang).toContain('Vercel');
      expect(html,lang).toContain('jsDelivr');
      expect(html,lang).not.toContain('Text and numbers you enter stay in the page.');
      if(lang !== 'en') expect(html,lang).not.toContain('Short version:');
    }
  });
  it('lookup descriptions expose provider limits without blanket personal-data promises', () => {
    for (const lang of LOCALES) for (const slug of ['ip-lookup','whois-lookup']) {
      const copy = toolCopy(TOOL_BY_SLUG.get(slug)!,lang);
      const text=[...copy.intro,...copy.faqs.map(f=>f.a)].join(' ');
      expect(text).not.toMatch(/no quota to watch|nothing personal about you is transmitted/);
      expect(text).toContain(slug==='ip-lookup'?'ipwho.is':'RDAP');
    }
  });
  it('About avoids an unverifiable test count and exposes a real maintenance feedback link', async () => {
    for(const lang of LOCALES) {
      const html=renderToStaticMarkup(await AboutPage({params:Promise.resolve({lang})}));
      expect(html).not.toMatch(/eight thousand|8,000|八千/);
      expect(html).toContain('https://github.com/fezzajoyc/zoyku/issues');
    }
  });
});
