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
    <div className="flex items-center gap-10 bg-gray-800 rounded-xl px-5 py-4">
      <button
        onClick={() => onChange(Math.max(1, quantity - 1))}
        className="text-white font-manrope font-semibold text-2xl hover:text-gray-300 transition-colors"
      >
        -
      </button>
      <span className="text-white font-manrope font-semibold text-2xl min-w-[2rem] text-center">
        {quantity}
      </span>
      <button
        onClick={() => onChange(quantity + 1)}
        className="text-white font-manrope font-semibold text-2xl hover:text-gray-300 transition-colors"
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;
