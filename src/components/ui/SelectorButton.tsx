import React from 'react';

export interface SelectorButtonProps {
  /** Текст или значение для отображения */
  label: string;
  /** Выбрана ли эта опция */
  selected?: boolean;
  /** Обработчик клика */
  onClick?: () => void;
  /** Отключена ли кнопка */
  disabled?: boolean;
  /** Дополнительные CSS классы */
  className?: string;
  /** Размер компонента */
  size?: 'sm' | 'md' | 'lg';
  /** Вариант стиля */
  variant?: 'default' | 'color';
}

const SelectorButton: React.FC<SelectorButtonProps> = ({
  label,
  selected = false,
  onClick,
  disabled = false,
  className = '',
  size = 'md',
  variant = 'default'
}) => {
  const sizeClasses = {
    sm: 'px-2 py-1.5 text-xs sm:px-2.5 sm:py-2 sm:text-sm',
    md: 'px-3 py-2 text-xs sm:px-4 sm:py-2.5 sm:text-sm md:px-5 md:py-3 md:text-base',
    lg: 'px-4 py-2.5 text-sm sm:px-5 sm:py-3 sm:text-base md:px-6 md:py-4 md:text-lg'
  };

  const borderClasses = selected
    ? 'border-[var(--color-accent)] border-2 sm:border-[2.5px] md:border-[3px] shadow-[0_0_0_1px_rgba(255,255,255,0.15)]'
    : 'border-white/20 border sm:border-[1.5px] md:border-2';

  const hoverClasses = !selected && !disabled
    ? 'hover:border-[var(--color-accent)] hover:border-opacity-80 transition-all duration-200'
    : '';

  const disabledClasses = disabled
    ? 'opacity-50 cursor-not-allowed'
    : 'cursor-pointer';

  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`
        box-border
        content-stretch
        flex
        gap-1 sm:gap-1.5 md:gap-2
        items-center
        justify-center
        relative
        rounded-lg sm:rounded-xl
        ${sizeClasses[size]}
        ${disabledClasses}
        ${className}
      `.trim()}
      data-selected={selected}
      data-variant={variant}
    >
      <div
        aria-hidden="true"
        className={`
          absolute
          border-solid
          inset-0
          pointer-events-none
          rounded-lg sm:rounded-xl
          ${borderClasses}
          ${hoverClasses}
          ${selected ? 'bg-[var(--color-accent-rgba,rgba(250,204,21,0.08))]' : 'bg-white/5'}
        `.trim()}
      />
      <div className="flex flex-col font-manrope font-semibold justify-center leading-none relative shrink-0 text-nowrap text-white">
        <p className="leading-normal whitespace-pre">{label}</p>
      </div>
    </button>
  );
};

export default SelectorButton;