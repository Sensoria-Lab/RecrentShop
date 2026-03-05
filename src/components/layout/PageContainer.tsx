'use client';
import React, { useState, useRef, useEffect } from 'react';
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
  const headerRef = useRef<HTMLDivElement | null>(null);
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Measure header height and keep it in state so we can add top padding to main
  useEffect(() => {
    const measure = () => {
      const h = headerRef.current ? headerRef.current.getBoundingClientRect().height : 0;
      setHeaderHeight(Math.ceil(h));
      setIsMobile(window.innerWidth < 768);
    };

    // Measure now
    measure();

    // Update on resize (and orientation change)
    window.addEventListener('resize', measure, { passive: true });

    return () => {
      window.removeEventListener('resize', measure);
    };
  }, []);

  return (
    // Do not force the main page into a fixed-height container; prefer natural flow so
    // tall screens don't end up with excessive empty space. Use min-h-screen for baseline.
    <div className={`relative w-full min-h-screen bg-[var(--rc-bg)] transition-colors duration-300`} style={isMainPage ? { background: 'var(--rc-bg)' } : {}}>
      {/* Header - absolute at top */}
      <div
        ref={headerRef}
        className="absolute top-0 left-0 right-0 z-[9999]"
      >
        <div className="relative">
          {/* Glow effect behind header - theme aware */}
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--rc-fg)]/10 via-[var(--rc-fg)]/5 to-transparent blur-3xl" />

          <div className="relative">
            <Header />
          </div>
        </div>
      </div>

      {/* Main content - отступ сверху только для desktop (md+), на мобильных Header скрыт */}
      <main
        className={`relative z-10 min-h-screen flex flex-col ${className}`}
        style={{ paddingTop: isMobile ? 0 : headerHeight + 16 }}
      >
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

