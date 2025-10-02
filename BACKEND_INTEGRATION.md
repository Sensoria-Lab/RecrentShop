# Backend Integration Guide

Руководство по подготовке и интеграции бэкенда для RecrentShop.

## Текущее состояние

Проект готов к интеграции с бэкендом:
- ✅ Централизованная структура контента (`src/data/siteContent.ts`)
- ✅ TypeScript типы для всех данных (`src/types/content.ts`)
- ✅ API service слой с моками (`src/services/api.ts`)
- ⏳ Компоненты используют данные напрямую (требуется рефакторинг)

## Структура данных

### 1. Продукты (Products)

**Локация:** `src/data/products.ts` → `src/data/siteContent.ts`

**Тип:** `Product` из `src/types/product.ts`

```typescript
interface Product {
  id: number | string;
  image: string;
  images: string[];
  title: string;
  subtitle?: string;
  productSize?: string;
  productColor?: string;
  price: string;
  priceNumeric: number;
  rating: number;
  reviewCount: number;
  color: string;
  category: 'mousepads' | 'clothing';
  clothingType?: 'hoodie' | 't-shirt';
}
```

### 2. Информационные блоки (Info)

**Локация:** `src/components/pages/InfoPage.tsx` → `src/data/siteContent.ts`

```typescript
interface InfoItem {
  id: string;
  title: string;
  content: string;
  icon?: string;
}
```

**Блоки:**
- `sizes` - Размеры одежды
- `delivery` - Доставка
- `offer` - Оферта (полный текст договора)
- `track` - Где мой заказ

### 3. Контакты (Contacts)

**Локация:** `src/components/pages/ContactsPage.tsx` → `src/data/siteContent.ts`

```typescript
interface ContactItem {
  id: string;
  title: string;
  url: string;
  description?: string;
  icon?: string;
}
```

### 4. Контент главной страницы (Hero)

```typescript
interface HeroContent {
  title: string;
  ctaButton: string;
}
```

## API Endpoints (Рекомендуемые)

### Products

```
GET    /api/products              - Получить все товары
GET    /api/products/:id          - Получить товар по ID
GET    /api/products?category=X   - Фильтр по категории
POST   /api/products              - Создать товар (админ)
PUT    /api/products/:id          - Обновить товар (админ)
DELETE /api/products/:id          - Удалить товар (админ)
```

**Response format:**
```json
{
  "success": true,
  "data": [...],
  "message": "Products fetched successfully"
}
```

### Content

```
GET /api/content           - Получить весь контент сайта
GET /api/content/info      - Информационные блоки
GET /api/content/contacts  - Контакты
GET /api/content/hero      - Главная страница
PUT /api/content/:section  - Обновить секцию (админ)
```

### Images

```
POST   /api/images/upload  - Загрузить изображение
DELETE /api/images/:id     - Удалить изображение
```

**Response format:**
```json
{
  "success": true,
  "data": {
    "url": "https://cdn.example.com/image.jpg",
    "id": "img_123"
  }
}
```

### Orders (Будущее)

```
POST   /api/orders         - Создать заказ
GET    /api/orders/:id     - Получить заказ
GET    /api/orders/user/:userId - Заказы пользователя
PUT    /api/orders/:id     - Обновить статус заказа
```

## База данных

### Рекомендуемая структура таблиц

#### products
```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  subtitle VARCHAR(255),
  product_size VARCHAR(50),
  product_color VARCHAR(50),
  price VARCHAR(50) NOT NULL,
  price_numeric DECIMAL(10,2) NOT NULL,
  rating DECIMAL(2,1) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  color VARCHAR(50),
  category VARCHAR(50) NOT NULL,
  clothing_type VARCHAR(50),
  image TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### product_images
```sql
CREATE TABLE product_images (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### content_blocks
```sql
CREATE TABLE content_blocks (
  id VARCHAR(50) PRIMARY KEY,
  section VARCHAR(50) NOT NULL,
  title VARCHAR(255),
  content TEXT,
  icon TEXT,
  url TEXT,
  description TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### orders
```sql
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL,
  user_phone VARCHAR(50) NOT NULL,
  delivery_address TEXT NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  tracking_number VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### order_items
```sql
CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  product_snapshot JSONB -- Снимок товара на момент заказа
);
```

## Хранение изображений

### Рекомендации:

1. **CDN/Cloud Storage:**
   - AWS S3 + CloudFront
   - Cloudinary
   - DigitalOcean Spaces
   - Vercel Blob Storage

2. **Структура URL:**
   ```
   https://cdn.recrentshop.ru/products/mousepads/xl/xl_black_geoid/114_001.webp
   ```

3. **Оптимизация:**
   - WebP формат (уже используется)
   - Автоматический resize/compress
   - Lazy loading (уже реализовано)

## Миграция с моков на реальный API

### Шаг 1: Настроить переменные окружения

Создать `.env`:
```
REACT_APP_API_URL=https://api.recrentshop.ru
REACT_APP_CDN_URL=https://cdn.recrentshop.ru
```

### Шаг 2: Раскомментировать HTTP запросы в `src/services/api.ts`

Заменить моки на реальные вызовы:
```typescript
// Было (мок):
async getAll(): Promise<ProductsApiResponse> {
  return new Promise((resolve) => {
    resolve({ success: true, data: getAllProducts() });
  });
}

// Станет (реальный API):
async getAll(): Promise<ProductsApiResponse> {
  return apiClient.get<Product[]>('/products');
}
```

### Шаг 3: Обновить компоненты для использования API

Пример рефакторинга `CatalogPage.tsx`:
```typescript
// Было:
import { getAllProducts } from '../data/siteContent';
const products = getAllProducts();

// Станет:
import { API } from '../services/api';
const [products, setProducts] = useState<Product[]>([]);

useEffect(() => {
  const fetchProducts = async () => {
    const response = await API.products.getAll();
    if (response.success && response.data) {
      setProducts(response.data);
    }
  };
  fetchProducts();
}, []);
```

### Шаг 4: Добавить loading/error states

```typescript
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await API.products.getAll();
      if (response.success && response.data) {
        setProducts(response.data);
      } else {
        setError(response.error || 'Failed to fetch products');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };
  fetchProducts();
}, []);
```

## Админ-панель (Будущее)

### Необходимый функционал:

1. **Управление товарами:**
   - Добавление/редактирование/удаление
   - Загрузка изображений
   - Управление категориями и размерами

2. **Управление контентом:**
   - Редактирование информационных блоков
   - Редактирование контактов
   - Редактирование текста главной страницы

3. **Управление заказами:**
   - Просмотр заказов
   - Обновление статусов
   - Добавление трек-номеров

4. **Аутентификация:**
   - JWT токены
   - Роли: admin, manager

## Технологии для бэкенда (Рекомендации)

### Node.js + Express
```javascript
// Пример роута
app.get('/api/products', async (req, res) => {
  const products = await db.query('SELECT * FROM products');
  res.json({ success: true, data: products.rows });
});
```

### Альтернативы:
- NestJS (более структурированный)
- Fastify (быстрый)
- Strapi (готовая CMS)

## Чеклист интеграции

- [ ] Развернуть базу данных
- [ ] Создать API endpoints
- [ ] Настроить хранилище изображений
- [ ] Мигрировать существующие товары в БД
- [ ] Обновить `src/services/api.ts` для реальных запросов
- [ ] Рефакторинг компонентов для использования API
- [ ] Добавить loading/error states
- [ ] Реализовать аутентификацию
- [ ] Создать админ-панель
- [ ] Настроить CORS
- [ ] Добавить rate limiting
- [ ] Настроить логирование
- [ ] Написать документацию API (Swagger/OpenAPI)

## Контакты и вопросы

При возникновении вопросов по интеграции обращайтесь к этому документу или к разработчику фронтенда.
