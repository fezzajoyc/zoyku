/**
 * MCP 端点的进程内 IP 限流:滑动窗口,默认 30 次/分钟。
 * 无状态 HTTP MCP 的滥用门槛 —— 单实例部署够用;多实例时换 Upstash/Redis 即可,
 * 接口不变(checkMcpRateLimit(ip) -> {allowed, retryAfterSec})。
 */

const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 30;

type Bucket = { hits: number[] };
const buckets = new Map<string, Bucket>();

export function checkMcpRateLimit(ip: string, now: number = Date.now()): { allowed: boolean; retryAfterSec: number } {
  const windowStart = now - WINDOW_MS;
  const bucket = buckets.get(ip) ?? { hits: [] };
  bucket.hits = bucket.hits.filter((t) => t > windowStart);

  if (bucket.hits.length >= MAX_PER_WINDOW) {
    const oldest = bucket.hits[0];
    buckets.set(ip, bucket);
    return { allowed: false, retryAfterSec: Math.max(1, Math.ceil((oldest + WINDOW_MS - now) / 1000)) };
  }

  bucket.hits.push(now);
  buckets.set(ip, bucket);

  // 顺带清理别的 IP 留下的死桶,防 Map 无限膨胀
  if (buckets.size > 10_000) {
    for (const [key, b] of buckets) {
      if (b.hits.length === 0 || b.hits[b.hits.length - 1] <= windowStart) buckets.delete(key);
    }
  }
  return { allowed: true, retryAfterSec: 0 };
}

/** 测试辅助:清空所有桶 */
export function resetMcpRateLimit(): void {
  buckets.clear();
}
