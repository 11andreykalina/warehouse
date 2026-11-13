import { useState } from 'react';

import { mockUser, type User } from '@/entities/user';
import { getCurrentUser, saveCurrentUser } from '@/features/auth-by-badge';
import { profileGenderOptions, profileServiceOptions } from './profileOptions';

type EditableIdentityField = 'firstName' | 'lastName' | 'middleName';
type EditableServiceField = 'department' | 'locationName' | 'rank';
type EditableMeasurementField = 'clothingSize' | 'shoeSize' | 'headSize';

export function useProfileForm() {
  const [user, setUser] = useState<User>(() => getCurrentUser());
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState('');

  const handleFieldChange = (field: 'badgeNumber' | 'phone', value: string) => {
    setUser((currentUser) => ({
      ...currentUser,
      [field]: value,
    }));
  };

  const handleIdentityChange = (field: EditableIdentityField, value: string) => {
    setUser((currentUser) => ({
      ...currentUser,
      identity: {
        ...currentUser.identity,
        [field]: value,
      },
    }));
  };

  const handleServiceChange = (field: EditableServiceField, value: string) => {
    setUser((currentUser) => ({
      ...currentUser,
      service: {
        ...currentUser.service,
        [field]: value,
      },
    }));
  };

  const handleMeasurementChange = (field: EditableMeasurementField, value: string) => {
    setUser((currentUser) => ({
      ...currentUser,
      measurements: {
        ...currentUser.measurements,
        [field]: value || undefined,
      },
    }));
  };

  const handleUniformServiceChange = (value: string) => {
    const uniformService = profileServiceOptions.find(([candidate]) => candidate === value)?.[0];
    if (!uniformService) return;

    setUser((currentUser) => ({
      ...currentUser,
      service: { ...currentUser.service, uniformService },
    }));
  };

  const handleGenderChange = (value: string) => {
    const gender = profileGenderOptions.find(([candidate]) => candidate === value)?.[0];
    if (!gender) return;

    setUser((currentUser) => ({
      ...currentUser,
      measurements: { ...currentUser.measurements, gender },
    }));
  };

  const handleStartEdit = () => setEditMode(true);
  const handleCancelEdit = () => setEditMode(false);

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

  return {
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
  };
}
