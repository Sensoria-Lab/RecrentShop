import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  isMainPage?: boolean;
}

/**
 * Common page container with header and footer
 * Provides consistent layout for all pages
 * Header appears on mouse hover at top of screen
 */
const PageContainer: React.FC<PageContainerProps> = ({ children, className = '', isMainPage = false }) => {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const nearTop = e.clientY < 120;

      if (nearTop) {
        setShowHeader(true);
      }
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (scrollY < 50) {
        setShowHeader(true);
      } else if (scrollY > lastScrollY && scrollY > 50) {
        setShowHeader(false);
      }

      setLastScrollY(scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    // Do not force the main page into a fixed-height container; prefer natural flow so
    // tall screens don't end up with excessive empty space. Use min-h-screen for baseline.
    <div className={`relative w-full min-h-screen`}>
      {/* Header with slide-down animation */}
      <div
        className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-150 ease-out ${
          showHeader
            ? 'translate-y-0 opacity-100'
            : '-translate-y-full opacity-0'
        }`}
        style={{
          willChange: 'transform, opacity',
          pointerEvents: showHeader ? 'auto' : 'none'
        }}
      >
        <div className="flex justify-center px-4 sm:px-8 md:px-12 py-4 relative">
          {/* Animated glow effect behind header */}
          <div
            className={`absolute inset-0 bg-gradient-to-b from-white/10 via-purple-500/5 to-transparent blur-3xl transition-all duration-150 ${
              showHeader ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          />

          <div className="max-w-[900px] w-full relative">
            <Header />
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className={`relative z-10 min-h-screen flex flex-col ${className}`}>
        {!isMainPage && <div className="h-32" />}
        {children}
        {!isMainPage && (
          <div className="mt-auto">
            <Footer />
          </div>
        )}
      </main>
    </div>
  );
};

export default PageContainer;
