// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   allowedDevOrigins: ["192.168.0.117", "localhost", "*.local-origin.dev"],
//   images: {
//     remotePatterns: [
//       new URL("https://tailwindcss.com/**"),
//       new URL("https://images.unsplash.com/**"),
//     ],
//   },
//   typescript: {
//     // !! WARN !! Dangerously allow production builds to finish even if there are type errors.
//     ignoreBuildErrors: true,
//   },
//   eslint: {
//     // !! WARN !! This allows production builds to finish even if there are ESLint errors.
//     ignoreDuringBuilds: true,
//   },
// };

// export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. Remove allowedDevOrigins if not strictly needed for build
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tailwindcss.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // ✅ fixes chunk caching problems
  generateBuildId: async () => {
    return Date.now().toString();
  },

  // ✅ correct static cache for Next chunks
  async headers() {
    return [
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  }
};

export default nextConfig;


// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   reactStrictMode: true,

//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "tailwindcss.com",
//         pathname: "/**",
//       },
//       {
//         protocol: "https",
//         hostname: "images.unsplash.com",
//         pathname: "/**",
//       },
//     ],
//   },

  
//   typescript: {
//     ignoreBuildErrors: true,
//   },

//   eslint: {
//     ignoreDuringBuilds: true,
//   },

//   // ✅ fixes chunk caching problems
//   generateBuildId: async () => {
//     return Date.now().toString();
//   },

//   // ✅ correct static cache for Next chunks
//   async headers() {
//     return [
//       {
//         source: "/_next/static/:path*",
//         headers: [
//           {
//             key: "Cache-Control",
//             value: "public, max-age=31536000, immutable",
//           },
//         ],
//       },
//     ];
//   },
// };

// export default nextConfig;
