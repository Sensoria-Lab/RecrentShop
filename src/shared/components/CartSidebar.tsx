import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart, CartItem } from '../../core/context';

interface CartSidebarProps {
  isCartOpen: boolean;
  toggleCart: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isCartOpen, toggleCart }) => {
  const { items: cartItems, getTotalPrice, clearCart, removeItem } = useCart();
  const navigate = useNavigate();
  const sidebarRef = useRef<HTMLDivElement>(null);

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

  return (
    <>
      {isCartOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={toggleCart}></div>
      )}
      <div
        ref={sidebarRef}
        className={`fixed top-0 right-0 h-full w-1/5 bg-black/40 backdrop-blur-md shadow-2xl z-50 transform transition-transform duration-300 ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        } border-l border-white/20`}
        role="dialog"
        aria-labelledby="cart-title"
        aria-hidden={!isCartOpen}
      >
        <header className="p-4 border-b border-white/20 flex justify-between items-center">
          <h2 id="cart-title" className="text-lg font-semibold text-white">
            Ваша корзина
          </h2>
          <button
            onClick={toggleCart}
            className="text-white/60 hover:text-white focus:outline-none transition-colors duration-200"
            aria-label="Закрыть корзину"
          >
            ✕
          </button>
        </header>
        <div className="p-4 flex-1 overflow-y-auto">
          {cartItems.length > 0 ? (
            <ul>
              {cartItems.map((item: CartItem) => (
                <li key={item.id} className="flex flex-col py-4 text-white/80 border-b border-white/10 last:border-b-0 hover:bg-white/5 transition-colors">
                  {/* Upper part: image, info, remove button */}
                  <div className="flex items-start mb-2">
                    <div className="flex flex-col items-center mr-4">
                      <img src={item.image} alt={item.title} className="w-16 h-16 rounded object-cover flex-shrink-0" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="block font-medium">{item.title}</span>
                      {item.subtitle && <span className="text-sm text-white/60 block">{item.subtitle}</span>}
                      <span className="text-sm text-blue-300 block">Размер: {item.selectedSize || 'Не выбран'}</span>
                    </div>
                    <div className="ml-2">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="w-6 h-6 rounded-full bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 flex items-center justify-center text-xs transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                  {/* Lower part: price */}
                  <div className="flex justify-end">
                    <span className="block text-lg font-bold text-white">{item.price}</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-white/40 bg-white/5 rounded-lg p-4">Ваша корзина пуста</p>
          )}
        </div>
        <footer className="p-4 border-t border-white/20">
          <div className="mb-4 pl-2 border-l-4 border-blue-500/30">
            <span className="text-2xl font-extrabold text-white drop-shadow-lg">Итого: {Math.round(getTotalPrice)} ₽</span>
          </div>
          <div className="flex flex-col gap-2">
            <button
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none transition-all duration-300 shadow-lg shadow-blue-500/30"
              onClick={() => {
                toggleCart();
                navigate('/checkout');
              }}
            >
              Оформить заказ
            </button>
            <button
              className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-300 py-3 rounded-lg transition-all duration-300 border border-red-500/30"
              onClick={() => {
                if (window.confirm('Вы уверены, что хотите очистить корзину?')) {
                  clearCart();
                }
              }}
            >
              Очистить корзину
            </button>
          </div>
        </footer>
      </div>
    </>
  );
};

export default CartSidebar;