interface WindowEnvType {
  DOCKER_IMAGE: string;
  NODE_ENV: string;
  PORT: string;

  NEXT_PUBLIC_API_URL: string;
  NEXT_PUBLIC_API_MODE: string;
  NEXT_PUBLIC_WS_URL: string;

  CHOKIDAR_USEPOLLING: string;
  WATCHPACK_POLLING: string;
  [key: string]: string | undefined; // Если есть другие переменные
}

declare global {
  interface Window {
    env: WindowEnvType;
  }
}

interface EnvType {
  DOCKER_IMAGE: string;
  NODE_ENV: string;
  PORT: string;

  NEXT_PUBLIC_API_URL: string;
  NEXT_PUBLIC_API_MODE: string;
  NEXT_PUBLIC_WS_URL: string;

  CHOKIDAR_USEPOLLING: string;
  WATCHPACK_POLLING: string;
}

// Собираем env без доступа к window на этапе оценки модуля (SSR/build).
// window.env используется только в браузере (runtime, например Docker).
// ВАЖНО: Next.js инлайнит NEXT_PUBLIC_* только при прямом обращении
// process.env.NEXT_PUBLIC_XXX. Spread { ...process.env } НЕ работает на клиенте.
function buildEnv(): EnvType {
  const base: EnvType = {
    DOCKER_IMAGE: process.env.DOCKER_IMAGE ?? '',
    NODE_ENV: process.env.NODE_ENV ?? '',
    PORT: process.env.PORT ?? '',
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL ?? '',
    NEXT_PUBLIC_API_MODE: process.env.NEXT_PUBLIC_API_MODE ?? '',
    NEXT_PUBLIC_WS_URL: process.env.NEXT_PUBLIC_WS_URL ?? '',
    CHOKIDAR_USEPOLLING: process.env.CHOKIDAR_USEPOLLING ?? '',
    WATCHPACK_POLLING: process.env.WATCHPACK_POLLING ?? '',
  };
  if (typeof window !== 'undefined' && window.env) {
    return { ...base, ...window.env };
  }
  return base;
}

export const env: EnvType = buildEnv();
