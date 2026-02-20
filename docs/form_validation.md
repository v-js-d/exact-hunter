# 📋 README — Правила использования RHF + Zod + zodResolver

# ❗ Обязательные правила

## 1️. Использовать только Zod v3

Причина:

- `zod/v4` несовместима с `@hookform/resolvers`
- Использование v4 приводит к некорректной работе `zodResolver`

**Валидация строго через Zod**

Вся логика валидации должна находиться исключительно в Zod-схеме.

`import { z } from "zod/v3"`

---

## Запрещено:

- использовать required в register

- писать inline-валидаторы

- делать проверки внутри onSubmit

- добавлять ручные проверки (if (!value))

- дублировать логику валидации

Пример правильной схемы:

```ts
const schema = z.object({
  email: z.string().min(1, 'Email обязателен').email('Некорректный email'),
  password: z.string().min(6, 'Минимум 6 символов'),
});
```

Все сообщения об ошибках должны быть определены внутри схемы.

---

## 2. Обязательно использовать zodResolver

Форма должна быть подключена через zodResolver.

```ts
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
type FormValues = z.infer<typeof schema>;
const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<FormValues>({
  resolver: zodResolver(schema),
});
```

---

## Использовать только handleSubmit

Запрещено писать кастомный `onSubmit с preventDefault`.

**Неправильно:**

```ts
const onSubmit = (e) => {
  e.preventDefault();
};
```

Правильно:

```ts
const onSubmit = (data: FormValues) => {
console.log(data)
}

<form onSubmit={handleSubmit(onSubmit)}>
```

---

## пизация только через z.infer

Типы формы должны выводиться из схемы.

`type FormValues = z.infer<typeof schema>`
