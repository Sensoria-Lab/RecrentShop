import React, { useState, useEffect, useRef } from 'react';
import ProductCard from '../ui/ProductCard';
import QuickViewModal, { QuickViewProduct } from '../ui/QuickViewModal';
import Breadcrumbs from '../shared/Breadcrumbs';
import PageContainer from '../shared/PageContainer';
import { useProductFilters, useProductNavigation } from '../../hooks';
import { API_CONFIG } from '../../constants/config';
import { ALL_PRODUCTS } from '../../data/products';
import type {
  SortOption,
  CategoryFilter,
  ColorFilter,
  SizeFilter,
  ClothingTypeFilter,
  Product
} from '../../types/product';

const CatalogPage: React.FC = () => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);
  const categoryButtonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [itemsToShow, setItemsToShow] = useState(9); // Show 9 items initially (3x3 grid)

  // Filter states
  const [sortBy, setSortBy] = useState<SortOption>('popularity');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [colorFilter, setColorFilter] = useState<ColorFilter>('all');
  const [sizeFilter, setSizeFilter] = useState<SizeFilter>('all');
  const [clothingTypeFilter, setClothingTypeFilter] = useState<ClothingTypeFilter>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [minRating, setMinRating] = useState<number>(0);
  
  // Quick View modal state
  const [quickViewProduct, setQuickViewProduct] = useState<QuickViewProduct | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

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

  // Use custom hooks for filtering and navigation
  const { navigateToProduct } = useProductNavigation();
  const filteredProducts = useProductFilters(products, {
    sortBy,
    categoryFilter,
    colorFilter,
    sizeFilter,
    clothingTypeFilter,
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

  // Handler for Quick View
  const handleQuickView = (productData: any) => {
    const fullProduct = products.find(p => p.id === productData.id);
    if (fullProduct) {
      setQuickViewProduct({
        id: fullProduct.id,
        image: fullProduct.image,
        images: fullProduct.images,
        title: fullProduct.title,
        subtitle: fullProduct.subtitle,
        price: fullProduct.price,
        priceNumeric: fullProduct.priceNumeric,
        rating: fullProduct.rating,
        reviewCount: fullProduct.reviewCount,
        category: fullProduct.category,
        color: fullProduct.color,
      });
      setIsQuickViewOpen(true);
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
    setSizeFilter('all');
  }, [categoryFilter]);

  // Reset visible items and pagination when filters change
  useEffect(() => {
    setVisibleItems(new Set());
    setItemsToShow(9); // Reset to initial 9 items
  }, [sortBy, categoryFilter, colorFilter, sizeFilter, clothingTypeFilter, priceRange, minRating]);

  // Load more items
  const loadMoreItems = () => {
    setItemsToShow(prev => prev + 9); // Load 9 more items
  };

  return (
    <PageContainer>
          <div className="max-w-[1800px] mx-auto">
            {/* Background container */}
            <div className="panel">
            {/* Breadcrumbs */}
            <div className="pt-6 px-4 sm:px-6 md:px-8">
              <Breadcrumbs />
            </div>
            
            {/* Page Title */}
              <div className="text-center mb-6 sm:mb-8 md:mb-10 pt-6 scroll-fade-in">
              <h1 className="text-white font-manrope font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-3 sm:mb-4 md:mb-6 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                Каталог товаров
              </h1>
              <div className="w-20 sm:w-24 md:w-32 h-0.5 sm:h-1 bg-white/40 mx-auto"></div>
            </div>

            {/* Category Filter - moved here */}
            <div className="mb-6 sm:mb-8 flex justify-center scroll-fade-in scroll-fade-in-delay-1">
              <div className="relative inline-flex gap-2 sm:gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-2">
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
                    className={`relative z-10 px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-manrope font-semibold text-sm sm:text-base transition-colors duration-300 ${
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
                className="w-full bg-white/5 backdrop-blur-sm text-white font-manrope font-semibold px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-white/10 hover:bg-white/8 transition-all flex items-center justify-between text-sm sm:text-base"
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

            <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8">
              {/* Filters Sidebar */}
              <aside className={`lg:w-80 w-full flex-shrink-0 ${filtersOpen ? 'block' : 'hidden lg:block'}`}>
                <div className="panel lg:sticky lg:top-28 overflow-hidden">
                  <h2 className="text-white font-manrope font-bold text-lg sm:text-xl mb-4 sm:mb-6">Фильтры</h2>
                  
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

                  {/* Size Filter */}
                  <div className="mb-4 sm:mb-6">
                    <label className="text-white/80 font-manrope text-xs sm:text-sm mb-2 block">Размер</label>
                    
                    {/* All sizes option */}
                    <label className="flex items-center gap-2 cursor-pointer group mb-3">
                      <input
                        type="radio"
                        name="size-filter"
                        value="all"
                        checked={sizeFilter === 'all'}
                        onChange={(e) => setSizeFilter(e.target.value as SizeFilter)}
                        className="w-4 h-4 accent-white"
                      />
                      <span className="text-white/70 font-manrope text-sm sm:text-base group-hover:text-white transition-colors font-semibold">
                        Все размеры
                      </span>
                    </label>

                    {/* Size options container */}
                    <div className="mt-3">
                      {/* Mousepad sizes */}
                      {categoryFilter !== 'clothing' && (
                        <div className="transition-opacity duration-200">
                        <p className="text-white/60 font-manrope text-xs mb-2 uppercase tracking-wider">Коврики для мыши:</p>
                        <div className="space-y-2 pl-2">
                          {[
                            { value: 'L-pad', label: 'L', desc: '450x400 мм' },
                            { value: 'XL-pad', label: 'XL', desc: '900x400 мм' }
                          ].map(option => (
                            <label key={option.value} className="flex items-center gap-2 cursor-pointer group">
                              <input
                                type="radio"
                                name="size-filter"
                                value={option.value}
                                checked={sizeFilter === option.value}
                                onChange={(e) => setSizeFilter(e.target.value as SizeFilter)}
                                className="w-4 h-4 accent-white"
                              />
                              <span className="text-white/70 font-manrope text-sm group-hover:text-white transition-colors">
                                <span className="font-semibold">{option.label}</span>
                                <span className="text-xs text-white/50 ml-2">({option.desc})</span>
                              </span>
                            </label>
                          ))}
                        </div>
                        </div>
                      )}

                      {/* Clothing sizes */}
                      {categoryFilter !== 'mousepads' && (
                        <div className="transition-opacity duration-200">
                        <p className="text-white/60 font-manrope text-xs mb-2 uppercase tracking-wider">Одежда:</p>
                        <div className="space-y-2 pl-2">
                          {[
                            { value: 'XS-cloth', label: 'XS' },
                            { value: 'S-cloth', label: 'S' },
                            { value: 'M-cloth', label: 'M' },
                            { value: 'L-cloth', label: 'L' },
                            { value: 'XL-cloth', label: 'XL' },
                            { value: '2XL-cloth', label: '2XL' }
                          ].map(option => (
                            <label key={option.value} className="flex items-center gap-2 cursor-pointer group">
                              <input
                                type="radio"
                                name="size-filter"
                                value={option.value}
                                checked={sizeFilter === option.value}
                                onChange={(e) => setSizeFilter(e.target.value as SizeFilter)}
                                className="w-4 h-4 accent-white"
                              />
                              <span className="text-white/70 font-manrope text-sm group-hover:text-white transition-colors">
                                {option.label}
                              </span>
                            </label>
                          ))}
                        </div>
                        </div>
                      )}
                    </div>
                  </div>

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

                  {/* Reset Filters */}
                  <button
                    onClick={() => {
                      setSortBy('popularity');
                      setCategoryFilter('all');
                      setColorFilter('all');
                      setSizeFilter('all');
                      setClothingTypeFilter('all');
                      setPriceRange([0, 10000]);
                      setMinRating(0);
                      setFiltersOpen(false);
                    }}
                    className="w-full bg-white/10 hover:bg-white/20 text-white font-manrope py-2 text-sm sm:text-base rounded-lg transition-colors"
                  >
                    Сбросить фильтры
                  </button>
                </div>
              </aside>

              {/* Products Grid */}
              <div className="flex-1">
                {loading ? (
                  <div className="panel panel-strong text-center min-h-[600px] flex items-center justify-center">
                    <div>
                      <div className="inline-block w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mb-4"></div>
                      <p className="text-white/60 font-manrope text-sm sm:text-base md:text-lg">
                        Загрузка товаров...
                      </p>
                    </div>
                  </div>
                ) : filteredProducts.length === 0 ? (
          <div className="panel panel-strong text-center min-h-[600px] flex items-center justify-center">
            <p className="text-white/60 font-manrope text-sm sm:text-base md:text-lg">
                      Товары не найдены. Попробуйте изменить фильтры.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-3 md:gap-4 lg:gap-4 min-h-[600px] place-items-center">
                      {filteredProducts.slice(0, itemsToShow).map((product, index) => {
                        const delayClass = `scroll-fade-in-delay-${Math.min(index % 4, 4)}`;
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
                            className={`flex justify-center ${isVisible ? `scroll-fade-in ${delayClass}` : ''}`}
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
                              size="small-catalog"
                              stretch={false}
                              staggerIndex={(index % 8) + 1}
                              onAddToCart={() => {}}
                              onProductClick={handleProductClick}
                              onQuickView={handleQuickView}
                            />
                          </div>
                        );
                      })}
                    </div>

                    {/* Load More Button */}
                    {itemsToShow < filteredProducts.length && (
                      <div className="mt-8 flex justify-center">
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
          
          {/* Quick View Modal */}
          <QuickViewModal
            product={quickViewProduct}
            isOpen={isQuickViewOpen}
            onClose={() => setIsQuickViewOpen(false)}
          />
    </PageContainer>
  );
};

export default CatalogPage;
