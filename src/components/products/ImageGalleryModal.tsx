'use client';
import React, { useState, useEffect, useCallback } from 'react';
import Img from '@/src/components/ui/Img';

interface ImageGalleryModalProps {
  images: string[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
  altPrefix?: string;
}

const ImageGalleryModal: React.FC<ImageGalleryModalProps> = ({
  images,
  initialIndex,
  isOpen,
  onClose,
  altPrefix = 'Изображение'
}) => {
  const [currentIndex, setCurrentIndex] = useState(() => initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setIsZoomed(false);
  }, [images.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setIsZoomed(false);
  }, [images.length]);

  const handlePreviousClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation(); // Предотвращаем закрытие модалки
    goToPrevious();
  }, [goToPrevious]);

  const handleNextClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation(); // Предотвращаем закрытие модалки
    goToNext();
  }, [goToNext]);

  const handleClose = useCallback(() => {
    setIsZoomed(false);
    onClose();
  }, [onClose]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  }, [isZoomed]);

  const handleMouseEnter = useCallback(() => {
    setIsZoomed(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsZoomed(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        handleClose();
      } else if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, goToNext, goToPrevious, handleClose]);

  // Handlers defined above with stable identity (useCallback)

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm"
      onClick={handleClose}
    >
      {/* Main content */}
      <div
        className="relative w-full h-full flex flex-col items-center justify-center px-4 py-16 sm:py-20 pointer-events-none"
      >
        {/* Image container */}
        <div className="relative flex items-center justify-center flex-1 w-full max-w-7xl pointer-events-auto">
          {/* Previous button - outside image */}
          {images.length > 1 && (
            <button
              onClick={handlePreviousClick}
              className="absolute left-0 z-[10000] bg-[#EAE2E6]/[0.07] hover:bg-[#EAE2E6]/15 border border-[#EAE2E6]/10 text-[#EAE2E6]/70 hover:text-[#EAE2E6] p-3 sm:p-4 transition-all duration-200"
              aria-label="Предыдущее изображение"
            >
              <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Image with zoom on hover */}
          <div
            className="relative flex items-center justify-center mx-4 sm:mx-12 lg:mx-20 cursor-zoom-in overflow-hidden"
            style={{
              width: '100%',
              maxWidth: '1200px',
              height: 'clamp(500px, 75vh, 800px)',
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Img
              src={images[currentIndex]}
              alt={`${altPrefix} ${currentIndex + 1}`}
              className="w-full h-full object-contain transition-transform duration-200 ease-out pointer-events-none"
              style={isZoomed ? {
                transform: 'scale(2)',
                transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
              } : {}}
              loading="eager"
            />
          </div>

          {/* Next button - outside image */}
          {images.length > 1 && (
            <button
              onClick={handleNextClick}
              className="absolute right-0 z-[10000] bg-[#EAE2E6]/[0.07] hover:bg-[#EAE2E6]/15 border border-[#EAE2E6]/10 text-[#EAE2E6]/70 hover:text-[#EAE2E6] p-3 sm:p-4 transition-all duration-200"
              aria-label="Следующее изображение"
            >
              <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>

        {/* Counter */}
        {images.length > 1 && (
          <div className="mt-6 text-[#EAE2E6]/40 font-jetbrains text-[11px] tracking-[0.2em] pointer-events-none">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Close button - минималистичный */}
      <button
        type="button"
        onClick={handleClose}
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
        className="fixed top-4 right-4 z-[99999] text-[#EAE2E6]/50 hover:text-[#EAE2E6] transition-all p-2 hover:bg-[#EAE2E6]/[0.08] cursor-pointer border border-[#EAE2E6]/10"
        style={{ pointerEvents: 'auto' }}
        aria-label="Закрыть"
      >
        <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default ImageGalleryModal;

