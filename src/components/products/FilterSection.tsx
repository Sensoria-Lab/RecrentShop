'use client';
import React from 'react';
import { Checkbox } from '@/src/components/ui';

interface FilterOption<T> {
  value: T;
  label: string;
  description?: string;
  count?: number;
}

interface FilterSectionProps<T> {
  title: string;
  options: FilterOption<T>[];
  selectedValues: T[];
  onChange: (value: T) => void;
  categoryLabel?: string;
}

function FilterSection<T extends string>({
  title,
  options,
  selectedValues,
  onChange,
  categoryLabel
}: FilterSectionProps<T>) {
  return (
    <div className="pt-5 mb-5 border-t border-[#EAE2E6]/[0.07]">
      {/* Section header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="font-jetbrains text-[8px] tracking-[0.35em] uppercase text-[#EAE2E6]/25 select-none">───</span>
        <span className="font-jetbrains text-[9px] tracking-[0.3em] uppercase text-[#EAE2E6]/50 font-medium">
          {title}
        </span>
        {categoryLabel && (
          <span className="font-jetbrains text-[8px] tracking-[0.2em] uppercase text-[#EAE2E6]/20 ml-auto">
            {categoryLabel}
          </span>
        )}
      </div>

      {/* Options */}
      <div className="flex flex-col gap-[10px]">
        {options.map((option) => {
          const isChecked = selectedValues.includes(option.value);
          const isDisabled = option.count === 0;
          const checkboxId = `filter-${title}-${option.value}`;

          return (
            <label
              key={option.value}
              htmlFor={checkboxId}
              className={`group flex items-center gap-3 cursor-pointer ${isDisabled ? 'opacity-30 cursor-not-allowed' : ''}`}
            >
              <Checkbox
                id={checkboxId}
                checked={isChecked}
                onCheckedChange={() => !isDisabled && onChange(option.value)}
                disabled={isDisabled}
              />
              <span className={`flex-1 flex items-center justify-between gap-2 transition-colors duration-150 ${
                isChecked
                  ? 'text-[#EAE2E6]'
                  : isDisabled
                    ? 'text-[#EAE2E6]/25'
                    : 'text-[#EAE2E6]/50 group-hover:text-[#EAE2E6]/80'
              }`}>
                <span className="flex items-baseline gap-2">
                  <span className="font-jetbrains text-[11px] tracking-[0.08em]">{option.label}</span>
                  {option.description && (
                    <span className="font-jetbrains text-[9px] tracking-[0.12em] text-[#EAE2E6]/30">
                      {option.description}
                    </span>
                  )}
                </span>
                {typeof option.count !== 'undefined' && (
                  <span className={`font-jetbrains text-[8px] tracking-[0.1em] px-1.5 py-px border ${
                    isChecked
                      ? 'border-[#EAE2E6]/30 text-[#EAE2E6]/60 bg-[#EAE2E6]/[0.08]'
                      : 'border-[#EAE2E6]/10 text-[#EAE2E6]/25 bg-transparent'
                  }`}>
                    {option.count}
                  </span>
                )}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

export default React.memo(FilterSection);

