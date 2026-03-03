'use client';

import React from 'react';
import { CartProvider } from '@/src/context/CartContext';
import { ToastProvider } from '@/src/context/ToastContext';
import { ErrorBoundary } from '@/src/components/layout';
import { LenisProvider } from '@/src/lib/lenis';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ErrorBoundary>
            <LenisProvider>
                <ToastProvider>
                    <CartProvider>
                        {children}
                    </CartProvider>
                </ToastProvider>
            </LenisProvider>
        </ErrorBoundary>
    );
}

