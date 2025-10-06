import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import Img from './Img';
import { ROUTES, MOBILE_NAV_ITEMS } from '../../constants/routes';

interface HeaderProps {
  className?: string;
  onNavigate?: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ className = '', onNavigate }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getTotalItems } = useCart();

  const go = (p: string) => {
    if (onNavigate) return onNavigate(p);
    if (p === 'main') navigate('/'); else navigate(`/${p}`);
  };

  const path = location.pathname;
  const isActive = (target: string) => (target === '/' ? path === '/' : path.startsWith(target));

  return (
    <header className={`relative bg-black/40 backdrop-blur-3xl rounded-2xl px-6 sm:px-8 py-4 sm:py-5 shadow-xl shadow-black/30 ${className}`}>
      <div className="flex items-center justify-between gap-3 sm:gap-6">
        {/* Left: Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="relative w-11 h-11 md:w-12 md:h-12 cursor-pointer transition-all hover:scale-105 focus:outline-none group"
          >
            <Img
              src="/images/ui/logo.svg"
              alt="Logo"
              className="relative w-full h-full object-contain drop-shadow-[0_0_16px_rgba(255,255,255,0.3)] group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.5)] transition-all"
            />
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-white/10 transition-all focus:outline-none"
          >
            {mobileMenuOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-white/80">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-white/80">
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            )}
          </button>
        </div>

        {/* Right: Nav items + Cart */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => go('catalog')}
            className={`font-manrope font-medium text-sm lg:text-base px-4 lg:px-5 py-2 transition-all duration-200 focus:outline-none whitespace-nowrap ${
              isActive('/catalog')
                ? 'text-white'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Каталог
          </button>

          <button
            onClick={() => go('support')}
            className={`font-manrope font-medium text-sm lg:text-base px-4 lg:px-5 py-2 transition-all duration-200 focus:outline-none whitespace-nowrap ${
              isActive('/support')
                ? 'text-white'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Поддержка
          </button>

          <div className="w-px h-6 bg-white/20 mx-2" />

          <button
            id="cart-button"
            onClick={() => navigate(ROUTES.CART)}
            className={`font-manrope font-medium text-sm lg:text-base px-4 lg:px-5 py-2 transition-all duration-200 focus:outline-none whitespace-nowrap flex items-center gap-2 ${
              isActive('/cart')
                ? 'text-white'
                : 'text-white/70 hover:text-white'
            }`}
          >
            <span>Корзина</span>
            {getTotalItems() > 0 && (
              <span className="min-w-[20px] h-5 px-1.5 bg-white/20 text-white text-xs font-semibold rounded-full inline-flex items-center justify-center">
                {getTotalItems() > 99 ? '99+' : getTotalItems()}
              </span>
            )}
          </button>
        </div>

        {/* Mobile cart */}
        <div className="md:hidden flex justify-end">
          <button
            id="cart-button-mobile"
            onClick={() => navigate(ROUTES.CART)}
            className="relative w-10 h-10 flex items-center justify-center cursor-pointer hover:scale-110 transition-all focus:outline-none rounded-lg group"
          >
            <div className="absolute inset-0 bg-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
            <Img
              src="/images/ui/shopping-cart.svg"
              alt="Shopping Cart"
              className="relative w-6 h-6 object-contain filter invert drop-shadow-[0_0_6px_rgba(255,255,255,0.2)]"
            />
            {getTotalItems() > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1.5 bg-gradient-to-br from-red-500 to-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg shadow-red-500/50 animate-pulse border border-white/20">
                {getTotalItems() > 99 ? '99+' : getTotalItems()}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden mt-4 pt-4 border-t border-white/10 space-y-2">
          {MOBILE_NAV_ITEMS.map(({ path: targetPath, label }) => {
            const active = isActive(targetPath);
            return (
              <button
                key={targetPath}
                onClick={() => {
                  go(targetPath.slice(1));
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left font-manrope font-semibold text-base px-4 py-3 rounded-xl transition-all duration-300 focus:outline-none ${
                  active 
                    ? 'text-white bg-white/10' 
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {label}
              </button>
            );
          })}
        </nav>
      )}
    </header>
  );
};

export default Header;