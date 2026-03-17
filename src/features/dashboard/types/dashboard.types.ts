export interface DashboardStats {
  revenue: number;
  activeUsers: number;
  conversionRate: number;
  openIncidents: number;
}

export interface ChartDataPoint {
  id: string;
  label: string;
  sales: number;
  users: number;
  timestamp: string;
}

export interface DashboardState {
  stats: DashboardStats | null;
  chartData: ChartDataPoint[];
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
}
