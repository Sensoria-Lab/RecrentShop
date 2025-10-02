import { useMemo } from 'react';
import type { Product } from '../types/product';

/**
 * Hook for managing product images based on selected options
 */
export const useProductImages = (
  productData: Product | undefined,
  selectedSize: string,
  selectedColor: string
) => {
  return useMemo(() => {
    if (!productData) return [];

    const mainImage = productData.image;

    // Dynamic images for mousepads based on size and color
    if (productData.category === 'mousepads') {
      // Pro Speed poron mousepad
      if (productData.subtitle?.toLowerCase().includes('pro speed') && productData.subtitle.toLowerCase().includes('poron')) {
        return [
          '/images/products/mousepads/pro/control.webp',
          '/images/products/mousepads/pro/control_2.webp',
          '/images/products/mousepads/pro/control_3.webp'
        ];
      }

      // Logo-blue mousepad
      if (productData.subtitle?.toLowerCase().includes('logo-blue')) {
        if (selectedSize === 'xl') {
          return [
            '/images/products/mousepads/xl/xl_blue/lxl_01_1.webp',
            '/images/products/mousepads/xl/xl_blue/lxl_02_1.webp',
            '/images/products/mousepads/xl/xl_blue/xl_01_2.webp',
            '/images/products/mousepads/xl/xl_blue/xl_02_2.webp'
          ];
        } else {
          return [
            '/images/products/mousepads/l/l_blue/107_l_logo-blue_01.webp',
            '/images/products/mousepads/l/l_blue/107_l_logo-blue_02.webp',
            '/images/products/mousepads/l/l_blue/107_l_logo-blue_03.webp',
            '/images/products/mousepads/l/l_blue/107_l_logo-blue_04.webp'
          ];
        }
      }

      // Geoid mousepads - size and color based
      if (selectedSize === 'xl') {
        if (selectedColor === 'red') {
          return [
            '/images/products/mousepads/xl/xl_red/010_xl_logo-red_01.webp',
            '/images/products/mousepads/xl/xl_red/010_xl_logo-red_02.webp',
            '/images/products/mousepads/xl/xl_red/010_xl_logo-red_03.webp',
            '/images/products/mousepads/xl/xl_red/010_xl_logo-red_04.webp'
          ];
        } else if (selectedColor === 'blue') {
          return [
            '/images/products/mousepads/xl/xl_blue/lxl_01_1.webp',
            '/images/products/mousepads/xl/xl_blue/lxl_02_1.webp',
            '/images/products/mousepads/xl/xl_blue/xl_01_2.webp',
            '/images/products/mousepads/xl/xl_blue/xl_02_2.webp'
          ];
        } else if (selectedColor === 'white') {
          return [
            '/images/products/mousepads/xl/xl_white_geoid/11.webp',
            '/images/products/mousepads/xl/xl_white_geoid/4_4.webp',
            '/images/products/mousepads/xl/xl_white_geoid/5_4.webp'
          ];
        } else {
          // black by default
          return [
            '/images/products/mousepads/xl/xl_black_geoid/114_001.webp',
            '/images/products/mousepads/xl/xl_black_geoid/114_002.webp',
            '/images/products/mousepads/xl/xl_black_geoid/114_003.webp'
          ];
        }
      } else {
        // Size L
        if (selectedColor === 'red') {
          return [
            '/images/products/mousepads/l/l_red/109_l_logo-red_01.webp',
            '/images/products/mousepads/l/l_red/109_l_logo-red_02.webp',
            '/images/products/mousepads/l/l_red/109_l_logo-red_03.webp',
            '/images/products/mousepads/l/l_red/109_l_logo-red_04.webp'
          ];
        } else if (selectedColor === 'blue') {
          return [
            '/images/products/mousepads/l/l_blue/107_l_logo-blue_01.webp',
            '/images/products/mousepads/l/l_blue/107_l_logo-blue_02.webp',
            '/images/products/mousepads/l/l_blue/107_l_logo-blue_03.webp',
            '/images/products/mousepads/l/l_blue/107_l_logo-blue_04.webp'
          ];
        } else if (selectedColor === 'white') {
          return [
            '/images/products/mousepads/l/l_white_geoid/011_l_white_01.webp',
            '/images/products/mousepads/l/l_white_geoid/011_l_white_02.webp',
            '/images/products/mousepads/l/l_white_geoid/011_l_white_04.webp',
            '/images/products/mousepads/l/l_white_geoid/011_l_white_05.webp'
          ];
        } else {
          // black by default
          return [
            '/images/products/mousepads/l/l_black_geoid/013_l_black_01.webp',
            '/images/products/mousepads/l/l_black_geoid/013_l_black_02.webp',
            '/images/products/mousepads/l/l_black_geoid/013_l_black_04.webp',
            '/images/products/mousepads/l/l_black_geoid/013_l_black_05.webp'
          ];
        }
      }
    }
    
    // For clothing - dynamic images based on selected color
    if (productData.category === 'clothing' && productData.images && productData.images.length > 0) {
      const originalColor = productData.color;
      
      // If selected color is the same as original, return original images
      if (!originalColor || selectedColor === originalColor) {
        return productData.images;
      }
      
      // Try to find a product with the same subtitle and clothingType but different color
      // This is needed because black and white versions are separate products with different image filenames
      const { ALL_PRODUCTS } = require('../data/products');
      const alternateColorProduct = ALL_PRODUCTS.find((p: any) => 
        p.category === 'clothing' &&
        p.subtitle === productData.subtitle &&
        p.clothingType === productData.clothingType &&
        p.color === selectedColor
      );
      
      // If we found a product with the selected color, use its images
      if (alternateColorProduct && alternateColorProduct.images) {
        return alternateColorProduct.images;
      }
      
      // Fallback: try to replace color in paths (might not work if filenames are different)
      return productData.images.map(imagePath => 
        imagePath.replace(`_${originalColor}/`, `_${selectedColor}/`)
      );
    }
    
    // For other products with images array (sleeves, etc)
    if (productData.images && productData.images.length > 0) {
      return productData.images;
    }
    
    // Otherwise use main image
    return [mainImage, mainImage, mainImage];
  }, [productData, selectedSize, selectedColor]);
};
