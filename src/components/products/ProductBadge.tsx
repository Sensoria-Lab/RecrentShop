import React, { useEffect, useRef } from 'react';
import { Sparkles, TrendingUp, Star } from 'lucide-react';
import gsap from '@/src/lib/gsap';

export type BadgeType = 'new' | 'bestseller' | 'rating';

interface ProductBadgeProps {
  type: BadgeType;
  rating?: number;
  className?: string;
}

/**
 * ProductBadge Component  
 * Displays badges on product cards (NEW, BESTSELLER, HIGH RATING)
 * Animations powered by GSAP
 */
const ProductBadge: React.FC<ProductBadgeProps> = ({ type, rating, className = '' }) => {
  const badgeRef = useRef<HTMLDivElement>(null);
  const pulseRef = useRef<gsap.core.Tween | null>(null);

  const badgeConfig = {
    new: {
      label: 'НОВИНКА',
      icon: Sparkles,
      bgClass: 'bg-[#EAE2E6]',
      textClass: 'text-[#191516]',
      iconColor: 'text-[#191516]/70',
      borderClass: 'border-[#EAE2E6]'
    },
    bestseller: {
      label: 'ХИТ',
      icon: TrendingUp,
      bgClass: 'bg-[#191516]',
      textClass: 'text-[#EAE2E6]',
      iconColor: 'text-[#EAE2E6]/70',
      borderClass: 'border-[#EAE2E6]/30'
    },
    rating: {
      label: rating ? rating.toFixed(1) : '4.9',
      icon: Star,
      bgClass: 'bg-[#191516]',
      textClass: 'text-[#EAE2E6]',
      iconColor: 'text-[#EAE2E6]/70',
      borderClass: 'border-[#EAE2E6]/20'
    }
  };

  const config = badgeConfig[type];
  const Icon = config.icon;

  const shouldPulse  = type === 'rating';
  const shouldShimmer = type === 'new';

  // Pulse animation for rating badge
  useEffect(() => {
    if (!shouldPulse || !badgeRef.current) return;

    pulseRef.current = gsap.to(badgeRef.current, {
      keyframes: { scale: [1, 1.05, 1] },
      duration: 2,
      repeat: -1,
      ease: 'sine.inOut',
    });

    return () => {
      pulseRef.current?.kill();
    };
  }, [shouldPulse]);

  const handleMouseEnter = () => {
    if (!badgeRef.current) return;
    gsap.to(badgeRef.current, {
      scale: 1.06,
      duration: 0.2,
      ease: 'back.out(1.7)',
      overwrite: 'auto',
    });
  };

  const handleMouseLeave = () => {
    if (!badgeRef.current) return;
    gsap.to(badgeRef.current, {
      scale: 1,
      duration: 0.25,
      ease: 'power3.out',
      overwrite: 'auto',
    });
  };

  return (
    <div
      ref={badgeRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`
        inline-flex items-center gap-1 px-1.5 py-0.5 sm:px-2 sm:py-1
        ${config.bgClass} ${config.textClass}
        border ${config.borderClass}
        font-jetbrains font-bold text-[8px] sm:text-[10px]
        uppercase tracking-wide
        ${className}
        relative overflow-hidden
        ${shouldShimmer ? 'badge-shimmer' : ''}
      `}
      style={{ willChange: 'transform' }}
    >
      {/* Shimmer overlay – driven by CSS animation exported from animations.ts */}
      {shouldShimmer && (
        <style>{`
          @keyframes shimmer {
            from { transform: translateX(-100%); }
            to   { transform: translateX(200%);  }
          }
          .badge-shimmer::after {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%);
            animation: shimmer 1.6s linear infinite;
          }
        `}</style>
      )}

      <span
        className={`inline-flex ${config.iconColor}`}
        style={{ display: 'inline-flex', willChange: 'transform' }}
      >
        <Icon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
      </span>
      <span className="relative z-10">{config.label}</span>
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

  // RATING badge – always shown
  badges.push('rating');

  // NEW badge – items added in the last 30 days
  if (product.addedDate) {
    const addedDate = new Date(product.addedDate);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    if (addedDate >= thirtyDaysAgo) {
      badges.push('new');
    }
  }

  // BESTSELLER badge – high review count
  if (product.reviewCount >= 20) {
    badges.push('bestseller');
  }

  return badges.slice(0, 3);
};

export default ProductBadge;


