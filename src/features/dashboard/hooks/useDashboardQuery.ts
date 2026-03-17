import { useQuery } from '@tanstack/react-query';
import { dashboardAPI } from '@features/dashboard/services/dashboardAPI';

export const useDashboardQuery = () =>
  useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: dashboardAPI.getDashboardData,
    staleTime: 15_000
  });
