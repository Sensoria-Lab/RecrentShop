/**
 * Универсальная карточка для информации/контактов
 * Заменяет дублирующиеся ContactCard и InfoCard
 */

import React from 'react';
import { CARD_BASE, ROUNDED_CARD, SHINE_EFFECT, SHINE_GRADIENT, DROP_SHADOW_MEDIUM } from '../../constants/styles';

interface InfoCardProps {
  title: string;
  preview?: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, preview, icon, onClick }) => {
  return (
    <div
      className={`relative ${ROUNDED_CARD} cursor-pointer group ${CARD_BASE}`}
      onClick={onClick}
    >
      {/* Shine effect on hover */}
      <div className={`${SHINE_EFFECT} ${ROUNDED_CARD}`}>
        <div className={SHINE_GRADIENT} />
      </div>

      {/* Content */}
      <div className="relative p-3 sm:p-4 md:p-6 lg:p-7 flex items-center gap-2 sm:gap-3 md:gap-5 lg:gap-6">
        {/* Icon container */}
        <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-md sm:rounded-lg md:rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm flex items-center justify-center border border-white/10 group-hover:scale-110 group-hover:border-white/20 transition-all duration-300">
          <div className="text-white/90 group-hover:text-white transition-colors scale-75 sm:scale-90 md:scale-100">
            {icon}
          </div>
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <h3 className={`text-white font-manrope font-semibold text-sm sm:text-base md:text-lg lg:text-xl group-hover:text-white/90 transition-colors ${DROP_SHADOW_MEDIUM} truncate`}>
            {title}
          </h3>
          {preview && (
            <p className="text-white/60 text-[10px] sm:text-xs md:text-sm mt-0.5 sm:mt-1 group-hover:text-white/70 transition-colors truncate">
              {preview}
            </p>
          )}
        </div>

        {/* Arrow */}
        <div className="flex-shrink-0 transform group-hover:translate-x-1 transition-transform duration-300">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-white/40 group-hover:text-white/80 sm:w-4 sm:h-4 md:w-5 md:h-5">
            <path d="M9 6l6 6-6 6"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
