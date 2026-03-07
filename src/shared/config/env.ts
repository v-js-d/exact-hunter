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

export const env: EnvType = {
  ...process.env,
  ...window.env,
};
