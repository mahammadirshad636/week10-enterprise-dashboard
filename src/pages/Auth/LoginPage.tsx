import { Alert, Stack } from '@mui/material';
import { Button } from '@components/atoms/Button/Button';
import { Input } from '@components/atoms/Input/Input';
import { useAuth } from '@features/auth/hooks/useAuth';
import { useForm } from '@hooks/useForm';
import { isValidEmail } from '@utils/validators/auth';

export const LoginPage = () => {
  const { loading, error, signIn } = useAuth();
  const { values, errors, handleChange, handleSubmit } = useForm(
    { email: 'admin@enterprise.io', password: 'password123' },
    (currentValues) => {
      const nextErrors: Partial<Record<'email' | 'password', string>> = {};
      if (!isValidEmail(currentValues.email)) {
        nextErrors.email = 'Valid email is required';
      }
      if (currentValues.password.length < 8) {
        nextErrors.password = 'Password must contain at least 8 characters';
      }
      return nextErrors;
    }
  );

  return (
    <Stack
      spacing={2}
      component="form"
      onSubmit={(event) => {
        event.preventDefault();
        void handleSubmit(async (formValues) => {
          await signIn(formValues.email, formValues.password);
        });
      }}
    >
      <Input
        label="Email"
        value={values.email}
        onChange={(event) => handleChange('email', event.target.value)}
        error={Boolean(errors.email)}
        helperText={errors.email}
      />
      <Input
        label="Password"
        type="password"
        value={values.password}
        onChange={(event) => handleChange('password', event.target.value)}
        error={Boolean(errors.password)}
        helperText={errors.password}
      />
      {error && <Alert severity="error">{error}</Alert>}
      <Button type="submit" disabled={loading}>
        {loading ? 'Signing in...' : 'Sign In'}
      </Button>
    </Stack>
  );
};
