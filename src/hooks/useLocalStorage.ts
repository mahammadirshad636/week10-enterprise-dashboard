import { useCallback, useEffect, useState } from 'react';

export const useLocalStorage = <T,>(key: string, initialValue: T) => {
  const readValue = useCallback((): T => {
    const raw = localStorage.getItem(key);
    if (!raw) {
      return initialValue;
    }
    try {
      return JSON.parse(raw) as T;
    } catch {
      return initialValue;
    }
  }, [initialValue, key]);

  const [value, setValue] = useState<T>(readValue);

  useEffect(() => {
    const handleStorageChange = () => {
      setValue(readValue());
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('local-storage-updated', handleStorageChange as EventListener);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('local-storage-updated', handleStorageChange as EventListener);
    };
  }, [readValue]);

  const setStoredValue = (nextValue: T) => {
    setValue(nextValue);
    localStorage.setItem(key, JSON.stringify(nextValue));
    window.dispatchEvent(new CustomEvent('local-storage-updated'));
  };

  return [value, setStoredValue] as const;
};
