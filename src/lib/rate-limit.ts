import "server-only";

// Small in-memory limiter for form posts. Per process, so it resets on restart
// and isn't shared between replicas — fine for one pod; swap for Redis/Postgres
// if we scale out. Keys are client IPs held only in memory, never stored.
const hits = new Map<string, number[]>();

// The visitor's IP as our proxy saw it. In production exactly one proxy
// (Traefik) sits in front of the app and appends the address it received to
// X-Forwarded-For, so the RIGHTMOST entry is trustworthy. Anything to its left
// came from the client and can be forged to dodge the limit.
// If a second proxy is ever added in front (e.g. Cloudflare's orange cloud),
// this must change: see docs/DEPLOY.md, "Client IP check".
export function clientIp(h: Headers): string {
  const forwarded = h.get("x-forwarded-for");
  const last = forwarded?.split(",").at(-1)?.trim();
  return last || h.get("x-real-ip") || "unknown";
}

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
