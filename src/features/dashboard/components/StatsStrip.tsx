import { Box, Button, Stack, Typography } from '@mui/material';
import { useMemo } from 'react';

interface StatCardProps {
  title: string;
  value: string;
  trend?: string;
}

const StatCardRoot = ({ title, value, trend }: StatCardProps) => (
  <Box sx={{ p: 2, border: '1px solid #d9d9d9', borderRadius: 2, minWidth: 180 }}>
    <Typography variant="body2" color="text.secondary">
      {title}
    </Typography>
    <Typography variant="h5">{value}</Typography>
    {trend && <Typography variant="caption">{trend}</Typography>}
  </Box>
);

interface StatCardActionProps {
  label: string;
  onClick: () => void;
}

const StatCardAction = ({ label, onClick }: StatCardActionProps) => <Button size="small" onClick={onClick}>{label}</Button>;

export const StatCard = Object.assign(StatCardRoot, { Action: StatCardAction });

interface StatsStripProps {
  items: StatCardProps[];
}

export const StatsStrip = ({ items }: StatsStripProps) => {
  const cards = useMemo(() => items, [items]);
  return (
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
      {cards.map((item) => (
        <StatCard key={item.title} {...item} />
      ))}
    </Stack>
  );
};
