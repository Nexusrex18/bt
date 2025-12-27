import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/blog/:path*",
        destination: "https://blog.pointblank.club/:path*",
      },
    ];
  },
};

export default nextConfig;
