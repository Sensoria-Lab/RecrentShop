# Новая Структура Проекта RecrentShop

## 📁 Дерево Каталогов (Оптимизированная Версия)

```
rrshop/
│
├── public/                    # Статические ассеты
│   ├── images/
│   └── index.html
│
├── src/
│   │
│   ├── pages/                 # Роутинг — контейнеры страниц
│   │   ├── MainPage.tsx
│   │   ├── CatalogPage.tsx    ✨ -48% строк (170 vs 330)
│   │   ├── ProductPage.tsx    ⚠️ 695 строк (требует рефакторинга)
│   │   ├── CartPage.tsx
│   │   ├── CheckoutPage.tsx
│   │   ├── AccountPage.tsx
│   │   └── SupportPage.tsx
│   │
│   ├── features/              # Фичи приложения (Feature-Sliced Design)
│   │   │
│   │   ├── products/          ✨ ОСНОВНАЯ ФИЧА
│   │   │   ├── components/    # UI компоненты фичи
│   │   │   │   ├── ActiveFilters.tsx
│   │   │   │   ├── Breadcrumbs.tsx
│   │   │   │   ├── CategorySelector.tsx
│   │   │   │   ├── DecryptedText.tsx
│   │   │   │   ├── FiltersPanel.tsx
│   │   │   │   ├── FilterSection.tsx
│   │   │   │   ├── ImageGalleryModal.tsx
│   │   │   │   ├── ProductBadge.tsx
│   │   │   │   ├── ProductCard.tsx
│   │   │   │   ├── ProductCarousel.tsx
│   │   │   │   ├── ProductGrid.tsx
│   │   │   │   ├── QuantitySelector.tsx
│   │   │   │   ├── ReviewCard.tsx
│   │   │   │   ├── SelectorButton.tsx
│   │   │   │   ├── SelectorGroup.tsx
│   │   │   │   ├── StarRating.tsx
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── hooks/          # Custom hooks для фичи
│   │   │   │   ├── useActiveFilters.ts
│   │   │   │   ├── useCatalogFilters.ts   ⬅️ НОВЫЙ (инкапсулирует всю логику)
│   │   │   │   ├── useFilterCounts.ts
│   │   │   │   ├── useProduct.ts
│   │   │   │   ├── useProductFilters.ts
│   │   │   │   ├── useProductImages.ts
│   │   │   │   ├── useProductNavigation.ts
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── model/          ⬅️ НОВЫЙ СЛОЙ (бизнес-логика)
│   │   │   │   ├── filters.ts  // FilterState, FilterAction, reducer (150 строк)
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   └── types/          # TypeScript типы
│   │   │       ├── product.types.ts
│   │   │       ├── filter.types.ts
│   │   │       └── index.ts
│   │   │
│   │   └── cart/               # Корзина
│   │       ├── components/
│   │       ├── hooks/
│   │       │   ├── useAddToCart.ts
│   │       │   └── index.ts
│   │       └── types/
│   │
│   ├── shared/                 # Переиспользуемые модули
│   │   │
│   │   ├── components/         # Layout компоненты
│   │   │   ├── BottomNavigation.tsx
│   │   │   ├── CartSidebar.tsx
│   │   │   ├── ErrorBoundary.tsx  ✨ обновлён (использует unified Button)
│   │   │   ├── Footer.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── LoadingSkeleton.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── PageContainer.tsx
│   │   │   ├── PageLayout.tsx
│   │   │   ├── SEO.tsx
│   │   │   ├── ShadcnBubble.tsx
│   │   │   ├── StructuredData.tsx
│   │   │   ├── Toast.tsx
│   │   │   ├── ToastContainer.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── hooks/              # Общие хуки
│   │   │   ├── useIntersectionObserver.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── lib/                # Утилиты
│   │   │   ├── utils.ts        // cn(), throttle(), clamp()
│   │   │   ├── productUtils.ts // isClothing(), isProMousepad()
│   │   │   └── shadcn-ui/
│   │   │       └── lib/
│   │   │           └── utils.ts
│   │   │
│   │   ├── types/              # Общие типы
│   │   │   ├── content.ts
│   │   │   ├── motion-react.d.ts
│   │   │   └── index.ts
│   │   │
│   │   └── ui/                 ✨ УНИФИЦИРОВАННАЯ UI СИСТЕМА
│   │       │
│   │       ├── ui/             # shadcn-ui компоненты (PRIMARY)
│   │       │   ├── button.tsx  ✨ объединён с custom (primary, danger, success)
│   │       │   ├── input.tsx
│   │       │   ├── label.tsx
│   │       │   ├── textarea.tsx
│   │       │   ├── dialog.tsx
│   │       │   ├── accordion.tsx
│   │       │   ├── tabs.tsx
│   │       │   ├── checkbox.tsx
│   │       │   ├── popover.tsx
│   │       │   ├── badge.tsx
│   │       │   ├── skeleton.tsx
│   │       │   ├── tooltip.tsx
│   │       │   └── sonner.tsx
│   │       │
│   │       ├── Button/         ⚠️ DEPRECATED (удалить после миграции)
│   │       ├── Input/          ⚠️ DEPRECATED
│   │       │
│   │       ├── Card/           # Custom компоненты
│   │       │   ├── Card.tsx
│   │       │   └── index.ts
│   │       │
│   │       ├── Checkbox.tsx
│   │       ├── RadioGroup.tsx
│   │       ├── Img.tsx
│   │       └── index.ts        ✨ обновлён (экспорт из ui/button.tsx)
│   │
│   └── core/                   # Ядро приложения
│       │
│       ├── api/                # API клиенты
│       │   ├── api.ts          ⚠️ 8 TODO комментариев
│       │   └── index.ts
│       │
│       ├── config/
│       │
│       ├── constants/          # Константы приложения
│       │   ├── config.ts
│       │   ├── routes.ts
│       │   ├── selectorOptions.ts
│       │   ├── productDescriptions.ts
│       │   └── index.ts
│       │
│       ├── context/            # React Context провайдеры
│       │   ├── CartContext.tsx
│       │   ├── ToastContext.tsx
│       │   └── index.ts
│       │
│       ├── data/               # Статические данные
│       │   ├── offerContent.ts
│       │   ├── products.ts
│       │   ├── reviews.ts
│       │   ├── siteContent.ts
│       │   ├── REVIEWS_README.md
│       │   └── index.ts
│       │
│       └── routing/            # Роутинг
│           ├── routes.tsx
│           └── index.ts
│
├── backend/                    # Backend сервер (Node.js)
│
├── build/                      # Production build
│
├── scripts/                    # Утилиты
│   ├── auto-start-server.ps1
│   └── optimize-images.js
│
├── .github/
│   └── instructions/
│       └── reactjs.instructions.md
│
├── components.json             # shadcn-ui конфиг
├── tailwind.config.js
├── tsconfig.json
├── package.json
│
├── README.md                   # Основная документация
├── ARCHITECTURE_REFACTORING.md ⬅️ НОВЫЙ (отчёт по оптимизации)
└── CONTRIBUTING.md             ⚠️ TODO (guidelines для разработчиков)
```

---

## 🎯 Ключевые Принципы Структуры

### 1. **Feature-Sliced Design**
```
features/
└── <feature>/
    ├── components/  → UI элементы фичи
    ├── hooks/       → Управление состоянием и side effects
    ├── model/       → Бизнес-логика (NEW!)
    └── types/       → TypeScript контракты
```

### 2. **Separation of Concerns**
- **pages/** — только композиция и роутинг
- **features/** — изолированные фичи с полной логикой
- **shared/** — переиспользуемые модули
- **core/** — базовые сервисы и конфигурация

### 3. **Single Responsibility**
Каждый модуль отвечает за одну задачу:
- `model/filters.ts` — только логика фильтров
- `hooks/useCatalogFilters.ts` — только управление состоянием
- `pages/CatalogPage.tsx` — только UI композиция

---

## 📈 Улучшения

| Компонент | Было | Стало | Изменение |
|-----------|------|-------|-----------|
| **CatalogPage** | 330 строк | 170 строк | -48% ✅ |
| **Button компоненты** | 2 дубликата | 1 unified | -50% ✅ |
| **Model слой** | ❌ | ✅ 150 строк | +100% ✅ |
| **TS ошибки** | 0 | 0 | ✅ |

---

## ⚠️ Технический Долг

### Приоритет 1 (Critical)
- [ ] Удалить `shared/ui/Button/` (deprecated)
- [ ] Рефакторинг ProductPage (695 строк → ~300)

### Приоритет 2 (High)
- [ ] Создать `shared/lib/validators/` (Zod schemas)
- [ ] Создать `shared/lib/formatters/` (dates, prices)

### Приоритет 3 (Medium)
- [ ] Реализовать TODO в `core/api/api.ts`
- [ ] Добавить тесты для reducers

---

## 🚀 Следующие Шаги

1. **Immediate** (сегодня)
   - Удалить legacy компоненты
   - Обновить README.md

2. **Short-term** (эта неделя)
   - Рефакторинг ProductPage
   - Документировать guidelines

3. **Long-term** (следующий спринт)
   - React Query для API
   - Storybook для UI
   - Performance audit

---

**Статус:** ✅ Первая итерация завершена  
**Качество кода:** Отлично (0 ошибок TypeScript)  
**Maintainability:** Высокая
