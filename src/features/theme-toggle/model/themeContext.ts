import { createContext } from 'react';

export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'warehouse-theme-v2';
export const ThemeContext = createContext<{ theme: Theme; toggleTheme: () => void } | null>(null);
