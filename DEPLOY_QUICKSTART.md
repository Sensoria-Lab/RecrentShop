# 🚀 Шпаргалка по деплою RecrentShop на GitHub Pages

## ⚡ Быстрый старт (5 минут)

### 1️⃣ Создайте репозиторий на GitHub
- Зайдите на https://github.com/new
- Название: `RecrentShop`
- Владелец: `Sensoria-Lab`
- Публичный репозиторий
- Не добавляйте README, .gitignore, license (они уже есть в проекте)

### 2️⃣ Инициализируйте Git и загрузите код

```bash
# В PowerShell в папке проекта выполните:

git init
git add .
git commit -m "Initial commit: RecrentShop ready for deploy"
git branch -M main
git remote add origin https://github.com/Sensoria-Lab/RecrentShop.git
git push -u origin main
```

### 3️⃣ Задеплойте на GitHub Pages

```bash
npm run deploy
```

**Подождите 1-2 минуты** пока GitHub обработает файлы.

### 4️⃣ Включите GitHub Pages

1. Откройте: https://github.com/Sensoria-Lab/RecrentShop/settings/pages
2. В разделе **Source** выберите:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
3. Нажмите **Save**

### 5️⃣ Готово! 🎉

Ваш сайт доступен по адресу:
**https://sensoria-lab.github.io/RecrentShop**

---

## 🔄 Обновление сайта

Когда вносите изменения:

```bash
# 1. Сохраните изменения
git add .
git commit -m "Описание изменений"
git push

# 2. Обновите на GitHub Pages
npm run deploy
```

---

## ❗ Частые проблемы

### Проблема: `git push` требует авторизации
**Решение:**
```bash
# Используйте Personal Access Token вместо пароля
# Создайте токен: https://github.com/settings/tokens
# При запросе пароля введите токен
```

### Проблема: Сайт не открывается
**Проверьте:**
1. GitHub Pages включен в настройках
2. Выбрана ветка `gh-pages`
3. Подождите 2-3 минуты после деплоя

### Проблема: Маршруты не работают (404 ошибка)
**Решение:** Уже исправлено! В проекте есть:
- `public/404.html` - для редиректа
- Скрипт в `public/index.html` - для обработки
- `basename` в BrowserRouter - для корректных путей

---

## 📁 Что изменено для деплоя

✅ Добавлено в `package.json`:
```json
"homepage": "https://sensoria-lab.github.io/RecrentShop",
"predeploy": "npm run build",
"deploy": "gh-pages -d build"
```

✅ Добавлен `public/404.html` - для маршрутизации

✅ Добавлен скрипт в `public/index.html` - для редиректов

✅ Добавлен `basename` в `src/index.tsx`:
```tsx
<BrowserRouter basename={process.env.PUBLIC_URL}>
```

✅ Установлен пакет `gh-pages`

---

## 📞 Если нужна помощь

1. **Ошибки в консоли:** Нажмите F12 в браузере → вкладка Console
2. **Проблемы с Git:** https://docs.github.com/en/get-started
3. **Проблемы с деплоем:** Смотрите DEPLOY_GUIDE.md

---

## 🎯 Полезные ссылки

- 📖 Полная инструкция: `DEPLOY_GUIDE.md`
- 📝 README для GitHub: `README_GITHUB.md`
- 🌐 Ваш сайт: https://sensoria-lab.github.io/RecrentShop
- ⚙️ Настройки Pages: https://github.com/Sensoria-Lab/RecrentShop/settings/pages

---

**Время деплоя: ~5 минут | Сложность: Легко 🟢**
