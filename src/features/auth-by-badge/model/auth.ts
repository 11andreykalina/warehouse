import { mockUser } from '@/entities/user';

const AUTH_STORAGE_KEY = 'isAuthenticated';
const REGISTRATION_STORAGE_KEY = 'registeredUsers';

export type RegisteredUser = {
  fullName: string;
  badgeNumber: string;
  email: string;
  password: string;
};

function getRegisteredUsers(): RegisteredUser[] {
  try {
    const rawUsers = localStorage.getItem(REGISTRATION_STORAGE_KEY);
    return rawUsers ? (JSON.parse(rawUsers) as RegisteredUser[]) : [];
  } catch {
    return [];
  }
}

export function setAuthenticated() {
  localStorage.setItem(AUTH_STORAGE_KEY, 'true');
}

export function getAuthenticated() {
  return localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
}

export function logout() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}

export function authenticateWithMockCredentials(badgeNumber: string, password: string) {
  if (badgeNumber === mockUser.badgeNumber && password === '123456') {
    return true;
  }

  const registeredUsers = getRegisteredUsers();
  return registeredUsers.some(
    (user) => user.badgeNumber === badgeNumber && user.password === password,
  );
}

export function registerMockUser(payload: RegisteredUser) {
  const registeredUsers = getRegisteredUsers();
  const existingUser = registeredUsers.some(
    (user) => user.badgeNumber === payload.badgeNumber || user.email === payload.email,
  );

  if (existingUser) {
    throw new Error('Пользователь с таким жетоном или email уже зарегистрирован.');
  }

  registeredUsers.push(payload);
  localStorage.setItem(REGISTRATION_STORAGE_KEY, JSON.stringify(registeredUsers));
  setAuthenticated();
}
