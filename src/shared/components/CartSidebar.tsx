import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart, CartItem } from '../../core/context';
import { motion, AnimatePresence } from 'framer-motion';
import { hapticLight, hapticWarning } from '../utils/haptic';

interface CartSidebarProps {
  isCartOpen: boolean;
  toggleCart: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isCartOpen, toggleCart }) => {
  const { items: cartItems, getTotalPrice, clearCart, removeItem, updateQuantity } = useCart();
  const navigate = useNavigate();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [removingItemId, setRemovingItemId] = useState<string | null>(null);

  useEffect(() => {
    if (isCartOpen) {
      const firstFocusableElement = sidebarRef.current?.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as HTMLElement;
      firstFocusableElement?.focus();

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          toggleCart();
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
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
      {/* Затемнение фона с плавной анимацией */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-md"
            onClick={toggleCart}
          />
        )}
      </AnimatePresence>

      {/* Сайдбар корзины с улучшенной анимацией */}
      <motion.div
        ref={sidebarRef}
        initial={{ x: '100%' }}
        animate={{ x: isCartOpen ? 0 : '100%' }}
        transition={{ 
          type: 'spring',
          damping: 30,
          stiffness: 300,
          mass: 0.8
        }}
        className="fixed top-0 right-0 h-full w-full sm:w-[440px] md:w-[480px] lg:w-[520px] bg-black/95 backdrop-blur-2xl shadow-2xl z-50 border-l border-white/10 flex flex-col"
        role="dialog"
        aria-labelledby="cart-title"
        aria-hidden={!isCartOpen}
      >
        {/* Заголовок */}
        <header className="relative p-6 border-b border-white/10">
          <div className="flex justify-between items-center">
            <div>
              <h2 id="cart-title" className="text-2xl font-bold text-white">
                Корзина
              </h2>
              <p className="text-sm text-white/50 mt-1">
                {cartItems.length === 0 
                  ? 'Пусто' 
                  : `${cartItems.length} ${cartItems.length === 1 ? 'товар' : cartItems.length < 5 ? 'товара' : 'товаров'}`
                }
              </p>
            </div>
            <button
              onClick={toggleCart}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-all duration-200 hover:rotate-90 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
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
            <AnimatePresence mode="popLayout">
              <div className="space-y-3">
                {cartItems.map((item: CartItem, index: number) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ 
                      opacity: removingItemId === item.id ? 0 : 1, 
                      y: 0, 
                      scale: removingItemId === item.id ? 0.8 : 1,
                      x: removingItemId === item.id ? 100 : 0
                    }}
                    exit={{ opacity: 0, x: 100, scale: 0.8 }}
                    transition={{ 
                      duration: 0.3, 
                      ease: [0.16, 1, 0.3, 1],
                      delay: index * 0.05
                    }}
                    className="group relative bg-white/5 hover:bg-white/8 backdrop-blur-sm rounded-xl p-3 border border-white/10 hover:border-white/20 transition-all duration-200"
                  >
                    <div className="relative flex gap-3">
                      {/* Превью товара */}
                      <div className="relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-white/5 border border-white/10">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-cover" 
                        />
                        {/* Бейдж количества на изображении */}
                        {item.quantity > 1 && (
                          <div className="absolute top-1 right-1 bg-blue-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-md shadow-lg">
                            ×{item.quantity}
                          </div>
                        )}
                      </div>

                      {/* Информация о товаре - 2 строки компактно */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        {/* Строка 1: Название + Цена */}
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-white text-sm leading-tight line-clamp-1">
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
                            <div className="text-base font-bold text-white whitespace-nowrap">
                              {item.price}
                            </div>
                          </div>
                        </div>

                        {/* Строка 2: Контроль количества + Кнопка удаления */}
                        <div className="flex items-center justify-between gap-2 mt-2">
                          {/* Контроль количества */}
                          <div className="flex items-center gap-1 bg-white/5 rounded-lg border border-white/10 p-0.5">
                            <button
                              onClick={() => handleDecreaseQuantity(item)}
                              className="w-7 h-7 flex items-center justify-center rounded bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
                              disabled={item.quantity <= 1}
                              aria-label="Уменьшить количество"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                              </svg>
                            </button>
                            <span className="w-7 text-center text-white font-semibold text-sm">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleIncreaseQuantity(item)}
                              className="w-7 h-7 flex items-center justify-center rounded bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all duration-200 active:scale-95"
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
                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/40 text-red-400 hover:text-red-300 transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                            aria-label="Удалить товар"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          ) : (
            /* Пустое состояние с иллюстрацией */
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center justify-center h-full py-12"
            >
              <div className="relative mb-6">
                <div className="w-24 h-24 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                  <svg className="w-12 h-12 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Корзина пуста</h3>
              <p className="text-white/50 text-center mb-6 max-w-xs">
                Добавьте товары из каталога, чтобы начать оформление заказа
              </p>
              <button
                onClick={() => {
                  toggleCart();
                  navigate('/catalog');
                }}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
              >
                Перейти в каталог
              </button>
            </motion.div>
          )}
        </div>

        {/* Подвал с итоговой информацией и кнопками действий */}
        {cartItems.length > 0 && (
          <footer className="border-t border-white/10 bg-gradient-to-b from-transparent to-black/50 backdrop-blur-xl">
            {/* Детализация стоимости */}
            <div className="px-6 py-4 space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-white/60">Товары ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})</span>
                <span className="text-white font-medium">{Math.round(subtotal)} ₽</span>
              </div>
              
              {discount > 0 && (
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white/60">Скидка</span>
                  <span className="text-green-400 font-medium">−{discount} ₽</span>
                </div>
              )}

              <div className="h-px bg-white/10" />

              {/* Итоговая сумма */}
              <div className="flex justify-between items-center">
                <span className="text-white/80 font-semibold text-lg">Итого</span>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">
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
                  navigate('/checkout');
                }}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              >
                Оформить заказ
              </button>

              <button
                onClick={() => {
                  if (window.confirm('Вы уверены, что хотите очистить корзину?')) {
                    clearCart();
                  }
                }}
                className="w-full bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/30 text-white/70 hover:text-red-400 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-red-500/50 flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Очистить корзину
              </button>
            </div>
          </footer>
        )}
      </motion.div>
    </>
  );
};

export default CartSidebar;