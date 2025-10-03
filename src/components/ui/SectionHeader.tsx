import React from 'react';
import DecryptedText from '../shared/DecryptedText';

interface SectionHeaderProps {
  title: string;
  onShowAll?: () => void;
}

/**
 * Section Header Component
 * Used for product category headers with optional "Show All" button
 */
const SectionHeader: React.FC<SectionHeaderProps> = ({ title, onShowAll }) => (
  <div className="flex items-center justify-between p-4 sm:p-5 md:p-6 border-b border-white/10">
    <div className="min-w-[200px] sm:min-w-[300px]">
      <h2 className="text-white font-manrope font-extrabold text-xl sm:text-2xl md:text-3xl text-left tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
        <DecryptedText
          text={title}
          duration={700}
          delay={100}
          className="text-white font-manrope font-extrabold"
          showAnimation={false}
        />
      </h2>
    </div>
    {onShowAll && (
      <div
        onClick={onShowAll}
        className="flex items-center gap-2 sm:gap-3 group cursor-pointer hover:translate-x-1 transition-transform duration-300"
      >
        <span className="text-white/80 font-manrope font-bold text-sm sm:text-base md:text-lg group-hover:text-white transition-colors">
          Показать все
        </span>
        <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
          <svg width="14" height="10" viewBox="0 0 21 14" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/70 group-hover:text-white sm:w-4 sm:h-3">
            <path d="M14 1l6 6-6 6M1 7h18"/>
          </svg>
        </div>
      </div>
    )}
  </div>
);

export default SectionHeader;
