'use client';

import { useState } from 'react';

import { AuthMethod } from '../types/auth.types';

const FIELD_ERRORS: Record<number, Record<AuthMethod, string>> = {
  409: {
    email: 'Пользователь с таким email уже существует',
    phone: 'Этот номер телефона уже используется',
  },
  400: {
    email: 'Неверный формат почты',
    phone: 'Неверный формат номера',
  },
};

const ROOT_ERRORS: Record<number, string> = {
  401: 'Неверные данные для входа.',
  404: 'Неверные данные для входа.',
  403: 'Выбранная роль не совпадает с данными аккаунта',
  500: 'Произошла ошибка на сервере. Попробуйте позже.',
};

export const useAuthServerErrors = () => {
  const [rootServerError, setRootServerError] = useState('');

  const showErrors = (status: number, type: AuthMethod) => {
    setRootServerError('');

    const fieldErrorConfig = FIELD_ERRORS[status];

    if (fieldErrorConfig && fieldErrorConfig[type]) {
      setRootServerError(fieldErrorConfig[type]);
      return;
    }

    const message = ROOT_ERRORS[status] || ROOT_ERRORS[500];
    setRootServerError(message);
  };

  return {
    rootServerError,
    setRootServerError,
    showErrors,
  };
};
