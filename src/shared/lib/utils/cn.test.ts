import { describe, expect, it } from 'vitest';

import { cn } from './cn';

describe('cn', () => {
  it('merges and resolves conflicting tailwind classes', () => {
    const result = cn('px-2 py-1', 'px-4');

    expect(result).toBe('py-1 px-4');
  });

  it('handles conditional class values', () => {
    const enabled = true;
    const disabled = false;

    const result = cn('base', enabled && 'enabled', disabled && 'disabled');

    expect(result).toBe('base enabled');
  });
});
