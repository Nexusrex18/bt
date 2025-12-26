import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. Force Next.js to always use trailing slashes to match Ghost
  trailingSlash: true,

  async rewrites() {
    return [
      {
        // 2. Main blog index
        source: '/blog/',
        destination: 'https://content.pointblank.club/blog/',
      },
      {
        // 3. All posts and sub-pages
        source: '/blog/:path*/',
        destination: 'https://content.pointblank.club/blog/:path*/',
      },
      {
        // 4. ASSETS - These should NOT have trailing slashes
        // We use basePath: false to prevent Next.js from forcing a / on these files
        source: '/blog/assets/:path*',
        destination: 'https://content.pointblank.club/blog/assets/:path*',
      },
      {
        source: '/content/:path*',
        destination: 'https://content.pointblank.club/content/:path*',
      },
      {
        source: '/public/:path*',
        destination: 'https://content.pointblank.club/public/:path*',
      },
      {
        source: '/ghost/:path*',
        destination: 'https://content.pointblank.club/ghost/:path*',
      }
    ];
  },
};

export default nextConfig;
