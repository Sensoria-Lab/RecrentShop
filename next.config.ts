import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    // Static export for GitHub Pages
    output: 'export',

    // Sub-path on GitHub Pages: sensoria-lab.github.io/RecrentShop
    basePath: '/RecrentShop',
    assetPrefix: '/RecrentShop',

    // next/image doesn't work with static export — use unoptimized
    images: {
        unoptimized: true,
    },

    // Trailing slash so index.html files resolve correctly on GH Pages
    trailingSlash: true,

    // TypeScript errors handled by type-check script
    typescript: {
        ignoreBuildErrors: false,
    },
};

export default nextConfig;
