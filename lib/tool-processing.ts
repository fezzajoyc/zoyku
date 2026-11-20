import type { Locale } from './site';
import { trustCopy } from './trust-copy';

export type ProcessingKind = 'local' | 'network' | 'downloads';
type Profile = { kind: ProcessingKind; provider?: string; field?: 0 | 1 | 2 | 3 };
const PROFILES: Record<string, Profile> = {
  'dns-lookup': { kind: 'network', provider: 'Google Public DNS (dns.google)', field: 0 },
  'email-validator': { kind: 'network', provider: 'Google Public DNS (dns.google)', field: 1 },
  'ip-lookup': { kind: 'network', provider: 'ipwho.is', field: 2 },
  'whois-lookup': { kind: 'network', provider: 'RDAP (rdap.org / registry)', field: 0 },
  'currency-converter': { kind: 'network', provider: 'ExchangeRate-API (open.er-api.com)', field: 3 },
  'ocr-image': { kind: 'downloads', provider: 'jsDelivr / Tesseract language CDN' },
  'ocr-pdf': { kind: 'downloads', provider: 'jsDelivr / Tesseract language CDN' },
  'extract-audio': { kind: 'downloads', provider: 'jsDelivr / FFmpeg' },
};
export function processingInfo(slug: string, locale: Locale) {
  const profile = PROFILES[slug] ?? { kind: 'local' as const };
  const t = trustCopy(locale);
  return {
    ...profile,
    label: t.labels[profile.kind === 'local' ? 0 : profile.kind === 'network' ? 1 : 2],
    note: profile.kind === 'network'
      ? t.network.replace('{query}', t.fields[profile.field ?? 0]).replace('{provider}', profile.provider ?? '')
      : profile.kind === 'downloads' ? t.downloads : t.local,
  };
}

type Source = { label: string; url: string };
const SOURCES: Record<string, Source[]> = {
  'dns-lookup': [{ label: 'Google Public DNS · JSON API', url: 'https://developers.google.com/speed/public-dns/docs/doh/json' }],
  'email-validator': [{ label: 'RFC 7505 · Null MX', url: 'https://www.rfc-editor.org/rfc/rfc7505' }, { label: 'Google Public DNS', url: 'https://developers.google.com/speed/public-dns/docs/doh/json' }],
  'ip-lookup': [{ label: 'ipwho.is · API / limits', url: 'https://ipwhois.io/documentation' }],
  'whois-lookup': [{ label: 'ICANN · RDAP', url: 'https://www.icann.org/rdap' }],
  'currency-converter': [{ label: 'ExchangeRate-API · open data', url: 'https://www.exchangerate-api.com/docs/free' }],
  'bmr-calculator': [{ label: 'Mifflin–St Jeor (1990)', url: 'https://pubmed.ncbi.nlm.nih.gov/2305711/' }],
  'tdee-calculator': [{ label: 'Mifflin–St Jeor (1990)', url: 'https://pubmed.ncbi.nlm.nih.gov/2305711/' }, { label: 'NIH / NIDDK · Body Weight Planner', url: 'https://www.niddk.nih.gov/bwp' }],
  'calorie-calculator': [{ label: 'NIH / NIDDK · Body Weight Planner', url: 'https://www.niddk.nih.gov/bwp' }, { label: 'Mifflin–St Jeor (1990)', url: 'https://pubmed.ncbi.nlm.nih.gov/2305711/' }],
  'compound-interest-calculator': [{ label: 'Investor.gov · compound interest', url: 'https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator' }],
  'totp-generator': [{ label: 'RFC 6238 · TOTP', url: 'https://www.rfc-editor.org/rfc/rfc6238' }],
};
export function toolSources(slug: string): Source[] { return SOURCES[slug] ?? []; }
