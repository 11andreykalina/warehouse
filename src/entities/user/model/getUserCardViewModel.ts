import {
  getApplicableUniformNorms,
  uniformGenderLabels,
  uniformNormLabels,
  uniformRankGroupLabels,
  uniformServiceLabels,
} from '@/shared/model';
import type { User } from './types';

export function getUserCardViewModel(user: User) {
  const fullName = [user.identity.lastName, user.identity.firstName, user.identity.middleName]
    .filter(Boolean)
    .join(' ');
  const applicableNorms = user.measurements.gender
    ? getApplicableUniformNorms({
        gender: user.measurements.gender,
        rankGroup: user.service.rankGroup,
        service: user.service.uniformService,
        duties: user.service.uniformDuties,
        conditions: user.service.uniformConditions,
      })
    : [];

  return {
    fullName,
    position: user.service.position ?? user.service.rank ?? 'Сотрудник',
    facts: [
      { label: 'Фамилия', value: user.identity.lastName || 'Не указана' },
      { label: 'Имя', value: user.identity.firstName || 'Не указано' },
      { label: 'Отчество', value: user.identity.middleName || 'Не указано' },
      {
        label: 'Дата рождения',
        value: user.identity.birthDate
          ? new Date(user.identity.birthDate).toLocaleDateString('ru-RU')
          : 'Не указана',
      },
      { label: 'Номер жетона', value: user.badgeNumber },
      { label: 'Номер телефона', value: user.phone || 'Не указан' },
      { label: 'Подразделение', value: user.service.department || 'Не указано' },
      { label: 'Наименование места службы', value: user.service.locationName || 'Не указано' },
      { label: 'Служба', value: uniformServiceLabels[user.service.uniformService] },
      {
        label: 'Пол',
        value: user.measurements.gender
          ? uniformGenderLabels[user.measurements.gender]
          : 'Не указан',
      },
      { label: 'Категория состава', value: uniformRankGroupLabels[user.service.rankGroup] },
      {
        label: 'Применимые нормы',
        value: applicableNorms.map((norm) => uniformNormLabels[norm]).join(', ') ||
          'Укажите пол сотрудника',
      },
      { label: 'Звание', value: user.service.rank ?? 'Не указано' },
      { label: 'Размер одежды', value: user.measurements.clothingSize ?? 'Не указан' },
      { label: 'Размер обуви', value: user.measurements.shoeSize ?? 'Не указан' },
      { label: 'Размер головного убора', value: user.measurements.headSize ?? 'Не указан' },
    ],
  };
}
