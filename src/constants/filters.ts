/**
 * Filter options constants
 */

export const SORT_OPTIONS = [
  { value: 'popularity', label: 'По популярности' },
  { value: 'rating', label: 'По рейтингу' },
  { value: 'price-asc', label: 'Сначала дешевле' },
  { value: 'price-desc', label: 'Сначала дороже' }
] as const;

export const COLOR_OPTIONS = [
  { value: 'all', label: 'Все цвета' },
  { value: 'black', label: 'Черный' },
  { value: 'white', label: 'Белый/Серый' },
  { value: 'red', label: 'Красный' }
] as const;

export const CATEGORY_OPTIONS = [
  { value: 'all', label: 'Все категории' },
  { value: 'mousepads', label: 'Коврики для мыши' },
  { value: 'clothing', label: 'Одежда' }
] as const;

export const CLOTHING_TYPE_OPTIONS = [
  { value: 'all', label: 'Все типы' },
  { value: 'hoodie', label: 'Худи' },
  { value: 'tshirt', label: 'Футболки' }
] as const;

export const SIZE_OPTIONS_MOUSEPADS = [
  { value: 'all', label: 'Все размеры' },
  { value: 'L', label: 'L' },
  { value: 'XL', label: 'XL' }
] as const;

export const SIZE_OPTIONS_CLOTHING = [
  { value: 'all', label: 'Все размеры' },
  { value: 'S', label: 'S' },
  { value: 'M', label: 'M' },
  { value: 'XS', label: 'XS' }
] as const;

export const RATING_OPTIONS = [
  { value: 0, label: 'Любой рейтинг' },
  { value: 3, label: 'От 3 звезд' },
  { value: 4, label: 'От 4 звезд' },
  { value: 5, label: '5 звезд' }
] as const;
