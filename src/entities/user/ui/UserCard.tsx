import { Box, Paper, Stack, Typography } from '@mui/material';

import type { User } from '../model/types';
import { getUserCardViewModel } from '../model/getUserCardViewModel';
import { profileCardSx, profileFactsSx } from './UserCard.styles';

export function UserCard({ user }: { user: User }) {
  const { fullName, position, facts } = getUserCardViewModel(user);

  return (
    <Paper component="article" sx={profileCardSx}>
      <Stack spacing={0.5}>
        <Typography variant="overline" color="primary.main">Личный кабинет</Typography>
        <Typography variant="h5">{fullName}</Typography>
        <Typography color="text.secondary">{position}</Typography>
      </Stack>
      <Box component="dl" sx={profileFactsSx}>
        {facts.map(({ label, value }) => (
          <Box key={label}>
            <Typography component="dt">{label}</Typography>
            <Typography component="dd">{value}</Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
}
