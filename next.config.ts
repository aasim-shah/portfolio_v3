import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allows images from any domain
      },
    ],
  },
  // Turbopack configuration (replaces webpack config in Next.js 16)
  turbopack: {
    resolveAlias: {
      // Turbopack handles these automatically, no need for fallbacks
    },
  },
  // Externalize packages that should run on the server
  serverExternalPackages: ['@xenova/transformers', 'sharp', 'onnxruntime-node'],
  
  // Add headers for CORS
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,POST,OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization" },
        ],
      },
    ];
  },
};

export default nextConfig;
