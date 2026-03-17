import { configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore
} from 'redux-persist';
import createWebStorage from 'redux-persist/es/storage/createWebStorage';
import { rootReducer } from './rootReducer';
import { apiMiddleware } from './middleware/apiMiddleware';
import { loggerMiddleware } from './middleware/loggerMiddleware';

const createNoopStorage = () => ({
  getItem: () => Promise.resolve(null),
  setItem: (_: string, value: unknown) => Promise.resolve(value),
  removeItem: () => Promise.resolve()
});

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
  blacklist: ['notifications']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(apiMiddleware, loggerMiddleware),
  devTools: import.meta.env.DEV
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
