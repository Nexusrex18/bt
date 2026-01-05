import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/hustle',
        destination: 'https://hustle.pointblank.club'
      },
      {
        source: '/hustle/:path*',
        destination: 'https://hustle.pointblank.club/:path*'
      }
    ]
  }
};

export default nextConfig;
