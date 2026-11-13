import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import type { UniformGender, UniformService } from '@/shared/model';
import {
  findRegisteredUser,
  registerMockUser,
  saveCurrentUser,
  setAuthenticated,
} from './auth';
import { registrationGenders, registrationServices } from './authFormOptions';

type AuthMode = 'login' | 'register';
type AuthFormValues = {
  firstName: string;
  lastName: string;
  middleName: string;
  birthDate: string;
  badgeNumber: string;
  phone: string;
  service: Exclude<UniformService, 'general'>;
  department: string;
  locationName: string;
  rank: string;
  gender: Exclude<UniformGender, 'unisex'>;
  clothingSize: string;
  shoeSize: string;
  headSize: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function createInitialFormValues(): AuthFormValues {
  return {
    firstName: '',
    lastName: '',
    middleName: '',
    birthDate: '',
    badgeNumber: '',
    phone: '',
    service: 'investigation',
    department: 'ОМВД России по г. Шахты',
    locationName: 'Отдел МВД России по Константиновскому району',
    rank: '',
    gender: 'male',
    clothingSize: '',
    shoeSize: '',
    headSize: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
}

export function useAuthForm(mode: AuthMode) {
  const navigate = useNavigate();
  const [values, setValues] = useState(createInitialFormValues);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const updateField = <Field extends keyof AuthFormValues>(
    field: Field,
    value: AuthFormValues[Field],
  ) => {
    setValues((current) => ({ ...current, [field]: value }));
  };

  const updateService = (value: string) => {
    const service = registrationServices.find((candidate) => candidate === value);
    if (service) {
      updateField('service', service);
    }
  };

  const updateGender = (value: string) => {
    const gender = registrationGenders.find(([candidate]) => candidate === value)?.[0];
    if (gender) {
      updateField('gender', gender);
    }
  };

  const handleLoginSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!values.badgeNumber.trim() || !values.password) {
      setError('Введите номер жетона и пароль.');
      setSuccessMessage('');
      return;
    }

    const foundUser = findRegisteredUser(values.badgeNumber.trim(), values.password);
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

  const handleRegisterSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const requiredFields = [
      values.lastName.trim(),
      values.firstName.trim(),
      values.birthDate,
      values.badgeNumber.trim(),
      values.phone.trim(),
      values.service,
      values.department.trim(),
      values.locationName.trim(),
      values.rank.trim(),
      values.gender,
      values.password,
      values.confirmPassword,
    ];

    if (requiredFields.some((field) => !field)) {
      setError('Заполните обязательные поля: фамилия, имя, дата рождения, номер жетона, служба, подразделение, наименование места службы, номер телефона, звание, пол и пароль.');
      setSuccessMessage('');
      return;
    }

    if (values.password !== values.confirmPassword) {
      setError('Пароли не совпадают.');
      setSuccessMessage('');
      return;
    }

    try {
      registerMockUser({
        id: `user-${Date.now()}`,
        badgeNumber: values.badgeNumber.trim(),
        phone: values.phone.trim(),
        email: values.email.trim() || undefined,
        password: values.password,
        identity: {
          firstName: values.firstName.trim(),
          lastName: values.lastName.trim(),
          middleName: values.middleName.trim() || undefined,
          birthDate: values.birthDate,
        },
        service: {
          rank: values.rank.trim(),
          department: values.department.trim(),
          locationName: values.locationName.trim(),
          position: 'Сотрудник',
          uniformService: values.service,
          rankGroup: 'senior-middle',
          uniformDuties: [],
          uniformConditions: [],
        },
        measurements: {
          gender: values.gender,
          clothingSize: values.clothingSize.trim() || undefined,
          shoeSize: values.shoeSize.trim() || undefined,
          headSize: values.headSize.trim() || undefined,
        },
      });
      setError('');
      setSuccessMessage('Регистрация успешно создана. Теперь можно войти в систему.');
      setValues((current) => ({
        ...current,
        firstName: '',
        lastName: '',
        middleName: '',
        birthDate: '',
        badgeNumber: '',
        phone: '',
        department: 'ОМВД России по г. Шахты',
        locationName: 'Отдел МВД России по Константиновскому району',
        rank: '',
        gender: 'male',
        clothingSize: '',
        shoeSize: '',
        headSize: '',
        email: '',
        password: '',
        confirmPassword: '',
      }));
      navigate('/login');
    } catch (submitError) {
      setSuccessMessage('');
      setError(submitError instanceof Error ? submitError.message : 'Не удалось сохранить регистрацию.');
    }
  };

  const handleSubmit = mode === 'register' ? handleRegisterSubmit : handleLoginSubmit;

  return { values, updateField, updateService, updateGender, handleSubmit, error, successMessage };
}
