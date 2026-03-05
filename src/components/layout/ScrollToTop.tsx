'use client';

import React, { useState, useEffect } from 'react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button after scrolling down 400px
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Наверх"
      className={`
        fixed bottom-6 right-6 z-50
        w-12 h-12
        bg-[var(--rc-bg-elevated)]
        border border-[var(--rc-border-strong)]
        flex items-center justify-center
        transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
        hover:border-[var(--rc-border-hover)]
        hover:bg-[var(--rc-bg)]
        focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--rc-fg)]
        ${isVisible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'}
      `}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-[var(--rc-fg)] transition-transform duration-200 group-hover:-translate-y-0.5"
      >
        <path d="m18 15-6-6-6 6" />
      </svg>
    </button>
  );
}
