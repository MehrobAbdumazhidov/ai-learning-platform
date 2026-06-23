# AI Learning Platform

Современное SPA-приложение об искусственном интеллекте, разработанное на React и Vite.

Проект представляет собой образовательную платформу с информацией о курсах, статьями, системой лайков и комментариев, а также поддержкой светлой и тёмной темы.

## Возможности

* Главная страница с курсами по искусственному интеллекту
* Страница «О платформе»
* Контактная форма
* Блог со статьями
* Поиск по статьям
* Система лайков
* Система комментариев
* Переключение светлой и тёмной темы
* Адаптивный интерфейс
* Хранение пользовательских данных через LocalStorage

## Технологии

* React 19
* Vite
* React Router DOM
* Context API
* JavaScript (ES6+)
* CSS3
* GitHub Pages
* GitHub Actions

## Структура проекта

```text
src/
├── components/
├── context/
│   ├── ThemeContext.jsx
│   └── EngagementContext.jsx
├── data/
├── layouts/
├── pages/
├── App.jsx
└── main.jsx
```

## Маршруты

* `/` — Главная
* `/about` — О платформе
* `/contact` — Контакты
* `/blog` — Блог

## Запуск проекта

```bash
npm install
npm run dev
```

После запуска приложение будет доступно по адресу:

```text
http://localhost:5173/ai-learning-platform/
```

## Production сборка

```bash
npm run build
npm run preview
```

## Деплой

Проект автоматически публикуется на GitHub Pages через GitHub Actions после каждого push в ветку `main`.

## Онлайн-версия

<https://mehrobabdumazhidov.github.io/ai-learning-platform/>

## Автор

Mehrob Abdumazhidov
