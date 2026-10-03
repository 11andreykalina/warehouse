import { Button as MuiButton } from '@mui/material';
import type { ButtonProps as MuiButtonProps } from '@mui/material';

import { buttonSx } from './Button.styles';

type ButtonVariant = 'primary' | 'secondary' | 'text';

type ButtonProps = Omit<MuiButtonProps, 'variant'> & {
  variant?: ButtonVariant;
};

export function Button({ variant = 'primary', ...props }: ButtonProps) {
  const muiVariant = variant === 'primary' ? 'contained' : variant === 'secondary' ? 'outlined' : 'text';

  return <MuiButton variant={muiVariant} sx={buttonSx} {...props} />;
}
