import { useMemo } from 'react';
import type { Product, CategoryFilter, ColorFilter, SizeFilter, ClothingTypeFilter, CollectionFilter } from '../types';

interface FilterCountsOptions {
  products: Product[];
  categoryFilter: CategoryFilter;
  colorFilter: ColorFilter;
  sizeFilter: SizeFilter;
  clothingTypeFilter: ClothingTypeFilter;
  collectionFilter: CollectionFilter;
  priceRange: [number, number];
  minRating: number;
}

/**
 * Hook for calculating filter counts
 * Extracts complex counting logic from CatalogPage
 */
export const useFilterCounts = ({
  products,
  categoryFilter,
  colorFilter,
  sizeFilter,
  clothingTypeFilter,
  collectionFilter,
  priceRange,
  minRating
}: FilterCountsOptions) => {
  const getCountForFilter = useMemo(() => {
    // Filter products based on category first
    let baseProducts = products.filter(p => {
      if (categoryFilter === 'all') return true;
      if (categoryFilter === 'mousepads') return p.category === 'mousepads';
      if (categoryFilter === 'tshirt') return p.category === 'clothing' && p.clothingType === 'tshirt';
      if (categoryFilter === 'hoodie') return p.category === 'clothing' && p.clothingType === 'hoodie';
      if (categoryFilter === 'sleeve') return p.category === 'clothing' && p.clothingType === 'sleeve';
      return false;
    });

    // Apply active filters except the one we're counting
    const getCountForFilter = (filterType: 'color' | 'size' | 'clothingType' | 'collection', value: string) => {
      let filtered = [...baseProducts];

      // Apply price range
      filtered = filtered.filter(p =>
        p.priceNumeric >= priceRange[0] && p.priceNumeric <= priceRange[1]
      );

      // Apply rating
      filtered = filtered.filter(p => p.rating >= minRating);

      // Apply other active filters
      if (filterType !== 'color' && colorFilter.length > 0) {
        filtered = filtered.filter(p => colorFilter.includes(p.color as any));
      }

      if (filterType !== 'size' && sizeFilter.length > 0) {
        filtered = filtered.filter(p => {
          if (!p.productSize) return false;
          return sizeFilter.some(selectedSize => {
            const [size, category] = selectedSize.includes('-')
              ? selectedSize.split('-')
              : [selectedSize, null];
            if (category === 'pad' && p.category !== 'mousepads') return false;
            if (category === 'cloth' && p.category !== 'clothing') return false;
            const sizes = p.productSize!.split(',').map(s => s.trim());
            return sizes.includes(size);
          });
        });
      }

      if (filterType !== 'clothingType' && clothingTypeFilter.length > 0) {
        filtered = filtered.filter(p =>
          p.clothingType && clothingTypeFilter.includes(p.clothingType as any)
        );
      }

      if (filterType !== 'collection' && collectionFilter.length > 0) {
        filtered = filtered.filter(p =>
          p.collection && collectionFilter.includes(p.collection as any)
        );
      }

      // Now count for the specific filter value
      if (filterType === 'color') {
        return filtered.filter(p => p.color === value).length;
      } else if (filterType === 'size') {
        return filtered.filter(p => {
          if (!p.productSize) return false;
          const [size, category] = value.includes('-')
            ? value.split('-')
            : [value, null];
          if (category === 'pad' && p.category !== 'mousepads') return false;
          if (category === 'cloth' && p.category !== 'clothing') return false;
          const sizes = p.productSize.split(',').map(s => s.trim());
          return sizes.includes(size);
        }).length;
      } else if (filterType === 'clothingType') {
        return filtered.filter(p => p.clothingType === value).length;
      } else if (filterType === 'collection') {
        return filtered.filter(p => p.collection === value).length;
      }
      return 0;
    };

    return getCountForFilter;
  }, [products, categoryFilter, colorFilter, sizeFilter, clothingTypeFilter, collectionFilter, priceRange, minRating]);

  return { getCountForFilter };
};