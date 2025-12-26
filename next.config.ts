import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. Force Next.js to match Ghost's trailing slash preference
  trailingSlash: true,

  async rewrites() {
    return [
      {
        // 2. Handle the root blog path with a trailing slash
        source: '/blog/',
        destination: 'https://content.pointblank.club/blog/',
      },
      {
        // 3. Handle all sub-paths (posts, assets, etc.)
        source: '/blog/:path*/',
        destination: 'https://content.pointblank.club/blog/:path*/',
      },
      {
        // 4. Ghost Assets (Images) often stay at /content even with /blog prefix
        source: '/content/:path*',
        destination: 'https://content.pointblank.club/content/:path*',
      },
      {
        source: '/assets/:path*',
        destination: 'https://content.pointblank.club/assets/:path*',
      }
    ];
  },
};

export default nextConfig;
