import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // We disable this to stop Next.js from messing with Ghost's slashes
  trailingSlash: false,

  async rewrites() {
    return [
      {
        // This rule handles the main assets/images that are NOT in the /blog folder
        source: '/content/:path*',
        destination: 'https://content.pointblank.club/content/:path*',
      },
      {
        // This rule handles system scripts
        source: '/public/:path*',
        destination: 'https://content.pointblank.club/public/:path*',
      },
      {
        // THE MASTER RULE
        // This catches /blog, /blog/, /blog/post, /blog/ghost
        // and sends it exactly as-is to your Ghost server.
        source: '/blog/:path*',
        destination: 'https://content.pointblank.club/blog/:path*',
      },
      {
        // Fallback for the bare /blog home page
        source: '/blog',
        destination: 'https://content.pointblank.club/blog/',
      }
    ];
  },
};

export default nextConfig;
