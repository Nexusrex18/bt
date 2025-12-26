import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Turn this OFF. We will handle slashes manually to avoid loops.
  trailingSlash: false,

  async rewrites() {
    return [
      {
        // 1. Ghost Admin - Must be at the top
        source: '/blog/ghost/:path*',
        destination: 'https://content.pointblank.club/blog/ghost/:path*',
      },
      {
        // 2. Ghost Assets (CSS/JS)
        source: '/blog/assets/:path*',
        destination: 'https://content.pointblank.club/blog/assets/:path*',
      },
      {
        // 3. Blog Home (with trailing slash support)
        source: '/blog/',
        destination: 'https://content.pointblank.club/blog/',
      },
      {
        // 4. Everything else under /blog (Posts, Tags, Authors)
        // This MUST be below the assets/admin rules
        source: '/blog/:path*',
        destination: 'https://content.pointblank.club/blog/:path*',
      },
      {
        // 5. System folders
        source: '/content/:path*',
        destination: 'https://content.pointblank.club/content/:path*',
      },
      {
        source: '/public/:path*',
        destination: 'https://content.pointblank.club/public/:path*',
      }
    ];
  },
};

export default nextConfig;
