'use client';
import React, { useState } from 'react';
import ProductCard from '@/src/components/products/ProductCard';
import type { ProductCardProps } from '@/src/components/products/ProductCard';
import { ProductCardSkeleton } from '@/src/components/layout';
import type { Product } from '@/src/types';

interface ProductGridProps {
  products: Product[];
  loading: boolean;
  onProductClick: (productData: ProductCardProps) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  loading,
  onProductClick
}) => {
  const [itemsToShow, setItemsToShow] = useState(12);

  // Load more items
  const loadMoreItems = () => {
    setItemsToShow(prev => prev + 12);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 min-h-[600px]" role="region" aria-label="Загрузка товаров" aria-live="polite">
        <ProductCardSkeleton count={12} />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center min-h-[600px] flex flex-col items-center justify-center gap-4" role="region" aria-label="Результаты поиска товаров">
        <div className="flex items-center gap-3 mb-1">
          <span className="font-jetbrains text-[8px] tracking-[0.35em] uppercase text-[#EAE2E6]/20 select-none">───</span>
          <span className="font-jetbrains text-[9px] tracking-[0.3em] uppercase text-[#EAE2E6]/25">Ничего не найдено</span>
        </div>
        <p className="font-jetbrains text-[10px] tracking-[0.15em] uppercase text-[#EAE2E6]/25 max-w-[28ch] leading-[2]">
          Попробуйте изменить фильтры
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 min-h-[600px] items-start" role="grid" aria-label="Сетка товаров">
        {products.slice(0, itemsToShow).map((product, index) => {
          const cols = 4; // Assuming max 4 columns for animation sequence
          const delay = Math.floor(index / cols) * cols + (index % cols) + 1;
          const delayClass = `content-reveal-delay-${Math.min(delay, 8)}`;

          return (
            <div
              key={product.id}
              className={`content-reveal ${delayClass}`}
            >
              <ProductCard
                id={typeof product.id === 'string' ? parseInt(product.id) : product.id}
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
                stretch={true}
                staggerIndex={Math.min(delay, 8)}
                addedDate={product.addedDate}
                onProductClick={onProductClick}
              />
            </div>
          );
        })}
      </div>

      {/* Load More Button */}
      {itemsToShow < products.length && (
        <div className="mt-10 mb-16 flex justify-center">
          <button
            onClick={loadMoreItems}
            className="text-[#EAE2E6]/50 border border-[#EAE2E6]/15 hover:text-[#EAE2E6] hover:border-[#EAE2E6]/40 font-jetbrains text-[11px] tracking-[0.18em] uppercase px-7 py-4 transition-colors duration-200 flex items-center gap-3 focus:outline-none"
            aria-label="Загрузить больше товаров"
          >
            Загрузить еще
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="square" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
};

export default React.memo(ProductGrid);
