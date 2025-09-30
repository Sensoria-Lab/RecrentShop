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
    sm: 'px-3 py-2 text-sm',
    md: 'px-5 py-4 text-lg',
    lg: 'px-6 py-5 text-xl'
  };

  const borderClasses = selected
    ? 'border-[#2b7fff] border-[3px]'
    : 'border-[#9c9c9c] border-[3px]';

  const hoverClasses = !selected && !disabled
    ? 'hover:border-[#2b7fff] hover:border-opacity-70 transition-colors duration-200'
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
        gap-2
        items-center
        justify-center
        relative
        rounded-xl
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
          rounded-xl
          ${borderClasses}
          ${hoverClasses}
        `.trim()}
      />
      <div className="flex flex-col font-manrope font-semibold justify-center leading-none relative shrink-0 text-nowrap text-white">
        <p className="leading-normal whitespace-pre">{label}</p>
      </div>
    </button>
  );
};

export default SelectorButton;