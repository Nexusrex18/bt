import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'ALLOW-FROM https://btabc.netlify.app', // or simply remove the DENY header
          },
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' https://btabc.netlify.app",
          },
        ],
      },
    ]
  },
};

export default nextConfig;
