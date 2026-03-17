import { Box, Chip, Stack, Typography } from '@mui/material';
import { UserMenu } from '@components/molecules/UserMenu/UserMenu';

interface HeaderProps {
  wsStatus: 'connected' | 'disconnected' | 'reconnecting';
}

export const Header = ({ wsStatus }: HeaderProps) => (
  <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 2, borderBottom: '1px solid #dedede' }}>
    <Box>
      <Typography variant="h5">Real-time Analytics</Typography>
      <Typography variant="body2" color="text.secondary">
        Production dashboard with scalable architecture
      </Typography>
    </Box>
    <Stack direction="row" spacing={1} alignItems="center">
      <Chip label={`WebSocket: ${wsStatus}`} color={wsStatus === 'connected' ? 'success' : 'warning'} size="small" />
      <UserMenu />
    </Stack>
  </Stack>
);
