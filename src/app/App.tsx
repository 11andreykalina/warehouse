import { useMemo } from 'react';
import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';
import { RouterProvider } from 'react-router-dom';

import { ThemeProvider as FeatureThemeProvider, useTheme } from '@/features/theme-toggle';
import { ScrollToTopButton } from '@/shared/ui';
import { router } from './providers/router';
import { createMuiTheme } from './styles/muiTheme';

function AppContent() {
  const { theme } = useTheme();
  const muiTheme = useMemo(() => createMuiTheme(theme), [theme]);

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
      <ScrollToTopButton />
    </MuiThemeProvider>
  );
}

function App() {
  return (
    <FeatureThemeProvider>
      <AppContent />
    </FeatureThemeProvider>
  );
}

export default App;
