import type { SelectProps } from './Select.types';

export const Select = ({ id, className = '', children }: SelectProps) => (
  <select
    id={id}
    className={`border-orange-f5 appearance-none rounded-4xl border-2 px-2.5 py-1 text-center text-lg font-medium ${className}`}
  >
    {children}
  </select>
);
