'use client';

import { useInterceptor } from '@/shared/api/hooks/useInterceptor';

export default function AxiosInterceptorProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useInterceptor();

  return children;
}
