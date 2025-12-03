import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "192.168.0.117",
    "localhost",
    "*.local-origin.dev"
  ],
    images: {
      remotePatterns: [new URL('https://tailwindcss.com/**')],
    },
  
};

export default nextConfig;