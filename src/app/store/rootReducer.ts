import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '@features/auth/slices/authSlice';
import dashboardReducer from '@features/dashboard/slices/dashboardSlice';
import notificationsReducer from '@features/notifications/slices/notificationSlice';

export const rootReducer = combineReducers({
  auth: authReducer,
  dashboard: dashboardReducer,
  notifications: notificationsReducer
});

export type RootReducerState = ReturnType<typeof rootReducer>;
