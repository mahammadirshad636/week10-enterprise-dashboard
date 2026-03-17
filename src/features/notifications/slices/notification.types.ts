export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  severity: 'info' | 'success' | 'warning' | 'error';
  createdAt: string;
  read: boolean;
}

export interface NotificationsState {
  items: NotificationItem[];
}
