import { Suspense, lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { CircularProgress, Stack } from '@mui/material';
import { AuthLayout } from '@components/templates/AuthLayout/AuthLayout';
import { ProtectedRoute } from './ProtectedRoute';
import { RoleRoute } from './RoleRoute';
import { dashboardLoader } from './loaders';
import { AppShell } from './AppShell';
import { NotFoundPage } from '@pages/NotFoundPage';

const DashboardPage = lazy(() => import('@pages/Dashboard/DashboardPage').then((m) => ({ default: m.DashboardPage })));
const AnalyticsPage = lazy(() => import('@pages/Analytics/AnalyticsPage').then((m) => ({ default: m.AnalyticsPage })));
const SettingsPage = lazy(() => import('@pages/Settings/SettingsPage').then((m) => ({ default: m.SettingsPage })));
const LoginPage = lazy(() => import('@pages/Auth/LoginPage').then((m) => ({ default: m.LoginPage })));

const Loader = () => (
  <Stack alignItems="center" justifyContent="center" sx={{ minHeight: 220 }}>
    <CircularProgress />
  </Stack>
);

export const router = createBrowserRouter([
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: (
          <Suspense fallback={<Loader />}>
            <LoginPage />
          </Suspense>
        )
      },
      { index: true, element: <Navigate to="login" replace /> }
    ]
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/dashboard',
        id: 'dashboard-root',
        element: <AppShell />,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<Loader />}>
                <DashboardPage />
              </Suspense>
            )
          },
          {
            path: 'analytics',
            element: (
              <Suspense fallback={<Loader />}>
                <AnalyticsPage />
              </Suspense>
            )
          },
          {
            element: <RoleRoute allowedRoles={['admin', 'analyst']} />,
            children: [
              {
                path: 'settings',
                element: (
                  <Suspense fallback={<Loader />}>
                    <SettingsPage />
                  </Suspense>
                )
              }
            ]
          }
        ]
      },
      { path: '/', element: <Navigate to="/dashboard" replace /> }
    ]
  },
  { path: '*', element: <NotFoundPage /> }
]);
