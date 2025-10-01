# 🛒 RecrentShop

> Современный интернет-магазин игровых аксессуаров с премиальным дизайном

[![Live Demo](https://img.shields.io/badge/demo-online-green.svg)](https://sensoria-lab.github.io/RecrentShop)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9.0-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3.0-38bdf8.svg)](https://tailwindcss.com/)

## 🌟 Особенности

- ⚡ **React 18** с TypeScript для типобезопасности
- 🎨 **Tailwind CSS** для современного дизайна
- 🛣️ **React Router v6** для навигации
- 🛒 **Корзина с localStorage** для сохранения данных
- 🎯 **Кастомный курсор** для уникального UX
- ✨ **Анимации** и эффекты для интерактивности
- 📱 **Адаптивный дизайн** для всех устройств
- 🚀 **Lazy loading** страниц для производительности
- 🎭 **Премиум UI/UX** с градиентами и эффектами

## 🖥️ Демо

**🌐 Живая версия:** [https://sensoria-lab.github.io/RecrentShop](https://sensoria-lab.github.io/RecrentShop)

### Основные страницы:
- 🏠 **Главная** - Презентация магазина с динамическими эффектами
- 📦 **Каталог** - Витрина товаров с фильтрами
- 🔍 **Страница товара** - Детальная информация с выбором параметров
- 🛒 **Корзина** - Управление заказами
- 📞 **Контакты** - Информация для связи
- ℹ️ **О магазине** - Информация о компании

## 🚀 Быстрый старт

### Требования
- Node.js 14.x или выше
- npm или yarn

### Установка

```bash
# Клонируйте репозиторий
git clone https://github.com/Sensoria-Lab/RecrentShop.git

# Перейдите в папку проекта
cd RecrentShop

# Установите зависимости
npm install

# Запустите dev-сервер
npm start
```

Приложение откроется по адресу [http://localhost:3000](http://localhost:3000)

## 📦 Сборка для продакшена

```bash
# Соберите оптимизированную версию
npm run build

# Задеплойте на GitHub Pages
npm run deploy
```

## 🛠️ Технологии

### Frontend
- **React 18.2.0** - UI библиотека
- **TypeScript 4.9.0** - Типизация
- **React Router DOM 6.23.0** - Маршрутизация
- **Tailwind CSS 3.3.0** - Стилизация
- **Lucide React** - Иконки

### Dev Tools
- **React Scripts 5.0.1** - Сборка
- **PostCSS** - CSS обработка
- **Autoprefixer** - CSS префиксы
- **gh-pages** - Деплой

## 📂 Структура проекта

```
RecrentShop/
├── public/
│   ├── images/          # Изображения товаров и UI
│   ├── index.html       # HTML шаблон
│   └── 404.html         # Fallback для маршрутизации
├── src/
│   ├── components/
│   │   ├── pages/       # Страницы приложения
│   │   ├── shared/      # Переиспользуемые компоненты
│   │   └── ui/          # UI компоненты
│   ├── context/         # React Context (корзина)
│   ├── data/            # Данные товаров
│   ├── App.tsx          # Главный компонент
│   ├── index.tsx        # Точка входа
│   └── index.css        # Глобальные стили
├── package.json         # Зависимости
├── tsconfig.json        # TypeScript конфиг
├── tailwind.config.js   # Tailwind конфиг
└── README.md           # Документация
```

## 🎨 Дизайн

### Цветовая палитра
- **Фон:** Темный градиент (zinc-900 → black)
- **Акценты:** Синий (#3B82F6) и фиолетовый (#8B5CF6)
- **Текст:** Белый с различной прозрачностью
- **Карточки:** Полупрозрачный фон с backdrop-blur

### Особенности дизайна
- ✨ Анимированные градиенты
- 💫 Эффекты свечения при наведении
- 🎭 Кастомный курсор с эффектом свечения
- 🌊 Плавные переходы и анимации
- 📱 Адаптивная сетка

## 🛒 Функциональность

### Корзина
- ✅ Добавление товаров с параметрами (размер, цвет, тип)
- ✅ Изменение количества
- ✅ Удаление товаров
- ✅ Подсчет итоговой суммы
- ✅ Сохранение в localStorage
- ✅ Анимация "летящего товара"

### Страница товара
- 🎨 Выбор цвета (черный, серый, красный)
- 📏 Выбор размера (XL, L)
- ⚡ Выбор типа (Speed, Balance)
- 🖼️ Карусель изображений
- 📝 Динамическое описание
- ⭐ Рейтинг и отзывы
- 🎯 Анимация добавления в корзину

## 🔧 Команды разработки

```bash
# Запуск dev-сервера
npm start

# Сборка для продакшена
npm run build

# Запуск тестов
npm test

# Деплой на GitHub Pages
npm run deploy

# Установка зависимостей
npm install
```

## 📝 Скрипты

- `npm start` - Запуск dev-сервера (localhost:3000)
- `npm run build` - Сборка продакшн версии
- `npm run deploy` - Деплой на GitHub Pages
- `npm test` - Запуск тестов
- `npm run eject` - Извлечение конфигурации (необратимо!)

## 🚀 Деплой

Подробная инструкция по деплою находится в файле [DEPLOY_GUIDE.md](./DEPLOY_GUIDE.md)

### Быстрый деплой

```bash
# 1. Убедитесь, что код загружен на GitHub
git add .
git commit -m "Ready for deploy"
git push origin main

# 2. Задеплойте на GitHub Pages
npm run deploy
```

Сайт будет доступен по адресу: `https://sensoria-lab.github.io/RecrentShop`

## 🤝 Участие в разработке

1. Форкните проект
2. Создайте ветку для фичи (`git checkout -b feature/AmazingFeature`)
3. Закоммитьте изменения (`git commit -m 'Add some AmazingFeature'`)
4. Запушьте в ветку (`git push origin feature/AmazingFeature`)
5. Откройте Pull Request

## 📄 Лицензия

Этот проект находится под лицензией MIT - см. файл [LICENSE](LICENSE) для деталей

## 👤 Автор

**Sensoria Lab**

- GitHub: [@Sensoria-Lab](https://github.com/Sensoria-Lab)
- Website: [RecrentShop](https://sensoria-lab.github.io/RecrentShop)

## 📧 Контакты

- Email: info@recrentshop.ru
- Telegram: [@recrentshop](https://t.me/recrentshop)

## 🙏 Благодарности

- [React](https://reactjs.org/) - За отличный UI фреймворк
- [Tailwind CSS](https://tailwindcss.com/) - За удобную систему стилей
- [Lucide](https://lucide.dev/) - За красивые иконки
- [GitHub Pages](https://pages.github.com/) - За бесплатный хостинг

---

⭐ Поставьте звезду, если проект вам понравился!

**Сделано с ❤️ командой Sensoria Lab**
