'use client';
import React from 'react';
import FilterSection from './FilterSection';
import type {
  SortOption,
  SizeFilterValue,
  ClothingTypeFilterValue,
  CollectionFilterValue,
  CategoryFilter
} from '@/src/types';

interface FiltersPanelProps {
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  categoryFilter: CategoryFilter;
  pendingCollectionFilter: CollectionFilterValue[];
  pendingSizeFilter: SizeFilterValue[];
  pendingClothingTypeFilter: ClothingTypeFilterValue[];
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  onToggleFilter: <T extends string>(
    value: T,
    currentValues: T[],
    actionType:
      | 'SET_PENDING_COLOR_FILTER'
      | 'SET_PENDING_SIZE_FILTER'
      | 'SET_PENDING_CLOTHING_TYPE_FILTER'
      | 'SET_PENDING_COLLECTION_FILTER'
  ) => void;
  onApplyFilters: () => void;
  onResetFilters: () => void;
  hasPendingChanges: () => boolean;
  getFilterCounts: {
    getCountForFilter: (filterType: 'color' | 'size' | 'clothingType' | 'collection', value: string) => number;
  };
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'popularity', label: 'Популярное' },
  { value: 'rating',     label: 'Рейтинг'    },
  { value: 'price-asc',  label: 'Цена ↑'     },
  { value: 'price-desc', label: 'Цена ↓'     },
];

const FiltersPanel: React.FC<FiltersPanelProps> = ({
  sortBy,
  onSortChange,
  categoryFilter,
  pendingCollectionFilter,
  pendingSizeFilter,
  pendingClothingTypeFilter,
  priceRange,
  onPriceRangeChange,
  onToggleFilter,
  onApplyFilters,
  onResetFilters,
  hasPendingChanges,
  getFilterCounts,
}) => {
  return (
    <div
      className="bg-[#1E1A1B] border border-[#EAE2E6]/[0.07] lg:sticky lg:top-28 overflow-hidden"
      role="region"
      aria-label="Панель фильтров товаров"
    >
      {/* Panel header */}
      <div className="px-5 py-4 border-b border-[#EAE2E6]/[0.07] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-jetbrains text-[8px] tracking-[0.35em] uppercase text-[#EAE2E6]/25 select-none">───</span>
          <span className="font-jetbrains text-[9px] tracking-[0.3em] uppercase text-[#EAE2E6]/40">Фильтры</span>
        </div>
        <button
          onClick={onResetFilters}
          className="font-jetbrains text-[8px] tracking-[0.2em] uppercase text-[#EAE2E6]/25 hover:text-[#EAE2E6]/60 transition-colors duration-150 focus:outline-none"
        >
          Сбросить
        </button>
      </div>

      <div className="px-5 py-5">

        {/* Sort — 2×2 grid of flat toggle buttons */}
        <div className="mb-5">
          <span className="font-jetbrains text-[8px] tracking-[0.3em] uppercase text-[#EAE2E6]/30 block mb-3">
            Сортировка
          </span>
          <div className="grid grid-cols-2 gap-[1px] bg-[#EAE2E6]/[0.07]">
            {SORT_OPTIONS.map((opt) => {
              const active = sortBy === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => onSortChange(opt.value)}
                  className={`font-jetbrains text-[9px] tracking-[0.12em] uppercase py-2.5 px-2 text-center transition-all duration-150 focus:outline-none ${
                    active
                      ? 'bg-[#EAE2E6] text-[#191516]'
                      : 'bg-[#1E1A1B] text-[#EAE2E6]/35 hover:text-[#EAE2E6]/70 hover:bg-[#EAE2E6]/[0.05]'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Collection */}
        <FilterSection
          title="Коллекция"
          options={[
            { value: 'Geoid',     label: 'Geoid',     count: getFilterCounts.getCountForFilter('collection', 'Geoid')     },
            { value: 'Pro Speed', label: 'Pro Speed', count: getFilterCounts.getCountForFilter('collection', 'Pro Speed') },
            { value: 'Logo Blue', label: 'Logo Blue', count: getFilterCounts.getCountForFilter('collection', 'Logo Blue') },
            { value: 'Logo Red',  label: 'Logo Red',  count: getFilterCounts.getCountForFilter('collection', 'Logo Red')  },
            { value: 'Serpents',  label: 'Serpents',  count: getFilterCounts.getCountForFilter('collection', 'Serpents')  },
          ]}
          selectedValues={pendingCollectionFilter}
          onChange={(value) => onToggleFilter(value, pendingCollectionFilter, 'SET_PENDING_COLLECTION_FILTER')}
        />

        {/* Mousepad size */}
        {(categoryFilter === 'mousepads' || categoryFilter === 'all') && (
          <FilterSection
            title="Размер"
            categoryLabel="Коврики"
            options={[
              { value: 'L-pad',  label: 'L',  description: '450×400 мм', count: getFilterCounts.getCountForFilter('size', 'L-pad')  },
              { value: 'XL-pad', label: 'XL', description: '900×400 мм', count: getFilterCounts.getCountForFilter('size', 'XL-pad') },
            ]}
            selectedValues={pendingSizeFilter}
            onChange={(value) => onToggleFilter(value, pendingSizeFilter, 'SET_PENDING_SIZE_FILTER')}
          />
        )}

        {/* Clothing type */}
        {(categoryFilter === 'tshirt' || categoryFilter === 'hoodie' || categoryFilter === 'sleeve' || categoryFilter === 'all') && (
          <FilterSection
            title="Тип одежды"
            options={[
              { value: 'hoodie', label: 'Худи',     count: getFilterCounts.getCountForFilter('clothingType', 'hoodie') },
              { value: 'tshirt', label: 'Футболки', count: getFilterCounts.getCountForFilter('clothingType', 'tshirt') },
              { value: 'sleeve', label: 'Рукава',   count: getFilterCounts.getCountForFilter('clothingType', 'sleeve') },
            ]}
            selectedValues={pendingClothingTypeFilter}
            onChange={(value) => onToggleFilter(value, pendingClothingTypeFilter, 'SET_PENDING_CLOTHING_TYPE_FILTER')}
          />
        )}

        {/* Price range */}
        <div className="pt-5 border-t border-[#EAE2E6]/[0.07]">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-jetbrains text-[8px] tracking-[0.35em] uppercase text-[#EAE2E6]/25 select-none">───</span>
            <span className="font-jetbrains text-[9px] tracking-[0.3em] uppercase text-[#EAE2E6]/50">Цена</span>
            <span className="ml-auto font-jetbrains text-[9px] tracking-[0.06em] text-[#EAE2E6]/40">
              до {priceRange[1].toLocaleString('ru')} ₽
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="10000"
            step="100"
            value={priceRange[1]}
            onChange={(e) => onPriceRangeChange([0, parseInt(e.target.value)])}
            className="w-full h-px bg-[#EAE2E6]/15 appearance-none cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:w-[10px]
              [&::-webkit-slider-thumb]:h-[10px]
              [&::-webkit-slider-thumb]:bg-[#EAE2E6]
              [&::-webkit-slider-thumb]:cursor-pointer
              [&::-moz-range-thumb]:w-[10px]
              [&::-moz-range-thumb]:h-[10px]
              [&::-moz-range-thumb]:bg-[#EAE2E6]
              [&::-moz-range-thumb]:border-none
              [&::-moz-range-thumb]:cursor-pointer"
          />
          <div className="flex justify-between mt-2">
            <span className="font-jetbrains text-[8px] tracking-[0.1em] text-[#EAE2E6]/20">0 ₽</span>
            <span className="font-jetbrains text-[8px] tracking-[0.1em] text-[#EAE2E6]/20">10 000 ₽</span>
          </div>
        </div>

        {/* Apply — only visible when there are pending changes */}
        {hasPendingChanges() && (
          <button
            onClick={onApplyFilters}
            className="mt-5 w-full bg-[#EAE2E6] hover:bg-[#EAE2E6]/85 text-[#191516] font-jetbrains text-[10px] tracking-[0.2em] uppercase py-3 transition-all duration-200 focus:outline-none flex items-center justify-center gap-2"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="square" strokeLinejoin="miter" d="M5 13l4 4L19 7" />
            </svg>
            Применить
          </button>
        )}

      </div>
    </div>
  );
};

export default React.memo(FiltersPanel);
