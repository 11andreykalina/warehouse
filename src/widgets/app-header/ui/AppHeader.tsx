import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import { getAuthenticated, logout } from '@/features/auth-by-badge';
import { ThemeToggle } from '@/features/theme-toggle';
import { useCartItems } from '@/entities/cart';

export function AppHeader() {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(getAuthenticated);
  const cartItems = useCartItems();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    logout();
    setAuthenticated(false);
    navigate('/');
  };

  return (
    <header className="app-header">
      <Link to="/" className="app-header__brand">
        <span className="app-header__mark" aria-hidden="true">
          МВД
        </span>
        <span>Склад формы</span>
      </Link>
      <nav className="app-header__nav" aria-label="Основная навигация">
        <NavLink to="/" end>
          Главная
        </NavLink>
        <NavLink to="/catalog">Каталог</NavLink>
        <NavLink to="/search">Поиск</NavLink>
        <NavLink to="/wardrobe">Мой гардероб</NavLink>
        <NavLink to="/orders">Мои заявки</NavLink>
        <NavLink to="/profile">Профиль</NavLink>
        <NavLink to="/cart">
          Заявка <span className="app-header__cart-count">{cartCount}</span>
        </NavLink>
        {authenticated ? (
          <button className="app-header__logout" type="button" onClick={handleLogout}>
            Выйти
          </button>
        ) : (
          <NavLink to="/login">Войти</NavLink>
        )}
      </nav>
      <ThemeToggle />
    </header>
  );
}
