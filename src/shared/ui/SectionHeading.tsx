import { Box, Stack, Typography } from '@mui/material';
import type { ReactNode } from 'react';

import {
  sectionDescriptionSx,
  sectionEyebrowSx,
  sectionHeadingSx,
  sectionTitleGroupSx,
  sectionTitleSx,
} from './SectionHeading.styles';

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  level = 1,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  action?: ReactNode;
  level?: 1 | 2;
}) {
  return (
    <Box sx={sectionHeadingSx}>
      <Stack sx={sectionTitleGroupSx}>
        <Typography variant="overline" sx={sectionEyebrowSx}>{eyebrow}</Typography>
        <Typography component={level === 1 ? 'h1' : 'h2'} sx={sectionTitleSx(level)}>{title}</Typography>
        {description ? <Typography sx={sectionDescriptionSx}>{description}</Typography> : null}
      </Stack>
      {action}
    </Box>
  );
}