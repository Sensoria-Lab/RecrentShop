import React from 'react';
import { Sparkles, TrendingUp, Star } from 'lucide-react';

export type BadgeType = 'new' | 'bestseller';

interface ProductBadgeProps {
  type: BadgeType;
  className?: string;
}

/**
 * ProductBadge Component  
 * Displays badges on product cards (NEW, BESTSELLER, HIGH RATING)
 */
const ProductBadge: React.FC<ProductBadgeProps> = ({ type, className = '' }) => {
  const badgeConfig = {
    new: {
      label: 'НОВИНКА',
      icon: Sparkles,
      bgClass: 'bg-gradient-to-r from-blue-500 to-purple-600',
      textClass: 'text-white',
      iconColor: 'text-white',
      borderClass: 'border-blue-400/50'
    },
    bestseller: {
      label: 'ХИТ',
      icon: TrendingUp,
      bgClass: 'bg-gradient-to-r from-orange-500 to-red-600',
      textClass: 'text-white',
      iconColor: 'text-white',
      borderClass: 'border-orange-400/50'
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

  
  // Возвращаем максимум 2 бейджа (NEW + один другой, или два других)
  return badges.slice(0, 2);
};

export default ProductBadge;
