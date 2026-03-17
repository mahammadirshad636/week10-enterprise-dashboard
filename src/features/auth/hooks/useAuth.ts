import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { login, logout } from '@features/auth/slices/authSlice';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const auth = useAppSelector((state) => state.auth);

  const signIn = useCallback(
    async (email: string, password: string) => {
      const result = await dispatch(login({ email, password }));
      if (login.fulfilled.match(result)) {
        navigate('/dashboard');
      }
      return result;
    },
    [dispatch, navigate]
  );

  const signOut = useCallback(() => {
    dispatch(logout());
    navigate('/auth/login');
  }, [dispatch, navigate]);

  return {
    ...auth,
    signIn,
    signOut
  };
};
