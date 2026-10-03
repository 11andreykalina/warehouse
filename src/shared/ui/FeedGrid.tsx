import { Box } from '@mui/material';
import type { PropsWithChildren } from 'react';

import { feedGridSx } from './FeedGrid.styles';

export function FeedGrid({ children }: PropsWithChildren) {
  return <Box sx={feedGridSx}>{children}</Box>;
}