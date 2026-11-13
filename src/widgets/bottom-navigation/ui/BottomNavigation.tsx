import { BottomNavigation as MuiBottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import CategoryOutlined from '@mui/icons-material/CategoryOutlined';
import CheckroomOutlined from '@mui/icons-material/CheckroomOutlined';
import HomeOutlined from '@mui/icons-material/HomeOutlined';
import PersonOutlined from '@mui/icons-material/PersonOutlined';
import ReceiptLongOutlined from '@mui/icons-material/ReceiptLongOutlined';
import ShoppingCartOutlined from '@mui/icons-material/ShoppingCartOutlined';

import { useBottomNavigation } from '../model/useBottomNavigation';
import { bottomNavigationSx, bottomPaperSx } from './BottomNavigation.styles';

const navigationItems = [
  { path: '/', label: 'Главная', icon: <HomeOutlined /> },
  { path: '/catalog', label: 'Каталог', icon: <CategoryOutlined /> },
  { path: '/cart', label: 'Корзина', icon: <ShoppingCartOutlined /> },
  { path: '/wardrobe', label: 'Гардероб', icon: <CheckroomOutlined /> },
  { path: '/orders', label: 'Заявки', icon: <ReceiptLongOutlined /> },
  { path: '/profile', label: 'Профиль', icon: <PersonOutlined /> },
];

export function BottomNavigation() {
  const { selectedPath, handleChange } = useBottomNavigation(navigationItems);

  return (
    <Paper component="nav" aria-label="Нижняя навигация" sx={bottomPaperSx}>
      <MuiBottomNavigation
        showLabels
        value={selectedPath}
        onChange={handleChange}
        sx={bottomNavigationSx}
      >
        {navigationItems.map(({ path, label, icon }) => (
          <BottomNavigationAction key={path} value={path} label={label} icon={icon} />
        ))}
      </MuiBottomNavigation>
    </Paper>
  );
}
