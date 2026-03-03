'use client';
import React, { useState, useRef, useEffect } from 'react';
import gsap from '@/src/lib/gsap';
import Img from '@/src/components/ui/Img';

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
 * - GSAP-powered slide animations
 * - Pointer-based swipe gesture support
 * - Dot indicators
 */
const SwipeableGallery: React.FC<SwipeableGalleryProps> = ({
  images,
  currentIndex,
  onIndexChange,
  onImageClick,
  altPrefix = 'Product image'
}) => {
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const prevIndexRef = useRef(currentIndex);
  const pointerStartX = useRef(0);
  const pointerMoved = useRef(false);

  // GSAP slide transition when currentIndex changes
  useEffect(() => {
    const prev = prevIndexRef.current;
    if (prev === currentIndex) {
      // First render – just make current visible
      const currEl = slideRefs.current[currentIndex];
      if (currEl) gsap.set(currEl, { x: '0%', zIndex: 1, autoAlpha: 1 });
      return;
    }

    const dir = currentIndex > prev ? 1 : -1;
    const prevEl = slideRefs.current[prev];
    const currEl = slideRefs.current[currentIndex];

    if (!prevEl || !currEl) return;

    // Position incoming slide off-screen
    gsap.set(currEl, { x: `${dir * 100}%`, zIndex: 1, autoAlpha: 1 });
    // Slide out previous
    gsap.to(prevEl, { x: `${-dir * 100}%`, duration: 0.35, ease: 'expo.out', zIndex: 0,
      onComplete: () => { gsap.set(prevEl, { autoAlpha: 0 }); } });
    // Slide in current
    gsap.to(currEl, { x: '0%', duration: 0.35, ease: 'expo.out' });

    prevIndexRef.current = currentIndex;
  }, [currentIndex]);

  // Init: position all slides correctly on first mount
  useEffect(() => {
    slideRefs.current.forEach((el, i) => {
      if (!el) return;
      if (i === currentIndex) {
        gsap.set(el, { x: '0%', zIndex: 1, autoAlpha: 1 });
      } else {
        gsap.set(el, { x: i < currentIndex ? '-100%' : '100%', zIndex: 0, autoAlpha: 0 });
      }
    });
    prevIndexRef.current = currentIndex;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.length]);

  const goToPrevious = () => {
    if (currentIndex > 0) onIndexChange(currentIndex - 1);
  };

  const goToNext = () => {
    if (currentIndex < images.length - 1) onIndexChange(currentIndex + 1);
  };

  const goToIndex = (index: number) => onIndexChange(index);

  // Pointer events for swipe detection
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    pointerStartX.current = e.clientX;
    pointerMoved.current = false;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (Math.abs(e.clientX - pointerStartX.current) > 5) {
      pointerMoved.current = true;
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const delta = e.clientX - pointerStartX.current;
    if (Math.abs(delta) > 50) {
      if (delta < 0) goToNext();
      else goToPrevious();
    } else if (!pointerMoved.current) {
      onImageClick?.();
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col">
      {/* Gallery container */}
      <div
        className="relative flex-1 overflow-hidden bg-[#141112] cursor-pointer"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {/* All slides – positioned absolutely, GSAP controls visibility/translate */}
        {images.map((src, index) => (
          <div
            key={index}
            ref={(el) => { slideRefs.current[index] = el; }}
            className="absolute inset-0"
            style={{ opacity: 0 }}
          >
            <Img
              src={src}
              alt={`${altPrefix} ${index + 1}`}
              loading={index === 0 ? 'eager' : 'lazy'}
              className="w-full h-full object-contain"
            />
          </div>
        ))}

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
              disabled={currentIndex === 0}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-[#EAE2E6]/[0.08] hover:bg-[#EAE2E6]/[0.15] border border-[#EAE2E6]/15 disabled:opacity-30 disabled:cursor-not-allowed text-[#EAE2E6]/70 hover:text-[#EAE2E6] flex items-center justify-center transition-all duration-200"
              aria-label="Previous image"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); goToNext(); }}
              disabled={currentIndex === images.length - 1}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-[#EAE2E6]/[0.08] hover:bg-[#EAE2E6]/[0.15] border border-[#EAE2E6]/15 disabled:opacity-30 disabled:cursor-not-allowed text-[#EAE2E6]/70 hover:text-[#EAE2E6] flex items-center justify-center transition-all duration-200"
              aria-label="Next image"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          </>
        )}

        {/* Zoom hint */}
        {onImageClick && (
          <div className="absolute bottom-4 right-4 z-10 bg-[#191516]/80 border border-[#EAE2E6]/10 px-3 py-2 flex items-center gap-2 text-[#EAE2E6]/60 text-xs sm:text-sm pointer-events-none">
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
              className={`transition-all duration-300 ${index === currentIndex
                  ? 'w-8 h-[3px] bg-[#EAE2E6]/70'
                  : 'w-3 h-[3px] bg-[#EAE2E6]/20 hover:bg-[#EAE2E6]/40'
                }`}
              aria-label={`Go to image ${index + 1}`}
              aria-current={index === currentIndex ? 'true' : 'false'}
            />
          ))}
        </div>
      )}

      {/* Counter */}
      {images.length > 1 && (
        <div className="absolute top-4 right-4 z-10 bg-[#191516]/80 border border-[#EAE2E6]/10 px-3 py-1 text-[#EAE2E6]/60 text-xs font-jetbrains">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
};

export default SwipeableGallery;


