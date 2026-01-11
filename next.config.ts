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
  webpack: (config, { isServer }) => {
    // Ignore node-specific modules when bundling for the browser
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
      };
    }

    // Exclude native binaries from webpack processing
    config.module.rules.push({
      test: /\.node$/,
      use: 'node-loader',
    });

    // Externalize sharp to avoid bundling issues
    config.externals = config.externals || [];
    config.externals.push('sharp');

    return config;
  },
  // Externalize packages that should run on the server
  serverExternalPackages: ['@xenova/transformers', 'sharp', 'onnxruntime-node'],
};

export default nextConfig;
