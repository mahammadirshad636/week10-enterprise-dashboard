import { store } from '@app/store';
import { fetchDashboardData } from '@features/dashboard/slices/dashboardSlice';

export const dashboardLoader = async () => {
  await store.dispatch(fetchDashboardData());
  return { preloadedAt: new Date().toISOString() };
};
