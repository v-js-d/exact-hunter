/**
 * Session bridge - прослойка между shared/api и features/auth (FSD).
 *
 * Хранит accessToken в памяти и даёт get/set для interceptors.
 * Регистрируемые callbacks позволяют auth store реагировать на события без импорта features в shared:
 * - setAccessToken / getAccessToken — используются api interceptors;
 * - notifySessionExpired() > logout при неудачном refresh;
 * - notifyTokenRefreshed(token) > обновить store после успешного refresh.
 */

type SessionExpiredCallback = () => void;
type TokenRefreshedCallback = (token: string) => void;

let accessToken: string | undefined;
let sessionExpiredCallback: SessionExpiredCallback | null = null;
let tokenRefreshedCallback: TokenRefreshedCallback | null = null;

export function getAccessToken(): string | undefined {
  return accessToken;
}

export function setAccessToken(token: string | undefined): void {
  accessToken = token;
}

export function setOnSessionExpired(cb: SessionExpiredCallback): void {
  sessionExpiredCallback = cb;
}

export function notifySessionExpired(): void {
  accessToken = undefined;
  sessionExpiredCallback?.();
}

export function setOnTokenRefreshed(cb: TokenRefreshedCallback): void {
  tokenRefreshedCallback = cb;
}

export function notifyTokenRefreshed(token: string): void {
  tokenRefreshedCallback?.(token);
}
