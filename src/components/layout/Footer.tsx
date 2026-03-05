'use client';
import React from 'react';
import { COMPANY_INFO } from '@/src/constants/config';

/**
 * Footer Component
 * Minimal editorial footer with team attribution
 */
const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-0 mt-12 sm:mt-16 pb-20 md:pb-0">
      <div className="w-full border-t border-[var(--rc-border)]">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          {/* Compact Footer */}
          <div className="py-8 sm:py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="font-jetbrains text-[9px] tracking-[0.2em] uppercase text-[var(--rc-fg-muted)]">
              © 2021-{year}
            </p>

            {/* Team Attribution — Single Line */}
            <p className="font-jetbrains text-[10px] sm:text-[11px] tracking-[0.18em] text-[var(--rc-fg-secondary)]">
              <span className="text-[var(--rc-fg)]">sensoria made it.</span>
            </p>

            {/* Legal Info */}
            <p className="font-jetbrains text-[9px] tracking-[0.15em] text-[var(--rc-fg-muted)]">
              {COMPANY_INFO.inn}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

