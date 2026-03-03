'use client';
import React, { useState } from 'react';
import ProductBadge, { getProductBadges } from '@/src/components/products/ProductBadge';
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
  staggerIndex = 0,
  addedDate
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Определяем бейджи для товара
  const badges = getProductBadges({
    rating: rating || 0,
    reviewCount: reviewCount || 0,
    addedDate
  });

  // Hover handlers
  const handleMouseEnterCard = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  // Форматирование цены
  const formatPrice = (price: string) => {
    return price.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
  };

  // Обработчики для изображений
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
      subtitle: 'text-xs sm:text-sm',
      price: 'text-sm sm:text-base'
    },
    medium: {
      container: 'w-full max-w-[200px] sm:max-w-[280px] md:max-w-[320px]',
      image: 'aspect-[4/5]',
      title: 'text-xs sm:text-sm',
      subtitle: 'text-sm sm:text-base',
      price: 'text-base sm:text-lg'
    },
    large: {
      container: 'w-full max-w-[240px] sm:max-w-[320px] md:max-w-[380px]',
      image: 'aspect-[4/5]',
      title: 'text-sm sm:text-base',
      subtitle: 'text-sm sm:text-base md:text-lg',
      price: 'text-base sm:text-lg md:text-xl'
    },
    'small-catalog': {
      container: 'w-full max-w-[180px] sm:max-w-[220px] md:max-w-[280px] lg:max-w-[320px]',
      image: 'aspect-[4/5]',
      title: 'text-xs sm:text-sm md:text-base',
      subtitle: 'text-xs sm:text-sm',
      price: 'text-base sm:text-lg md:text-xl'
    }
  };

  const classes = sizeClasses[size];
  const containerBase = stretch ? 'w-full' : classes.container;
  const staggerClass = staggerIndex > 0 && staggerIndex <= 8
    ? `animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both card-stagger card-stagger-${staggerIndex}`
    : 'animate-in fade-in duration-300';

  // Optimized: Removed CSS transitions - now using Framer Motion for better performance
  const cardStyles = size === 'small-catalog'
    ? `relative ${containerBase} flex flex-col cursor-pointer group ${staggerClass}`
    : `${containerBase} flex flex-col ${onProductClick ? 'cursor-pointer' : ''} ${staggerClass}`;

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.add-to-cart-button')) return;

    if (onProductClick) {
      onProductClick({
        id, image, images, title, subtitle, productSize, productColor,
        price, priceNumeric, rating, reviewCount, color, category, clothingType, size
      });
    }
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
    <div
      className={cardStyles}
      onClick={handleCardClick}
      onMouseEnter={handleMouseEnterCard}
      onMouseLeave={handleMouseLeave}
      style={{
        transition: 'opacity 0.2s ease',
      }}
    >
      <div className="relative">
        <div
          className={`${classes.image} overflow-hidden relative`}
          style={{
            boxShadow: isHovered
              ? '0 22px 52px rgba(0,0,0,0.55), 0 0 0 1px rgba(234,226,230,0.18)'
              : '0 4px 14px rgba(0,0,0,0.22), 0 0 0 1px rgba(0,0,0,0.3)',
            transition: 'box-shadow 0.48s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Light-sweep shimmer on hover */}
          <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden" aria-hidden>
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '45%',
                height: '100%',
                background: 'linear-gradient(108deg, transparent 30%, rgba(234,226,230,0.11) 50%, transparent 70%)',
                transform: isHovered ? 'translateX(280%)' : 'translateX(-160%)',
                transition: isHovered
                  ? 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.04s'
                  : 'none',
              }}
            />
          </div>

          {/* Corner targeting brackets */}
          {/* TL */}
          <div className="absolute top-0 left-0 z-20 pointer-events-none" aria-hidden>
            <div style={{ position: 'absolute', top: 0, left: 0, height: 2, width: isHovered ? 16 : 0, background: '#EAE2E6', opacity: 0.8, transition: 'width 0.32s cubic-bezier(0.16, 1, 0.3, 1)' }} />
            <div style={{ position: 'absolute', top: 0, left: 0, width: 2, height: isHovered ? 16 : 0, background: '#EAE2E6', opacity: 0.8, transition: 'height 0.32s cubic-bezier(0.16, 1, 0.3, 1)' }} />
          </div>
          {/* TR */}
          <div className="absolute top-0 right-0 z-20 pointer-events-none" aria-hidden>
            <div style={{ position: 'absolute', top: 0, right: 0, height: 2, width: isHovered ? 16 : 0, background: '#EAE2E6', opacity: 0.8, transition: 'width 0.32s cubic-bezier(0.16, 1, 0.3, 1)' }} />
            <div style={{ position: 'absolute', top: 0, right: 0, width: 2, height: isHovered ? 16 : 0, background: '#EAE2E6', opacity: 0.8, transition: 'height 0.32s cubic-bezier(0.16, 1, 0.3, 1)' }} />
          </div>
          {/* BR */}
          <div className="absolute bottom-0 right-0 z-20 pointer-events-none" aria-hidden>
            <div style={{ position: 'absolute', bottom: 0, right: 0, height: 2, width: isHovered ? 16 : 0, background: '#EAE2E6', opacity: 0.8, transition: 'width 0.32s cubic-bezier(0.16, 1, 0.3, 1)' }} />
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: 2, height: isHovered ? 16 : 0, background: '#EAE2E6', opacity: 0.8, transition: 'height 0.32s cubic-bezier(0.16, 1, 0.3, 1)' }} />
          </div>
          {/* BL */}
          <div className="absolute bottom-0 left-0 z-20 pointer-events-none" aria-hidden>
            <div style={{ position: 'absolute', bottom: 0, left: 0, height: 2, width: isHovered ? 16 : 0, background: '#EAE2E6', opacity: 0.8, transition: 'width 0.32s cubic-bezier(0.16, 1, 0.3, 1)' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: 2, height: isHovered ? 16 : 0, background: '#EAE2E6', opacity: 0.8, transition: 'height 0.32s cubic-bezier(0.16, 1, 0.3, 1)' }} />
          </div>

          {/* Shimmer loading effect */}
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-gradient-to-r from-[#EAE2E6]/[0.05] via-[#EAE2E6]/[0.10] to-[#EAE2E6]/[0.05] animate-pulse" />
          )}

          <Img
            src={image}
            alt={title}
            className={`w-full h-full object-cover object-center ${imageLoaded ? 'opacity-100 filter-none' : 'opacity-70 blur-sm'}`}
            style={{
              filter: isHovered ? 'brightness(1.07)' : 'brightness(1)',
              transform: isHovered ? 'scale(1.04)' : 'scale(1)',
              transition: 'filter 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              willChange: 'transform, filter',
            }}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />

          {/* Error state */}
          {imageError && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#141112]">
              <div className="w-8 h-8 bg-[#EAE2E6]/[0.07] border border-[#EAE2E6]/10 flex items-center justify-center">
                <svg className="w-4 h-4 text-[#EAE2E6]/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          )}

          {/* Hover CTA overlay — centered pill button */}
          <div
            className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center"
            aria-hidden
          >
            <div
              style={{
                opacity: isHovered ? 1 : 0,
                transform: isHovered ? 'translateY(0) scale(1)' : 'translateY(6px) scale(0.94)',
                transition: 'opacity 0.3s ease, transform 0.35s cubic-bezier(0.16,1,0.3,1)',
                background: 'rgba(25,21,22,0.72)',
                backdropFilter: 'blur(6px)',
                border: '1px solid rgba(234,226,230,0.2)',
                padding: '7px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span className="font-jetbrains text-[9px] tracking-[0.25em] uppercase text-[#EAE2E6]/80">Открыть</span>
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="rgba(234,226,230,0.7)" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* Badges positioned over image */}
          {badges.length > 0 && (
            <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 flex flex-row gap-0.5 sm:gap-1">
              {badges.map((badgeType) => (
                <ProductBadge
                  key={badgeType}
                  type={badgeType}
                  rating={badgeType === 'rating' ? rating : undefined}
                />
              ))}
            </div>
          )}

          {/* Text overlay on image — removed, content is now below */}
        </div>
      </div>

      {/* ── Content area — below image ────────────────────────── */}
      <div className="flex flex-col">
        {/* Top border — brightens on hover */}
        <div
          style={{
            height: 1,
            background: isHovered
              ? 'rgba(234,226,230,0.20)'
              : 'rgba(234,226,230,0.07)',
            transition: 'background 0.4s ease',
          }}
        />

        <div className="pt-2.5 pb-0 flex flex-col gap-1">
          {/* Category label — JetBrains Mono index style */}
          <p className="font-jetbrains text-[9px] tracking-[0.28em] uppercase leading-none"
            style={{
              color: isHovered ? 'rgba(234,226,230,0.45)' : 'rgba(234,226,230,0.28)',
              transition: 'color 0.3s ease',
            }}
          >
            ─── {getDisplayCategory()}
          </p>

          {/* Product title */}
          <h3
            className={`font-manrope font-extrabold ${classes.subtitle} leading-[1.18] tracking-tight line-clamp-2`}
            style={{
              color: isHovered ? '#EAE2E6' : 'rgba(234,226,230,0.88)',
              transition: 'color 0.3s ease',
            }}
          >
            {subtitle}
          </h3>

          {/* Divider */}
          <div
            className="mt-1.5 mb-1.5"
            style={{
              height: 1,
              background: isHovered
                ? 'linear-gradient(to right, rgba(234,226,230,0.18), rgba(234,226,230,0.06))'
                : 'linear-gradient(to right, rgba(234,226,230,0.07), transparent)',
              transition: 'background 0.4s ease',
            }}
          />

          {/* Price + stock row */}
          <div className="flex items-center justify-between gap-2">
            <span className={`font-manrope font-black ${classes.price} tracking-tight tabular-nums text-[#EAE2E6]`}>
              {formatPrice(price)}
            </span>

            <span className="flex items-center gap-1.5 shrink-0">
              <span
                className="w-1 h-1"
                style={{
                  background: isHovered ? 'rgba(234,226,230,0.75)' : 'rgba(234,226,230,0.25)',
                  transition: 'background 0.25s ease',
                }}
              />
              <span
                className="font-jetbrains text-[8px] tracking-[0.18em] uppercase"
                style={{
                  color: isHovered ? 'rgba(234,226,230,0.55)' : 'rgba(234,226,230,0.25)',
                  transition: 'color 0.25s ease',
                }}
              >
                в наличии
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductCard);
