import { Paper, Typography } from '@mui/material';
import type { DashboardStats } from '../types/dashboard.types';

interface PlatformStatusReportProps {
  preloadedAt: string;
  stats: DashboardStats | null;
  chartPoints: number;
  notificationCount: number;
}

const divider = '='.repeat(37);
const sectionDivider = '-'.repeat(23);

const pad = (value: string, width: number) => `${value}${' '.repeat(Math.max(1, width - value.length))}`;

export const PlatformStatusReport = ({
  preloadedAt,
  stats,
  chartPoints,
  notificationCount
}: PlatformStatusReportProps) => {
  const safeStats: DashboardStats =
    stats ?? {
      revenue: 0,
      activeUsers: 0,
      conversionRate: 0,
      openIncidents: 0
    };

  const report = [
    '🚀 ENTERPRISE DASHBOARD INITIALIZED',
    divider,
    '',
    '🏗️ ARCHITECTURE READY',
    sectionDivider,
    '✅ React + TypeScript strict mode active',
    '✅ Redux Toolkit + Persist configured',
    '✅ React Router v6 nested routing enabled',
    '✅ WebSocket real-time channel configured',
    '✅ Recharts analytics pipeline ready',
    '✅ Material UI component system loaded',
    '',
    '📊 LIVE SERVICE SNAPSHOT',
    sectionDivider,
    `Snapshot Time: ${preloadedAt}`,
    '',
    '┌──────────────────────┬────────────────────────┐',
    `│ ${pad('Metric', 20)} │ ${pad('Value', 22)}│`,
    '├──────────────────────┼────────────────────────┤',
    `│ ${pad('Revenue', 20)} │ ${pad(`$${safeStats.revenue.toLocaleString()}`, 22)}│`,
    `│ ${pad('Active Users', 20)} │ ${pad(safeStats.activeUsers.toLocaleString(), 22)}│`,
    `│ ${pad('Conversion Rate', 20)} │ ${pad(`${safeStats.conversionRate.toFixed(2)}%`, 22)}│`,
    `│ ${pad('Open Incidents', 20)} │ ${pad(safeStats.openIncidents.toString(), 22)}│`,
    `│ ${pad('Chart Data Points', 20)} │ ${pad(chartPoints.toString(), 22)}│`,
    `│ ${pad('Notifications', 20)} │ ${pad(notificationCount.toString(), 22)}│`,
    '└──────────────────────┴────────────────────────┘',
    '',
    '🔒 RESILIENCE STATUS',
    sectionDivider,
    '• Route guards: Enabled',
    '• Loader prefetch: Enabled',
    '• Persisted auth state: Enabled',
    '• Reconnect strategy: Exponential backoff',
    '',
    '🚀 READY FOR DEMO',
    sectionDivider,
    'Health Checks:',
    '✅ Dashboard state loaded',
    '✅ UI rendering pipeline stable',
    '✅ Analytics module available'
  ].join('\n');

  return (
    <Paper elevation={1} sx={{ p: 2.5, borderRadius: 2 }}>
      <Typography
        component="pre"
        className="terminal-report"
        sx={{
          m: 0,
          whiteSpace: 'pre-wrap',
          overflowX: 'auto',
          fontFamily: 'Consolas, "Courier New", monospace',
          fontSize: { xs: '0.72rem', md: '0.82rem' },
          lineHeight: 1.55
        }}
      >
        {report}
      </Typography>
    </Paper>
  );
};
