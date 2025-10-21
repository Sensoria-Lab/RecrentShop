import React, { useEffect, Suspense, lazy } from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';
import './index.css';
import LoadingSkeleton from './components/shared/LoadingSkeleton';
import ErrorBoundary from './components/shared/ErrorBoundary';
import BottomNavigation from './components/shared/BottomNavigation';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import ShadcnBubble from './components/shared/ShadcnBubble';
import { Toaster } from './shared/ui';

const MainPage = lazy(() => import('./components/pages/MainPage'));
const ProductPage = lazy(() => import('./components/pages/ProductPage'));
const CatalogPage = lazy(() => import('./components/pages/CatalogPage'));
const SupportPage = lazy(() => import('./components/pages/SupportPage'));
const CartPage = lazy(() => import('./components/pages/CartPage'));
const CheckoutPage = lazy(() => import('./components/pages/CheckoutPage'));
const AccountPage = lazy(() => import('./components/pages/AccountPage'));

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
          <div className="relative min-h-screen">
            {/* Shadcn Bubble Background */}
            <ShadcnBubble />

            {/* Routes container */}
            <div className="min-h-screen relative z-10">
              <Suspense fallback={<LoadingSkeleton />}>
                <Routes location={location}>
                  <Route path="/" element={<MainPage />} />
                  <Route path="/catalog" element={<CatalogPage />} />
                  <Route path="/support" element={<SupportPage />} />
                  <Route path="/product" element={<ProductPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/account" element={<AccountPage />} />
                </Routes>
              </Suspense>
            </div>

            {/* Mobile Bottom Navigation */}
            <BottomNavigation />

            {/* Sonner Toaster */}
            <Toaster />
          </div>
        </CartProvider>
      </ToastProvider>
    </ErrorBoundary>
  );
}

export default App;