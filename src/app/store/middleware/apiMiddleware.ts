import type { Middleware } from '@reduxjs/toolkit';

export const apiMiddleware: Middleware = () => (next) => (action) => {
  if (typeof action === 'object' && action && 'type' in action && String(action.type).endsWith('rejected')) {
    console.error('[API Error Action]', action);
  }
  return next(action);
};
