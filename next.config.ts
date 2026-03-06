import type { NextConfig } from 'next';

// Detect if we're building for GitHub Pages (production) or running locally
const isGithubPages = process.env.NODE_ENV === 'production';
const basePath = isGithubPages ? '/RecrentShop' : '';

const nextConfig: NextConfig = {
    // Static export for GitHub Pages
    output: 'export',

    // Sub-path on GitHub Pages: sensoria-lab.github.io/RecrentShop
    // Empty for local development
    basePath,
    assetPrefix: basePath,

    env: {
        NEXT_PUBLIC_BASE_PATH: basePath,
    },

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
