import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, MenuItem, Stack, TextField, Typography } from '@mui/material';

import { Button, Input } from '@/shared/ui';
import {
  uniformGenderLabels,
  uniformServiceLabels,
  uniformServices,
  type UniformGender,
  type UniformService,
} from '@/shared/model';
import {
  findRegisteredUser,
  registerMockUser,
  saveCurrentUser,
  setAuthenticated,
} from '../model/auth';
import { authFormSx } from './AuthForm.styles';

type AuthFormProps = {
  mode?: 'login' | 'register';
};

const registrationServices = uniformServices.filter((service) => service !== 'general') as Exclude<UniformService, 'general'>[];

const defaultLocations = [
  'Отдел МВД России по Константиновскому району',
  'Отдел МВД России по Семикаракорскому району',
  'Отдел МВД России по г. Шахты',
  'ОП № 1',
  'ОП № 2',
  'ОП № 3',
];

export function AuthForm({ mode = 'login' }: AuthFormProps) {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [badgeNumber, setBadgeNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState<Exclude<UniformService, 'general'>>('investigation');
  const [department, setDepartment] = useState('ОМВД России по г. Шахты');
  const [locationName, setLocationName] = useState(defaultLocations[0]);
  const [rank, setRank] = useState('');
  const [gender, setGender] = useState<Exclude<UniformGender, 'unisex'>>('male');
  const [clothingSize, setClothingSize] = useState('');
  const [shoeSize, setShoeSize] = useState('');
  const [headSize, setHeadSize] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleLoginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const foundUser = findRegisteredUser(badgeNumber.trim(), password);
    if (!foundUser) {
      setError('Неверный номер жетона или пароль.');
      setSuccessMessage('');
      return;
    }

    saveCurrentUser(foundUser);
    setAuthenticated();
    setError('');
    navigate('/');
  };

  const handleRegisterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const requiredFields = [
      lastName.trim(),
      firstName.trim(),
      birthDate,
      badgeNumber.trim(),
      phone.trim(),
      service,
      rank.trim(),
      gender,
    ];

    if (requiredFields.some((field) => !field)) {
      setError('Заполните обязательные поля: фамилия, имя, дата рождения, номер жетона, служба, номер телефона, звание и пол.');
      setSuccessMessage('');
      return;
    }

    if (password !== confirmPassword) {
      setError('Пароли не совпадают.');
      setSuccessMessage('');
      return;
    }

    try {
      registerMockUser({
        id: `user-${Date.now()}`,
        badgeNumber: badgeNumber.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        password,
        identity: {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          middleName: middleName.trim() || undefined,
          birthDate,
        },
        service: {
          rank: rank.trim(),
          department: department.trim(),
          locationName: locationName.trim(),
          position: 'Сотрудник',
          uniformService: service,
          rankGroup: 'senior-middle',
          uniformDuties: [],
          uniformConditions: [],
        },
        measurements: {
          gender,
          clothingSize: clothingSize.trim() || undefined,
          shoeSize: shoeSize.trim() || undefined,
          headSize: headSize.trim() || undefined,
        },
      });
      setError('');
      setSuccessMessage('Регистрация успешно создана. Теперь можно войти в систему.');
      setFirstName('');
      setLastName('');
      setMiddleName('');
      setBirthDate('');
      setBadgeNumber('');
      setPhone('');
      setDepartment('ОМВД России по г. Шахты');
      setLocationName(defaultLocations[0]);
      setRank('');
      setGender('male');
      setClothingSize('');
      setShoeSize('');
      setHeadSize('');
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
          <Input label="Фамилия" required value={lastName} onChange={(event) => setLastName(event.target.value)} />
          <Input label="Имя" required value={firstName} onChange={(event) => setFirstName(event.target.value)} />
          <Input label="Отчество" value={middleName} onChange={(event) => setMiddleName(event.target.value)} />
          <TextField
            fullWidth
            size="small"
            label="Дата рождения"
            type="date"
            required
            value={birthDate}
            slotProps={{ inputLabel: { shrink: true } }}
            onChange={(event) => setBirthDate(event.target.value)}
          />
          <Input label="Номер жетона" autoComplete="username" required value={badgeNumber} onChange={(event) => setBadgeNumber(event.target.value)} />
          <Input label="Номер телефона" required value={phone} onChange={(event) => setPhone(event.target.value)} />
          <Input
            select
            label="Служба"
            required
            value={service}
            onChange={(event) => setService(event.target.value as Exclude<UniformService, 'general'>)}
          >
            {registrationServices.map((uniformService) => (
              <MenuItem key={uniformService} value={uniformService}>
                {uniformServiceLabels[uniformService]}
              </MenuItem>
            ))}
          </Input>
          <Input label="Подразделение" required value={department} onChange={(event) => setDepartment(event.target.value)} />
          <Input
            select
            label="Наименование места службы"
            required
            value={locationName}
            onChange={(event) => setLocationName(event.target.value)}
          >
            {defaultLocations.map((location) => (
              <MenuItem key={location} value={location}>
                {location}
              </MenuItem>
            ))}
          </Input>
          <Input label="Звание" required value={rank} onChange={(event) => setRank(event.target.value)} />
          <Input
            select
            label="Пол"
            required
            value={gender}
            onChange={(event) => setGender(event.target.value as Exclude<UniformGender, 'unisex'>)}
          >
            {Object.entries(uniformGenderLabels)
              .filter(([value]) => value !== 'unisex')
              .map(([value, label]) => (
                <MenuItem key={value} value={value}>{label}</MenuItem>
              ))}
          </Input>
          <Input label="Размер одежды" value={clothingSize} onChange={(event) => setClothingSize(event.target.value)} />
          <Input label="Размер обуви" value={shoeSize} onChange={(event) => setShoeSize(event.target.value)} />
          <Input label="Размер головного убора" value={headSize} onChange={(event) => setHeadSize(event.target.value)} />
          <Input label="Email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} />
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
