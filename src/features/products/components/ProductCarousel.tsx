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
  const carouselRef = useRef<HTMLDivElement>(null);
  const [responsiveItemsPerView, setResponsiveItemsPerView] = useState(itemsPerView);

  // No infinite loop - just use original children
  const totalItems = children.length;
  const [containerWidth, setContainerWidth] = useState(0);
  const gap = 16; // 16px gap between items (gap-4)
  
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

  // Touch / pointer swipe support with smooth drag
  const startXRef = useRef<number | null>(null);
  const deltaXRef = useRef(0);
  const isDraggingRef = useRef(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isClickDisabled, setIsClickDisabled] = useState(false);

  // Scrollbar refs and state
  const scrollbarRef = useRef<HTMLDivElement>(null);
  const scrollbarTrackRef = useRef<HTMLDivElement>(null);
  const [isDraggingScrollbar, setIsDraggingScrollbar] = useState(false);

  // Calculate max index (don't scroll past the last item)
  const maxIndex = Math.max(0, totalItems - responsiveItemsPerView);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const onPointerDown = (e: React.PointerEvent) => {
    startXRef.current = e.clientX;
    deltaXRef.current = 0;
    isDraggingRef.current = true;
    setIsClickDisabled(false);
    if (carouselRef.current) {
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    }
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (startXRef.current == null || !isDraggingRef.current) return;
    deltaXRef.current = e.clientX - startXRef.current;
    
    // Disable clicks if moved more than 5px
    if (Math.abs(deltaXRef.current) > 5) {
      setIsClickDisabled(true);
    }
    
    // Apply drag with resistance at edges
    const itemWidth = cardWidth + gap;
    const maxOffset = maxIndex * itemWidth;
    const proposedOffset = -(currentIndex * itemWidth) + deltaXRef.current;
    
    // Add resistance at edges
    let finalOffset = proposedOffset;
    if (proposedOffset > 0) {
      // Resistance at start
      finalOffset = proposedOffset * 0.3;
    } else if (Math.abs(proposedOffset) > maxOffset) {
      // Resistance at end
      const excess = Math.abs(proposedOffset) - maxOffset;
      finalOffset = -(maxOffset + excess * 0.3);
    }
    
    setDragOffset(finalOffset + (currentIndex * itemWidth));
  };

  const onPointerUp = () => {
    if (startXRef.current == null) return;
    isDraggingRef.current = false;
    const threshold = 48;

    // Calculate how many items to move based on drag distance
    const itemWidth = cardWidth + gap;
    const itemsMoved = Math.round(Math.abs(deltaXRef.current) / itemWidth);

    if (deltaXRef.current > threshold) {
      const newIndex = Math.max(0, currentIndex - Math.max(1, itemsMoved));
      setCurrentIndex(newIndex);
    } else if (deltaXRef.current < -threshold) {
      const newIndex = Math.min(maxIndex, currentIndex + Math.max(1, itemsMoved));
      setCurrentIndex(newIndex);
    }

    startXRef.current = null;
    deltaXRef.current = 0;
    setDragOffset(0);
    
    // Re-enable clicks after a short delay
    setTimeout(() => {
      setIsClickDisabled(false);
    }, 150);
  };

  const translateX = dragOffset !== 0 ? dragOffset : -(currentIndex * (cardWidth + gap));

  // Disable prev/next buttons at edges
  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < maxIndex;

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

    // Calculate progress indicator size and position
  const indicatorWidth = totalItems > 0 ? (responsiveItemsPerView / totalItems) * 100 : 100;
  const maxIndicatorPosition = 100 - indicatorWidth;
  const indicatorPosition = maxIndex > 0 
    ? (currentIndex / maxIndex) * maxIndicatorPosition
    : 0;

  // Handle scrollbar interaction
  const handleScrollbarPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingScrollbar(true);
    
    const track = scrollbarTrackRef.current;
    if (!track) return;
    
    const rect = track.getBoundingClientRect();
    const clickPosition = (e.clientX - rect.left) / rect.width;
    const targetIndex = Math.round(clickPosition * maxIndex);
    const clampedIndex = Math.max(0, Math.min(maxIndex, targetIndex));
    
    setCurrentIndex(clampedIndex);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handleScrollbarPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingScrollbar) return;
    e.preventDefault();
    
    const track = scrollbarTrackRef.current;
    if (!track) return;
    
    const rect = track.getBoundingClientRect();
    const clickPosition = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const targetIndex = Math.round(clickPosition * maxIndex);
    const clampedIndex = Math.max(0, Math.min(maxIndex, targetIndex));
    
    setCurrentIndex(clampedIndex);
  };

  const handleScrollbarPointerUp = () => {
    setIsDraggingScrollbar(false);
  };

  return (
    <div className="relative flex flex-col gap-4">
      <div className="flex items-center gap-4">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          disabled={!canGoPrev}
          className={`flex-shrink-0 p-3 rounded-full transition-all duration-200 z-10 ${
            canGoPrev 
              ? 'bg-black/70 hover:bg-black/90 text-white hover:scale-110 active:scale-95 cursor-pointer' 
              : 'bg-black/30 text-white/30 cursor-not-allowed'
          }`}
          aria-label="Previous"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>

      {/* Carousel Container */}
      <div
        className="overflow-hidden flex-1 py-3 flex items-center cursor-grab active:cursor-grabbing select-none"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <div
          ref={carouselRef}
          className="flex gap-4 items-center"
          style={{
            transform: `translateX(${translateX}px)`,
            transition: dragOffset === 0 ? 'transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)' : 'none',
          }}
        >
          {children.map((child, index) => (
            <div
              key={index}
              className={`flex-shrink-0 flex items-center justify-center ${isClickDisabled ? 'pointer-events-none' : ''}`}
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
          disabled={!canGoNext}
          className={`flex-shrink-0 p-3 rounded-full transition-all duration-200 z-10 ${
            canGoNext 
              ? 'bg-black/70 hover:bg-black/90 text-white hover:scale-110 active:scale-95 cursor-pointer' 
              : 'bg-black/30 text-white/30 cursor-not-allowed'
          }`}
          aria-label="Next"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      </div>

      {/* Progress Indicator */}
      {totalItems > responsiveItemsPerView && (
        <div className="flex justify-center w-full py-2">
          <div 
            ref={scrollbarTrackRef}
            className="relative w-48 h-1 bg-white/10 rounded-full overflow-hidden cursor-pointer"
            onPointerDown={handleScrollbarPointerDown}
            onPointerMove={handleScrollbarPointerMove}
            onPointerUp={handleScrollbarPointerUp}
            onPointerLeave={handleScrollbarPointerUp}
          >
            {/* Progress bar */}
            <div
              ref={scrollbarRef}
              className="absolute top-0 left-0 h-full bg-white/80 rounded-full cursor-grab active:cursor-grabbing transition-opacity hover:bg-white"
              style={{
                width: `${indicatorWidth}%`,
                left: `${indicatorPosition}%`,
                transition: (isDraggingScrollbar || isDraggingRef.current || Math.abs(dragOffset) > 0)
                  ? 'none' 
                  : 'left 0.4s cubic-bezier(0.25, 0.1, 0.25, 1), width 0.3s ease'
              }}
            >
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-white/80 to-transparent rounded-full opacity-70" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCarousel;
