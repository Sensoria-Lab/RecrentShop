'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Img from '@/src/components/ui/Img';

export interface ProductCardProps {
  id?: number;
  image: string;
  images?: string[];
  title: string;
  subtitle?: string;
  productSize?: string;
  productColor?: string;
  price: string;
  priceNumeric?: number;
  rating?: number;
  reviewCount?: number;
  color?: string;
  category?: 'mousepads' | 'clothing';
  clothingType?: 'hoodie' | 'tshirt' | 'sleeve';
  size?: 'small' | 'medium' | 'large' | 'small-catalog';
  onProductClick?: (productData: ProductCardProps) => void;
  stretch?: boolean;
  staggerIndex?: number;
  addedDate?: string;
  // Animation props
  isVisible?: boolean;
  staggerDelay?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  image,
  images,
  title,
  subtitle,
  productSize,
  productColor,
  price,
  priceNumeric,
  rating = 5,
  reviewCount,
  color,
  category,
  clothingType,
  size = 'medium',
  onProductClick,
  stretch = false,
  addedDate,
  isVisible = true,
  staggerDelay = 0,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Format price with spaces
  const formatPrice = (price: string) => {
    return price.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
  };

  // Image handlers
  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  const sizeClasses = {
    small: {
      container: 'w-full max-w-[180px] sm:max-w-[220px] md:max-w-[260px]',
      image: 'aspect-[4/5]',
      title: 'text-xs sm:text-sm',
      subtitle: 'text-sm sm:text-base',
      price: 'text-base sm:text-lg',
      category: 'text-[9px]',
      stock: 'text-[9px]'
    },
    medium: {
      container: 'w-full max-w-[200px] sm:max-w-[280px] md:max-w-[320px]',
      image: 'aspect-[4/5]',
      title: 'text-xs sm:text-sm',
      subtitle: 'text-base sm:text-lg',
      price: 'text-lg sm:text-xl',
      category: 'text-[9px]',
      stock: 'text-[9px]'
    },
    large: {
      container: 'w-full max-w-[240px] sm:max-w-[320px] md:max-w-[380px]',
      image: 'aspect-[4/5]',
      title: 'text-sm sm:text-base',
      subtitle: 'text-lg sm:text-xl md:text-2xl',
      price: 'text-xl sm:text-2xl',
      category: 'text-[10px]',
      stock: 'text-[10px]'
    },
    'small-catalog': {
      container: 'w-full max-w-[180px] sm:max-w-[220px] md:max-w-[280px] lg:max-w-[320px]',
      image: 'aspect-[4/5]',
      title: 'text-xs sm:text-sm md:text-base',
      subtitle: 'text-sm sm:text-base md:text-lg',
      price: 'text-lg sm:text-xl md:text-2xl',
      category: 'text-[9px] sm:text-[10px]',
      stock: 'text-[9px] sm:text-[10px]'
    }
  };

  const classes = sizeClasses[size];
  const containerBase = stretch ? 'w-full' : classes.container;

  // Animation class based on visibility
  const animationClass = isVisible
    ? 'product-card-animate'
    : 'product-card-hidden';

  const cardStyles = size === 'small-catalog'
    ? `relative ${containerBase} flex flex-col cursor-pointer group ${animationClass} focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--rc-fg)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--rc-bg)]`
    : `${containerBase} flex flex-col ${onProductClick ? 'cursor-pointer' : ''} ${animationClass} focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--rc-fg)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--rc-bg)] group focus-visible:ring-1`;

  const handleCardClick = (e: React.MouseEvent) => {
    if (onProductClick) {
      onProductClick({
        id, image, images, title, subtitle, productSize, productColor,
        price, priceNumeric, rating, reviewCount, color, category, clothingType, size
      });
    }
  };

  const productHref = `/product/${id || 'view'}`;

  const CardWrapper = ({ children }: { children: React.ReactNode }) => {
    if (onProductClick || id) {
      return (
        <Link
          href={productHref}
          className={cardStyles}
          onClick={handleCardClick}
          style={{
            '--stagger-delay': `${staggerDelay}ms`,
            contain: 'layout style paint',
          } as React.CSSProperties}
          role="article"
          aria-label={`${title}, ${price}`}
        >
          {children}
        </Link>
      );
    }
    return (
      <div
        className={cardStyles}
        style={{
          '--stagger-delay': `${staggerDelay}ms`,
          contain: 'layout style paint',
        } as React.CSSProperties}
        role="article"
        aria-label={`${title}, ${price}`}
      >
        {children}
      </div>
    );
  };

  const getDisplayCategory = () => {
    if (category === 'clothing' && clothingType) {
      const typeMap: Record<string, string> = {
        'hoodie': 'Худи', 'tshirt': 'Футболка', 'sleeve': 'Рукав'
      };
      return typeMap[clothingType] || clothingType;
    }

    const categoryMap: Record<string, string> = {
      'mousepads': 'Коврик', 'clothing': 'Одежда'
    };

    return categoryMap[category || ''] || category;
  };

  return (
    <CardWrapper>
      <div className="relative">
        <div
          className={`${classes.image} overflow-hidden relative ring-1 ring-black/20 bg-[var(--rc-bg-deep)]`}
        >
          {/* Shimmer loading effect */}
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--rc-fg-ghost)] via-[var(--rc-fg-subtle)] to-[var(--rc-fg-ghost)] animate-pulse" />
          )}

          <Img
            src={image}
            alt={title}
            className={`w-full h-full object-cover object-center transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform group-hover:scale-[1.035] ${imageLoaded ? 'opacity-100' : 'opacity-60 blur-sm'}`}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />

          {/* Subtle dark scrim on hover */}
          <div
            className="absolute inset-0 bg-black pointer-events-none opacity-0 group-hover:opacity-[0.18] transition-opacity duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
            aria-hidden
          />

          {/* Error state */}
          {imageError && (
            <div className="absolute inset-0 flex items-center justify-center bg-[var(--rc-bg-deep)]">
              <div className="w-10 h-10 bg-[var(--rc-fg-ghost)] border border-[var(--rc-border)] flex items-center justify-center">
                <svg className="w-5 h-5 text-[var(--rc-fg-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          )}

          {/* ─── CORNER LINES ANIMATION — AT THE VERY CORNERS ─────────────────────────── */}
          {/* Top-left corner */}
          <div className="absolute top-0 left-0 z-20 w-8 h-8 pointer-events-none overflow-visible" aria-hidden>
            <div
              className="absolute top-0 left-0 h-px bg-[var(--rc-bg-invert)]/80 origin-left w-0 group-hover:w-[28px] transition-[width] duration-[320ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-0"
            />
            <div
              className="absolute top-0 left-0 w-px bg-[var(--rc-bg-invert)]/80 origin-top h-0 group-hover:h-[28px] transition-[height] duration-[320ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-[50ms]"
            />
          </div>

          {/* Top-right corner */}
          <div className="absolute top-0 right-0 z-20 w-8 h-8 pointer-events-none overflow-visible" aria-hidden>
            <div
              className="absolute top-0 right-0 h-px bg-[var(--rc-bg-invert)]/80 origin-right w-0 group-hover:w-[28px] transition-[width] duration-[320ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-[40ms]"
            />
            <div
              className="absolute top-0 right-0 w-px bg-[var(--rc-bg-invert)]/80 origin-top h-0 group-hover:h-[28px] transition-[height] duration-[320ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-[90ms]"
            />
          </div>

          {/* Bottom-left corner */}
          <div className="absolute bottom-0 left-0 z-20 w-8 h-8 pointer-events-none overflow-visible" aria-hidden>
            <div
              className="absolute bottom-0 left-0 h-px bg-[var(--rc-bg-invert)]/80 origin-left w-0 group-hover:w-[28px] transition-[width] duration-[320ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-[80ms]"
            />
            <div
              className="absolute bottom-0 left-0 w-px bg-[var(--rc-bg-invert)]/80 origin-bottom h-0 group-hover:h-[28px] transition-[height] duration-[320ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-[130ms]"
            />
          </div>

          {/* Bottom-right corner */}
          <div className="absolute bottom-0 right-0 z-20 w-8 h-8 pointer-events-none overflow-visible" aria-hidden>
            <div
              className="absolute bottom-0 right-0 h-px bg-[var(--rc-bg-invert)]/80 origin-right w-0 group-hover:w-[28px] transition-[width] duration-[320ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-[120ms]"
            />
            <div
              className="absolute bottom-0 right-0 w-px bg-[var(--rc-bg-invert)]/80 origin-bottom h-0 group-hover:h-[28px] transition-[height] duration-[320ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-[170ms]"
            />
          </div>

          {/* View button - clip-path wipe reveal on hover */}
          <div
            className="absolute inset-0 z-15 flex items-center justify-center pointer-events-none"
            aria-hidden
          >
            <div
              className="[clip-path:inset(100%_0_0_0)] group-hover:[clip-path:inset(0_0_0_0)] transition-[clip-path] duration-[250ms] ease-[cubic-bezier(0.55,0,1,0.45)] group-hover:duration-[380ms] group-hover:ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:delay-[60ms]"
            >
              <div className="bg-[var(--rc-bg)] border border-[var(--rc-border-strong)] px-7 py-2.5 shadow-xl">
                <span className="font-jetbrains text-[10px] tracking-[0.3em] uppercase text-[var(--rc-fg)] font-medium">
                  Смотреть
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Content area — restructured for better readability ────────────────────────── */}
      <div className="flex flex-col bg-[var(--rc-bg-elevated)] border border-t-0 border-[var(--rc-border)]">
        {/* Content padding container */}
        <div className="p-3 sm:p-4">
          {/* Category + Stock row */}
          <div className="flex items-center justify-between mb-2">
            <span
              className={`font-jetbrains ${classes.category} tracking-[0.25em] uppercase text-[var(--rc-fg-muted)]`}
            >
              {getDisplayCategory()}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className={`font-jetbrains ${classes.stock} tracking-[0.15em] uppercase text-[var(--rc-fg-secondary)]`}>
                В наличии
              </span>
            </span>
          </div>

          {/* Product title */}
          <h3
            className={`font-manrope font-bold ${classes.subtitle} leading-[1.25] tracking-[-0.01em] text-[var(--rc-fg)] mb-3`}
          >
            {subtitle}
          </h3>

          {/* Price row */}
          <div className="flex items-center justify-between pt-2 border-t border-[var(--rc-border)]">
            <span
              className={`font-manrope font-black ${classes.price} tracking-tight tabular-nums text-[var(--rc-fg)]`}
            >
              {formatPrice(price)}
            </span>

            {/* Rating display */}
            {rating > 0 && (
              <div className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5 text-[var(--rc-fg-secondary)]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-jetbrains text-[10px] text-[var(--rc-fg-secondary)]">
                  {rating.toFixed(1)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </CardWrapper>
  );
};

export default ProductCard;
