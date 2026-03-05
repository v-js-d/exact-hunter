# Exact Hunter — Frontend

Фронтенд-часть системы поиска работы в IT. Лёгкая альтернатива известного агрегатора, с ограничением откликов от спама.

> **Связанные репозитории:** [Backend (Nest.js)](https://github.com/v-js-d/backend-exact-hunter)

## О проекте

- **Тип:** Система поиска работы (IT)
- **Цель:** Альтернатива известного агрегатора с осмысленными откликами (лимит 10 откликов/день)
- **Результат:** Открытый GitHub-проект + развёрнутое приложение

### Основной функционал

- Аутентификация и авторизация
- Разделение: кабинет работодателя / соискателя
- Размещение и поиск вакансий с фильтрами
- Лимит 10 откликов в сутки
- Несколько резюме на пользователя
- Аналитика по откликам и просмотрам
- Отказы и приглашения
- История изменений резюме
- ИИ для создания и поиска вакансий

---

## Стек

| Категория       | Технологии                         |
| --------------- | ---------------------------------- |
| Framework       | Next.js, TypeScript                |
| State           | TanStack Query, Zustand            |
| UI              | shadcn/ui, Tailwind CSS            |
| Формы           | React Hook Form, Zod               |
| Realtime        | Socket.io                          |
| Тесты           | Vitest, React Testing Library      |
| UI-документация | Storybook                          |
| Мониторинг      | Glitchtip (Sentry-совместимый API) |

**Архитектура:** Feature Sliced Design

**Инструменты:** ESLint, Prettier, Husky, pnpm

---

## Требования

- Node.js 20+
- pnpm 9+

---

## Быстрый старт

### 1. Установка

```bash
pnpm install
```

### 2. Переменные окружения

Скопируй `.env.example` в `.env` и заполни. См. [полный список переменных](#переменные-окружения).

### 3. Запуск

```bash
pnpm dev
```

Приложение: [http://localhost:3000](http://localhost:3000)

---

## Docker

### Запуск из Docker Hub

Образ собирается в CI при push в `main` и публикуется в Docker Hub.

```bash
docker compose pull
docker compose up -d
```

Приложение: [http://localhost:3000](http://localhost:3000)

### Локальная сборка (до первого push в main)

```bash
docker build -t appproject/exact-hunter:latest --target prod .
docker compose up -d
```

### Остановка

```bash
docker compose down
```

---

## Переменные окружения

Создай `.env` из `.env.example` и заполни значения.

### Общие

| Переменная | Описание                                |
| ---------- | --------------------------------------- |
| `NODE_ENV` | Окружение: `development` / `production` |
| `PORT`     | Порт приложения (по умолчанию `3000`)   |

### API

| Переменная             | Описание                                                                                                                                                                                         |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `NEXT_PUBLIC_API_URL`  | URL бэкенда (например, `http://localhost:3001`)                                                                                                                                                  |
| `NEXT_PUBLIC_WS_URL`   | URL WebSocket для уведомлений                                                                                                                                                                    |
| `NEXT_PUBLIC_API_MODE` | `mock` — MSW перехватывает запросы в development; `real` (или не указано) — запросы идут на `NEXT_PUBLIC_API_URL`. В `next dev` — NODE_ENV=development, в `next build`/`next start` — production |

### Docker

| Переменная      | Описание                 |
| --------------- | ------------------------ |
| `DOCKER_TARGET` | Target для сборки: `dev` |
| `DOCKER_IMAGE`  | Имя образа               |

### Docker dev (hot-reload)

| Переменная            | Описание                            |
| --------------------- | ----------------------------------- |
| `CHOKIDAR_USEPOLLING` | Polling для hot-reload в контейнере |
| `WATCHPACK_POLLING`   | Polling для webpack в контейнере    |

---

## Скрипты

| Команда      | Описание                |
| ------------ | ----------------------- |
| `pnpm dev`   | Режим разработки        |
| `pnpm build` | Сборка для продакшена   |
| `pnpm start` | Запуск продакшен-сборки |
| `pnpm lint`  | Проверка линтером       |

---

## CI/CD

- **Триггер:** merge в `main`
- **Проверки:** линтеры, тесты, typecheck, сборка
- **Деплой:** образ публикуется в Docker Hub
- **Релизы:** через GitHub Releases (кнопка Release)

Прямой push в `main`/`trunk` запрещён - только через Pull Request с код-ревью.

---

## Структура проекта

Проект построен на **Feature-Sliced Design**. Подробное описание архитектуры, правил импортов и размещения кода — в [docs/architecture.md](docs/architecture.md).

---

## API и HTTP-запросы

Все запросы к бэкенду идут через единый axios-клиент `$api` из shared-слоя.

### Правила

1. **Импорт клиента**  
   Импортируем `$api` только из `@/shared/api/api` (или из `@/shared/api`, если в папке есть index.ts). Других инстансов axios в приложении не создаём.

2. **Все запросы через $api**  
   Любой запрос к API (GET, POST и т.д.) делаем через `$api.get()`, `$api.post()` и т.п. Так к запросам применяются интерцепторы (токены, refresh при 401, единая обработка ошибок).

3. **Не импортировать axios напрямую**  
   В фичах, страницах и компонентах не используем `import axios from 'axios'`. Только `$api` и при необходимости хелперы из `@/shared/api` (mutation, query и т.д.).

4. **Один инстанс**  
   `axios.create()` вызывается только в `shared/api` (в `api.ts` / `createApiClient.ts`). В остальном коде новых инстансов не создаём.

5. **Не обходить shared/api**  
   Не используем нативный `fetch()` для запросов к нашему API. Все такие запросы идут через `$api`, чтобы не дублировать логику авторизации и обработки ошибок.

### Зачем

- Один клиент — единые интерцепторы (токен, refresh при 401, ApiError).
- Предсказуемое поведение запросов и ошибок по всему проекту.
- Проще менять baseURL, заголовки и т.д. в одном месте.

Подробнее про использование `query`, `mutation` и хуков TanStack Query — в [docs/tanstack_query.md](docs/tanstack_query.md).

---

## Документация

- [Next.js](https://nextjs.org/docs)
- [Feature Sliced Design](https://feature-sliced.design/)
- [shadcn/ui](https://ui.shadcn.com/)
