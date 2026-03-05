'use client';
import React, { useState, useRef, useEffect } from 'react';

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
  defaultOpen?: boolean;
}

function FilterSection<T extends string>({
  title,
  options,
  selectedValues,
  onChange,
  categoryLabel,
  defaultOpen = false,
}: FilterSectionProps<T>) {
  const [open, setOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number>(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [options, selectedValues]);

  const activeCount = selectedValues.length;

  return (
    <div className="border-b border-[var(--rc-border)] last:border-b-0">
      {/* Section toggle header */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between py-3 text-left focus-visible:outline-none group"
        aria-expanded={open}
      >
        <div className="flex items-center gap-2.5">
          <span className="font-jetbrains text-[9px] tracking-[0.28em] uppercase text-[var(--rc-fg-muted)] group-hover:text-[var(--rc-fg-secondary)] transition-colors duration-150">
            {title}
          </span>
          {categoryLabel && (
            <span className="font-jetbrains text-[8px] tracking-[0.12em] uppercase text-[var(--rc-fg-subtle)]">
              · {categoryLabel}
            </span>
          )}
          {activeCount > 0 && (
            <span className="bg-[var(--rc-fg)] text-[var(--rc-bg)] font-jetbrains text-[8px] px-1.5 py-0.5 leading-none tabular-nums">
              {activeCount}
            </span>
          )}
        </div>

        {/* Chevron */}
        <svg
          className="w-3 h-3 text-[var(--rc-fg-subtle)] flex-shrink-0 transition-transform duration-200"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Collapsible content */}
      <div
        style={{
          maxHeight: open ? `${contentHeight + 24}px` : '0px',
          overflow: 'hidden',
          transition: 'max-height 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div ref={contentRef} className="pb-3 flex flex-col">
          {options.map((option) => {
            const isChecked = selectedValues.includes(option.value);
            const isDisabled = option.count === 0;
            const checkboxId = `filter-${title}-${option.value}`;

            return (
              <label
                key={option.value}
                htmlFor={checkboxId}
                className={`group flex items-center justify-between py-2 transition-colors duration-150 ${isDisabled ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id={checkboxId}
                    checked={isChecked}
                    onChange={() => !isDisabled && onChange(option.value)}
                    disabled={isDisabled}
                    className="sr-only"
                  />
                  {/* Custom checkbox */}
                  <div
                    className={`w-3 h-3 border flex items-center justify-center flex-shrink-0 transition-all duration-150 ${isChecked
                        ? 'bg-[var(--rc-fg)] border-[var(--rc-fg)]'
                        : 'border-[var(--rc-border-strong)] group-hover:border-[var(--rc-fg-secondary)]'
                      }`}
                  >
                    {isChecked && (
                      <svg className="w-1.5 h-1.5 text-[var(--rc-bg)]" fill="none" viewBox="0 0 8 8" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M1 4l2 2 4-4" />
                      </svg>
                    )}
                  </div>

                  <div className="flex flex-col gap-0.5">
                    <span className={`font-jetbrains text-[10px] tracking-[0.1em] uppercase transition-colors duration-150 ${isChecked
                        ? 'text-[var(--rc-fg)] font-bold'
                        : isDisabled
                          ? 'text-[var(--rc-fg-subtle)]'
                          : 'text-[var(--rc-fg-secondary)] group-hover:text-[var(--rc-fg)]'
                      }`}>
                      {option.label}
                    </span>
                    {option.description && (
                      <span className="font-jetbrains text-[8px] tracking-[0.08em] text-[var(--rc-fg-subtle)]">
                        {option.description}
                      </span>
                    )}
                  </div>
                </div>

                {typeof option.count !== 'undefined' && (
                  <span className={`font-jetbrains text-[9px] tracking-[0.06em] tabular-nums flex-shrink-0 ${isChecked ? 'text-[var(--rc-fg-secondary)]' : 'text-[var(--rc-fg-subtle)]'
                    }`}>
                    {option.count}
                  </span>
                )}
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default React.memo(FilterSection);
