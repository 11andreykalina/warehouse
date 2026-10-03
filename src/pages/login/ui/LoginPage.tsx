import { Paper, Stack, Typography } from '@mui/material';

import { AuthForm } from '@/features/auth-by-badge';
import { ThemeToggle } from '@/features/theme-toggle';
import { PageBackButton, SectionHeading } from '@/shared/ui';
import { loginCardSx, loginHintSx, loginPageSx, loginThemeControlSx } from './LoginPage.styles';

export function LoginPage() {
  return (
    <Stack component="main" sx={loginPageSx}>
      <Stack sx={loginThemeControlSx}>
        <PageBackButton />
        <ThemeToggle />
      </Stack>
      <Paper component="section" sx={loginCardSx}>
        <Stack spacing={2}>
          <SectionHeading eyebrow="Демо-режим" title="Вход в систему" />
          <Typography color="text.secondary">Проверка входа использует только демонстрационные данные проекта.</Typography>
        <AuthForm />
          <Typography variant="body2" sx={loginHintSx}>Для демо: жетон 123456, пароль 123456.</Typography>
        </Stack>
      </Paper>
    </Stack>
  );
}
