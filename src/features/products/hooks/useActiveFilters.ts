import { useMemo } from 'react';
import type { ColorFilter, SizeFilter, ClothingTypeFilter, CollectionFilter } from '../types';

/**
 * Hook for managing active filter badges
 * Extracts active filters logic from CatalogPage
 */
export const useActiveFilters = (
  colorFilter: ColorFilter,
  sizeFilter: SizeFilter,
  clothingTypeFilter: ClothingTypeFilter,
  collectionFilter: CollectionFilter
) => {
  const activeFilters = useMemo(() => {
    const filters: Array<{ type: 'color' | 'size' | 'clothingType' | 'collection', value: string, label: string }> = [];

    const colorLabels: Record<string, string> = {
      'black': 'Черный',
      'white': 'Белый/Серый',
      'red': 'Красный'
    };

    const sizeLabels: Record<string, string> = {
      'L-pad': 'L (коврик)',
      'XL-pad': 'XL (коврик)',
      'XS-cloth': 'XS',
      'S-cloth': 'S',
      'M-cloth': 'M',
      'L-cloth': 'L',
      'XL-cloth': 'XL',
      '2XL-cloth': '2XL'
    };

    const clothingTypeLabels: Record<string, string> = {
      'hoodie': 'Худи',
      'tshirt': 'Футболки',
      'sleeve': 'Рукава'
    };

    const collectionLabels: Record<string, string> = {
      'Geoid': 'Geoid',
      'Pro Speed': 'Pro Speed',
      'Logo Blue': 'Logo Blue',
      'Seprents': 'Seprents'
    };

    colorFilter.forEach(value => {
      filters.push({ type: 'color', value, label: colorLabels[value] || value });
    });

    sizeFilter.forEach(value => {
      filters.push({ type: 'size', value, label: sizeLabels[value] || value });
    });

    clothingTypeFilter.forEach(value => {
      filters.push({ type: 'clothingType', value, label: clothingTypeLabels[value] || value });
    });

    collectionFilter.forEach(value => {
      filters.push({ type: 'collection', value, label: collectionLabels[value] || value });
    });

    return filters;
  }, [colorFilter, sizeFilter, clothingTypeFilter, collectionFilter]);

  return activeFilters;
};