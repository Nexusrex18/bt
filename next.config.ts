import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // We keep this false to prevent Next.js from adding slashes to .css files
  trailingSlash: false,

  async rewrites() {
    return [
      {
        // 1. Match the blog index (manually handle slash)
        source: '/blog',
        destination: 'https://content.pointblank.club/blog/',
      },
      {
        source: '/blog/',
        destination: 'https://content.pointblank.club/blog/',
      },
      {
        // 2. IMPORTANT: Match assets specifically WITHOUT trailing slashes
        source: '/blog/assets/:path*',
        destination: 'https://content.pointblank.club/blog/assets/:path*',
      },
      {
        // 3. Match posts/pages (Ghost might redirect these to have slashes)
        source: '/blog/:path*',
        destination: 'https://content.pointblank.club/blog/:path*',
      },
      {
        source: '/content/:path*',
        destination: 'https://content.pointblank.club/content/:path*',
      }
    ];
  },
};

export default nextConfig;
