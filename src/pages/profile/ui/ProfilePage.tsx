import { mockUser, UserCard } from '@/entities/user';
import { Link } from 'react-router-dom';

export function ProfilePage() {
  return (
    <div className="page-stack">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Учётная запись</p>
          <h1>Профиль сотрудника</h1>
        </div>
      </div>
      <UserCard user={mockUser} />
      <Link className="button button--secondary" to="/login">
        Открыть демо-вход
      </Link>
    </div>
  );
}
