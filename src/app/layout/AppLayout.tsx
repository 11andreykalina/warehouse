import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { AppHeader } from '@/widgets/app-header';
import { BottomNavigation } from '@/widgets/bottom-navigation';
import { appShellSx, pageShellSx } from './AppLayout.styles';

export function AppLayout() {
  return (
    <Box sx={appShellSx}>
      <AppHeader />
      <Box component="main" sx={pageShellSx}>
        <Outlet />
      </Box>
      <BottomNavigation />
    </Box>
  );
}
