# 🎬 Анимации проекта - Shadcn/UI Style

## 📋 Обзор

Все анимации переведены на **современные стандарты shadcn/ui** для создания более тонких, плавных и профессиональных эффектов.

## ✨ Основные изменения

### До (старые анимации)
- ❌ `scrollFadeIn` - агрессивный сдвиг 40px, медленно (0.8s)
- ❌ `fadeInUp` - сдвиг 16px, bounce эффект
- ❌ `letterFadeUp` - сдвиг 18px с перескоком (-6px)
- ❌ `blurReveal` - размытие 14px, сложный bounce

### После (shadcn-style анимации)
- ✅ `content-reveal` - тонкий сдвиг 4-8px, быстро (0.4s)
- ✅ `letterReveal` - сдвиг 6px, плавный (0.4s)
- ✅ `cardEnter` - сдвиг 8px + scale 96%, элегантно (0.4s)
- ✅ `blurReveal` - размытие 8px, без bounce (0.4s)

## 🎨 Доступные классы анимаций

### 1. Появление контента
```css
.content-reveal              /* Базовая анимация появления */
.content-reveal-delay-1      /* Задержка 0.1s */
.content-reveal-delay-2      /* Задержка 0.2s */
.content-reveal-delay-3      /* Задержка 0.3s */
```

**Пример:**
```tsx
<div className="content-reveal content-reveal-delay-1">
  Контент появится плавно с небольшой задержкой
</div>
```

### 2. Анимация карточек
```css
.card-stagger                /* Для анимации карточек товаров */
.card-stagger-1              /* Задержка 0.05s */
.card-stagger-2              /* Задержка 0.1s */
/* ... до card-stagger-8 */
```

**Пример:**
```tsx
<ProductCard className="card-stagger card-stagger-1" />
```

### 3. Анимация букв
```css
.letter-appear               /* Для анимации отдельных букв */
```

**Пример:**
```tsx
<span className="letter-appear" style={{ animationDelay: `${index * 0.03}s` }}>
  {letter}
</span>
```

### 4. Shadcn утилиты (из Tailwind config)
```css
/* Утилитарные классы */
.animate-in                  /* Базовая входная анимация */
.animate-out                 /* Базовая выходная анимация */
.fade-in-0                   /* Только fade, без движения */
.zoom-in-95                  /* Масштабирование от 95% */
.slide-in-from-top-2         /* Сдвиг сверху 8px */
.slide-in-from-bottom-2      /* Сдвиг снизу 8px */
.slide-in-from-left-2        /* Сдвиг слева 8px */
.slide-in-from-right-2       /* Сдвиг справа 8px */

/* Длительность */
.duration-200                /* 0.2s */
.duration-300                /* 0.3s */
.duration-400                /* 0.4s */
.duration-500                /* 0.5s */
```

**Комбинированный пример:**
```tsx
<div className="animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-2 duration-400">
  Появится с fade + zoom + небольшим подъемом
</div>
```

## 🎯 Рекомендуемые комбинации

### Для карточек товаров
```tsx
className="card-stagger card-stagger-1"
```

### Для заголовков
```tsx
className="content-reveal"
```

### Для модальных окон (через shadcn)
```tsx
className="animate-in fade-in-0 zoom-in-95 duration-300"
```

### Для выпадающих меню
```tsx
className="animate-in fade-in-0 slide-in-from-top-2 duration-200"
```

### Для всплывающих уведомлений
```tsx
className="animate-in fade-in-0 slide-in-from-right-2 duration-300"
```

## ⚡ Производительность

Все новые анимации:
- **Быстрее**: 0.2-0.4s вместо 0.6-0.8s
- **Легче**: меньше transform операций
- **Плавнее**: cubic-bezier(0.16, 1, 0.3, 1) - стандартная кривая shadcn
- **Тоньше**: 4-8px сдвиги вместо 16-40px

## ♿ Доступность

Все анимации автоматически отключаются для пользователей с `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  .letter-appear, 
  .cta-appear, 
  .content-reveal {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
}
```

## 🔧 Кастомизация

Если нужно изменить параметры анимации, редактируйте:

1. **Tailwind config** (`tailwind.config.js`) - для утилитарных классов
2. **index.css** - для специфичных анимаций проекта

### Пример кастомной анимации:
```css
@keyframes myCustomEnter {
  from {
    opacity: 0;
    transform: translateY(10px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.my-custom-enter {
  animation: myCustomEnter 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
```

## 📚 Ресурсы

- [Shadcn/UI Docs](https://ui.shadcn.com/)
- [Radix UI Animations](https://www.radix-ui.com/docs/primitives/overview/animation)
- [Cubic Bezier Generator](https://cubic-bezier.com/)

---

**Дата обновления:** 23 октября 2025  
**Версия:** 2.0 (Shadcn Style)
