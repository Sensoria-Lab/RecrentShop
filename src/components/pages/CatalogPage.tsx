import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../ui/ProductCard';
import Header from '../shared/Header';
import { ALL_PRODUCTS } from '../../data/products';
import type { 
  SortOption, 
  CategoryFilter, 
  ColorFilter, 
  SizeFilter, 
  ClothingTypeFilter 
} from '../../types/product';

const CatalogPage: React.FC = () => {
  const navigate = useNavigate();
  
  // Filter states
  const [sortBy, setSortBy] = useState<SortOption>('popularity');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [colorFilter, setColorFilter] = useState<ColorFilter>('all');
  const [sizeFilter, setSizeFilter] = useState<SizeFilter>('all');
  const [clothingTypeFilter, setClothingTypeFilter] = useState<ClothingTypeFilter>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [minRating, setMinRating] = useState<number>(0);

  const handleProductClick = (productData: any) => {
    navigate('/product', { state: { productData } });
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...ALL_PRODUCTS];

    // Apply category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(p => p.category === categoryFilter);
    }

    // Apply color filter
    if (colorFilter !== 'all') {
      filtered = filtered.filter(p => p.color === colorFilter);
    }

    // Apply size filter
    if (sizeFilter !== 'all') {
      filtered = filtered.filter(p => p.productSize === sizeFilter);
    }

    // Apply clothing type filter
    if (clothingTypeFilter !== 'all') {
      filtered = filtered.filter(p => p.clothingType === clothingTypeFilter);
    }

    // Apply price range filter
    filtered = filtered.filter(p => 
      p.priceNumeric >= priceRange[0] && p.priceNumeric <= priceRange[1]
    );

    // Apply rating filter
    filtered = filtered.filter(p => p.rating >= minRating);

    // Apply sorting
    switch (sortBy) {
      case 'popularity':
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case 'price-asc':
        filtered.sort((a, b) => a.priceNumeric - b.priceNumeric);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.priceNumeric - a.priceNumeric);
        break;
      case 'rating':
        filtered.sort((a, b) => {
          if (b.rating === a.rating) return b.reviewCount - a.reviewCount;
          return b.rating - a.rating;
        });
        break;
    }

    return filtered;
  }, [sortBy, categoryFilter, colorFilter, sizeFilter, clothingTypeFilter, priceRange, minRating]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <div className="flex justify-center px-12 py-4 sticky top-0 z-50">
          <div className="max-w-[900px] w-full">
            <Header />
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 px-20 py-12">
          <div className="max-w-[1600px] mx-auto">
            {/* Page Title */}
            <div className="text-center mb-12">
              <h1 className="text-white font-manrope font-bold text-5xl lg:text-6xl mb-6 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                Каталог товаров
              </h1>
              <div className="w-32 h-1 bg-white/40 mx-auto"></div>
            </div>

            <div className="flex gap-8">
              {/* Filters Sidebar */}
              <aside className="w-80 flex-shrink-0">
                <div className="bg-black/40 backdrop-blur rounded-xl p-6 sticky top-28">
                  <h2 className="text-white font-manrope font-bold text-xl mb-6">Фильтры</h2>
                  
                  {/* Sort By */}
                  <div className="mb-6">
                    <label className="text-white/80 font-manrope text-sm mb-2 block">Сортировка</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as SortOption)}
                      className="w-full bg-white/10 text-white border border-white/20 rounded-lg px-4 py-2 font-manrope focus:outline-none focus:border-white/40 transition-colors"
                    >
                      <option value="popularity">По популярности</option>
                      <option value="rating">По рейтингу</option>
                      <option value="price-asc">Цена: по возрастанию</option>
                      <option value="price-desc">Цена: по убыванию</option>
                    </select>
                  </div>

                  {/* Category Filter */}
                  <div className="mb-6">
                    <label className="text-white/80 font-manrope text-sm mb-2 block">Категория</label>
                    <div className="space-y-2">
                      {[
                        { value: 'all', label: 'Все товары' },
                        { value: 'mousepads', label: 'Коврики для мыши' },
                        { value: 'clothing', label: 'Одежда' }
                      ].map(option => (
                        <label key={option.value} className="flex items-center gap-2 cursor-pointer group">
                          <input
                            type="radio"
                            name="category"
                            value={option.value}
                            checked={categoryFilter === option.value}
                            onChange={(e) => setCategoryFilter(e.target.value as CategoryFilter)}
                            className="w-4 h-4 accent-white"
                          />
                          <span className="text-white/70 font-manrope group-hover:text-white transition-colors">
                            {option.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Clothing Type Filter */}
                  {(categoryFilter === 'clothing' || categoryFilter === 'all') && (
                    <div className="mb-6">
                      <label className="text-white/80 font-manrope text-sm mb-2 block">Тип одежды</label>
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
                  <div className="mb-6">
                    <label className="text-white/80 font-manrope text-sm mb-2 block">Цвет</label>
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
                  <div className="mb-6">
                    <label className="text-white/80 font-manrope text-sm mb-2 block">Размер</label>
                    <div className="space-y-2">
                      {[
                        { value: 'all', label: 'Все размеры' },
                        ...(categoryFilter !== 'clothing' ? [
                          { value: 'L', label: 'L (коврики)' },
                          { value: 'XL', label: 'XL (коврики)' }
                        ] : []),
                        ...(categoryFilter !== 'mousepads' ? [
                          { value: 'S', label: 'S (одежда)' },
                          { value: 'M', label: 'M (одежда)' },
                          { value: 'XS', label: 'XS (одежда)' }
                        ] : [])
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
                          <span className="text-white/70 font-manrope group-hover:text-white transition-colors">
                            {option.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="mb-6">
                    <label className="text-white/80 font-manrope text-sm mb-2 block">
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
                  <div className="mb-6">
                    <label className="text-white/80 font-manrope text-sm mb-2 block">Минимальный рейтинг</label>
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
                    }}
                    className="w-full bg-white/10 hover:bg-white/20 text-white font-manrope py-2 rounded-lg transition-colors"
                  >
                    Сбросить фильтры
                  </button>
                </div>
              </aside>

              {/* Products Grid */}
              <div className="flex-1">
                
                
                {filteredProducts.length === 0 ? (
                  <div className="bg-black/40 backdrop-blur rounded-xl p-12 text-center">
                    <p className="text-white/60 font-manrope text-lg">
                      Товары не найдены. Попробуйте изменить фильтры.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        id={product.id}
                        image={product.image}
                        title={product.title}
                        subtitle={product.subtitle}
                        productSize={product.productSize}
                        productColor={product.productColor}
                        price={product.price}
                        rating={product.rating}
                        reviewCount={product.reviewCount}
                        size="medium"
                        onAddToCart={() => {}}
                        onProductClick={handleProductClick}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CatalogPage;
