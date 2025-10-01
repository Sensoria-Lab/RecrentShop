# 🛍️ RecrentShop# 🛍️ RecrentShop



Современный интернет-магазин с минималистичным дизайном и анимациями.

### Установка

**Демо:** [sensoria-lab.github.io/RecrentShop](https://sensoria-lab.github.io/RecrentShop)

```bash

## 🚀 Быстрый старт# Клонировать репозиторий

git clone https://github.com/Sensoria-Lab/RecrentShop.git

```bash

# Установка зависимостей# Перейти в директорию

npm installcd biznes



# Запуск dev сервера# Установить зависимости

npm startnpm install

```

# Production сборка

npm run build### Запуск



# Деплой на GitHub Pages```bash

npx gh-pages -d build# Режим разработки

```npm start



## 🎨 Технологии# Открыть http://localhost:3000 в браузере

```

- React 18 + TypeScript

- Tailwind CSS### Сборка

- React Router v6

- Three.js (PixelBlast эффект)```bash

# Production сборка

## 📁 Структураnpm run build



```# Результат в папке /build

src/```

├── components/

│   ├── pages/      # Страницы## 📁 Структура

│   ├── shared/     # Общие компоненты

│   └── ui/         # UI компоненты```

├── context/        # React Context (Cart)src/

├── data/           # Контент данные├── components/

└── lib/            # Утилиты│   ├── pages/      # Страницы (Main, Catalog, Product, etc.)

```│   ├── shared/     # Общие компоненты (Header, Modal, etc.)

│   └── ui/         # UI компоненты (ProductCard, Carousel, etc.)

## 📄 Основные страницы├── data/           # Данные (offerContent.ts)

├── App.tsx         # Главный компонент

- `/` - Главная с категориями└── index.tsx       # Точка входа

- `/catalog` - Каталог с фильтрами```

- `/product` - Детали товара

- `/cart` - Корзина## 🎨 Технологии

- `/contacts` - Контакты

- `/info` - FAQ- **React 18** - UI фреймворк

- **TypeScript** - Типизация

## ⚙️ Деплой на GitHub Pages- **Tailwind CSS** - Стилизация

- **React Router v6** - Навигация

```bash- **PostCSS** - CSS обработка

# Установить переменную окружения и собрать

$env:PUBLIC_URL="/RecrentShop"## 📄 Страницы

npm run build

- `/` - Главная страница

# Задеплоить- `/catalog` - Каталог товаров

npx gh-pages -d build- `/product` - Страница товара

```- `/contacts` - Контакты

- `/info` - Информация/FAQ

## 🧩 Ключевые компоненты

### Страницы
- `MainPage` - Лендинг с героем
- `CatalogPage` - Карусели товаров по категориям
- `ProductPage` - Детали товара, галерея, отзывы
- `ContactsPage` - Контакты в карточках
- `InfoPage` - FAQ в карточках

### UI компоненты
- `Header` - Навигация с scroll эффектами
- `Modal` - Модальное окно
- `ProductCard` - Карточка товара
- `ProductCarousel` - Карусель товаров
- `PageLayout` - Единый layout для страниц


## 🛠️ Скрипты

```bash
npm start          # Dev сервер
npm run build      # Production сборка
npm test           # Тесты
npm run eject      # Eject CRA конфигурации
```

## 📝 Разработка

### Добавление новой страницы

1. Создать компонент в `src/components/pages/`
2. Добавить lazy import в `App.tsx`
3. Добавить роут в `<Routes>`
4. Обновить навигацию в `Header.tsx`

### Создание компонента

```tsx
import React from 'react';

interface Props {
  title: string;
}

/**
 * Component description
 */
const Component: React.FC<Props> = ({ title }) => {
  return (
    <div className="...">
      {title}
    </div>
  );
};

export default Component;
```

## 📚 Документация

- [Структура проекта](PROJECT_STRUCTURE.md)
- [Компоненты селекторов](src/components/README.md)

