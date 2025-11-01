import React from 'react';
import { Checkbox } from '../../../shared/ui';

interface FilterOption<T> {
  value: T;
  label: string;
  description?: string;
  count?: number; // количество товаров для этого фильтра
}

interface FilterSectionProps<T> {
  title: string;
  options: FilterOption<T>[];
  selectedValues: T[];
  onChange: (value: T) => void;
  categoryLabel?: string;
}

/**
 * FilterSection Component
 * Reusable component for displaying filter options with checkboxes
 */
function FilterSection<T extends string>({
  title,
  options,
  selectedValues,
  onChange,
  categoryLabel
}: FilterSectionProps<T>) {
  const handleCheckboxChange = (value: T) => {
    onChange(value);
  };

  return (
    <div className="mb-4 sm:mb-6">
      <label className="text-white/80 font-manrope text-xs sm:text-sm mb-3 block font-semibold">
        {title}
      </label>

      <div className="space-y-3">
        {categoryLabel && (
          <p className="text-white/60 font-manrope text-xs mb-2 uppercase tracking-wider">
            {categoryLabel}
          </p>
        )}
        
        <div className="space-y-2 pl-1">
          {options.map((option) => {
            const isChecked = selectedValues.includes(option.value);
            const checkboxId = `filter-${title}-${option.value}`;
            const isDisabled = option.count === 0;
            
            return (
              <div key={option.value} className={`flex items-center gap-3 group ${isDisabled ? 'opacity-40' : ''}`}>
                <Checkbox
                  id={checkboxId}
                  checked={isChecked}
                  onCheckedChange={() => handleCheckboxChange(option.value)}
                  disabled={isDisabled}
                  className="border-white/30 data-[state=checked]:bg-white data-[state=checked]:border-white"
                />
                <label
                  htmlFor={checkboxId}
                  className={`font-manrope text-sm transition-colors flex-1 flex items-center justify-between gap-2 ${
                    isDisabled 
                      ? 'text-white/30 cursor-not-allowed' 
                      : 'text-white/70 hover:text-white cursor-pointer'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="font-medium">{option.label}</span>
                    {option.description && (
                      <span className="text-xs text-white/50">
                        ({option.description})
                      </span>
                    )}
                  </span>
                  {typeof option.count !== 'undefined' && (
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      isDisabled 
                        ? 'bg-white/5 text-white/30' 
                        : 'bg-white/10 text-white/60'
                    }`}>
                      {option.count}
                    </span>
                  )}
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default React.memo(FilterSection);
