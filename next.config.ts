import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-contained server bundle for the container image (k3s deploy).
  output: "standalone",
  // Let `next dev` serve its scripts through a Cloudflare quick tunnel when sharing a preview.
  allowedDevOrigins: ["*.trycloudflare.com"],
};

export default nextConfig;
