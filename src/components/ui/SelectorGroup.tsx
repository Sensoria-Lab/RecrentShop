import React from 'react';
import SelectorButton, { SelectorButtonProps } from './SelectorButton';

export interface SelectorOption {
  /** Уникальный идентификатор */
  id: string;
  /** Текст для отображения */
  label: string;
  /** Отключена ли опция */
  disabled?: boolean;
}

export interface SelectorGroupProps {
  /** Массив опций для выбора */
  options: SelectorOption[];
  /** Выбранное значение */
  selectedValue?: string;
  /** Обработчик изменения выбора */
  onChange?: (value: string) => void;
  /** Размер кнопок */
  size?: SelectorButtonProps['size'];
  /** Вариант стиля */
  variant?: SelectorButtonProps['variant'];
  /** Дополнительные CSS классы для контейнера */
  className?: string;
  /** Заголовок группы */
  title?: string;
  /** Можно ли отменить выбор */
  allowDeselect?: boolean;
}

const SelectorGroup: React.FC<SelectorGroupProps> = ({
  options,
  selectedValue,
  onChange,
  size = 'md',
  variant = 'default',
  className = '',
  title,
  allowDeselect = false
}) => {
  const handleOptionClick = (optionId: string) => {
    if (!onChange) return;

    // Если allowDeselect = true и кликнули на уже выбранную опцию, отменяем выбор
    if (allowDeselect && selectedValue === optionId) {
      onChange('');
    } else {
      onChange(optionId);
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {title && (
        <h3 className="text-white font-manrope font-semibold text-lg">
          {title}
        </h3>
      )}
      <div className="flex flex-wrap gap-3">
        {options.map((option) => (
          <SelectorButton
            key={option.id}
            label={option.label}
            selected={selectedValue === option.id}
            onClick={() => handleOptionClick(option.id)}
            disabled={option.disabled}
            size={size}
            variant={variant}
          />
        ))}
      </div>
    </div>
  );
};

export default SelectorGroup;