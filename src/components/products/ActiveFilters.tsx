'use client';
import React from 'react';
import { X } from 'lucide-react';

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
        <span className="font-jetbrains text-[9px] tracking-[0.2em] uppercase text-[#EAE2E6]/40 mr-2">
          Найдено: <span className="text-[#EAE2E6]/70 font-bold">{totalResults}</span>
        </span>

        {/* Active filter badges */}
        {filters.map((filter, index) => (
          <button
            key={`${filter.type}-${filter.value}-${index}`}
            onClick={() => onRemove(filter.type, filter.value)}
            className="group flex items-center gap-1.5 px-3 py-1.5 bg-[#EAE2E6]/[0.07] hover:bg-[#EAE2E6]/[0.12] border border-[#EAE2E6]/15 hover:border-[#EAE2E6]/25 transition-all font-jetbrains text-[10px] tracking-[0.1em] text-[#EAE2E6]/70 hover:text-[#EAE2E6]"
          >
            <span>{filter.label}</span>
            <X className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
          </button>
        ))}

        {/* Clear all button */}
        {filters.length > 1 && (
          <button
            onClick={onClearAll}
            className="ml-2 px-3 py-1.5 bg-[#EAE2E6]/[0.05] hover:bg-[#EAE2E6]/10 border border-[#EAE2E6]/10 hover:border-[#EAE2E6]/20 transition-all font-jetbrains text-[10px] tracking-[0.1em] text-[#EAE2E6]/40 hover:text-[#EAE2E6]/70"
          >
            Очистить всё
          </button>
        )}
      </div>
    </div>
  );
};

export default React.memo(ActiveFilters);

