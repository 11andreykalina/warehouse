import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { getAuthenticated, logout } from '@/features/auth-by-badge';
import { useCartItems } from '@/entities/cart';

export function useAppHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const [authenticated, setAuthenticated] = useState(getAuthenticated);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const cartItems = useCartItems();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => setLogoutDialogOpen(true);
  const handleCancelLogout = () => setLogoutDialogOpen(false);

  const handleConfirmLogout = () => {
    logout();
    setAuthenticated(false);
    setLogoutDialogOpen(false);
    navigate('/');
  };

  return {
    pathname: location.pathname,
    authenticated,
    cartCount,
    logoutDialogOpen,
    handleLogout,
    handleCancelLogout,
    handleConfirmLogout,
  };
}
