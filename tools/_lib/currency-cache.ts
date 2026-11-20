export type RateCache = { t: number; fetchedAt: number; r: Record<string, number> };
const HOUR = 60 * 60 * 1000;
function validTimestamp(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value > 0
    && Number.isFinite(new Date(value).getTime());
}
function rates(value: unknown): value is Record<string, number> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
    && (value as Record<string, unknown>).USD === 1
    && Object.values(value).every(rate => typeof rate === 'number' && Number.isFinite(rate) && rate > 0);
}
export function parseRateCache(value: unknown): RateCache | null {
  if (typeof value !== 'object' || value === null) return null;
  const v = value as Record<string, unknown>;
  if (!validTimestamp(v.t) || !rates(v.r)) return null;
  const fetchedAt = validTimestamp(v.fetchedAt) ? v.fetchedAt : 0;
  return { t: v.t, fetchedAt, r: v.r };
}
export function makeRateCache(value: unknown, now = Date.now()): RateCache {
  if (typeof value !== 'object' || value === null) throw new Error('Invalid rates response');
  const v = value as Record<string, unknown>;
  if (v.result !== 'success' || !rates(v.rates) || !validTimestamp(now)) throw new Error('Invalid rates response');
  const published = v.time_last_update_unix;
  const publishedMs = typeof published === 'number' ? published * 1000 : NaN;
  const updatedAt = validTimestamp(publishedMs) ? publishedMs : now;
  return { t: updatedAt, fetchedAt: now, r: v.rates };
}
export function rateCacheFresh(cache: RateCache, now = Date.now()): boolean {
  const elapsed = now - cache.fetchedAt;
  return validTimestamp(cache.fetchedAt) && validTimestamp(now) && elapsed >= 0 && elapsed < HOUR;
}
