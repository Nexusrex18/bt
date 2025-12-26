import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        // When a user goes to /blog, send them to the Ghost /blog route
        source: '/blog',
        destination: 'https://content.pointblank.club/blog',
      },
      {
        // This covers posts, CSS, and Images because they now start with /blog
        // Example: /blog/assets/css/style.css -> /blog/assets/css/style.css on Ghost
        source: '/blog/:path*',
        destination: 'https://content.pointblank.club/blog/:path*',
      },
      // Safety net: In case Ghost still tries to serve images from the root /content
      {
        source: '/content/:path*',
        destination: 'https://content.pointblank.club/content/:path*',
      },
      {
        source: '/public/:path*',
        destination: 'https://content.pointblank.club/public/:path*',
      }
    ];
  }
};

export default nextConfig;
