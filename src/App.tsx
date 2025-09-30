import React, { useState } from 'react';
import MainPage from './components/pages/MainPage';
import ProductPage from './components/pages/ProductPage';
import ContactsPage from './components/pages/ContactsPage';
import CatalogPage from './components/pages/CatalogPage';
import InfoPage from './components/pages/InfoPage';
import './index.css';

function App() {
  const [currentPage, setCurrentPage] = useState<'main' | 'product' | 'contacts' | 'catalog' | 'info'>('main');
  const [currentProductData, setCurrentProductData] = useState<any>(null);

  const handleNavigate = (page: string, productData?: any) => {
    setCurrentPage(page as 'main' | 'product' | 'contacts' | 'catalog' | 'info');
    if (productData) {
      setCurrentProductData(productData);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Page Content */}
      {currentPage === 'main' && <MainPage onNavigate={handleNavigate} />}
      {currentPage === 'product' && <ProductPage onNavigate={handleNavigate} productData={currentProductData} />}
      {currentPage === 'contacts' && <ContactsPage onNavigate={handleNavigate} />}
      {currentPage === 'catalog' && <CatalogPage onNavigate={handleNavigate} />}
      {currentPage === 'info' && <InfoPage onNavigate={handleNavigate} />}
    </div>
  );
}

export default App;