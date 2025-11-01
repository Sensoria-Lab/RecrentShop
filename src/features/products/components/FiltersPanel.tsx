import React from 'react';
import FilterSection from './FilterSection';
import type {
  SortOption,
  SizeFilterValue,
  ClothingTypeFilterValue,
  CollectionFilterValue,
  CategoryFilter
} from '../types';

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
    actionType: string
  ) => void;
  onApplyFilters: () => void;
  onResetFilters: () => void;
  hasPendingChanges: () => boolean;
  getFilterCounts: {
    getCountForFilter: (filterType: 'color' | 'size' | 'clothingType' | 'collection', value: string) => number;
  };
}

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
  getFilterCounts
}) => {
  return (
    <div className="bg-black/40 border border-white/20 rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 lg:sticky lg:top-28 overflow-hidden" role="region" aria-label="Панель фильтров товаров">
      <h2 className="text-white font-manrope font-bold text-base sm:text-lg md:text-xl mb-3 sm:mb-4 md:mb-6">Фильтры</h2>

      {/* Sort By */}
      <div className="mb-4 sm:mb-6">
        <label className="text-white/80 font-manrope text-xs sm:text-sm mb-2 block">Сортировка</label>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="w-full form-control"
          style={{ colorScheme: 'dark' }}
        >
          <option value="popularity" className="bg-black text-white">По популярности</option>
          <option value="rating" className="bg-black text-white">По рейтингу</option>
          <option value="price-asc" className="bg-black text-white">Цена: по возрастанию</option>
          <option value="price-desc" className="bg-black text-white">Цена: по убыванию</option>
        </select>
      </div>

      {/* Collection Filter */}
      <FilterSection
        title="Коллекция"
        options={[
          { value: 'Geoid', label: 'Geoid', count: getFilterCounts.getCountForFilter('collection', 'Geoid') },
          { value: 'Pro Speed', label: 'Pro Speed', count: getFilterCounts.getCountForFilter('collection', 'Pro Speed') },
          { value: 'Logo Blue', label: 'Logo Blue', count: getFilterCounts.getCountForFilter('collection', 'Logo Blue') },
          { value: 'Logo Red', label: 'Logo Red', count: getFilterCounts.getCountForFilter('collection', 'Logo Red') },
          { value: 'Serpents', label: 'Serpents', count: getFilterCounts.getCountForFilter('collection', 'Serpents') }
        ]}
        selectedValues={pendingCollectionFilter}
        onChange={(value) => onToggleFilter(value, pendingCollectionFilter, 'SET_PENDING_COLLECTION_FILTER')}
      />

      {/* Size Filter - Mousepad sizes */}
      {(categoryFilter === 'mousepads' || categoryFilter === 'all') && (
        <FilterSection
          title="Размер"
          categoryLabel="Коврики для мыши"
          options={[
            { value: 'L-pad', label: 'L', description: '450x400 мм', count: getFilterCounts.getCountForFilter('size', 'L-pad') },
            { value: 'XL-pad', label: 'XL', description: '900x400 мм', count: getFilterCounts.getCountForFilter('size', 'XL-pad') }
          ]}
          selectedValues={pendingSizeFilter}
          onChange={(value) => onToggleFilter(value, pendingSizeFilter, 'SET_PENDING_SIZE_FILTER')}
        />
      )}

      {/* Clothing Type Filter */}
      {(categoryFilter === 'tshirt' || categoryFilter === 'hoodie' || categoryFilter === 'sleeve' || categoryFilter === 'all') && (
        <FilterSection
          title="Тип одежды"
          options={[
            { value: 'hoodie', label: 'Худи', count: getFilterCounts.getCountForFilter('clothingType', 'hoodie') },
            { value: 'tshirt', label: 'Футболки', count: getFilterCounts.getCountForFilter('clothingType', 'tshirt') },
            { value: 'sleeve', label: 'Рукава', count: getFilterCounts.getCountForFilter('clothingType', 'sleeve') }
          ]}
          selectedValues={pendingClothingTypeFilter}
          onChange={(value) => onToggleFilter(value, pendingClothingTypeFilter, 'SET_PENDING_CLOTHING_TYPE_FILTER')}
        />
      )}

      {/* Price Range */}
      <div className="mb-4 sm:mb-6">
        <label className="text-white/80 font-manrope text-xs sm:text-sm mb-2 block">
          Цена: {priceRange[0]} - {priceRange[1]} р.
        </label>
        <input
          type="range"
          min="0"
          max="10000"
          step="100"
          value={priceRange[1]}
          onChange={(e) => onPriceRangeChange([0, parseInt(e.target.value)])}
          className="w-full form-control"
        />
      </div>

      {/* Apply Filters Button - показываем только если есть изменения */}
      {hasPendingChanges() && (
        <button
          onClick={onApplyFilters}
          className="w-full bg-gradient-to-r from-white to-gray-100 hover:from-gray-100 hover:to-white text-black font-manrope font-bold py-3 text-sm sm:text-base rounded-lg transition-all mb-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 animate-fadeIn"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Применить фильтры
        </button>
      )}

      {/* Reset Filters */}
      <button
        onClick={onResetFilters}
        className="w-full bg-white/10 hover:bg-white/20 text-white font-manrope font-medium py-2.5 text-sm sm:text-base rounded-lg transition-all border border-white/10 hover:border-white/30 flex items-center justify-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Сбросить всё
      </button>
    </div>
  );
};

export default React.memo(FiltersPanel);