import { Box, Card, CardContent, Typography } from '@mui/material';
import { useAppSelector } from '@app/hooks';
import { useLocalStorage } from '@hooks/useLocalStorage';

export const AnalyticsPage = () => {
  const chartData = useAppSelector((state) => state.dashboard.chartData.slice(-6));
  const [compactMode] = useLocalStorage<boolean>('settings.compactMode', false);
  const cardWidth = compactMode ? 160 : 300;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="body2" color="text.secondary">
        View mode: {compactMode ? 'Compact' : 'Comfortable'}
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gap: compactMode ? 1 : 2,
          gridTemplateColumns: `repeat(auto-fill, minmax(${cardWidth}px, 1fr))`,
          alignItems: 'stretch'
        }}
      >
        {chartData.map((entry) => (
          <Card key={entry.id}>
            <CardContent sx={{ p: compactMode ? 1.25 : 2.5 }}>
              <Typography variant={compactMode ? 'caption' : 'subtitle2'}>{entry.label}</Typography>
              <Typography variant={compactMode ? 'subtitle1' : 'h6'}>${entry.sales.toLocaleString()}</Typography>
              <Typography variant={compactMode ? 'caption' : 'body2'}>Users: {entry.users}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};
