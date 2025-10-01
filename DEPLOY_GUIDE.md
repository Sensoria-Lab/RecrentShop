# 🚀 Инструкция по деплою на GitHub Pages

## Подготовка

1. **Убедитесь, что ваш репозиторий создан на GitHub:**
   - Репозиторий должен называться `RecrentShop`
   - Владелец: `Sensoria-Lab`
   - URL репозитория: `https://github.com/Sensoria-Lab/RecrentShop`

2. **Если репозиторий еще не создан:**
   ```bash
   # Инициализируйте git (если еще не сделали)
   git init
   
   # Добавьте все файлы
   git add .
   
   # Создайте первый коммит
   git commit -m "Initial commit - RecrentShop"
   
   # Добавьте удаленный репозиторий
   git remote add origin https://github.com/Sensoria-Lab/RecrentShop.git
   
   # Отправьте код на GitHub
   git branch -M main
   git push -u origin main
   ```

## Деплой на GitHub Pages

### Способ 1: Автоматический деплой (рекомендуется)

Просто выполните команду:
```bash
npm run deploy
```

Эта команда автоматически:
- Соберет продакшн-версию проекта (`npm run build`)
- Создаст ветку `gh-pages`
- Загрузит собранные файлы в эту ветку
- Опубликует сайт на GitHub Pages

### Способ 2: Ручной деплой

```bash
# 1. Соберите проект
npm run build

# 2. Установите gh-pages (если еще не установлен)
npm install --save-dev gh-pages --legacy-peer-deps

# 3. Задеплойте
npx gh-pages -d build
```

## Настройка GitHub Pages

После деплоя:

1. Перейдите в настройки репозитория на GitHub:
   `https://github.com/Sensoria-Lab/RecrentShop/settings/pages`

2. В разделе **Source** выберите:
   - Branch: `gh-pages`
   - Folder: `/ (root)`

3. Нажмите **Save**

4. Подождите 1-2 минуты, пока GitHub опубликует сайт

5. Ваш сайт будет доступен по адресу:
   **https://sensoria-lab.github.io/RecrentShop**

## Обновление сайта

Когда вы внесли изменения и хотите обновить сайт:

```bash
# 1. Сохраните изменения в git
git add .
git commit -m "Описание изменений"
git push origin main

# 2. Задеплойте новую версию
npm run deploy
```

## Важные примечания

### Если используете Custom Domain

Если хотите использовать собственный домен (например, `recrentshop.ru`):

1. Измените `homepage` в `package.json`:
   ```json
   "homepage": "https://recrentshop.ru"
   ```

2. Создайте файл `public/CNAME` с содержимым:
   ```
   recrentshop.ru
   ```

3. Настройте DNS записи у вашего регистратора:
   ```
   Type: A
   Host: @
   Value: 185.199.108.153
   
   Type: A
   Host: @
   Value: 185.199.109.153
   
   Type: A
   Host: @
   Value: 185.199.110.153
   
   Type: A
   Host: @
   Value: 185.199.111.153
   
   Type: CNAME
   Host: www
   Value: sensoria-lab.github.io
   ```

### Если хотите использовать другое название репозитория

Измените `homepage` в `package.json`:
```json
"homepage": "https://ваш-username.github.io/новое-название-репозитория"
```

### Проблемы с маршрутизацией

Если после деплоя маршруты (например, `/catalog`, `/contacts`) не работают:

1. Используйте `HashRouter` вместо `BrowserRouter` в `App.tsx`:
   ```tsx
   import { HashRouter as Router } from 'react-router-dom';
   ```

2. URL будут выглядеть как: `https://sensoria-lab.github.io/RecrentShop/#/catalog`

Или создайте файл `public/404.html` для редиректа (это уже сделано в проекте).

## Проверка деплоя

После деплоя проверьте:
- ✅ Главная страница загружается
- ✅ Все изображения отображаются
- ✅ Навигация работает
- ✅ Стили применены корректно
- ✅ Курсор работает

## Полезные команды

```bash
# Посмотреть статус git
git status

# Посмотреть удаленные репозитории
git remote -v

# Собрать проект локально для проверки
npm run build

# Запустить локальный сервер для проверки билда
npx serve -s build
```

## Поддержка

Если возникли проблемы:
1. Проверьте консоль браузера (F12) на наличие ошибок
2. Убедитесь, что все изображения находятся в папке `public/images`
3. Проверьте, что все пути к файлам начинаются с `/` (не с `./`)

---

**Готово!** 🎉 Ваш сайт теперь доступен онлайн!
