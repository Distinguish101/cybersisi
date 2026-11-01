import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-contained server bundle for the container image (k3s deploy).
  output: "standalone",
};

export default nextConfig;
