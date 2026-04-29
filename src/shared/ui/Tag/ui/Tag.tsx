import { clsx } from 'clsx';

import { TagProps, TagSize, TagVariant } from './Tag.types';

const variantStyles: Record<TagVariant, string> = {
  default: 'bg-light-ed text-gray-6b',
  primary: 'bg-blue-100 text-blue-700',
  secondary: 'text-gray-6b bg-light-ed',
  success: 'bg-emerald-100 text-emerald-700',
  danger: 'bg-red-100 text-red-700',
  warning: 'bg-amber-100 text-amber-700',
  info: 'bg-cyan-100 text-cyan-700',
};

const sizeStyles: Record<TagSize, string> = {
  sm: 'px-2.5 py-1 text-xs',
  md: 'px-3 py-1.5 text-sm',
};

export const Tag = ({
  children,
  variant = 'default',
  size = 'sm',
  removable = false,
  onRemove,
  onClick,
  className,
  disabled = false,
}: TagProps) => {
  const isClickable = !!onClick && !disabled;

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 rounded-xl leading-none font-medium capitalize transition-all',
        variantStyles[variant],
        sizeStyles[size],
        isClickable && 'cursor-pointer hover:opacity-90 active:scale-[0.97]',
        disabled && 'cursor-not-allowed opacity-50',
        className,
      )}
      onClick={isClickable ? onClick : undefined}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
    >
      {children}

      {removable && onRemove && !disabled && (
        <button
          type='button'
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className='ml-0.5 flex items-center justify-center rounded-full p-0.5 transition-colors hover:bg-black/10 dark:hover:bg-white/10'
          aria-label='Удалить тег'
        >
          ✕
        </button>
      )}
    </span>
  );
};
