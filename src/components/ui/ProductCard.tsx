import React from 'react';

// Star rating component для карточек товаров
const StarRating: React.FC<{ rating?: number; reviewCount?: number }> = ({ rating = 5, reviewCount }) => (
  <div className="flex items-center gap-1">
    {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill={i < rating ? "#8B5CF6" : "none"}
        stroke={i < rating ? "#8B5CF6" : "rgba(255, 255, 255, 0.4)"}
        strokeWidth="1.5"
      >
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
      </svg>
    ))}
    {reviewCount && (
      <span className="text-white font-manrope font-medium text-sm ml-1">({reviewCount})</span>
    )}
  </div>
);

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

  const handleCardClick = () => {
    if (onProductClick) {
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
        size,
        onAddToCart,
        onProductClick
      });
    }
  };

  // Различные стили для каталога и других страниц
  const cardStyles = size === 'small-catalog'
    ? `relative backdrop-blur-md rounded-2xl p-6 ${classes.container} flex flex-col transition-all duration-300 cursor-pointer group border border-white/10 hover:border-blue-400 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/30`
    : `bg-black/90 backdrop-blur-sm rounded-xl p-6 ${classes.container} flex flex-col border border-white/20 shadow-2xl hover:shadow-white/10 hover:border-white/30 transition-all duration-300 hover:transform hover:scale-105 ${onProductClick ? 'cursor-pointer' : ''}`;

  const catalogBackgroundStyle = size === 'small-catalog' ? {
    background: 'linear-gradient(145deg, rgba(25, 25, 25, 0.92) 0%, rgba(15, 15, 15, 0.96) 100%)',
    backdropFilter: 'blur(24px)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6), 0 8px 16px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  } : {};


  return (
    <div className={cardStyles} style={catalogBackgroundStyle} onClick={handleCardClick}>
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
          <h3 className={`text-white font-manrope font-extrabold ${classes.title} leading-tight tracking-wide`}>
            {title}
          </h3>
          {subtitle && (
            <p className={`text-white/90 font-manrope font-bold ${classes.title} leading-tight mt-1`}>
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
        <StarRating rating={rating} reviewCount={reviewCount} />
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/25 to-transparent my-4"></div>

      {/* Price */}
      <div className="mt-auto">
        <span className={`text-white font-manrope font-extrabold ${classes.price} tracking-wide`}>
          {price}
        </span>
      </div>
    </div>
  );
};

export default ProductCard;