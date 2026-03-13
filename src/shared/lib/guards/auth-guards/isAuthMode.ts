import type { AuthMode } from '../../../api/contracts';

const AUTH_MODES = {
  login: true,
  register: true,
} satisfies Record<AuthMode, true>;

export function isAuthMode(mode: string | null): mode is AuthMode {
  return mode ? mode in AUTH_MODES : false;
}
