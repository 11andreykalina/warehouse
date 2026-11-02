import { Box, Paper, Stack, Typography } from '@mui/material';

import type { User } from '../model/types';
import {
  getApplicableUniformNorms,
  uniformGenderLabels,
  uniformNormLabels,
  uniformRankGroupLabels,
  uniformServiceLabels,
} from '@/shared/model';
import { profileCardSx, profileFactsSx } from './UserCard.styles';

export function UserCard({ user }: { user: User }) {
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

  return (
    <Paper component="article" sx={profileCardSx}>
      <Stack spacing={0.5}>
        <Typography variant="overline" color="primary.main">Личный кабинет</Typography>
        <Typography variant="h5">{fullName}</Typography>
        <Typography color="text.secondary">{user.service.position ?? user.service.rank ?? 'Сотрудник'}</Typography>
      </Stack>
      <Box component="dl" sx={profileFactsSx}>
        <Box><Typography component="dt">Фамилия</Typography><Typography component="dd">{user.identity.lastName || 'Не указана'}</Typography></Box>
        <Box><Typography component="dt">Имя</Typography><Typography component="dd">{user.identity.firstName || 'Не указано'}</Typography></Box>
        <Box><Typography component="dt">Отчество</Typography><Typography component="dd">{user.identity.middleName || 'Не указано'}</Typography></Box>
        <Box><Typography component="dt">Дата рождения</Typography><Typography component="dd">{user.identity.birthDate ? new Date(user.identity.birthDate).toLocaleDateString('ru-RU') : 'Не указана'}</Typography></Box>
        <Box><Typography component="dt">Номер жетона</Typography><Typography component="dd">{user.badgeNumber}</Typography></Box>
        <Box><Typography component="dt">Номер телефона</Typography><Typography component="dd">{user.phone || 'Не указан'}</Typography></Box>
        <Box><Typography component="dt">Подразделение</Typography><Typography component="dd">{user.service.department || 'Не указано'}</Typography></Box>
        <Box><Typography component="dt">Наименование места службы</Typography><Typography component="dd">{user.service.locationName || 'Не указано'}</Typography></Box>
        <Box><Typography component="dt">Служба</Typography><Typography component="dd">{uniformServiceLabels[user.service.uniformService]}</Typography></Box>
        <Box><Typography component="dt">Пол</Typography><Typography component="dd">{user.measurements.gender ? uniformGenderLabels[user.measurements.gender] : 'Не указан'}</Typography></Box>
        <Box><Typography component="dt">Категория состава</Typography><Typography component="dd">{uniformRankGroupLabels[user.service.rankGroup]}</Typography></Box>
        <Box><Typography component="dt">Применимые нормы</Typography><Typography component="dd">{applicableNorms.map((norm) => uniformNormLabels[norm]).join(', ') || 'Укажите пол сотрудника'}</Typography></Box>
        <Box><Typography component="dt">Звание</Typography><Typography component="dd">{user.service.rank ?? 'Не указано'}</Typography></Box>
        <Box><Typography component="dt">Размер одежды</Typography><Typography component="dd">{user.measurements.clothingSize ?? 'Не указан'}</Typography></Box>
        <Box><Typography component="dt">Размер обуви</Typography><Typography component="dd">{user.measurements.shoeSize ?? 'Не указан'}</Typography></Box>
        <Box><Typography component="dt">Размер головного убора</Typography><Typography component="dd">{user.measurements.headSize ?? 'Не указан'}</Typography></Box>
      </Box>
    </Paper>
  );
}
