'use client';
import React, { useState } from 'react';
import FilterSection from './FilterSection';
import type {
  SortOption,
  SizeFilterValue,
  ClothingTypeFilterValue,
  CollectionFilterValue,
  CategoryFilter
} from '@/src/types/product';

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
  { value: 'rating', label: 'Рейтинг' },
  { value: 'price-asc', label: 'Цена ↑' },
  { value: 'price-desc', label: 'Цена ↓' },
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
  const [priceOpen, setPriceOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const pendingChanges = hasPendingChanges();

  return (
    <div
      className="flex flex-col w-full"
      role="region"
      aria-label="Панель фильтров товаров"
    >
      {/* Mobile-only header */}
      <div className="lg:hidden px-5 py-3.5 border-b border-[var(--rc-border)] flex items-center justify-between mb-2">
        <span className="font-jetbrains text-[9px] tracking-[0.3em] uppercase text-[var(--rc-fg-muted)]">Фильтры</span>
        <button
          onClick={onResetFilters}
          className="font-jetbrains text-[9px] tracking-[0.2em] uppercase text-[var(--rc-fg-subtle)] hover:text-[var(--rc-fg-secondary)] transition-colors duration-150 focus-visible:outline-none"
        >
          Сбросить
        </button>
      </div>

      <div className="p-5 lg:p-0 flex flex-col">

        {/* ── Sort — collapsible */}
        <div className="border-b border-[var(--rc-border)]">
          <button
            onClick={() => setSortOpen((o) => !o)}
            className="w-full flex items-center justify-between py-3 text-left focus-visible:outline-none group"
            aria-expanded={sortOpen}
          >
            <span className="font-jetbrains text-[9px] tracking-[0.28em] uppercase text-[var(--rc-fg-muted)] group-hover:text-[var(--rc-fg-secondary)] transition-colors duration-150">
              Сортировка
            </span>
            <div className="flex items-center gap-2">
              {sortBy !== 'popularity' && (
                <span className="font-jetbrains text-[8px] tracking-[0.1em] uppercase text-[var(--rc-fg-subtle)]">
                  {SORT_OPTIONS.find(o => o.value === sortBy)?.label}
                </span>
              )}
              <svg
                className="w-3 h-3 text-[var(--rc-fg-subtle)] transition-transform duration-200"
                style={{ transform: sortOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>

          <div
            style={{
              maxHeight: sortOpen ? '200px' : '0px',
              overflow: 'hidden',
              transition: 'max-height 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <div className="pb-3 flex flex-wrap gap-1.5">
              {SORT_OPTIONS.map((opt) => {
                const active = sortBy === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => onSortChange(opt.value)}
                    className={`font-jetbrains text-[9px] tracking-[0.15em] uppercase px-3 py-1.5 border transition-all duration-150 focus-visible:outline-none ${active
                        ? 'bg-[var(--rc-fg)] text-[var(--rc-bg)] border-[var(--rc-fg)]'
                        : 'bg-transparent text-[var(--rc-fg-muted)] border-[var(--rc-border)] hover:border-[var(--rc-border-strong)] hover:text-[var(--rc-fg-secondary)]'
                      }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Collection */}
        <FilterSection
          title="Коллекция"
          options={[
            { value: 'Geoid', label: 'Geoid', count: getFilterCounts.getCountForFilter('collection', 'Geoid') },
            { value: 'Pro Speed', label: 'Pro Speed', count: getFilterCounts.getCountForFilter('collection', 'Pro Speed') },
            { value: 'Logo Blue', label: 'Logo Blue', count: getFilterCounts.getCountForFilter('collection', 'Logo Blue') },
            { value: 'Logo Red', label: 'Logo Red', count: getFilterCounts.getCountForFilter('collection', 'Logo Red') },
            { value: 'Serpents', label: 'Serpents', count: getFilterCounts.getCountForFilter('collection', 'Serpents') },
          ]}
          selectedValues={pendingCollectionFilter}
          onChange={(value) => onToggleFilter(value, pendingCollectionFilter, 'SET_PENDING_COLLECTION_FILTER')}
          defaultOpen={pendingCollectionFilter.length > 0}
        />

        {/* ── Mousepad size */}
        {(categoryFilter === 'mousepads' || categoryFilter === 'all') && (
          <FilterSection
            title="Размер"
            categoryLabel="Коврики"
            options={[
              { value: 'L-pad', label: 'L', description: '450 × 400 мм', count: getFilterCounts.getCountForFilter('size', 'L-pad') },
              { value: 'XL-pad', label: 'XL', description: '900 × 400 мм', count: getFilterCounts.getCountForFilter('size', 'XL-pad') },
            ]}
            selectedValues={pendingSizeFilter}
            onChange={(value) => onToggleFilter(value, pendingSizeFilter, 'SET_PENDING_SIZE_FILTER')}
            defaultOpen={pendingSizeFilter.length > 0}
          />
        )}

        {/* ── Clothing type */}
        {(categoryFilter === 'tshirt' || categoryFilter === 'hoodie' || categoryFilter === 'sleeve' || categoryFilter === 'all') && (
          <FilterSection
            title="Тип одежды"
            options={[
              { value: 'hoodie', label: 'Худи', count: getFilterCounts.getCountForFilter('clothingType', 'hoodie') },
              { value: 'tshirt', label: 'Футболки', count: getFilterCounts.getCountForFilter('clothingType', 'tshirt') },
              { value: 'sleeve', label: 'Рукава', count: getFilterCounts.getCountForFilter('clothingType', 'sleeve') },
            ]}
            selectedValues={pendingClothingTypeFilter}
            onChange={(value) => onToggleFilter(value, pendingClothingTypeFilter, 'SET_PENDING_CLOTHING_TYPE_FILTER')}
            defaultOpen={pendingClothingTypeFilter.length > 0}
          />
        )}

        {/* ── Price — collapsible */}
        <div className="border-b border-[var(--rc-border)] last:border-b-0">
          <button
            onClick={() => setPriceOpen((o) => !o)}
            className="w-full flex items-center justify-between py-3 text-left focus-visible:outline-none group"
            aria-expanded={priceOpen}
          >
            <span className="font-jetbrains text-[9px] tracking-[0.28em] uppercase text-[var(--rc-fg-muted)] group-hover:text-[var(--rc-fg-secondary)] transition-colors duration-150">
              Цена
            </span>
            <div className="flex items-center gap-2">
              {priceRange[1] < 10000 && (
                <span className="font-jetbrains text-[8px] tracking-[0.1em] text-[var(--rc-fg-subtle)] tabular-nums">
                  до {priceRange[1].toLocaleString('ru')} ₽
                </span>
              )}
              <svg
                className="w-3 h-3 text-[var(--rc-fg-subtle)] transition-transform duration-200"
                style={{ transform: priceOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>

          <div
            style={{
              maxHeight: priceOpen ? '120px' : '0px',
              overflow: 'hidden',
              transition: 'max-height 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <div className="pb-4">
              <div className="flex items-center justify-between mb-3">
                <span className="font-jetbrains text-[8px] tracking-[0.1em] text-[var(--rc-fg-subtle)]">0 ₽</span>
                <span className="font-jetbrains text-[10px] tracking-[0.1em] text-[var(--rc-fg)] font-bold tabular-nums">
                  {priceRange[1].toLocaleString('ru')} ₽
                </span>
              </div>
              <div className="relative">
                <div className="h-px bg-[var(--rc-border)] w-full" />
                <div
                  className="absolute top-0 left-0 h-px bg-[var(--rc-fg)] transition-all duration-150"
                  style={{ width: `${(priceRange[1] / 10000) * 100}%` }}
                />
                <input
                  type="range"
                  min="0"
                  max="10000"
                  step="100"
                  value={priceRange[1]}
                  onChange={(e) => onPriceRangeChange([0, parseInt(e.target.value)])}
                  className="absolute inset-0 w-full opacity-0 cursor-pointer h-5 -top-2.5"
                  aria-label="Максимальная цена"
                />
              </div>
              <div className="flex justify-between mt-2">
                <span className="font-jetbrains text-[8px] tracking-[0.08em] text-[var(--rc-fg-subtle)]">0</span>
                <span className="font-jetbrains text-[8px] tracking-[0.08em] text-[var(--rc-fg-subtle)]">10 000 ₽</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Actions */}
        {(pendingChanges) && (
          <div className="pt-4 flex flex-col gap-2">
            <button
              onClick={onApplyFilters}
              className="w-full bg-[var(--rc-fg)] hover:opacity-90 text-[var(--rc-bg)] font-jetbrains text-[9px] tracking-[0.2em] uppercase py-3 transition-opacity duration-150 focus-visible:outline-none flex items-center justify-center gap-2"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Применить
            </button>
          </div>
        )}

        {/* Reset — always visible on desktop */}
        <div className="pt-3 pb-1">
          <button
            onClick={onResetFilters}
            className="hidden lg:block w-full text-[var(--rc-fg-subtle)] hover:text-[var(--rc-fg-secondary)] font-jetbrains text-[8px] tracking-[0.2em] uppercase py-1.5 transition-colors duration-150 focus-visible:outline-none text-center"
          >
            Сбросить все
          </button>
        </div>

      </div>
    </div>
  );
};

export default React.memo(FiltersPanel);
