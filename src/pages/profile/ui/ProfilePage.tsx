import { Alert, MenuItem, Stack, TextField } from '@mui/material';

import { UserCard } from '@/entities/user';
import { Button, Input, PageStack, SectionHeading } from '@/shared/ui';
import { useProfileForm } from '../model/useProfileForm';
import { profileGenderOptions, profileServiceOptions } from '../model/profileOptions';
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
  const {
    user,
    editMode,
    message,
    handleStartEdit,
    handleCancelEdit,
    handleFieldChange,
    handleIdentityChange,
    handleServiceChange,
    handleMeasurementChange,
    handleUniformServiceChange,
    handleGenderChange,
    handleSave,
  } = useProfileForm();

  return (
    <PageStack>
      <SectionHeading eyebrow="Учётная запись" title="Профиль сотрудника" />
      <UserCard user={user} />
      {message ? <Alert severity="success">{message}</Alert> : null}
      {!editMode ? (
        <Button variant="secondary" sx={profileActionSx} onClick={handleStartEdit}>
          Редактировать профиль
        </Button>
      ) : (
        <Stack spacing={2}>
          <Input label="Фамилия" value={user.identity.lastName} onChange={(event) => handleIdentityChange('lastName', event.target.value)} />
          <Input label="Имя" value={user.identity.firstName} onChange={(event) => handleIdentityChange('firstName', event.target.value)} />
          <Input label="Отчество" value={user.identity.middleName ?? ''} onChange={(event) => handleIdentityChange('middleName', event.target.value)} />
          <TextField
            fullWidth
            size="small"
            label="Дата рождения"
            value={user.identity.birthDate ?? ''}
            slotProps={{ inputLabel: { shrink: !!user.identity.birthDate } }}
            disabled
          />
          <Input label="Номер жетона" value={user.badgeNumber} onChange={(event) => handleFieldChange('badgeNumber', event.target.value)} />
          <Input label="Номер телефона" value={user.phone} onChange={(event) => handleFieldChange('phone', event.target.value)} />
          <Input select label="Служба" value={user.service.uniformService} onChange={(event) => handleUniformServiceChange(event.target.value)}>
            {profileServiceOptions.map(([service, label]) => (
              <MenuItem key={service} value={service}>{label}</MenuItem>
            ))}
          </Input>
          <Input label="Подразделение" value={user.service.department} onChange={(event) => handleServiceChange('department', event.target.value)} />
          <Input select label="Наименование места службы" value={user.service.locationName ?? defaultLocations[0]} onChange={(event) => handleServiceChange('locationName', event.target.value)}>
            {defaultLocations.map((location) => (
              <MenuItem key={location} value={location}>{location}</MenuItem>
            ))}
          </Input>
          <Input label="Звание" value={user.service.rank ?? ''} onChange={(event) => handleServiceChange('rank', event.target.value)} />
          <Input select label="Пол" value={user.measurements.gender ?? 'male'} onChange={(event) => handleGenderChange(event.target.value)}>
            {profileGenderOptions.map(([value, label]) => (
              <MenuItem key={value} value={value}>{label}</MenuItem>
            ))}
          </Input>
          <Input label="Размер одежды" value={user.measurements.clothingSize ?? ''} onChange={(event) => handleMeasurementChange('clothingSize', event.target.value)} />
          <Input label="Размер обуви" value={user.measurements.shoeSize ?? ''} onChange={(event) => handleMeasurementChange('shoeSize', event.target.value)} />
          <Input label="Размер головного убора" value={user.measurements.headSize ?? ''} onChange={(event) => handleMeasurementChange('headSize', event.target.value)} />
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
            <Button variant="primary" onClick={handleSave}>Сохранить</Button>
            <Button variant="secondary" onClick={handleCancelEdit}>Отмена</Button>
          </Stack>
        </Stack>
      )}
    </PageStack>
  );
}
