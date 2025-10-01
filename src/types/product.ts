/**
 * Product types and interfaces
 */

export interface Product {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  productSize?: string;
  productColor?: string;
  price: string;
  priceNumeric: number;
  rating: number;
  reviewCount: number;
  color: string;
  category: 'mousepads' | 'clothing';
  clothingType?: 'hoodie' | 'tshirt';
}

export type SortOption = 'popularity' | 'price-asc' | 'price-desc' | 'rating';
export type ColorFilter = 'all' | 'black' | 'white' | 'red';
export type SizeFilter = 'all' | 'L' | 'XL' | 'S' | 'M' | 'XS';
export type CategoryFilter = 'all' | 'mousepads' | 'clothing';
export type ClothingTypeFilter = 'all' | 'hoodie' | 'tshirt';
