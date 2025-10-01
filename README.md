#  RecrentShop

Современный интернет-магазин с минималистичным дизайном и анимациями.

**Демо:** [sensoria-lab.github.io/RecrentShop](https://sensoria-lab.github.io/RecrentShop)

##  Быстрый старт

```bash
# Клонировать репозиторий
git clone https://github.com/Sensoria-Lab/RecrentShop.git
cd RecrentShop

# Установка зависимостей
npm install

# Запуск dev сервера
npm start

# Production сборка
npm run build

# Деплой на GitHub Pages
npx gh-pages -d build
```

##  Технологии

- **React 18** + TypeScript
- **Tailwind CSS** для стилизации
- **React Router v6** для навигации
- **Three.js** для эффекта PixelBlast
- **Context API** для управления корзиной

##  Структура проекта

```
src/
 components/
    pages/      # Страницы приложения
    shared/     # Переиспользуемые компоненты
    ui/         # UI компоненты
 constants/      # Константы (фильтры, опции)
 context/        # React Context (Cart)
 data/           # Данные приложения (products, content)
 hooks/          # Кастомные хуки
 lib/            # Утилиты
 types/          # TypeScript типы и интерфейсы
```

##  Основные страницы

- / - Главная страница с категориями товаров
- /catalog - Каталог с фильтрами и сортировкой
- /product - Детальная страница товара
- /cart - Корзина покупок
- /contacts - Контактная информация
- /info - FAQ и информация о магазине

##  Ключевые компоненты

### Страницы
- MainPage - Лендинг с героем и превью категорий
- CatalogPage - Каталог с фильтрами (цвет, размер, цена, рейтинг)
- ProductPage - Детали товара с галереей и отзывами
- CartPage - Управление корзиной
- ContactsPage - Контактная информация
- InfoPage - FAQ в аккордеоне

### UI компоненты
- Header - Навигация с эффектами при скролле
- ProductCard - Карточка товара с рейтингом
- ProductCarousel - Карусель товаров
- SectionHeader - Заголовок секции с кнопкой \"Показать все\"
- QuantitySelector - Селектор количества товара
- StarRating - Компонент отображения рейтинга

##  Скрипты

```bash
npm start          # Запуск dev сервера на localhost:3000
npm run build      # Production сборка
npm test           # Запуск тестов
```

##  Деплой на GitHub Pages

```bash
# Установить переменную окружения и собрать
$env:PUBLIC_URL=\"/RecrentShop\"
npm run build

# Задеплоить на gh-pages
npx gh-pages -d build
```

##  Разработка

### Добавление нового товара

```typescript
// src/data/products.ts
export const MOUSEPADS: Product[] = [
  // ...existing products
  {
    id: 13,
    image: '/images/products/mousepads/xl/new-mousepad.webp',
    title: 'Коврик для мыши',
    subtitle: '\"new-design\"',
    productSize: 'XL',
    price: '3 500 р.',
    priceNumeric: 3500,
    rating: 5,
    reviewCount: 10,
    color: 'black',
    category: 'mousepads'
  }
];
```

### Создание нового компонента

```typescript
// src/components/ui/MyComponent.tsx
import React from 'react';

interface MyComponentProps {
  title: string;
}

const MyComponent: React.FC<MyComponentProps> = ({ title }) => {
  return (
    <div className=\"...\">
      <h2>{title}</h2>
    </div>
  );
};

export default MyComponent;
```

##  Статистика проекта

- **Строк кода**: ~4000+
- **Компонентов**: 20+
- **Страниц**: 7
- **Товаров**: 12
- **TypeScript**: 100%

##  Документация

- [Отчёт об оптимизации](OPTIMIZATION_REPORT.md)
- [Отчёт о рефакторинге](REFACTORING_REPORT.md)

##  Вклад в проект

1. Fork репозитория
2. Создайте feature branch (git checkout -b feature/AmazingFeature)
3. Commit изменений (git commit -m 'Add some AmazingFeature')
4. Push в branch (git push origin feature/AmazingFeature)
5. Откройте Pull Request

##  Лицензия

Этот проект создан для образовательных целей.

##  Автор

**Sensoria Lab**
- GitHub: [@Sensoria-Lab](https://github.com/Sensoria-Lab)
- Website: [sensoria-lab.github.io/RecrentShop](https://sensoria-lab.github.io/RecrentShop)

---

 Если проект понравился, поставьте звезду!
