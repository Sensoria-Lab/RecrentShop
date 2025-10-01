@echo off
chcp 65001 >nul
title RecrentShop - Установка

echo ========================================
echo   RecrentShop - Установка зависимостей
echo ========================================
echo.

REM Проверка Node.js
echo Проверка Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo [ОШИБКА] Node.js не установлен!
    echo.
    echo Пожалуйста, установите Node.js с https://nodejs.org/
    echo Рекомендуется версия 18.x или выше
    echo.
    pause
    exit /b 1
)

node --version
echo [OK] Node.js установлен
echo.

REM Проверка npm
echo Проверка npm...
npm --version >nul 2>&1
if errorlevel 1 (
    echo [ОШИБКА] npm не установлен!
    pause
    exit /b 1
)

npm --version
echo [OK] npm установлен
echo.

echo ========================================
echo   Установка зависимостей...
echo ========================================
echo.

REM Установка зависимостей
call npm install

if errorlevel 1 (
    echo.
    echo ========================================
    echo   [ОШИБКА] Ошибка при установке!
    echo ========================================
    echo.
    echo Попробуйте выполнить вручную: npm install
    pause
    exit /b 1
)

echo.
echo ========================================
echo   [OK] Установка завершена успешно!
echo ========================================
echo.
echo Для запуска сервера используйте:
echo   npm start
echo.
echo Сервер будет доступен по адресу:
echo   http://localhost:3000
echo.

set /p answer="Запустить dev-сервер сейчас? (Y/N): "
if /i "%answer%"=="Y" (
    echo.
    echo Запуск сервера...
    call npm start
) else (
    echo.
    echo Установка завершена. Для запуска выполните: npm start
    pause
)
