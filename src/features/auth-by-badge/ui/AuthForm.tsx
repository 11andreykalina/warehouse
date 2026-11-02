import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Stack, Typography } from '@mui/material';

import { Button, Input } from '@/shared/ui';
import {
  authenticateWithMockCredentials,
  registerMockUser,
  setAuthenticated,
} from '../model/auth';
import { authFormSx } from './AuthForm.styles';

type AuthFormProps = {
  mode?: 'login' | 'register';
};

export function AuthForm({ mode = 'login' }: AuthFormProps) {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [badgeNumber, setBadgeNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleLoginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!authenticateWithMockCredentials(badgeNumber.trim(), password)) {
      setError('Неверный номер жетона или пароль.');
      setSuccessMessage('');
      return;
    }

    setAuthenticated();
    setError('');
    navigate('/');
  };

  const handleRegisterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError('Пароли не совпадают.');
      setSuccessMessage('');
      return;
    }

    try {
      registerMockUser({
        fullName: fullName.trim(),
        badgeNumber: badgeNumber.trim(),
        email: email.trim(),
        password,
      });
      setError('');
      setSuccessMessage('Регистрация успешно создана. Теперь можно войти в систему.');
      setFullName('');
      setBadgeNumber('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      navigate('/login');
    } catch (submitError) {
      setSuccessMessage('');
      setError(submitError instanceof Error ? submitError.message : 'Не удалось сохранить регистрацию.');
    }
  };

  const handleSubmit = mode === 'register' ? handleRegisterSubmit : handleLoginSubmit;

  return (
    <Stack component="form" onSubmit={handleSubmit} spacing={2} sx={authFormSx}>
      {mode === 'register' ? (
        <>
          <Input label="ФИО" autoComplete="name" required value={fullName} onChange={(event) => setFullName(event.target.value)} />
          <Input label="Номер жетона" autoComplete="username" required value={badgeNumber} onChange={(event) => setBadgeNumber(event.target.value)} />
          <Input label="Email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} />
        </>
      ) : (
        <Input label="Номер жетона" autoComplete="username" required value={badgeNumber} onChange={(event) => setBadgeNumber(event.target.value)} />
      )}
      <Input label="Пароль" type="password" autoComplete={mode === 'register' ? 'new-password' : 'current-password'} required value={password} onChange={(event) => setPassword(event.target.value)} />
      {mode === 'register' ? (
        <Input label="Подтверждение пароля" type="password" autoComplete="new-password" required value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />
      ) : null}
      {error ? <Alert role="alert" severity="error">{error}</Alert> : null}
      {successMessage ? <Alert severity="success">{successMessage}</Alert> : null}
      <Button type="submit" fullWidth>{mode === 'register' ? 'Создать аккаунт' : 'Войти'}</Button>
      {mode === 'login' ? (
        <Typography variant="body2" color="text.secondary" align="center">
          Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
        </Typography>
      ) : (
        <Typography variant="body2" color="text.secondary" align="center">
          Уже есть аккаунт? <Link to="/login">Войти</Link>
        </Typography>
      )}
    </Stack>
  );
}
