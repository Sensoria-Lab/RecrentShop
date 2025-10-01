# 🛍️ RecrentShop# 🛍️ RecrentShop# 🛍️ RecrentShop# 🛍️ RecrentShop



Современный интернет-магазин с минималистичным дизайном и анимациями.



**Демо:** [sensoria-lab.github.io/RecrentShop](https://sensoria-lab.github.io/RecrentShop)Современный интернет-магазин с минималистичным дизайном и анимациями.



## 🚀 Быстрый старт



```bash**Демо:** [sensoria-lab.github.io/RecrentShop](https://sensoria-lab.github.io/RecrentShop)Современный интернет-магазин с минималистичным дизайном и анимациями.

# Клонировать репозиторий

git clone https://github.com/Sensoria-Lab/RecrentShop.git

cd RecrentShop

## 🚀 Быстрый старт### Установка

# Установка зависимостей

npm install



# Запуск dev сервера```bash**Демо:** [sensoria-lab.github.io/RecrentShop](https://sensoria-lab.github.io/RecrentShop)

npm start

# Клонировать репозиторий

# Production сборка

npm run buildgit clone https://github.com/Sensoria-Lab/RecrentShop.git```bash



# Деплой на GitHub Pagescd RecrentShop

npx gh-pages -d build

```## 🚀 Быстрый старт# Клонировать репозиторий



## 🎨 Технологии# Установка зависимостей



- **React 18** + TypeScriptnpm installgit clone https://github.com/Sensoria-Lab/RecrentShop.git

- **Tailwind CSS** для стилизации

- **React Router v6** для навигации

- **Three.js** для эффекта PixelBlast

- **Context API** для управления корзиной# Запуск dev сервера```bash



## 📁 Структура проектаnpm start



```# Установка зависимостей# Перейти в директорию

src/

├── components/# Production сборка

│   ├── pages/      # Страницы приложения

│   ├── shared/     # Переиспользуемые компонентыnpm run buildnpm installcd biznes

│   └── ui/         # UI компоненты

├── constants/      # Константы (фильтры, опции)

├── context/        # React Context (Cart)

├── data/           # Данные приложения (products, content)# Деплой на GitHub Pages

├── hooks/          # Кастомные хуки

├── lib/            # Утилитыnpx gh-pages -d build

└── types/          # TypeScript типы и интерфейсы

``````# Запуск dev сервера# Установить зависимости



## 📄 Основные страницы



- `/` - Главная страница с категориями товаров## 🎨 Технологииnpm startnpm install

- `/catalog` - Каталог с фильтрами и сортировкой

- `/product` - Детальная страница товара

- `/cart` - Корзина покупок

- `/contacts` - Контактная информация- **React 18** + TypeScript```

- `/info` - FAQ и информация о магазине

- **Tailwind CSS** для стилизации

## 🧩 Ключевые компоненты

- **React Router v6** для навигации# Production сборка

### Страницы

- `MainPage` - Лендинг с героем и превью категорий- **Three.js** для эффекта PixelBlast

- `CatalogPage` - Каталог с фильтрами (цвет, размер, цена, рейтинг)

- `ProductPage` - Детали товара с галереей и отзывами- **Context API** для управления корзинойnpm run build### Запуск

- `CartPage` - Управление корзиной

- `ContactsPage` - Контактная информация

- `InfoPage` - FAQ в аккордеоне

## 📁 Структура проекта

### UI компоненты

- `Header` - Навигация с эффектами при скролле

- `ProductCard` - Карточка товара с рейтингом

- `ProductCarousel` - Карусель товаров```# Деплой на GitHub Pages```bash

- `SectionHeader` - Заголовок секции с кнопкой "Показать все"

- `QuantitySelector` - Селектор количества товараsrc/

- `StarRating` - Компонент отображения рейтинга

├── components/npx gh-pages -d build# Режим разработки

## 🛠️ Скрипты

│   ├── pages/      # Страницы приложения

```bash

npm start          # Запуск dev сервера на localhost:3000│   ├── shared/     # Переиспользуемые компоненты```npm start

npm run build      # Production сборка

npm test           # Запуск тестов│   └── ui/         # UI компоненты

```

├── constants/      # Константы (фильтры, опции)

## ⚙️ Деплой на GitHub Pages

├── context/        # React Context (Cart)

```bash

# Установить переменную окружения и собрать├── data/           # Данные приложения (products, content)## 🎨 Технологии# Открыть http://localhost:3000 в браузере

$env:PUBLIC_URL="/RecrentShop"

npm run build├── hooks/          # Кастомные хуки



# Задеплоить на gh-pages├── lib/            # Утилиты```

npx gh-pages -d build

```└── types/          # TypeScript типы и интерфейсы



## 📝 Разработка```- React 18 + TypeScript



### Добавление нового товара



```typescript## 📄 Основные страницы- Tailwind CSS### Сборка

// src/data/products.ts

export const MOUSEPADS: Product[] = [

  // ...existing products

  {- `/` - Главная страница с категориями товаров- React Router v6

    id: 13,

    image: '/images/products/mousepads/xl/new-mousepad.webp',- `/catalog` - Каталог с фильтрами и сортировкой

    title: 'Коврик для мыши',

    subtitle: '"new-design"',- `/product` - Детальная страница товара- Three.js (PixelBlast эффект)```bash

    productSize: 'XL',

    price: '3 500 р.',- `/cart` - Корзина покупок

    priceNumeric: 3500,

    rating: 5,- `/contacts` - Контактная информация# Production сборка

    reviewCount: 10,

    color: 'black',- `/info` - FAQ и информация о магазине

    category: 'mousepads'

  }## 📁 Структураnpm run build

];

```## 🧩 Ключевые компоненты



### Создание нового компонента



```typescript### Страницы

// src/components/ui/MyComponent.tsx

import React from 'react';- `MainPage` - Лендинг с героем и превью категорий```# Результат в папке /build



interface MyComponentProps {- `CatalogPage` - Каталог с фильтрами (цвет, размер, цена, рейтинг)

  title: string;

}- `ProductPage` - Детали товара с галереей и отзывамиsrc/```



const MyComponent: React.FC<MyComponentProps> = ({ title }) => {- `CartPage` - Управление корзиной

  return (

    <div className="...">- `ContactsPage` - Контактная информация├── components/

      <h2>{title}</h2>

    </div>- `InfoPage` - FAQ в аккордеоне

  );

};│   ├── pages/      # Страницы## 📁 Структура



export default MyComponent;### UI компоненты

```

- `Header` - Навигация с эффектами при скролле│   ├── shared/     # Общие компоненты

## 📊 Статистика проекта

- `ProductCard` - Карточка товара с рейтингом

- **Строк кода**: ~4000+

- **Компонентов**: 20+- `ProductCarousel` - Карусель товаров│   └── ui/         # UI компоненты```

- **Страниц**: 7

- **Товаров**: 12- `SectionHeader` - Заголовок секции с кнопкой "Показать все"

- **TypeScript**: 100%

- `QuantitySelector` - Селектор количества товара├── context/        # React Context (Cart)src/

## 📚 Документация

- `StarRating` - Компонент отображения рейтинга

- [Отчёт об оптимизации](OPTIMIZATION_REPORT.md)

- [Отчёт о рефакторинге](REFACTORING_REPORT.md)├── data/           # Контент данные├── components/



## 🤝 Вклад в проект## 🛠️ Скрипты



1. Fork репозитория└── lib/            # Утилиты│   ├── pages/      # Страницы (Main, Catalog, Product, etc.)

2. Создайте feature branch (`git checkout -b feature/AmazingFeature`)

3. Commit изменений (`git commit -m 'Add some AmazingFeature'`)```bash

4. Push в branch (`git push origin feature/AmazingFeature`)

5. Откройте Pull Requestnpm start          # Запуск dev сервера на localhost:3000```│   ├── shared/     # Общие компоненты (Header, Modal, etc.)



## 📄 Лицензияnpm run build      # Production сборка



Этот проект создан для образовательных целей.npm test           # Запуск тестов│   └── ui/         # UI компоненты (ProductCard, Carousel, etc.)



## 👤 Автор```



**Sensoria Lab**## 📄 Основные страницы├── data/           # Данные (offerContent.ts)

- GitHub: [@Sensoria-Lab](https://github.com/Sensoria-Lab)

- Website: [sensoria-lab.github.io/RecrentShop](https://sensoria-lab.github.io/RecrentShop)## ⚙️ Деплой на GitHub Pages



---├── App.tsx         # Главный компонент



⭐️ Если проект понравился, поставьте звезду!```bash


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

