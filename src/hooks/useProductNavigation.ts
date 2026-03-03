'use client';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import type { Product } from '@/src/types';

/**
 * Hook for navigating to product page
 * Centralizes navigation logic with product data
 *
 * Note: react-router-dom state passing is replaced with sessionStorage
 * for Next.js App Router compatibility.
 */
export const useProductNavigation = () => {
  const router = useRouter();

  const navigateToProduct = useCallback((productData: Product) => {
    // Store product data in sessionStorage before navigating
    // so the product page can retrieve it
    sessionStorage.setItem('productData', JSON.stringify(productData));
    router.push(`/product/${productData.id || 'view'}`);
  }, [router]);

  return { navigateToProduct };
};

