# 🛍️ RecrentShop# 🛍️ RecrentShop# 🛍️ RecrentShop



Современный интернет-магазин с минималистичным дизайном и анимациями.



**Демо:** [sensoria-lab.github.io/RecrentShop](https://sensoria-lab.github.io/RecrentShop)Современный интернет-магазин с минималистичным дизайном и анимациями.



## 🚀 Быстрый старт### Установка



```bash**Демо:** [sensoria-lab.github.io/RecrentShop](https://sensoria-lab.github.io/RecrentShop)

# Клонировать репозиторий

git clone https://github.com/Sensoria-Lab/RecrentShop.git```bash

cd RecrentShop

## 🚀 Быстрый старт# Клонировать репозиторий

# Установка зависимостей

npm installgit clone https://github.com/Sensoria-Lab/RecrentShop.git



# Запуск dev сервера```bash

npm start

# Установка зависимостей# Перейти в директорию

# Production сборка

npm run buildnpm installcd biznes



# Деплой на GitHub Pages

npx gh-pages -d build

```# Запуск dev сервера# Установить зависимости



## 🎨 Технологииnpm startnpm install



- **React 18** + TypeScript```

- **Tailwind CSS** для стилизации

- **React Router v6** для навигации# Production сборка

- **Three.js** для эффекта PixelBlast

- **Context API** для управления корзинойnpm run build### Запуск



## 📁 Структура проекта



```# Деплой на GitHub Pages```bash

src/

├── components/npx gh-pages -d build# Режим разработки

│   ├── pages/      # Страницы приложения

│   ├── shared/     # Переиспользуемые компоненты```npm start

│   └── ui/         # UI компоненты

├── constants/      # Константы (фильтры, опции)

├── context/        # React Context (Cart)

├── data/           # Данные приложения (products, content)## 🎨 Технологии# Открыть http://localhost:3000 в браузере

├── hooks/          # Кастомные хуки

├── lib/            # Утилиты```

└── types/          # TypeScript типы и интерфейсы

```- React 18 + TypeScript



## 📄 Основные страницы- Tailwind CSS### Сборка



- `/` - Главная страница с категориями товаров- React Router v6

- `/catalog` - Каталог с фильтрами и сортировкой

- `/product` - Детальная страница товара- Three.js (PixelBlast эффект)```bash

- `/cart` - Корзина покупок

- `/contacts` - Контактная информация# Production сборка

- `/info` - FAQ и информация о магазине

## 📁 Структураnpm run build

## 🧩 Ключевые компоненты



### Страницы

- `MainPage` - Лендинг с героем и превью категорий```# Результат в папке /build

- `CatalogPage` - Каталог с фильтрами (цвет, размер, цена, рейтинг)

- `ProductPage` - Детали товара с галереей и отзывамиsrc/```

- `CartPage` - Управление корзиной

- `ContactsPage` - Контактная информация├── components/

- `InfoPage` - FAQ в аккордеоне

│   ├── pages/      # Страницы## 📁 Структура

### UI компоненты

- `Header` - Навигация с эффектами при скролле│   ├── shared/     # Общие компоненты

- `ProductCard` - Карточка товара с рейтингом

- `ProductCarousel` - Карусель товаров│   └── ui/         # UI компоненты```

- `SectionHeader` - Заголовок секции с кнопкой "Показать все"

- `QuantitySelector` - Селектор количества товара├── context/        # React Context (Cart)src/

- `StarRating` - Компонент отображения рейтинга

├── data/           # Контент данные├── components/

## 🛠️ Скрипты

└── lib/            # Утилиты│   ├── pages/      # Страницы (Main, Catalog, Product, etc.)

```bash

npm start          # Запуск dev сервера на localhost:3000```│   ├── shared/     # Общие компоненты (Header, Modal, etc.)

npm run build      # Production сборка

npm test           # Запуск тестов│   └── ui/         # UI компоненты (ProductCard, Carousel, etc.)

```

## 📄 Основные страницы├── data/           # Данные (offerContent.ts)

## ⚙️ Деплой на GitHub Pages

├── App.tsx         # Главный компонент

```bash

# Установить переменную окружения и собрать- `/` - Главная с категориями└── index.tsx       # Точка входа

$env:PUBLIC_URL="/RecrentShop"

npm run build- `/catalog` - Каталог с фильтрами```



# Задеплоить на gh-pages- `/product` - Детали товара

npx gh-pages -d build

```- `/cart` - Корзина## 🎨 Технологии



## 📝 Разработка- `/contacts` - Контакты



### Добавление нового товара- `/info` - FAQ- **React 18** - UI фреймворк



```typescript- **TypeScript** - Типизация

// src/data/products.ts

export const MOUSEPADS: Product[] = [## ⚙️ Деплой на GitHub Pages- **Tailwind CSS** - Стилизация

  // ...existing products

  {- **React Router v6** - Навигация

    id: 13,

    image: '/images/products/mousepads/xl/new-mousepad.webp',```bash- **PostCSS** - CSS обработка

    title: 'Коврик для мыши',

    subtitle: '"new-design"',# Установить переменную окружения и собрать

    productSize: 'XL',

    price: '3 500 р.',$env:PUBLIC_URL="/RecrentShop"## 📄 Страницы

    priceNumeric: 3500,

    rating: 5,npm run build

    reviewCount: 10,

    color: 'black',- `/` - Главная страница

    category: 'mousepads'

  }# Задеплоить- `/catalog` - Каталог товаров

];

```npx gh-pages -d build- `/product` - Страница товара



### Создание нового компонента```- `/contacts` - Контакты



```typescript- `/info` - Информация/FAQ

// src/components/ui/MyComponent.tsx

import React from 'react';## 🧩 Ключевые компоненты



interface MyComponentProps {### Страницы

  title: string;- `MainPage` - Лендинг с героем

}- `CatalogPage` - Карусели товаров по категориям

- `ProductPage` - Детали товара, галерея, отзывы

/**- `ContactsPage` - Контакты в карточках

 * Component description- `InfoPage` - FAQ в карточках

 */

const MyComponent: React.FC<MyComponentProps> = ({ title }) => {### UI компоненты

  return (- `Header` - Навигация с scroll эффектами

    <div className="...">- `Modal` - Модальное окно

      <h2>{title}</h2>- `ProductCard` - Карточка товара

    </div>- `ProductCarousel` - Карусель товаров

  );- `PageLayout` - Единый layout для страниц

};



export default MyComponent;## 🛠️ Скрипты

```

```bash

## 📊 Статистика проектаnpm start          # Dev сервер

npm run build      # Production сборка

- **Строк кода**: ~4000+npm test           # Тесты

- **Компонентов**: 20+npm run eject      # Eject CRA конфигурации

- **Страниц**: 7```

- **Товаров**: 12

- **TypeScript**: 100%## 📝 Разработка



## 📚 Документация### Добавление новой страницы



- [Отчёт об оптимизации](OPTIMIZATION_REPORT.md)1. Создать компонент в `src/components/pages/`

- [Отчёт о рефакторинге](REFACTORING_REPORT.md)2. Добавить lazy import в `App.tsx`

3. Добавить роут в `<Routes>`

## 🤝 Вклад в проект4. Обновить навигацию в `Header.tsx`



1. Fork репозитория### Создание компонента

2. Создайте feature branch (`git checkout -b feature/AmazingFeature`)

3. Commit изменений (`git commit -m 'Add some AmazingFeature'`)```tsx

4. Push в branch (`git push origin feature/AmazingFeature`)import React from 'react';

5. Откройте Pull Request

interface Props {

## 📄 Лицензия  title: string;

}

Этот проект создан для образовательных целей.

/**

## 👤 Автор * Component description

 */

**Sensoria Lab**const Component: React.FC<Props> = ({ title }) => {

- GitHub: [@Sensoria-Lab](https://github.com/Sensoria-Lab)  return (

- Website: [sensoria-lab.github.io/RecrentShop](https://sensoria-lab.github.io/RecrentShop)    <div className="...">

      {title}

---    </div>

  );

⭐️ Если проект понравился, поставьте звезду!};


export default Component;
```

## 📚 Документация

- [Структура проекта](PROJECT_STRUCTURE.md)
- [Компоненты селекторов](src/components/README.md)

