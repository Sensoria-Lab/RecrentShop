import React from 'react';

export interface StarRatingProps {
  rating?: number;              // Текущее значение рейтинга (0-5, допускает дробные 0.5)
  reviewCount?: number;         // Количество отзывов (опционально)
  size?: 'xs' | 'sm' | 'md' | 'lg'; // Размер иконок
  showCount?: boolean;          // Показывать ли число отзывов
  allowHalf?: boolean;          // Включить визуал половинных звёзд (по дробной части)
  className?: string;           // Дополнительные классы контейнера
  interactive?: boolean;        // (Зарезервировано) Делать ли рейтинг кликабельным
  onChange?: (value: number) => void; // (Зарезервировано) Обработчик изменения
  ariaLabel?: string;           // Пользовательская метка для screen reader
}

const sizeMap = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24
};

// Общий компонент рейтинга звёзд
const StarRating: React.FC<StarRatingProps> = ({
  rating = 0,
  reviewCount,
  size = 'sm',
  showCount = true,
  allowHalf = true,
  className = '',
  interactive = false,
  onChange,
  ariaLabel
}) => {
  const active = 'var(--color-star-active, #FACC15)';
  const inactive = 'var(--color-star-inactive, rgba(255,255,255,0.35))';
  const dimension = sizeMap[size];

  // Нормализуем рейтинг
  const normalized = Math.min(5, Math.max(0, rating));
  const intPart = Math.floor(normalized);
  const hasHalf = allowHalf && normalized - intPart >= 0.25 && normalized - intPart < 0.75; // половинка если близко к 0.5
  const finalInt = hasHalf ? intPart : Math.round(normalized);

  const label = ariaLabel || `Рейтинг ${normalized} из 5`;

  const handleClick = (index: number, half: boolean) => {
    if (!interactive || !onChange) return;
    const value = half ? index + 0.5 : index + 1;
    onChange(value);
  };

  return (
    <div className={`flex items-center gap-1 select-none ${interactive ? 'cursor-pointer' : ''} ${className}`} aria-label={label} role="img">
      {[...Array(5)].map((_, i) => {
        const isFull = i < finalInt;
        const isHalf = hasHalf && i === intPart;
        return (
          <div key={i} className="relative" style={{ width: dimension, height: dimension }}>
            {/* Базовый контур */}
            <svg
              width={dimension}
              height={dimension}
              viewBox="0 0 24 24"
              fill={isFull ? active : 'none'}
              stroke={isFull ? active : inactive}
              strokeWidth={isFull ? 1.1 : 1.4}
              className="block"
              onClick={() => handleClick(i, false)}
            >
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
            </svg>
            {isHalf && (
              <svg
                width={dimension}
                height={dimension}
                viewBox="0 0 24 24"
                className="absolute inset-0 block"
                onClick={() => handleClick(i, true)}
              >
                <defs>
                  <linearGradient id={`half-grad-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="50%" stopColor={active} />
                    <stop offset="50%" stopColor="transparent" />
                  </linearGradient>
                </defs>
                <polygon
                  points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
                  fill={`url(#half-grad-${i})`}
                  stroke={active}
                  strokeWidth={1.2}
                />
              </svg>
            )}
          </div>
        );
      })}
      {showCount && reviewCount != null && (
        <span className="text-white font-manrope font-medium text-xs sm:text-sm ml-1 opacity-80">({reviewCount})</span>
      )}
    </div>
  );
};

export default StarRating;
