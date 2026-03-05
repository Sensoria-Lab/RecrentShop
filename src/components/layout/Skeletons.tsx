import React from 'react';

/**
 * Skeleton Components for RECRENT
 * 
 * Design System: Industrial Editorial · Monochrome Brutalist
 * - Zero border-radius (sharp corners everywhere)
 * - Colors: var(--rc-fg) at 6-10% opacity
 * - Subtle shimmer animation
 * - Grid-stable layouts (prevents content jumping)
 */

// ─── Shared Skeleton Elements ─────────────────────────────────────────────────

interface SkeletonBlockProps {
  className?: string;
  animate?: boolean;
}

const SkeletonBlock: React.FC<SkeletonBlockProps> = ({
  className = '',
  animate = true
}) => (
  <div
    className={`bg-[var(--rc-fg-subtle)] ${animate ? 'skeleton-pulse' : ''} ${className}`}
    style={{ borderRadius: 0 }}
  />
);

const SkeletonText: React.FC<{ lines?: number; className?: string }> = ({
  lines = 1,
  className = ''
}) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <SkeletonBlock
        key={i}
        className={`h-4 ${i === lines - 1 ? 'w-2/3' : 'w-full'}`}
      />
    ))}
  </div>
);

// ─── Product Card Skeleton ────────────────────────────────────────────────────

interface ProductCardSkeletonProps {
  count?: number;
}

export const ProductCardSkeleton: React.FC<ProductCardSkeletonProps> = ({ count = 4 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="relative w-full flex flex-col"
          style={{ animationDelay: `${index * 80}ms` }}
        >
          {/* Image skeleton — aspect ratio matches ProductCard */}
          <SkeletonBlock className="aspect-[4/5] w-full" />

          {/* Content skeleton */}
          <div className="mt-3 space-y-2">
            {/* Category label */}
            <SkeletonBlock className="h-3 w-16" />
            {/* Title */}
            <SkeletonBlock className="h-5 w-3/4" />
            {/* Subtitle */}
            <SkeletonBlock className="h-3 w-1/2" />
            {/* Price */}
            <div className="flex items-center gap-2 pt-1">
              <SkeletonBlock className="h-6 w-20" />
              <SkeletonBlock className="h-4 w-12" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};



// ─── Product Page Skeleton ────────────────────────────────────────────────────

export const ProductPageSkeleton: React.FC = () => {
  return (
    <div className="max-w-[1800px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pt-6 sm:pt-8 pb-12">
      {/* Breadcrumbs */}
      <div className="mb-6">
        <SkeletonBlock className="h-4 w-64" />
      </div>

      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12">
        {/* Image Gallery Skeleton */}
        <div className="space-y-4">
          {/* Main image */}
          <SkeletonBlock className="aspect-square w-full" />
          {/* Thumbnail row */}
          <div className="flex gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonBlock key={i} className="w-20 h-20 flex-shrink-0" />
            ))}
          </div>
        </div>

        {/* Product Info Skeleton */}
        <div className="space-y-6">
          {/* Title area */}
          <div className="space-y-3">
            <SkeletonBlock className="h-8 w-3/4" />
            <SkeletonBlock className="h-5 w-1/2" />
          </div>

          {/* Rating */}
          <div className="flex items-center gap-3">
            <SkeletonBlock className="h-4 w-24" />
            <SkeletonBlock className="h-4 w-16" />
          </div>

          {/* Price */}
          <div className="py-4 border-y border-[var(--rc-border)]">
            <SkeletonBlock className="h-10 w-32" />
          </div>

          {/* Selectors */}
          <div className="space-y-4">
            <div className="space-y-2">
              <SkeletonBlock className="h-4 w-20" />
              <div className="flex gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <SkeletonBlock key={i} className="w-14 h-10" />
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <SkeletonBlock className="h-4 w-16" />
              <div className="flex gap-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <SkeletonBlock key={i} className="w-16 h-10" />
                ))}
              </div>
            </div>
          </div>

          {/* Quantity + Add to cart */}
          <div className="flex gap-4 pt-4">
            <SkeletonBlock className="w-28 h-12" />
            <SkeletonBlock className="flex-1 h-12" />
          </div>

          {/* Description tabs */}
          <div className="pt-6 space-y-4">
            <div className="flex gap-6 border-b border-[var(--rc-border)] pb-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <SkeletonBlock key={i} className="h-5 w-24" />
              ))}
            </div>
            <SkeletonText lines={4} />
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Cart Page Skeleton ───────────────────────────────────────────────────────

export const CartPageSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 pt-8 md:pt-12 pb-28 sm:pb-20">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-8 md:mb-12 border-b border-[var(--rc-border)] pb-6">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <SkeletonBlock className="h-12 w-48" />
            <SkeletonBlock className="h-5 w-24" />
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-8 lg:gap-12">
          {/* Cart items */}
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="bg-[var(--rc-fg-ghost)] border border-[var(--rc-border)] p-4 flex gap-4"
              >
                <SkeletonBlock className="w-20 h-20 flex-shrink-0" />
                <div className="flex-1 space-y-3">
                  <SkeletonBlock className="h-5 w-3/4" />
                  <SkeletonBlock className="h-4 w-1/3" />
                  <div className="flex items-center justify-between pt-2">
                    <SkeletonBlock className="h-8 w-28" />
                    <SkeletonBlock className="h-6 w-20" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-[var(--rc-fg-ghost)] border border-[var(--rc-border)] p-6 space-y-6">
              <SkeletonBlock className="h-6 w-32" />
              <div className="space-y-3">
                <div className="flex justify-between">
                  <SkeletonBlock className="h-4 w-20" />
                  <SkeletonBlock className="h-4 w-16" />
                </div>
                <div className="flex justify-between">
                  <SkeletonBlock className="h-4 w-24" />
                  <SkeletonBlock className="h-4 w-16" />
                </div>
                <div className="flex justify-between pt-3 border-t border-[var(--rc-border)]">
                  <SkeletonBlock className="h-6 w-16" />
                  <SkeletonBlock className="h-6 w-24" />
                </div>
              </div>
              <SkeletonBlock className="h-12 w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



// ─── Account Page Skeleton ────────────────────────────────────────────────────

export const AccountPageSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 pt-8 md:pt-12 pb-20">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-8 border-b border-[var(--rc-border)] pb-6">
          <SkeletonBlock className="h-10 w-64" />
        </div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-8 lg:gap-12">
          {/* Sidebar */}
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonBlock key={i} className="h-12 w-full" />
            ))}
          </div>

          {/* Content */}
          <div className="space-y-6">
            {/* Profile section */}
            <div className="bg-[var(--rc-fg-ghost)] border border-[var(--rc-border)] p-6 space-y-4">
              <SkeletonBlock className="h-6 w-32" />
              <div className="grid sm:grid-cols-2 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <SkeletonBlock className="h-4 w-20" />
                    <SkeletonBlock className="h-10 w-full" />
                  </div>
                ))}
              </div>
            </div>

            {/* Orders section */}
            <div className="space-y-4">
              {Array.from({ length: 2 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-[var(--rc-fg-ghost)] border border-[var(--rc-border)] p-6 space-y-4"
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <SkeletonBlock className="h-5 w-32" />
                      <SkeletonBlock className="h-4 w-24" />
                    </div>
                    <SkeletonBlock className="h-6 w-20" />
                  </div>
                  <div className="flex gap-4 pt-4 border-t border-[var(--rc-border)]">
                    <SkeletonBlock className="w-16 h-16" />
                    <div className="flex-1 space-y-2">
                      <SkeletonBlock className="h-4 w-3/4" />
                      <SkeletonBlock className="h-4 w-1/2" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Checkout Page Skeleton ───────────────────────────────────────────────────

export const CheckoutPageSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-[var(--rc-bg)]">
      {/* Header */}
      <div className="border-b border-[var(--rc-border)] px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-[1400px] mx-auto h-16 flex items-center">
          <SkeletonBlock className="h-8 w-32" />
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 md:py-12">
        <div className="grid lg:grid-cols-[1fr_420px] gap-8 lg:gap-16">
          {/* Form sections */}
          <div className="space-y-8">
            {/* Contact section */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <SkeletonBlock className="w-8 h-8" />
                <SkeletonBlock className="h-6 w-48" />
              </div>
              <div className="bg-[var(--rc-fg-ghost)] border border-[var(--rc-border)] p-6 space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <SkeletonBlock className="h-4 w-24" />
                    <SkeletonBlock className="h-12 w-full" />
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery section */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <SkeletonBlock className="w-8 h-8" />
                <SkeletonBlock className="h-6 w-48" />
              </div>
              <div className="bg-[var(--rc-fg-ghost)] border border-[var(--rc-border)] p-6 space-y-4">
                <div className="space-y-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <SkeletonBlock key={i} className="h-14 w-full" />
                  ))}
                </div>
                <div className="grid sm:grid-cols-2 gap-4 pt-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="space-y-2">
                      <SkeletonBlock className="h-4 w-20" />
                      <SkeletonBlock className="h-12 w-full" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:sticky lg:top-8 h-fit">
            <div className="bg-[var(--rc-fg-ghost)] border border-[var(--rc-border)] p-6 space-y-6">
              <SkeletonBlock className="h-6 w-40" />

              {/* Cart items */}
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex gap-4">
                    <SkeletonBlock className="w-16 h-16 flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <SkeletonBlock className="h-4 w-full" />
                      <SkeletonBlock className="h-4 w-16" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 pt-4 border-t border-[var(--rc-border)]">
                <div className="flex justify-between">
                  <SkeletonBlock className="h-4 w-20" />
                  <SkeletonBlock className="h-4 w-16" />
                </div>
                <div className="flex justify-between">
                  <SkeletonBlock className="h-4 w-24" />
                  <SkeletonBlock className="h-4 w-16" />
                </div>
                <div className="flex justify-between pt-3 border-t border-[var(--rc-border)]">
                  <SkeletonBlock className="h-6 w-16" />
                  <SkeletonBlock className="h-6 w-24" />
                </div>
              </div>

              <SkeletonBlock className="h-14 w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Support Page Skeleton ────────────────────────────────────────────────────

export const SupportPageSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 pt-8 md:pt-12 pb-20">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-10 border-b border-[var(--rc-border)] pb-6">
          <SkeletonBlock className="h-10 w-64 mb-4" />
          <SkeletonBlock className="h-4 w-96" />
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-8 lg:gap-12">
          {/* FAQ Accordion */}
          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-[var(--rc-fg-ghost)] border border-[var(--rc-border)] p-5"
              >
                <div className="flex items-center gap-4">
                  <SkeletonBlock className="w-8 h-8" />
                  <div className="flex-1 space-y-2">
                    <SkeletonBlock className="h-5 w-3/4" />
                    <SkeletonBlock className="h-3 w-1/2" />
                  </div>
                  <SkeletonBlock className="w-5 h-5" />
                </div>
              </div>
            ))}
          </div>

          {/* Contact sidebar */}
          <div className="space-y-6">
            <div className="bg-[var(--rc-fg-ghost)] border border-[var(--rc-border)] p-6 space-y-4">
              <SkeletonBlock className="h-6 w-32" />
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <SkeletonBlock className="w-10 h-10" />
                    <div className="flex-1 space-y-1">
                      <SkeletonBlock className="h-4 w-24" />
                      <SkeletonBlock className="h-3 w-32" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[var(--rc-fg-ghost)] border border-[var(--rc-border)] p-6 space-y-4">
              <SkeletonBlock className="h-6 w-40" />
              <SkeletonText lines={3} />
              <SkeletonBlock className="h-12 w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};





// ─── Catalog Page Skeleton ───────────────────────────────────────────────────
// Mirrors the exact layout of the catalog page so nothing folds during load

export const CatalogPageSkeleton: React.FC = () => {
  return (
    <div className="max-w-[1800px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 pt-8 md:pt-12 pb-24 sm:pb-12 md:pb-16">
      {/* Section Header */}
      <div className="mb-8 md:mb-10 border-b border-[var(--rc-border)] pb-6 flex items-end justify-between gap-4">
        <SkeletonBlock className="h-12 w-48" />
        <SkeletonBlock className="h-3 w-20" />
      </div>

      <div className="flex flex-col lg:flex-row gap-6 md:gap-10 lg:gap-16">
        {/* Sidebar skeleton — desktop only */}
        <div className="hidden lg:block lg:w-[20rem] xl:w-[22rem] flex-shrink-0">
          <div className="sticky top-28 space-y-0">
            {/* Category label */}
            <div className="mb-6">
              <SkeletonBlock className="h-3 w-24 mb-3" />
              <div className="space-y-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <SkeletonBlock key={i} className="h-9 w-full" />
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-[var(--rc-border)] mb-6" />

            {/* Filter sections */}
            <div className="space-y-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-3">
                  <SkeletonBlock className="h-3 w-20" />
                  <div className="space-y-1.5">
                    {Array.from({ length: 3 }).map((_, j) => (
                      <SkeletonBlock key={j} className="h-8 w-full" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product grid */}
        <div className="flex-1">
          <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 min-h-[600px]">
            <ProductCardSkeleton count={12} />
          </div>
        </div>
      </div>
    </div>
  );
};


