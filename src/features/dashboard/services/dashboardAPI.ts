import type { DashboardStats, ChartDataPoint } from '../types/dashboard.types';

const now = Date.now();

const basePoints: ChartDataPoint[] = Array.from({ length: 12 }).map((_, index) => ({
  id: `point-${index + 1}`,
  label: `M${index + 1}`,
  sales: 45000 + index * 3500,
  users: 600 + index * 45,
  timestamp: new Date(now - (11 - index) * 60_000).toISOString()
}));

const stats: DashboardStats = {
  revenue: 1452300,
  activeUsers: 1245,
  conversionRate: 3.42,
  openIncidents: 7
};

export const dashboardAPI = {
  getDashboardData: async (): Promise<{ stats: DashboardStats; chartData: ChartDataPoint[] }> => {
    await new Promise((resolve) => setTimeout(resolve, 450));
    return { stats, chartData: basePoints };
  },
  updateChartData: async (newPoint: ChartDataPoint): Promise<ChartDataPoint> => {
    await new Promise((resolve) => setTimeout(resolve, 250));
    return newPoint;
  }
};
