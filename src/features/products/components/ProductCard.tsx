import React from 'react';
import Img from '../../../shared/ui/Img';
import ProductBadge, { getProductBadges } from './ProductBadge';

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
  category?: 'mousepads' | 'clothing' | 'Коврики для мыши' | 'Одежда' | 'Коврик' | 'Худи' | 'Футболка' | 'Рукав';
  clothingType?: 'hoodie' | 'tshirt' | 'sleeve' | 'худи' | 'футболка' | 'рукав';
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
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);

  // Определяем бейджи для товара
  const badges = getProductBadges({
    rating: rating || 0,
    reviewCount: reviewCount || 0,
    addedDate
  });

  // Форматирование цены
  const formatPrice = (price: string) => {
    return price.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
  };

  // Обработчики для изображений
  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setImageLoaded(true);
  };
  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  const sizeClasses = {
    small: {
      container: 'w-full max-w-[400px] sm:max-w-[450px] md:max-w-[500px]',
      image: 'aspect-[4/5] rounded-lg sm:rounded-xl',
      title: 'text-xs sm:text-xs md:text-sm',
      subtitle: 'text-sm sm:text-sm md:text-base',
      price: 'text-base sm:text-base md:text-lg'
    },
    medium: {
      container: 'w-full',
      image: 'aspect-[4/5] rounded-lg sm:rounded-xl',
      title: 'text-xs sm:text-xs md:text-sm',
      subtitle: 'text-sm sm:text-sm md:text-base',
      price: 'text-lg sm:text-lg md:text-xl'
    },
    large: {
      container: 'w-full max-w-[440px] sm:max-w-[490px] md:max-w-[540px]',
      image: 'aspect-[4/5] rounded-lg sm:rounded-xl',
      title: 'text-xs sm:text-xs md:text-sm lg:text-base',
      subtitle: 'text-sm sm:text-sm md:text-base lg:text-lg',
      price: 'text-base sm:text-base md:text-lg lg:text-xl'
    },
    'small-catalog': {
      container: 'w-full',
      image: 'aspect-[4/5] rounded-lg sm:rounded-xl',
      title: 'text-xs sm:text-xs md:text-sm',
      subtitle: 'text-sm sm:text-sm md:text-base',
      price: 'text-lg sm:text-xl md:text-2xl'
    }
  };

  const classes = sizeClasses[size];
  const containerBase = stretch ? 'w-full' : classes.container;
  const staggerClass = staggerIndex > 0 && staggerIndex <= 8
    ? `animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both card-stagger card-stagger-${staggerIndex}`
    : 'animate-in fade-in duration-300';

  const cardStyles = size === 'small-catalog'
    ? `relative ${containerBase} flex flex-col cursor-pointer group ${staggerClass} transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-2xl hover:shadow-white/10`
    : `${containerBase} flex flex-col ${onProductClick ? 'cursor-pointer' : ''} ${staggerClass} transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-2xl hover:shadow-white/10`;

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
    if ((category === 'clothing' || category === 'Одежда') && clothingType) {
      const typeMap: Record<string, string> = {
        'hoodie': 'Худи', 'tshirt': 'Футболка', 'sleeve': 'Рукав',
        'худи': 'Худи', 'футболка': 'Футболка', 'рукав': 'Рукав'
      };
      return typeMap[clothingType] || clothingType;
    }

    const categoryMap: Record<string, string> = {
      'mousepads': 'Коврик', 'clothing': 'Одежда',
      'Коврики для мыши': 'Коврик', 'Одежда': 'Одежда',
      'Коврик': 'Коврик', 'Худи': 'Худи', 'Футболка': 'Футболка', 'Рукав': 'Рукав'
    };

    return categoryMap[category || ''] || category;
  };

  return (
    <div className={cardStyles} onClick={handleCardClick}>
      <div className="relative">
        <div className={`${classes.image} overflow-hidden group/image relative shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] rounded-lg sm:rounded-xl transition-all duration-300 hover:shadow-[inset_0_4px_8px_rgba(0,0,0,0.2)]`}>
          {/* Shimmer loading effect */}
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-white/10 animate-pulse rounded-lg sm:rounded-xl" />
          )}

          <Img
            src={image}
            alt={title}
            className={`w-full h-full object-cover object-center transition-all duration-500 group-hover:scale-110 ${
              imageLoaded
                ? 'opacity-100 filter-none scale-100'
                : 'opacity-70 blur-sm scale-105'
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />

          {/* Error state - more subtle */}
          {imageError && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg sm:rounded-xl backdrop-blur-sm">
              <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          )}

          {/* Badges positioned over image */}
          {badges.length > 0 && (
            <div className="absolute top-2 left-2 flex flex-row gap-1">
              {badges.map((badgeType) => (
                <ProductBadge 
                  key={badgeType} 
                  type={badgeType} 
                  rating={badgeType === 'rating' ? rating : undefined}
                />
              ))}
            </div>
          )}

          {/* Text overlay on image with stronger bottom darkening */}
          <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-4 bg-gradient-to-t from-black/95 via-black/70 to-transparent rounded-b-lg sm:rounded-b-xl transition-all duration-300 group-hover:from-black/90 group-hover:via-black/60">
            <div className="min-h-[36px] sm:min-h-[40px] md:min-h-[44px] lg:min-h-[48px] max-h-[48px] flex flex-col justify-start gap-0 overflow-hidden">
                <div className="flex-1 flex flex-col justify-start gap-0">
                  <h3 className={`text-white font-manrope font-extrabold ${classes.subtitle} leading-tight tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] line-clamp-2 group-hover:text-white/95 transition-colors duration-300`}>
                    {subtitle}
                  </h3>
                  <p className={`text-white/70 font-manrope font-medium ${classes.title} leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] line-clamp-1 group-hover:text-white/80 transition-colors duration-300`}>
                    {getDisplayCategory()}
                  </p>
                </div>
              </div>

              <div className="w-full h-px bg-gradient-to-r from-transparent via-white/25 to-transparent mt-1 sm:mt-1.5 md:mt-2 mb-1 sm:mb-1.5 md:mb-2 relative group-hover:via-white/40 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              <div className="flex items-center justify-between gap-1 sm:gap-1.5">
                <span className={`text-white font-manrope font-extrabold ${classes.price} tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] tabular-nums group-hover:text-white/95 transition-colors duration-300`}>
                  {formatPrice(price)}
                </span>
                <span className="text-green-400 text-xs sm:text-sm flex items-center gap-1 font-manrope font-medium shrink-0 group-hover:text-green-300 transition-colors duration-300 hover:text-green-200">
                  <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-green-400 rounded-full animate-pulse group-hover:animate-none group-hover:bg-green-300 transition-all duration-300 hover:bg-green-200"></span>
                  в наличии
                </span>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductCard);