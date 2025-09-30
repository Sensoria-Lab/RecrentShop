# Компоненты селектора

## SelectorButton

Базовый компонент кнопки выбора размера, цвета или других параметров товара.

### Props

```typescript
interface SelectorButtonProps {
  label: string;           // Текст для отображения
  selected?: boolean;      // Выбрана ли опция
  onClick?: () => void;    // Обработчик клика
  disabled?: boolean;      // Отключена ли кнопка
  className?: string;      // Дополнительные CSS классы
  size?: 'sm' | 'md' | 'lg'; // Размер компонента
  variant?: 'default' | 'color'; // Вариант стиля
}
```

### Пример использования

```tsx
import SelectorButton from './components/SelectorButton';

function ProductPage() {
  const [selectedSize, setSelectedSize] = useState('');

  return (
    <div>
      <SelectorButton
        label="L(500x430)"
        selected={selectedSize === 'L'}
        onClick={() => setSelectedSize('L')}
      />
    </div>
  );
}
```

## SelectorGroup

Компонент для группировки нескольких опций выбора.

### Props

```typescript
interface SelectorGroupProps {
  options: SelectorOption[];     // Массив опций
  selectedValue?: string;        // Выбранное значение
  onChange?: (value: string) => void; // Обработчик изменения
  size?: 'sm' | 'md' | 'lg';    // Размер кнопок
  variant?: 'default' | 'color'; // Вариант стиля
  className?: string;            // CSS классы для контейнера
  title?: string;               // Заголовок группы
  allowDeselect?: boolean;      // Возможность отмены выбора
}

interface SelectorOption {
  id: string;        // Уникальный ID
  label: string;     // Текст для отображения
  disabled?: boolean; // Отключена ли опция
}
```

### Пример использования

```tsx
import SelectorGroup from './components/SelectorGroup';

function ProductPage() {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  const sizeOptions = [
    { id: 'xs', label: 'XS(400x300)' },
    { id: 's', label: 'S(450x350)' },
    { id: 'm', label: 'M(500x400)' },
    { id: 'l', label: 'L(500x430)' },
    { id: 'xl', label: 'XL(600x500)' },
    { id: 'xxl', label: 'XXL(700x600)', disabled: true }
  ];

  const colorOptions = [
    { id: 'black', label: 'Черный' },
    { id: 'white', label: 'Белый' },
    { id: 'gray', label: 'Серый' },
    { id: 'blue', label: 'Синий' },
    { id: 'red', label: 'Красный', disabled: true }
  ];

  return (
    <div className="space-y-6">
      <SelectorGroup
        title="Размер"
        options={sizeOptions}
        selectedValue={selectedSize}
        onChange={setSelectedSize}
        allowDeselect={true}
      />

      <SelectorGroup
        title="Цвет"
        options={colorOptions}
        selectedValue={selectedColor}
        onChange={setSelectedColor}
        size="sm"
      />
    </div>
  );
}
```

## Особенности

- **Адаптивный дизайн** - компоненты работают на всех размерах экранов
- **Hover эффекты** - подсветка при наведении
- **Состояния disabled** - поддержка отключенных опций
- **TypeScript** - полная типизация
- **Доступность** - поддержка aria-атрибутов
- **Гибкая настройка** - множество props для кастомизации

## Стили

Компоненты используют дизайн из Figma:
- Серая рамка (#9c9c9c) для обычного состояния
- Синяя рамка (#2b7fff) для выбранного состояния
- Закругленные углы (12px)
- Шрифт Manrope
- Белый текст на темном фоне