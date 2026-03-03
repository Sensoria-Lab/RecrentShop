'use client';
import React from 'react';

interface QuantitySelectorProps {
  quantity: number;
  onChange: (quantity: number) => void;
}

/**
 * Quantity selector component
 * Used in ProductPage for selecting item quantity
 */
const QuantitySelector: React.FC<QuantitySelectorProps> = ({ quantity, onChange }) => {
  return (
    <div className="flex items-center gap-3 sm:gap-4 bg-[#EAE2E6]/[0.05] border border-[#EAE2E6]/10 px-4 h-11">
      <button
        onClick={() => onChange(Math.max(1, quantity - 1))}
        className="text-[#EAE2E6] font-manrope font-semibold text-base sm:text-lg hover:text-[#EAE2E6]/60 active:scale-95 transition-all"
      >
        -
      </button>
      <span className="text-[#EAE2E6] font-manrope font-semibold text-base sm:text-lg min-w-[1.5rem] text-center">
        {quantity}
      </span>
      <button
        onClick={() => onChange(quantity + 1)}
        className="text-[#EAE2E6] font-manrope font-semibold text-base sm:text-lg hover:text-[#EAE2E6]/60 active:scale-95 transition-all"
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;

