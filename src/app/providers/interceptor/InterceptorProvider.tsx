'use client';

import React from 'react';

import useInterceptor from './useInterceptor';

export default function InterceptorProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useInterceptor();

  return children;
}
