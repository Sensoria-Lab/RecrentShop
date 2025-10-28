import type { Product } from '../types/product';

/**
 * Utility functions for product type detection
 */

export const isClothing = (product?: Product): boolean => {
  return product?.category === 'clothing';
};

export const isProMousepad = (product?: Product): boolean => {
  return product?.subtitle?.toLowerCase().includes('poron') || false;
};

export const isSleeve = (product?: Product): boolean => {
  return product?.clothingType === 'sleeve';
};

export const isMousepad = (product?: Product): boolean => {
  return product?.category === 'mousepads';
};
