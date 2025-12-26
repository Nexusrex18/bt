import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // We will handle slashes manually in rewrites for better control
  trailingSlash: false,

  async rewrites() {
    return [
      {
        // 1. Handle the main blog index (both /blog and /blog/)
        source: '/blog',
        destination: 'https://content.pointblank.club/blog',
      },
      {
        source: '/blog/',
        destination: 'https://content.pointblank.club/blog/',
      },
      {
        // 2. Handle everything else under /blog (posts, CSS, JS)
        // We DO NOT use a trailing slash here so files like .css work
        source: '/blog/:path*',
        destination: 'https://content.pointblank.club/blog/:path*',
      },
      {
        // 3. Ghost Images and system files
        source: '/content/:path*',
        destination: 'https://content.pointblank.club/content/:path*',
      },
      {
        source: '/public/:path*',
        destination: 'https://content.pointblank.club/public/:path*',
      },
      {
        // 4. Ghost Admin
        source: '/ghost/:path*',
        destination: 'https://content.pointblank.club/ghost/:path*',
      }
    ];
  },
};

export default nextConfig;
