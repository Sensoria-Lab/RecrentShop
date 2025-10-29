import React from 'react';
import StarRating from './StarRating';
import Img from './Img';
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
  // Определяем бейджи для товара
  const badges = getProductBadges({
    rating: rating || 0,
    reviewCount: reviewCount || 0,
    addedDate
  });

  const sizeClasses = {
    small: {
      container: 'w-full max-w-[260px] sm:max-w-[300px] md:max-w-[330px]',
      image: 'h-[140px] sm:h-[170px] md:h-[200px] lg:h-[240px]',
      title: 'text-sm sm:text-sm md:text-base',
      price: 'text-base sm:text-base md:text-lg'
    },
    medium: {
      container: 'w-full max-w-[280px] sm:max-w-[320px] md:max-w-[364px]',
      image: 'h-[160px] sm:h-[190px] md:h-[220px] lg:h-[260px]',
      title: 'text-sm sm:text-sm md:text-base lg:text-lg',
      price: 'text-base sm:text-base md:text-lg lg:text-xl'
    },
    large: {
      container: 'w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px]',
      image: 'h-[180px] sm:h-[220px] md:h-[280px] lg:h-[340px]',
      title: 'text-sm sm:text-sm md:text-base lg:text-lg',
      price: 'text-base sm:text-base md:text-lg lg:text-xl'
    },
    'small-catalog': {
      container: 'w-[260px] sm:w-[300px] md:w-[320px] lg:w-[340px]',
      image: 'h-[200px] sm:h-[240px] md:h-[280px] lg:h-[320px]',
      title: 'text-sm sm:text-sm md:text-base',
      price: 'text-lg sm:text-xl md:text-2xl'
    }
  };

  const classes = sizeClasses[size];
  const containerBase = stretch ? 'w-full' : classes.container;
  const staggerClass = staggerIndex > 0 && staggerIndex <= 8 ? `card-stagger card-stagger-${staggerIndex}` : '';

  const cardStyles = size === 'small-catalog'
    ? `relative rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 ${containerBase} flex flex-col cursor-pointer group bg-black/40 border border-white/20 hover:border-white/40 transition-all duration-300 hover-lift ${staggerClass}`
    : `bg-black/40 rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 ${containerBase} flex flex-col border border-white/20 shadow-2xl hover:shadow-white/10 hover:border-white/40 transition-all duration-300 hover:transform hover:scale-105 hover-lift ${onProductClick ? 'cursor-pointer' : ''} ${staggerClass}`;

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
      'mousepads': 'Коврик для мыши', 'clothing': 'Одежда',
      'Коврики для мыши': 'Коврик для мыши', 'Одежда': 'Одежда',
      'Коврик': 'Коврик для мыши', 'Худи': 'Худи', 'Футболка': 'Футболка', 'Рукав': 'Рукав'
    };

    return categoryMap[category || ''] || category;
  };

  return (
    <div className={cardStyles} onClick={handleCardClick}>
      {size === 'small-catalog' && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden rounded-lg sm:rounded-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        </div>
      )}

      <div className="relative z-10">
        <div className={`${classes.image} rounded-lg sm:rounded-xl mx-auto ${size === 'small-catalog' ? 'bg-white/8 p-2 sm:p-3 transition-all duration-500 overflow-hidden' : 'rounded-lg overflow-hidden'} group/image flex items-center justify-center relative`}>
          <Img src={image} alt={title} className="w-full h-full object-contain object-center rounded-lg sm:rounded-xl" />
        </div>

        {badges.length > 0 && (
          <div className="flex gap-1.5 mb-1">
            {badges.map((badgeType) => (
              <ProductBadge key={badgeType} type={badgeType} />
            ))}
          </div>
        )}

        <div className="min-h-[40px] sm:min-h-[50px] md:min-h-[60px] flex flex-col justify-between mt-1.5 sm:mt-2">
          <div className="flex-1 flex flex-col justify-start">
            <h3 className={`text-white font-manrope font-extrabold ${classes.title} leading-tight tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]`}>
              {subtitle}
            </h3>
            <p className={`text-white/70 font-manrope font-medium ${classes.title} leading-tight mt-0.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]`}>
              {getDisplayCategory()}
            </p>
          </div>
        </div>

        <div className="mt-1 sm:mt-1.5 md:mt-2 lg:mt-3">
          <StarRating rating={rating} reviewCount={reviewCount} size="sm" />
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/25 to-transparent my-1.5 sm:my-2 md:my-3 lg:my-4"></div>

        <div className="mt-auto flex items-center justify-between gap-1.5 sm:gap-2">
          <span className={`text-white font-manrope font-extrabold ${classes.price} tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]`}>
            {price}
          </span>
          <span className="text-green-400 text-sm flex items-center gap-1 font-manrope font-medium">
            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
            в наличии
          </span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductCard);