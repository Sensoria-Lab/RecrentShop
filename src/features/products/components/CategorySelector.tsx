import React, { useRef, useEffect } from 'react';
import type { CategoryFilter } from '../types';

interface CategorySelectorProps {
  categoryFilter: CategoryFilter;
  onCategoryChange: (category: CategoryFilter) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  categoryFilter,
  onCategoryChange
}) => {
  const categoryButtonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Update animated background position when category changes
  useEffect(() => {
    // This effect ensures the background animation works correctly
  }, [categoryFilter]);

  const categories = [
    { value: 'all', label: 'Все товары' },
    { value: 'mousepads', label: 'Коврики' },
    { value: 'tshirt', label: 'Футболки' },
    { value: 'hoodie', label: 'Худи' },
    { value: 'sleeve', label: 'Рукава' }
  ] as const;

  return (
    <div className="mb-6 sm:mb-8 md:mb-10 flex justify-center content-reveal content-reveal-delay-1 px-2">
      <div className="relative inline-flex flex-wrap justify-center gap-1.5 sm:gap-2 md:gap-3 bg-white/8 border border-white/20 rounded-lg sm:rounded-xl p-1.5 sm:p-2" role="tablist" aria-label="Выбор категории товаров">
        {/* Animated background indicator */}
        <div
          className="absolute bg-white rounded-lg shadow-lg transition-all duration-300 ease-out z-0"
          style={{
            left: categoryButtonRefs.current[categoryFilter]?.offsetLeft ?? 0,
            top: categoryButtonRefs.current[categoryFilter]?.offsetTop ?? 0,
            width: categoryButtonRefs.current[categoryFilter]?.offsetWidth ?? 0,
            height: categoryButtonRefs.current[categoryFilter]?.offsetHeight ?? 0,
          }}
        />

        {categories.map(option => (
          <button
            key={option.value}
            ref={(el) => (categoryButtonRefs.current[option.value] = el)}
            onClick={() => onCategoryChange(option.value)}
            className={`relative z-10 px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-2.5 rounded-md sm:rounded-lg font-manrope font-semibold text-xs sm:text-sm md:text-base transition-colors duration-300 whitespace-nowrap ${
              categoryFilter === option.value
                ? 'text-black'
                : 'text-white/70 hover:text-white'
            }`}
            aria-label={`Выбрать категорию ${option.label}`}
            aria-selected={categoryFilter === option.value}
            role="tab"
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default React.memo(CategorySelector);