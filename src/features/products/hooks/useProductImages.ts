import { useMemo } from 'react';
import type { Product } from '../types';
import { ALL_PRODUCTS } from '../../../core/data/products';

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
          mainImage, // Главное фото карточки
          '/images/products/mousepads/pro/pro-speed_black_pro_01.webp',
          '/images/products/mousepads/pro/pro-speed_black_pro_02.webp',
          '/images/products/mousepads/pro/pro-speed_black_pro_03.webp'
        ];
      }

      // Logo-blue mousepad
      if (productData.subtitle?.toLowerCase().includes('logo-blue')) {
        if (selectedSize === 'XL') {
          return [
            mainImage, // Главное фото карточки
            '/images/products/mousepads/xl/xl_blue/logo-blue_blue_xl_01.webp',
            '/images/products/mousepads/xl/xl_blue/logo-blue_blue_xl_02.webp',
            '/images/products/mousepads/xl/xl_blue/logo-blue_blue_xl_03.webp',
            '/images/products/mousepads/xl/xl_blue/logo-blue_blue_xl_04.webp'
          ];
        } else {
          return [
            mainImage, // Главное фото карточки
            '/images/products/mousepads/l/l_blue/logo-blue_blue_l_01.webp',
            '/images/products/mousepads/l/l_blue/logo-blue_blue_l_02.webp',
            '/images/products/mousepads/l/l_blue/logo-blue_blue_l_03.webp',
            '/images/products/mousepads/l/l_blue/logo-blue_blue_l_04.webp'
          ];
        }
      }

      // Geoid mousepads - size and color based
      if (selectedSize === 'XL') {
        if (selectedColor === 'red') {
          return [
            mainImage, // Главное фото карточки
            '/images/products/mousepads/xl/xl_red/logo-red_red_xl_01.webp',
            '/images/products/mousepads/xl/xl_red/logo-red_red_xl_02.webp',
            '/images/products/mousepads/xl/xl_red/logo-red_red_xl_03.webp',
            '/images/products/mousepads/xl/xl_red/logo-red_red_xl_04.webp'
          ];
        } else if (selectedColor === 'blue') {
          return [
            mainImage, // Главное фото карточки
            '/images/products/mousepads/xl/xl_blue/logo-blue_blue_xl_01.webp',
            '/images/products/mousepads/xl/xl_blue/logo-blue_blue_xl_02.webp',
            '/images/products/mousepads/xl/xl_blue/logo-blue_blue_xl_03.webp',
            '/images/products/mousepads/xl/xl_blue/logo-blue_blue_xl_04.webp'
          ];
        } else if (selectedColor === 'white') {
          return [
            mainImage, // Главное фото карточки
            '/images/products/mousepads/xl/xl_white_geoid/geoid_white_xl_01.webp',
            '/images/products/mousepads/xl/xl_white_geoid/geoid_white_xl_02.webp',
            '/images/products/mousepads/xl/xl_white_geoid/geoid_white_xl_03.webp'
          ];
        } else {
          // black by default
          return [
            mainImage, // Главное фото карточки
            '/images/products/mousepads/xl/xl_black_geoid/geoid_black_xl_01.webp',
            '/images/products/mousepads/xl/xl_black_geoid/geoid_black_xl_02.webp',
            '/images/products/mousepads/xl/xl_black_geoid/geoid_black_xl_03.webp'
          ];
        }
      } else {
        // Size L
        if (selectedColor === 'red') {
          return [
            mainImage, // Главное фото карточки
            '/images/products/mousepads/l/l_red/logo-red_red_l_01.webp',
            '/images/products/mousepads/l/l_red/logo-red_red_l_02.webp',
            '/images/products/mousepads/l/l_red/logo-red_red_l_03.webp',
            '/images/products/mousepads/l/l_red/logo-red_red_l_04.webp'
          ];
        } else if (selectedColor === 'blue') {
          return [
            mainImage, // Главное фото карточки
            '/images/products/mousepads/l/l_blue/logo-blue_blue_l_01.webp',
            '/images/products/mousepads/l/l_blue/logo-blue_blue_l_02.webp',
            '/images/products/mousepads/l/l_blue/logo-blue_blue_l_03.webp',
            '/images/products/mousepads/l/l_blue/logo-blue_blue_l_04.webp'
          ];
        } else if (selectedColor === 'white') {
          return [
            mainImage, // Главное фото карточки
            '/images/products/mousepads/l/l_white_geoid/geoid_white_l_01.webp',
            '/images/products/mousepads/l/l_white_geoid/geoid_white_l_02.webp',
            '/images/products/mousepads/l/l_white_geoid/geoid_white_l_03.webp',
            '/images/products/mousepads/l/l_white_geoid/geoid_white_l_04.webp'
          ];
        } else {
          // black by default
          return [
            mainImage, // Главное фото карточки
            '/images/products/mousepads/l/l_black_geoid/geoid_black_l_01.webp',
            '/images/products/mousepads/l/l_black_geoid/geoid_black_l_02.webp',
            '/images/products/mousepads/l/l_black_geoid/geoid_black_l_03.webp',
            '/images/products/mousepads/l/l_black_geoid/geoid_black_l_04.webp'
          ];
        }
      }
    }
    
    // For clothing - dynamic images based on selected color
    if (productData.category === 'clothing' && productData.images && productData.images.length > 0) {
      const originalColor = productData.color;
      
      // If selected color is the same as original, return original images
      if (originalColor && selectedColor === originalColor) {
        return productData.images || [mainImage, mainImage, mainImage];
      }
      
      // Try to find a product with the same subtitle and clothingType but different color
      // This is needed because black and white versions are separate products with different image filenames
      const alternateColorProduct = ALL_PRODUCTS.find((p: any) => 
        p.category === 'clothing' &&
        p.subtitle === productData.subtitle &&
        p.clothingType === productData.clothingType &&
        p.color === selectedColor
      );
      
      // If we found a product with the selected color, use its images
      if (alternateColorProduct && alternateColorProduct.images && alternateColorProduct.images.length > 0) {
        return alternateColorProduct.images;
      }
      
      // Fallback: try to replace color in paths (might not work if filenames are different)
      return productData.images ? productData.images.map(imagePath => 
        imagePath.replace(`_${originalColor}/`, `_${selectedColor}/`)
      ) : [mainImage, mainImage, mainImage];
    }
    
    // For other products with images array (sleeves, etc)
    if (productData.images && productData.images.length > 0) {
      return productData.images;
    }
    
    // Otherwise use main image
    return [mainImage, mainImage, mainImage];
  }, [productData, selectedSize, selectedColor]);
};
