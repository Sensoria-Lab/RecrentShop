import React, { useState, useRef, useEffect } from 'react';

interface ProductCarouselProps {
  children: React.ReactNode[];
  itemsPerView?: number;
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ 
  children, 
  itemsPerView = 3 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Create infinite loop by duplicating items
  const extendedChildren = [
    ...children.slice(-itemsPerView),
    ...children,
    ...children.slice(0, itemsPerView)
  ];

  const totalItems = children.length;
  const actualIndex = currentIndex + itemsPerView;
  const [containerWidth, setContainerWidth] = useState(0);
  const gap = 32; // 32px gap between items (gap-8)
  
  // Calculate card width based on container
  useEffect(() => {
    const updateWidth = () => {
      if (carouselRef.current?.parentElement) {
        const width = carouselRef.current.parentElement.offsetWidth;
        setContainerWidth(width);
      }
    };
    
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);
  
  const cardWidth = containerWidth > 0 ? (containerWidth - gap * (itemsPerView - 1)) / itemsPerView : 340;

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  useEffect(() => {
    if (!isTransitioning) return;

    const timer = setTimeout(() => {
      setIsTransitioning(false);

      // Reset to actual position for infinite loop
      if (currentIndex >= totalItems) {
        setCurrentIndex(0);
      } else if (currentIndex < 0) {
        setCurrentIndex(totalItems - 1);
      }
    }, 500); // Match transition duration

    return () => clearTimeout(timer);
  }, [currentIndex, isTransitioning, totalItems]);

  const translateX = -(actualIndex * (cardWidth + gap));

  return (
    <div className="relative flex items-center gap-4">
      {/* Left Arrow */}
      <button
        onClick={handlePrev}
        className="flex-shrink-0 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full transition-all duration-200 hover:scale-110 z-10"
        aria-label="Previous"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </button>

      {/* Carousel Container */}
      <div className="overflow-hidden flex-1 py-3">
        <div
          ref={carouselRef}
          className="flex gap-8"
          style={{
            transform: `translateX(${translateX}px)`,
            transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none',
          }}
        >
          {extendedChildren.map((child, index) => (
            <div
              key={index}
              className="flex-shrink-0"
              style={{ width: `${cardWidth}px` }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Right Arrow */}
      <button
        onClick={handleNext}
        className="flex-shrink-0 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full transition-all duration-200 hover:scale-110 z-10"
        aria-label="Next"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </button>
    </div>
  );
};

export default ProductCarousel;
