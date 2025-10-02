/**
 * General helper utilities
 * Вспомогательные функции общего назначения
 */

/**
 * Debounce функция
 * Задерживает выполнение функции до тех пор, пока не пройдет определенное время с последнего вызова
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Throttle функция
 * Ограничивает частоту вызова функции
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean = false;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Задержка (promise-based)
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Генерация уникального ID
 */
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Shuffle массива (Fisher-Yates)
 */
export const shuffle = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Группировка массива по ключу
 */
export const groupBy = <T>(
  array: T[],
  key: keyof T
): Record<string, T[]> => {
  return array.reduce((result, item) => {
    const groupKey = String(item[key]);
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {} as Record<string, T[]>);
};

/**
 * Удаление дубликатов из массива
 */
export const unique = <T>(array: T[]): T[] => {
  return Array.from(new Set(array));
};

/**
 * Клонирование объекта
 */
export const cloneDeep = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Проверка на пустой объект
 */
export const isEmpty = (obj: object): boolean => {
  return Object.keys(obj).length === 0;
};

/**
 * Безопасное получение значения из объекта по пути
 */
export const getNestedValue = (
  obj: any,
  path: string,
  defaultValue: any = undefined
): any => {
  const keys = path.split('.');
  let result = obj;

  for (const key of keys) {
    if (result === null || result === undefined) {
      return defaultValue;
    }
    result = result[key];
  }

  return result !== undefined ? result : defaultValue;
};

/**
 * Сортировка массива объектов по ключу
 */
export const sortBy = <T>(
  array: T[],
  key: keyof T,
  order: 'asc' | 'desc' = 'asc'
): T[] => {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];

    if (aVal < bVal) return order === 'asc' ? -1 : 1;
    if (aVal > bVal) return order === 'asc' ? 1 : -1;
    return 0;
  });
};

/**
 * Проверка на мобильное устройство
 */
export const isMobile = (): boolean => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

/**
 * Копирование текста в буфер обмена
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy:', err);
    return false;
  }
};

/**
 * Скролл к элементу
 */
export const scrollToElement = (
  element: HTMLElement | null,
  behavior: ScrollBehavior = 'smooth'
): void => {
  if (!element) return;
  element.scrollIntoView({ behavior, block: 'start' });
};

/**
 * Скролл наверх страницы
 */
export const scrollToTop = (behavior: ScrollBehavior = 'smooth'): void => {
  window.scrollTo({ top: 0, behavior });
};

/**
 * Получение query параметров из URL
 */
export const getQueryParams = (): Record<string, string> => {
  const params = new URLSearchParams(window.location.search);
  const result: Record<string, string> = {};

  params.forEach((value, key) => {
    result[key] = value;
  });

  return result;
};

/**
 * Форматирование размера файла
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};
