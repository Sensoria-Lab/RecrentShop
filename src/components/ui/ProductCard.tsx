import React from 'react';
import StarRating from '../shared/StarRating';
import { useCart } from '../../context/CartContext';
import { toast } from 'sonner';
import Img from '../shared/Img';
import { Button } from '../../shared/ui';

export interface ProductCardProps {
  id?: number;
  image: string;
  images?: string[]; // Multiple product images
  title: string;
  subtitle?: string; // Вторая строка названия (модель/бренд)
  productSize?: string; // Размер товара (XL, L, и т.д.)
  productColor?: string; // Цвет товара (white, black, и т.д.)
  price: string;
  priceNumeric?: number;
  rating?: number;
  reviewCount?: number;
  color?: string; // Цвет для логики переключения
  category?: 'mousepads' | 'clothing';
  clothingType?: 'hoodie' | 'tshirt' | 'sleeve';
  size?: 'small' | 'medium' | 'large' | 'small-catalog';
  onAddToCart?: () => void;
  onProductClick?: (productData: ProductCardProps) => void;
  /** Если true — карточка растягивается по высоте родителя и убирает max-width ограничения */
  stretch?: boolean;
  staggerIndex?: number; // Index for stagger animation
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
  onAddToCart,
  onProductClick,
  stretch = false,
  staggerIndex = 0
}) => {
  const { addItem } = useCart();
  
  const sizeClasses = {
    small: {
      container: 'w-full max-w-[260px] sm:max-w-[300px] md:max-w-[330px]',
      image: 'h-[140px] sm:h-[170px] md:h-[200px] lg:h-[240px]',
      imageContainer: 'w-full',
      title: 'text-sm sm:text-sm md:text-base',
      price: 'text-base sm:text-base md:text-lg',
      button: 'px-3 sm:px-3 md:px-4 py-2 sm:py-2 text-xs sm:text-xs min-h-[44px]'
    },
    medium: {
      container: 'w-full max-w-[280px] sm:max-w-[320px] md:max-w-[364px]',
      image: 'h-[160px] sm:h-[190px] md:h-[220px] lg:h-[260px]',
      imageContainer: 'w-full',
      title: 'text-sm sm:text-sm md:text-base lg:text-lg',
      price: 'text-base sm:text-base md:text-lg lg:text-xl',
      button: 'px-3 sm:px-3 md:px-4 py-2 sm:py-2 text-xs sm:text-xs md:text-sm min-h-[44px]'
    },
    large: {
      container: 'w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px]',
      image: 'h-[180px] sm:h-[220px] md:h-[280px] lg:h-[340px]',
      imageContainer: 'w-full',
      title: 'text-sm sm:text-sm md:text-base lg:text-lg',
      price: 'text-base sm:text-base md:text-lg lg:text-xl',
      button: 'px-3 sm:px-3 md:px-4 py-2 sm:py-2 text-xs sm:text-xs md:text-sm min-h-[44px]'
    },
    'small-catalog': {
      container: 'w-[260px] sm:w-[300px] md:w-[320px] lg:w-[340px]',
      image: 'h-[200px] sm:h-[240px] md:h-[280px] lg:h-[320px]',
      imageContainer: 'w-full',
      title: 'text-sm sm:text-sm md:text-base',
      price: 'text-lg sm:text-xl md:text-2xl',
      button: 'px-3 sm:px-3 md:px-4 py-2 sm:py-2 text-xs sm:text-xs min-h-[44px]'
    }
  };

  const classes = sizeClasses[size];

  // Если требуется растянуть карточку, убираем max-width ограничения и позволяем использовать всю ширину
  const containerBase = stretch ? 'w-full' : classes.container;

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
        images,
        title,
        subtitle,
        productSize,
        productColor,
        price,
        priceNumeric,
        rating,
        reviewCount,
        color,
        category,
        clothingType,
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
    
    // Show success toast
    const productName = subtitle ? `${title} ${subtitle}` : title;
    toast.success(`${productName} добавлен в корзину!`, {
      description: `Количество: 1 шт.`,
    });
  };

  // Различные стили для каталога и других страниц
  // Добавляем stagger animation class
  const staggerClass = staggerIndex > 0 && staggerIndex <= 8 ? `card-stagger card-stagger-${staggerIndex}` : '';

  const cardStyles = size === 'small-catalog'
    ? `relative rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 ${containerBase} flex flex-col cursor-pointer group bg-black/40 border border-white/20 hover:border-white/40 transition-all duration-300 hover-lift ${staggerClass}`
    : `bg-black/40 rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 ${containerBase} flex flex-col border border-white/20 shadow-2xl hover:shadow-white/10 hover:border-white/40 transition-all duration-300 hover:transform hover:scale-105 hover-lift ${onProductClick ? 'cursor-pointer' : ''} ${staggerClass}`;


  return (
    <div className={cardStyles} onClick={handleCardClick}>
      {/* Shine effect on hover - only for catalog */}
      {size === 'small-catalog' && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        </div>
      )}
      
      {/* Content wrapper with relative positioning */}
      <div className="relative z-10">
        {/* Product Image - with fixed height to prevent layout shift */}
  <div className={`${classes.image} rounded-lg sm:rounded-xl mx-auto ${classes.imageContainer} ${size === 'small-catalog' ? 'bg-white/8 p-2 sm:p-3 transition-all duration-500 overflow-hidden' : 'rounded-lg overflow-hidden'} group/image flex items-center justify-center`}>
          <Img
            src={image}
            alt={title}
            className="w-full h-full object-contain object-center"
          />
        </div>

        {/* Product Title */}
        <div className="min-h-[40px] sm:min-h-[50px] md:min-h-[60px] flex flex-col justify-between mt-1.5 sm:mt-2">
        <div className="flex-1 flex flex-col justify-start">
          <h3 className={`text-white font-manrope font-extrabold ${classes.title} leading-tight tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]`}>
            {title}
          </h3>
          {subtitle && (
            <p className={`text-white/90 font-manrope font-bold ${classes.title} leading-tight mt-0.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]`}>
              {subtitle}
            </p>
          )}
        </div>
        <div className="min-h-[14px] sm:min-h-[16px] md:min-h-[18px] lg:min-h-[20px] xl:min-h-[22px] flex items-end gap-1 sm:gap-1.5 md:gap-2 flex-wrap text-[10px] sm:text-xs md:text-sm">
          {productSize && category === 'mousepads' && (
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
        <div className="mt-1 sm:mt-1.5 md:mt-2 lg:mt-3">
          <StarRating rating={rating} reviewCount={reviewCount} size="sm" />
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/25 to-transparent my-1.5 sm:my-2 md:my-3 lg:my-4"></div>

        {/* Price and Add to Cart */}
        <div className="mt-auto flex items-center justify-between gap-1.5 sm:gap-2">
          <span className={`text-white font-manrope font-extrabold ${classes.price} tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]`}>
            {price}
          </span>
          <Button
            onClick={handleAddToCart}
            variant="primary"
            size={size === 'small' || size === 'small-catalog' ? 'sm' : 'md'}
            className="add-to-cart-button whitespace-nowrap"
          >
            В корзину
          </Button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductCard);