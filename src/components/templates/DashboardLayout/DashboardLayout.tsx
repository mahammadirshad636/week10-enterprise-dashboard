import { Box, Stack } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '@components/organisms/Sidebar/Sidebar';
import { Header } from '@components/organisms/Header/Header';

interface DashboardLayoutProps {
  wsStatus: 'connected' | 'disconnected' | 'reconnecting';
}

export const DashboardLayout = ({ wsStatus }: DashboardLayoutProps) => (
  <Stack direction="row" sx={{ minHeight: '100vh' }}>
    <Sidebar />
    <Stack sx={{ flex: 1 }}>
      <Header wsStatus={wsStatus} />
      <Box sx={{ p: 2 }}>
        <Outlet />
      </Box>
    </Stack>
  </Stack>
);
