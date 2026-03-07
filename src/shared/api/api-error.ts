export class ApiError extends Error {
  constructor(
    public status: number,
    public data: unknown,
    message?: string,
  ) {
    super(message ?? `API Error: ${status}`);
    this.name = 'ApiError';
  }
}
