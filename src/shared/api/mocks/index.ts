export async function initMocks(): Promise<void> {
  if (typeof window === 'undefined') return;
  if (process.env.NEXT_PUBLIC_API_MODE !== 'mock') return;

  const { worker } = await import('./browser');

  await worker.start({
    onUnhandledRequest: 'bypass',
  });
}
