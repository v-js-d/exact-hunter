# Работа с запросами (TanStack Query)

## Общий подход

Архитектура работы с асинхронными запросами строится на разделении слоев:

1.  **API Service Layer** (в слайсах): Определение методов API с использованием хелперов `query` и `mutation`.
2.  **Model Layer** (в слайсах): Создание кастомных хуков (`useQuery`, `useMutation`), которые используют методы из API слоя.

---

## 1. Создание API сервиса

В слайсе создаем папку `api` и файл сервиса (например, `vacancy.service.ts`).
Импортируем хелперы `query` и `mutation` из `shared/api/api`.

### Пример: `src/features/vacancy/api/vacancy.service.ts`

```typescript
import { mutation, query, RequestType } from '@/shared/api/api';

// Описание типов входных и выходных данных (обычно выносятся в types.ts)
type VacancyListInput = { requestParams: { page: number } };
type VacancyListOutput = { items: any[]; total: number };
type DeleteVacancyInput = null;
type DeleteVacancyOutput = { success: boolean };

// 1. GET запрос (Query)
// query<InputType, OutputType>(input?, options?)
export const getVacancyList = query<VacancyListInput, VacancyListOutput>();

// 2. DELETE/POST/PUT запрос (Mutation)
// mutation<InputType, OutputType>(RequestType)
export const removeVacancy = mutation<DeleteVacancyInput, DeleteVacancyOutput>(
  RequestType.Delete,
);
```

---

## 2. Создание Хуков (Model Layer)

Хуки создаются в папке `model/hooks` внутри слайса.

### Нейминг

Используем паттерн: `use` + `Сущность` + `Действие` + `Query/Mutation`

- `useVacancyListQuery`
- `useVacancyRemoveMutation`

### Пример Query (Получение данных)

```typescript
// src/features/vacancy/model/hooks/useVacancyListQuery.ts
import { useQuery } from '@tanstack/react-query';
import { getVacancyList } from '../../api/vacancy.service';

export const useVacancyListQuery = (params: { page: number }) => {
  return useQuery({
    queryKey: ['vacancy', 'list', params], // Уникальный ключ
    queryFn: async () => {
      // Вызываем функцию, полученную от getVacancyList
      // Она возвращает (url) => Promise<AxiosResponse>
      const response = await getVacancyList({ requestParams: params })(
        '/api/vacancies',
      );
      return response.data;
    },
  });
};
```

### Пример Mutation (Изменение данных)

При мутациях важно обновлять клиентский кэш, чтобы интерфейс реагировал мгновенно без перезагрузки страницы. Для этого используем `setQueryData` в `onSuccess`.

```typescript
// src/features/vacancy/model/hooks/useVacancyRemoveMutation.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeVacancy } from '../../api/vacancy.service';

export const useVacancyRemoveMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      // mutation возвращает (url, { arg }) => Promise<AxiosResponse>
      const response = await removeVacancy(`/api/vacancies/${id}`, {
        arg: null,
      });
      return response.data;
    },
    onSuccess: (data, variables) => {
      // Обновляем кэш списка вакансий вручную
      // setQueryData<ТипДанныхВКэше>(Ключ, ФункцияОбновления)
      queryClient.setQueryData(['vacancy', 'list'], (oldData: any) => {
        if (!oldData) return oldData;

        // Пример: удаляем элемент из списка
        return {
          ...oldData,
          items: oldData.items.filter((item: any) => item.id !== variables.id),
        };
      });

      // ИЛИ инвалидируем кэш, чтобы перезапросить свежие данные
      // queryClient.invalidateQueries({ queryKey: ['vacancy', 'list'] });
    },
  });
};
```

## Управление данными пользователя (TanStack Query как единственный источник истины)

Сущность `user` entity не использует Zustand-стор (`user.store.ts`).
Все данные пользователя храняться в TanStack Query с ключом `['auth', 'me']`:

- `useAuthMeQuery()` / `useUser()` - основные хуки для текущего пользователя (`user: User | null`).
- Мутации входа/регистрации и обновление сессии вызывают `queryClient.setQueryData(['auth', 'me'], { user: data.user })`.
- `useLogoutMutation` очищает кэш через `removeQueries({ queryKey: ['auth', 'me'] })`.
- `AuthProvider` реагирует только на успех/ошибку запроса для статуса сессии (без дублирования в Zustand-стор).

**Рекомендуемое использование:**

```tsx
import { useUser } from '@/entities/user';

const MyComponent = () => {
  const { user, isLoading } = useUser();
  // `user` берётся напрямую из кэша запроса
};
```

Такой подход следует паттерну TanStack-first и убирает рассинхрон между стором и кэшем.
