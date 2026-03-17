import { Stack, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

const links = [
  { to: '/dashboard', label: 'Overview' },
  { to: '/dashboard/analytics', label: 'Analytics' },
  { to: '/dashboard/settings', label: 'Settings' }
];

export const Sidebar = () => (
  <Stack spacing={2} sx={{ minWidth: 220, p: 2, borderRight: '1px solid #dedede' }}>
    <Typography variant="h6">Enterprise</Typography>
    {links.map((link) => (
      <NavLink key={link.to} to={link.to} style={{ textDecoration: 'none', color: '#0f172a' }}>
        {link.label}
      </NavLink>
    ))}
  </Stack>
);
