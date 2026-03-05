'use client';

import React, { useState, useRef, useEffect } from 'react';
import { CartItem } from '@/src/context/CartContext';
import Img from '@/src/components/ui/Img';
import { shouldReduceMotion } from '@/src/components/animations';
import { hapticLight, hapticWarning } from '@/src/lib/haptic';

interface CartItemCardProps {
  item: CartItem;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  layout?: 'default' | 'compact';
  index?: number;
}

const CartItemCard: React.FC<CartItemCardProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
  layout = 'default',
  index = 0,
}) => {
  const [isRemoving, setIsRemoving] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);
  const reduceMotion = shouldReduceMotion();

  // Entrance animation
  useEffect(() => {
    if (!reduceMotion && itemRef.current) {
      const delay = index * 0.08;
      itemRef.current.style.opacity = '0';
      itemRef.current.style.transform = 'translateY(16px)';

      const timer = setTimeout(() => {
        if (itemRef.current) {
          itemRef.current.style.transition = 'opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1), transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)';
          itemRef.current.style.opacity = '1';
          itemRef.current.style.transform = 'translateY(0)';
        }
      }, delay * 1000);

      return () => clearTimeout(timer);
    } else if (itemRef.current) {
      itemRef.current.style.opacity = '1';
    }
  }, [index, reduceMotion]);

  const handleDecrease = () => {
    if (item.quantity > 1) {
      hapticLight();
      onUpdateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleIncrease = () => {
    hapticLight();
    onUpdateQuantity(item.id, item.quantity + 1);
  };

  const handleRemove = async () => {
    hapticWarning();
    setIsRemoving(true);

    if (itemRef.current && !reduceMotion) {
      itemRef.current.style.transition = 'opacity 0.25s ease-in, transform 0.25s ease-in';
      itemRef.current.style.opacity = '0';
      itemRef.current.style.transform = 'translateX(-30px)';
    }

    // Wait for exit animation
    await new Promise(resolve => setTimeout(resolve, 250));
    onRemove(item.id);
  };

  if (layout === 'compact') {
    return (
      <div
        ref={itemRef}
        className={`group relative bg-[var(--rc-fg-ghost)] hover:bg-[var(--rc-fg-ghost)] 
                   border border-[var(--rc-border)] hover:border-[var(--rc-border)] 
                   transition-all duration-200
                   ${isRemoving ? 'pointer-events-none' : ''}`}
      >
        <div className="relative flex gap-3 p-3">
          {/* Product Image */}
          <div className="relative flex-shrink-0 w-16 h-16 overflow-hidden 
                          bg-[var(--rc-fg-ghost)] border border-[var(--rc-border)]">
            <Img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            {/* Quantity Badge on Image */}
            {item.quantity > 1 && (
              <div className="absolute top-1 right-1 bg-[var(--rc-bg-invert)] text-[var(--rc-bg-invert)] 
                              font-jetbrains text-[9px] tracking-[0.1em] px-1.5 py-0.5">
                ×{item.quantity}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex-1 min-w-0 flex flex-col justify-between">
            {/* Row 1: Title + Price */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-manrope font-bold text-[var(--rc-fg)] text-sm leading-tight truncate">
                  {item.title}
                </h3>
                {/* Attributes inline */}
                <div className="flex items-center gap-1.5 mt-0.5">
                  {item.selectedSize && (
                    <span className="font-jetbrains text-[9px] tracking-[0.15em] uppercase text-[var(--rc-fg-muted)]">
                      {item.selectedSize}
                    </span>
                  )}
                  {item.selectedSize && item.selectedColor && (
                    <span className="text-[var(--rc-fg-subtle)]">•</span>
                  )}
                  {item.selectedColor && (
                    <span className="font-jetbrains text-[9px] tracking-[0.15em] uppercase text-[var(--rc-fg-muted)]">
                      {item.selectedColor}
                    </span>
                  )}
                </div>
              </div>
              {/* Price */}
              <div className="text-right flex-shrink-0">
                <span className="font-manrope font-black text-[var(--rc-fg)] text-base">
                  {item.price}
                </span>
              </div>
            </div>

            {/* Row 2: Quantity Controls + Delete */}
            <div className="flex items-center justify-between gap-2 mt-2">
              {/* Quantity Stepper */}
              <div className="flex items-center border border-[var(--rc-fg)]/[0.12]">
                <button
                  onClick={handleDecrease}
                  disabled={item.quantity <= 1}
                  className="w-7 h-7 flex items-center justify-center 
                             text-[var(--rc-fg-muted)] hover:text-[var(--rc-fg)] 
                             hover:bg-[var(--rc-fg-ghost)] 
                             transition-all duration-200
                             disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Уменьшить количество"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <span className="w-8 text-center font-jetbrains text-[11px] tracking-[0.08em] text-[var(--rc-fg)] 
                                 border-x border-[var(--rc-fg)]/[0.12]">
                  {item.quantity}
                </span>
                <button
                  onClick={handleIncrease}
                  className="w-7 h-7 flex items-center justify-center 
                             text-[var(--rc-fg-muted)] hover:text-[var(--rc-fg)] 
                             hover:bg-[var(--rc-fg-ghost)] 
                             transition-all duration-200"
                  aria-label="Увеличить количество"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>

              {/* Delete Button */}
              <button
                onClick={handleRemove}
                className="w-8 h-8 flex items-center justify-center 
                           bg-[var(--rc-fg-ghost)] hover:bg-[var(--rc-fg)]/[0.10] 
                           border border-[var(--rc-border)] hover:border-[var(--rc-border)] 
                           text-[var(--rc-fg-muted)] hover:text-[var(--rc-fg)] 
                           transition-all duration-200"
                aria-label="Удалить товар"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default layout (full cart page)
  return (
    <div
      ref={itemRef}
      className={`border-b border-[var(--rc-border)] last:border-b-0
                  ${isRemoving ? 'pointer-events-none' : ''}`}
    >
      <div className="p-4 sm:p-5 md:p-6 flex gap-4 md:gap-5">
        {/* Product Image */}
        <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 
                        border border-[var(--rc-border)] bg-[var(--rc-fg-ghost)] overflow-hidden">
          <Img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-contain p-2"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            <h3 className="font-manrope font-bold text-[var(--rc-fg)] text-base md:text-lg leading-[1.2] mb-1 truncate">
              {item.title}
            </h3>
            {item.subtitle && (
              <p className="font-manrope text-[var(--rc-fg-muted)] text-sm mb-1.5 truncate">
                {item.subtitle}
              </p>
            )}
            {/* Attributes */}
            <div className="flex flex-wrap gap-x-3 gap-y-0.5">
              {item.selectedSize && (
                <span className="font-jetbrains text-[9px] tracking-[0.15em] uppercase text-[var(--rc-fg-muted)]">
                  Размер:&nbsp;{item.selectedSize}
                </span>
              )}
              {item.selectedColor && (
                <span className="font-jetbrains text-[9px] tracking-[0.15em] uppercase text-[var(--rc-fg-muted)]">
                  Цвет:&nbsp;{item.selectedColor}
                </span>
              )}
              {item.selectedType && (
                <span className="font-jetbrains text-[9px] tracking-[0.15em] uppercase text-[var(--rc-fg-muted)]">
                  Тип:&nbsp;{item.selectedType}
                </span>
              )}
            </div>
          </div>

          {/* Controls & Price */}
          <div className="flex items-center gap-3 mt-4 flex-wrap">
            {/* Quantity Stepper */}
            <div className="flex items-center border border-[var(--rc-fg)]/[0.12]">
              <button
                onClick={handleDecrease}
                disabled={item.quantity <= 1}
                className="w-9 h-9 flex items-center justify-center 
                           text-[var(--rc-fg-muted)] hover:text-[var(--rc-fg)] 
                           hover:bg-[var(--rc-fg-ghost)] 
                           transition-all duration-200 font-jetbrains text-base leading-none
                           disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Уменьшить"
              >
                −
              </button>
              <span className="w-9 text-center font-jetbrains text-[11px] tracking-[0.08em] text-[var(--rc-fg)] 
                               select-none border-x border-[var(--rc-fg)]/[0.12]">
                {item.quantity}
              </span>
              <button
                onClick={handleIncrease}
                className="w-9 h-9 flex items-center justify-center 
                           text-[var(--rc-fg-muted)] hover:text-[var(--rc-fg)] 
                           hover:bg-[var(--rc-fg-ghost)] 
                           transition-all duration-200 font-jetbrains text-base leading-none"
                aria-label="Увеличить"
              >
                +
              </button>
            </div>

            {/* Price */}
            <span className="font-manrope font-black text-[var(--rc-fg)] text-lg flex-1">
              {item.price}
            </span>

            {/* Remove Button */}
            <button
              onClick={handleRemove}
              className="w-8 h-8 flex items-center justify-center 
                         text-[var(--rc-fg-subtle)] hover:text-[var(--rc-fg-secondary)] 
                         transition-colors duration-200"
              aria-label="Удалить товар"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
