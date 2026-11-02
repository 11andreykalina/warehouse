import { useState } from 'react';
import { Alert, MenuItem, Stack } from '@mui/material';

import { mockUser, UserCard, type User } from '@/entities/user';
import { getCurrentUser, saveCurrentUser } from '@/features/auth-by-badge/model/auth';
import { Button, Input, PageStack, SectionHeading } from '@/shared/ui';
import {
  uniformGenderLabels,
  uniformServiceLabels,
  uniformServices,
  type UniformGender,
  type UniformService,
} from '@/shared/model';
import { profileActionSx } from './ProfilePage.styles';

const defaultLocations = [
  'Отдел МВД России по Константиновскому району',
  'Отдел МВД России по Семикаракорскому району',
  'Отдел МВД России по г. Шахты',
  'ОП № 1',
  'ОП № 2',
  'ОП № 3',
];

export function ProfilePage() {
  const [user, setUser] = useState<User>(() => getCurrentUser());
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState('');

  const handleFieldChange = (field: keyof User, value: string) => {
    setUser((currentUser) => ({
      ...currentUser,
      [field]: value,
    }));
  };

  const handleIdentityChange = (field: 'firstName' | 'lastName' | 'middleName', value: string) => {
    setUser((currentUser) => ({
      ...currentUser,
      identity: {
        ...currentUser.identity,
        [field]: value,
      },
    }));
  };

  const handleServiceChange = (field: 'department' | 'locationName' | 'rank', value: string) => {
    setUser((currentUser) => ({
      ...currentUser,
      service: {
        ...currentUser.service,
        [field]: value,
      },
    }));
  };

  const handleMeasurementChange = (field: 'clothingSize' | 'shoeSize' | 'headSize', value: string) => {
    setUser((currentUser) => ({
      ...currentUser,
      measurements: {
        ...currentUser.measurements,
        [field]: value || undefined,
      },
    }));
  };

  const handleSave = () => {
    const nextUser: User = {
      ...user,
      id: user.id || mockUser.id,
      badgeNumber: user.badgeNumber.trim(),
      phone: user.phone.trim(),
      identity: {
        ...user.identity,
        firstName: user.identity.firstName.trim(),
        lastName: user.identity.lastName.trim(),
        middleName: user.identity.middleName?.trim() || undefined,
      },
      service: {
        ...user.service,
        department: user.service.department.trim(),
        locationName: user.service.locationName?.trim() || undefined,
        rank: user.service.rank?.trim(),
      },
    };

    saveCurrentUser(nextUser);
    setUser(nextUser);
    setEditMode(false);
    setMessage('Профиль успешно обновлён.');
  };

  return (
    <PageStack>
      <SectionHeading eyebrow="Учётная запись" title="Профиль сотрудника" />
      <UserCard user={user} />
      {message ? <Alert severity="success">{message}</Alert> : null}
      {!editMode ? (
        <Button variant="secondary" sx={profileActionSx} onClick={() => setEditMode(true)}>
          Редактировать профиль
        </Button>
      ) : (
        <Stack spacing={2}>
          <Input label="Фамилия" value={user.identity.lastName} onChange={(event) => handleIdentityChange('lastName', event.target.value)} />
          <Input label="Имя" value={user.identity.firstName} onChange={(event) => handleIdentityChange('firstName', event.target.value)} />
          <Input label="Отчество" value={user.identity.middleName ?? ''} onChange={(event) => handleIdentityChange('middleName', event.target.value)} />
          <Input label="Дата рождения" value={user.identity.birthDate ?? ''} disabled />
          <Input label="Номер жетона" value={user.badgeNumber} onChange={(event) => handleFieldChange('badgeNumber', event.target.value)} />
          <Input label="Номер телефона" value={user.phone} onChange={(event) => handleFieldChange('phone', event.target.value)} />
          <Input select label="Служба" value={user.service.uniformService} onChange={(event) => setUser((currentUser) => ({ ...currentUser, service: { ...currentUser.service, uniformService: event.target.value as Exclude<UniformService, 'general'> } }))}>
            {uniformServices.filter((service) => service !== 'general').map((service) => (
              <MenuItem key={service} value={service}>{uniformServiceLabels[service]}</MenuItem>
            ))}
          </Input>
          <Input label="Подразделение" value={user.service.department} onChange={(event) => handleServiceChange('department', event.target.value)} />
          <Input select label="Наименование места службы" value={user.service.locationName ?? defaultLocations[0]} onChange={(event) => handleServiceChange('locationName', event.target.value)}>
            {defaultLocations.map((location) => (
              <MenuItem key={location} value={location}>{location}</MenuItem>
            ))}
          </Input>
          <Input label="Звание" value={user.service.rank ?? ''} onChange={(event) => handleServiceChange('rank', event.target.value)} />
          <Input select label="Пол" value={user.measurements.gender ?? 'male'} onChange={(event) => setUser((currentUser) => ({ ...currentUser, measurements: { ...currentUser.measurements, gender: event.target.value as Exclude<UniformGender, 'unisex'> } }))}>
            {Object.entries(uniformGenderLabels)
              .filter(([value]) => value !== 'unisex')
              .map(([value, label]) => (
                <MenuItem key={value} value={value}>{label}</MenuItem>
              ))}
          </Input>
          <Input label="Размер одежды" value={user.measurements.clothingSize ?? ''} onChange={(event) => handleMeasurementChange('clothingSize', event.target.value)} />
          <Input label="Размер обуви" value={user.measurements.shoeSize ?? ''} onChange={(event) => handleMeasurementChange('shoeSize', event.target.value)} />
          <Input label="Размер головного убора" value={user.measurements.headSize ?? ''} onChange={(event) => handleMeasurementChange('headSize', event.target.value)} />
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
            <Button variant="primary" onClick={handleSave}>Сохранить</Button>
            <Button variant="secondary" onClick={() => setEditMode(false)}>Отмена</Button>
          </Stack>
        </Stack>
      )}
    </PageStack>
  );
}
