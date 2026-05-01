# Архитектура проекта

Проект построен на [Feature-Sliced Design (FSD)](https://feature-sliced.design/), адаптированном под **Next.js App Router**.

- **Next.js** управляет маршрутизацией (`app/`)
- **FSD** управляет структурой кода и бизнес-логикой

---

## Структура каталогов

```
src/
├── app/                  # Routing layer (Next.js entrypoints)
├── widgets/              # Композиционные блоки страниц
├── features/             # Пользовательские действия (login, apply, filters)
├── entities/             # Бизнес-сущности (user, vacancy, resume)
└── shared/               # Переиспользуемая инфраструктура
    ├── ui/               # UI kit (shadcn wrappers)
    ├── lib/              # Утилиты
    ├── api/              # Базовый API клиент
    ├── config/           # env и константы
    └── types/            # Общие типы
```

---

## Роль папки `app/`

`app/` — это **только routing adapter**. Страницы делегируют отображение виджетам.

### Разрешено

- `layout.tsx`, `page.tsx`, `loading.tsx`, `error.tsx`
- Провайдеры (QueryProvider, ThemeProvider)
- Подключение виджетов

### Запрещено

- Бизнес-логика
- Запросы к API
- Формы
- Zustand store
- TanStack Query hooks

### Пример

```tsx
// src/app/vacancies/page.tsx
import { VacanciesPage } from '@/widgets/vacancies-page';

export default function Page() {
  return <VacanciesPage />;
}
```

---

## Границы слоёв

Импорт разрешён **только вниз** по таблице:

| Слой       | Может импортировать                 |
| ---------- | ----------------------------------- |
| `app`      | widgets, features, entities, shared |
| `widgets`  | features, entities, shared          |
| `features` | entities, shared                    |
| `entities` | shared                              |
| `shared`   | ничего (только внешние пакеты)      |

### Запрещённые импорты

- `feature → feature` (кросс-импорт)
- `entity → feature` (импорт вверх)
- `shared → entities / features / widgets` (импорт вверх)
- Deep imports минуя public API

---

## Public API (`index.ts`)

Каждый slice **обязан** иметь `index.ts` — единственную точку входа.

### ✅ Правильно

```ts
import { LoginForm } from '@/features/auth/login';
import { UserCard } from '@/entities/user';
import { Button } from '@/shared/ui';
```

### ❌ Неправильно

```ts
// Deep import — минуя public API
import { LoginForm } from '@/features/auth/login/ui/LoginForm';

// Кросс-импорт feature → feature
import { useFilters } from '@/features/search/filters';
// из features/vacancies — так нельзя

// Импорт вверх entity → feature
import { useAuth } from '@/features/auth';
// из entities/user — так нельзя
```

---

## Naming conventions

| Что         | Формат       | Пример            |
| ----------- | ------------ | ----------------- |
| Папки       | `kebab-case` | `vacancy-card/`   |
| Компоненты  | `PascalCase` | `VacancyCard.tsx` |
| Хуки        | `useCamel`   | `useVacancies.ts` |
| Утилиты     | `camelCase`  | `getDate.ts`      |
| Типы/Модели | `PascalCase` | `Vacancy.ts`      |

---

## ESLint контроль архитектуры

Архитектурные ограничения проверяются через `eslint-plugin-fsd-lint`:

- **`fsd/forbidden-imports`** — запрет импортов вверх по слоям
- **`fsd/no-cross-slice-dependency`** — запрет кросс-импортов между слайсами
- **`fsd/no-public-api-sidestep`** — только через `index.ts`
- **`fsd/no-relative-imports`** — алиасы `@/` между слоями

Конфигурация находится в `eslint.config.mjs`.

---

## Куда класть новый код?

| Что нужно сделать                         | Куда класть                  |
| ----------------------------------------- | ---------------------------- |
| Новая страница                            | `app/` + виджет в `widgets/` |
| Пользовательское действие (форма, кнопка) | `features/`                  |
| Отображение сущности (карточка, список)   | `entities/`                  |
| Переиспользуемый UI-компонент             | `shared/ui/`                 |
| API-клиент, хелпер запросов               | `shared/api/`                |
| Утилита (форматирование, валидация)       | `shared/lib/`                |
| Тип, используемый в нескольких слоях      | `shared/types/`              |
| Константы, env-переменные                 | `shared/config/`             |
| Композиция фичей на странице              | `widgets/`                   |
