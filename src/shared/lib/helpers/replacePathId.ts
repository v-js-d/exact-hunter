import { AppRouter, ID_TEMPLATE } from '../../config/AppRouter';

export const replacePathId = (
  route: keyof typeof AppRouter,
  id: string,
): string => {
  const path = AppRouter[route];

  if (!path.includes(ID_TEMPLATE)) {
    throw new Error(
      `Route "${route}" does not contain "${ID_TEMPLATE}" placeholder`,
    );
  }

  return path.replace(ID_TEMPLATE, encodeURIComponent(id));
};
