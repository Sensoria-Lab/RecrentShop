import { useMemo } from 'react';
import type { Product, SortOption, CategoryFilter, ColorFilter, SizeFilter, ClothingTypeFilter, CollectionFilter } from '../types/product';

interface FilterOptions {
  sortBy: SortOption;
  categoryFilter: CategoryFilter;
  colorFilter: ColorFilter;
  sizeFilter: SizeFilter;
  clothingTypeFilter: ClothingTypeFilter;
  collectionFilter: CollectionFilter;
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

    // Apply color filter - now supports multiple colors
    if (filters.colorFilter.length > 0) {
      filtered = filtered.filter(p => filters.colorFilter.includes(p.color as any));
    }

    // Apply size filter - now supports multiple sizes
    if (filters.sizeFilter.length > 0) {
      filtered = filtered.filter(p => {
        if (!p.productSize) return false;
        
        // Check if any selected size matches the product
        return filters.sizeFilter.some(selectedSize => {
          // Extract the size and category from filter value (e.g., "L-pad" -> ["L", "pad"])
          const [size, category] = selectedSize.includes('-') 
            ? selectedSize.split('-') 
            : [selectedSize, null];
          
          // If category is specified in filter, check product category matches
          if (category === 'pad' && p.category !== 'mousepads') return false;
          if (category === 'cloth' && p.category !== 'clothing') return false;
          
          // Check if productSize contains the selected size (for comma-separated or exact match)
          const sizes = p.productSize!.split(',').map(s => s.trim());
          return sizes.includes(size);
        });
      });
    }

    // Apply clothing type filter - now supports multiple types
    if (filters.clothingTypeFilter.length > 0) {
      filtered = filtered.filter(p => 
        p.clothingType && filters.clothingTypeFilter.includes(p.clothingType as any)
      );
    }

    // Apply collection filter - supports multiple collections
    if (filters.collectionFilter.length > 0) {
      filtered = filtered.filter(p => 
        p.collection && filters.collectionFilter.includes(p.collection as any)
      );
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
    filters.collectionFilter,
    filters.priceRange,
    filters.minRating
  ]);

  return filteredProducts;
};
