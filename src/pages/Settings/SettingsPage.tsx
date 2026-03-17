import { Stack, Switch, Typography, FormControlLabel } from '@mui/material';
import { useLocalStorage } from '@hooks/useLocalStorage';

export const SettingsPage = () => {
  const [realtime, setRealtime] = useLocalStorage<boolean>('settings.realtime', true);
  const [compactMode, setCompactMode] = useLocalStorage<boolean>('settings.compactMode', false);

  return (
    <Stack spacing={2}>
      <Typography variant="h6">Workspace Settings</Typography>
      <FormControlLabel
        control={<Switch checked={realtime} onChange={(_, checked) => setRealtime(checked)} />}
        label="Enable real-time updates"
      />
      <FormControlLabel
        control={<Switch checked={compactMode} onChange={(_, checked) => setCompactMode(checked)} />}
        label="Compact table layout"
      />
    </Stack>
  );
};
