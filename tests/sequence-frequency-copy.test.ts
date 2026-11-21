import { describe,expect,it } from "vitest";
import { LOCALES } from "@/lib/site";
import { SEQUENCE_MESSAGES,textSequenceToolCopy,sequenceError } from "@/tools/_lib/string-sequence-copy";
import { FREQUENCY_MESSAGES,characterFrequencyToolCopy,frequencyError } from "@/tools/_lib/character-frequency-copy";
describe("native sequence and frequency scope copy",()=>{
 it("authors page metadata, actual controls and errors in all 15 locales",()=>{
  for(const [copy,messages] of [[textSequenceToolCopy(),SEQUENCE_MESSAGES],[characterFrequencyToolCopy(),FREQUENCY_MESSAGES]] as const){
   expect(Object.keys(copy).sort()).toEqual([...LOCALES].sort());
   expect(new Set(LOCALES.map(locale=>copy[locale].tagline)).size).toBe(15);
   for(const locale of LOCALES){const c=copy[locale];expect(c.steps).toHaveLength(3);expect(c.faqs).toHaveLength(2);expect(c.intro.length).toBeGreaterThanOrEqual(2);expect(c.tagline.length).toBeGreaterThanOrEqual(locale==="zh"||locale==="ja"?32:80);expect(messages[locale].labels.every(x=>typeof x==="string"&&x.length>0)).toBe(true);}
  }
  for(const locale of LOCALES)if(locale!=="en"){expect(sequenceError(locale,"numeric-limit")).not.toBe(sequenceError("en","numeric-limit"));expect(frequencyError(locale,"distinct-limit")).not.toBe(frequencyError("en","distinct-limit"));}
 });
 it("states exact decimal comma ambiguities and codepoint expansion boundaries",()=>{
  expect(SEQUENCE_MESSAGES.en.rules).toContain("0,125 means 125");expect(SEQUENCE_MESSAGES.en.rules).toContain("no expression");
  expect(FREQUENCY_MESSAGES.en.rules).toContain("İ");expect(FREQUENCY_MESSAGES.en.rules).toContain("ZWJ");expect(FREQUENCY_MESSAGES.en.rules).toContain("denominator");expect(FREQUENCY_MESSAGES.en.limits).toContain("4,096");
 });
});
