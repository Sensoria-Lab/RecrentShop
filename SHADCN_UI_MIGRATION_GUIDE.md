# shadcn-ui Migration Guide

## ✅ Установленные компоненты

Все компоненты shadcn-ui успешно установлены и готовы к использованию:

### Установленные пакеты:
- ✅ Dialog (Modal)
- ✅ Sonner (Toast system)
- ✅ Form + Input + Label + Textarea
- ✅ Accordion
- ✅ Tabs
- ✅ Checkbox
- ✅ Popover + Command
- ✅ Badge
- ✅ Skeleton
- ✅ Tooltip
- ✅ Button (shadcn версия)

### Зависимости:
Все необходимые Radix UI пакеты установлены:
- @radix-ui/react-dialog
- @radix-ui/react-accordion
- @radix-ui/react-tabs
- @radix-ui/react-checkbox
- @radix-ui/react-popover
- @radix-ui/react-tooltip
- @radix-ui/react-label
- @radix-ui/react-slot
- sonner
- cmdk
- react-hook-form
- @hookform/resolvers
- zod

---

## 📦 Как использовать компоненты

### 1. **Sonner Toast** (УЖЕ ИНТЕГРИРОВАН)

**Статус:** ✅ Toaster добавлен в App.tsx

**Использование:**
```tsx
import { toast } from 'sonner';

// Простой toast
toast('Событие произошло');

// Успех
toast.success('Товар добавлен в корзину');

// Ошибка
toast.error('Не удалось выполнить операцию');

// Информация
toast.info('Обратите внимание на это');

// Предупреждение
toast.warning('Внимание: низкий остаток');

// С действием
toast('Файл удален', {
  action: {
    label: 'Отменить',
    onClick: () => console.log('Отменено'),
  },
});

// С описанием
toast.success('Заказ оформлен', {
  description: 'Номер заказа: #12345',
});

// Promise-based (для async операций)
toast.promise(
  fetch('/api/data'),
  {
    loading: 'Загрузка...',
    success: 'Данные загружены',
    error: 'Ошибка загрузки',
  }
);
```

**Замена старого Toast:**
```tsx
// СТАРЫЙ СПОСОБ
import { useToast } from '../context/ToastContext';
const { addToast } = useToast();
addToast('Сообщение', 'success');

// НОВЫЙ СПОСОБ
import { toast } from 'sonner';
toast.success('Сообщение');
```

---

### 2. **Dialog (Modal)**

**Где использовать:**
- `src/components/shared/Modal.tsx` → заменить
- `src/components/shared/ImageGalleryModal.tsx` → обернуть

**Пример использования:**
```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '../shared/ui';

function MyComponent() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="btn-primary">Открыть модалку</button>
      </DialogTrigger>
      <DialogContent className="bg-black/90 border-white/20">
        <DialogHeader>
          <DialogTitle className="text-white">Заголовок</DialogTitle>
          <DialogDescription className="text-gray-300">
            Описание модального окна
          </DialogDescription>
        </DialogHeader>

        {/* Контент */}
        <div className="text-white">
          Содержимое модального окна
        </div>

        <DialogFooter>
          <button className="btn-secondary">Отмена</button>
          <button className="btn-primary">Подтвердить</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

**Контролируемая модалка:**
```tsx
const [open, setOpen] = useState(false);

<Dialog open={open} onOpenChange={setOpen}>
  {/* ... */}
</Dialog>
```

---

### 3. **Accordion (для FAQ)**

**Где использовать:**
- `src/components/pages/SupportPage.tsx` - FAQ секция

**Пример использования:**
```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../shared/ui';

function FAQSection() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1" className="border-white/20">
        <AccordionTrigger className="text-white hover:text-white/80">
          Как оформить заказ?
        </AccordionTrigger>
        <AccordionContent className="text-gray-300">
          Добавьте товары в корзину и перейдите к оформлению заказа...
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2" className="border-white/20">
        <AccordionTrigger className="text-white hover:text-white/80">
          Какие способы оплаты доступны?
        </AccordionTrigger>
        <AccordionContent className="text-gray-300">
          Мы принимаем карты, электронные кошельки...
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
```

**Multiple mode (несколько открытых одновременно):**
```tsx
<Accordion type="multiple" className="w-full">
  {/* items */}
</Accordion>
```

---

### 4. **Tabs (для Account Page)**

**Где использовать:**
- `src/components/pages/AccountPage.tsx` - табы профиля

**Пример использования:**
```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../shared/ui';

function AccountPage() {
  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList className="bg-white/10 border border-white/20">
        <TabsTrigger value="profile" className="data-[state=active]:bg-white/20">
          Профиль
        </TabsTrigger>
        <TabsTrigger value="orders" className="data-[state=active]:bg-white/20">
          Заказы
        </TabsTrigger>
        <TabsTrigger value="reviews" className="data-[state=active]:bg-white/20">
          Отзывы
        </TabsTrigger>
        <TabsTrigger value="settings" className="data-[state=active]:bg-white/20">
          Настройки
        </TabsTrigger>
      </TabsList>

      <TabsContent value="profile">
        {/* Содержимое вкладки Профиль */}
      </TabsContent>

      <TabsContent value="orders">
        {/* Содержимое вкладки Заказы */}
      </TabsContent>

      <TabsContent value="reviews">
        {/* Содержимое вкладки Отзывы */}
      </TabsContent>

      <TabsContent value="settings">
        {/* Содержимое вкладки Настройки */}
      </TabsContent>
    </Tabs>
  );
}
```

**Контролируемые табы:**
```tsx
const [activeTab, setActiveTab] = useState('profile');

<Tabs value={activeTab} onValueChange={setActiveTab}>
  {/* ... */}
</Tabs>
```

---

### 5. **Form + Input (React Hook Form)**

**Где использовать:**
- `src/components/pages/CheckoutPage.tsx` - форма оформления
- `src/components/pages/AccountPage.tsx` - редактирование профиля

**Пример использования:**
```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../shared/ui';
import { Input } from '../shared/ui';

// Схема валидации
const formSchema = z.object({
  fullName: z.string().min(2, 'Минимум 2 символа'),
  email: z.string().email('Неверный email'),
  phone: z.string().min(10, 'Неверный номер телефона'),
});

function CheckoutForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast.success('Форма отправлена');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">ФИО</FormLabel>
              <FormControl>
                <Input
                  placeholder="Иванов Иван Иванович"
                  {...field}
                  className="bg-white/10 border-white/20 text-white"
                />
              </FormControl>
              <FormDescription className="text-gray-400">
                Введите ваше полное имя
              </FormDescription>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="email@example.com"
                  {...field}
                  className="bg-white/10 border-white/20 text-white"
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        <button type="submit" className="btn-primary">
          Отправить
        </button>
      </form>
    </Form>
  );
}
```

---

### 6. **Checkbox**

**Где использовать:**
- `src/components/pages/CheckoutPage.tsx` - страховка, согласие с политикой
- `src/components/pages/AccountPage.tsx` - настройки уведомлений

**Пример использования:**
```tsx
import { Checkbox } from '../shared/ui';
import { Label } from '../shared/ui';

function CheckoutPage() {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id="terms"
        checked={agreed}
        onCheckedChange={setAgreed}
        className="border-white/30 data-[state=checked]:bg-white data-[state=checked]:text-black"
      />
      <Label
        htmlFor="terms"
        className="text-sm text-gray-300 cursor-pointer"
      >
        Я согласен с политикой конфиденциальности
      </Label>
    </div>
  );
}
```

**С React Hook Form:**
```tsx
<FormField
  control={form.control}
  name="agreeToPolicy"
  render={({ field }) => (
    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
      <FormControl>
        <Checkbox
          checked={field.value}
          onCheckedChange={field.onChange}
          className="border-white/30"
        />
      </FormControl>
      <div className="space-y-1 leading-none">
        <FormLabel className="text-white">
          Я согласен с политикой конфиденциальности
        </FormLabel>
      </div>
    </FormItem>
  )}
/>
```

---

### 7. **Badge (статусы заказов)**

**Где использовать:**
- `src/components/pages/AccountPage.tsx` - статусы заказов

**Пример использования:**
```tsx
import { Badge } from '../shared/ui';

function OrderStatus({ status }: { status: string }) {
  const variants: Record<string, any> = {
    'pending': 'secondary',
    'processing': 'default',
    'shipped': 'default',
    'delivered': 'default',
    'cancelled': 'destructive',
  };

  return (
    <Badge variant={variants[status] || 'default'} className="capitalize">
      {status === 'pending' && 'В обработке'}
      {status === 'processing' && 'Обрабатывается'}
      {status === 'shipped' && 'Отправлен'}
      {status === 'delivered' && 'Доставлен'}
      {status === 'cancelled' && 'Отменён'}
    </Badge>
  );
}
```

**Кастомные стили:**
```tsx
<Badge className="bg-green-500/20 text-green-300 border-green-500/30">
  Активен
</Badge>
```

---

### 8. **Skeleton (загрузка)**

**Где использовать:**
- `src/components/shared/LoadingSkeleton.tsx` - заменить
- `src/components/pages/CatalogPage.tsx` - skeleton карточек товаров

**Пример использования:**
```tsx
import { Skeleton } from '../shared/ui';

function ProductCardSkeleton() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[200px] w-full rounded-xl bg-white/10" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px] bg-white/10" />
        <Skeleton className="h-4 w-[200px] bg-white/10" />
      </div>
    </div>
  );
}

function CatalogPage() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return (
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return <div>{/* Товары */}</div>;
}
```

---

### 9. **Popover/Command (поиск)**

**Где использовать:**
- `src/components/shared/SearchBar.tsx` - dropdown с результатами

**Пример Popover:**
```tsx
import { Popover, PopoverContent, PopoverTrigger } from '../shared/ui';

function SearchBar() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <input
          type="text"
          placeholder="Поиск товаров..."
          className="form-control"
        />
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-black/90 border-white/20">
        <div className="space-y-2">
          {searchResults.map(result => (
            <div key={result.id} className="p-2 hover:bg-white/10 rounded">
              {result.name}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
```

**Command Palette (расширенный поиск):**
```tsx
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../shared/ui';

function SearchCommand() {
  return (
    <Command className="bg-black/90 border-white/20">
      <CommandInput placeholder="Поиск товаров..." className="text-white" />
      <CommandList>
        <CommandEmpty className="text-gray-400">Ничего не найдено</CommandEmpty>
        <CommandGroup heading="Товары" className="text-gray-400">
          <CommandItem className="text-white hover:bg-white/10">
            Коврик для мыши XL
          </CommandItem>
          <CommandItem className="text-white hover:bg-white/10">
            Худи черная
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
```

---

### 10. **Tooltip (подсказки)**

**Где добавить:**
- Кнопки-иконки
- Поля форм с пояснениями

**Пример использования:**
```tsx
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../shared/ui';

function IconButton() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="icon-btn">
            <InfoIcon />
          </button>
        </TooltipTrigger>
        <TooltipContent className="bg-black/90 border-white/20 text-white">
          <p>Дополнительная информация</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
```

**Множественные тултипы:**
```tsx
<TooltipProvider>
  <div className="flex gap-2">
    <Tooltip>
      <TooltipTrigger>Кнопка 1</TooltipTrigger>
      <TooltipContent>Подсказка 1</TooltipContent>
    </Tooltip>

    <Tooltip>
      <TooltipTrigger>Кнопка 2</TooltipTrigger>
      <TooltipContent>Подсказка 2</TooltipContent>
    </Tooltip>
  </div>
</TooltipProvider>
```

---

## 🎨 Стилизация компонентов

Все компоненты поддерживают кастомизацию через className:

```tsx
// Пример адаптации к темной теме проекта
<Dialog>
  <DialogContent className="bg-black/90 backdrop-blur-md border border-white/20">
    <DialogTitle className="text-white font-manrope">
      Заголовок
    </DialogTitle>
    <DialogDescription className="text-gray-300">
      Описание
    </DialogDescription>

    {/* Контент с темной темой */}
    <div className="bg-white/5 p-4 rounded-lg">
      Содержимое
    </div>
  </DialogContent>
</Dialog>
```

---

## 🔄 План миграции по приоритетам

### Фаза 1: Toast система (Уже выполнено ✅)
- ✅ Toaster добавлен в App.tsx
- Заменить вызовы useToast на toast() из sonner

### Фаза 2: Формы (Высокий приоритет)
1. CheckoutPage.tsx → Form + Input + Checkbox
2. AccountPage.tsx → Form для редактирования профиля

### Фаза 3: UI компоненты (Средний приоритет)
1. SupportPage.tsx → Accordion для FAQ
2. AccountPage.tsx → Tabs для разделов
3. AccountPage.tsx → Badge для статусов заказов

### Фаза 4: Модалки (Высокий приоритет)
1. Modal.tsx → Dialog
2. ImageGalleryModal.tsx → Dialog wrapper

### Фаза 5: Улучшения UX (Низкий приоритет)
1. SearchBar.tsx → Popover/Command
2. LoadingSkeleton.tsx → Skeleton
3. Добавить Tooltip где нужно

---

## 📝 Примечания

- Все компоненты установлены в `src/shared/ui/ui/`
- Экспорты добавлены в `src/shared/ui/index.ts`
- Компоненты совместимы с существующей темной темой
- TypeScript типы включены для всех компонентов
- Доступность (a11y) обеспечена из коробки

---

## 🚀 Следующие шаги

1. Заменить useToast на toast из sonner во всех компонентах
2. Мигрировать CheckoutPage на shadcn Form
3. Обновить SupportPage с Accordion
4. Заменить Modal на Dialog
5. Добавить Tabs в AccountPage

Все компоненты готовы к использованию! 🎉
