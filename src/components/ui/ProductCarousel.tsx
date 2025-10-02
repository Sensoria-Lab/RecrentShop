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
  const [responsiveItemsPerView, setResponsiveItemsPerView] = useState(itemsPerView);

  // Create infinite loop by duplicating items
  const extendedChildren = [
    ...children.slice(-responsiveItemsPerView),
    ...children,
    ...children.slice(0, responsiveItemsPerView)
  ];

  const totalItems = children.length;
  const actualIndex = currentIndex + responsiveItemsPerView;
  const [containerWidth, setContainerWidth] = useState(0);
  const gap = 32; // 32px gap between items (gap-8)
  
  // Calculate card width based on container and responsive items
  useEffect(() => {
    const updateWidth = () => {
      if (carouselRef.current?.parentElement) {
        const width = carouselRef.current.parentElement.offsetWidth;
        setContainerWidth(width);
        
        // Responsive items per view
        if (width < 768) {
          setResponsiveItemsPerView(1); // Mobile
        } else if (width < 1024) {
          setResponsiveItemsPerView(2); // Tablet
        } else {
          setResponsiveItemsPerView(itemsPerView); // Desktop
        }
      }
    };
    
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [itemsPerView]);
  
  const cardWidth = containerWidth > 0 ? (containerWidth - gap * (responsiveItemsPerView - 1)) / responsiveItemsPerView : 340;

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

  // Touch / pointer swipe support
  const startXRef = useRef<number | null>(null);
  const deltaXRef = useRef(0);

  const onPointerDown = (e: React.PointerEvent) => {
    startXRef.current = e.clientX;
    deltaXRef.current = 0;
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (startXRef.current == null) return;
    deltaXRef.current = e.clientX - startXRef.current;
  };

  const onPointerUp = () => {
    if (startXRef.current == null) return;
    const threshold = 48; // swipe threshold
    if (deltaXRef.current > threshold) {
      handlePrev();
    } else if (deltaXRef.current < -threshold) {
      handleNext();
    }
    startXRef.current = null;
    deltaXRef.current = 0;
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
  }, 280); // Match accelerated transition duration

    return () => clearTimeout(timer);
  }, [currentIndex, isTransitioning, totalItems]);

  const translateX = -(actualIndex * (cardWidth + gap));

  // If only one item, show it centered without arrows
  if (totalItems === 1) {
    return (
      <div className="flex justify-center items-center py-3">
        <div style={{ width: `${cardWidth}px` }}>
          {children[0]}
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex items-center gap-4">
      {/* Left Arrow */}
      <button
        onClick={handlePrev}
        className="flex-shrink-0 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full transition-all duration-200 hover:scale-110 active:scale-95 z-10"
        aria-label="Previous"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </button>

      {/* Carousel Container */}
      <div className="overflow-hidden flex-1 py-3 touch-pan-y"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <div
          ref={carouselRef}
          className="flex gap-8"
          style={{
            transform: `translateX(${translateX}px)`,
            transition: isTransitioning ? 'transform 0.28s cubic-bezier(0.4, 0.1, 0.2, 1)' : 'none',
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
        className="flex-shrink-0 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full transition-all duration-200 hover:scale-110 active:scale-95 z-10"
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
