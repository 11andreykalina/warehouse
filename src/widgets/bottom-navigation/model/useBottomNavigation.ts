import { useLocation, useNavigate } from 'react-router-dom';

type NavigationItem = {
  path: string;
};

export function useBottomNavigation(items: NavigationItem[]) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const selectedPath =
    items.find(({ path }) => path === '/' ? pathname === '/' : pathname.startsWith(path))?.path ??
    false;

  const handleChange = (_: unknown, path: string) => navigate(path);

  return { selectedPath, handleChange };
}
