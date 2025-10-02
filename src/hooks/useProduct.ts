import { useState, useEffect, useMemo, useRef } from 'react';
import { ALL_PRODUCTS } from '../data/products';
import type { Product } from '../types/product';

/**
 * Hook for managing product data and initialization
 */
export const useProduct = (passedProductData?: Product) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('black');
  const [selectedSize, setSelectedSize] = useState('xl');
  const [selectedType, setSelectedType] = useState('speed');
  const [selectedClothingSize, setSelectedClothingSize] = useState('L');
  const [quantity, setQuantity] = useState(1);
  
  // Track if initial values have been set
  const initializedRef = useRef(false);

  // Get full product data from ALL_PRODUCTS by ID
  const productData = useMemo(() => {
    if (passedProductData?.id) {
      const fullProduct = ALL_PRODUCTS.find(p => p.id === passedProductData.id);
      return fullProduct || passedProductData;
    }
    return passedProductData;
  }, [passedProductData]);

  // Initialize selectors based on product data (only once)
  useEffect(() => {
    if (productData && !initializedRef.current) {
      // Set size from product data
      if (productData.productSize) {
        const sizeMap: { [key: string]: string } = {
          'XL': 'xl',
          'L': 'l',
          'M': 'l',
          'S': 'l'
        };
        setSelectedSize(sizeMap[productData.productSize] || 'xl');
      }
      
      // Set color from product data
      if (productData.color) {
        setSelectedColor(productData.color);
        
        // For clothing also set size
        if (productData.category === 'clothing' && productData.productSize) {
          setSelectedClothingSize(productData.productSize);
        }
      }
      
      // Mark as initialized
      initializedRef.current = true;
    }
  }, [productData]);

  // Reset image index when size or color changes
  useEffect(() => {
    setSelectedImage(0);
  }, [selectedSize, selectedColor]);

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
