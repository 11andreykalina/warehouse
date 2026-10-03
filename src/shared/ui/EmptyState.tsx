import { Paper, Typography } from '@mui/material';

import { emptyStateSx } from './EmptyState.styles';

export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <Paper sx={emptyStateSx}>
      <Typography variant="h6" gutterBottom>{title}</Typography>
      <Typography color="text.secondary">{description}</Typography>
    </Paper>
  );
}