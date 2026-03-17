import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import { useAppSelector } from '@app/hooks';

export const NotificationFeed = () => {
  const items = useAppSelector((state) => state.notifications.items.slice(0, 5));

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Live Notifications
      </Typography>
      <List dense>
        {items.length === 0 && <Typography variant="body2">No live messages yet.</Typography>}
        {items.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemText primary={item.title} secondary={item.message} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
