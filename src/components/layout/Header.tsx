'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useCart } from '@/src/context/CartContext';
import { ROUTES } from '@/src/constants/routes';
import Img from '@/src/components/ui/Img';
import { Icon } from '@/src/components/ui/Icon';

// Safe theme hook that handles SSR
function useThemeSafe() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if ThemeProvider has set a value
    const root = document.documentElement;
    if (root.classList.contains('light')) {
      setTheme('light');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);

    const root = document.documentElement;
    const body = document.body;

    if (newTheme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
      body.classList.add('light');
      body.classList.remove('dark');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
      body.classList.add('dark');
      body.classList.remove('light');
    }

    localStorage.setItem('recrent-theme', newTheme);
  };

  return { theme, toggleTheme, mounted };
}

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { getTotalItems } = useCart();
  const { theme, toggleTheme, mounted: themeMounted } = useThemeSafe();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const path = pathname ?? '';
  const isActive = (target: string) => path.startsWith(target); // Удалено подчеркивание текущей страницы

  return (
    <>
      {/* Header скрыт на мобильных (<768px), видим только на desktop */}
      <header
        style={{ paddingTop: 0, paddingBottom: 0 }}
        className={`hidden md:block relative responsive-header bg-[var(--rc-bg)] border-b border-[var(--rc-border)] ${className}`}
      >
        {/* Subtle top accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--rc-fg)]/20 to-transparent pointer-events-none" />

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
                style={{ display: 'block', filter: 'var(--rc-logo-filter, none)' }}
              />
            </span>
            <span className="font-jetbrains font-black text-[17px] leading-none tracking-tighter text-[var(--rc-fg)]/90 group-hover:text-[var(--rc-fg)] uppercase transition-colors duration-200">
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
                className={`relative font-jetbrains text-xs uppercase tracking-[0.15em] px-4 h-[68px] transition-colors duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--rc-fg)]/40 ${active
                  ? 'text-[var(--rc-fg)] after:absolute after:bottom-[24px] after:left-1/2 after:-translate-x-1/2 after:w-[3px] after:h-[3px] after:rounded-full after:bg-[var(--rc-fg)]'
                  : 'text-[var(--rc-fg)]/45 hover:text-[var(--rc-fg)]/90'
                  }`}
              >
                {label}
              </button>
            ))}
          </nav>

          {/* Right: Theme Switch + Cart */}
          <div className="ml-auto flex items-center gap-3 flex-shrink-0">
            {/* Theme Toggle Button */}
            {themeMounted && (
              <button
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? 'Включить светлую тему' : 'Включить темную тему'}
                className="w-9 h-9 flex items-center justify-center bg-[var(--rc-fg)]/[0.07] hover:bg-[var(--rc-fg)]/[0.15] border border-[var(--rc-border)] transition-all duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--rc-fg)]/30"
              >
                {theme === 'dark' ? (
                  // Sun icon for dark mode (switch to light)
                  <Icon name="sun" size={16} className="text-[var(--rc-fg)]" />
                ) : (
                  // Moon icon for light mode (switch to dark)
                  <Icon name="moon" size={16} className="text-[var(--rc-fg)]" />
                )}
              </button>
            )}

            <button
              id="cart-button"
              onClick={() => router.push(ROUTES.CART)}
              aria-label="Корзина"
              className="relative font-jetbrains text-xs uppercase tracking-[0.15em] px-5 py-2 transition-all duration-200 focus:outline-none flex items-center gap-2 bg-[var(--rc-bg-invert)] text-[var(--rc-bg)] hover:bg-[var(--rc-bg-invert)]/85"
            >
              Корзина
              {mounted && getTotalItems > 0 ? (
                <span className="inline-flex items-center justify-center min-w-[16px] h-[16px] bg-[var(--rc-bg)] text-[var(--rc-fg)] text-[10px] font-bold px-1">
                  {getTotalItems > 99 ? '99+' : getTotalItems}
                </span>
              ) : null}
            </button>
          </div>

          {/* Mobile: Theme Switch + Cart */}
          <div className="md:hidden flex items-center gap-2">
            {/* Mobile Theme Toggle */}
            {themeMounted && (
              <button
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? 'Включить светлую тему' : 'Включить темную тему'}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center border border-[var(--rc-border)] active:bg-[var(--rc-fg)]/10 transition-colors focus:outline-none"
              >
                {theme === 'dark' ? (
                  <Icon name="sun" size={20} className="text-[var(--rc-fg)]" />
                ) : (
                  <Icon name="moon" size={20} className="text-[var(--rc-fg)]" />
                )}
              </button>
            )}

            <button
              id="cart-button-mobile"
              onClick={() => router.push(ROUTES.CART)}
              className="relative min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer border border-[var(--rc-border)] active:bg-[var(--rc-fg)]/10 transition-colors focus:outline-none flex-shrink-0"
              aria-label="Корзина"
            >
              <Icon name="cart" size={24} className="text-[var(--rc-fg)]" />
              {mounted && getTotalItems > 0 ? (
                <span className="absolute -top-1 -right-1 min-w-[20px] h-[20px] bg-[var(--rc-bg-invert)] text-[var(--rc-bg)] text-[10px] font-bold flex items-center justify-center border border-[var(--rc-bg)] shadow-none animate-in zoom-in duration-200">
                  {getTotalItems > 99 ? '99+' : getTotalItems}
                </span>
              ) : null}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
