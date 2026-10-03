import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Stack } from '@mui/material';

import { mockUser } from '@/entities/user';
import { Button, Input } from '@/shared/ui';
import { setAuthenticated } from '../model/auth';
import { authFormSx } from './AuthForm.styles';

export function AuthForm() {
  const navigate = useNavigate();
  const [badgeNumber, setBadgeNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (badgeNumber === mockUser.badgeNumber && password === '123456') {
      setAuthenticated();
      navigate('/');
      return;
    }

    setError('Неверный номер жетона или пароль.');
  };

  return (
    <Stack component="form" onSubmit={handleSubmit} spacing={2} sx={authFormSx}>
      <Input label="Номер жетона" autoComplete="username" required value={badgeNumber} onChange={(event) => setBadgeNumber(event.target.value)} />
      <Input label="Пароль" type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} />
      {error ? <Alert role="alert" severity="error">{error}</Alert> : null}
      <Button type="submit" fullWidth>Войти</Button>
    </Stack>
  );
}
