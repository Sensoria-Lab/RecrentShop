import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import Img from '../../../shared/ui/Img';
import ProductBadge, { getProductBadges } from './ProductBadge';
import { 
  cardVariants, 
  imageVariants, 
  overlayVariants,
  priceVariants,
  SPRING_CONFIG,
  calculateMagneticOffset 
} from '../animations';

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
  
  // Refs for magnetic effect
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  
  // Motion values for magnetic cursor tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring animations for smooth magnetic movement - extra soft for gentler effect
  const springConfig = { stiffness: 80, damping: 20, mass: 1 };
  const imageX = useSpring(mouseX, springConfig);
  const imageY = useSpring(mouseY, springConfig);

  // Определяем бейджи для товара
  const badges = getProductBadges({
    rating: rating || 0,
    reviewCount: reviewCount || 0,
    addedDate
  });
  
  // Magnetic effect handler - reduced strength for subtlety
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !isHovered) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const relativeX = e.clientX - rect.left;
    const relativeY = e.clientY - rect.top;
    
    // Reduced strength from 0.15 to 0.08 for more subtle effect
    const offset = calculateMagneticOffset(relativeX, relativeY, rect, 0.08);
    mouseX.set(offset.x);
    mouseY.set(offset.y);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

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
    <motion.div
      ref={cardRef}
      className={cardStyles}
      onClick={handleCardClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover="hover"
      whileTap="tap"
      style={{
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
    >
      <motion.div 
        className="relative"
        style={{
          x: imageX,
          y: imageY,
        }}
      >
        <motion.div 
          className={`${classes.image} overflow-hidden group/image relative shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] rounded-lg sm:rounded-xl`}
          animate={{
            boxShadow: isHovered 
              ? 'inset 0 3px 6px rgba(0,0,0,0.15), 0 0 24px rgba(255,255,255,0.12), 0 12px 32px rgba(0,0,0,0.2)'
              : 'inset 0 2px 4px rgba(0,0,0,0.1)',
          }}
          transition={{
            duration: 0.4,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {/* Shimmer loading effect */}
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-white/10 animate-pulse rounded-lg sm:rounded-xl" />
          )}

          <motion.img
            ref={imageRef}
            src={image}
            alt={title}
            className={`w-full h-full object-cover object-center ${
              imageLoaded
                ? 'opacity-100 filter-none'
                : 'opacity-70 blur-sm'
            }`}
            variants={imageVariants}
            initial="initial"
            animate={isHovered ? "hover" : "initial"}
            style={{
              filter: isHovered ? 'brightness(1.08) contrast(1.03)' : 'brightness(1) contrast(1)',
              transition: 'filter 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              willChange: 'transform, filter',
            }}
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
          <motion.div 
            className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-4 bg-gradient-to-t from-black/95 via-black/70 to-transparent rounded-b-lg sm:rounded-b-xl"
            variants={overlayVariants}
            initial="initial"
            animate={isHovered ? "hover" : "initial"}
            style={{
              background: isHovered 
                ? 'linear-gradient(to top, rgba(0,0,0,0.88), rgba(0,0,0,0.55), transparent)'
                : 'linear-gradient(to top, rgba(0,0,0,0.95), rgba(0,0,0,0.7), transparent)',
              transition: 'background 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <div className="min-h-[36px] sm:min-h-[40px] md:min-h-[44px] lg:min-h-[48px] max-h-[48px] flex flex-col justify-start gap-0 overflow-hidden">
                <div className="flex-1 flex flex-col justify-start gap-0">
                  <motion.h3 
                    className={`text-white font-manrope font-extrabold ${classes.subtitle} leading-tight tracking-wide line-clamp-2`}
                    style={{
                      filter: isHovered 
                        ? 'drop-shadow(0 4px 12px rgba(255,255,255,0.5))' 
                        : 'drop-shadow(0 2px 8px rgba(0,0,0,0.8))',
                      transition: 'filter 0.3s ease-out',
                    }}
                  >
                    {subtitle}
                  </motion.h3>
                  <motion.p 
                    className={`text-white/70 font-manrope font-medium ${classes.title} leading-tight line-clamp-1`}
                    style={{
                      color: isHovered ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.7)',
                      filter: isHovered 
                        ? 'drop-shadow(0 4px 12px rgba(255,255,255,0.3))' 
                        : 'drop-shadow(0 2px 8px rgba(0,0,0,0.8))',
                      transition: 'color 0.3s ease-out, filter 0.3s ease-out',
                    }}
                  >
                    {getDisplayCategory()}
                  </motion.p>
                </div>
              </div>

              <motion.div 
                className="w-full h-px bg-gradient-to-r from-transparent to-transparent mt-1 sm:mt-1.5 md:mt-2 mb-1 sm:mb-1.5 md:mb-2 relative"
                animate={{
                  background: isHovered 
                    ? 'linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent)'
                    : 'linear-gradient(to right, transparent, rgba(255,255,255,0.22), transparent)',
                }}
                transition={{
                  duration: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{
                    opacity: isHovered ? 0.8 : 0,
                  }}
                  transition={{
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
              </motion.div>

              <div className="flex items-center justify-between gap-1 sm:gap-1.5">
                <motion.span 
                  className={`text-white font-manrope font-extrabold ${classes.price} tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] tabular-nums`}
                  variants={priceVariants}
                  initial="initial"
                  animate={isHovered ? "highlight" : "initial"}
                  style={{
                    filter: isHovered ? 'drop-shadow(0 4px 12px rgba(255,255,255,0.5))' : 'drop-shadow(0 2px 8px rgba(0,0,0,0.8))',
                    transition: 'filter 0.3s ease-out',
                  }}
                >
                  {formatPrice(price)}
                </motion.span>
                <motion.span 
                  className="text-xs sm:text-sm flex items-center gap-1 font-manrope font-medium shrink-0"
                  style={{
                    color: isHovered ? 'rgb(134, 239, 172)' : 'rgb(74, 222, 128)',
                    filter: isHovered ? 'drop-shadow(0 2px 8px rgba(0,255,0,0.5))' : 'none',
                    transition: 'color 0.3s ease-out, filter 0.3s ease-out',
                  }}
                >
                  <motion.span 
                    className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-green-400 rounded-full"
                    animate={{
                      scale: [1, 1.3, 1],
                      boxShadow: isHovered 
                        ? ['0 0 0px rgba(0,255,0,0.8)', '0 0 8px rgba(0,255,0,0.8)', '0 0 0px rgba(0,255,0,0.8)']
                        : '0 0 0px rgba(0,255,0,0)',
                    }}
                    transition={{
                      type: 'tween',
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                  в наличии
                </motion.span>
              </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default React.memo(ProductCard);