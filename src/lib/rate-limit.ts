import "server-only";

// Small in-memory limiter for form posts. Per process, so it resets on restart
// and isn't shared between replicas — fine for one pod; swap for Redis/Postgres
// if we scale out. Keys are client IPs held only in memory, never stored.
const hits = new Map<string, number[]>();

export function rateLimit(key: string, limit = 5, windowMs = 10 * 60 * 1000): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 10_000) hits.clear(); // crude cap on memory
  return true;
}
