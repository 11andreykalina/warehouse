import { TextField } from '@mui/material';
import type { TextFieldProps } from '@mui/material';

import { inputSx } from './Input.styles';

type InputProps = Omit<TextFieldProps, 'variant' | 'sx'>;

export function Input(props: InputProps) {
  return <TextField fullWidth size="small" variant="outlined" sx={inputSx} {...props} />;
}
