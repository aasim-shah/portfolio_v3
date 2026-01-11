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
};

export default nextConfig;
