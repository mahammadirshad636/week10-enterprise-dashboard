import { useCallback, useState } from 'react';

type Validator<T> = (values: T) => Partial<Record<keyof T, string>>;

export const useForm = <T extends Record<string, string>>(initialValues: T, validate?: Validator<T>) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const handleChange = useCallback((key: keyof T, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleSubmit = useCallback(
    async (onSubmit: (vals: T) => Promise<void> | void) => {
      const nextErrors = validate ? validate(values) : {};
      setErrors(nextErrors);
      if (Object.keys(nextErrors).length > 0) {
        return;
      }
      await onSubmit(values);
    },
    [validate, values]
  );

  return { values, errors, handleChange, handleSubmit, setValues };
};
