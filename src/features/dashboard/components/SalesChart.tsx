import { Card, CardContent, Typography } from '@mui/material';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import type { ChartDataPoint } from '../types/dashboard.types';

interface SalesChartProps {
  data: ChartDataPoint[];
}

export const SalesChart = ({ data }: SalesChartProps) => (
  <Card>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        Sales and User Growth
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="sales" stroke="#1976d2" strokeWidth={2} />
          <Line type="monotone" dataKey="users" stroke="#2e7d32" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);
