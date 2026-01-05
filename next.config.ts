import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/hustle',
        destination: 'https://hustle.pointblank.club'
      },
    ]
  }
};

export default nextConfig;
