import React from 'react';
import StarRating from '../shared/StarRating';
import { useCart } from '../../context/CartContext';
import Img from '../shared/Img';

export interface ProductCardProps {
  id?: number;
  image: string;
  title: string;
  subtitle?: string; // Вторая строка названия (модель/бренд)
  productSize?: string; // Размер товара (XL, L, и т.д.)
  productColor?: string; // Цвет товара (white, black, и т.д.)
  price: string;
  rating?: number;
  reviewCount?: number;
  size?: 'small' | 'medium' | 'large' | 'small-catalog';
  onAddToCart?: () => void;
  onProductClick?: (productData: ProductCardProps) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  image,
  title,
  subtitle,
  productSize,
  productColor,
  price,
  rating = 5,
  reviewCount,
  size = 'medium',
  onAddToCart,
  onProductClick
}) => {
  const { addItem } = useCart();
  
  const sizeClasses = {
    small: {
      container: 'w-full max-w-[330px]',
      image: 'h-[180px] sm:h-[220px] md:h-[280px]',
      imageContainer: 'w-full max-w-[280px]',
      title: 'text-sm sm:text-base md:text-lg',
      price: 'text-base sm:text-lg md:text-xl',
      button: 'px-3 sm:px-4 md:px-6 py-2 text-xs sm:text-sm md:text-base'
    },
    medium: {
      container: 'w-full max-w-[364px]',
      image: 'h-[200px] sm:h-[240px] md:h-[289px]',
      imageContainer: 'w-full',
      title: 'text-sm sm:text-base md:text-lg lg:text-xl',
      price: 'text-base sm:text-lg md:text-xl lg:text-2xl',
      button: 'px-3 sm:px-4 md:px-6 py-2 text-xs sm:text-sm md:text-base'
    },
    large: {
      container: 'w-full max-w-[378px]',
      image: 'h-[240px] sm:h-[300px] md:h-[392px]',
      imageContainer: 'w-full max-w-[328px]',
      title: 'text-sm sm:text-base md:text-lg lg:text-xl',
      price: 'text-base sm:text-lg md:text-xl lg:text-2xl',
      button: 'px-3 sm:px-4 md:px-6 py-2 text-xs sm:text-sm md:text-base'
    },
    'small-catalog': {
      container: 'w-full max-w-[340px]',
      image: 'h-[200px] sm:h-[240px] md:h-[280px]',
      imageContainer: 'w-full max-w-[300px]',
      title: 'text-sm sm:text-base md:text-lg lg:text-xl',
      price: 'text-base sm:text-lg md:text-xl lg:text-2xl',
      button: 'px-3 sm:px-4 md:px-6 py-2 text-xs sm:text-sm md:text-base'
    }
  };

  const classes = sizeClasses[size];

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent card click if clicking add to cart button
    if ((e.target as HTMLElement).closest('.add-to-cart-button')) {
      return;
    }
    
    if (onProductClick) {
      // Pass only serializable data (no functions)
      onProductClick({
        id,
        image,
        title,
        subtitle,
        productSize,
        productColor,
        price,
        rating,
        reviewCount,
        size
      });
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (onAddToCart) {
      onAddToCart();
    }
    
    // Add to cart context
    addItem({
      id: id?.toString() || `${title}-${Date.now()}`,
      image,
      title: subtitle ? `${title} ${subtitle}` : title,
      subtitle: subtitle || '',
      price,
      selectedSize: productSize,
      selectedColor: productColor
    });
  };

  // Различные стили для каталога и других страниц
  const cardStyles = size === 'small-catalog'
    ? `relative overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-5 lg:p-6 ${classes.container} flex flex-col cursor-pointer group`
    : `bg-black/90 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 lg:p-6 ${classes.container} flex flex-col border border-white/20 shadow-2xl hover:shadow-white/10 hover:border-white/30 transition-all duration-300 hover:transform hover:scale-105 ${onProductClick ? 'cursor-pointer' : ''}`;


  return (
    <div className={cardStyles} onClick={handleCardClick}>
      {/* Animated gradient background - only for catalog */}
      {size === 'small-catalog' && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/40 via-zinc-900/60 to-black/80 backdrop-blur-sm border border-white/10 transition-all duration-300 group-hover:border-white/30 pointer-events-none" />
          
          {/* Shine effect on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          </div>
        </>
      )}
      
      {/* Content wrapper with relative positioning */}
      <div className="relative z-10">
        {/* Product Image */}
        <div className={`${classes.image} relative rounded-lg sm:rounded-xl mx-auto ${classes.imageContainer} ${size === 'small-catalog' ? 'bg-white/5 p-3 sm:p-4 transition-all duration-500' : 'rounded-lg overflow-hidden'}`}>
          <Img
            src={image}
            alt={title}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Product Title */}
        <div className="min-h-[60px] sm:min-h-[70px] md:min-h-[80px] lg:min-h-[90px] flex flex-col justify-between mt-2 sm:mt-3">
        <div className="flex-1 flex flex-col justify-start">
          <h3 className={`text-white font-manrope font-extrabold ${classes.title} leading-tight tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]`}>
            {title}
          </h3>
          {subtitle && (
            <p className={`text-white/90 font-manrope font-bold ${classes.title} leading-tight mt-0.5 sm:mt-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]`}>
              {subtitle}
            </p>
          )}
        </div>
        <div className="min-h-[16px] sm:min-h-[18px] md:min-h-[20px] lg:min-h-[22px] flex items-end gap-1.5 sm:gap-2 md:gap-3 flex-wrap text-xs sm:text-sm">
          {productSize && (
            <span className="text-white/80 font-manrope font-medium">
              Размер: {productSize}
            </span>
          )}
          {productColor && (
            <span className="text-white/80 font-manrope font-medium">
              Цвет: {productColor}
            </span>
          )}
        </div>
      </div>

        {/* Rating */}
        <div className="mt-1.5 sm:mt-2 md:mt-3">
          <StarRating rating={rating} reviewCount={reviewCount} size="sm" />
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/25 to-transparent my-2 sm:my-3 md:my-4"></div>

        {/* Price and Add to Cart */}
        <div className="mt-auto flex items-center justify-between gap-2">
          <span className={`text-white font-manrope font-extrabold ${classes.price} tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]`}>
            {price}
          </span>
          <button
            onClick={handleAddToCart}
            className="add-to-cart-button px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold text-xs sm:text-sm rounded-lg transition-all duration-200 shadow-lg hover:shadow-blue-500/50 hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            В корзину
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;