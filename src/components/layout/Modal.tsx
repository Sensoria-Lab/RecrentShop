'use client';
import React, { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 md:p-8 pt-24 sm:pt-28 md:pt-32">
      <div
        className="absolute inset-0 bg-[var(--rc-overlay)]/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-[75vh] bg-[var(--rc-bg-elevated)] border border-[var(--rc-border)] shadow-2xl flex flex-col overflow-hidden">
        {/* Header with close button */}
        {title ? (
          <div className="flex items-center justify-between p-3 sm:p-4 md:p-6 border-b border-[var(--rc-border)]">
            <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-[var(--rc-fg)] pr-2">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="text-[var(--rc-fg-muted)] hover:text-[var(--rc-fg)] transition-colors p-1.5 sm:p-2 hover:bg-[var(--rc-fg-ghost)] flex-shrink-0"
              aria-label="Закрыть"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 z-10">
            <button
              onClick={onClose}
              className="text-[var(--rc-fg-muted)] hover:text-[var(--rc-fg)] transition-colors p-1.5 sm:p-2 hover:bg-[var(--rc-fg-ghost)] bg-[var(--rc-bg-elevated)]"
              aria-label="Закрыть"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 md:p-6 lg:p-8 text-[var(--rc-fg-secondary)] text-xs sm:text-sm md:text-base leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;

