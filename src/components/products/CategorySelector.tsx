'use client';
import React, { useEffect, useState, useRef } from 'react';
import type { CategoryFilter } from '@/src/types/index';

interface CategorySelectorProps {
  categoryFilter: CategoryFilter;
  onCategoryChange: (category: CategoryFilter) => void;
}

const CATEGORIES = [
  { value: 'all',       label: 'Все'       },
  { value: 'mousepads', label: 'Коврики'   },
  { value: 'tshirt',    label: 'Футболки'  },
  { value: 'hoodie',    label: 'Худи'      },
  { value: 'sleeve',    label: 'Рукава'    },
] as const;

const CategorySelector: React.FC<CategorySelectorProps> = ({
  categoryFilter,
  onCategoryChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({ left: 0, width: 0 });

  useEffect(() => {
    const update = () => {
      const btn = buttonRefs.current[categoryFilter];
      const container = containerRef.current;
      if (!btn || !container) return;
      const containerLeft = container.getBoundingClientRect().left;
      const btnRect = btn.getBoundingClientRect();
      setIndicatorStyle({
        left: btnRect.left - containerLeft,
        width: btnRect.width,
      });
    };
    update();
    window.addEventListener('resize', update, { passive: true });
    return () => window.removeEventListener('resize', update);
  }, [categoryFilter]);

  return (
    <div
      ref={containerRef}
      className="relative flex items-center gap-0 border-b border-[#EAE2E6]/[0.07]"
      role="tablist"
      aria-label="Выбор категории товаров"
    >
      {/* Animated underline indicator */}
      <div
        className="absolute bottom-0 h-px bg-[#EAE2E6] transition-all duration-300 ease-out"
        style={indicatorStyle}
        aria-hidden
      />

      {CATEGORIES.map((cat) => {
        const active = categoryFilter === cat.value;
        return (
          <button
            key={cat.value}
            ref={(el) => { buttonRefs.current[cat.value] = el; }}
            onClick={() => onCategoryChange(cat.value)}
            role="tab"
            aria-selected={active}
            className={`relative font-jetbrains text-[10px] sm:text-[11px] tracking-[0.18em] uppercase px-4 sm:px-5 py-3 transition-colors duration-200 focus:outline-none whitespace-nowrap ${
              active
                ? 'text-[#EAE2E6]'
                : 'text-[#EAE2E6]/35 hover:text-[#EAE2E6]/70'
            }`}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
};

export default React.memo(CategorySelector);
