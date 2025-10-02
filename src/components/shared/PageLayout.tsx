import React from 'react';
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
  return (
    <div className="relative z-10 min-h-screen flex flex-col">
      <div className="flex justify-center px-12 py-4 sticky top-0 z-50">
        <div className="max-w-[900px] w-full">
          <Header />
        </div>
      </div>
      <main className="flex-1 px-20 py-12">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;
