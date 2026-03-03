import type { Metadata } from 'next';
import { Inter, Manrope, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { BottomNavigation, OnceBackground } from '@/src/components/layout';

const inter = Inter({
    subsets: ['latin', 'cyrillic'],
    variable: '--font-inter',
    display: 'swap',
});

const manrope = Manrope({
    subsets: ['latin', 'cyrillic'],
    variable: '--font-manrope',
    display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ['latin', 'cyrillic'],
    variable: '--font-jetbrains',
    display: 'swap',
});

export const metadata: Metadata = {
    title: {
        default: 'RecrentShop — Mousepads & Clothing',
        template: '%s | RecrentShop',
    },
    description: 'E-commerce platform for mousepads and clothing with advanced filtering. Find the perfect gaming gear and apparel.',
    keywords: ['mousepad', 'gaming', 'clothing', 'e-commerce', 'recrent'],
    authors: [{ name: 'Sensoria Lab' }],
    openGraph: {
        title: 'RecrentShop',
        description: 'E-commerce platform for mousepads and clothing',
        type: 'website',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ru" suppressHydrationWarning className={`${inter.variable} ${manrope.variable} ${jetbrainsMono.variable}`}>
            <body className="min-h-screen">
                <Providers>
                    <OnceBackground />

                    <div className="min-h-screen relative z-10">
                        {children}
                    </div>

                    <BottomNavigation />
                </Providers>
            </body>
        </html>
    );
}

