import { createTheme } from '@mui/material/styles';

type ThemeMode = 'light' | 'dark';

export function createMuiTheme(theme: ThemeMode) {
  const isDark = theme === 'dark';

  return createTheme({
    palette: {
      mode: isDark ? 'dark' : 'light',
      primary: { main: isDark ? '#8eafe0' : '#17345d' },
      secondary: { main: isDark ? '#ed7180' : '#bd2738' },
      background: {
        default: isDark ? '#101a2b' : '#f3f5f8',
        paper: isDark ? '#182439' : '#ffffff',
      },
      text: {
        primary: isDark ? '#e8edf5' : '#17243a',
        secondary: isDark ? '#a8b4c5' : '#68758a',
      },
      divider: isDark ? '#2d3b51' : '#e0e5ec',
      error: { main: isDark ? '#ed7180' : '#bd2738' },
    },
    shape: { borderRadius: 8 },
    typography: {
      fontFamily: 'Inter, "Segoe UI", Arial, sans-serif',
      button: { fontWeight: 650, textTransform: 'none' },
    },
    components: {
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: { root: { borderRadius: 8 } },
      },
      MuiCard: {
        defaultProps: { elevation: 0 },
        styleOverrides: {
          root: { border: '1px solid', borderColor: isDark ? '#2d3b51' : '#e0e5ec' },
        },
      },
      MuiPaper: {
        defaultProps: { elevation: 0 },
        styleOverrides: {
          rounded: { borderRadius: 12 },
        },
      },
    },
  });
}