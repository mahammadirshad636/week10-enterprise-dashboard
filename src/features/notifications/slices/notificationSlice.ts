import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { NotificationItem, NotificationsState } from './notification.types';

const initialState: NotificationsState = {
  items: []
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    pushNotification: (state, action: PayloadAction<NotificationItem>) => {
      state.items.unshift(action.payload);
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      const item = state.items.find((n) => n.id === action.payload);
      if (item) {
        item.read = true;
      }
    },
    clearNotifications: (state) => {
      state.items = [];
    }
  }
});

export const { pushNotification, markAsRead, clearNotifications } = notificationsSlice.actions;
export default notificationsSlice.reducer;
