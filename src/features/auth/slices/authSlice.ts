import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { authAPI, type LoginPayload } from '../services/authAPI';
import type { AuthState, User } from '../types/auth.types';

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  isAuthenticated: false,
  error: null
};

export const login = createAsyncThunk('auth/login', async (payload: LoginPayload, { rejectWithValue }) => {
  try {
    return await authAPI.login(payload);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Login failed';
    return rejectWithValue(message);
  }
});

export const getCurrentUser = createAsyncThunk('auth/getCurrentUser', async (_, { rejectWithValue }) => {
  try {
    return await authAPI.getMe();
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to load user';
    return rejectWithValue(message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = true;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? 'Login failed';
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      });
  }
});

export const { logout, setToken, setUser } = authSlice.actions;
export default authSlice.reducer;
