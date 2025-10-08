<div align="center">

# 🛍️ RecrentShop

### Профессиональная E-commerce платформа для ковриков и одежды

[![Live Demo](https://img.shields.io/badge/demo-live-success?style=for-the-badge)](https://sensoria-lab.github.io/RecrentShop)
[![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](LICENSE)

[🎯 Демо](https://sensoria-lab.github.io/RecrentShop) • [📚 Документация](SETUP_GUIDE.md) • [🐛 Баг-репорт](https://github.com/Sensoria-Lab/RecrentShop/issues)

</div>

---

## ✨ Особенности

🎨 **Современный UI/UX**
- Минималистичный дизайн с продуманными анимациями
- Адаптивная верстка для всех устройств
- Интерактивные элементы с плавными переходами

🛒 **Функционал E-commerce**
- Умные фильтры по цвету, размеру, цене и рейтингу
- Система корзины с локальным хранилищем
- Динамическая система отзывов с пагинацией
- Галерея изображений с полноэкранным просмотром

🔐 **Панель администратора**
- Защищенная авторизация
- Управление товарами и заказами
- Аналитика продаж

⚡ **Производительность**
- Оптимизированная сборка React
- Lazy loading изображений
- Code splitting для быстрой загрузки

## 🚀 Быстрый старт

### Предварительные требования

- Node.js 16+ и npm 8+
- Git

### Установка

```bash
# 1. Клонировать репозиторий
git clone https://github.com/Sensoria-Lab/RecrentShop.git
cd RecrentShop

# 2. Установить зависимости
npm install

# 3. Запустить сервер разработки
npm start
```

Приложение откроется на [http://localhost:3000/RecrentShop](http://localhost:3000/RecrentShop)

### Доступные команды

```bash
npm start          # Запуск dev сервера с hot reload
npm run build      # Production сборка (оптимизированная)
npm test           # Запуск тестов Jest
npm run lint       # Проверка кода ESLint
npm run format     # Форматирование кода Prettier
npm run type-check # Проверка TypeScript типов
```

## 🛠️ Технологический стек

### Frontend
| Технология | Версия | Назначение |
|-----------|--------|-----------|
| **React** | 18.2.0 | UI библиотека |
| **TypeScript** | 4.9.5 | Типизация |
| **React Router** | 6.23.0 | Маршрутизация |
| **Tailwind CSS** | 3.3.0 | Стилизация |
| **Lucide React** | 0.544.0 | Иконки |

### Инструменты разработки
- **react-scripts** - build tooling
- **gh-pages** - deployment
- **PostCSS** - CSS processing
- **Autoprefixer** - vendor prefixes

## 📁 Структура проекта

```
RecrentShop/
├── 📂 public/              # Статические файлы
│   ├── index.html          # HTML шаблон
│   └── images/             # Изображения товаров
├── 📂 src/
│   ├── 📂 components/
│   │   ├── pages/          # Страницы (Main, Catalog, Product, Cart, Admin)
│   │   ├── shared/         # Переиспользуемые компоненты
│   │   └── ui/             # UI компоненты (Modal, Header, Footer)
│   ├── 📂 constants/       # Конфигурация и константы
│   ├── 📂 context/         # React Context (CartContext)
│   ├── 📂 data/            # Данные (products, reviews, content)
│   ├── 📂 hooks/           # Кастомные хуки
│   ├── 📂 lib/             # Утилиты и хелперы
│   ├── 📂 services/        # API сервисы
│   ├── 📂 types/           # TypeScript интерфейсы
│   ├── 📂 utils/           # Утилиты (auth, validators)
│   ├── App.tsx             # Главный компонент
│   └── index.tsx           # Точка входа
├── 📂 backend/             # Node.js бэкенд (опционально)
├── 📂 build/               # Production сборка
├── package.json            # Зависимости и скрипты
├── tsconfig.json           # TypeScript конфигурация
└── tailwind.config.js      # Tailwind конфигурация
```

## 📄 Страницы

| Маршрут | Описание | Особенности |
|---------|----------|-------------|
| `/` | Главная страница | Hero секция, категории товаров, акции |
| `/catalog` | Каталог товаров | Фильтры, сортировка, пагинация |
| `/product/:id` | Страница товара | Галерея изображений, отзывы, характеристики |
| `/cart` | Корзина | Управление товарами, расчет суммы |
| `/support` | Поддержка | FAQ, контакты, социальные сети |
| `/admin/login` | Админ вход | Авторизация |
| `/admin` | Админ панель | Управление (защищено) |

## 🧩 Ключевые компоненты

### 🎯 Страницы
- **MainPage** - Лендинг с hero-секцией и категориями
- **CatalogPage** - Каталог с многоуровневыми фильтрами
- **ProductPage** - Детальная страница с галереей и отзывами
- **CartPage** - Корзина с подсчетом общей стоимости
- **SupportPage** - FAQ в аккордеоне + социальные сети

### 🎨 UI Компоненты
- **Header** - Навигация с эффектами при скролле
- **Footer** - Подвал с ссылками и социальными сетями
- **ProductCard** - Карточка товара с рейтингом и ценой
- **ProductCarousel** - Карусель товаров с защитой от drag
- **ImageGalleryModal** - Полноэкранная галерея с навигацией
- **ReviewCard** - Карточка отзыва с автором и датой
- **Modal** - Универсальное модальное окно
- **StarRating** - Визуализация рейтинга звездами

### 🔧 Кастомные хуки
- **useProduct** - Получение данных товара
- **useProductImages** - Управление галереей изображений
- **useAddToCart** - Добавление товара в корзину
- **useProductFilters** - Фильтрация и сортировка товаров
- **useProductNavigation** - Навигация между товарами
- **useLocalStorage** - Синхронизация с localStorage

## 🚢 Деплой

### GitHub Pages (автоматический)

```bash
# Установить PUBLIC_URL и выполнить деплой
$env:PUBLIC_URL="/RecrentShop"; npm run build; npx gh-pages -d build
```

### Ручной деплой

```bash
# 1. Установить переменную окружения
$env:PUBLIC_URL="/RecrentShop"

# 2. Собрать production версию
npm run build

# 3. Задеплоить на GitHub Pages
npx gh-pages -d build
```

Сайт будет доступен по адресу: `https://<username>.github.io/RecrentShop`

### Другие платформы

<details>
<summary>Vercel</summary>

```bash
# Установить Vercel CLI
npm i -g vercel

# Деплой
vercel --prod
```
</details>

<details>
<summary>Netlify</summary>

```bash
# Build settings
Build command: npm run build
Publish directory: build
```
</details>

## 👨‍💻 Разработка

### Добавление нового товара

```typescript
// src/data/products.ts
import { Product } from '../types/product';

export const MOUSEPADS: Product[] = [
  // ...existing products
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
];
```

### Создание нового компонента

```typescript
// src/components/ui/MyComponent.tsx
import React from 'react';

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

### Добавление новой страницы

```typescript
// 1. Создать компонент страницы
// src/components/pages/NewPage.tsx
import PageLayout from '../shared/PageLayout';

const NewPage = () => {
  return (
    <PageLayout>
      <h1>New Page</h1>
    </PageLayout>
  );
};

export default NewPage;

// 2. Добавить маршрут в App.tsx
import NewPage from './components/pages/NewPage';

<Route path="/new-page" element={<NewPage />} />
```

### Работа с конфигурацией

```typescript
// src/constants/config.ts
export const SITE_CONFIG = {
  name: 'RecrentShop',
  title: 'RecrentShop - Магазин ковриков',
  description: 'Профессиональные игровые коврики',
  // ...
};

// Использование в компонентах
import { SITE_CONFIG } from '../constants/config';

console.log(SITE_CONFIG.name); // 'RecrentShop'
```

## 📊 Статистика проекта

```
📦 Размер сборки:      ~500 KB (gzipped)
📝 Строк кода:         ~4000+ LOC
🧩 Компонентов:        25+
📄 Страниц:            7
🛍️ Товаров:            12
✅ TypeScript:          100%
⚡ Lighthouse Score:    95+
```

## 📚 Документация

| Документ | Описание |
|----------|----------|
| [SETUP_GUIDE.md](SETUP_GUIDE.md) | Подробное руководство по настройке |
| [BACKEND_INTEGRATION.md](BACKEND_INTEGRATION.md) | Интеграция с бэкендом |
| [OPTIMIZATION_REPORT.md](OPTIMIZATION_REPORT.md) | Отчёт об оптимизации проекта |
| [CHANGELOG_OPTIMIZATION.md](CHANGELOG_OPTIMIZATION.md) | История оптимизаций |

## 🤝 Вклад в проект

Мы приветствуем ваш вклад! Для участия в разработке:

1. **Fork** репозитория
2. Создайте **feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit** ваших изменений
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push** в branch
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Откройте **Pull Request**

### Правила коммитов

Используйте [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: добавить новую функцию
fix: исправить баг
docs: обновить документацию
style: изменить форматирование
refactor: рефакторинг кода
test: добавить тесты
chore: обновить зависимости
```

## 🐛 Нашли баг?

Создайте [issue](https://github.com/Sensoria-Lab/RecrentShop/issues) с описанием:
- Шагов для воспроизведения
- Ожидаемого поведения
- Фактического поведения
- Скриншотов (если применимо)

## 📝 Лицензия

Распространяется под лицензией MIT. См. файл [LICENSE](LICENSE) для подробностей.

## 👨‍💻 Автор

**Sensoria Lab**

- 🌐 Website: [sensoria-lab.github.io/RecrentShop](https://sensoria-lab.github.io/RecrentShop)
- 💼 GitHub: [@Sensoria-Lab](https://github.com/Sensoria-Lab)
- 📧 Email: contact@sensorialab.com

## 🙏 Благодарности

- [React](https://reactjs.org/) - UI библиотека
- [Tailwind CSS](https://tailwindcss.com/) - CSS фреймворк
- [Lucide](https://lucide.dev/) - Иконки
- [React Router](https://reactrouter.com/) - Маршрутизация

---

<div align="center">

**⭐ Если проект понравился, поставьте звезду! ⭐**

Made with ❤️ by Sensoria Lab

</div>
