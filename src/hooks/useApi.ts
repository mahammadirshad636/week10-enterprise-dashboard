import { useCallback, useState } from 'react';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export const useApi = <T,>(request: () => Promise<T>) => {
  const [state, setState] = useState<UseApiState<T>>({ data: null, loading: false, error: null });

  const execute = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const data = await request();
      setState({ data, loading: false, error: null });
      return data;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'API request failed';
      setState((prev) => ({ ...prev, loading: false, error: message }));
      return null;
    }
  }, [request]);

  return { ...state, execute };
};
