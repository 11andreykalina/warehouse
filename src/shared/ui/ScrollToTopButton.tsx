import { useEffect, useState } from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Fab } from '@mui/material';

export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setVisible(window.scrollY > 240);
    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
    return () => window.removeEventListener('scroll', updateVisibility);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <Fab
      color="primary"
      size="medium"
      aria-label="Наверх"
      title="Наверх"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
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
