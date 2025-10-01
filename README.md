# 🛍️ RecrentShop


## 🚀 Быстрый старт

### Установка

```bash
# Клонировать репозиторий
git clone https://github.com/Sensoria-Lab/RecrentShop.git

# Перейти в директорию
cd biznes

# Установить зависимости
npm install
```

### Запуск

```bash
# Режим разработки
npm start

# Открыть http://localhost:3000 в браузере
```

### Сборка

```bash
# Production сборка
npm run build

# Результат в папке /build
```

## 📁 Структура

```
src/
├── components/
│   ├── pages/      # Страницы (Main, Catalog, Product, etc.)
│   ├── shared/     # Общие компоненты (Header, Modal, etc.)
│   └── ui/         # UI компоненты (ProductCard, Carousel, etc.)
├── data/           # Данные (offerContent.ts)
├── App.tsx         # Главный компонент
└── index.tsx       # Точка входа
```

Подробнее: [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)

## 🎨 Технологии

- **React 18** - UI фреймворк
- **TypeScript** - Типизация
- **Tailwind CSS** - Стилизация
- **React Router v6** - Навигация
- **PostCSS** - CSS обработка

## 📄 Страницы

- `/` - Главная страница
- `/catalog` - Каталог товаров
- `/product` - Страница товара
- `/contacts` - Контакты
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

