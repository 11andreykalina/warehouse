import { Box } from '@mui/material';

import { Input } from '@/shared/ui';
import { searchProductsSx } from './SearchProducts.styles';

export function SearchProducts({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <Box sx={searchProductsSx}>
      <Input aria-label="Поиск по продуктам" placeholder="Поиск по продуктам" value={value} onChange={(event) => onChange(event.target.value)} />
    </Box>
  );
}
