'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart, CartItem } from '@/src/context';
import gsap from '@/src/lib/gsap';
import { hapticLight, hapticWarning } from '@/src/lib/haptic';
import Img from '@/src/components/ui/Img';

interface CartSidebarProps {
  isCartOpen: boolean;
  toggleCart: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isCartOpen, toggleCart }) => {
  const { items: cartItems, getTotalPrice, clearCart, removeItem, updateQuantity } = useCart();
  const router = useRouter();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const [removingItemId, setRemovingItemId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  // GSAP – animate sidebar and backdrop on open/close
  useEffect(() => {
    const sidebar = sidebarRef.current;
    const backdrop = backdropRef.current;
    if (!sidebar || !backdrop) return;

    if (isCartOpen) {
      gsap.set([sidebar, backdrop], { visibility: 'visible' });
      gsap.to(backdrop, { opacity: 1, pointerEvents: 'auto', duration: 0.3, ease: 'power3.out' });
      gsap.to(sidebar, { x: '0%', duration: 0.45, ease: 'expo.out' });

      // Focus first focusable element
      const firstFocusable = sidebar.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as HTMLElement;
      setTimeout(() => firstFocusable?.focus(), 50);

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') toggleCart();
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    } else {
      gsap.to(backdrop, {
        opacity: 0, pointerEvents: 'none', duration: 0.25,
        onComplete: () => { gsap.set(backdrop, { visibility: 'hidden' }); },
      });
      gsap.to(sidebar, {
        x: '100%', duration: 0.35, ease: 'power3.in',
        onComplete: () => { gsap.set(sidebar, { visibility: 'hidden' }); },
      });
    }
  }, [isCartOpen, toggleCart]);

  const handleRemoveItem = async (itemId: string) => {
    hapticWarning(); // Haptic feedback for deletion
    setRemovingItemId(itemId);
    // Даём анимации время проиграть
    await new Promise(resolve => setTimeout(resolve, 300));
    removeItem(itemId);
    setRemovingItemId(null);
  };

  const handleIncreaseQuantity = (item: CartItem) => {
    hapticLight(); // Subtle haptic on quantity change
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecreaseQuantity = (item: CartItem) => {
    if (item.quantity > 1) {
      hapticLight(); // Subtle haptic on quantity change
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const subtotal = getTotalPrice;
  const discount = Math.round(subtotal * 0); // Скидка 0% (можно настроить)
  const total = subtotal - discount;

  return (
    <>
      {/* Backdrop – always mounted, GSAP controls visibility/opacity */}
      <div
        ref={backdropRef}
        className="fixed inset-0 z-40 bg-black/70 backdrop-blur-md"
        onClick={toggleCart}
        style={{ visibility: 'hidden', opacity: 0, pointerEvents: 'none' }}
      />

      {/* Sidebar – always mounted, slides in/out via GSAP */}
      <div
        ref={sidebarRef}
        className="fixed top-0 right-0 h-full w-full sm:w-[440px] md:w-[480px] lg:w-[520px] bg-[#191516] shadow-2xl z-50 border-l border-[#EAE2E6]/[0.07] flex flex-col"
        role="dialog"
        aria-labelledby="cart-title"
        aria-hidden={!isCartOpen}
        style={{ transform: 'translateX(100%)', visibility: 'hidden' }}
      >
        {/* Заголовок */}
        <header className="relative p-6 border-b border-white/10">
          <div className="flex justify-between items-center">
            <div>
              <h2 id="cart-title" className="text-2xl font-manrope font-black text-[#EAE2E6] tracking-[-0.02em]">
                Корзина
              </h2>
              <p className="text-sm text-white/50 mt-1">
                {!mounted || cartItems.length === 0
                  ? 'Пусто'
                  : `${cartItems.length} ${cartItems.length === 1 ? 'товар' : cartItems.length < 5 ? 'товара' : 'товаров'}`
                }
              </p>
            </div>
            <button
              onClick={toggleCart}
              className="w-10 h-10 flex items-center justify-center bg-[#EAE2E6]/[0.05] hover:bg-[#EAE2E6]/10 border border-[#EAE2E6]/10 text-[#EAE2E6]/50 hover:text-[#EAE2E6] transition-all duration-200 focus:outline-none"
              aria-label="Закрыть корзину"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </header>

        {/* Список товаров с улучшенным скроллом */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-4 py-4">
          {cartItems.length > 0 ? (
            <div className="space-y-3">
                {cartItems.map((item: CartItem, index: number) => (
              <div
                    key={item.id}
                    className={`group relative bg-[#EAE2E6]/[0.03] hover:bg-[#EAE2E6]/[0.06] p-3 border border-[#EAE2E6]/[0.08] hover:border-[#EAE2E6]/15 transition-all duration-200 ${removingItemId === item.id ? 'opacity-0 scale-90 translate-x-8' : 'opacity-100 scale-100 translate-x-0'}`}
                    style={{ transition: 'opacity 0.3s ease, transform 0.3s ease' }}
                  >
                    <div className="relative flex gap-3">
                      {/* Превью товара */}
                      <div className="relative flex-shrink-0 w-16 h-16 overflow-hidden bg-[#EAE2E6]/[0.05] border border-[#EAE2E6]/10">
                        <Img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        {/* Бейдж количества на изображении */}
                        {item.quantity > 1 && (
                          <div className="absolute top-1 right-1 bg-[#EAE2E6] text-[#191516] font-jetbrains text-[9px] tracking-[0.1em] px-1.5 py-0.5 shadow-lg">
                            ×{item.quantity}
                          </div>
                        )}
                      </div>

                      {/* Информация о товаре - 2 строки компактно */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        {/* Строка 1: Название + Цена */}
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-[#EAE2E6] text-sm leading-tight line-clamp-1">
                              {item.title}
                            </h3>
                            {/* Характеристики в одну строку */}
                            <div className="flex items-center gap-1.5 mt-0.5">
                              {item.selectedSize && (
                                <span className="text-xs text-white/50">{item.selectedSize}</span>
                              )}
                              {item.selectedSize && item.selectedColor && (
                                <span className="text-white/30">•</span>
                              )}
                              {item.selectedColor && (
                                <span className="text-xs text-white/50">{item.selectedColor}</span>
                              )}
                            </div>
                          </div>
                          {/* Цена справа */}
                          <div className="text-right flex-shrink-0">
                            <div className="text-base font-bold text-[#EAE2E6] whitespace-nowrap">
                              {item.price}
                            </div>
                          </div>
                        </div>

                        {/* Строка 2: Контроль количества + Кнопка удаления */}
                        <div className="flex items-center justify-between gap-2 mt-2">
                          {/* Контроль количества */}
                          <div className="flex items-center gap-1 bg-[#EAE2E6]/[0.05] border border-[#EAE2E6]/10 p-0.5">
                            <button
                              onClick={() => handleDecreaseQuantity(item)}
                              className="w-7 h-7 flex items-center justify-center bg-[#EAE2E6]/[0.05] hover:bg-[#EAE2E6]/10 text-[#EAE2E6]/50 hover:text-[#EAE2E6] transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                              disabled={item.quantity <= 1}
                              aria-label="Уменьшить количество"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                              </svg>
                            </button>
                            <span className="w-7 text-center text-[#EAE2E6] font-semibold text-sm">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleIncreaseQuantity(item)}
                              className="w-7 h-7 flex items-center justify-center bg-[#EAE2E6]/[0.05] hover:bg-[#EAE2E6]/10 text-[#EAE2E6]/50 hover:text-[#EAE2E6] transition-all duration-200"
                              aria-label="Увеличить количество"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                            </button>
                          </div>

                          {/* Кнопка удаления - всегда видна */}
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="w-8 h-8 flex items-center justify-center bg-[#EAE2E6]/[0.05] hover:bg-[#EAE2E6]/10 border border-[#EAE2E6]/10 hover:border-[#EAE2E6]/25 text-[#EAE2E6]/40 hover:text-[#EAE2E6]/70 transition-all duration-200 focus:outline-none"
                            aria-label="Удалить товар"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
          ) : (
            /* Пустое состояние с иллюстрацией */
          <div
              className="flex flex-col items-center justify-center h-full py-12"
            >
              <div className="relative mb-6">
                <div className="w-24 h-24 bg-[#EAE2E6]/[0.05] border border-[#EAE2E6]/10 flex items-center justify-center">
                  <svg className="w-12 h-12 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#EAE2E6] mb-2">Корзина пуста</h3>
              <p className="text-white/50 text-center mb-6 max-w-xs">
                Добавьте товары из каталога, чтобы начать оформление заказа
              </p>
              <button
                onClick={() => {
                  toggleCart();
                  router.push('/catalog');
                }}
                className="px-6 py-3 bg-[#EAE2E6] hover:bg-[#EAE2E6]/90 text-[#191516] font-jetbrains text-[11px] tracking-[0.15em] uppercase transition-all duration-200 flex items-center justify-center gap-2"
              >
                Перейти в каталог
              </button>
            </div>
          )}
        </div>

        {/* Подвал с итоговой информацией и кнопками действий */}
        {cartItems.length > 0 && (
          <footer className="border-t border-[#EAE2E6]/[0.07]">
            {/* Детализация стоимости */}
            <div className="px-6 py-4 space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-white/60">Товары ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})</span>
                <span className="text-[#EAE2E6] font-medium">{Math.round(subtotal)} ₽</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white/60">Скидка</span>
                  <span className="text-[#EAE2E6]/60 font-medium">−{discount} ₽</span>
                </div>
              )}

              <div className="h-px bg-white/10" />

              {/* Итоговая сумма */}
              <div className="flex justify-between items-center">
                <span className="text-white/80 font-semibold text-lg">Итого</span>
                <div className="text-right">
                  <div className="text-2xl font-bold text-[#EAE2E6]">
                    {Math.round(total)} ₽
                  </div>
                  {discount > 0 && (
                    <div className="text-xs text-white/40 line-through">
                      {Math.round(subtotal)} ₽
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Кнопки действий */}
            <div className="px-6 pb-6 pt-2 space-y-3">
              <button
                onClick={() => {
                  toggleCart();
                  router.push('/checkout');
                }}
                className="w-full bg-[#EAE2E6] hover:bg-[#EAE2E6]/90 text-[#191516] py-3 font-jetbrains text-[11px] tracking-[0.15em] uppercase transition-all duration-200 focus:outline-none"
              >
                Оформить заказ
              </button>

              <button
                onClick={() => {
                  if (window.confirm('Вы уверены, что хотите очистить корзину?')) {
                    clearCart();
                  }
                }}
                className="w-full bg-[#EAE2E6]/[0.05] hover:bg-[#EAE2E6]/[0.08] border border-[#EAE2E6]/10 hover:border-[#EAE2E6]/20 text-[#EAE2E6]/40 hover:text-[#EAE2E6]/60 py-3 font-jetbrains text-[11px] tracking-[0.15em] uppercase transition-all duration-200 focus:outline-none flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Очистить корзину
              </button>
            </div>
          </footer>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
