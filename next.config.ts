import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allows images from any domain
      },
    ],
    formats: ['image/avif', 'image/webp'], // Modern image formats for better SEO
  },
  // Turbopack configuration (replaces webpack config in Next.js 16)
  turbopack: {
    resolveAlias: {
      // Turbopack handles these automatically, no need for fallbacks
    },
  },
  // Externalize packages that should run on the server
  serverExternalPackages: ['@xenova/transformers', 'sharp', 'onnxruntime-node'],
  
  // Add headers for CORS and SEO optimization
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
      {
        // Apply security and SEO headers to all routes
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
  
  // Enable compression for better performance (helps SEO)
  compress: true,
  
  // Generate ETags for better caching
  generateEtags: true,
  
  // Power by header (security)
  poweredByHeader: false,
};

export default nextConfig;
