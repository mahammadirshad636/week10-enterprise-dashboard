import type { User } from '../types/auth.types';

export interface LoginPayload {
  email: string;
  password: string;
}

const mockUser: User = {
  id: 'u-100',
  name: 'Isha Product',
  email: 'admin@enterprise.io',
  role: 'admin'
};

export const authAPI = {
  login: async (payload: LoginPayload): Promise<{ token: string; user: User }> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (payload.email === 'admin@enterprise.io' && payload.password === 'password123') {
      return { token: 'mock-token-enterprise', user: mockUser };
    }
    throw new Error('Invalid credentials');
  },
  getMe: async (): Promise<User> => {
    await new Promise((resolve) => setTimeout(resolve, 250));
    return mockUser;
  }
};
