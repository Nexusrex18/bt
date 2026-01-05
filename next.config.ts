import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Blog content pages
      {
        source: '/blog',
        destination: 'https://content.pointblank.club/'
      },
      {
        source: '/blog/:path*',
        destination: 'https://content.pointblank.club/:path*'
      },
      // Ghost assets (CSS, JS, images, fonts)
      {
        source: '/assets/:path*',
        destination: 'https://content.pointblank.club/assets/:path*'
      },
      {
        source: '/public/:path*',
        destination: 'https://content.pointblank.club/public/:path*'
      },
      {
        source: '/content/:path*',
        destination: 'https://content.pointblank.club/content/:path*'
      },
      // Ghost API endpoints
      {
        source: '/ghost/:path*',
        destination: 'https://content.pointblank.club/ghost/:path*'
      },
      {
        source: '/members/:path*',
        destination: 'https://content.pointblank.club/members/:path*'
      }
    ]
  }
};

export default nextConfig;
