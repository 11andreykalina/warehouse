import { Suspense } from 'react';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import { Box, IconButton, InputAdornment, OutlinedInput, Paper } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { PageBackButton } from '@/shared/ui';
import { AppHeader } from '@/widgets/app-header';
import { BottomNavigation } from '@/widgets/bottom-navigation';
import { useAppLayout } from './model/useAppLayout';
import { appShellSx, pageShellSx, searchBarSx } from './AppLayout.styles';

export function AppLayout() {
  const { isHomePage, fallbackTo, query, handleSubmit, handleQueryChange } = useAppLayout();

  return (
    <Box sx={appShellSx}>
      <AppHeader />
      <Box component="main" sx={pageShellSx}>
        <Box sx={{ display: 'flex', alignItems: 'stretch', gap: 1.5, width: '100%' }}>
          {!isHomePage ? <PageBackButton fallbackTo={fallbackTo} /> : null}
          <Box component="form" onSubmit={handleSubmit} sx={searchBarSx}>
            <Paper elevation={0} sx={{ borderRadius: 2, border: 1, borderColor: 'divider', backgroundColor: 'background.paper' }}>
              <OutlinedInput
                fullWidth
                aria-label="Поиск по каталогу"
                placeholder="Поиск по каталогу"
                value={query}
                onChange={(event) => handleQueryChange(event.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton type="submit" edge="end" aria-label="Искать" size="small">
                      <SearchOutlined />
                    </IconButton>
                  </InputAdornment>
                }
                sx={{ borderRadius: 2, '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }}
              />
            </Paper>
          </Box>
        </Box>
        <Suspense fallback={<Box role="status" sx={{ minHeight: '40vh' }} />}>
          <Outlet />
        </Suspense>
      </Box>
      <BottomNavigation />
    </Box>
  );
}
