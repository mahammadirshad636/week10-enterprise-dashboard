import type { ReactNode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReduxProvider } from './ReduxProvider';
import { queryClient } from './queryClient';

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => (
  <ReduxProvider>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </ReduxProvider>
);
