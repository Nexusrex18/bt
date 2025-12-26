import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable trailing slash - Ghost doesn't use them
  trailingSlash: false,

  async rewrites() {
    return [
      {
        // Rewrite /blog (bare) to Ghost root
        source: '/blog',
        destination: 'https://content.pointblank.club/',
      },
      {
        // Rewrite /blog/* to Ghost root (strip /blog prefix)
        // /blog/my-post → content.pointblank.club/my-post
        // /blog/ghost → content.pointblank.club/ghost
        // /blog/assets/... → content.pointblank.club/assets/...
        source: '/blog/:path*',
        destination: 'https://content.pointblank.club/:path*',
      },
    ];
  },
};

export default nextConfig;
