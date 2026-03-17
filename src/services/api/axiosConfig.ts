import { API_URL } from '@utils/constants/app';

interface RequestOptions extends RequestInit {
  path: string;
}

export const apiRequest = async <T>({ path, ...options }: RequestOptions): Promise<T> => {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers ?? {})
    },
    ...options
  });

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
};
