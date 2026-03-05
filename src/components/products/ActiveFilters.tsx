'use client';
import React from 'react';
import { Icon } from '@/src/components/ui/Icon';

interface ActiveFilter {
  type: 'color' | 'size' | 'clothingType' | 'collection';
  value: string;
  label: string;
}

interface ActiveFiltersProps {
  filters: ActiveFilter[];
  onRemove: (type: ActiveFilter['type'], value: string) => void;
  onClearAll: () => void;
  totalResults: number;
}

/**
 * ActiveFilters Component
 * Displays active filter badges with ability to remove them
 */
const ActiveFilters: React.FC<ActiveFiltersProps> = ({
  filters,
  onRemove,
  onClearAll,
  totalResults
}) => {
  if (filters.length === 0) {
    return null;
  }

  return (
    <div className="mb-4 sm:mb-6 animate-fadeIn">
      <div className="flex flex-wrap items-center gap-2">
        {/* Results count */}
        <span className="font-jetbrains text-[9px] tracking-[0.2em] uppercase text-[var(--rc-fg-muted)] mr-2">
          Найдено: <span className="text-[var(--rc-fg)] font-bold">{totalResults}</span>
        </span>

        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="font-jetbrains text-[9px] tracking-[0.2em] uppercase text-[var(--rc-fg-muted)]">
            Активно:
          </span>
          {filters.map((filter, index) => (
            <React.Fragment key={`${filter.type}-${filter.value}`}>
              <button
                onClick={() => onRemove(filter.type, filter.value)}
                className="group flex items-center gap-1 font-jetbrains text-[10px] tracking-[0.1em] uppercase text-[var(--rc-fg)] hover:text-[var(--red)] transition-colors focus-visible:outline-none"
              >
                <span className="font-bold underline decoration-[var(--rc-fg-muted)] underline-offset-4 group-hover:decoration-[var(--red)]">{filter.label}</span>
                <Icon name="close" size="xs" className="opacity-50 group-hover:opacity-100" />
              </button>
              {index < filters.length - 1 && (
                <span className="text-[var(--rc-fg-subtle)] text-[10px] mx-1">/</span>
              )}
            </React.Fragment>
          ))}
          <button
            onClick={onClearAll}
            className="ml-2 font-jetbrains text-[9px] tracking-[0.2em] uppercase text-[var(--rc-fg-muted)] hover:text-[var(--rc-fg)] transition-colors focus-visible:outline-none"
          >
            [ Очистить ]
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ActiveFilters);


