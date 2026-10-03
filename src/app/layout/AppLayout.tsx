import { Suspense } from 'react';
import { Box } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';

import { PageBackButton } from '@/shared/ui';
import { AppHeader } from '@/widgets/app-header';
import { BottomNavigation } from '@/widgets/bottom-navigation';
import { appShellSx, pageShellSx } from './AppLayout.styles';

export function AppLayout() {
  const { pathname } = useLocation();
  const isHomePage = pathname === '/';
  const fallbackTo = pathname.startsWith('/outfit/') ? '/outfits' : pathname.startsWith('/product/') ? '/catalog' : '/';

  return (
    <Box sx={appShellSx}>
      <AppHeader />
      <Box component="main" sx={pageShellSx}>
        {!isHomePage ? <PageBackButton fallbackTo={fallbackTo} /> : null}
        <Suspense fallback={<Box role="status" sx={{ minHeight: '40vh' }} />}>
          <Outlet />
        </Suspense>
      </Box>
      <BottomNavigation />
    </Box>
  );
}
