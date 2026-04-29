import { ReactNode } from 'react';

export type TagSize = 'sm' | 'md';

export type TagVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info';

export interface TagProps {
  /** Содержимое тега */
  children: ReactNode;

  /** Вариант цвета тега */
  variant?: TagVariant;

  /** Размер тега */
  size?: TagSize;

  /** Можно ли удалить тег */
  removable?: boolean;

  /** Колбэк при нажатии на кнопку удаления */
  onRemove?: () => void;

  /** Колбэк при клике на сам тег */
  onClick?: () => void;

  /** Дополнительные классы */
  className?: string;

  /** Отключить взаимодействие */
  disabled?: boolean;
}
