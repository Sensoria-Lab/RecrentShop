import React from 'react';

interface ProductCardSkeletonProps {
  count?: number;
}

/**
 * ProductCard Skeleton Loader
 * 
 * Показывает placeholder во время загрузки товаров
 * Улучшает perceived performance - пользователь видит, что контент загружается
 * 
 * @param count - Количество skeleton карточек для отображения
 */
export const ProductCardSkeleton: React.FC<ProductCardSkeletonProps> = ({ count = 4 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="relative w-full flex flex-col animate-pulse"
          style={{
            animationDelay: `${index * 100}ms`,
            animationDuration: '1.5s'
          }}
        >
          {/* Image skeleton */}
          <div className="aspect-[4/5] rounded-xl bg-white/10 relative overflow-hidden">
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer-slide" />
          </div>

          {/* Text skeleton */}
          <div className="mt-3 space-y-2">
            <div className="h-4 bg-white/10 rounded w-3/4" />
            <div className="h-3 bg-white/10 rounded w-1/2" />
            <div className="h-5 bg-white/10 rounded w-2/3 mt-3" />
          </div>
        </div>
      ))}
    </>
  );
};

interface CartItemSkeletonProps {
  count?: number;
}

/**
 * Cart Item Skeleton Loader
 */
export const CartItemSkeleton: React.FC<CartItemSkeletonProps> = ({ count = 3 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-white/5 rounded-xl p-3 border border-white/10 animate-pulse"
          style={{
            animationDelay: `${index * 150}ms`,
            animationDuration: '1.5s'
          }}
        >
          <div className="flex gap-3">
            {/* Image */}
            <div className="w-16 h-16 rounded-lg bg-white/10 flex-shrink-0" />
            
            {/* Content */}
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-white/10 rounded w-3/4" />
              <div className="h-3 bg-white/10 rounded w-1/2" />
              <div className="flex justify-between items-center mt-2">
                <div className="h-7 bg-white/10 rounded w-24" />
                <div className="h-4 bg-white/10 rounded w-16" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

interface FilterSkeletonProps {
  count?: number;
}

/**
 * Filter Section Skeleton Loader
 */
export const FilterSkeleton: React.FC<FilterSkeletonProps> = ({ count = 3 }) => {
  return (
    <div className="space-y-6 animate-pulse">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="space-y-3">
          <div className="h-4 bg-white/10 rounded w-1/3" />
          <div className="space-y-2">
            <div className="h-10 bg-white/10 rounded" />
            <div className="h-10 bg-white/10 rounded" />
            <div className="h-10 bg-white/10 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};

/**
 * Page Content Skeleton - Full page loader
 */
export const PageSkeleton: React.FC = () => {
  return (
    <div className="max-w-[1800px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pt-6 sm:pt-8 md:pt-10 pb-12 animate-pulse">
      {/* Title */}
      <div className="text-center mb-8">
        <div className="h-8 bg-white/10 rounded w-48 mx-auto mb-3" />
        <div className="w-24 h-1 bg-white/10 mx-auto" />
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <ProductCardSkeleton count={8} />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
