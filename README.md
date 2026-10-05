# Учебная платформа

Учебный сайт на React и Vite: каталог лекторов, курсы и форма заявки.

## Стек

JavaScript (JSX), CSS, React и React DOM 19.3.0, Vite 8.3.0,
плагин React для Vite 6.1.1, ESLint 10.11.0. Версии зафиксированы в
`package-lock.json`. Требуется Node.js 20.19+ (ветка 20) или 22.12+ и npm.

## Запуск

```bash
npm ci
npm run dev
```

Команды выполняются из корня проекта. Откройте адрес, который выведет Vite.
Сборка: `npm run build`; просмотр сборки: `npm run preview`;
проверка кода: `npm run lint`.

## Структура

```text
public/          — изображения и favicon
src/
  api/           — формирование ссылок на изображения
  components/    — общие компоненты интерфейса
  data/          — данные лекторов, курсов и партнёров
  hooks/         — React-хуки
  pages/         — страницы и их стили
  router/        — маршрутизатор и ссылки
  styles/        — общие стили
  App.jsx        — маршруты и общий макет
  main.jsx       — точка входа
index.html       — HTML-шаблон
vite.config.js   — настройки сборки
```

## Данные и маршрутизация

Данные хранятся в `src/data/lecturers.js`, `courses.js` и `partners.js`.
Изображения загружаются из Yandex Cloud; ссылки заданы в `src/api/photos.js`,
дополнительная настройка не нужна. Локальные копии находятся в `public/`.

Маршруты объявлены в `src/App.jsx`, маршрутизатор реализован в `src/router/`
через History API. Страницы: `/`, `/lecturers`, `/lecturers/:id`, `/courses`,
`/courses/:id`, `/contacts`; неизвестные адреса открывают страницу 404.
