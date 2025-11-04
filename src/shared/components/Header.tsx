import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../core/context/CartContext';
import Img from '../ui/Img';
import { ROUTES, MOBILE_NAV_ITEMS } from '../../core/constants/routes';
import CartSidebar from './CartSidebar';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isCartOpen, toggleCart, getTotalItems } = useCart();

  const go = (p: string) => {
    if (p === 'main') navigate('/'); else navigate(`/${p}`);
  };

  const path = location.pathname;
  const isActive = (target: string) => path.startsWith(target); // Удалено подчеркивание текущей страницы

  return (
    <>
      <header className={`relative responsive-header ${className}`}>
        <div className="relative flex items-center justify-between gap-2 sm:gap-3 md:gap-6 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-0.5">
          {/* Left: Logo */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <button
              onClick={() => navigate('/')}
              className="relative responsive-logo cursor-pointer transition-all duration-300 hover:scale-110 focus:outline-none group flex-shrink-0"
            >
              <Img
                src="/images/ui/logo.svg"
                alt="Logo"
                className="relative w-full h-full object-contain drop-shadow-[0_0_16px_rgba(255,255,255,0.3)] group-hover:drop-shadow-[0_0_28px_rgba(255,255,255,0.8)] transition-all duration-300"
              />
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 rounded-full blur-xl transition-all duration-300" />
            </button>

            {/* Mobile menu button - 44px touch target */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-white/10 active:bg-white/15 transition-all focus:outline-none flex-shrink-0"
              aria-label={mobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-white/80 transition-transform duration-200">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-white/80 transition-transform duration-200">
                  <line x1="3" y1="12" x2="21" y2="12"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <line x1="3" y1="18" x2="21" y2="18"/>
                </svg>
              )}
            </button>
          </div>

          {/* Right: Nav items + Cart */}
          <div className="hidden md:flex items-center gap-0.5 lg:gap-1">
            <button
              onClick={() => go('catalog')}
              className={`relative font-manrope font-bold text-xs md:text-sm lg:text-base px-2 md:px-3 lg:px-4 py-1.5 md:py-2 rounded-lg transition-all duration-300 focus:outline-none whitespace-nowrap group ${
                isActive('/catalog')
                  ? 'text-white bg-white/10'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="relative z-10">Каталог</span>
              {isActive('/catalog') && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent hidden" />
              )}
            </button>

            <div className="w-1 h-1 rounded-full bg-white/40 mx-0.5 lg:mx-1" />

            <button
              onClick={() => go('support')}
              className={`relative font-manrope font-bold text-xs md:text-sm lg:text-base px-2 md:px-3 lg:px-4 py-1.5 md:py-2 rounded-lg transition-all duration-300 focus:outline-none whitespace-nowrap group ${
                isActive('/support')
                  ? 'text-white bg-white/10'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="relative z-10">Информация</span>
              {isActive('/support') && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent hidden" />
              )}
            </button>

            <div className="w-1 h-1 rounded-full bg-white/40 mx-0.5 lg:mx-1" />

            <button
              onClick={() => navigate(ROUTES.ACCOUNT)}
              className={`relative font-manrope font-bold text-xs md:text-sm lg:text-base px-2 md:px-3 lg:px-4 py-1.5 md:py-2 rounded-lg transition-all duration-300 focus:outline-none whitespace-nowrap group ${
                isActive('/account')
                  ? 'text-white bg-white/10'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="relative z-10">Аккаунт</span>
              {isActive('/account') && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent hidden" />
              )}
            </button>

            <div className="w-1 h-1 rounded-full bg-white/40 mx-0.5 lg:mx-1" />

            <button
              id="cart-button"
              onClick={toggleCart}
              className={`relative font-manrope font-bold text-xs md:text-sm lg:text-base px-2 md:px-3 lg:px-4 py-1.5 md:py-2 rounded-lg transition-all duration-300 focus:outline-none whitespace-nowrap flex items-center gap-1.5 md:gap-2 group ${
                isActive('/cart')
                  ? 'text-white bg-white/10'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="relative z-10">Корзина</span>
              {getTotalItems > 0 && (
                <span className="min-w-[18px] md:min-w-[20px] h-4 md:h-5 px-1 md:px-1.5 bg-gradient-to-br from-blue-500 to-blue-600 text-white text-[10px] md:text-xs font-semibold rounded-full inline-flex items-center justify-center shadow-lg shadow-blue-500/30 border border-white/20">
                  {getTotalItems > 99 ? '99+' : getTotalItems}
                </span>
              )}
            </button>
          </div>

          {/* Mobile: Cart only (larger touch target - 44px minimum) */}
          <div className="md:hidden flex items-center gap-2">
            <button
              id="cart-button-mobile"
              onClick={() => navigate(ROUTES.CART)}
              className="relative min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer active:scale-95 transition-all focus:outline-none rounded-lg group flex-shrink-0"
              aria-label="Корзина"
            >
              <div className="absolute inset-0 bg-white/10 rounded-lg opacity-0 group-active:opacity-100 transition-opacity" />
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="relative text-white/80 drop-shadow-[0_0_6px_rgba(255,255,255,0.2)]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {getTotalItems > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1.5 bg-gradient-to-br from-blue-500 to-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg shadow-blue-500/50 border border-white/20 animate-in zoom-in duration-200">
                  {getTotalItems > 99 ? '99+' : getTotalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu - Enhanced with animations */}
        {mobileMenuOpen && (
          <nav className="relative md:hidden mt-4 pt-4 border-t border-white/10 space-y-2 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 animate-in slide-in-from-top duration-200">
            {MOBILE_NAV_ITEMS.map(({ path: targetPath, label }, index) => {
              const active = isActive(targetPath);
              return (
                <button
                  key={targetPath}
                  onClick={() => {
                    go(targetPath.slice(1));
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left font-manrope font-semibold text-base min-h-[48px] px-4 py-3 rounded-xl transition-all duration-200 focus:outline-none active:scale-98 ${
                    active
                      ? 'text-white bg-white/10 shadow-lg'
                      : 'text-white/70 hover:text-white active:bg-white/10'
                  }`}
                  style={{ 
                    animationDelay: `${index * 50}ms`,
                    animationFillMode: 'backwards'
                  }}
                >
                  {label}
                </button>
              );
            })}
          </nav>
        )}
      </header>
      <CartSidebar isCartOpen={isCartOpen} toggleCart={toggleCart} />
    </>
  );
};

export default Header;