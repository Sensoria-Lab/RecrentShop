import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import type { Product } from '../types/product';

interface HeroImageShowcaseProps {
  products: Product[];
  onProductClick: (product: Product) => void;
}

const HeroImageShowcase: React.FC<HeroImageShowcaseProps> = ({ products, onProductClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate products every 5 seconds
  useEffect(() => {
    if (products.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [products.length]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (products.length === 0) {
    return null;
  }

  const currentProduct = products[currentIndex];

  return (
    <div className="relative w-full group">
      {/* Background container with glass effect */}
      <div className="relative w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl shadow-2xl">
        {/* Padding wrapper to create equal spacing */}
        <div className="p-4 sm:p-5 md:p-6">
          {/* Product Card Container */}
          <div className="w-full">
            <ProductCard
              id={currentProduct.id}
              image={currentProduct.image}
              images={currentProduct.images}
              title={currentProduct.title}
              subtitle={currentProduct.subtitle}
              productSize={currentProduct.productSize}
              productColor={currentProduct.productColor}
              price={currentProduct.price}
              priceNumeric={currentProduct.priceNumeric}
              rating={currentProduct.rating}
              reviewCount={currentProduct.reviewCount}
              color={currentProduct.color}
              category={currentProduct.category}
              clothingType={currentProduct.clothingType}
              size="small-catalog"
              onProductClick={() => onProductClick(currentProduct)}
            />
          </div>
        </div>
      </div>

      {/* Navigation arrows - positioned outside the card */}
      <button
        onClick={goToPrevious}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/70 hover:bg-black/80 backdrop-blur-md border border-white/20 hover:border-white/40 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 z-30 shadow-lg"
        aria-label="Previous product"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          className="text-white"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <button
        onClick={goToNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/70 hover:bg-black/80 backdrop-blur-md border border-white/20 hover:border-white/40 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 z-30 shadow-lg"
        aria-label="Next product"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          className="text-white"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* Dots indicator */}
      <div className="mt-6 flex justify-center gap-2">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-white w-8'
                : 'bg-white/40 hover:bg-white/60 w-2'
            }`}
            aria-label={`Go to product ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroImageShowcase;
