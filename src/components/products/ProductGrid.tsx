'use client';
import React, { useState, useEffect, useRef } from 'react';
import ProductCard from '@/src/components/products/ProductCard';
import type { ProductCardProps } from '@/src/components/products/ProductCard';
import { ProductCardSkeleton } from '@/src/components/layout/Skeletons';
import type { Product } from '@/src/types/product';

interface ProductGridProps {
  products: Product[];
  loading: boolean;
  onProductClick: (productData: ProductCardProps) => void;
}

// Simple intersection observer hook for scroll-triggered animations
const useIntersectionObserver = (options?: IntersectionObserverInit) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        observer.unobserve(element);
      }
    }, { threshold: 0.1, rootMargin: '50px', ...options });

    observer.observe(element);

    return () => observer.disconnect();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps -- options is intentionally excluded: observer fires once then disconnects

  return { ref, isIntersecting };
};

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
      <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 min-h-[600px]" role="region" aria-label="Загрузка товаров" aria-live="polite">
        <ProductCardSkeleton count={12} />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center min-h-[600px] flex flex-col items-center justify-center gap-4" role="region" aria-label="Результаты поиска товаров">
        <div className="flex items-center gap-3 mb-1">
          <span className="font-jetbrains text-[9px] tracking-[0.3em] uppercase text-[var(--rc-fg-subtle)] select-none">/</span>
          <span className="font-jetbrains text-[9px] tracking-[0.3em] uppercase text-[var(--rc-fg-subtle)]">Ничего не найдено</span>
        </div>
        <p className="font-jetbrains text-[10px] tracking-[0.15em] uppercase text-[var(--rc-fg-subtle)] max-w-[28ch] leading-[2]">
          Попробуйте изменить фильтры
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 min-h-[600px] items-start" role="grid" aria-label="Сетка товаров">
        {products.slice(0, itemsToShow).map((product, index) => (
          <ProductGridItem
            key={product.id}
            product={product}
            index={index}
            onProductClick={onProductClick}
          />
        ))}
      </div>

      {/* Load More Button */}
      {itemsToShow < products.length && (
        <div className="mt-10 mb-16 flex justify-center">
          <button
            onClick={loadMoreItems}
            className="text-[var(--rc-fg-secondary)] border border-[var(--rc-border)] hover:text-[var(--rc-fg)] hover:border-[var(--rc-border)] font-jetbrains text-[11px] tracking-[0.18em] uppercase px-7 py-4 transition-colors duration-200 flex items-center gap-3 focus:outline-none"
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

// Separate component for each grid item to use intersection observer
interface ProductGridItemProps {
  product: Product;
  index: number;
  onProductClick: (productData: ProductCardProps) => void;
}

const ProductGridItem: React.FC<ProductGridItemProps> = React.memo(({
  product,
  index,
  onProductClick
}) => {
  const { ref, isIntersecting } = useIntersectionObserver();

  // Calculate stagger delay based on position in grid (max 4 columns)
  const colPosition = index % 4;
  const rowPosition = Math.floor(index / 4);
  const staggerDelay = (rowPosition * 4 + colPosition) * 30; // 30ms increments

  return (
    <div ref={ref} className="product-grid-item">
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
        isVisible={isIntersecting}
        staggerDelay={staggerDelay}
        addedDate={product.addedDate}
        onProductClick={onProductClick}
      />
    </div>
  );
});

ProductGridItem.displayName = 'ProductGridItem';

export default React.memo(ProductGrid);
