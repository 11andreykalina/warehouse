import { useMemo } from 'react';

import { useTheme } from '@/features/theme-toggle';
import { createMuiTheme } from '../styles/muiTheme';

export function useMuiTheme() {
  const { theme } = useTheme();
  return useMemo(() => createMuiTheme(theme), [theme]);
}
