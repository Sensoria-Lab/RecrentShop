/**
 * Hook for managing catalog filters
 * Encapsulates filter state management and related logic
 */

import { useReducer, useCallback } from 'react';
import { filterReducer, initialFilterState, hasPendingFilterChanges, type FilterAction } from '../model/filters';

export const useCatalogFilters = () => {
  const [filterState, dispatch] = useReducer(filterReducer, initialFilterState);

  // Destructure for easier access
  const {
    sortBy,
    categoryFilter,
    colorFilter,
    sizeFilter,
    clothingTypeFilter,
    collectionFilter,
    pendingColorFilter,
    pendingSizeFilter,
    pendingClothingTypeFilter,
    pendingCollectionFilter,
    priceRange,
    minRating,
  } = filterState;

  // Toggle filter value in pending state
  const toggleFilterValue = useCallback(<T extends string>(
    value: T,
    currentValues: T[],
    actionType: string
  ) => {
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    dispatch({ type: actionType as any, payload: newValues });
  }, []);

  // Apply pending filters to active filters
  const applyFilters = useCallback(() => {
    dispatch({ type: 'APPLY_FILTERS' });
  }, []);

  // Reset all filters to initial state
  const resetAllFilters = useCallback(() => {
    dispatch({ type: 'RESET_FILTERS' });
  }, []);

  // Check if there are pending changes
  const hasPendingChanges = useCallback(() => {
    return hasPendingFilterChanges(filterState);
  }, [filterState]);

  // Remove single active filter
  const removeActiveFilter = useCallback((type: 'color' | 'size' | 'clothingType' | 'collection', value: string) => {
    dispatch({ type: 'REMOVE_ACTIVE_FILTER', payload: { type, value } });
  }, []);

  // Clear all active filters
  const clearAllActiveFilters = useCallback(() => {
    dispatch({ type: 'SET_COLOR_FILTER', payload: [] });
    dispatch({ type: 'SET_SIZE_FILTER', payload: [] });
    dispatch({ type: 'SET_CLOTHING_TYPE_FILTER', payload: [] });
    dispatch({ type: 'SET_COLLECTION_FILTER', payload: [] });
    dispatch({ type: 'SET_PENDING_COLOR_FILTER', payload: [] });
    dispatch({ type: 'SET_PENDING_SIZE_FILTER', payload: [] });
    dispatch({ type: 'SET_PENDING_CLOTHING_TYPE_FILTER', payload: [] });
    dispatch({ type: 'SET_PENDING_COLLECTION_FILTER', payload: [] });
  }, []);

  return {
    // State
    sortBy,
    categoryFilter,
    colorFilter,
    sizeFilter,
    clothingTypeFilter,
    collectionFilter,
    pendingColorFilter,
    pendingSizeFilter,
    pendingClothingTypeFilter,
    pendingCollectionFilter,
    priceRange,
    minRating,
    // Actions
    dispatch,
    toggleFilterValue,
    applyFilters,
    resetAllFilters,
    hasPendingChanges,
    removeActiveFilter,
    clearAllActiveFilters,
  };
};
