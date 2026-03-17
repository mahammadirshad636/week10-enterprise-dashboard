import { createTheme } from '@mui/material/styles';

export const appTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#005a9c' },
    secondary: { main: '#2e7d32' },
    background: { default: '#f3f6f9' }
  },
  typography: {
    fontFamily: '"Segoe UI", "Helvetica Neue", sans-serif'
  }
});
