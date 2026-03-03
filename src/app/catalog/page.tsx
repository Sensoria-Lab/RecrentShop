'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { PageContainer, BottomSheet } from '@/src/components/layout';
import { CategorySelector, FiltersPanel, ProductGrid, ActiveFilters } from '@/src/components/products';
import { useProductFilters, useProductNavigation, useCatalogFilters, useFilterCounts, useActiveFilters } from '@/src/hooks';
import { useDeviceDetection } from '@/src/hooks';
import { API_CONFIG } from '@/src/constants/config';
import { ALL_PRODUCTS } from '@/src/lib/products';
import type { Product } from '@/src/types';
import type { ProductCardProps } from '@/src/components/products/ProductCard';
import { Button } from '@/src/components/ui';

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
        img.src = imageSrc.startsWith('/') ? `${process.env.NEXT_PUBLIC_BASE_PATH || ''}${imageSrc}` : imageSrc;
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
  const handleProductClick = useCallback((productData: ProductCardProps) => {
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
  }, [categoryFilter, dispatch]);

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
      <div className="max-w-[1800px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 pt-4 sm:pt-6 md:pt-8 pb-24 sm:pb-12 md:pb-16">
        {/* Content container */}
        <div>


          {/* Editorial catalog header: section label + category tabs */}
          <div className="flex items-stretch mb-6">
            {/* Section label */}
            <div className="hidden sm:flex items-center gap-3 px-4 border-b border-r border-[#EAE2E6]/[0.07] flex-shrink-0">
              <span className="font-jetbrains text-[8px] tracking-[0.35em] uppercase text-[#EAE2E6]/20 select-none">───</span>
              <span className="font-jetbrains text-[9px] tracking-[0.3em] uppercase text-[#EAE2E6]/35">Каталог</span>
              <span className="font-jetbrains text-[8px] tracking-[0.15em] text-[#EAE2E6]/20">{filteredProducts.length}</span>
            </div>
            {/* Category tabs */}
            <div className="flex-1 overflow-x-auto">
              <CategorySelector
                categoryFilter={categoryFilter}
                onCategoryChange={(category) => dispatch({ type: 'SET_CATEGORY_FILTER', payload: category })}
              />
            </div>
          </div>

          {/* Mobile filter button - Enhanced with badges */}
          <div className="lg:hidden mb-3">
            <Button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="w-full min-h-[48px] bg-[#EAE2E6]/[0.05] text-[#EAE2E6]/70 font-jetbrains text-[11px] tracking-[0.12em] uppercase px-4 py-2.5 border border-[#EAE2E6]/[0.08] hover:bg-[#EAE2E6]/10 active:bg-[#EAE2E6]/[0.12] transition-all flex items-center justify-between gap-2"
              variant="secondary"
              size="md"
              fullWidth
              aria-expanded={filtersOpen}
              aria-controls="filters-panel"
              aria-label={filtersOpen ? "Скрыть фильтры" : "Показать фильтры"}
            >
              <div className="flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <span>Фильтры</span>
                {activeFilters.length > 0 && (
                  <span className="bg-[#EAE2E6] text-[#191516] font-jetbrains text-[9px] tracking-[0.1em] px-1.5 py-0.5 min-w-[18px] text-center">
                    {activeFilters.length}
                  </span>
                )}
              </div>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="transition-transform flex-shrink-0"
                aria-hidden="true"
              >
                <path d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </div>

          {/* Active Filters Display */}
          <div className="mb-3">
            <ActiveFilters
              filters={activeFilters}
              onRemove={removeActiveFilter}
              onClearAll={clearAllActiveFilters}
              totalResults={filteredProducts.length}
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 md:gap-5 lg:gap-6">
            {/* Filters Sidebar - Desktop */}
            <aside className="hidden lg:block lg:w-64 xl:w-72 w-full flex-shrink-0" id="filters-panel">
              <FiltersPanel
                sortBy={sortBy}
                onSortChange={(sort) => dispatch({ type: 'SET_SORT_BY', payload: sort })}
                categoryFilter={categoryFilter}
                pendingCollectionFilter={pendingCollectionFilter}
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
                  <Button
                    onClick={handleResetFilters}
                    className="flex-1 min-h-[48px]"
                    variant="secondary"
                    size="md"
                    fullWidth
                  >
                    Сбросить
                  </Button>
                  <Button
                    onClick={handleApplyFilters}
                    className="flex-1 min-h-[48px]"
                    variant="primary"
                    size="md"
                    fullWidth
                  >
                    Применить {activeFilters.length > 0 && `(${activeFilters.length})`}
                  </Button>
                </div>
              }
            >
              <FiltersPanel
                sortBy={sortBy}
                onSortChange={(sort) => dispatch({ type: 'SET_SORT_BY', payload: sort })}
                categoryFilter={categoryFilter}
                pendingCollectionFilter={pendingCollectionFilter}
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


