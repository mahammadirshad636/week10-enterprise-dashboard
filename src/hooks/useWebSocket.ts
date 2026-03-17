import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useAppDispatch } from '@app/hooks';
import { pushNotification } from '@features/notifications/slices/notificationSlice';
import { setRealTimeData } from '@features/dashboard/slices/dashboardSlice';
import { WebSocketService, type RealTimeMessage } from '@services/websocket/WebSocketService';
import type { ChartDataPoint } from '@features/dashboard/types/dashboard.types';

const isChartDataPoint = (payload: unknown): payload is ChartDataPoint => {
  if (typeof payload !== 'object' || payload === null) {
    return false;
  }

  const candidate = payload as Partial<ChartDataPoint>;
  return (
    typeof candidate.id === 'string' &&
    typeof candidate.label === 'string' &&
    typeof candidate.sales === 'number' &&
    typeof candidate.users === 'number' &&
    typeof candidate.timestamp === 'string'
  );
};

export const useWebSocket = (url: string, enabled = true) => {
  const dispatch = useAppDispatch();
  const serviceRef = useRef<WebSocketService | null>(null);
  const [status, setStatus] = useState<'connected' | 'disconnected' | 'reconnecting'>('disconnected');

  const onMessage = useCallback(
    (message: RealTimeMessage) => {
      if (message.type === 'dashboard.update' && isChartDataPoint(message.payload)) {
        dispatch(setRealTimeData(message.payload));
      }
      dispatch(
        pushNotification({
          id: crypto.randomUUID(),
          title: 'Live update',
          message: `New message: ${message.type}`,
          severity: 'info',
          read: false,
          createdAt: new Date().toISOString()
        })
      );
    },
    [dispatch]
  );

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const service = new WebSocketService(url, onMessage, setStatus);
    serviceRef.current = service;
    service.connect();

    return () => service.disconnect();
  }, [url, onMessage, enabled]);

  const send = useCallback((message: RealTimeMessage) => {
    serviceRef.current?.send(message);
  }, []);

  return useMemo(
    () => ({
      send,
      status: enabled ? status : 'disconnected'
    }),
    [enabled, send, status]
  );
};
