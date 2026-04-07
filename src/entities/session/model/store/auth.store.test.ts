import { beforeEach, describe, expect, it } from 'vitest';

import { useAuthStore } from './auth.store';

describe('useAuthStore', () => {
  beforeEach(() => {
    useAuthStore.setState({
      accessToken: undefined,
      status: 'anonymous',
    });
  });

  it('sets access token and status', () => {
    const { setAccessToken, setStatus } = useAuthStore.getState().actions;

    setAccessToken('token-123');
    setStatus('authenticated');

    const state = useAuthStore.getState();
    expect(state.accessToken).toBe('token-123');
    expect(state.status).toBe('authenticated');
  });

  it('resets state on logout', () => {
    const { setAccessToken, setStatus, logout } =
      useAuthStore.getState().actions;

    setAccessToken('token-123');
    setStatus('authenticated');

    logout();

    const state = useAuthStore.getState();

    expect(state.accessToken).toBeUndefined();
    expect(state.status).toBe('anonymous');
  });
});
