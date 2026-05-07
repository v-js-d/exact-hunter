import type { SelectProps } from './Select.types';

export const Select = ({
  id,
  className = '',
  children,
  ...rest
}: SelectProps) => (
  <select
    id={id}
    className={`border-gray-6b appearance-none rounded-4xl border px-2.5 py-1 text-center text-lg font-medium ${className}`}
    {...rest}
  >
    {children}
  </select>
);
