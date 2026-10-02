import { useTheme } from '../model/useTheme';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const nextTheme = theme === 'light' ? 'dark' : 'light';

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label={`Включить ${nextTheme === 'dark' ? 'тёмную' : 'светлую'} тему`}
      title={`Включить ${nextTheme === 'dark' ? 'тёмную' : 'светлую'} тему`}
    >
      <span className="theme-toggle__icon" aria-hidden="true">
        {theme === 'light' ? '☾' : '☀'}
      </span>
      <span>{theme === 'light' ? 'Светлая' : 'Тёмная'}</span>
    </button>
  );
}
