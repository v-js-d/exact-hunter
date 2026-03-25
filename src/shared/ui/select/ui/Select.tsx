import { PropsWithChildren, SelectHTMLAttributes } from 'react';

type Props = PropsWithChildren<SelectHTMLAttributes<HTMLSelectElement>>;

export function Select(props: Props) {
  const { id, className = '', children } = props;
  return (
    <select
      id={id}
      className={`border-orange-f5 appearance-none rounded-4xl border-2 px-2.5 py-1 text-center text-lg font-medium ${className}`}
    >
      {children}
    </select>
  );
}
