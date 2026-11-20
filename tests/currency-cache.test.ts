import { describe, it, expect } from 'vitest';
import { parseRateCache, makeRateCache, rateCacheFresh } from '@/tools/_lib/currency-cache';

describe('exchange-rate cache timestamps', () => {
  const noon = Date.UTC(2026,10,20,12);
  const midnight = Date.UTC(2026,10,20);
  it('reuses a just-fetched table even if the provider published it hours ago', () => {
    const entry=makeRateCache({result:'success',time_last_update_unix:midnight/1000,rates:{USD:1,EUR:.9}},noon);
    expect(entry.t).toBe(midnight);
    expect(rateCacheFresh(entry,noon+1000)).toBe(true);
    expect(rateCacheFresh(entry,noon+3600000)).toBe(false);
  });
  it('preserves old provider timestamps for display without pretending a legacy cache was just fetched', () => {
    const entry=parseRateCache({t:midnight,r:{USD:1,EUR:.9}})!;
    expect(entry.t).toBe(midnight);
    expect(rateCacheFresh(entry,noon)).toBe(false);
  });
  it('rejects corrupt, nonfinite and nonpositive rates', () => {
    for(const rate of [NaN,Infinity,0,-1,'0.9']) expect(parseRateCache({t:midnight,r:{USD:1,EUR:rate}})).toBeNull();
    expect(()=>makeRateCache({result:'error',rates:{USD:1}},noon)).toThrow();
  });
  it('does not treat a cache fetched in the future as fresh', () => {
    expect(rateCacheFresh({t:midnight,fetchedAt:noon+1000,r:{USD:1}},noon)).toBe(false);
  });
  it('rejects cache timestamps outside the JavaScript Date range', () => {
    for (const t of [1e20, Number.MAX_VALUE, Infinity, NaN]) {
      expect(parseRateCache({t,fetchedAt:noon,r:{USD:1}})).toBeNull();
    }
    const entry=parseRateCache({t:midnight,fetchedAt:1e20,r:{USD:1}})!;
    expect(rateCacheFresh(entry,noon)).toBe(false);
  });
  it('falls back to fetch time when publication seconds overflow a valid Date', () => {
    for (const seconds of [1e20,Number.MAX_VALUE,Infinity,NaN]) {
      const entry=makeRateCache({result:'success',time_last_update_unix:seconds,rates:{USD:1}},noon);
      expect(entry.t).toBe(noon);
      expect(()=>new Intl.DateTimeFormat('en').format(entry.t)).not.toThrow();
    }
    expect(()=>makeRateCache({result:'success',rates:{USD:1}},1e20)).toThrow();
  });
});
