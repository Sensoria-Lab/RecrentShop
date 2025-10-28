import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface PageLayoutProps {
  children: React.ReactNode;
  showBreadcrumbs?: boolean;
}

/**
 * Simplified page layout with header and footer
 * Background is handled globally in App.tsx
 */
const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {

  return (
    <>
      {/* Header - absolute at top */}
      <div className="absolute top-0 left-0 right-0 z-[9999]">
        <div className="relative">
          {/* Glow effect behind header */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-purple-500/5 to-transparent blur-3xl" />

          <div className="relative">
            <Header />
          </div>
        </div>
      </div>

      {/* Main page content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Spacer to prevent content jump */}
        <div className="h-24" />

        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default PageLayout;
