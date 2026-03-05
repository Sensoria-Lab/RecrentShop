'use client';
import React, { useEffect } from 'react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  id: string;
  message: string;
  type?: ToastType;
  duration?: number;
  onClose: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({
  id,
  message,
  type = 'info',
  duration = 3000,
  onClose
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const icons = {
    success: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    error: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
    info: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    warning: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    )
  };

  const colors = {
    success: 'bg-[var(--rc-bg-elevated)] border-[var(--rc-border)]',
    error: 'bg-[var(--rc-bg-elevated)] border-[var(--rc-border)]',
    info: 'bg-[var(--rc-bg-elevated)] border-[var(--rc-border)]',
    warning: 'bg-[var(--rc-bg-elevated)] border-[var(--rc-border)]'
  };

  return (
    <div
      className={`
        ${colors[type]}
        border
        shadow-2xl
        p-4
        flex items-center gap-3
        min-w-[300px]
        max-w-[400px]
        animate-slide-in-right
        transition-transform
        duration-200
      `}
    >
      {/* Icon */}
      <div className="flex-shrink-0 text-[var(--rc-fg-secondary)]">
        {icons[type]}
      </div>

      {/* Message */}
      <p className="flex-1 text-[var(--rc-fg)] font-jetbrains text-[11px] tracking-[0.05em]">
        {message}
      </p>

      {/* Close button */}
      <button
        onClick={() => onClose(id)}
        className="flex-shrink-0 text-[var(--rc-fg-muted)] hover:text-[var(--rc-fg)] transition-colors p-1 hover:bg-[var(--rc-fg-ghost)]"
        aria-label="Закрыть"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Progress bar */}
      <div
        className="absolute bottom-0 left-0 h-[2px] bg-[var(--rc-fg-subtle)]"
        style={{
          animation: `shrink ${duration}ms linear forwards`
        }}
      />
    </div>
  );
};

export default Toast;

