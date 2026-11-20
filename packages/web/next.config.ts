import type { NextConfig } from "next";

const apiUrl = process.env.API_URL;
if (!apiUrl) {
  throw new Error("API_URL is not set. Copy .env.example to .env.local.");
}

const nextConfig: NextConfig = {
  async rewrites() {
    return [{ source: "/api/:path*", destination: `${apiUrl}/:path*` }];
  },
  // Workspace packages ship TypeScript source; Next compiles them.
  transpilePackages: ["@fanout/shared"],
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
