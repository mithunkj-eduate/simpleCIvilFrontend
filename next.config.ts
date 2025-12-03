import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.0.117", "localhost", "*.local-origin.dev"],
  images: {
    remotePatterns: [
      new URL("https://tailwindcss.com/**"),
      new URL("https://images.unsplash.com/**"),
    ],
  },
};

export default nextConfig;
