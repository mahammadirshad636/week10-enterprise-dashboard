import { createRoot } from 'react-dom/client';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { RouterProvider } from 'react-router-dom';
import { AppProvider } from '@app/providers/AppProvider';
import { router } from '@app/router';
import { appTheme } from '@styles/theme/theme';
import './app/i18n';
import '@styles/global.css';

createRoot(document.getElementById('root')!).render(
  <AppProvider>
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </AppProvider>
);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    if (import.meta.env.PROD) {
      void navigator.serviceWorker.register('/sw.js');
      return;
    }

    void navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((registration) => {
        void registration.unregister();
      });
    });
  });
}
