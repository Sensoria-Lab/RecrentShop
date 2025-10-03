import React, { useState, useEffect, useRef } from 'react';
import ProductCard from '../ui/ProductCard';
import PageContainer from '../shared/PageContainer';
import { useProductFilters, useProductNavigation } from '../../hooks';
import type {
  SortOption,
  CategoryFilter,
  ColorFilter,
  SizeFilter,
  ClothingTypeFilter,
  Product
} from '../../types/product';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const CatalogPage: React.FC = () => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);
  const categoryButtonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [sortBy, setSortBy] = useState<SortOption>('popularity');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [colorFilter, setColorFilter] = useState<ColorFilter>('all');
  const [sizeFilter, setSizeFilter] = useState<SizeFilter>('all');
  const [clothingTypeFilter, setClothingTypeFilter] = useState<ClothingTypeFilter>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [minRating, setMinRating] = useState<number>(0);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/products`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
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

  // Reset visible items when filters change (except category to preserve background)
  useEffect(() => {
    setVisibleItems(new Set());
  }, [sortBy, colorFilter, sizeFilter, clothingTypeFilter, priceRange, minRating]);

  return (
    <PageContainer>
          <div className="max-w-[1600px] mx-auto">
            {/* Background container */}
            <div className="bg-black/40 backdrop-blur rounded-xl p-4 sm:p-6 md:p-8 lg:p-10">
            {/* Page Title */}
            <div className="text-center mb-4 sm:mb-6 md:mb-8 scroll-fade-in">
              <h1 className="text-white font-manrope font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-3 sm:mb-4 md:mb-6 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                Каталог товаров
              </h1>
              <div className="w-20 sm:w-24 md:w-32 h-0.5 sm:h-1 bg-white/40 mx-auto"></div>
            </div>

            {/* Category Filter - moved here */}
            <div className="mb-6 sm:mb-8 flex justify-center scroll-fade-in scroll-fade-in-delay-1">
              <div className="relative inline-flex gap-2 sm:gap-3 bg-black/40 backdrop-blur rounded-xl p-2 border border-white/20">
                {/* Animated background indicator */}
                <div
                  className="absolute bg-white rounded-lg shadow-lg transition-all duration-300 ease-out"
                  style={{
                    left: categoryButtonRefs.current[categoryFilter]?.offsetLeft ?? 0,
                    top: '8px',
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
                className="w-full bg-black/40 backdrop-blur text-white font-manrope font-semibold px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-white/20 hover:bg-black/60 transition-all flex items-center justify-between text-sm sm:text-base"
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
                <div className="bg-black/40 backdrop-blur rounded-xl p-4 sm:p-5 md:p-6 lg:sticky lg:top-28">
                  <h2 className="text-white font-manrope font-bold text-lg sm:text-xl mb-4 sm:mb-6">Фильтры</h2>
                  
                  {/* Sort By */}
                  <div className="mb-4 sm:mb-6">
                    <label className="text-white/80 font-manrope text-xs sm:text-sm mb-2 block">Сортировка</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as SortOption)}
                      className="w-full bg-black text-white border border-white/30 rounded-lg px-3 sm:px-4 py-2 font-manrope text-sm sm:text-base focus:outline-none focus:border-white/60 transition-colors cursor-pointer hover:bg-black/80"
                      style={{ colorScheme: 'dark' }}
                    >
                      <option value="popularity" className="bg-black text-white">По популярности</option>
                      <option value="rating" className="bg-black text-white">По рейтингу</option>
                      <option value="price-asc" className="bg-black text-white">Цена: по возрастанию</option>
                      <option value="price-desc" className="bg-black text-white">Цена: по убыванию</option>
                    </select>
                  </div>

                  {/* Clothing Type Filter */}
                  {(categoryFilter === 'clothing' || categoryFilter === 'all') && (
                    <div className="mb-4 sm:mb-6">
                      <label className="text-white/80 font-manrope text-xs sm:text-sm mb-2 block">Тип одежды</label>
                      <div className="space-y-2">
                        {[
                          { value: 'all', label: 'Вся одежда' },
                          { value: 'hoodie', label: 'Худи' },
                          { value: 'tshirt', label: 'Футболки' }
                        ].map(option => (
                          <label key={option.value} className="flex items-center gap-2 cursor-pointer group">
                            <input
                              type="radio"
                              name="clothingType"
                              value={option.value}
                              checked={clothingTypeFilter === option.value}
                              onChange={(e) => setClothingTypeFilter(e.target.value as ClothingTypeFilter)}
                              className="w-4 h-4 accent-white"
                            />
                            <span className="text-white/70 font-manrope group-hover:text-white transition-colors">
                              {option.label}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Color Filter */}
                  <div className="mb-4 sm:mb-6">
                    <label className="text-white/80 font-manrope text-xs sm:text-sm mb-2 block">Цвет</label>
                    <div className="space-y-2">
                      {[
                        { value: 'all', label: 'Все цвета' },
                        { value: 'black', label: 'Черный' },
                        { value: 'white', label: 'Белый' },
                        { value: 'red', label: 'Красный' }
                      ].map(option => (
                        <label key={option.value} className="flex items-center gap-2 cursor-pointer group">
                          <input
                            type="radio"
                            name="color"
                            value={option.value}
                            checked={colorFilter === option.value}
                            onChange={(e) => setColorFilter(e.target.value as ColorFilter)}
                            className="w-4 h-4 accent-white"
                          />
                          <span className="text-white/70 font-manrope group-hover:text-white transition-colors">
                            {option.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Size Filter */}
                  <div className="mb-4 sm:mb-6">
                    <label className="text-white/80 font-manrope text-xs sm:text-sm mb-2 block">Размер</label>
                    
                    {/* All sizes option */}
                    <label className="flex items-center gap-2 cursor-pointer group mb-3">
                      <input
                        type="radio"
                        name="size"
                        value="all"
                        checked={sizeFilter === 'all'}
                        onChange={(e) => setSizeFilter(e.target.value as SizeFilter)}
                        className="w-4 h-4 accent-white"
                      />
                      <span className="text-white/70 font-manrope text-sm sm:text-base group-hover:text-white transition-colors font-semibold">
                        Все размеры
                      </span>
                    </label>

                    {/* Mousepad sizes */}
                    {categoryFilter !== 'clothing' && (
                      <div className="mb-3">
                        <p className="text-white/60 font-manrope text-xs mb-2 uppercase tracking-wider">Коврики для мыши:</p>
                        <div className="space-y-2 pl-2">
                          {[
                            { value: 'L', label: 'L', desc: '450x400 мм' },
                            { value: 'XL', label: 'XL', desc: '900x400 мм' }
                          ].map(option => (
                            <label key={option.value} className="flex items-center gap-2 cursor-pointer group">
                              <input
                                type="radio"
                                name="size"
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
                      <div>
                        <p className="text-white/60 font-manrope text-xs mb-2 uppercase tracking-wider">Одежда:</p>
                        <div className="space-y-2 pl-2">
                          {[
                            { value: 'XS', label: 'XS' },
                            { value: 'S', label: 'S' },
                            { value: 'M', label: 'M' },
                            { value: 'L', label: 'L (одежда)' },
                            { value: 'XL', label: 'XL (одежда)' },
                            { value: '2XL', label: '2XL' }
                          ].map(option => (
                            <label key={option.value} className="flex items-center gap-2 cursor-pointer group">
                              <input
                                type="radio"
                                name="size"
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
                      className="w-full accent-white"
                    />
                  </div>

                  {/* Rating Filter */}
                  <div className="mb-4 sm:mb-6">
                    <label className="text-white/80 font-manrope text-xs sm:text-sm mb-2 block">Минимальный рейтинг</label>
                    <div className="space-y-2">
                      {[0, 3, 4, 5].map(rating => (
                        <label key={rating} className="flex items-center gap-2 cursor-pointer group">
                          <input
                            type="radio"
                            name="rating"
                            value={rating}
                            checked={minRating === rating}
                            onChange={() => setMinRating(rating)}
                            className="w-4 h-4 accent-white"
                          />
                          <span className="text-white/70 font-manrope group-hover:text-white transition-colors">
                            {rating === 0 ? 'Любой' : `${rating}+ ⭐`}
                          </span>
                        </label>
                      ))}
                    </div>
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
                  <div className="bg-black/40 backdrop-blur rounded-lg sm:rounded-xl p-6 sm:p-8 md:p-12 text-center">
                    <div className="inline-block w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-white/60 font-manrope text-sm sm:text-base md:text-lg">
                      Загрузка товаров...
                    </p>
                  </div>
                ) : filteredProducts.length === 0 ? (
                  <div className="bg-black/40 backdrop-blur rounded-lg sm:rounded-xl p-6 sm:p-8 md:p-12 text-center">
                    <p className="text-white/60 font-manrope text-sm sm:text-base md:text-lg">
                      Товары не найдены. Попробуйте изменить фильтры.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-3 md:gap-4 lg:gap-4">
                    {filteredProducts.map((product, index) => {
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
                          className={`w-full flex justify-center ${isVisible ? `scroll-fade-in ${delayClass}` : ''}`}
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
                            onAddToCart={() => {}}
                            onProductClick={handleProductClick}
                          />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            </div>
          </div>
    </PageContainer>
  );
};

export default CatalogPage;
