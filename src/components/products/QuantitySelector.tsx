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
    <div className="flex items-center gap-3 sm:gap-4 bg-[var(--rc-fg-ghost)] border border-[var(--rc-border)] px-4 h-11">
      <button
        onClick={() => onChange(Math.max(1, quantity - 1))}
        className="text-[var(--rc-fg)] font-manrope font-semibold text-base sm:text-lg hover:text-[var(--rc-fg)] active:scale-95 transition-all"
      >
        -
      </button>
      <span className="text-[var(--rc-fg)] font-manrope font-semibold text-base sm:text-lg min-w-[1.5rem] text-center">
        {quantity}
      </span>
      <button
        onClick={() => onChange(quantity + 1)}
        className="text-[var(--rc-fg)] font-manrope font-semibold text-base sm:text-lg hover:text-[var(--rc-fg)] active:scale-95 transition-all"
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;

