import type { ErrorFieldProps } from './ErrorField.types';

export const ErrorField = ({ children, className = '' }: ErrorFieldProps) => (
  <span className={`text-red-f2 text-sm ${className}`}>{children}</span>
);
