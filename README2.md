 <!-- next.config.ts add bilow -->
 
  typescript: {
    // !! WARN !! Dangerously allow production builds to finish even if there are type errors.
    ignoreBuildErrors: true,
  },
  eslint: {
    // !! WARN !! This allows production builds to finish even if there are ESLint errors.
    ignoreDuringBuilds: true,
  },