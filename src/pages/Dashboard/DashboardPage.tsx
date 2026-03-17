import { Box, Stack, Typography } from '@mui/material';
import { useMemo } from 'react';
import { useRouteLoaderData } from 'react-router-dom';
import { useAppSelector } from '@app/hooks';
import { formatCurrency, formatPercent } from '@utils/formatters/number';
import { StatsStrip } from '@features/dashboard/components/StatsStrip';
import { SalesChart } from '@features/dashboard/components/SalesChart';
import { NotificationFeed } from '@features/notifications/components/NotificationFeed';
import type { DashboardStats } from '@features/dashboard/types/dashboard.types';

interface LoaderData {
  preloadedAt: string;
}

export const DashboardPage = () => {
  const loaderData = useRouteLoaderData('dashboard-root') as LoaderData | undefined;
  const preloadedAt = loaderData?.preloadedAt ?? 'not available';
  const { stats, chartData } = useAppSelector((state) => state.dashboard);

  const statItems = useMemo(() => {
    const safeStats: DashboardStats =
      stats ?? {
        revenue: 0,
        activeUsers: 0,
        conversionRate: 0,
        openIncidents: 0
      };
    return [
      { title: 'Revenue', value: formatCurrency(safeStats.revenue), trend: '+8.2% vs last week' },
      { title: 'Active Users', value: safeStats.activeUsers.toLocaleString(), trend: '+2.1% live' },
      { title: 'Conversion', value: formatPercent(safeStats.conversionRate), trend: '+0.3pp' },
      { title: 'Incidents', value: safeStats.openIncidents.toString(), trend: '-1 from yesterday' }
    ];
  }, [stats]);

  return (
    <Stack spacing={3}>
      <Typography variant="caption" color="text.secondary">
        Loader preloaded at: {preloadedAt}
      </Typography>
      <StatsStrip items={statItems} />
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
        <Box sx={{ flex: 2 }}>
          <SalesChart data={chartData} />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Box sx={{ p: 2, border: '1px solid #dedede', borderRadius: 2, height: '100%' }}>
            <NotificationFeed />
          </Box>
        </Box>
      </Stack>
    </Stack>
  );
};
