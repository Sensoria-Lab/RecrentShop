import React, { useEffect, Suspense, lazy } from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';
import './index.css';
import LoadingSkeleton from './components/shared/LoadingSkeleton';
import { CartProvider } from './context/CartContext';
import BackgroundBeams from './components/shared/BackgroundBeams';

// Lazy load all pages for better performance
const MainPage = lazy(() => import('./components/pages/MainPage'));
const ProductPage = lazy(() => import('./components/pages/ProductPage'));
const CatalogPage = lazy(() => import('./components/pages/CatalogPage'));
const SupportPage = lazy(() => import('./components/pages/SupportPage'));
const CartPage = lazy(() => import('./components/pages/CartPage'));
const CheckoutPage = lazy(() => import('./components/pages/CheckoutPage'));
const AdminPage = lazy(() => import('./components/pages/AdminPage'));
const AdminLoginPage = lazy(() => import('./components/pages/AdminLoginPage'));
const NotFoundPage = lazy(() => import('./components/pages/NotFoundPage'));

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
    <CartProvider>
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Pixel Blast Background Effect */}
      <BackgroundBeams />

      {/* Routes container */}
      <div className="min-h-screen relative z-20">
        <Suspense fallback={<LoadingSkeleton />}>
          <Routes location={location}>
            <Route path="/" element={<MainPage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </div>

      {/* Subtle noise texture */}
      <div className="noise-overlay" />
    </div>
    </CartProvider>
  );
}

export default App;