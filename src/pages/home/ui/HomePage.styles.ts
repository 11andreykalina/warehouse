import type { SxProps, Theme } from '@mui/material';

export const homeStackSx: SxProps<Theme> = { gap: { xs: 3, md: 3.5 } };

export const heroSx: SxProps<Theme> = {
  position: 'relative',
  display: 'flex',
  minHeight: { xs: 250, md: 278 },
  alignItems: 'flex-end',
  p: { xs: 3, md: 6.5 },
  overflow: 'hidden',
  borderRadius: 3,
  background: 'radial-gradient(ellipse at 86% 12%, rgba(255,255,255,0.12), transparent 36%), linear-gradient(120deg, #0d1d34 0%, #17345d 58%, #29466c 100%)',
  color: 'common.white',
  boxShadow: '0 18px 44px rgba(16,37,69,0.18)',
};

export const heroEmblemSx: SxProps<Theme> = {
  position: 'absolute',
  top: { xs: 2, md: '50%' },
  right: { xs: 2, md: '8%' },
  width: { xs: 96, sm: 180, md: 300 },
  maxHeight: { xs: 100, md: '86%' },
  objectFit: 'contain',
  opacity: { xs: 0.22, md: 0.88 },
  pointerEvents: 'none',
  transform: { xs: 'none', md: 'translateY(-50%)' },
};

export const heroContentSx: SxProps<Theme> = { position: 'relative', zIndex: 1, maxWidth: 600 };
export const heroEyebrowSx: SxProps<Theme> = { color: '#f28a96' };
export const heroTitleSx: SxProps<Theme> = { maxWidth: 550, mb: 1.5, fontSize: { xs: 34, md: 54 }, lineHeight: 1.05 };
export const heroDescriptionSx: SxProps<Theme> = { maxWidth: 460, mb: 2.5, color: 'rgba(255,255,255,0.78)', lineHeight: 1.6 };

export const homeSectionSx: SxProps<Theme> = { gap: 2.5 };

export const sectionLinkSx: SxProps<Theme> = { flexShrink: 0, fontSize: 13, fontWeight: 700 };

export const heroButtonSx: SxProps<Theme> = { alignSelf: 'flex-start' };