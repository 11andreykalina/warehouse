import DarkModeOutlined from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlined from '@mui/icons-material/LightModeOutlined';
import { IconButton, Tooltip } from '@mui/material';

import { useTheme } from '../model/useTheme';
import { themeToggleSx } from './ThemeToggle.styles';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const nextTheme = theme === 'light' ? 'dark' : 'light';

  return (
    <Tooltip title={`Включить ${nextTheme === 'dark' ? 'тёмную' : 'светлую'} тему`}>
      <IconButton aria-label={`Включить ${nextTheme === 'dark' ? 'тёмную' : 'светлую'} тему`} onClick={toggleTheme} sx={themeToggleSx}>
        {theme === 'light' ? <DarkModeOutlined /> : <LightModeOutlined />}
      </IconButton>
    </Tooltip>
  );
}
