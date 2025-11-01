import React from 'react';

interface LoadingSkeletonProps {
  variant?: 'page' | 'product-grid' | 'product-card' | 'filters';
  count?: number;
}

// Базовый скелет элемент с анимацией
const SkeletonItem: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`bg-gradient-to-r from-white/5 via-white/10 to-white/5 rounded animate-pulse ${className}`} />
);

// Скелет для страницы (используется в Suspense fallback)
const PageSkeleton: React.FC = () => (
  <div className="min-h-screen w-full flex items-center justify-center bg-black">
    <div className="flex flex-col gap-8 w-full max-w-6xl px-8">
      {/* Header skeleton */}
      <div className="flex flex-col gap-4">
        <SkeletonItem className="h-12 w-3/4 mx-auto" />
        <SkeletonItem className="h-6 w-1/2 mx-auto" />
      </div>

      {/* Content skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>

      {/* Footer skeleton */}
      <div className="flex flex-col gap-3 mt-8">
        <SkeletonItem className="h-4 w-full" />
        <SkeletonItem className="h-4 w-5/6" />
        <SkeletonItem className="h-4 w-4/6" />
      </div>
    </div>
  </div>
);

// Скелет для карточки товара
const ProductCardSkeleton: React.FC = () => (
  <div className="bg-white/5 rounded-xl p-4 space-y-4">
    {/* Image skeleton */}
    <SkeletonItem className="aspect-square w-full rounded-lg" />

    {/* Title skeleton */}
    <div className="space-y-2">
      <SkeletonItem className="h-5 w-3/4" />
      <SkeletonItem className="h-4 w-1/2" />
    </div>

    {/* Price skeleton */}
    <div className="flex justify-between items-center">
      <SkeletonItem className="h-6 w-20" />
      <SkeletonItem className="h-4 w-16" />
    </div>

    {/* Rating skeleton */}
    <div className="flex items-center gap-2">
      <SkeletonItem className="h-4 w-16" />
      <SkeletonItem className="h-4 w-12" />
    </div>
  </div>
);

// Скелет для сетки товаров
const ProductGridSkeleton: React.FC<{ count?: number }> = ({ count = 12 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {[...Array(count)].map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
);

// Скелет для фильтров
const FiltersSkeleton: React.FC = () => (
  <div className="space-y-6">
    {/* Category filters */}
    <div className="space-y-3">
      <SkeletonItem className="h-5 w-24" />
      <div className="flex gap-2">
        {[...Array(4)].map((_, i) => (
          <SkeletonItem key={i} className="h-8 w-20 rounded-full" />
        ))}
      </div>
    </div>

    {/* Size filters */}
    <div className="space-y-3">
      <SkeletonItem className="h-5 w-16" />
      <div className="grid grid-cols-3 gap-2">
        {[...Array(6)].map((_, i) => (
          <SkeletonItem key={i} className="h-8 w-full rounded" />
        ))}
      </div>
    </div>

    {/* Price range */}
    <div className="space-y-3">
      <SkeletonItem className="h-5 w-20" />
      <SkeletonItem className="h-6 w-full rounded" />
    </div>
  </div>
);

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  variant = 'page',
  count = 12
}) => {
  switch (variant) {
    case 'product-grid':
      return <ProductGridSkeleton count={count} />;
    case 'product-card':
      return <ProductCardSkeleton />;
    case 'filters':
      return <FiltersSkeleton />;
    case 'page':
    default:
      return <PageSkeleton />;
  }
};

export default LoadingSkeleton;
