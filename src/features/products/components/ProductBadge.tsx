import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, TrendingUp, Star } from 'lucide-react';
import { badgePulseVariants, badgeShimmerVariants, iconVariants } from '../animations';

export type BadgeType = 'new' | 'bestseller' | 'rating';

interface ProductBadgeProps {
  type: BadgeType;
  rating?: number;
  className?: string;
}

/**
 * ProductBadge Component  
 * Displays badges on product cards (NEW, BESTSELLER, HIGH RATING)
 */
const ProductBadge: React.FC<ProductBadgeProps> = ({ type, rating, className = '' }) => {
  const badgeConfig = {
    new: {
      label: 'НОВИНКА',
      icon: Sparkles,
      bgClass: 'bg-gradient-to-r from-slate-600 to-slate-700',
      textClass: 'text-white',
      iconColor: 'text-white',
      borderClass: 'border-slate-500/50'
    },
    bestseller: {
      label: 'ХИТ',
      icon: TrendingUp,
      bgClass: 'bg-gradient-to-r from-zinc-600 to-zinc-700',
      textClass: 'text-white',
      iconColor: 'text-white',
      borderClass: 'border-zinc-500/50'
    },
    rating: {
      label: rating ? rating.toFixed(1) : '4.9',
      icon: Star,
      bgClass: 'bg-gradient-to-r from-amber-700 to-amber-800',
      textClass: 'text-white',
      iconColor: 'text-white',
      borderClass: 'border-amber-600/50'
    }
  };

  const config = badgeConfig[type];
  const Icon = config.icon;

  // Анимация зависит от типа бейджа
  const shouldPulse = type === 'rating'; // Пульсация для рейтинга
  const shouldShimmer = type === 'new' || type === 'bestseller'; // Shimmer для новинок/хитов

  return (
    <motion.div
      className={`
        inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md
        ${config.bgClass} ${config.textClass}
        border ${config.borderClass}
        shadow-lg
        font-manrope font-bold text-[10px] sm:text-xs
        uppercase tracking-wide
        ${className}
        relative overflow-hidden
      `}
      variants={shouldPulse ? badgePulseVariants : undefined}
      initial="initial"
      animate={shouldPulse ? "pulse" : "initial"}
      whileHover={{
        scale: 1.05,
        transition: {
          type: 'spring',
          stiffness: 400,
          damping: 10,
        },
      }}
      style={{
        willChange: 'transform',
      }}
    >
      {/* Shimmer overlay для NEW и BESTSELLER */}
      {shouldShimmer && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          style={{
            width: '200%',
            left: '-100%',
          }}
          variants={badgeShimmerVariants}
          initial="initial"
          animate="animate"
        />
      )}
      
      <motion.div
        variants={iconVariants}
        initial="initial"
        whileHover="hover"
        style={{
          display: 'inline-flex',
          willChange: 'transform',
        }}
      >
        <Icon className={`w-3 h-3 ${config.iconColor}`} />
      </motion.div>
      <span className="relative z-10">{config.label}</span>
    </motion.div>
  );
};

/**
 * Helper function to determine which badges a product should display
 */
export const getProductBadges = (product: {
  rating: number;
  reviewCount: number;
  addedDate?: string;
}): BadgeType[] => {
  const badges: BadgeType[] = [];
  
  // RATING badge - всегда показываем рейтинг для всех товаров
  badges.push('rating');
  
  // NEW badge - товары добавленные за последние 30 дней
  if (product.addedDate) {
    const addedDate = new Date(product.addedDate);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    if (addedDate >= thirtyDaysAgo) {
      badges.push('new');
    }
  }
  
  // BESTSELLER badge - товары с большим количеством отзывов (топ 20%)
  if (product.reviewCount >= 20) {
    badges.push('bestseller');
  }

  
  // Возвращаем максимум 3 бейджа (RATING + другие)
  return badges.slice(0, 3);
};

export default ProductBadge;
