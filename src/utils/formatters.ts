/**
 * Formatting utilities
 * Функции для форматирования данных
 */

/**
 * Форматирует цену в рубли
 */
export const formatPrice = (price: number): string => {
  return `${price.toLocaleString('ru-RU')} ₽`;
};

/**
 * Форматирует цену из строки в число
 */
export const parsePriceString = (priceStr: string): number => {
  return parseInt(priceStr.replace(/[^\d]/g, ''), 10) || 0;
};

/**
 * Форматирует телефон
 */
export const formatPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/);

  if (match) {
    return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}-${match[5]}`;
  }

  return phone;
};

/**
 * Форматирует email (lowercase, trim)
 */
export const formatEmail = (email: string): string => {
  return email.toLowerCase().trim();
};

/**
 * Склонение числительных (1 товар, 2 товара, 5 товаров)
 */
export const pluralize = (count: number, words: [string, string, string]): string => {
  const cases = [2, 0, 1, 1, 1, 2];
  const index = (count % 100 > 4 && count % 100 < 20)
    ? 2
    : cases[Math.min(count % 10, 5)];
  return `${count} ${words[index]}`;
};

/**
 * Примеры использования pluralize:
 * pluralize(1, ['товар', 'товара', 'товаров']) => "1 товар"
 * pluralize(2, ['товар', 'товара', 'товаров']) => "2 товара"
 * pluralize(5, ['товар', 'товара', 'товаров']) => "5 товаров"
 */

/**
 * Обрезает строку и добавляет многоточие
 */
export const truncate = (str: string, maxLength: number): string => {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + '...';
};

/**
 * Капитализация первой буквы
 */
export const capitalize = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Форматирует дату
 */
export const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Форматирует рейтинг (1 звезда -> "1.0", 4.5 звезд -> "4.5")
 */
export const formatRating = (rating: number): string => {
  return rating.toFixed(1);
};
