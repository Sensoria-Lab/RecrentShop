import { useMemo } from 'react';
import type { Product, SortOption, CategoryFilter, ColorFilter, SizeFilter, ClothingTypeFilter } from '../types/product';

interface FilterOptions {
  sortBy: SortOption;
  categoryFilter: CategoryFilter;
  colorFilter: ColorFilter;
  sizeFilter: SizeFilter;
  clothingTypeFilter: ClothingTypeFilter;
  priceRange: [number, number];
  minRating: number;
}

/**
 * Hook for filtering and sorting products
 * Extracts complex filtering logic from CatalogPage
 */
export const useProductFilters = (products: Product[], filters: FilterOptions) => {
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Apply category filter
    if (filters.categoryFilter !== 'all') {
      filtered = filtered.filter(p => p.category === filters.categoryFilter);
    }

    // Apply color filter
    if (filters.colorFilter !== 'all') {
      filtered = filtered.filter(p => p.color === filters.colorFilter);
    }

    // Apply size filter
    if (filters.sizeFilter !== 'all') {
      filtered = filtered.filter(p => p.productSize === filters.sizeFilter);
    }

    // Apply clothing type filter
    if (filters.clothingTypeFilter !== 'all') {
      filtered = filtered.filter(p => p.clothingType === filters.clothingTypeFilter);
    }

    // Apply price range filter
    filtered = filtered.filter(p => 
      p.priceNumeric >= filters.priceRange[0] && p.priceNumeric <= filters.priceRange[1]
    );

    // Apply rating filter
    filtered = filtered.filter(p => p.rating >= filters.minRating);

    // Apply sorting
    switch (filters.sortBy) {
      case 'popularity':
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case 'price-asc':
        filtered.sort((a, b) => a.priceNumeric - b.priceNumeric);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.priceNumeric - a.priceNumeric);
        break;
      case 'rating':
        filtered.sort((a, b) => {
          if (b.rating === a.rating) return b.reviewCount - a.reviewCount;
          return b.rating - a.rating;
        });
        break;
    }

    return filtered;
  }, [
    products,
    filters.sortBy,
    filters.categoryFilter,
    filters.colorFilter,
    filters.sizeFilter,
    filters.clothingTypeFilter,
    filters.priceRange,
    filters.minRating
  ]);

  return filteredProducts;
};
