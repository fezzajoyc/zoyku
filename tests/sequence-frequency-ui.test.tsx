import { renderToStaticMarkup } from "react-dom/server";
import { describe,expect,it } from "vitest";
import { I18nProvider } from "@/components/i18n-provider";
import { dict } from "@/lib/i18n";
import { LOCALES } from "@/lib/site";
import { TextSequenceEngine } from "@/tools/_engines/text-engine-sequence";
import { CharacterFrequencyEngine } from "@/tools/_engines/text-engine-character-frequency";
import { SEQUENCE_MESSAGES } from "@/tools/_lib/string-sequence-copy";
import { FREQUENCY_MESSAGES } from "@/tools/_lib/character-frequency-copy";
import sequence from "@/tools/text/text-sequence-generator";
import frequency from "@/tools/text/character-frequency-counter";
const escaped=(value:string)=>renderToStaticMarkup(<span>{value}</span>).replace(/^<span>|<\/span>$/g,"");
describe("sequence and codepoint engines render native controls and honest empty states",()=>{
 it.each(LOCALES)("renders both complete native interfaces in %s",locale=>{
  const s=renderToStaticMarkup(<I18nProvider locale={locale} dict={dict(locale)}><TextSequenceEngine/></I18nProvider>);
  const f=renderToStaticMarkup(<I18nProvider locale={locale} dict={dict(locale)}><CharacterFrequencyEngine/></I18nProvider>);
  const sc=SEQUENCE_MESSAGES[locale],fc=FREQUENCY_MESSAGES[locale];
  for(const value of [sc.start,sc.step,sc.count,sc.width,sc.prefix,sc.suffix,sc.separator,sc.generate,sc.sample,sc.clear,sc.rules,sc.limits])expect(s).toContain(escaped(value));
  for(const value of [fc.input,fc.lower,fc.ignore,fc.sort,fc.limit,fc.raw,fc.total,fc.distinct,fc.rules,fc.limits,fc.empty])expect(f).toContain(escaped(value));
  expect(s).toContain('dir="ltr"');expect(f).toContain('dir="ltr"');expect(s).not.toContain('role="alert"');expect(f).not.toContain('role="alert"');
  expect(f).not.toContain('data-frequency-download');expect(f).not.toContain('data-frequency-table');
  expect(sequence.copy[locale]?.name).toBe(sc.name);expect(frequency.copy[locale]?.name).toBe(fc.name);
 });
});
