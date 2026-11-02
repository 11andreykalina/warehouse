import { mockUser, type User } from '@/entities/user';

const AUTH_STORAGE_KEY = 'isAuthenticated';
const REGISTRATION_STORAGE_KEY = 'registeredUsers';
const CURRENT_USER_STORAGE_KEY = 'currentUser';

export type RegisteredUser = User & {
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

export function getCurrentUser(): User {
  try {
    const rawUser = localStorage.getItem(CURRENT_USER_STORAGE_KEY);
    if (rawUser) {
      const parsedUser = JSON.parse(rawUser) as User;
      if (parsedUser && parsedUser.badgeNumber) {
        return parsedUser;
      }
    }
  } catch {
    // ignore invalid localStorage values and fall back to the mock profile
  }

  return mockUser;
}

export function saveCurrentUser(user: User) {
  localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(user));
}

export function logout() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
  localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
}

export function findRegisteredUser(badgeNumber: string, password: string) {
  const normalizedBadge = badgeNumber.trim();
  if (normalizedBadge === mockUser.badgeNumber && password === '123456') {
    return mockUser;
  }

  return getRegisteredUsers().find(
    (user) => user.badgeNumber === normalizedBadge && user.password === password,
  );
}

export function authenticateWithMockCredentials(badgeNumber: string, password: string) {
  return Boolean(findRegisteredUser(badgeNumber, password));
}

export function registerMockUser(payload: RegisteredUser) {
  const registeredUsers = getRegisteredUsers();
  const existingUser = registeredUsers.some(
    (user) => user.badgeNumber === payload.badgeNumber || (payload.email && user.email === payload.email),
  );

  if (existingUser) {
    throw new Error('Пользователь с таким жетоном или email уже зарегистрирован.');
  }

  const normalizedUser: RegisteredUser = {
    ...payload,
    id: payload.id || `user-${Date.now()}`,
    email: payload.email?.trim() || undefined,
    phone: payload.phone.trim(),
    badgeNumber: payload.badgeNumber.trim(),
    identity: {
      ...payload.identity,
      firstName: payload.identity.firstName.trim(),
      lastName: payload.identity.lastName.trim(),
      middleName: payload.identity.middleName?.trim() || undefined,
      birthDate: payload.identity.birthDate,
    },
    service: {
      ...payload.service,
      department: payload.service.department.trim(),
      locationName: payload.service.locationName?.trim() || undefined,
      rank: payload.service.rank?.trim(),
      position: payload.service.position?.trim(),
    },
  };

  registeredUsers.push(normalizedUser);
  localStorage.setItem(REGISTRATION_STORAGE_KEY, JSON.stringify(registeredUsers));
  saveCurrentUser(normalizedUser);
  setAuthenticated();

  return normalizedUser;
}
