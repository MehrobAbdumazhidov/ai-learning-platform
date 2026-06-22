# AI Learning Platform — React SPA

SPA-версия сайта на React, переписанная с исходного HTML/CSS/JS.

## Стек

- React 19 + Vite
- React Router (`react-router-dom`)
- Context API (`ThemeContext`, `EngagementContext`)

## Структура

```
src/
├── context/            # глобальное состояние через useContext
│   ├── ThemeContext.jsx       — светлая/тёмная тема (localStorage)
│   └── EngagementContext.jsx  — лайки и комментарии (localStorage)
├── data/courses.js     # локальные данные курсов для главной
├── components/         # переиспользуемые UI-компоненты
├── layouts/MainLayout.jsx
└── pages/               # Home, About, Contact, Blog
```

Маршруты: `/` (Главная), `/about` (О платформе), `/contact` (Контакты), `/blog` (Блог).

Список статей на странице `/blog` загружается с мокового API — файла
`public/articles.json` — через `fetch()` в `useEffect`.

## Запуск локально

```bash
npm install
npm run dev
```

## Сборка

```bash
npm run build
npm run preview
```

## Деплой на GitHub Pages

Репозиторий: https://github.com/MehrobAbdumazhidov/ai-learning-platform

1. Установить зависимости (включая `gh-pages`):
   ```bash
   npm install
   ```
2. Подключить репозиторий, если ещё не подключён:
   ```bash
   git init
   git remote add origin https://github.com/MehrobAbdumazhidov/ai-learning-platform.git
   git add .
   git commit -m "React SPA version"
   git branch -M main
   git push -u origin main
   ```
3. Собрать и опубликовать на ветку `gh-pages`:
   ```bash
   npm run deploy
   ```
4. В настройках репозитория на GitHub: **Settings → Pages → Source** выбрать ветку `gh-pages` (папка `/ (root)`).
5. Через пару минут сайт будет доступен по адресу:
   `https://mehrobabdumazhidov.github.io/ai-learning-platform/`

Роутинг настроен через `HashRouter` (URL вида `.../#/about`) — это нужно, чтобы прямые
переходы и обновление страницы на `/about`, `/contact`, `/blog` не давали 404 на статическом
хостинге GitHub Pages.
