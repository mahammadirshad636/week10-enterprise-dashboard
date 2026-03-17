import authReducer, { logout, setToken } from '@features/auth/slices/authSlice';

describe('authSlice', () => {
  it('should handle setToken', () => {
    const next = authReducer(undefined, setToken('abc'));
    expect(next.token).toBe('abc');
    expect(next.isAuthenticated).toBe(true);
  });

  it('should handle logout', () => {
    const signedIn = authReducer(undefined, setToken('abc'));
    const next = authReducer(signedIn, logout());
    expect(next.token).toBeNull();
    expect(next.isAuthenticated).toBe(false);
  });
});
