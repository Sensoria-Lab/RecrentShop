'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useCart } from '@/src/context/CartContext';
import { ROUTES } from '@/src/constants/routes';
import CartSidebar from './CartSidebar';
import Img from '@/src/components/ui/Img';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { isCartOpen, toggleCart, getTotalItems } = useCart();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const path = pathname ?? '';
  const isActive = (target: string) => path.startsWith(target); // Удалено подчеркивание текущей страницы

  return (
    <>
      {/* Header скрыт на мобильных (<768px), видим только на desktop */}
      <header
        style={{ paddingTop: 0, paddingBottom: 0 }}
        className={`hidden md:block relative responsive-header bg-[#191516] border-b border-[#EAE2E6]/[0.08] ${className}`}
      >
        {/* Subtle top accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#EAE2E6]/20 to-transparent pointer-events-none" />

        <div className="relative flex items-center px-6 lg:px-12 xl:px-16 h-[68px]">

          {/* Left: Logo */}
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-3 cursor-pointer focus:outline-none group flex-shrink-0"
          >
            <span className="flex items-center justify-center w-[26px] h-[26px] flex-shrink-0">
              <Img
                src="/images/ui/logo.svg"
                alt="Recrent"
                className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-200"
                style={{ display: 'block' }}
              />
            </span>
            <span className="font-jetbrains font-black text-[17px] leading-none tracking-tighter text-[#EAE2E6]/90 group-hover:text-[#EAE2E6] uppercase transition-colors duration-200">
              RECRENT
            </span>
          </button>

          {/* Center: Nav — absolutely centered */}
          <nav className="absolute left-1/2 -translate-x-1/2 flex items-center">
            {[
              { label: 'Каталог', path: '/catalog', active: isActive('/catalog') },
              { label: 'Помощь', path: '/support', active: isActive('/support') },
              { label: 'Аккаунт', path: ROUTES.ACCOUNT, active: isActive('/account') },
            ].map(({ label, path, active }) => (
              <button
                key={label}
                onClick={() => router.push(path)}
                className={`relative font-jetbrains text-[11px] uppercase tracking-[0.15em] px-4 h-[68px] transition-colors duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#EAE2E6]/40 ${
                  active
                    ? 'text-[#EAE2E6] after:absolute after:bottom-[24px] after:left-1/2 after:-translate-x-1/2 after:w-[3px] after:h-[3px] after:rounded-full after:bg-[#EAE2E6]'
                    : 'text-[#EAE2E6]/45 hover:text-[#EAE2E6]/90'
                }`}
              >
                {label}
              </button>
            ))}
          </nav>

          {/* Right: Cart */}
          <div className="ml-auto flex items-center flex-shrink-0">
            <button
              id="cart-button"
              onClick={toggleCart}
              aria-label="Корзина"
              className={`relative font-jetbrains text-[11px] uppercase tracking-[0.15em] px-5 py-2 transition-all duration-200 focus:outline-none flex items-center gap-2 ${
                isCartOpen
                  ? 'bg-[#EAE2E6]/85 text-[#191516]'
                  : 'bg-[#EAE2E6] text-[#191516] hover:bg-[#EAE2E6]/85'
              }`}
            >
              Корзина
              {mounted && getTotalItems > 0 && (
                <span className="inline-flex items-center justify-center min-w-[16px] h-[16px] bg-[#191516] text-[#EAE2E6] text-[8px] font-bold px-1">
                  {getTotalItems > 99 ? '99+' : getTotalItems}
                </span>
              )}
            </button>
          </div>

          {/* Mobile: Cart only (larger touch target - 44px minimum) */}
          <div className="md:hidden flex items-center gap-2">
            <button
              id="cart-button-mobile"
              onClick={() => router.push(ROUTES.CART)}
              className="relative min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer border border-[#EAE2E6]/30 active:bg-[#EAE2E6]/10 transition-colors focus:outline-none flex-shrink-0"
              aria-label="Корзина"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#EAE2E6]">
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {mounted && getTotalItems > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[20px] h-[20px] bg-[#EAE2E6] text-[#191516] text-[10px] font-bold flex items-center justify-center border border-[#191516] shadow-none animate-in zoom-in duration-200">
                  {getTotalItems > 99 ? '99+' : getTotalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {/* MobileMenu больше не используется - навигация через BottomNavigation */}

      {/* Cart Sidebar */}
      <CartSidebar isCartOpen={isCartOpen} toggleCart={toggleCart} />
    </>
  );
};

export default Header;
