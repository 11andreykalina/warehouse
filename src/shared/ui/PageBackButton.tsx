import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from '@mui/material';

import { usePageBackButton } from './model/usePageBackButton';
import { pageBackButtonSx } from './PageBackButton.styles';

export function PageBackButton({ fallbackTo = '/' }: { fallbackTo?: string }) {
  const handleBack = usePageBackButton(fallbackTo);

  return (
    <Button onClick={handleBack} startIcon={<ArrowBackIcon />} variant="outlined" sx={pageBackButtonSx}>
      Назад
    </Button>
  );
}