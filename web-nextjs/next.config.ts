import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "placehold.co" },
      { protocol: "https", hostname: "cdn.shopify.com" },
    ],
    domains: ['cdn.sanity.io', 'cdn.shopify.com'],
  },
};

export default nextConfig;