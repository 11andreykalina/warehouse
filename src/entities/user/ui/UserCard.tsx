import { Box, Paper, Stack, Typography } from '@mui/material';

import type { User } from '../model/types';
import { profileCardSx, profileFactsSx } from './UserCard.styles';

export function UserCard({ user }: { user: User }) {
  const fullName = [user.identity.lastName, user.identity.firstName, user.identity.middleName]
    .filter(Boolean)
    .join(' ');

  return (
    <Paper component="article" sx={profileCardSx}>
      <Stack spacing={0.5}>
        <Typography variant="overline" color="primary.main">Демо-профиль</Typography>
        <Typography variant="h5">{fullName}</Typography>
        <Typography color="text.secondary">{user.service.position}</Typography>
      </Stack>
      <Box component="dl" sx={profileFactsSx}>
        <Box><Typography component="dt">Номер жетона</Typography><Typography component="dd">{user.badgeNumber}</Typography></Box>
        <Box><Typography component="dt">Подразделение</Typography><Typography component="dd">{user.service.department}</Typography></Box>
        <Box><Typography component="dt">Звание</Typography><Typography component="dd">{user.service.rank ?? 'Не указано'}</Typography></Box>
        <Box><Typography component="dt">Размер одежды</Typography><Typography component="dd">{user.measurements.clothingSize ?? 'Не указан'}</Typography></Box>
        <Box><Typography component="dt">Размер обуви</Typography><Typography component="dd">{user.measurements.shoeSize ?? 'Не указан'}</Typography></Box>
        <Box><Typography component="dt">Размер головного убора</Typography><Typography component="dd">{user.measurements.headSize ?? 'Не указан'}</Typography></Box>
      </Box>
    </Paper>
  );
}
