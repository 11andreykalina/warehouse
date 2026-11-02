import { Box, Paper, Stack, Typography } from '@mui/material';

import { AuthForm } from '@/features/auth-by-badge';
import { ThemeToggle } from '@/features/theme-toggle';
import { PageBackButton, SectionHeading } from '@/shared/ui';
import { loginCardSx, loginPageSx, loginThemeControlSx, loginTitleRowSx } from '@/pages/login/ui/LoginPage.styles';

export function RegisterPage() {
  return (
    <Stack component="main" sx={loginPageSx}>
      <Stack sx={loginThemeControlSx}>
        <Box sx={loginTitleRowSx}>
          <PageBackButton />
          <Typography variant="overline" sx={{ letterSpacing: 1.5, color: 'text.secondary', fontWeight: 700, lineHeight: 1.2, whiteSpace: 'nowrap' }}>
            РЕГИСТРАЦИЯ
          </Typography>
          <ThemeToggle />
        </Box>
      </Stack>
      <Paper component="section" sx={loginCardSx}>
        <Stack spacing={2}>
          <SectionHeading eyebrow="Новый аккаунт" title="Регистрация" description="Создайте личный аккаунт для доступа к каталогу и заявкам." />
          <AuthForm mode="register" />
        </Stack>
      </Paper>
    </Stack>
  );
}
