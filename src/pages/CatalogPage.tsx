import React, { useState, useEffect, useCallback } from 'react';
import { PageContainer, BottomSheet } from '../shared/components';
import { CategorySelector, FiltersPanel, ProductGrid, ActiveFilters } from 'features/products/components';
import { useProductFilters, useProductNavigation, useCatalogFilters, useFilterCounts, useActiveFilters } from 'features/products/hooks';
import { useDeviceDetection } from '../shared/hooks';
import { API_CONFIG } from '../core/constants/config';
import { ALL_PRODUCTS } from '../core/data/products';
import type { Product } from 'features/products/types';

/**
 * Catalog Page Component
 * Refactored with cleaner separation of concerns:
 * - Filter state managed by useCatalogFilters hook
 * - Filter logic in separate model layer
 * - Product fetching and rendering isolated
 */
const CatalogPage: React.FC = () => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { isMobile } = useDeviceDetection();

  // Use custom hook for filter management
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
    dispatch,
    toggleFilterValue,
    applyFilters,
    resetAllFilters,
    hasPendingChanges,
    removeActiveFilter,
    clearAllActiveFilters,
  } = useCatalogFilters();

  // Fetch products from API or use static data
  useEffect(() => {
    const fetchProducts = async () => {
      // Use static data in production if no API URL is configured
      if (API_CONFIG.USE_STATIC_DATA) {
        setProducts(ALL_PRODUCTS);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`${API_CONFIG.BASE_URL}/products`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        // Fallback to static data on error
        setProducts(ALL_PRODUCTS);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Preload critical product images for better performance
  useEffect(() => {
    if (products.length > 0) {
      // Preload first 6 product images
      const imagesToPreload = products.slice(0, 6).map(product => product.image);
      imagesToPreload.forEach(imageSrc => {
        const img = new Image();
        img.src = imageSrc.startsWith('/') ? `${process.env.PUBLIC_URL || ''}${imageSrc}` : imageSrc;
      });
    }
  }, [products]);

  // Use custom hooks for filtering and navigation
  const { navigateToProduct } = useProductNavigation();
  const filteredProducts = useProductFilters(products, {
    sortBy,
    categoryFilter,
    colorFilter,
    sizeFilter,
    clothingTypeFilter,
    collectionFilter,
    priceRange,
    minRating
  });

  // Handler for product card clicks
  const handleProductClick = useCallback((productData: any) => {
    // Find full product data by id
    const fullProduct = products.find(p => p.id === productData.id);
    if (fullProduct) {
      navigateToProduct(fullProduct);
    }
  }, [products, navigateToProduct]);

  // Reset size filter when category changes to avoid conflicts between mousepad/clothing sizes
  useEffect(() => {
    // Reset size filter when switching to/from mousepads category
    const clothingCategories = ['tshirt', 'hoodie', 'sleeve'];
    const isSwitchingToMousepads = categoryFilter === 'mousepads';
    const isSwitchingFromMousepads = clothingCategories.includes(categoryFilter);
    
    if (isSwitchingToMousepads || isSwitchingFromMousepads) {
      dispatch({ type: 'SET_SIZE_FILTER', payload: [] });
      dispatch({ type: 'SET_PENDING_SIZE_FILTER', payload: [] });
    }
  }, [categoryFilter]);

  // Wrap applyFilters to close modal
  const handleApplyFilters = useCallback(() => {
    applyFilters();
    setFiltersOpen(false);
  }, [applyFilters]);

  // Wrap resetAllFilters to close modal
  const handleResetFilters = useCallback(() => {
    resetAllFilters();
    setFiltersOpen(false);
  }, [resetAllFilters]);

  // Use custom hook for filter counts
  const { getCountForFilter } = useFilterCounts({
    products,
    categoryFilter,
    colorFilter,
    sizeFilter,
    clothingTypeFilter,
    collectionFilter,
    priceRange,
    minRating
  });

  // Use custom hook for active filters
  const activeFilters = useActiveFilters(colorFilter, sizeFilter, clothingTypeFilter, collectionFilter);

  return (
    <PageContainer>
          <div className="max-w-[1800px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pt-6 sm:pt-8 md:pt-10 pb-12 sm:pb-16 md:pb-20">
            {/* Content container */}
            <div>
            {/* Page Title - centered */}
            <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 content-reveal content-reveal-delay-1">
              <h1 className="text-white font-manrope font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-2 sm:mb-3 md:mb-4 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                Каталог товаров
              </h1>
              <div className="w-16 sm:w-20 md:w-24 lg:w-32 h-0.5 sm:h-1 bg-white/40 mx-auto"></div>
            </div>

            {/* Category Filter - moved here */}
            <CategorySelector
              categoryFilter={categoryFilter}
              onCategoryChange={(category) => dispatch({ type: 'SET_CATEGORY_FILTER', payload: category })}
            />

            {/* Mobile filter button - Enhanced with badges */}
            <div className="lg:hidden mb-3 sm:mb-4">
              <button
                onClick={() => setFiltersOpen(!filtersOpen)}
                className="w-full min-h-[52px] bg-black/40 text-white font-manrope font-semibold px-4 sm:px-6 py-3 rounded-xl border border-white/20 hover:bg-black/50 active:bg-black/60 transition-all flex items-center justify-between text-base gap-3"
                aria-expanded={filtersOpen}
                aria-controls="filters-panel"
                aria-label={filtersOpen ? "Скрыть фильтры" : "Показать фильтры"}
              >
                <div className="flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  <span>Фильтры и сортировка</span>
                  {activeFilters.length > 0 && (
                    <span className="bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {activeFilters.length}
                    </span>
                  )}
                </div>
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  className="transition-transform flex-shrink-0"
                  aria-hidden="true"
                >
                  <path d="M9 5l7 7-7 7"/>
                </svg>
              </button>
            </div>

            {/* Active Filters Display */}
            <div className="mb-4">
              <ActiveFilters
                filters={activeFilters}
                onRemove={removeActiveFilter}
                onClearAll={clearAllActiveFilters}
                totalResults={filteredProducts.length}
              />
            </div>

            <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 md:gap-6 lg:gap-8">
              {/* Filters Sidebar - Desktop */}
              <aside className="hidden lg:block lg:w-72 xl:w-80 w-full flex-shrink-0" id="filters-panel">
                <FiltersPanel
                  sortBy={sortBy}
                  onSortChange={(sort) => dispatch({ type: 'SET_SORT_BY', payload: sort })}
                  categoryFilter={categoryFilter}
                  pendingCollectionFilter={pendingCollectionFilter as any}
                  pendingSizeFilter={pendingSizeFilter}
                  pendingClothingTypeFilter={pendingClothingTypeFilter}
                  priceRange={priceRange}
                  onPriceRangeChange={(range) => dispatch({ type: 'SET_PRICE_RANGE', payload: range })}
                  onToggleFilter={toggleFilterValue}
                  onApplyFilters={handleApplyFilters}
                  onResetFilters={handleResetFilters}
                  hasPendingChanges={hasPendingChanges}
                  getFilterCounts={{ getCountForFilter }}
                />
              </aside>

              {/* Products Grid */}
              <div className="flex-1">
                <ProductGrid
                  products={filteredProducts}
                  loading={loading}
                  onProductClick={handleProductClick}
                />
              </div>
            </div>

            {/* Mobile Filters - BottomSheet */}
            {isMobile && (
              <BottomSheet
                isOpen={filtersOpen}
                onClose={() => setFiltersOpen(false)}
                title="Фильтры и сортировка"
                height="full"
                footer={
                  <div className="flex gap-3">
                    <button
                      onClick={handleResetFilters}
                      className="flex-1 min-h-[48px] bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/20 text-white font-semibold rounded-xl transition-all"
                    >
                      Сбросить
                    </button>
                    <button
                      onClick={handleApplyFilters}
                      className="flex-1 min-h-[48px] bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 active:scale-95 text-white font-semibold rounded-xl transition-all shadow-lg"
                    >
                      Применить {activeFilters.length > 0 && `(${activeFilters.length})`}
                    </button>
                  </div>
                }
              >
                <FiltersPanel
                  sortBy={sortBy}
                  onSortChange={(sort) => dispatch({ type: 'SET_SORT_BY', payload: sort })}
                  categoryFilter={categoryFilter}
                  pendingCollectionFilter={pendingCollectionFilter as any}
                  pendingSizeFilter={pendingSizeFilter}
                  pendingClothingTypeFilter={pendingClothingTypeFilter}
                  priceRange={priceRange}
                  onPriceRangeChange={(range) => dispatch({ type: 'SET_PRICE_RANGE', payload: range })}
                  onToggleFilter={toggleFilterValue}
                  onApplyFilters={handleApplyFilters}
                  onResetFilters={handleResetFilters}
                  hasPendingChanges={hasPendingChanges}
                  getFilterCounts={{ getCountForFilter }}
                />
              </BottomSheet>
            )}
            </div>
          </div>
    </PageContainer>
  );
};

export default CatalogPage;
