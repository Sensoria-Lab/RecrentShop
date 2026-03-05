'use client';

import React, { useSyncExternalStore, useRef, useEffect } from 'react';
import Link from 'next/link';
import PageContainer from '@/src/components/layout/PageContainer';
import { CartPageSkeleton } from '@/src/components/layout/Skeletons';
import CartItemCard from '@/src/components/cart/CartItemCard';
import CartSummary from '@/src/components/cart/CartSummary';
import { useCart } from '@/src/context/CartContext';
import { shouldReduceMotion, EASE_EDITORIAL } from '@/src/components/animations';

const CartPage: React.FC = () => {
  const { items, removeItem, updateQuantity, clearCart, getTotalPrice } = useCart();
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  /* ── Entrance animation ─── */
  useEffect(() => {
    const reduceMotion = shouldReduceMotion();
    const elements = [headerRef.current, contentRef.current].filter(Boolean);

    if (!reduceMotion) {
      elements.forEach((el, i) => {
        if (!el) return;
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        requestAnimationFrame(() => {
          setTimeout(() => {
            if (el) {
              el.style.transition = `opacity 0.55s ${EASE_EDITORIAL}, transform 0.55s ${EASE_EDITORIAL}`;
              el.style.opacity = '1';
              el.style.transform = 'translateY(0)';
            }
          }, i * 80);
        });
      });
    } else {
      elements.forEach(el => {
        if (el) { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; }
      });
    }
  }, []);

  const isClient = useSyncExternalStore(
    () => () => { },
    () => true,
    () => false,
  );

  if (!isClient) {
    return (
      <PageContainer>
        <CartPageSkeleton />
      </PageContainer>
    );
  }

  const totalQty = items.reduce((s, i) => s + i.quantity, 0);

  /* ── Empty state ─── */
  if (items.length === 0) {
    return (
      <PageContainer>
        <div className="min-h-[calc(100dvh-84px)] flex flex-col">
          {/* Header strip */}
          <div
            ref={headerRef}
            className="border-b border-[var(--rc-border)] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 py-6 flex items-end justify-between"
            style={{ opacity: 0 }}
          >
            <h1
              className="font-manrope font-black tracking-tight text-[var(--rc-fg)] leading-[0.9]"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)' }}
            >
              Корзина
            </h1>
            <Link
              href="/catalog"
              className="font-jetbrains text-[10px] tracking-[0.2em] uppercase text-[var(--rc-fg-muted)] hover:text-[var(--rc-fg)] transition-colors duration-200 pb-1"
            >
              В каталог →
            </Link>
          </div>

          {/* Empty content */}
          <div ref={contentRef} className="flex-1 flex items-center justify-center px-4 py-20" style={{ opacity: 0 }}>
            <div className="text-center max-w-md">
              {/* Oversize slash decoration */}
              <p className="font-jetbrains text-[10px] tracking-[0.3em] uppercase text-[var(--rc-fg-subtle)] mb-6">
                / Пусто
              </p>

              {/* Icon */}
              <div className="mx-auto mb-8 w-20 h-20 border border-[var(--rc-border)] flex items-center justify-center">
                <svg className="w-9 h-9 text-[var(--rc-fg-subtle)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                  <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>

              <h2
                className="font-manrope font-black text-[var(--rc-fg)] leading-[0.92] tracking-tight mb-4"
                style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
              >
                Корзина пуста
              </h2>
              <p className="font-manrope text-[var(--rc-fg-muted)] text-sm leading-[1.8] mb-10">
                Добавьте товары из каталога,<br />чтобы оформить заказ
              </p>

              <Link
                href="/catalog"
                className="inline-flex items-center gap-3 bg-[var(--rc-fg)] text-[var(--rc-bg)] font-jetbrains text-[10px] tracking-[0.25em] uppercase px-8 py-4 hover:opacity-90 transition-opacity duration-200"
              >
                Перейти в каталог
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="square" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </PageContainer>
    );
  }

  /* ── Filled cart ─── */
  return (
    <PageContainer>
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 pt-8 md:pt-10 pb-28 sm:pb-20">

        {/* ── Page header ──────────────────────────────────────────── */}
        <div
          ref={headerRef}
          className="mb-10 md:mb-14 border-b border-[var(--rc-border)] pb-6"
          style={{ opacity: 0 }}
        >
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <p className="font-jetbrains text-[10px] tracking-[0.3em] uppercase text-[var(--rc-fg-subtle)] mb-2">
                / Корзина
              </p>
              <h1
                className="font-manrope font-black tracking-tight text-[var(--rc-fg)] leading-[0.9]"
                style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)' }}
              >
                Ваш заказ
              </h1>
            </div>

            <div className="flex flex-col items-end gap-1 pb-1">
              <span className="font-jetbrains text-[10px] tracking-[0.2em] uppercase text-[var(--rc-fg-muted)]">
                {totalQty}&nbsp;{totalQty === 1 ? 'позиция' : totalQty < 5 ? 'позиции' : 'позиций'}
              </span>
              <button
                onClick={clearCart}
                className="font-jetbrains text-[9px] tracking-[0.2em] uppercase text-[var(--rc-fg-subtle)] hover:text-[var(--rc-fg-secondary)] transition-colors duration-200"
              >
                Очистить всё
              </button>
            </div>
          </div>
        </div>

        {/* ── Two-column layout ────────────────────────────────────── */}
        <div
          ref={contentRef}
          className="grid grid-cols-1 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_380px] gap-6 lg:gap-12 items-start"
          style={{ opacity: 0 }}
        >
          {/* Left — Items */}
          <div>
            {/* Column headers (desktop) */}
            <div className="hidden md:grid grid-cols-[1fr_auto_auto] gap-6 pb-3 border-b border-[var(--rc-border)] mb-0">
              <span className="font-jetbrains text-[8px] tracking-[0.3em] uppercase text-[var(--rc-fg-subtle)]">Товар</span>
              <span className="font-jetbrains text-[8px] tracking-[0.3em] uppercase text-[var(--rc-fg-subtle)] w-28 text-center">Кол-во</span>
              <span className="font-jetbrains text-[8px] tracking-[0.3em] uppercase text-[var(--rc-fg-subtle)] w-24 text-right">Сумма</span>
            </div>

            {/* Items list */}
            <div className="border border-[var(--rc-border)]">
              {items.map((item, index) => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                  index={index}
                  layout="default"
                />
              ))}
            </div>

            {/* Continue shopping */}
            <div className="mt-5 flex items-center justify-between">
              <Link
                href="/catalog"
                className="font-jetbrains text-[9px] tracking-[0.2em] uppercase text-[var(--rc-fg-muted)] hover:text-[var(--rc-fg)] flex items-center gap-2 transition-colors duration-200"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="square" d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Продолжить покупки
              </Link>
              <span className="font-jetbrains text-[8px] tracking-[0.2em] uppercase text-[var(--rc-fg-subtle)]">
                {items.length}&nbsp;{items.length === 1 ? 'товар' : items.length < 5 ? 'товара' : 'товаров'}
              </span>
            </div>
          </div>

          {/* Right — Summary panel */}
          <div className="lg:sticky lg:top-28">
            <CartSummary
              totalQty={totalQty}
              totalPrice={getTotalPrice}
            />
          </div>
        </div>

      </div>
    </PageContainer>
  );
};

export default CartPage;
