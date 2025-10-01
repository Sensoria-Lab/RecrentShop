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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-3xl max-h-[85vh] bg-gradient-to-br from-zinc-900/95 to-zinc-950/95 rounded-2xl shadow-2xl border border-white/10 flex flex-col overflow-hidden">
        {/* Header with close button */}
        {title ? (
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <h2 className="text-2xl font-bold text-white text-elevated">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg"
              aria-label="Закрыть"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg bg-black/30 backdrop-blur-sm"
              aria-label="Закрыть"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 text-white/90 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
