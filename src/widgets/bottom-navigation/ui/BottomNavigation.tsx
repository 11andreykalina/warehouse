import { NavLink } from 'react-router-dom';

export function BottomNavigation() {
  return (
    <nav className="bottom-nav" aria-label="Нижняя навигация">
      <NavLink to="/" end>
        Главная
      </NavLink>
      <NavLink to="/catalog">Каталог</NavLink>
      <NavLink to="/cart">Заявка</NavLink>
      <NavLink to="/wardrobe">Гардероб</NavLink>
      <NavLink to="/orders">Заявки</NavLink>
      <NavLink to="/profile">Профиль</NavLink>
    </nav>
  );
}
