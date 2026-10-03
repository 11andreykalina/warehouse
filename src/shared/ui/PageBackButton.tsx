import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { pageBackButtonSx } from './PageBackButton.styles';

export function PageBackButton({ fallbackTo = '/' }: { fallbackTo?: string }) {
  const navigate = useNavigate();

  const handleBack = () => {
    const historyIndex = window.history.state?.idx;
    if (typeof historyIndex === 'number' && historyIndex > 0) {
      navigate(-1);
      return;
    }

    navigate(fallbackTo);
  };

  return (
    <Button onClick={handleBack} startIcon={<ArrowBackIcon />} variant="outlined" sx={pageBackButtonSx}>
      Назад
    </Button>
  );
}