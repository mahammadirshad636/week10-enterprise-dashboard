import { Avatar, Menu, MenuItem, IconButton, Typography } from '@mui/material';
import { useState } from 'react';
import { useAuth } from '@features/auth/hooks/useAuth';

export const UserMenu = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const { user, signOut } = useAuth();

  return (
    <>
      <IconButton onClick={(event) => setAnchorEl(event.currentTarget)}>
        <Avatar>{user?.name?.at(0) ?? 'U'}</Avatar>
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        <MenuItem disabled>
          <Typography variant="body2">{user?.email ?? 'unknown@enterprise.io'}</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            signOut();
          }}
        >
          Sign Out
        </MenuItem>
      </Menu>
    </>
  );
};
