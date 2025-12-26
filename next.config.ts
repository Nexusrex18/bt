import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/blog',
        destination: 'https://content.pointblank.club',
      },
      {
        source: '/blog/:path*',
        destination: 'https://content.pointblank.club/:path*',
      },
      // --- CRITICAL ASSET PATHS ---
      {
        // Fixes missing CSS/JS
        source: '/assets/:path*',
        destination: 'https://content.pointblank.club/assets/:path*',
      },
      {
        // Fixes missing images
        source: '/content/:path*',
        destination: 'https://content.pointblank.club/content/:path*',
      },
      {
        // Fixes Ghost system scripts
        source: '/public/:path*',
        destination: 'https://content.pointblank.club/public/:path*',
      },
      // --- GHOST ADMIN ---
      {
        // Access admin via localhost:3000/ghost
        source: '/ghost/:path*',
        destination: 'https://content.pointblank.club/ghost/:path*',
      }
    ];
  }
};

export default nextConfig;
