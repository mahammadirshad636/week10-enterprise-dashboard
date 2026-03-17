import type { Middleware } from '@reduxjs/toolkit';

export const loggerMiddleware: Middleware = () => (next) => (action) => {
  if (import.meta.env.DEV) {
    const actionType = typeof action === 'object' && action && 'type' in action ? action.type : 'unknown';
    console.log('[Redux Action]', actionType);
  }
  return next(action);
};
