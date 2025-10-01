import React from 'react';

interface SectionTitleProps {
  children: React.ReactNode;
  align?: 'left' | 'center';
  underlineWidthClass?: string; // Tailwind width class e.g. w-32
  className?: string;
  decorative?: boolean; // добавляет градиент / свечение
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  children,
  align = 'left',
  underlineWidthClass = 'w-32',
  className = '',
  decorative = false
}) => {
  return (
    <div className={`mb-10 ${align === 'center' ? 'text-center' : ''} ${className}`}>      
      <h2
        className={`font-manrope font-extrabold tracking-tight text-4xl sm:text-5xl leading-tight inline-block relative ${decorative ? 'section-title-glow' : ''}`}
      >
        {children}
      </h2>
      <div className={`${underlineWidthClass} h-px mx-auto ${align === 'left' ? 'ml-0' : ''} mt-4 bg-gradient-to-r from-transparent via-white/40 to-transparent`} />
    </div>
  );
};

export default SectionTitle;
