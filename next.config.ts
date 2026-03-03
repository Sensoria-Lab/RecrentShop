import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    // Output standalone for optimal deployment
    // output: 'standalone',

    // Allow images from external domains if needed
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },

    // Trailing slash to match previous gh-pages behaviour
    // trailingSlash: true,

    // TypeScript errors handled by type-check script
    typescript: {
        ignoreBuildErrors: false,
    },
};

export default nextConfig;
