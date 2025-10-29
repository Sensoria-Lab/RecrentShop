# RecrentShop

E-commerce платформа для продажи игровых ковриков и одежды. Построена на React 18, TypeScript и Tailwind CSS.

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://sensoria-lab.github.io/RecrentShop)
[![React](https://img.shields.io/badge/React-18.2-61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9-3178C6)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38B2AC)](https://tailwindcss.com/)

[Демо](https://sensoria-lab.github.io/RecrentShop) • [GitHub](https://github.com/Sensoria-Lab/RecrentShop)

## Быстрый старт

```bash
git clone https://github.com/Sensoria-Lab/RecrentShop.git
cd RecrentShop
npm install
npm start
```

Приложение запустится на http://localhost:3000

## Архитектура

Проект использует feature-based архитектуру:

```
src/
├── pages/           # Страницы приложения
├── shared/          # Переиспользуемые модули
│   ├── components/  # UI компоненты
│   ├── hooks/       # Кастомные хуки
│   ├── lib/         # Утилиты и shadcn-ui
│   ├── types/       # TypeScript типы
│   └── utils/       # Вспомогательные функции
├── core/            # Ядро приложения
│   ├── api/         # API клиенты
│   ├── constants/   # Константы и конфигурация
│   ├── context/     # React Context провайдеры
│   ├── data/        # Статические данные
│   └── routing/     # Настройка маршрутизации
└── App.tsx, index.tsx
```

## Технологии

- **React 18** - UI библиотека
- **TypeScript** - типизация
- **React Router v6** - маршрутизация
- **Tailwind CSS** - стилизация
- **shadcn/ui** - компонентная библиотека
- **Radix UI** - доступные примитивы
- **Framer Motion** - анимации

## Основные возможности

- Каталог товаров с фильтрацией и поиском
- Детальные страницы товаров с галереей изображений
- Корзина покупок с локальным хранением
- Адаптивный дизайн для мобильных устройств
- Темная тема
- SEO оптимизация

## Команды

```bash
npm start          # Запуск dev сервера
npm run build      # Production сборка
npm run deploy     # Деплой на GitHub Pages
npm run lint       # Проверка ESLint
npm run type-check # Проверка TypeScript
```

## Деплой

Проект автоматически развертывается на GitHub Pages при пуше в main ветку.

Для ручного деплоя:
```bash
npm run build
npm run deploy
```

## Структура страниц

- `/` - Главная страница
- `/catalog` - Каталог товаров
- `/product/:id` - Страница товара
- `/cart` - Корзина
- `/checkout` - Оформление заказа
- `/support` - Поддержка

## Разработка

### Добавление нового товара

```typescript
// src/core/data/products.ts
{
  id: 13,
  image: '/images/products/mousepads/xl/new-design.webp',
  title: 'Коврик для мыши',
  subtitle: '"new-design"',
  productSize: 'XL',
  price: '3 500 р.',
  priceNumeric: 3500,
  rating: 5,
  reviewCount: 10,
  color: 'black',
  category: 'mousepads'
}
```

### Создание компонента

```typescript
// src/shared/components/MyComponent.tsx
interface MyComponentProps {
  title: string;
  description?: string;
}

export const MyComponent: React.FC<MyComponentProps> = ({
  title,
  description
}) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold">{title}</h2>
      {description && <p className="text-gray-600">{description}</p>}
    </div>
  );
};
```

## Лицензия

MIT
