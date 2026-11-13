import { Link } from 'react-router-dom';
import { AppBar, Badge, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Toolbar, Typography } from '@mui/material';

import { ThemeToggle } from '@/features/theme-toggle';
import { useAppHeader } from '../model/useAppHeader';
import { appBarSx, brandMarkSx, brandSx, brandTextSx, cartBadgeSx, navButtonSx, navSx, toolbarSx } from './AppHeader.styles';

const navigationItems = [
  { path: '/', label: 'Главная' },
  { path: '/catalog', label: 'Каталог' },
  { path: '/outfits', label: 'Комплекты' },
  { path: '/search', label: 'Поиск' },
  { path: '/wardrobe', label: 'Мой гардероб' },
  { path: '/orders', label: 'Мои заявки' },
  { path: '/profile', label: 'Профиль' },
];

export function AppHeader() {
  const {
    pathname,
    authenticated,
    cartCount,
    logoutDialogOpen,
    handleLogout,
    handleCancelLogout,
    handleConfirmLogout,
  } = useAppHeader();

  return (
    <>
      <AppBar sx={appBarSx}>
        <Toolbar sx={toolbarSx}>
          <Box component={Link} to="/" sx={brandSx}>
            <Box component="span" aria-hidden="true" sx={brandMarkSx}>
              МВД
            </Box>
            <Typography component="span" sx={brandTextSx}>Склад формы</Typography>
          </Box>
          <Box component="nav" aria-label="Основная навигация" sx={navSx}>
            {navigationItems.map(({ path, label }) => (
              <Button
                key={path}
                component={Link}
                to={path}
                aria-current={pathname === path ? 'page' : undefined}
                sx={navButtonSx}
              >
                {label}
              </Button>
            ))}
            <Button component={Link} to="/cart" sx={navButtonSx}>
              <Badge badgeContent={cartCount} color="secondary" sx={cartBadgeSx}>Корзина</Badge>
            </Button>
            {authenticated ? (
              <Button color="inherit" onClick={handleLogout} sx={navButtonSx}>
                Выйти
              </Button>
            ) : (
              <Button component={Link} to="/login" sx={navButtonSx}>
                Войти
              </Button>
            )}
          </Box>
          <ThemeToggle />
        </Toolbar>
      </AppBar>

      <Dialog open={logoutDialogOpen} onClose={handleCancelLogout}>
        <DialogTitle>Подтверждение выхода</DialogTitle>
        <DialogContent>
          <DialogContentText>Вы действительно хотите выйти из системы?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelLogout}>Отмена</Button>
          <Button color="error" variant="contained" onClick={handleConfirmLogout}>
            Выйти
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
