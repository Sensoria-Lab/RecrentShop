'use client';
import React, { useEffect, useState, useRef } from 'react';
import type { CategoryFilter } from '@/src/types/product';

interface CategorySelectorProps {
  categoryFilter: CategoryFilter;
  onCategoryChange: (category: CategoryFilter) => void;
  variant?: 'tabs' | 'sidebar';
}

const CATEGORIES = [
  { value: 'all', label: 'Все' },
  { value: 'mousepads', label: 'Коврики' },
  { value: 'clothing', label: 'Одежда' },
  { value: 'tshirt', label: 'Футболки' },
  { value: 'hoodie', label: 'Худи' },
  { value: 'sleeve', label: 'Рукава' },
] as const;

const CategorySelector: React.FC<CategorySelectorProps> = ({
  categoryFilter,
  onCategoryChange,
  variant = 'tabs',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({ left: 0, width: 0 });

  useEffect(() => {
    if (variant !== 'tabs') return;
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
  }, [categoryFilter, variant]);

  // ── Sidebar (vertical) variant ──────────────────────────────────────────
  if (variant === 'sidebar') {
    return (
      <div
        className="flex flex-col"
        role="tablist"
        aria-label="Выбор категории товаров"
      >
        {CATEGORIES.map((cat) => {
          const active = categoryFilter === cat.value;
          return (
            <button
              key={cat.value}
              ref={(el) => { buttonRefs.current[cat.value] = el; }}
              onClick={() => onCategoryChange(cat.value)}
              role="tab"
              aria-selected={active}
              className={`group flex items-center justify-between py-2.5 border-b border-[var(--rc-border)] last:border-b-0 text-left transition-colors duration-150 focus-visible:outline-none ${active ? 'text-[var(--rc-fg)]' : 'text-[var(--rc-fg-muted)] hover:text-[var(--rc-fg-secondary)]'
                }`}
            >
              <span className={`font-jetbrains text-[10px] tracking-[0.15em] uppercase transition-all duration-150 ${active ? 'font-bold' : 'font-normal'
                }`}>
                {cat.label}
              </span>
              {active && (
                <span className="w-1 h-1 bg-[var(--rc-fg)] rounded-full flex-shrink-0" aria-hidden />
              )}
            </button>
          );
        })}
      </div>
    );
  }

  // ── Tabs (horizontal) variant ───────────────────────────────────────────
  return (
    <div
      ref={containerRef}
      className="relative flex items-center gap-0 border-b border-[var(--rc-border)]"
      role="tablist"
      aria-label="Выбор категории товаров"
    >
      {/* Animated underline indicator */}
      <div
        className="absolute bottom-0 h-px bg-[var(--rc-fg)] transition-all duration-300 ease-out"
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
            className={`relative font-jetbrains text-[10px] sm:text-[11px] tracking-[0.18em] uppercase px-4 sm:px-5 py-3 transition-colors duration-200 focus-visible:outline-none whitespace-nowrap ${active
                ? 'text-[var(--rc-fg)]'
                : 'text-[var(--rc-fg-muted)] hover:text-[var(--rc-fg-secondary)]'
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
