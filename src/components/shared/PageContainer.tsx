import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Common page container with header and footer
 * Provides consistent layout for all pages
 */
const PageContainer: React.FC<PageContainerProps> = ({ children, className = '' }) => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <div className="flex justify-center px-4 sm:px-8 md:px-12 py-4 sticky top-0 z-50">
          <div className="max-w-[900px] w-full">
            <Header />
          </div>
        </div>

        {/* Main content */}
        <main className={`flex-1 ${className}`}>
          {children}
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default PageContainer;
