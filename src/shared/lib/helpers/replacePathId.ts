import { AppRouter, ID_TEMPLATE } from '../../config/AppRouter';

export const replacePathId = (
  route: keyof typeof AppRouter,
  id: string,
): string => AppRouter[route].replace(ID_TEMPLATE, id);
