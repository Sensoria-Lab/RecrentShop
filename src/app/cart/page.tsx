'use client';
import React, { useSyncExternalStore, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import gsap from '@/src/lib/gsap';
import { PageContainer } from '@/src/components/layout';
import { Button } from '@/src/components/ui';
import Img from '@/src/components/ui/Img';
import { useCart } from '@/src/context/CartContext';

const CartPage: React.FC = () => {
  const router = useRouter();
  const { items, removeItem, updateQuantity, clearCart, getTotalPrice } = useCart();
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(headerRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.55, ease: 'expo.out' });
    }
  }, []);

  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  if (!isClient) return null;

  const totalQty = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <PageContainer>
      <div className="min-h-screen px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 pt-8 md:pt-12 pb-28 sm:pb-20">
        <div className="max-w-[1400px] mx-auto">

          {/* ─── Section Header ─────────────────────────────────────────── */}
          <div
            ref={headerRef}
            className="mb-8 md:mb-12 border-b border-[#EAE2E6]/[0.07] pb-6"
            style={{ opacity: 0 }}
          >
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <h1
                className="font-manrope font-black tracking-tight text-[#EAE2E6] leading-[0.9]"
                style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)' }}
              >
                Моя корзина
              </h1>
              {items.length > 0 && (
                <span className="font-jetbrains text-[10px] tracking-[0.2em] uppercase text-[#EAE2E6]/30">
                  {totalQty}&nbsp;{totalQty === 1 ? 'позиция' : totalQty < 5 ? 'позиции' : 'позиций'}
                </span>
              )}
            </div>
          </div>

          {/* ─── Empty State ─────────────────────────────────────────────── */}
          {items.length === 0 && (
            <div
              className="flex flex-col items-center justify-center py-20 md:py-32"
            >
              <div className="border border-[#EAE2E6]/[0.08] p-12 md:p-20 text-center max-w-sm w-full">
                <div className="mb-8 flex justify-center">
                  <svg
                    className="w-14 h-14 text-[#EAE2E6]/10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={1}
                  >
                    <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <p className="font-jetbrains text-[9px] tracking-[0.3em] uppercase text-[#EAE2E6]/20 mb-4">
                  ─── Пусто
                </p>
                <h2 className="font-manrope font-black text-[#EAE2E6] text-2xl md:text-3xl leading-[0.95] tracking-tight mb-4">
                  Корзина пуста
                </h2>
                <p className="font-manrope text-[#EAE2E6]/40 text-sm leading-[1.75] mb-10">
                  Добавьте товары из каталога,<br />чтобы оформить заказ
                </p>
                <Button onClick={() => router.push('/catalog')} variant="primary" size="lg">
                  Перейти в каталог
                </Button>
              </div>
            </div>
          )}

          {/* ─── Cart With Items ─────────────────────────────────────────── */}
          {items.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_360px] gap-6 md:gap-8 items-start">

              {/* Left — Items List */}
              <div className="border border-[#EAE2E6]/[0.07]">

                {/* Column Headers */}
                <div className="hidden md:grid grid-cols-[1fr_auto_auto] gap-6 px-6 py-3 border-b border-[#EAE2E6]/[0.07] bg-[#EAE2E6]/[0.02]">
                  <span className="font-jetbrains text-[9px] tracking-[0.25em] uppercase text-[#EAE2E6]/25">Товар</span>
                  <span className="font-jetbrains text-[9px] tracking-[0.25em] uppercase text-[#EAE2E6]/25 w-28 text-center">Кол-во</span>
                  <span className="font-jetbrains text-[9px] tracking-[0.25em] uppercase text-[#EAE2E6]/25 w-24 text-right">Цена</span>
                </div>

                {items.map((item) => (
                  <div key={item.id} className="border-b border-[#EAE2E6]/[0.07] last:border-b-0">
                    <div className="p-4 sm:p-5 md:p-6 flex gap-4 md:gap-5">

                      {/* Image */}
                      <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 border border-[#EAE2E6]/[0.08] bg-[#EAE2E6]/[0.02] overflow-hidden">
                        <Img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-contain p-2"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          <h3 className="font-manrope font-bold text-[#EAE2E6] text-base md:text-lg leading-[1.2] mb-1 truncate">
                            {item.title}
                          </h3>
                          {item.subtitle && (
                            <p className="font-manrope text-[#EAE2E6]/45 text-sm mb-1.5 truncate">{item.subtitle}</p>
                          )}
                          <div className="flex flex-wrap gap-x-3 gap-y-0.5">
                            {item.selectedSize && (
                              <span className="font-jetbrains text-[9px] tracking-[0.15em] uppercase text-[#EAE2E6]/30">
                                Размер:&nbsp;{item.selectedSize}
                              </span>
                            )}
                            {item.selectedColor && (
                              <span className="font-jetbrains text-[9px] tracking-[0.15em] uppercase text-[#EAE2E6]/30">
                                Цвет:&nbsp;{item.selectedColor}
                              </span>
                            )}
                            {item.selectedType && (
                              <span className="font-jetbrains text-[9px] tracking-[0.15em] uppercase text-[#EAE2E6]/30">
                                Тип:&nbsp;{item.selectedType}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Controls & Price */}
                        <div className="flex items-center gap-3 mt-4 flex-wrap">

                          {/* Quantity */}
                          <div className="flex items-center border border-[#EAE2E6]/[0.12]">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-9 h-9 flex items-center justify-center text-[#EAE2E6]/40 hover:text-[#EAE2E6] hover:bg-[#EAE2E6]/[0.06] transition-all duration-200 font-jetbrains text-base leading-none"
                              aria-label="Уменьшить"
                            >
                              −
                            </button>
                            <span className="w-9 text-center font-jetbrains text-[11px] tracking-[0.08em] text-[#EAE2E6] select-none border-x border-[#EAE2E6]/[0.12]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-9 h-9 flex items-center justify-center text-[#EAE2E6]/40 hover:text-[#EAE2E6] hover:bg-[#EAE2E6]/[0.06] transition-all duration-200 font-jetbrains text-base leading-none"
                              aria-label="Увеличить"
                            >
                              +
                            </button>
                          </div>

                          {/* Price */}
                          <span className="font-manrope font-black text-[#EAE2E6] text-lg flex-1">
                            {item.price}
                          </span>

                          {/* Remove */}
                          <button
                            onClick={() => removeItem(item.id)}
                            className="w-8 h-8 flex items-center justify-center text-[#EAE2E6]/20 hover:text-[#EAE2E6]/55 transition-colors duration-200"
                            aria-label="Удалить товар"
                          >
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Clear row */}
                <div className="px-4 md:px-6 py-3 bg-[#EAE2E6]/[0.015] border-t border-[#EAE2E6]/[0.05]">
                  <button
                    onClick={clearCart}
                    className="font-jetbrains text-[10px] tracking-[0.2em] uppercase text-[#EAE2E6]/20 hover:text-[#EAE2E6]/50 border-b border-[#EAE2E6]/[0.08] hover:border-[#EAE2E6]/25 pb-0.5 transition-colors duration-200"
                  >
                    Очистить корзину
                  </button>
                </div>
              </div>

              {/* Right — Order Summary */}
              <div className="sticky top-24">
                <div className="border border-[#EAE2E6]/[0.08] bg-[#141112]">

                  {/* Header */}
                  <div className="px-6 py-5 border-b border-[#EAE2E6]/[0.07]">
                    <p className="font-jetbrains text-[9px] tracking-[0.3em] uppercase text-[#EAE2E6]/20 mb-1.5">
                      ─── Итого
                    </p>
                    <h2 className="font-manrope font-black text-[#EAE2E6] text-2xl leading-[0.9] tracking-tight">
                      Ваш заказ
                    </h2>
                  </div>

                  {/* Lines */}
                  <div className="px-6 py-5 space-y-3 border-b border-[#EAE2E6]/[0.07]">
                    <div className="flex items-center justify-between">
                      <span className="font-jetbrains text-[10px] tracking-[0.15em] uppercase text-[#EAE2E6]/35">Позиций</span>
                      <span className="font-jetbrains text-[10px] tracking-[0.08em] text-[#EAE2E6]/55">{totalQty}&nbsp;шт.</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-jetbrains text-[10px] tracking-[0.15em] uppercase text-[#EAE2E6]/35">Доставка</span>
                      <span className="font-jetbrains text-[10px] tracking-[0.08em] text-[#EAE2E6]/35">При оформлении</span>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="px-6 py-5 border-b border-[#EAE2E6]/[0.07]">
                    <div className="flex items-end justify-between gap-4">
                      <span className="font-jetbrains text-[10px] tracking-[0.2em] uppercase text-[#EAE2E6]/40">Сумма</span>
                      <span className="font-manrope font-black text-[#EAE2E6] text-2xl leading-none">
                        {getTotalPrice}&nbsp;₽
                      </span>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="px-6 py-5 space-y-3">
                    <Button
                      onClick={() => router.push('/checkout')}
                      variant="primary"
                      size="lg"
                      fullWidth
                    >
                      Оформить заказ
                    </Button>
                    <Button
                      onClick={() => router.push('/catalog')}
                      variant="outline"
                      size="md"
                      fullWidth
                    >
                      Продолжить покупки
                    </Button>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default CartPage;

