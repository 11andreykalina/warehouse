import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { mockUser } from '@/entities/user';
import { Button, Input } from '@/shared/ui';
import { setAuthenticated } from '../model/auth';

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
    <form onSubmit={handleSubmit} className="form-stack">
      <label className="form-field">
        <span>Номер жетона</span>
        <Input
          autoComplete="username"
          required
          value={badgeNumber}
          onChange={(event) => setBadgeNumber(event.target.value)}
        />
      </label>
      <label className="form-field">
        <span>Пароль</span>
        <Input
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      {error ? <p className="form-error" role="alert">{error}</p> : null}
      <Button type="submit">Войти</Button>
    </form>
  );
}
