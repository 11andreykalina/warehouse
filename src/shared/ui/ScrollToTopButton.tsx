import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Fab } from '@mui/material';

import { useScrollToTop } from './model/useScrollToTop';

export function ScrollToTopButton() {
  const { visible, scrollToTop } = useScrollToTop();

  if (!visible) {
    return null;
  }

  return (
    <Fab
      color="primary"
      size="medium"
      aria-label="Наверх"
      title="Наверх"
      onClick={scrollToTop}
      sx={{
        position: 'fixed',
        zIndex: 1100,
        right: { xs: 16, sm: 24 },
        bottom: { xs: 'calc(env(safe-area-inset-bottom) + 80px)', lg: 24 },
      }}
    >
      <KeyboardArrowUpIcon />
    </Fab>
  );
}
