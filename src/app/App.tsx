import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';
import { RouterProvider } from 'react-router-dom';

import { ThemeProvider as FeatureThemeProvider } from '@/features/theme-toggle';
import { ScrollToTopButton } from '@/shared/ui';
import { router } from './providers/router';
import { useMuiTheme } from './model/useMuiTheme';

function AppContent() {
  const muiTheme = useMuiTheme();

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
