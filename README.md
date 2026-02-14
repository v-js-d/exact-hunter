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

| Категория | Технологии |
|-----------|------------|
| Framework | Next.js, TypeScript |
| State | TanStack Query, Zustand |
| UI | shadcn/ui, Tailwind CSS |
| Формы | React Hook Form, Zod |
| Realtime | Socket.io |
| Тесты | Vitest, React Testing Library |
| UI-документация | Storybook |
| Мониторинг | Glitchtip (Sentry-совместимый API) |

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

| Переменная | Описание |
|------------|----------|
| `NODE_ENV` | Окружение: `development` / `production` |
| `PORT` | Порт приложения (по умолчанию `3000`) |

### API

| Переменная | Описание |
|------------|----------|
| `NEXT_PUBLIC_API_URL` | URL бэкенда (например, `http://localhost:3001`) |
| `NEXT_PUBLIC_WS_URL` | URL WebSocket для уведомлений |

### Docker

| Переменная | Описание |
|------------|----------|
| `DOCKER_TARGET` | Target для сборки: `dev` |
| `DOCKER_IMAGE` | Имя образа |

### Docker dev (hot-reload)

| Переменная | Описание |
|------------|----------|
| `CHOKIDAR_USEPOLLING` | Polling для hot-reload в контейнере |
| `WATCHPACK_POLLING` | Polling для webpack в контейнере |

---

## Скрипты

| Команда | Описание |
|---------|----------|
| `pnpm dev` | Режим разработки |
| `pnpm build` | Сборка для продакшена |
| `pnpm start` | Запуск продакшен-сборки |
| `pnpm lint` | Проверка линтером |

---

## CI/CD

- **Триггер:** merge в `main`
- **Проверки:** линтеры, тесты, typecheck, сборка
- **Деплой:** образ публикуется в Docker Hub
- **Релизы:** через GitHub Releases (кнопка Release)

Прямой push в `main`/`trunk` запрещён - только через Pull Request с код-ревью.

---

## Структура проекта

```
src/
├── app/          # Next.js App Router
├── entities/     # Бизнес-сущности (FSD)
├── features/     # Фичи
├── shared/       # Общие компоненты, UI kit
└── widgets/      # Композитные блоки
```

---

## Документация

- [Next.js](https://nextjs.org/docs)
- [Feature Sliced Design](https://feature-sliced.design/)
- [shadcn/ui](https://ui.shadcn.com/)
