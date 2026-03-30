import { describe, expect, it } from 'vitest';

import { exampleSchema } from './ExampleForm.shema';

describe('exampleSchema', () => {
  it('accepts valid form payload', () => {
    const result = exampleSchema.safeParse({
      userEmail: 'user@example.com',
      password: 'Strong1!',
    });

    expect(result.success).toBe(true);
  });

  it('rejects invalid form payload', () => {
    const result = exampleSchema.safeParse({
      userEmail: 'bad-email',
      password: 'weak',
    });

    expect(result.success).toBe(false);
  });
});
