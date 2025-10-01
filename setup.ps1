# RecrentShop - Скрипт установки для Windows (PowerShell)
# Этот скрипт автоматически установит все зависимости и запустит dev-сервер

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  RecrentShop - Установка зависимостей" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Проверка Node.js
Write-Host "Проверка Node.js..." -ForegroundColor Yellow
if (Get-Command node -ErrorAction SilentlyContinue) {
    $nodeVersion = node --version
    Write-Host "✓ Node.js установлен: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "✗ Node.js не установлен!" -ForegroundColor Red
    Write-Host "Пожалуйста, установите Node.js с https://nodejs.org/" -ForegroundColor Red
    Write-Host "Рекомендуется версия 18.x или выше" -ForegroundColor Yellow
    exit 1
}

# Проверка npm
Write-Host "Проверка npm..." -ForegroundColor Yellow
if (Get-Command npm -ErrorAction SilentlyContinue) {
    $npmVersion = npm --version
    Write-Host "✓ npm установлен: $npmVersion" -ForegroundColor Green
} else {
    Write-Host "✗ npm не установлен!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Установка зависимостей..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Установка зависимостей
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "  ✓ Установка завершена успешно!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Для запуска сервера используйте:" -ForegroundColor Yellow
    Write-Host "  npm start" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Сервер будет доступен по адресу:" -ForegroundColor Yellow
    Write-Host "  http://localhost:3000" -ForegroundColor Cyan
    Write-Host ""
    
    # Спросить, запустить ли сервер
    $answer = Read-Host "Запустить dev-сервер сейчас? (Y/N)"
    if ($answer -eq 'Y' -or $answer -eq 'y') {
        Write-Host ""
        Write-Host "Запуск сервера..." -ForegroundColor Cyan
        npm start
    }
} else {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "  ✗ Ошибка при установке!" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "Попробуйте выполнить вручную:" -ForegroundColor Yellow
    Write-Host "  npm install" -ForegroundColor Cyan
    exit 1
}
