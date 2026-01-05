import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/blog',
        destination: 'https://content.pointblank.club'
      },
      {
        source: '/blog/:path*',
        destination: 'https://content.pointblank.club/:path*'
      }
    ]
  }
};

export default nextConfig;
