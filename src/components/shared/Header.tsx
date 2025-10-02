import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import Img from './Img';

interface HeaderProps {
  className?: string;
  onNavigate?: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ className = '', onNavigate }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [visible, setVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getTotalItems } = useCart();
  const lastY = useRef(0);
  const [isMouseNearTop, setIsMouseNearTop] = useState(false);

  useEffect(() => {
    lastY.current = window.scrollY;
    
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 64) {
        setVisible(true);
      } else {
        // Show on scroll up, hide on scroll down (unless mouse is near top)
        if (y > lastY.current + 8) {
          if (!isMouseNearTop) {
            setVisible(false);
          }
        } else if (y < lastY.current - 8) {
          setVisible(true);
        }
      }
      lastY.current = y;
    };

    const onMouseMove = (e: MouseEvent) => {
      // Show header if mouse is within 100px from top
      const nearTop = e.clientY < 100;
      setIsMouseNearTop(nearTop);
      if (nearTop) {
        setVisible(true);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [isMouseNearTop]);

  const go = (p: string) => {
    if (onNavigate) return onNavigate(p);
    if (p === 'main') navigate('/'); else navigate(`/${p}`);
  };

  const path = location.pathname;
  const isActive = (target: string) => (target === '/' ? path === '/' : path.startsWith(target));

  return (
    <header className={`relative bg-gradient-to-b from-black/80 to-black/60 backdrop-blur-2xl border border-white/10 rounded-2xl px-4 sm:px-6 py-3 sm:py-4 transition-all duration-300 shadow-2xl shadow-black/50 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'} ${className}`}>
      {/* Bottom gradient border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      
      <div className="grid grid-cols-3 items-center gap-2 sm:gap-4">
        {/* Left: Logo */}
        <div className="flex justify-start">
          <button
            onClick={() => navigate('/')}
            className="relative w-10 h-10 cursor-pointer transition-all hover:rotate-[-5deg] hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/40 rounded-lg group"
          >
            <div className="absolute inset-0 bg-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity blur-md" />
            <Img
              src="/images/ui/logo.svg"
              alt="Logo"
              className="relative w-full h-full object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
            />
          </button>
        </div>

        {/* Center: Navigation */}
        <nav className="hidden md:flex gap-1 lg:gap-2 items-center justify-center">
          {[
            { path: '/catalog', label: 'Каталог' },
            { path: '/contacts', label: 'Контакты' },
            { path: '/info', label: 'Инфо' }
          ].map(({ path: targetPath, label }) => {
            const active = isActive(targetPath);
            return (
              <button
                key={targetPath}
                onClick={() => go(targetPath.slice(1))}
                aria-current={active ? 'page' : undefined}
                className={`relative font-manrope font-semibold text-sm lg:text-base px-3 lg:px-5 py-2.5 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/30 whitespace-nowrap ${
                  active 
                    ? 'text-white bg-white/10 shadow-lg shadow-white/5' 
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {/* Active underline */}
                {active && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-white/0 via-white/80 to-white/0 rounded-full animate-pulse" />
                )}
                
                {/* Hover glow */}
                <span className="absolute inset-0 rounded-xl bg-white/0 group-hover:bg-white/5 transition-colors" />
                
                <span className="relative">{label}</span>
              </button>
            );
          })}
        </nav>

        {/* Mobile menu button (center on mobile) */}
        <div className="md:hidden flex justify-center">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/30"
          >
            {mobileMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            )}
          </button>
        </div>

        {/* Right: Shopping cart */}
        <div className="flex justify-end">
          <button 
            id="cart-button"
            onClick={() => navigate('/cart')}
            className="relative w-10 h-10 flex items-center justify-center cursor-pointer hover:scale-110 transition-all focus:outline-none focus:ring-2 focus:ring-white/40 rounded-lg group"
          >
            {/* Hover background */}
            <div className="absolute inset-0 bg-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
            
            {/* Cart icon */}
            <Img
              src="/images/ui/shopping-cart.svg"
              alt="Shopping Cart"
              className="relative w-6 h-6 object-contain filter invert drop-shadow-[0_0_6px_rgba(255,255,255,0.2)]"
            />
            
            {/* Badge */}
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
          {[
            { path: '/catalog', label: 'Каталог' },
            { path: '/contacts', label: 'Контакты' },
            { path: '/info', label: 'Информация' }
          ].map(({ path: targetPath, label }) => {
            const active = isActive(targetPath);
            return (
              <button
                key={targetPath}
                onClick={() => {
                  go(targetPath.slice(1));
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left font-manrope font-semibold text-base px-4 py-3 rounded-xl transition-all duration-300 ${
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