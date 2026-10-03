import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppBar, Badge, Box, Button, Toolbar, Typography } from '@mui/material';

import { getAuthenticated, logout } from '@/features/auth-by-badge';
import { ThemeToggle } from '@/features/theme-toggle';
import { useCartItems } from '@/entities/cart';
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
  const navigate = useNavigate();
  const location = useLocation();
  const [authenticated, setAuthenticated] = useState(getAuthenticated);
  const cartItems = useCartItems();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    logout();
    setAuthenticated(false);
    navigate('/');
  };

  return (
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
              aria-current={location.pathname === path ? 'page' : undefined}
              sx={navButtonSx}
            >
              {label}
            </Button>
          ))}
          <Button component={Link} to="/cart" sx={navButtonSx}>
            <Badge badgeContent={cartCount} color="secondary" sx={cartBadgeSx}>Заявка</Badge>
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
  );
}
