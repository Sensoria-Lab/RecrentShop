import React, { useRef, useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { ProductCardSkeleton } from '../../../shared/components';
import type { Product } from '../types';

interface ProductGridProps {
  products: Product[];
  loading: boolean;
  onProductClick: (productData: any) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  loading,
  onProductClick
}) => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(() => {
    // Initialize with all items visible if IntersectionObserver is not available
    if (typeof window !== 'undefined' && window.IntersectionObserver) {
      return new Set();
    }
    return new Set(products.map((_, index) => index));
  });
  const [itemsToShow, setItemsToShow] = useState(12);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Setup Intersection Observer for scroll animations
  useEffect(() => {
    if (typeof window !== 'undefined' && window.IntersectionObserver) {
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
    } else {
      // Fallback: make all items visible immediately
      setVisibleItems(new Set(products.map((_, index) => index)));
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [products]);

  // Reset visible items when products change
  useEffect(() => {
    if (typeof window !== 'undefined' && window.IntersectionObserver) {
      setVisibleItems(new Set());
    } else {
      setVisibleItems(new Set(products.map((_, index) => index)));
    }
    setItemsToShow(12);
  }, [products]);

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
      <div className="text-center min-h-[600px] flex items-center justify-center" role="region" aria-label="Результаты поиска товаров">
        <p className="text-white/60 font-manrope text-sm sm:text-base md:text-lg">
          Товары не найдены. Попробуйте изменить фильтры.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 min-h-[600px] justify-items-center items-start" role="grid" aria-label="Сетка товаров">
        {products.slice(0, itemsToShow).map((product, index) => {
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
                category={product.category as any}
                clothingType={product.clothingType as any}
                size="medium"
                stretch={false}
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
        <div className="mt-8 mb-16 flex justify-center">
          <button
            onClick={loadMoreItems}
            className="bg-white/10 hover:bg-white/20 border border-white/30 hover:border-white/50 text-white font-manrope font-semibold px-8 py-3 rounded-lg transition-all duration-300 flex items-center gap-2 group"
            aria-label="Загрузить больше товаров"
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
  );
};

export default React.memo(ProductGrid);