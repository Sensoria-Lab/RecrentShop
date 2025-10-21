import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../../hooks/useDebounce';
import { products } from '../../data/products';
import { ROUTES } from '../../constants/routes';

interface SearchBarProps {
  className?: string;
  isMobile?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ className = '', isMobile = false }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const debouncedSearch = useDebounce(searchTerm, 300);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Filter products based on search term
  const searchResults = debouncedSearch.trim().length >= 2
    ? products.filter(product => {
        const searchLower = debouncedSearch.toLowerCase();
        const titleMatch = product.title.toLowerCase().includes(searchLower);
        const subtitleMatch = product.subtitle?.toLowerCase().includes(searchLower);
        const colorMatch = product.productColor?.toLowerCase().includes(searchLower);
        const sizeMatch = product.productSize?.toLowerCase().includes(searchLower);
        return titleMatch || subtitleMatch || colorMatch || sizeMatch;
      }).slice(0, 6)
    : [];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Show dropdown when there are results
  useEffect(() => {
    if (searchResults.length > 0 && debouncedSearch.trim().length >= 2) {
      setIsOpen(true);
    }
  }, [searchResults.length, debouncedSearch]);

  const handleProductClick = (productId: number) => {
    setSearchTerm('');
    setIsOpen(false);
    navigate(`${ROUTES.CATALOG}?productId=${productId}`);
  };

  const handleViewAll = () => {
    setSearchTerm('');
    setIsOpen(false);
    navigate(`${ROUTES.CATALOG}?search=${encodeURIComponent(debouncedSearch)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      setSearchTerm('');
    }
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => {
            if (searchResults.length > 0) setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Поиск товаров..."
          aria-label="Поиск товаров"
          className={`w-full bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg focus:outline-none focus:border-white/40 transition-all duration-200 text-white placeholder-white/50 ${
            isMobile
              ? 'px-3 py-2 text-sm'
              : 'px-4 py-2.5 text-sm md:text-base'
          }`}
        />

        {/* Search Icon */}
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none"
        >
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>

        {/* Clear button */}
        {searchTerm && (
          <button
            onClick={() => {
              setSearchTerm('');
              setIsOpen(false);
            }}
            className="absolute right-10 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
            aria-label="Очистить поиск"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && searchResults.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-black/95 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl z-50 overflow-hidden animate-fade-in-up">
          <div className="max-h-[400px] overflow-y-auto">
            {searchResults.map((product, index) => (
              <button
                key={product.id}
                onClick={() => handleProductClick(product.id)}
                className="w-full px-4 py-3 flex items-center gap-3 hover:bg-white/10 transition-colors duration-200 border-b border-white/5 last:border-b-0 group"
              >
                {/* Product Image */}
                <div className="w-12 h-12 flex-shrink-0 bg-white/5 rounded-lg overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 text-left">
                  <div className="font-manrope font-bold text-sm text-white group-hover:text-white/90">
                    {product.title}
                    {product.subtitle && (
                      <span className="font-normal text-white/80 ml-1">{product.subtitle}</span>
                    )}
                  </div>
                  <div className="text-xs text-white/60 mt-0.5">
                    {product.productSize && `Размер: ${product.productSize}`}
                    {product.productSize && product.productColor && ' • '}
                    {product.productColor && `Цвет: ${product.productColor}`}
                  </div>
                </div>

                {/* Price */}
                <div className="font-manrope font-bold text-sm text-white">
                  {product.price}
                </div>
              </button>
            ))}
          </div>

          {/* View All Results */}
          {searchResults.length >= 6 && (
            <button
              onClick={handleViewAll}
              className="w-full px-4 py-3 bg-white/5 hover:bg-white/10 transition-colors duration-200 font-manrope font-semibold text-sm text-white/90 hover:text-white border-t border-white/10"
            >
              Показать все результаты ({products.filter(p => {
                const s = debouncedSearch.toLowerCase();
                return p.title.toLowerCase().includes(s) ||
                       p.subtitle?.toLowerCase().includes(s) ||
                       p.productColor?.toLowerCase().includes(s) ||
                       p.productSize?.toLowerCase().includes(s);
              }).length})
            </button>
          )}
        </div>
      )}

      {/* No Results */}
      {isOpen && searchResults.length === 0 && debouncedSearch.trim().length >= 2 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-black/95 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl z-50 px-4 py-6 text-center animate-fade-in-up">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="mx-auto mb-3 text-white/40"
          >
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
          <p className="font-manrope text-white/60 text-sm">
            Ничего не найдено для "{debouncedSearch}"
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setIsOpen(false);
              navigate(ROUTES.CATALOG);
            }}
            className="mt-3 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-semibold text-white transition-colors"
          >
            Перейти в каталог
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
