import { useLocation, useNavigate } from 'react-router-dom';
import { BottomNavigation as MuiBottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import CategoryOutlined from '@mui/icons-material/CategoryOutlined';
import CheckroomOutlined from '@mui/icons-material/CheckroomOutlined';
import HomeOutlined from '@mui/icons-material/HomeOutlined';
import PersonOutlined from '@mui/icons-material/PersonOutlined';
import ReceiptLongOutlined from '@mui/icons-material/ReceiptLongOutlined';
import ShoppingCartOutlined from '@mui/icons-material/ShoppingCartOutlined';

import { bottomNavigationSx, bottomPaperSx } from './BottomNavigation.styles';

const navigationItems = [
  { path: '/', label: 'Главная', icon: <HomeOutlined /> },
  { path: '/catalog', label: 'Каталог', icon: <CategoryOutlined /> },
  { path: '/cart', label: 'Заявка', icon: <ShoppingCartOutlined /> },
  { path: '/wardrobe', label: 'Гардероб', icon: <CheckroomOutlined /> },
  { path: '/orders', label: 'Заявки', icon: <ReceiptLongOutlined /> },
  { path: '/profile', label: 'Профиль', icon: <PersonOutlined /> },
];

export function BottomNavigation() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const selectedPath = navigationItems.find(({ path }) => path === '/' ? pathname === '/' : pathname.startsWith(path))?.path ?? false;

  return (
    <Paper component="nav" aria-label="Нижняя навигация" sx={bottomPaperSx}>
      <MuiBottomNavigation
        showLabels
        value={selectedPath}
        onChange={(_, path: string) => navigate(path)}
        sx={bottomNavigationSx}
      >
        {navigationItems.map(({ path, label, icon }) => (
          <BottomNavigationAction key={path} value={path} label={label} icon={icon} />
        ))}
      </MuiBottomNavigation>
    </Paper>
  );
}
