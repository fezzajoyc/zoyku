import { dict } from '@/lib/i18n';
import { isLocale, isCategory } from '@/lib/site';
import { trustCopy } from '@/lib/trust-copy';
import { CATEGORY_SCOPE, SECURITY_DESCRIPTION } from '@/lib/category-scope';

/** A localized hub summary; tool-specific limits belong to the individual tool. */
export function categoryIntro(cat: string, locale: string): string[] {
  if (!isLocale(locale) || !isCategory(cat)) return [];
  const copy = trustCopy(locale);
  const description = cat === 'security' ? SECURITY_DESCRIPTION[locale] : dict(locale).categories[cat].desc;
  const scope = cat === 'security' ? CATEGORY_SCOPE[locale][0]
    : cat === 'utility' ? CATEGORY_SCOPE[locale][1] : copy.local;
  return [description, scope, copy.limits];
}
