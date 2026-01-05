import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Blog content pages - ADD /blog to destination
      {
        source: '/blog',
        destination: 'https://content.pointblank.club/blog/'
      },
      {
        source: '/blog/:path*',
        destination: 'https://content.pointblank.club/blog/:path*'
      },
      // Ghost assets - ADD /blog prefix
      {
        source: '/assets/:path*',
        destination: 'https://content.pointblank.club/blog/assets/:path*'
      },
      {
        source: '/public/:path*',
        destination: 'https://content.pointblank.club/blog/public/:path*'
      },
      {
        source: '/content/:path*',
        destination: 'https://content.pointblank.club/blog/content/:path*'
      },
      // Ghost API endpoints - ADD /blog prefix
      {
        source: '/ghost/:path*',
        destination: 'https://content.pointblank.club/blog/ghost/:path*'
      },
      {
        source: '/members/:path*',
        destination: 'https://content.pointblank.club/blog/members/:path*'
      }
    ]
  }
};

export default nextConfig;
