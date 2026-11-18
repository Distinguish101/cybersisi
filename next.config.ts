import type { NextConfig } from "next";

// Stricter browser behaviour on every response. Not here yet: a
// Content-Security-Policy. It needs the inline scripts inventoried first
// (layout.tsx adds `html.js` inline), and a wrong one breaks the site.
const securityHeaders = [
  // HTTPS only for 180 days. No includeSubDomains or preload yet: both are hard to undo.
  { key: "Strict-Transport-Security", value: "max-age=15552000" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  // Self-contained server bundle for the container image (k3s deploy).
  output: "standalone",
  // Don't announce "X-Powered-By: Next.js".
  poweredByHeader: false,
  // Let `next dev` serve its scripts through a Cloudflare quick tunnel when sharing a preview.
  allowedDevOrigins: ["*.trycloudflare.com"],
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
