import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';

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

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      
      // Focus first focusable element
      const firstFocusable = sheetRef.current?.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as HTMLElement;
      firstFocusable?.focus();
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isOpen]);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Swipe to close handler
  const handleDragEnd = (event: any, info: PanInfo) => {
    // Close if dragged down more than 100px or velocity is high enough
    if (info.offset.y > 100 || info.velocity.y > 500) {
      onClose();
    }
  };

  const heightClasses = {
    auto: 'max-h-[85vh]',
    half: 'h-[50vh]',
    full: 'h-[90vh]'
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Bottom Sheet */}
          <motion.div
            ref={sheetRef}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{
              type: 'spring',
              damping: 30,
              stiffness: 300
            }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.5 }}
            onDragEnd={handleDragEnd}
            className={`fixed bottom-0 left-0 right-0 z-50 ${heightClasses[height]} bg-black/95 backdrop-blur-2xl border-t border-white/10 shadow-2xl flex flex-col rounded-t-3xl`}
            role="dialog"
            aria-labelledby="bottom-sheet-title"
            aria-modal="true"
          >
            {/* Drag Handle */}
            <div className="flex justify-center py-3 cursor-grab active:cursor-grabbing">
              <div className="w-12 h-1.5 bg-white/30 rounded-full" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-6 pb-4 border-b border-white/10">
              <h2 id="bottom-sheet-title" className="text-xl font-bold text-white">
                {title}
              </h2>
              <button
                onClick={onClose}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 active:bg-white/15 transition-all"
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
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BottomSheet;
