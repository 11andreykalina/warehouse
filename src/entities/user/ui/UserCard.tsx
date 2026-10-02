import type { User } from '../model/types';

export function UserCard({ user }: { user: User }) {
  const fullName = [user.identity.lastName, user.identity.firstName, user.identity.middleName]
    .filter(Boolean)
    .join(' ');

  return (
    <article className="profile-card">
      <div className="profile-card__identity">
        <p className="eyebrow">Демо-профиль</p>
        <h2>{fullName}</h2>
        <p>{user.service.position}</p>
      </div>
      <dl className="profile-card__facts">
        <div>
          <dt>Номер жетона</dt>
          <dd>{user.badgeNumber}</dd>
        </div>
        <div>
          <dt>Подразделение</dt>
          <dd>{user.service.department}</dd>
        </div>
        <div>
          <dt>Звание</dt>
          <dd>{user.service.rank ?? 'Не указано'}</dd>
        </div>
        <div>
          <dt>Размер одежды</dt>
          <dd>{user.measurements.clothingSize ?? 'Не указан'}</dd>
        </div>
        <div>
          <dt>Размер обуви</dt>
          <dd>{user.measurements.shoeSize ?? 'Не указан'}</dd>
        </div>
        <div>
          <dt>Размер головного убора</dt>
          <dd>{user.measurements.headSize ?? 'Не указан'}</dd>
        </div>
      </dl>
    </article>
  );
}
