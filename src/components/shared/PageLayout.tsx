import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

interface PageLayoutProps {
  children: React.ReactNode;
}

/**
 * Simplified page layout with header and footer
 * Background is handled globally in App.tsx
 */
const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const nearTop = e.clientY < 120;
      
      if (nearTop) {
        setShowHeader(true);
      }
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      if (scrollY < 100) {
        setShowHeader(true);
      } else {
        // Hide immediately when scrolling down
        setShowHeader(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* Header with slide-down animation - separate from page layout */}
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
        <div className="flex justify-center px-4 sm:px-12 py-4 relative">
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

      {/* Main page content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Spacer to prevent content jump */}
        <div className="h-32" />

        <main className="flex-1 px-4 sm:px-20 py-12">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default PageLayout;
