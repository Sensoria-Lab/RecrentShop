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
        <span className="text-white/80 font-manrope text-sm font-medium mr-2">
          Найдено: <span className="text-white font-semibold">{totalResults}</span>
        </span>

        {/* Active filter badges */}
        {filters.map((filter, index) => (
          <button
            key={`${filter.type}-${filter.value}-${index}`}
            onClick={() => onRemove(filter.type, filter.value)}
            className="group flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 rounded-lg transition-all text-sm font-manrope text-white/90 hover:text-white"
          >
            <span>{filter.label}</span>
            <X className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
          </button>
        ))}

        {/* Clear all button */}
        {filters.length > 1 && (
          <button
            onClick={onClearAll}
            className="ml-2 px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 hover:border-red-500/50 rounded-lg transition-all text-sm font-manrope text-red-300 hover:text-red-200"
          >
            Очистить всё
          </button>
        )}
      </div>
    </div>
  );
};

export default ActiveFilters;
