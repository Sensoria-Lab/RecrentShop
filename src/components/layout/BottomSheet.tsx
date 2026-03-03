'use client';
import React, { useEffect, useRef } from 'react';
import gsap from '@/src/lib/gsap';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  height?: 'auto' | 'half' | 'full';
}

/**
 * BottomSheet Component
 * 
 * Mobile-first bottom sheet/drawer component with:
 * - Swipe to close gesture
 * - Smooth animations
 * - Backdrop click to close
 * - Keyboard accessibility
 * - Flexible height options
 * - iOS-style handle
 * 
 * @param isOpen - Controls visibility
 * @param onClose - Callback when sheet should close
 * @param title - Sheet title
 * @param children - Sheet content
 * @param footer - Optional fixed footer content
 * @param height - Sheet height: 'auto', 'half' (50vh), 'full' (90vh)
 */
const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  height = 'auto'
}) => {
  const sheetRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const dragStartY = useRef(0);
  const dragCurrentY = useRef(0);
  const isDragging = useRef(false);

  // GSAP – animate sheet and backdrop on open/close
  useEffect(() => {
    const backdrop = backdropRef.current;
    const sheet = sheetRef.current;
    if (!backdrop || !sheet) return;

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      gsap.set([backdrop, sheet], { visibility: 'visible' });
      gsap.to(backdrop, { opacity: 1, pointerEvents: 'auto', duration: 0.2, ease: 'power2.out' });
      gsap.to(sheet, { y: '0%', duration: 0.42, ease: 'expo.out' });
      const firstFocusable = sheet.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as HTMLElement;
      setTimeout(() => firstFocusable?.focus(), 50);
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      gsap.to(backdrop, {
        opacity: 0, pointerEvents: 'none', duration: 0.2,
        onComplete: () => { gsap.set(backdrop, { visibility: 'hidden' }); },
      });
      gsap.to(sheet, {
        y: '100%', duration: 0.3, ease: 'power3.in',
        onComplete: () => { gsap.set(sheet, { visibility: 'hidden' }); },
      });
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isOpen]);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Pointer drag-to-close – replaces Framer Motion drag="y"
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = true;
    dragStartY.current = e.clientY;
    dragCurrentY.current = 0;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current || !sheetRef.current) return;
    const delta = e.clientY - dragStartY.current;
    if (delta > 0) {
      dragCurrentY.current = delta;
      gsap.set(sheetRef.current, { y: delta });
    }
  };

  const handlePointerUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const delta = dragCurrentY.current;
    if (delta > 100) {
      onClose();
    } else {
      gsap.to(sheetRef.current, { y: 0, duration: 0.3, ease: 'expo.out' });
    }
  };

  const heightClasses = {
    auto: 'max-h-[85vh]',
    half: 'h-[50vh]',
    full: 'h-[90vh]'
  };

  return (
    <>
      {/* Backdrop – always mounted */}
      <div
        ref={backdropRef}
        className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        style={{ visibility: 'hidden', opacity: 0, pointerEvents: 'none' }}
      />

      {/* Bottom Sheet – always mounted */}
      <div
        ref={sheetRef}
        className={`fixed bottom-0 left-0 right-0 z-50 ${heightClasses[height]} bg-[#191516] border-t border-[#EAE2E6]/[0.07] shadow-2xl flex flex-col`}
        role="dialog"
        aria-labelledby="bottom-sheet-title"
        aria-modal="true"
        style={{ transform: 'translateY(100%)', visibility: 'hidden' }}
      >
        {/* Drag Handle */}
        <div
          className="flex justify-center py-3 cursor-grab active:cursor-grabbing touch-none select-none"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          <div className="w-12 h-[3px] bg-[#EAE2E6]/20" />
        </div>

            {/* Header */}
            <div className="flex items-center justify-between px-6 pb-4 border-b border-white/10">
              <h2 id="bottom-sheet-title" className="text-xl font-bold text-[#EAE2E6]">
                {title}
              </h2>
              <button
                onClick={onClose}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center bg-[#EAE2E6]/[0.05] hover:bg-[#EAE2E6]/10 active:bg-[#EAE2E6]/15 text-[#EAE2E6]/50 hover:text-[#EAE2E6] transition-all"
                aria-label="Закрыть"
              >
                <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar">
              {children}
            </div>

            {/* Footer - с отступом для BottomNavigation */}
            {footer && (
              <div className="border-t border-white/10 bg-black/50 px-6 py-4 pb-20 md:pb-4">
                {footer}
              </div>
            )}
      </div>
    </>
  );
};

export default BottomSheet;

