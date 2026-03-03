'use client';
import { useState, useMemo, useCallback } from 'react';
import { ALL_PRODUCTS } from '@/src/lib/products';
import type { Product } from '@/src/types';

const getInitialSize = (productData?: Product): string => {
  if (!productData?.productSize) {
    return 'L';
  }

  const sizeMap: Record<string, string> = {
    XL: 'XL',
    L: 'L',
    M: 'L',
    S: 'L',
  };

  return sizeMap[productData.productSize] ?? 'L';
};

/**
 * Hook for managing product data and initialization
 */
export const useProduct = (passedProductData?: Product) => {
  const [selectedImage, setSelectedImage] = useState(0);

  // Get full product data from ALL_PRODUCTS by ID
  const productData = useMemo(() => {
    if (passedProductData?.id) {
      const fullProduct = ALL_PRODUCTS.find(p => p.id === passedProductData.id);
      return fullProduct || passedProductData;
    }
    return passedProductData;
  }, [passedProductData]);

  const [selectedColor, setSelectedColorState] = useState(() => productData?.color ?? 'black');
  const [selectedSize, setSelectedSizeState] = useState(() => getInitialSize(productData));
  const [selectedType, setSelectedType] = useState('speed');
  const [selectedClothingSize, setSelectedClothingSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  const setSelectedSize = useCallback((size: string) => {
    setSelectedSizeState(size);
    setSelectedImage(0);
  }, []);

  const setSelectedColor = useCallback((color: string) => {
    setSelectedColorState(color);
    setSelectedImage(0);
  }, []);

  return {
    productData,
    selectedImage,
    setSelectedImage,
    selectedColor,
    setSelectedColor,
    selectedSize,
    setSelectedSize,
    selectedType,
    setSelectedType,
    selectedClothingSize,
    setSelectedClothingSize,
    quantity,
    setQuantity
  };
};

