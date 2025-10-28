import React, { useState, useEffect, useCallback } from 'react';
import Img from './Img';

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
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex, isOpen]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

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
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-[10000] text-white/80 hover:text-white transition-colors p-2"
        aria-label="Закрыть"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Main content */}
      <div 
        className="relative w-full h-full flex flex-col items-center justify-center px-4 py-20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image container */}
        <div className="relative flex items-center justify-center flex-1 w-full max-w-6xl">
          {/* Previous button - outside image */}
          {images.length > 1 && (
            <button
              onClick={goToPrevious}
              className="absolute left-0 z-10 bg-black/50 hover:bg-black/70 text-white p-3 sm:p-4 rounded-full transition-all duration-200 hover:scale-110"
              aria-label="Предыдущее изображение"
            >
              <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Image */}
          <div className="flex-1 flex items-center justify-center max-h-[70vh] mx-12 sm:mx-20">
            <Img
              src={images[currentIndex]}
              alt={`${altPrefix} ${currentIndex + 1}`}
              className="max-w-full max-h-full object-contain rounded-lg"
              loading="eager"
            />
          </div>

          {/* Next button - outside image */}
          {images.length > 1 && (
            <button
              onClick={goToNext}
              className="absolute right-0 z-10 bg-black/50 hover:bg-black/70 text-white p-3 sm:p-4 rounded-full transition-all duration-200 hover:scale-110"
              aria-label="Следующее изображение"
            >
              <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>

        {/* Bottom navigation - thumbnails */}
        {images.length > 1 && (
          <div className="mt-6 flex gap-2 sm:gap-3 overflow-x-auto max-w-full px-4 pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                  currentIndex === index
                    ? 'border-white shadow-lg shadow-white/30 scale-110'
                    : 'border-white/30 opacity-60 hover:opacity-100 hover:border-white/60'
                }`}
              >
                <Img
                  src={image}
                  alt={`${altPrefix} миниатюра ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* Counter */}
        {images.length > 1 && (
          <div className="mt-4 text-white/70 font-manrope text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGalleryModal;
