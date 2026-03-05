'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/src/components/ui/Button';

interface CartSummaryProps {
  totalQty: number;
  totalPrice: number | string;
  discount?: number;
  onCheckout?: () => void;
  onContinueShopping?: () => void;
  onClearCart?: () => void;
  variant?: 'default' | 'compact';
}

const CartSummary: React.FC<CartSummaryProps> = ({
  totalQty,
  totalPrice,
  discount = 0,
  onCheckout,
  onContinueShopping,
  onClearCart,
  variant = 'default',
}) => {
  const router = useRouter();
  const subtotal = typeof totalPrice === 'number' ? totalPrice : parseInt(totalPrice.replace(/\s/g, '')) || 0;
  const discountAmount = Math.round(subtotal * (discount / 100));
  const total = subtotal - discountAmount;

  const handleCheckout = () => {
    if (onCheckout) {
      onCheckout();
    } else {
      router.push('/checkout');
    }
  };

  const handleContinueShopping = () => {
    if (onContinueShopping) {
      onContinueShopping();
    } else {
      router.push('/catalog');
    }
  };

  if (variant === 'compact') {
    return (
      <div className="border-t border-[var(--rc-border)]">
        {/* Cost Breakdown */}
        <div className="px-6 py-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="font-jetbrains text-[10px] tracking-[0.15em] uppercase text-[var(--rc-fg-muted)]">
              Товары ({totalQty})
            </span>
            <span className="font-jetbrains text-[11px] tracking-[0.08em] text-[var(--rc-fg-secondary)]">
              {subtotal} ₽
            </span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between items-center">
              <span className="font-jetbrains text-[10px] tracking-[0.15em] uppercase text-[var(--rc-fg-muted)]">
                Скидка
              </span>
              <span className="font-jetbrains text-[11px] tracking-[0.08em] text-[var(--rc-fg-secondary)]">
                −{discountAmount} ₽
              </span>
            </div>
          )}

          <div className="h-px bg-[var(--rc-fg-ghost)]" />

          {/* Total */}
          <div className="flex justify-between items-end">
            <span className="font-manrope font-bold text-[var(--rc-fg)] text-base">
              Итого
            </span>
            <div className="text-right">
              <span className="font-manrope font-black text-[var(--rc-fg)] text-2xl">
                {total} ₽
              </span>
              {discount > 0 && (
                <div className="font-jetbrains text-[10px] tracking-[0.08em] text-[var(--rc-fg-muted)] line-through">
                  {subtotal} ₽
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-6 pb-6 pt-2 space-y-3">
          <Button
            onClick={handleCheckout}
            variant="primary"
            size="lg"
            fullWidth
          >
            Оформить заказ
          </Button>

          {onClearCart && (
            <button
              onClick={onClearCart}
              className="w-full bg-[var(--rc-fg-ghost)] hover:bg-[var(--rc-fg-ghost)] 
                         border border-[var(--rc-border)] hover:border-[var(--rc-border)] 
                         text-[var(--rc-fg-muted)] hover:text-[var(--rc-fg)] 
                         py-3 font-jetbrains text-[11px] tracking-[0.15em] uppercase 
                         transition-all duration-200 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Очистить корзину
            </button>
          )}
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className="sticky top-24">
      <div className="border border-[var(--rc-border)] bg-[var(--rc-bg-deep)]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-[var(--rc-border)]">
          <p className="font-jetbrains text-[9px] tracking-[0.3em] uppercase text-[var(--rc-fg-subtle)] mb-1.5">
            / Итого
          </p>
          <h2 className="font-manrope font-black text-[var(--rc-fg)] text-2xl leading-[0.9] tracking-tight">
            Ваш заказ
          </h2>
        </div>

        {/* Lines */}
        <div className="px-6 py-5 space-y-3 border-b border-[var(--rc-border)]">
          <div className="flex items-center justify-between">
            <span className="font-jetbrains text-[10px] tracking-[0.15em] uppercase text-[var(--rc-fg-muted)]">
              Позиций
            </span>
            <span className="font-jetbrains text-[10px] tracking-[0.08em] text-[var(--rc-fg-secondary)]">
              {totalQty}&nbsp;шт.
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-jetbrains text-[10px] tracking-[0.15em] uppercase text-[var(--rc-fg-muted)]">
              Доставка
            </span>
            <span className="font-jetbrains text-[10px] tracking-[0.08em] text-[var(--rc-fg-muted)]">
              При оформлении
            </span>
          </div>
          {discount > 0 && (
            <div className="flex items-center justify-between">
              <span className="font-jetbrains text-[10px] tracking-[0.15em] uppercase text-[var(--rc-fg-muted)]">
                Скидка
              </span>
              <span className="font-jetbrains text-[10px] tracking-[0.08em] text-[var(--rc-fg-secondary)]">
                −{discountAmount} ₽
              </span>
            </div>
          )}
        </div>

        {/* Total */}
        <div className="px-6 py-5 border-b border-[var(--rc-border)]">
          <div className="flex items-end justify-between gap-4">
            <span className="font-jetbrains text-[10px] tracking-[0.2em] uppercase text-[var(--rc-fg-muted)]">
              Сумма
            </span>
            <span className="font-manrope font-black text-[var(--rc-fg)] text-2xl leading-none">
              {total}&nbsp;₽
            </span>
          </div>
          {discount > 0 && (
            <div className="text-right mt-1">
              <span className="font-jetbrains text-[10px] tracking-[0.08em] text-[var(--rc-fg-muted)] line-through">
                {subtotal} ₽
              </span>
            </div>
          )}
        </div>

        {/* CTAs */}
        <div className="px-6 py-5 space-y-3">
          <Button
            onClick={handleCheckout}
            variant="primary"
            size="lg"
            fullWidth
          >
            Оформить заказ
          </Button>
          <Button
            onClick={handleContinueShopping}
            variant="outline"
            size="md"
            fullWidth
          >
            Продолжить покупки
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
