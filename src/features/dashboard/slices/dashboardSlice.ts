import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { dashboardAPI } from '../services/dashboardAPI';
import type { DashboardState, ChartDataPoint } from '../types/dashboard.types';

const initialState: DashboardState = {
  stats: null,
  chartData: [],
  loading: false,
  error: null,
  lastUpdated: null
};

export const fetchDashboardData = createAsyncThunk('dashboard/fetchData', async (_, { rejectWithValue }) => {
  try {
    return await dashboardAPI.getDashboardData();
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to fetch dashboard data';
    return rejectWithValue(message);
  }
});

export const updateChartData = createAsyncThunk(
  'dashboard/updateChartData',
  async (newData: ChartDataPoint, { dispatch, rejectWithValue }) => {
    dispatch(optimisticUpdate(newData));
    try {
      return await dashboardAPI.updateChartData(newData);
    } catch (error) {
      dispatch(revertUpdate(newData.id));
      const message = error instanceof Error ? error.message : 'Unable to update chart data';
      return rejectWithValue(message);
    }
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    optimisticUpdate: (state, action: PayloadAction<ChartDataPoint>) => {
      const existingIndex = state.chartData.findIndex((item) => item.id === action.payload.id);
      if (existingIndex >= 0) {
        state.chartData[existingIndex] = action.payload;
      } else {
        state.chartData.push(action.payload);
      }
      state.lastUpdated = new Date().toISOString();
    },
    revertUpdate: (state, action: PayloadAction<string>) => {
      state.chartData = state.chartData.filter((item) => item.id !== action.payload);
      state.lastUpdated = new Date().toISOString();
    },
    setRealTimeData: (state, action: PayloadAction<ChartDataPoint>) => {
      state.chartData = [...state.chartData.slice(-19), action.payload];
      state.lastUpdated = new Date().toISOString();
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload.stats;
        state.chartData = action.payload.chartData;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? 'Unable to load dashboard';
      })
      .addCase(updateChartData.rejected, (state, action) => {
        state.error = (action.payload as string) ?? 'Chart update failed';
      });
  }
});

export const { optimisticUpdate, revertUpdate, setRealTimeData } = dashboardSlice.actions;
export default dashboardSlice.reducer;
