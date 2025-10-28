import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import type { Product } from '../types/product';

/**
 * Hook for navigating to product page
 * Centralizes navigation logic with product data
 */
export const useProductNavigation = () => {
  const navigate = useNavigate();

  const navigateToProduct = useCallback((productData: Product) => {
    navigate('/product', { state: { productData } });
  }, [navigate]);

  return { navigateToProduct };
};
