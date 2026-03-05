'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useCart } from '@/src/context/CartContext';
import { ROUTES } from '@/src/constants/routes';
import { hapticSelection } from '@/src/lib/haptic';
import { Icon } from '@/src/components/ui/Icon';

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
  const router = useRouter();
  const pathname = usePathname();
  const { getTotalItems } = useCart();
  const cartItemCount = getTotalItems;

  // Hide on desktop (≥768px). Default to false for SSR to avoid hydration mismatch
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    // Set initial value only on client
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return (pathname ?? "").startsWith(path);
  };

  const navItems = [
    {
      id: 'home',
      label: 'Главная',
      path: '/',
      icon: (active: boolean) => (
        <Icon
          name="home"
          size={24}
          className={`transition-all duration-200 ${active ? 'scale-110' : ''}`}
        />
      ),
    },
    {
      id: 'catalog',
      label: 'Каталог',
      path: ROUTES.CATALOG,
      icon: (active: boolean) => (
        <Icon
          name="grid"
          size={24}
          className={`transition-all duration-200 ${active ? 'scale-110' : ''}`}
        />
      ),
    },
    {
      id: 'cart',
      label: 'Корзина',
      path: ROUTES.CART,
      badge: cartItemCount,
      icon: (active: boolean) => (
        <Icon
          name="cart"
          size={24}
          className={`transition-all duration-200 ${active ? 'scale-110' : ''}`}
        />
      ),
    },
    {
      id: 'account',
      label: 'Профиль',
      path: ROUTES.ACCOUNT,
      icon: (active: boolean) => (
        <Icon
          name="user"
          size={24}
          className={`transition-all duration-200 ${active ? 'scale-110' : ''}`}
        />
      ),
    },
  ];

  // Don't render on desktop
  if (!isMobile) return null;

  // Render as fixed element
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-[9999] block"
      role="navigation"
      aria-label="Мобильная навигация"
      style={{
        position: 'fixed',
        bottom: '0px',
        left: '0px',
        right: '0px',
        zIndex: 9999,
        display: 'block',
        width: '100vw',
        maxWidth: '100vw',
      }}
    >
      {/* Container */}
      <div className="relative bg-[var(--rc-bg)] border-t border-[var(--rc-border)] shadow-2xl">

        {/* Navigation items */}
        <div className="relative grid grid-cols-4 gap-1 px-2 py-2">
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <button
                key={item.id}
                onClick={() => {
                  hapticSelection();
                  router.push(item.path);
                }}
                className={`relative flex flex-col items-center justify-center gap-1 py-2 px-1 min-h-[56px] transition-all duration-200 ${active
                  ? 'bg-[var(--rc-fg-ghost)] text-[var(--rc-fg)]'
                  : 'text-[var(--rc-fg-secondary)] active:text-[var(--rc-fg-muted)] active:bg-[var(--rc-fg-ghost)]'
                  }`}
                aria-label={item.label}
                aria-current={active ? 'page' : undefined}
              >
                {/* Icon with badge - larger for better touch */}
                <div className="relative min-w-[32px] min-h-[32px] flex items-center justify-center">
                  {item.icon(active)}

                  {/* Cart badge - enhanced */}
                  {item.badge != null && item.badge > 0 ? (
                    <div className="absolute -top-1.5 -right-1.5 min-w-[20px] h-[20px] bg-[var(--rc-bg-invert)] text-[var(--rc-bg)] flex items-center justify-center shadow-lg animate-in zoom-in duration-200">
                      <span className="text-[11px] font-bold text-[var(--rc-bg)] px-1">
                        {item.badge > 99 ? '99+' : item.badge}
                      </span>
                    </div>
                  ) : null}
                </div>

                {/* Label - slightly larger */}
                <span
                  className={`text-[11px] font-medium transition-all duration-200 ${active ? 'font-semibold' : ''
                    }`}
                >
                  {item.label}
                </span>

                {/* Active indicator - more prominent */}
                {active ? (
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-10 h-[2px] bg-[var(--rc-fg)]/60 animate-in zoom-in duration-200" />
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      {/* Safe area for notched phones (iOS) */}
      <div className="bg-[var(--rc-bg)] h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
};

export default BottomNavigation;

