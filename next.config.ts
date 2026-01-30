import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.0.117", "localhost", "*.local-origin.dev"],
  images: {
    remotePatterns: [
      new URL("https://tailwindcss.com/**"),
      new URL("https://images.unsplash.com/**"),
    ],
  },
  typescript: {
    // !! WARN !! Dangerously allow production builds to finish even if there are type errors.
    ignoreBuildErrors: true,
  },
  eslint: {
    // !! WARN !! This allows production builds to finish even if there are ESLint errors.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
