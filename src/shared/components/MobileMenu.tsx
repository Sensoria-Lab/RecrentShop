import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ROUTES } from '../../core/constants/routes';
import { hapticSelection } from '../utils/haptic';
import Img from '../ui/Img';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Mobile Menu Drawer Component
 * 
 * Features:
 * - Slide-in animation from left
 * - Glass morphism design matching site style
 * - Categories and navigation links
 * - Touch-optimized targets (min 48px)
 * - Haptic feedback on iOS
 * - Lock body scroll when open
 */
const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
    } else {
      document.body.style.overflow = '';
      document.body.style.height = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.height = '';
    };
  }, [isOpen]);

  const handleNavigate = (path: string) => {
    hapticSelection();
    navigate(path);
    setTimeout(onClose, 100); // Delay close for smooth transition
  };

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const mainNavItems = [
    { label: 'Главная', path: '/', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { label: 'Каталог', path: ROUTES.CATALOG, icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
    { label: 'Корзина', path: ROUTES.CART, icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z' },
    { label: 'Профиль', path: ROUTES.ACCOUNT, icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { label: 'Информация', path: ROUTES.SUPPORT, icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  ];

  const categories = [
    { 
      label: 'Коврики для мыши', 
      path: `${ROUTES.CATALOG}?category=mousepads`,
      icon: '🖱️',
      description: 'Premium игровые коврики'
    },
    { 
      label: 'Одежда', 
      path: `${ROUTES.CATALOG}?category=clothing`,
      icon: '👕',
      description: 'Стильные футболки и худи'
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            onClick={() => {
              hapticSelection();
              onClose();
            }}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ 
              type: 'spring', 
              damping: 30, 
              stiffness: 300 
            }}
            className="fixed left-0 top-0 bottom-0 w-[85vw] max-w-[340px] bg-black/90 backdrop-blur-2xl border-r border-white/10 z-[101] overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Мобильное меню"
          >
            {/* Gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/20 pointer-events-none" />

            <div className="relative flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <Img
                    src="/images/ui/logo.svg"
                    alt="Logo"
                    className="w-10 h-10 object-contain drop-shadow-[0_0_12px_rgba(255,255,255,0.3)]"
                  />
                  <div>
                    <h2 className="text-white font-bold text-lg">RECRENT</h2>
                    <p className="text-white/50 text-xs">SHOP</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    hapticSelection();
                    onClose();
                  }}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-white/10 active:bg-white/15 transition-all"
                  aria-label="Закрыть меню"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-white/80">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>

              {/* Main Navigation */}
              <div className="p-4 space-y-2">
                <h3 className="text-white/50 text-xs font-semibold uppercase tracking-wider px-3 mb-3">
                  Навигация
                </h3>
                {mainNavItems.map((item, index) => {
                  const active = isActive(item.path);
                  return (
                    <motion.button
                      key={item.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleNavigate(item.path)}
                      className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all min-h-[52px] ${
                        active
                          ? 'bg-white/15 text-white shadow-lg shadow-white/10'
                          : 'text-white/70 hover:text-white hover:bg-white/5 active:bg-white/10'
                      }`}
                    >
                      <svg
                        className={`w-6 h-6 flex-shrink-0 transition-transform ${active ? 'scale-110' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={active ? 2.5 : 2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                      </svg>
                      <span className={`font-medium ${active ? 'font-semibold' : ''}`}>
                        {item.label}
                      </span>
                      {active && (
                        <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full" />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Divider */}
              <div className="px-4">
                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </div>

              {/* Categories */}
              <div className="p-4 space-y-2">
                <h3 className="text-white/50 text-xs font-semibold uppercase tracking-wider px-3 mb-3">
                  Категории
                </h3>
                {categories.map((category, index) => (
                  <motion.button
                    key={category.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (mainNavItems.length + index) * 0.05 }}
                    onClick={() => handleNavigate(category.path)}
                    className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/5 active:bg-white/10 transition-all min-h-[52px]"
                  >
                    <span className="text-2xl flex-shrink-0">{category.icon}</span>
                    <div className="flex-1 text-left">
                      <div className="font-medium">{category.label}</div>
                      <div className="text-xs text-white/40">{category.description}</div>
                    </div>
                    <svg className="w-5 h-5 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.button>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-auto p-4 border-t border-white/10">
                <div className="text-center">
                  <p className="text-white/40 text-xs">
                    © 2024 RECRENT SHOP
                  </p>
                  <p className="text-white/30 text-xs mt-1">
                    Premium качество
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
