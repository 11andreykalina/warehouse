import { Suspense, useState, type FormEvent } from 'react';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import { Box, IconButton, InputAdornment, OutlinedInput, Paper } from '@mui/material';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { PageBackButton } from '@/shared/ui';
import { AppHeader } from '@/widgets/app-header';
import { BottomNavigation } from '@/widgets/bottom-navigation';
import { appShellSx, pageShellSx, searchBarSx } from './AppLayout.styles';

export function AppLayout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isHomePage = pathname === '/';
  const fallbackTo = pathname.startsWith('/outfit/') ? '/outfits' : pathname.startsWith('/product/') ? '/catalog' : '/';
  const [query, setQuery] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedQuery = query.trim();
    navigate(normalizedQuery ? `/search?q=${encodeURIComponent(normalizedQuery)}` : '/search');
  };

  return (
    <Box sx={appShellSx}>
      <AppHeader />
      <Box component="main" sx={pageShellSx}>
        {!isHomePage ? <PageBackButton fallbackTo={fallbackTo} /> : null}
        <Box component="form" onSubmit={handleSubmit} sx={searchBarSx}>
          <Paper elevation={0} sx={{ borderRadius: 2, border: 1, borderColor: 'divider', backgroundColor: 'background.paper' }}>
            <OutlinedInput
              fullWidth
              aria-label="Поиск по каталогу"
              placeholder="Поиск по каталогу"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
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
        <Suspense fallback={<Box role="status" sx={{ minHeight: '40vh' }} />}>
          <Outlet />
        </Suspense>
      </Box>
      <BottomNavigation />
    </Box>
  );
}
