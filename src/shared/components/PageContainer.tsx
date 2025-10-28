import React, { useState, useRef, useLayoutEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  isMainPage?: boolean;
  showBreadcrumbs?: boolean;
}

/**
 * Common page container with header and footer
 * Provides consistent layout for all pages
 * Header appears on mouse hover at top of screen
 */
const PageContainer: React.FC<PageContainerProps> = ({ children, className = '', isMainPage = false, showBreadcrumbs = true }) => {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const [headerHeight, setHeaderHeight] = useState<number>(0);

  // Measure header height and keep it in state so we can add top padding to main
  useLayoutEffect(() => {
    const measure = () => {
      const h = headerRef.current ? headerRef.current.getBoundingClientRect().height : 0;
      setHeaderHeight(Math.ceil(h));
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
    <div className={`relative w-full min-h-screen`}>
      {/* Header - absolute at top */}
      <div
        ref={headerRef}
        className="absolute top-0 left-0 right-0 z-[9999]"
      >
        <div className="relative">
          {/* Glow effect behind header */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-purple-500/5 to-transparent blur-3xl" />

          <div className="relative">
            <Header />
          </div>
        </div>
      </div>

      {/* Main content */}
      <main
        className={`relative z-10 min-h-screen flex flex-col ${className}`}
        style={{ paddingTop: headerHeight + 16 }}
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
