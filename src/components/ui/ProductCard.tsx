import React from 'react';
import StarRating from '../shared/StarRating';
import { useCart } from '../../context/CartContext';

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
      container: 'w-[330px]',
      image: 'h-[280px]',
      imageContainer: 'w-[280px]',
      title: 'text-lg',
      price: 'text-xl',
      button: 'px-[80px] py-[4px] text-lg'
    },
    medium: {
      container: 'w-[364px]',
      image: 'h-[289px]',
      imageContainer: 'w-full',
      title: 'text-xl',
      price: 'text-2xl',
      button: 'px-[100px] py-[5px] text-xl'
    },
    large: {
      container: 'w-[378px]',
      image: 'h-[392px]',
      imageContainer: 'w-[328px]',
      title: 'text-xl',
      price: 'text-2xl',
      button: 'px-[104px] py-[5px] text-xl'
    },
    'small-catalog': {
      container: 'w-[340px]', // Увеличено для премиум вида
      image: 'h-[290px]', // Увеличено пропорционально
      imageContainer: 'w-[300px]', // Увеличено пропорционально
      title: 'text-xl', // Увеличен размер шрифта
      price: 'text-2xl', // Увеличен размер шрифта
      button: 'px-[95px] py-[6px] text-lg' // Увеличено под новую ширину
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
    ? `relative overflow-hidden rounded-2xl p-6 ${classes.container} flex flex-col cursor-pointer group`
    : `bg-black/90 backdrop-blur-sm rounded-xl p-6 ${classes.container} flex flex-col border border-white/20 shadow-2xl hover:shadow-white/10 hover:border-white/30 transition-all duration-300 hover:transform hover:scale-105 ${onProductClick ? 'cursor-pointer' : ''}`;


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
        <div className={`${classes.image} relative rounded-xl mx-auto ${classes.imageContainer} ${size === 'small-catalog' ? 'bg-white/5 p-4 transition-all duration-500' : 'rounded-lg overflow-hidden'}`}>
          <img
            src={image}
            alt={title}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Product Title */}
        <div className="h-[90px] flex flex-col justify-between mt-4">
        <div className="flex-1 flex flex-col justify-start">
          <h3 className={`text-white font-manrope font-extrabold ${classes.title} leading-tight tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]`}>
            {title}
          </h3>
          {subtitle && (
            <p className={`text-white/90 font-manrope font-bold ${classes.title} leading-tight mt-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]`}>
              {subtitle}
            </p>
          )}
        </div>
        <div className="h-[22px] flex items-end gap-4">
          {productSize && (
            <span className="text-white/80 font-manrope font-medium text-sm">
              Размер: {productSize}
            </span>
          )}
          {productColor && (
            <span className="text-white/80 font-manrope font-medium text-sm">
              Цвет: {productColor}
            </span>
          )}
        </div>
      </div>

        {/* Rating */}
        <div className="mt-3">
          <StarRating rating={rating} reviewCount={reviewCount} size="sm" />
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/25 to-transparent my-4"></div>

        {/* Price and Add to Cart */}
        <div className="mt-auto flex items-center justify-between">
          <span className={`text-white font-manrope font-extrabold ${classes.price} tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]`}>
            {price}
          </span>
          <button
            onClick={handleAddToCart}
            className="add-to-cart-button px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-blue-500/50 hover:scale-105 active:scale-95"
          >
            В корзину
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;