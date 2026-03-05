'use client';

import React from 'react';
import { CartProvider } from '@/src/context/CartContext';
import { ToastProvider } from '@/src/context/ToastContext';
import { ThemeProvider } from '@/src/context/ThemeContext';
import ErrorBoundary from '@/src/components/layout/ErrorBoundary';
import { LenisProvider } from '@/src/lib/lenis';
import { IconProvider } from '@once-ui-system/core';
import { iconLibrary } from '@/src/lib/icons';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ErrorBoundary>
            <LenisProvider>
                <ToastProvider>
                    <CartProvider>
                        <ThemeProvider defaultTheme="dark">
                            <IconProvider icons={iconLibrary}>
                                {children}
                            </IconProvider>
                        </ThemeProvider>
                    </CartProvider>
                </ToastProvider>
            </LenisProvider>
        </ErrorBoundary>
    );
}

