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
function buildEnv(): EnvType {
  const base = { ...process.env } as unknown as EnvType;
  if (typeof window !== 'undefined' && window.env) {
    return { ...base, ...window.env };
  }
  return base;
}

export const env: EnvType = buildEnv();
