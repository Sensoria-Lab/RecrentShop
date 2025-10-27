/**
 * Product types and interfaces
 */

export interface Product {
  id: number;
  image: string;
  images?: string[]; // Multiple product images for gallery
  title: string;
  subtitle: string;
  productSize?: string;
  productColor?: string;
  price: string;
  priceNumeric: number;
  rating: number;
  reviewCount: number;
  color: string;
  category: 'mousepads' | 'clothing' | 'Коврики для мыши' | 'Одежда' | 'Коврик' | 'Худи' | 'Футболка' | 'Рукав';
  clothingType?: 'худи' | 'футболка' | 'рукав' | 'hoodie' | 'tshirt' | 'sleeve';
  collection?: string; // Коллекция/дизайн товара (geoid, Seprents, Pro Speed и т.д.)
  addedDate?: string; // Дата добавления для бейджа "Новинка"
}

export type SortOption = 'popularity' | 'price-asc' | 'price-desc' | 'rating';
export type ColorFilterValue = 'black' | 'white' | 'red';
export type ColorFilter = ColorFilterValue[];
export type SizeFilterValue = 'L-pad' | 'XL-pad' | 'XS-cloth' | 'S-cloth' | 'M-cloth' | 'L-cloth' | 'XL-cloth' | '2XL-cloth';
export type SizeFilter = SizeFilterValue[];
export type CategoryFilter = 'all' | 'mousepads' | 'clothing';
export type ClothingTypeFilterValue = 'худи' | 'футболка' | 'рукав' | 'hoodie' | 'tshirt' | 'sleeve';
export type ClothingTypeFilter = ClothingTypeFilterValue[];
export type CollectionFilterValue = string; // Динамический список коллекций
export type CollectionFilter = CollectionFilterValue[];
