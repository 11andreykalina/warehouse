import { Stack } from '@mui/material';
import type { StackProps } from '@mui/material';

import { pageStackSx } from './PageStack.styles';

export function PageStack(props: StackProps) {
  return <Stack spacing={3} {...props} sx={[pageStackSx, ...(Array.isArray(props.sx) ? props.sx : props.sx ? [props.sx] : [])]} />;
}