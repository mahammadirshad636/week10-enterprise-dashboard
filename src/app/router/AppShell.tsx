import { useEffect, useMemo } from 'react';
import { DashboardLayout } from '@components/templates/DashboardLayout/DashboardLayout';
import { DASHBOARD_REFRESH_MS, WS_URL } from '@utils/constants/app';
import { useWebSocket } from '@hooks/useWebSocket';
import { useLocalStorage } from '@hooks/useLocalStorage';

export const AppShell = () => {
  const [realtimeEnabled] = useLocalStorage<boolean>('settings.realtime', true);
  const { status, send } = useWebSocket(WS_URL, realtimeEnabled);
  const normalizedStatus = useMemo(() => status, [status]);

  useEffect(() => {
    if (!realtimeEnabled) {
      return;
    }

    const timer = window.setInterval(() => {
      send({
        type: 'dashboard.update',
        payload: {
          id: `rt-${Date.now()}`,
          label: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          sales: Math.floor(55_000 + Math.random() * 20_000),
          users: Math.floor(900 + Math.random() * 300),
          timestamp: new Date().toISOString()
        }
      });
    }, DASHBOARD_REFRESH_MS);

    return () => window.clearInterval(timer);
  }, [send, realtimeEnabled]);

  return <DashboardLayout wsStatus={normalizedStatus} />;
};
