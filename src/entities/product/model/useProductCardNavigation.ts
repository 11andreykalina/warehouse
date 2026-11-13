import { useLocation } from 'react-router-dom';

export function useProductCardNavigation() {
  const location = useLocation();
  const returnTo = `${location.pathname}${location.search}${location.hash}`;

  return { returnTo, state: { returnTo } };
}
