import { Link } from 'react-router-dom';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';

import { AuthForm } from '@/features/auth-by-badge';
import { ThemeToggle } from '@/features/theme-toggle';
import { PageBackButton, SectionHeading } from '@/shared/ui';
import { loginCardSx, loginHintSx, loginPageSx, loginThemeControlSx, loginTitleRowSx } from './LoginPage.styles';

export function LoginPage() {
  return (
    <Stack component="main" sx={loginPageSx}>
      <Stack sx={loginThemeControlSx}>
        <Box sx={loginTitleRowSx}>
          <PageBackButton />
          <Typography variant="overline" sx={{ letterSpacing: 1.5, color: 'text.secondary', fontWeight: 700, lineHeight: 1.2, whiteSpace: 'nowrap' }}>
            ДЕМО-РЕЖИМ
          </Typography>
          <ThemeToggle />
        </Box>
      </Stack>

      <Paper component="section" sx={loginCardSx}>
        <Stack spacing={2.25}>
          <SectionHeading eyebrow="" title="Вход в систему" description="Проверка входа использует только демонстрационные данные проекта." />
          <AuthForm mode="login" />
          <Typography variant="body2" sx={loginHintSx}>Для демо: жетон 123456, пароль 123456.</Typography>
          <Button component={Link} to="/register" variant="outlined" fullWidth>
            Создать новый аккаунт
          </Button>
        </Stack>
      </Paper>
    </Stack>
  );
}
