# Recrent Shop Backend

Backend API для интернет-магазина Recrent Shop.

## Технологии

- **Node.js** + **Express** - веб-сервер
- **MySQL** - база данных (SmartASP.NET)
- **JWT** - авторизация
- **bcryptjs** - хеширование паролей

## Установка

1. Установите зависимости:
```bash
cd backend
npm install
```

2. Настройте переменные окружения в файле `.env` (уже создан)

3. Инициализируйте базу данных:
```bash
npm run init-db
```

Эта команда создаст таблицы `products` и `admin_users`, а также создаст пользователя-админа по умолчанию.

## Запуск

**Development режим:**
```bash
npm run dev
```

**Production режим:**
```bash
npm start
```

Сервер запустится на `http://localhost:5000`

## API Endpoints

### Авторизация

- **POST** `/api/auth/login` - вход админа
  ```json
  {
    "username": "admin",
    "password": "admin123"
  }
  ```

- **POST** `/api/auth/verify` - проверка токена
  ```json
  {
    "token": "your-jwt-token"
  }
  ```

### Товары

- **GET** `/api/products` - получить все товары (public)
- **GET** `/api/products/:id` - получить товар по ID (public)
- **POST** `/api/products` - добавить товар (требует авторизацию)
- **PUT** `/api/products/:id` - обновить товар (требует авторизацию)
- **DELETE** `/api/products/:id` - удалить товар (требует авторизацию)

### Health Check

- **GET** `/api/health` - статус сервера

## Авторизация

Для защищенных endpoints используйте заголовок:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

## Учетные данные по умолчанию

**Username:** `admin`
**Password:** `admin123`

⚠️ **ВАЖНО:** Измените пароль после первого входа!

## Структура проекта

```
backend/
├── db/
│   └── config.js          # Конфигурация MySQL
├── middleware/
│   └── auth.js            # JWT middleware
├── routes/
│   ├── auth.js            # Авторизация
│   └── products.js        # CRUD товаров
├── scripts/
│   └── initDatabase.js    # Инициализация БД
├── .env                   # Переменные окружения
├── server.js              # Главный файл сервера
└── package.json
```

## База данных

### Таблица `products`

| Поле | Тип | Описание |
|------|-----|----------|
| id | INT | Primary key |
| title | VARCHAR(255) | Название товара |
| subtitle | VARCHAR(255) | Подзаголовок |
| price | VARCHAR(50) | Цена (строка) |
| priceNumeric | INT | Цена (число) |
| rating | INT | Рейтинг (1-5) |
| reviewCount | INT | Кол-во отзывов |
| color | VARCHAR(50) | Цвет |
| category | VARCHAR(50) | Категория |
| clothingType | VARCHAR(50) | Тип одежды |
| productSize | VARCHAR(20) | Размер |
| productColor | VARCHAR(50) | Цвет (описание) |
| image | TEXT | URL главного изображения |
| images | JSON | Массив URL изображений |

### Таблица `admin_users`

| Поле | Тип | Описание |
|------|-----|----------|
| id | INT | Primary key |
| username | VARCHAR(100) | Имя пользователя (unique) |
| passwordHash | VARCHAR(255) | Хеш пароля |
| createdAt | TIMESTAMP | Дата создания |
| lastLogin | TIMESTAMP | Последний вход |
