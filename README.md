# RecrentShop

E-commerce платформа для продажи игровых ковриков и одежды. Построена на Next.js 16, React 19, TypeScript и Tailwind CSS v4.

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://sensoria-lab.github.io/RecrentShop)
[![Next.js](https://img.shields.io/badge/Next.js-16.1-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.2-38B2AC)](https://tailwindcss.com/)

[Демо](https://sensoria-lab.github.io/RecrentShop) • [GitHub](https://github.com/Sensoria-Lab/RecrentShop)

## Быстрый старт

```bash
git clone https://github.com/Sensoria-Lab/RecrentShop.git
cd RecrentShop
npm install
npm run dev
```

Приложение запустится на http://localhost:3000

## Архитектура

Проект использует **Next.js App Router** с организацией по функциональным областям:

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Главная страница (/)
│   ├── layout.tsx         # Корневой layout
│   ├── globals.css        # Глобальные стили
│   ├── providers.tsx      # React Context провайдеры
│   ├── catalog/           # Страница каталога (/catalog)
│   ├── product/[id]/      # Страница товара (/product/:id)
│   ├── cart/              # Корзина (/cart)
│   ├── checkout/          # Оформление заказа (/checkout)
│   ├── account/           # Личный кабинет (/account)
│   └── support/           # Поддержка (/support)
├── components/            # React компоненты
│   ├── layout/            # Layout компоненты (Header, Footer, etc.)
│   ├── products/          # Компоненты товаров
│   ├── cart/              # Компоненты корзины
│   └── ui/                # Базовые UI компоненты
├── hooks/                 # Кастомные React хуки
├── lib/                   # Утилиты, данные, API
├── types/                 # TypeScript типы
├── constants/             # Константы приложения
└── context/               # React Context
```

## Технологии

- **Next.js 16** - React фреймворк с App Router
- **React 19** - UI библиотека
- **TypeScript 5.9** - типизация
- **Tailwind CSS v4** - стилизация с CSS-first конфигурацией
- **GSAP** - анимации и эффекты
- **Lenis** - плавный скролл
- **@once-ui-system/core** - дизайн система
- **shadcn/ui** - компонентная библиотека
- **Zod** - валидация данных

## Основные возможности

- Каталог товаров с фильтрацией и сортировкой
- Детальные страницы товаров с галереей изображений
- Корзина покупок с локальным хранением (localStorage)
- Оформление заказа с валидацией форм
- Адаптивный дизайн для мобильных устройств
- Темная тема
- SEO оптимизация (мета-теги, структурированные данные)
- Плавные анимации и переходы

## Команды

```bash
npm run dev          # Запуск dev сервера
npm run build        # Production сборка
npm run start        # Запуск production сервера
npm run lint         # Проверка ESLint
npm run lint:fix     # Исправление ESLint ошибок
npm run type-check   # Проверка TypeScript
```

## Деплой

Проект настроен для статического экспорта и разворачивается на GitHub Pages.

```bash
npm run build
```

Статические файлы генерируются в папку `dist/` и могут быть развернуты на любом static hosting.

## Структура страниц

| Маршрут | Описание |
|---------|----------|
| `/` | Главная страница с баннерами и популярными товарами |
| `/catalog` | Каталог товаров с фильтрами |
| `/product/[id]` | Страница деталей товара |
| `/cart` | Корзина покупок |
| `/checkout` | Оформление заказа |
| `/account` | Личный кабинет |
| `/support` | Страница поддержки и FAQ |

## Разработка

### Добавление нового товара

```typescript
// src/lib/products.ts
export const MOUSEPADS: Product[] = [
  {
    id: 13,
    image: '/images/products/mousepads/xl/new-design/main.webp',
    images: [
      '/images/products/mousepads/xl/new-design/01.webp',
      '/images/products/mousepads/xl/new-design/02.webp'
    ],
    title: 'Коврик',
    subtitle: 'New Design (XL)',
    productSize: 'XL',
    price: '3 500 ₽',
    priceNumeric: 3500,
    rating: 5.0,
    reviewCount: 10,
    color: 'black',
    category: 'mousepads',
    collection: 'New Collection',
    addedDate: '2025-01-15'
  },
  // ...
];
```

### Создание компонента

```typescript
// src/components/products/MyComponent.tsx
import type { Product } from '@/src/types/product';

interface MyComponentProps {
  product: Product;
  onSelect?: (id: number) => void;
}

export const MyComponent: React.FC<MyComponentProps> = ({
  product,
  onSelect
}) => {
  return (
    <div className="p-4 bg-[var(--rc-bg-elevated)] border border-[var(--rc-border)]">
      <h2 className="text-xl font-bold text-[var(--rc-fg)]">{product.title}</h2>
      <p className="text-[var(--rc-fg-secondary)]">{product.price}</p>
    </div>
  );
};
```

## Дизайн Система

Проект использует кастомную дизайн-систему с монохромной палитрой:

```css
/* Основные цвета */
--rc-bg: #191516;           /* Фон */
--rc-bg-elevated: #1E1A1B;  /* Поверхности */
--rc-fg: #EAE2E6;          /* Текст */
--rc-fg-secondary: rgba(234,226,230,0.55);  /* Вторичный текст */
--rc-border: rgba(234,226,230,0.07);        /* Границы */
```

Полная документация дизайн-системы: [`design-system/MASTER.md`](design-system/MASTER.md)

## Лицензия

MIT
