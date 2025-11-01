/**
 * Product Filters State Management
 * Extracted from CatalogPage for better separation of concerns
 */

import type {
  SortOption,
  CategoryFilter,
  ColorFilter,
  SizeFilter,
  ClothingTypeFilter,
  CollectionFilter,
} from '../types';

// ===== FILTER STATE =====
export interface FilterState {
  sortBy: SortOption;
  categoryFilter: CategoryFilter;
  colorFilter: ColorFilter;
  sizeFilter: SizeFilter;
  clothingTypeFilter: ClothingTypeFilter;
  collectionFilter: CollectionFilter;
  pendingColorFilter: ColorFilter;
  pendingSizeFilter: SizeFilter;
  pendingClothingTypeFilter: ClothingTypeFilter;
  pendingCollectionFilter: CollectionFilter;
  priceRange: [number, number];
  minRating: number;
}

// ===== FILTER ACTIONS =====
export type FilterAction =
  | { type: 'SET_SORT_BY'; payload: SortOption }
  | { type: 'SET_CATEGORY_FILTER'; payload: CategoryFilter }
  | { type: 'SET_COLOR_FILTER'; payload: ColorFilter }
  | { type: 'SET_SIZE_FILTER'; payload: SizeFilter }
  | { type: 'SET_CLOTHING_TYPE_FILTER'; payload: ClothingTypeFilter }
  | { type: 'SET_COLLECTION_FILTER'; payload: CollectionFilter }
  | { type: 'SET_PENDING_COLOR_FILTER'; payload: ColorFilter }
  | { type: 'SET_PENDING_SIZE_FILTER'; payload: SizeFilter }
  | { type: 'SET_PENDING_CLOTHING_TYPE_FILTER'; payload: ClothingTypeFilter }
  | { type: 'SET_PENDING_COLLECTION_FILTER'; payload: CollectionFilter }
  | { type: 'SET_PRICE_RANGE'; payload: [number, number] }
  | { type: 'SET_MIN_RATING'; payload: number }
  | { type: 'APPLY_FILTERS' }
  | { type: 'RESET_FILTERS' }
  | { type: 'REMOVE_ACTIVE_FILTER'; payload: { type: 'color' | 'size' | 'clothingType' | 'collection'; value: string } };

// ===== INITIAL STATE =====
export const initialFilterState: FilterState = {
  sortBy: 'popularity',
  categoryFilter: 'all',
  colorFilter: [],
  sizeFilter: [],
  clothingTypeFilter: [],
  collectionFilter: [],
  pendingColorFilter: [],
  pendingSizeFilter: [],
  pendingClothingTypeFilter: [],
  pendingCollectionFilter: [],
  priceRange: [0, 10000],
  minRating: 0,
};

// ===== FILTER REDUCER =====
/**
 * Reducer for managing filter state
 * Handles both active and pending filter states
 */
export const filterReducer = (state: FilterState, action: FilterAction): FilterState => {
  switch (action.type) {
    case 'SET_SORT_BY':
      return { ...state, sortBy: action.payload };
    
    case 'SET_CATEGORY_FILTER':
      return { ...state, categoryFilter: action.payload };
    
    case 'SET_COLOR_FILTER':
      return { ...state, colorFilter: action.payload };
    
    case 'SET_SIZE_FILTER':
      return { ...state, sizeFilter: action.payload };
    
    case 'SET_CLOTHING_TYPE_FILTER':
      return { ...state, clothingTypeFilter: action.payload };
    
    case 'SET_COLLECTION_FILTER':
      return { ...state, collectionFilter: action.payload };
    
    case 'SET_PENDING_COLOR_FILTER':
      return { ...state, pendingColorFilter: action.payload };
    
    case 'SET_PENDING_SIZE_FILTER':
      return { ...state, pendingSizeFilter: action.payload };
    
    case 'SET_PENDING_CLOTHING_TYPE_FILTER':
      return { ...state, pendingClothingTypeFilter: action.payload };
    
    case 'SET_PENDING_COLLECTION_FILTER':
      return { ...state, pendingCollectionFilter: action.payload };
    
    case 'SET_PRICE_RANGE':
      return { ...state, priceRange: action.payload };
    
    case 'SET_MIN_RATING':
      return { ...state, minRating: action.payload };
    
    case 'APPLY_FILTERS':
      return {
        ...state,
        colorFilter: state.pendingColorFilter,
        sizeFilter: state.pendingSizeFilter,
        clothingTypeFilter: state.pendingClothingTypeFilter,
        collectionFilter: state.pendingCollectionFilter,
      };
    
    case 'RESET_FILTERS':
      return initialFilterState;
    
    case 'REMOVE_ACTIVE_FILTER': {
      const { type, value } = action.payload;
      if (type === 'color') {
        const newFilter = state.colorFilter.filter(v => v !== value);
        return { ...state, colorFilter: newFilter, pendingColorFilter: newFilter };
      } else if (type === 'size') {
        const newFilter = state.sizeFilter.filter(v => v !== value);
        return { ...state, sizeFilter: newFilter, pendingSizeFilter: newFilter };
      } else if (type === 'clothingType') {
        const newFilter = state.clothingTypeFilter.filter(v => v !== value);
        return { ...state, clothingTypeFilter: newFilter, pendingClothingTypeFilter: newFilter };
      } else if (type === 'collection') {
        const newFilter = state.collectionFilter.filter(v => v !== value);
        return { ...state, collectionFilter: newFilter, pendingCollectionFilter: newFilter };
      }
      return state;
    }
    
    default:
      return state;
  }
};

// ===== HELPER FUNCTIONS =====

/**
 * Check if there are pending changes in filters
 */
export const hasPendingFilterChanges = (state: FilterState): boolean => {
  return (
    JSON.stringify([...state.pendingColorFilter].sort()) !== JSON.stringify([...state.colorFilter].sort()) ||
    JSON.stringify([...state.pendingSizeFilter].sort()) !== JSON.stringify([...state.sizeFilter].sort()) ||
    JSON.stringify([...state.pendingClothingTypeFilter].sort()) !== JSON.stringify([...state.clothingTypeFilter].sort()) ||
    JSON.stringify([...state.pendingCollectionFilter].sort()) !== JSON.stringify([...state.collectionFilter].sort())
  );
};
