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
    <div className="flex items-center gap-3 sm:gap-5 md:gap-8 lg:gap-10 bg-gray-800 rounded-md sm:rounded-lg md:rounded-xl px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 lg:py-4">
      <button
        onClick={() => onChange(Math.max(1, quantity - 1))}
        className="text-white font-manrope font-semibold text-base sm:text-lg md:text-xl lg:text-2xl hover:text-gray-300 active:scale-95 transition-all"
      >
        -
      </button>
      <span className="text-white font-manrope font-semibold text-base sm:text-lg md:text-xl lg:text-2xl min-w-[1.5rem] sm:min-w-[2rem] text-center">
        {quantity}
      </span>
      <button
        onClick={() => onChange(quantity + 1)}
        className="text-white font-manrope font-semibold text-base sm:text-lg md:text-xl lg:text-2xl hover:text-gray-300 active:scale-95 transition-all"
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;
