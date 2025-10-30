import React from 'react';
import { Sparkles, TrendingUp, Star } from 'lucide-react';

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

  return (
    <div
      className={`
        inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md
        ${config.bgClass} ${config.textClass}
        border ${config.borderClass}
        shadow-lg
        font-manrope font-bold text-[10px] sm:text-xs
        uppercase tracking-wide
        ${className}
      `}
    >
      <Icon className={`w-3 h-3 ${config.iconColor}`} />
      <span>{config.label}</span>
    </div>
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
