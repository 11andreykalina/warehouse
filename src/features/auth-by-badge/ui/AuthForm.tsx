import { Link } from 'react-router-dom';
import { Alert, MenuItem, Stack, TextField, Typography } from '@mui/material';

import { Button, Input } from '@/shared/ui';
import {
  uniformGenderLabels,
  uniformServiceLabels,
  uniformServices,
  type UniformGender,
  type UniformService,
} from '@/shared/model';
import { useAuthForm } from '../model/useAuthForm';
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
  const { values, updateField, handleSubmit, error, successMessage } = useAuthForm(mode);

  return (
    <Stack component="form" onSubmit={handleSubmit} spacing={2} sx={authFormSx}>
      {mode === 'register' ? (
        <>
          <Input label="Фамилия" required value={values.lastName} onChange={(event) => updateField('lastName', event.target.value)} />
          <Input label="Имя" required value={values.firstName} onChange={(event) => updateField('firstName', event.target.value)} />
          <Input label="Отчество" value={values.middleName} onChange={(event) => updateField('middleName', event.target.value)} />
          <TextField
            fullWidth
            size="small"
            label="Дата рождения"
            type="date"
            required
            value={values.birthDate}
            slotProps={{ inputLabel: { shrink: true } }}
            onChange={(event) => updateField('birthDate', event.target.value)}
          />
          <Input label="Номер жетона" autoComplete="username" required value={values.badgeNumber} onChange={(event) => updateField('badgeNumber', event.target.value)} />
          <Input label="Номер телефона" required value={values.phone} onChange={(event) => updateField('phone', event.target.value)} />
          <Input
            select
            label="Служба"
            required
            value={values.service}
            onChange={(event) => updateField('service', event.target.value as Exclude<UniformService, 'general'>)}
          >
            {registrationServices.map((uniformService) => (
              <MenuItem key={uniformService} value={uniformService}>
                {uniformServiceLabels[uniformService]}
              </MenuItem>
            ))}
          </Input>
          <Input label="Подразделение" required value={values.department} onChange={(event) => updateField('department', event.target.value)} />
          <Input
            select
            label="Наименование места службы"
            required
            value={values.locationName}
            onChange={(event) => updateField('locationName', event.target.value)}
          >
            {defaultLocations.map((location) => (
              <MenuItem key={location} value={location}>
                {location}
              </MenuItem>
            ))}
          </Input>
          <Input label="Звание" required value={values.rank} onChange={(event) => updateField('rank', event.target.value)} />
          <Input
            select
            label="Пол"
            required
            value={values.gender}
            onChange={(event) => updateField('gender', event.target.value as Exclude<UniformGender, 'unisex'>)}
          >
            {Object.entries(uniformGenderLabels)
              .filter(([value]) => value !== 'unisex')
              .map(([value, label]) => (
                <MenuItem key={value} value={value}>{label}</MenuItem>
              ))}
          </Input>
          <Input label="Размер одежды" value={values.clothingSize} onChange={(event) => updateField('clothingSize', event.target.value)} />
          <Input label="Размер обуви" value={values.shoeSize} onChange={(event) => updateField('shoeSize', event.target.value)} />
          <Input label="Размер головного убора" value={values.headSize} onChange={(event) => updateField('headSize', event.target.value)} />
          <Input label="Email" type="email" autoComplete="email" value={values.email} onChange={(event) => updateField('email', event.target.value)} />
        </>
      ) : (
        <Input label="Номер жетона" autoComplete="username" required value={values.badgeNumber} onChange={(event) => updateField('badgeNumber', event.target.value)} />
      )}
      <Input label="Пароль" type="password" autoComplete={mode === 'register' ? 'new-password' : 'current-password'} required value={values.password} onChange={(event) => updateField('password', event.target.value)} />
      {mode === 'register' ? (
        <Input label="Подтверждение пароля" type="password" autoComplete="new-password" required value={values.confirmPassword} onChange={(event) => updateField('confirmPassword', event.target.value)} />
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
