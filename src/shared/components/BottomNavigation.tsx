import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../core/context/CartContext';
import { ROUTES } from '../../core/constants/routes';
import { hapticSelection } from '../utils/haptic';

/**
 * Mobile Bottom Navigation Bar
 *
 * Features:
 * - Glass morphism design matching site style
 * - Cart badge with item count
 * - Active state indicators
 * - Smooth transitions
 * - Always visible on mobile (hidden on desktop)
 * - Safe area padding for notched phones
 *
 * Shows on: Mobile only (< 768px)
 * Position: Fixed bottom
 */
const BottomNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getTotalItems } = useCart();
  const cartItemCount = getTotalItems;

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const navItems = [
    {
      id: 'home',
      label: 'Главная',
      path: '/',
      icon: (active: boolean) => (
        <svg
          className={`w-6 h-6 transition-all duration-200 ${active ? 'scale-110' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={active ? 2.5 : 2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
    },
    {
      id: 'catalog',
      label: 'Каталог',
      path: ROUTES.CATALOG,
      icon: (active: boolean) => (
        <svg
          className={`w-6 h-6 transition-all duration-200 ${active ? 'scale-110' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={active ? 2.5 : 2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
          />
        </svg>
      ),
    },
    {
      id: 'cart',
      label: 'Корзина',
      path: ROUTES.CART,
      badge: cartItemCount,
      icon: (active: boolean) => (
        <svg
          className={`w-6 h-6 transition-all duration-200 ${active ? 'scale-110' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={active ? 2.5 : 2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
    },
    {
      id: 'account',
      label: 'Профиль',
      path: ROUTES.ACCOUNT,
      icon: (active: boolean) => (
        <svg
          className={`w-6 h-6 transition-all duration-200 ${active ? 'scale-110' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={active ? 2.5 : 2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* Spacer to prevent content from being hidden under nav */}
      <div className="h-20 md:hidden" aria-hidden="true" />

      {/* Bottom Navigation */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 pb-safe"
        role="navigation"
        aria-label="Мобильная навигация"
      >
        {/* Glass morphism container */}
        <div className="relative bg-black/60 backdrop-blur-2xl border-t border-white/10 shadow-2xl">
          {/* Gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

          {/* Navigation items */}
          <div className="relative grid grid-cols-4 gap-1 px-2 py-2">
            {navItems.map((item) => {
              const active = isActive(item.path);
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    hapticSelection();
                    navigate(item.path);
                  }}
                  className={`relative flex flex-col items-center justify-center gap-1 py-2 px-1 min-h-[56px] rounded-xl transition-all duration-200 active:scale-95 ${
                    active
                      ? 'bg-white/10 text-white'
                      : 'text-white/70 active:text-white/90 active:bg-white/5'
                  }`}
                  aria-label={item.label}
                  aria-current={active ? 'page' : undefined}
                >
                  {/* Icon with badge - larger for better touch */}
                  <div className="relative min-w-[32px] min-h-[32px] flex items-center justify-center">
                    {item.icon(active)}

                    {/* Cart badge - enhanced */}
                    {item.badge && item.badge > 0 && (
                      <div className="absolute -top-1.5 -right-1.5 min-w-[20px] h-[20px] bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/60 animate-in zoom-in duration-200 border border-white/20">
                        <span className="text-[11px] font-bold text-white px-1">
                          {item.badge > 99 ? '99+' : item.badge}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Label - slightly larger */}
                  <span
                    className={`text-[11px] font-medium transition-all duration-200 ${
                      active ? 'font-semibold' : ''
                    }`}
                  >
                    {item.label}
                  </span>

                  {/* Active indicator - more prominent */}
                  {active && (
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-10 h-1 bg-gradient-to-r from-white/50 via-white/80 to-white/50 rounded-full shadow-lg shadow-white/30 animate-in zoom-in duration-200" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Safe area for notched phones (iOS) */}
        <div className="bg-black h-[env(safe-area-inset-bottom)]" />
      </nav>
    </>
  );
};

export default BottomNavigation;
