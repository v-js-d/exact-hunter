import Image from 'next/image';
import { CircleAlert, SearchX } from 'lucide-react';

import { cn } from '../../../lib';

import type { EmptyProps } from './Empty.types';

const variantClasses = {
  default: {
    card: 'border-zinc-300/80 bg-white dark:border-zinc-800 dark:bg-zinc-950',
    iconWrap: 'bg-zinc-100 text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400',
    title: 'text-zinc-900 dark:text-zinc-100',
    description: 'text-zinc-500 dark:text-zinc-400',
  },
  error: {
    card: 'border-red-f2/30 bg-red-f2/5 dark:border-red-f2/35 dark:bg-red-f2/10',
    iconWrap: 'bg-red-f2/10 text-red-f2',
    title: 'text-red-f2',
    description: 'text-red-f2/90',
  },
};

export const Empty = ({
  title,
  description,
  variant = 'default',
  icon,
  imageSrc,
  imageAlt = 'Empty state',
  actions,
  className,
  ...props
}: EmptyProps) => {
  const styles = variantClasses[variant];
  const iconNode =
    icon ?? (variant === 'error' ? <CircleAlert /> : <SearchX />);

  return (
    <section
      className={cn('flex min-h-[40vh] items-center justify-center', className)}
      {...props}
    >
      <div
        className={cn(
          'flex w-full max-w-2xl flex-col items-center justify-center rounded-xl border border-dashed p-10 text-center',
          styles.card,
        )}
      >
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={128}
            height={128}
            className='mb-4 h-32 w-32 opacity-80'
          />
        ) : (
          <div
            className={cn(
              'mb-4 flex size-16 items-center justify-center rounded-full [&_svg]:size-8',
              styles.iconWrap,
            )}
          >
            <span aria-hidden>{iconNode}</span>
          </div>
        )}

        <h3 className={cn('text-lg font-semibold', styles.title)}>{title}</h3>

        {description && (
          <p className={cn('mt-1 text-sm', styles.description)}>
            {description}
          </p>
        )}

        {actions && <div className='mt-4 flex gap-2'>{actions}</div>}
      </div>
    </section>
  );
};
