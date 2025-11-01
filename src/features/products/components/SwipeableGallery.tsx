import React, { useState } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import Img from '../../../shared/ui/Img';

interface SwipeableGalleryProps {
  images: string[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  onImageClick?: () => void;
  altPrefix?: string;
}

/**
 * Swipeable Gallery Component
 * 
 * Mobile-optimized image gallery with:
 * - Swipe gestures for navigation
 * - Smooth spring animations
 * - Dot indicators
 * - Drag momentum
 * - Auto-advance on swipe velocity
 * 
 * @param images - Array of image URLs
 * @param currentIndex - Currently displayed image index
 * @param onIndexChange - Callback when index changes
 * @param onImageClick - Optional callback when image is clicked
 * @param altPrefix - Prefix for image alt text
 */
const SwipeableGallery: React.FC<SwipeableGalleryProps> = ({
  images,
  currentIndex,
  onIndexChange,
  onImageClick,
  altPrefix = 'Product image'
}) => {
  const [direction, setDirection] = useState(0);

  // Swipe threshold and velocity settings
  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  // Handle swipe end
  const handleDragEnd = (e: any, { offset, velocity }: PanInfo) => {
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -swipeConfidenceThreshold && currentIndex < images.length - 1) {
      // Swipe left - next image
      setDirection(1);
      onIndexChange(currentIndex + 1);
    } else if (swipe > swipeConfidenceThreshold && currentIndex > 0) {
      // Swipe right - previous image
      setDirection(-1);
      onIndexChange(currentIndex - 1);
    }
  };

  // Navigation functions
  const goToPrevious = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      onIndexChange(currentIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentIndex < images.length - 1) {
      setDirection(1);
      onIndexChange(currentIndex + 1);
    }
  };

  const goToIndex = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    onIndexChange(index);
  };

  // Animation variants
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <div className="relative w-full h-full flex flex-col">
      {/* Gallery container */}
      <div className="relative flex-1 overflow-hidden rounded-xl bg-black/20">
        {/* Images */}
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={handleDragEnd}
            onClick={onImageClick}
            className="absolute inset-0 cursor-pointer"
          >
            <Img
              src={images[currentIndex]}
              alt={`${altPrefix} ${currentIndex + 1}`}
              loading="eager"
              className="w-full h-full object-contain"
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows - desktop and tablet */}
        {images.length > 1 && (
          <>
            {/* Left arrow */}
            <button
              onClick={goToPrevious}
              disabled={currentIndex === 0}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-black/50 hover:bg-black/70 disabled:opacity-30 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center transition-all duration-200 active:scale-95 backdrop-blur-sm"
              aria-label="Previous image"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>

            {/* Right arrow */}
            <button
              onClick={goToNext}
              disabled={currentIndex === images.length - 1}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-black/50 hover:bg-black/70 disabled:opacity-30 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center transition-all duration-200 active:scale-95 backdrop-blur-sm"
              aria-label="Next image"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </>
        )}

        {/* Zoom hint overlay */}
        {onImageClick && (
          <div className="absolute bottom-4 right-4 z-10 bg-black/50 backdrop-blur-sm px-3 py-2 rounded-lg flex items-center gap-2 text-white/80 text-xs sm:text-sm pointer-events-none">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
            </svg>
            <span className="hidden sm:inline">Tap to zoom</span>
          </div>
        )}
      </div>

      {/* Dot indicators */}
      {images.length > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4 pb-1">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToIndex(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? 'w-8 h-2 bg-white'
                  : 'w-2 h-2 bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to image ${index + 1}`}
              aria-current={index === currentIndex ? 'true' : 'false'}
            />
          ))}
        </div>
      )}

      {/* Counter - small text */}
      {images.length > 1 && (
        <div className="absolute top-4 right-4 z-10 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-white/90 text-xs font-medium">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
};

export default SwipeableGallery;
