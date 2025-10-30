import React, { useState, useEffect, useRef, useMemo } from 'react';
import { PageContainer } from '../shared/components';
import { ProductCard, FilterSection, ActiveFilters } from 'features/products/components';
import { useProductFilters, useProductNavigation } from 'features/products/hooks';
import { API_CONFIG } from '../core/constants/config';
import { ALL_PRODUCTS } from '../core/data/products';
import type {
  SortOption,
  CategoryFilter,
  ColorFilter,
  SizeFilter,
  ClothingTypeFilter,
  CollectionFilter,
  Product,
  SizeFilterValue,
  ClothingTypeFilterValue,
  CollectionFilterValue
} from 'features/products/types';

const CatalogPage: React.FC = () => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);
  const categoryButtonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [itemsToShow, setItemsToShow] = useState(12); // Show 12 items initially (3 rows × 4 cols on wide screens)

  // Filter states
  const [sortBy, setSortBy] = useState<SortOption>('popularity');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  
  // Active filters (applied to products)
  const [colorFilter, setColorFilter] = useState<ColorFilter>([]);
  const [sizeFilter, setSizeFilter] = useState<SizeFilter>([]);
  const [clothingTypeFilter, setClothingTypeFilter] = useState<ClothingTypeFilter>([]);
  const [collectionFilter, setCollectionFilter] = useState<CollectionFilter>([]);
  
  // Pending filters (waiting for user to click "Apply")
  const [pendingColorFilter, setPendingColorFilter] = useState<ColorFilter>([]);
  const [pendingSizeFilter, setPendingSizeFilter] = useState<SizeFilter>([]);
  const [pendingClothingTypeFilter, setPendingClothingTypeFilter] = useState<ClothingTypeFilter>([]);
  const [pendingCollectionFilter, setPendingCollectionFilter] = useState<CollectionFilter>([]);
  
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [minRating, setMinRating] = useState<number>(0);

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
  const handleProductClick = (productData: any) => {
    // Find full product data by id
    const fullProduct = products.find(p => p.id === productData.id);
    if (fullProduct) {
      navigateToProduct(fullProduct);
    }
  };

  // Setup Intersection Observer for scroll animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleItems((prev) => new Set(prev).add(index));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Reset size filter when category changes to avoid conflicts between mousepad/clothing sizes
  useEffect(() => {
    setSizeFilter([]);
    setPendingSizeFilter([]);
  }, [categoryFilter]);

  // Reset visible items and pagination when filters change
  useEffect(() => {
    setVisibleItems(new Set());
    setItemsToShow(12); // Reset to initial 12 items
  }, [sortBy, categoryFilter, colorFilter, sizeFilter, clothingTypeFilter, priceRange, minRating]);

  // Load more items
  const loadMoreItems = () => {
    setItemsToShow(prev => prev + 12); // Load 12 more items (3 rows)
  };

  // Toggle filter value in pending state
  const toggleFilterValue = <T extends string>(
    value: T,
    currentValues: T[],
    setter: React.Dispatch<React.SetStateAction<T[]>>
  ) => {
    setter(prev => {
      if (prev.includes(value)) {
        return prev.filter(v => v !== value);
      }
      return [...prev, value];
    });
  };

  // Apply pending filters to active filters
  const applyFilters = () => {
    setColorFilter(pendingColorFilter);
    setSizeFilter(pendingSizeFilter);
    setClothingTypeFilter(pendingClothingTypeFilter);
    setCollectionFilter(pendingCollectionFilter);
    setFiltersOpen(false);
  };

  // Check if there are pending changes
  const hasPendingChanges = () => {
    return (
      JSON.stringify([...pendingColorFilter].sort()) !== JSON.stringify([...colorFilter].sort()) ||
      JSON.stringify([...pendingSizeFilter].sort()) !== JSON.stringify([...sizeFilter].sort()) ||
      JSON.stringify([...pendingClothingTypeFilter].sort()) !== JSON.stringify([...clothingTypeFilter].sort()) ||
      JSON.stringify([...pendingCollectionFilter].sort()) !== JSON.stringify([...collectionFilter].sort())
    );
  };

  // Reset all filters
  const resetAllFilters = () => {
    setSortBy('popularity');
    setCategoryFilter('all');
    setColorFilter([]);
    setSizeFilter([]);
    setClothingTypeFilter([]);
    setCollectionFilter([]);
    setPendingColorFilter([]);
    setPendingSizeFilter([]);
    setPendingClothingTypeFilter([]);
    setPendingCollectionFilter([]);
    setPriceRange([0, 10000]);
    setMinRating(0);
    setFiltersOpen(false);
  };

  // Calculate product counts for each filter option
  const getFilterCounts = useMemo(() => {
    // Filter products based on category first
    let baseProducts = products.filter(p => 
      categoryFilter === 'all' || p.category === categoryFilter
    );

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

    return { getCountForFilter };
  }, [products, categoryFilter, colorFilter, sizeFilter, clothingTypeFilter, collectionFilter, priceRange, minRating]);

  // Get active filters for badges
  const getActiveFilters = () => {
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
      'sleeve': 'Лонгсливы'
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
  };

  // Remove single active filter
  const removeActiveFilter = (type: 'color' | 'size' | 'clothingType' | 'collection', value: string) => {
    if (type === 'color') {
      const newFilter = colorFilter.filter(v => v !== value);
      setColorFilter(newFilter);
      setPendingColorFilter(newFilter);
    } else if (type === 'size') {
      const newFilter = sizeFilter.filter(v => v !== value);
      setSizeFilter(newFilter);
      setPendingSizeFilter(newFilter);
    } else if (type === 'clothingType') {
      const newFilter = clothingTypeFilter.filter(v => v !== value);
      setClothingTypeFilter(newFilter);
      setPendingClothingTypeFilter(newFilter);
    } else if (type === 'collection') {
      const newFilter = collectionFilter.filter(v => v !== value);
      setCollectionFilter(newFilter);
      setPendingCollectionFilter(newFilter);
    }
  };

  // Clear all active filters
  const clearAllActiveFilters = () => {
    setColorFilter([]);
    setSizeFilter([]);
    setClothingTypeFilter([]);
    setCollectionFilter([]);
    setPendingColorFilter([]);
    setPendingSizeFilter([]);
    setPendingClothingTypeFilter([]);
    setPendingCollectionFilter([]);
  };

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
            <div className="mb-6 sm:mb-8 md:mb-10 flex justify-center content-reveal content-reveal-delay-1 px-2">
              <div className="relative inline-flex flex-wrap justify-center gap-1.5 sm:gap-2 md:gap-3 bg-white/8 border border-white/20 rounded-lg sm:rounded-xl p-1.5 sm:p-2">
                {/* Animated background indicator */}
                <div
                  className="absolute bg-white rounded-lg shadow-lg transition-all duration-300 ease-out z-0"
                  style={{
                    left: categoryButtonRefs.current[categoryFilter]?.offsetLeft ?? 0,
                    top: categoryButtonRefs.current[categoryFilter]?.offsetTop ?? 0,
                    width: categoryButtonRefs.current[categoryFilter]?.offsetWidth ?? 0,
                    height: categoryButtonRefs.current[categoryFilter]?.offsetHeight ?? 0,
                  }}
                />

                {[
                  { value: 'all', label: 'Все товары' },
                  { value: 'mousepads', label: 'Коврики' },
                  { value: 'clothing', label: 'Одежда' }
                ].map(option => (
                  <button
                    key={option.value}
                    ref={(el) => (categoryButtonRefs.current[option.value] = el)}
                    onClick={() => setCategoryFilter(option.value as CategoryFilter)}
                    className={`relative z-10 px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-2.5 rounded-md sm:rounded-lg font-manrope font-semibold text-xs sm:text-sm md:text-base transition-colors duration-300 whitespace-nowrap ${
                      categoryFilter === option.value
                        ? 'text-black'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile filter button */}
            <div className="lg:hidden mb-3 sm:mb-4">
              <button
                onClick={() => setFiltersOpen(!filtersOpen)}
                className="w-full bg-black/40 text-white font-manrope font-semibold px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-white/20 hover:bg-black/50 transition-all flex items-center justify-between text-sm sm:text-base"
              >
                <span>Фильтры</span>
                <svg 
                  width="18" 
                  height="18" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  className={`transition-transform sm:w-5 sm:h-5 ${filtersOpen ? 'rotate-180' : ''}`}
                >
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </button>
            </div>

            {/* Active Filters Display */}
            <div className="mb-4">
              <ActiveFilters
                filters={getActiveFilters()}
                onRemove={removeActiveFilter}
                onClearAll={clearAllActiveFilters}
                totalResults={filteredProducts.length}
              />
            </div>

            <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 md:gap-6 lg:gap-8">
              {/* Filters Sidebar */}
              <aside className={`lg:w-72 xl:w-80 w-full flex-shrink-0 ${filtersOpen ? 'block' : 'hidden lg:block'}`}>
                <div className="bg-black/40 border border-white/20 rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 lg:sticky lg:top-28 overflow-hidden">
                  <h2 className="text-white font-manrope font-bold text-base sm:text-lg md:text-xl mb-3 sm:mb-4 md:mb-6">Фильтры</h2>
                  
                  {/* Sort By */}
                  <div className="mb-4 sm:mb-6">
                    <label className="text-white/80 font-manrope text-xs sm:text-sm mb-2 block">Сортировка</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as SortOption)}
                      className="w-full form-control"
                      style={{ colorScheme: 'dark' }}
                    >
                      <option value="popularity" className="bg-black text-white">По популярности</option>
                      <option value="rating" className="bg-black text-white">По рейтингу</option>
                      <option value="price-asc" className="bg-black text-white">Цена: по возрастанию</option>
                      <option value="price-desc" className="bg-black text-white">Цена: по убыванию</option>
                    </select>
                  </div>

                  {/* Collection Filter */}
                  <FilterSection<CollectionFilterValue>
                    title="Коллекция"
                    options={[
                      { value: 'Geoid', label: 'Geoid', count: getFilterCounts.getCountForFilter('collection', 'Geoid') },
                      { value: 'Pro Speed', label: 'Pro Speed', count: getFilterCounts.getCountForFilter('collection', 'Pro Speed') },
                      { value: 'Logo Blue', label: 'Logo Blue', count: getFilterCounts.getCountForFilter('collection', 'Logo Blue') },
                      { value: 'Logo Red', label: 'Logo Red', count: getFilterCounts.getCountForFilter('collection', 'Logo Red') },
                      { value: 'Serpents', label: 'Serpents', count: getFilterCounts.getCountForFilter('collection', 'Serpents') }
                    ]}
                    selectedValues={pendingCollectionFilter}
                    onChange={(value) => toggleFilterValue(value, pendingCollectionFilter, setPendingCollectionFilter)}
                  />

                  {/* Size Filter - Mousepad sizes */}
                  {categoryFilter !== 'clothing' && (
                    <FilterSection<SizeFilterValue>
                      title="Размер"
                      categoryLabel="Коврики для мыши"
                      options={[
                        { value: 'L-pad', label: 'L', description: '450x400 мм', count: getFilterCounts.getCountForFilter('size', 'L-pad') },
                        { value: 'XL-pad', label: 'XL', description: '900x400 мм', count: getFilterCounts.getCountForFilter('size', 'XL-pad') }
                      ]}
                      selectedValues={pendingSizeFilter}
                      onChange={(value) => toggleFilterValue(value, pendingSizeFilter, setPendingSizeFilter)}
                    />
                  )}

                  {/* Clothing Type Filter */}
                  {categoryFilter === 'clothing' && (
                    <FilterSection<ClothingTypeFilterValue>
                      title="Тип одежды"
                      options={[
                        { value: 'hoodie', label: 'Худи', count: getFilterCounts.getCountForFilter('clothingType', 'hoodie') },
                        { value: 'tshirt', label: 'Футболки', count: getFilterCounts.getCountForFilter('clothingType', 'tshirt') },
                        { value: 'sleeve', label: 'Лонгсливы', count: getFilterCounts.getCountForFilter('clothingType', 'sleeve') }
                      ]}
                      selectedValues={pendingClothingTypeFilter}
                      onChange={(value) => toggleFilterValue(value, pendingClothingTypeFilter, setPendingClothingTypeFilter)}
                    />
                  )}

                  {/* Price Range */}
                  <div className="mb-4 sm:mb-6">
                    <label className="text-white/80 font-manrope text-xs sm:text-sm mb-2 block">
                      Цена: {priceRange[0]} - {priceRange[1]} р.
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      step="100"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                      className="w-full form-control"
                    />
                  </div>

                  {/* Apply Filters Button - показываем только если есть изменения */}
                  {hasPendingChanges() && (
                    <button
                      onClick={applyFilters}
                      className="w-full bg-gradient-to-r from-white to-gray-100 hover:from-gray-100 hover:to-white text-black font-manrope font-bold py-3 text-sm sm:text-base rounded-lg transition-all mb-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 animate-fadeIn"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Применить фильтры
                    </button>
                  )}

                  {/* Reset Filters */}
                  <button
                    onClick={resetAllFilters}
                    className="w-full bg-white/10 hover:bg-white/20 text-white font-manrope font-medium py-2.5 text-sm sm:text-base rounded-lg transition-all border border-white/10 hover:border-white/30 flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Сбросить всё
                  </button>
                </div>
              </aside>

              {/* Products Grid */}
              <div className="flex-1">
                {loading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-4 md:gap-5 lg:gap-6 min-h-[600px] justify-items-center auto-rows-fr">
                    {/* Skeleton cards */}
                    {Array.from({ length: 9 }).map((_, index) => (
                      <div
                        key={index}
                        className="bg-white/8 rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 w-full max-w-[280px] sm:max-w-[320px] md:max-w-[364px] flex flex-col justify-between border border-white/20 skeleton-shimmer"
                      >
                        {/* Image skeleton */}
                        <div className="aspect-[4/3] rounded-lg sm:rounded-xl mx-auto w-full bg-white/5 mb-3"></div>

                        {/* Title skeleton */}
                        <div className="min-h-[50px] sm:min-h-[60px] md:min-h-[70px] lg:min-h-[80px] xl:min-h-[90px] flex flex-col gap-2 mb-2">
                          <div className="h-5 bg-white/5 rounded w-3/4"></div>
                          <div className="h-4 bg-white/5 rounded w-1/2"></div>
                        </div>

                        {/* Rating skeleton */}
                        <div className="h-4 bg-white/5 rounded w-24 mb-3"></div>

                        {/* Divider */}
                        <div className="w-full h-px bg-white/10 my-3"></div>

                        {/* Price and button skeleton */}
                        <div className="flex items-center justify-between gap-2">
                          <div className="h-6 bg-white/5 rounded w-20"></div>
                          <div className="h-9 bg-white/5 rounded w-24"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : filteredProducts.length === 0 ? (
          <div className="text-center min-h-[600px] flex items-center justify-center">
            <p className="text-white/60 font-manrope text-sm sm:text-base md:text-lg">
                      Товары не найдены. Попробуйте изменить фильтры.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 min-h-[600px] justify-items-center items-start">
                      {filteredProducts.slice(0, itemsToShow).map((product, index) => {
                        const cols = 4; // Assuming max 4 columns for animation sequence
                        const delay = Math.floor(index / cols) * cols + (index % cols) + 1;
                        const delayClass = `content-reveal-delay-${Math.min(delay, 8)}`;
                        const isVisible = visibleItems.has(index);

                        return (
                          <div
                            key={product.id}
                            data-index={index}
                            ref={(el) => {
                              if (el && observerRef.current && !isVisible) {
                                observerRef.current.observe(el);
                              }
                            }}
                            className={`${isVisible ? `content-reveal ${delayClass}` : ''}`}
                          >
                            <ProductCard
                              id={product.id}
                              image={product.image}
                              images={product.images}
                              title={product.title}
                              subtitle={product.subtitle}
                              productSize={product.productSize}
                              productColor={product.productColor}
                              price={product.price}
                              priceNumeric={product.priceNumeric}
                              rating={product.rating}
                              reviewCount={product.reviewCount}
                              color={product.color}
                              category={product.category}
                              clothingType={product.clothingType}
                              size="medium"
                              stretch={false}
                              staggerIndex={Math.min(delay, 8)}
                              addedDate={product.addedDate}
                              onProductClick={handleProductClick}
                            />
                          </div>
                        );
                      })}
                    </div>

                    {/* Load More Button */}
                    {itemsToShow < filteredProducts.length && (
                      <div className="mt-8 mb-16 flex justify-center">
                        <button
                          onClick={loadMoreItems}
                          className="bg-white/10 hover:bg-white/20 border border-white/30 hover:border-white/50 text-white font-manrope font-semibold px-8 py-3 rounded-lg transition-all duration-300 flex items-center gap-2 group"
                        >
                          <span>Загрузить еще</span>
                          <svg
                            className="w-4 h-4 transition-transform group-hover:translate-y-0.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
            </div>
          </div>
    </PageContainer>
  );
};

export default CatalogPage;
