import React, { useEffect } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import './index.css';
import { ErrorBoundary, BottomNavigation, ShadcnBubble } from './shared/components';
import { CartProvider } from './core/context/CartContext';
import { ToastProvider } from './core/context/ToastContext';
import { Toaster } from 'sonner';

/**
 * Main App Component
 * Handles routing, lazy loading, and global background effects
 */
function App() {
  const location = useLocation();

  // Smooth scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <ErrorBoundary>
      <ToastProvider>
        <CartProvider>
          <div className="min-h-screen">
            {/* Shadcn Bubble Background */}
            <ShadcnBubble />

            {/* Routes container */}
            <div className="min-h-screen relative z-10">
              {/* Render child routes */}
              <Outlet />
            </div>

            {/* Sonner Toaster */}
            <Toaster />
            
            {/* Mobile Bottom Navigation - будет fixed относительно viewport */}
            <BottomNavigation />
          </div>
        </CartProvider>
      </ToastProvider>
    </ErrorBoundary>
  );
}

export default App;