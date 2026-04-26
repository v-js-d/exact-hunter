import { beforeEach, describe, expect, it } from 'vitest';

import { useAuthStore } from './auth.store';

describe('useAuthStore', () => {
  beforeEach(() => {
    useAuthStore.setState({
      status: 'anonymous',
    });
  });

  it('sets status', () => {
    const { setStatus } = useAuthStore.getState().actions;

    setStatus('authenticated');

    const state = useAuthStore.getState();

    expect(state.status).toBe('authenticated');
  });

  it('resets state on logout', () => {
    const { setStatus, logout } = useAuthStore.getState().actions;

    setStatus('authenticated');

    logout();

    const state = useAuthStore.getState();

    expect(state.status).toBe('anonymous');
  });
});
