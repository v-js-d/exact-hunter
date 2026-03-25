import { ReactNode } from 'react';

export function ErrorField({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return <span className={`text-red-f2 text-sm ${className}`}>{children}</span>;
}
