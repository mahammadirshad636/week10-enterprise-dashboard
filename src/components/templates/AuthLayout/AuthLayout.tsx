import { Box, Paper, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';

export const AuthLayout = () => (
  <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', p: 2 }}>
    <Paper sx={{ width: '100%', maxWidth: 420, p: 3 }} elevation={3}>
      <Typography variant="h5" gutterBottom>
        Enterprise Login
      </Typography>
      <Outlet />
    </Paper>
  </Box>
);
