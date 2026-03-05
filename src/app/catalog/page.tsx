'use client';
import React, { useState, useEffect, useCallback, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import gsap from '@/src/lib/gsap';
import PageContainer from '@/src/components/layout/PageContainer';
import { CatalogPageSkeleton } from '@/src/components/layout/Skeletons';
import BottomSheet from '@/src/components/layout/BottomSheet';
import CategorySelector from '@/src/components/products/CategorySelector';
import FiltersPanel from '@/src/components/products/FiltersPanel';
import ProductGrid from '@/src/components/products/ProductGrid';
import ActiveFilters from '@/src/components/products/ActiveFilters';
import { useProductFilters } from '@/src/hooks/useProductFilters';
import { useProductNavigation } from '@/src/hooks/useProductNavigation';
import { useCatalogFilters } from '@/src/hooks/useCatalogFilters';
import { useFilterCounts } from '@/src/hooks/useFilterCounts';
import { useActiveFilters } from '@/src/hooks/useActiveFilters';
import { useDeviceDetection } from '@/src/hooks/useDeviceDetection';
import { API_CONFIG } from '@/src/constants/config';
import { ALL_PRODUCTS } from '@/src/lib/products';
import type { Product } from '@/src/types/product';
import type { ProductCardProps } from '@/src/components/products/ProductCard';
import type { CategoryFilter } from '@/src/types/product';
import { Button } from '@/src/components/ui/Button';
import { shouldReduceMotion, EASE_EDITORIAL } from '@/src/components/animations';

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
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { isMobile } = useDeviceDetection();
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();

  /* ── Entrance animation — Refined per Design System ─── */
  useEffect(() => {
    if (headerRef.current) {
      const reduceMotion = shouldReduceMotion();
      if (!reduceMotion) {
        gsap.fromTo(headerRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5, ease: EASE_EDITORIAL }
        );
      } else {
        gsap.set(headerRef.current, { opacity: 1, y: 0 });
      }
    }
  }, []);

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

  // Read category from URL parameters and set initial filter
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl) {
      const validCategories: CategoryFilter[] = ['all', 'mousepads', 'clothing', 'tshirt', 'hoodie', 'sleeve'];
      if (validCategories.includes(categoryFromUrl as CategoryFilter)) {
        dispatch({ type: 'SET_CATEGORY_FILTER', payload: categoryFromUrl as CategoryFilter });
      }
    }
  }, [searchParams, dispatch]);

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
    const clothingCategories = ['clothing', 'tshirt', 'hoodie', 'sleeve'];
    const isSwitchingToMousepads = categoryFilter === 'mousepads';
    const isSwitchingToClothing = clothingCategories.includes(categoryFilter);

    if (isSwitchingToMousepads || isSwitchingToClothing) {
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

  // Smooth category change handler
  const handleCategoryChange = useCallback((category: CategoryFilter) => {
    if (category === categoryFilter) return;

    setIsTransitioning(true);

    // Small delay to allow exit animation
    setTimeout(() => {
      dispatch({ type: 'SET_CATEGORY_FILTER', payload: category });
      // Reset transition after products update
      requestAnimationFrame(() => {
        setIsTransitioning(false);
      });
    }, 50);
  }, [categoryFilter, dispatch]);

  if (loading) {
    return (
      <PageContainer>
        <CatalogPageSkeleton />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="max-w-[1800px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 pt-8 md:pt-12 pb-24 sm:pb-12 md:pb-16">
        <div>

          {/* ─── Section Header ─────────────────────────────────────────── */}
          <div
            ref={headerRef}
            className="mb-8 md:mb-10 border-b border-[var(--rc-border)] pb-6 flex items-end justify-between gap-4"
          >
            <h1
              className="font-manrope font-black tracking-tight text-[var(--rc-fg)] leading-[0.9]"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)' }}
            >
              Каталог
            </h1>
            <span className="font-jetbrains text-[11px] tracking-[0.2em] uppercase text-[var(--rc-fg-muted)] pb-1 select-none">
              {filteredProducts.length} товаров
            </span>
          </div>

          {/* Mobile: category tabs + filter button stacked */}
          <div className="lg:hidden mb-4 flex flex-col gap-3">
            {/* Category tabs — scrollable */}
            <div className="overflow-x-auto -mx-3 px-3">
              <CategorySelector
                categoryFilter={categoryFilter}
                onCategoryChange={handleCategoryChange}
              />
            </div>

            {/* Filter button */}
            <Button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="w-full min-h-[48px] bg-[var(--rc-fg-ghost)] text-[var(--rc-fg-secondary)] font-jetbrains text-[11px] tracking-[0.12em] uppercase px-4 py-2.5 border border-[var(--rc-border)] hover:bg-[var(--rc-fg-subtle)] active:bg-[var(--rc-fg-ghost)] transition-all flex items-center justify-between gap-2"
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
                  <span className="bg-[var(--rc-bg-invert)] text-[var(--rc-bg)] font-jetbrains text-[9px] tracking-[0.1em] px-1.5 py-0.5 min-w-[18px] text-center">
                    {activeFilters.length}
                  </span>
                )}
              </div>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform flex-shrink-0" aria-hidden="true">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </Button>
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

          <div className="flex flex-col lg:flex-row gap-6 md:gap-10 lg:gap-16">
            {/* Sidebar - Desktop: category tabs at top, then filters */}
            <aside className="hidden lg:block lg:w-[20rem] xl:w-[22rem] flex-shrink-0" id="filters-panel">
              <div className="sticky top-28 flex flex-col gap-0">
                {/* Category selector — vertical sidebar variant */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-jetbrains text-[9px] tracking-[0.28em] uppercase text-[var(--rc-fg-muted)] select-none">/</span>
                    <span className="font-jetbrains text-[9px] tracking-[0.28em] uppercase text-[var(--rc-fg-muted)]">Категория</span>
                  </div>
                  <CategorySelector
                    categoryFilter={categoryFilter}
                    onCategoryChange={handleCategoryChange}
                    variant="sidebar"
                  />
                </div>

                {/* Divider + Фильтры label */}
                <div className="border-t border-[var(--rc-border)] mb-6" />
                <div className="flex items-center gap-2 mb-4">
                  <span className="font-jetbrains text-[9px] tracking-[0.28em] uppercase text-[var(--rc-fg-muted)] select-none">/</span>
                  <span className="font-jetbrains text-[9px] tracking-[0.28em] uppercase text-[var(--rc-fg-muted)]">Фильтры</span>
                </div>

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
              </div>
            </aside>

            {/* Products Grid */}
            <div
              ref={gridRef}
              className={`flex-1 transition-opacity duration-200 ease-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
            >
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

export default function Catalog() {
  return (
    <Suspense fallback={
      <PageContainer>
        <CatalogPageSkeleton />
      </PageContainer>
    }>
      <CatalogPage />
    </Suspense>
  );
}

